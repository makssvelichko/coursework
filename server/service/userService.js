const { User } = require("../models/models");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const mailService = require("./mailService");
const tokenService = require("./tokenService");
const UserDto = require("../dtos/user-dto");
const ApiError = require("../error/ApiError");
const path = require("path");

class UserService {
  async registration(
    username,
    email,
    password,
    sex,
    age,
    weight,
    height,
    profilePhoto
  ) {
    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      throw ApiError.badRequest(`User with this ${email} already exist`);
    }
    const hashPassword = await bcrypt.hash(password, 5);
    const activationLink = uuid.v4();

    const fileName = uuid.v4() + ".jpg";
    const profilePhotoPath = path.resolve(__dirname, "..", "static", fileName);
    await profilePhoto.mv(profilePhotoPath);

    const user = await User.create({
      username,
      email,
      password: hashPassword,
      sex,
      age,
      weight,
      height,
      activationLink,
      profilePhoto: fileName,
    });
    await mailService.sendActivationMail(
      email,
      `${process.env.API_URL}/api/user/activate/${activationLink}`
    );
    const userDto = new UserDto(user);
    const tokens = tokenService.generateToken({ ...userDto });

    await tokenService.saveToken(
      userDto.id,
      tokens.refreshToken,
      tokens.accessToken
    );

    return {
      ...tokens,
      user: userDto,
    };
  }

  async activate(activationLink) {
    const user = await User.update(
      { isActivated: true },
      { where: { activationLink: activationLink } }
    );
    console.log(user.isActivated);
  }

  async login(email, password) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw ApiError.badRequest("Not found user with such email");
    }
    console.log(`Founded user:${user}`);
    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      throw ApiError.badRequest("Not correct password");
    }
    const userDto = new UserDto(user);
    const tokens = tokenService.generateToken({ ...userDto });

    await tokenService.saveToken(
      userDto.id,
      tokens.refreshToken,
      tokens.accessToken
    );

    return {
      ...tokens,
      user: userDto,
    };
  }

  async logout(accessToken, refreshToken) {
    await tokenService.removeToken(accessToken, refreshToken);
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }
    const user = await User.findOne({ where: { id: userData.id } });

    if (!user) {
      throw ApiError.UnauthorizedError();
    }

    const userDto = new UserDto(user);
    const tokens = tokenService.generateToken({ ...userDto });

    await tokenService.saveToken(
      userDto.id,
      tokens.refreshToken,
      tokens.accessToken
    );

    return {
      ...tokens,
      user: userDto,
    };
  }

  async update(id, updates) {
    if (updates.profilePhoto) {
      const fileName = uuid.v4() + ".jpg";
      const profilePhotoPath = path.resolve(
        __dirname,
        "..",
        "static",
        fileName
      );
      if (typeof updates.profilePhoto.mv === "function") {
        updates.profilePhoto.mv(profilePhotoPath, (err) => {
          if (err) {
            throw ApiError.badRequest("Failed to upload profile photo");
          }
        });
        updates.profilePhoto = fileName;
      } else {
        throw ApiError.badRequest("Invalid file object");
      }
    }

    const name = updates.username;
    if (name) {
      const user = await User.findOne({ where: { username: name } });
      if (user) {
        throw ApiError.badRequest("Try another nickname");
      }
    }

    const [updatedCount, updatedUsers] = await User.update(updates, {
      where: { id },
      returning: true,
      plain: true,
    });

    if (updatedCount === 0) {
      throw ApiError.badRequest("User not found or no changes made");
    }

    return updatedUsers;
  }
}

module.exports = new UserService();

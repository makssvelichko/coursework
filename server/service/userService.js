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
    const profilePhotoPath = path.resolve(__dirname, "..", "static", fileName); // Path to save the file
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

    await tokenService.saveToken(userDto.id, tokens.refreshToken, tokens.token);

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

    await tokenService.saveToken(userDto.id, tokens.refreshToken, tokens.token);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async logout(refreshToken) {
    const oldToken = await tokenService.removeToken(refreshToken);
    return oldToken;
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
    const userDto = new UserDto(user);
    const tokens = tokenService.generateToken({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken, tokens.token);

    return {
      ...tokens,
      user: userDto,
    };
  }
}

module.exports = new UserService();

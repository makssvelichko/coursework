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
    profile_photo
  ) {
    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      throw ApiError.internal(`User with this ${email} already exist`);
    }
    const hashPassword = await bcrypt.hash(password, 5);
    const activationLink = uuid.v4();

    const fileName = uuid.v4() + ".jpg";
    const profilePhotoPath = path.resolve(__dirname, "..", "static", fileName); // Path to save the file
    await profile_photo.mv(profilePhotoPath);

    const user = await User.create({
      username,
      email,
      password: hashPassword,
      sex,
      age,
      weight,
      height,
      activationLink,
      profile_photo: fileName,
    });
    await mailService.sendActivationMail(email, activationLink);
    const userDto = new UserDto(user);
    const tokens = tokenService.generateToken({ ...userDto });

    await tokenService.saveToken(
      userDto.id,
      tokens.refresh_Token,
      tokens.accessToken
    );

    return {
      ...tokens,
      user: userDto,
    };
  }
}

module.exports = new UserService();

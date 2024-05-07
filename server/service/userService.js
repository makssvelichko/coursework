const User = require("../models/models");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const mailService = require("./mailService");
const tokenService = require("./tokenService");
const UserDto = require("../dtos/user-dto");

class UserService {
  async registration(username, email, password, sex, age, weight, height) {
    const candidate = await User.findOne({ email });
    if (candidate) {
      throw ApiError.internal(`User with this ${email} already exist`);
    }
    const hashPassword = await bcrypt.hash(password, 5);
    const activationLink = uuid.v4();
    const user = await User.create({
      username,
      email,
      password: hashPassword,
      sex,
      age,
      weight,
      height,
      activationLink,
    });
    await mailService.sendActivationMail(email, activationLink);
    const userDto = new UserDto(user);
    const tokens = tokenService.generateToken({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refresh_Token);

    return {
      ...tokens,
      user: userDto,
    };
  }
}

module.exports = new UserService();

const ApiError = require("../error/ApiError");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const path = require("path");
const jwt = require("jsonwebtoken");
const { User } = require("../models/models");
const userService = require("../service/userService");
const fs = require("fs");

class UserController {
  async registration(req, res, next) {
    try {
      const { username, email, password, sex, age, weight, height } = req.body;
      let profilePhoto = req.files?.profile_photo || null;

      if (!profilePhoto) {
        const defaultPhotoPath = path.resolve(
          __dirname,
          "..",
          "static",
          "def.jpg"
        );
        profilePhoto = {
          mv: async (filePath) => {
            await fs.promises.copyFile(defaultPhotoPath, filePath);
          },
        };
      }

      const userData = await userService.registration(
        username,
        email,
        password,
        sex,
        age,
        weight,
        height,
        profilePhoto
      );
      res.cookie("refresh_Token", userData.refresh_Token, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      console.log(e);
    }
  }

  async login(req, res, next) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return next(ApiError.internal("User with thi email not found"));
    }
    let comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      return next(ApiError.internal("Incorrect password"));
    }
    const token = generateJwt(user.id, user.email, user.role);
    return res.json({ token });
  }

  async check(req, res, next) {
    const token = generateJwt(req.user.id, req.user.email, req.user.role);
    return res.json({ token });
  }

  async logout(req, res, next) {
    try {
    } catch (e) {}
  }

  async activate(req, res, next) {
    try {
    } catch (e) {}
  }

  async refresh(req, res, next) {
    try {
    } catch (e) {}
  }

  async getUsers(req, res, next) {
    try {
      res.json(["123", "456"]);
    } catch (e) {}
  }
}
module.exports = new UserController();

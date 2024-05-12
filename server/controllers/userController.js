const ApiError = require("../error/ApiError");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const path = require("path");
const jwt = require("jsonwebtoken");
const { User } = require("../models/models");
const userService = require("../service/userService");
const fs = require("fs");
const { validationResult } = require("express-validator");

class UserController {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.badRequest("Validation Error"));
      }
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
      next(e);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await userService.login(email, password);
      res.cookie("refresh_Token", userData.refresh_Token, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async check(req, res, next) {
    const token = generateJwt(req.user.id, req.user.email, req.user.role);
    return res.json({ token });
  }

  async logout(req, res, next) {
    try {
    } catch (e) {
      next(e);
    }
  }

  async activate(req, res, next) {
    try {
      const activationLink = req.params.link;
      await userService.activate(activationLink);
      return res.redirect(process.env.CLIENT_URL);
    } catch (e) {
      next(e);
    }
  }

  async refresh(req, res, next) {
    try {
    } catch (e) {
      next(e);
    }
  }

  async getUsers(req, res, next) {
    try {
      res.json(["123", "456"]);
    } catch (e) {
      next(e);
    }
  }
}
module.exports = new UserController();

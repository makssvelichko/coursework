const ApiError = require("../error/ApiError");
const path = require("path");
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
      res.cookie("accessToken", userData.accessToken, {
        maxAge: 30 * 60 * 60 * 1000,
        httpOnly: true,
      });
      res.cookie("refreshToken", userData.refreshToken, {
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
      res.cookie("accessToken", userData.accessToken, {
        maxAge: 30 * 60 * 60 * 1000,
        httpOnly: true,
      });
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async logout(req, res, next) {
    try {
      const { accessToken, refreshToken } = req.cookies;
      await userService.logout(accessToken, refreshToken);
      res.clearCookie("accessToken");
      res.clearCookie("refreshToken");
      return res.json({ message: "Logged out successfully" });
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
      const { refreshToken } = req.cookies;
      if (!refreshToken) {
        return next(ApiError.UnauthorizedError());
      }

      const userData = await userService.refresh(refreshToken);
      if (!userData) {
        return next(ApiError.UnauthorizedError());
      }

      res.cookie("accessToken", userData.accessToken, {
        maxAge: 30 * 60 * 60 * 1000,
        httpOnly: true,
      });
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      return res.json(userData);
    } catch (e) {
      console.error(e); // Логування помилок
      next(e);
    }
  }
}
module.exports = new UserController();

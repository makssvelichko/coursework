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
      let profilePhoto = req.files?.profilePhoto || null;

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
        sameSite: "strict",
      });
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
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
        sameSite: "strict",
      });
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async logout(req, res, next) {
    try {
      console.log("Cookies:", req.cookies);
      const { accessToken, refreshToken } = req.cookies;

      if (!accessToken || !refreshToken) {
        return next(ApiError.badRequest("Tokens are missing"));
      }
      await userService.logout(accessToken, refreshToken);

      res.clearCookie("accessToken", { httpOnly: true, sameSite: "strict" });
      res.clearCookie("refreshToken", { httpOnly: true, sameSite: "strict" });

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

  async update(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.badRequest("Validation Error"));
      }

      const { id } = req.user;
      const updates = req.body;
      if (req.files && req.files.profilePhoto) {
        updates.profilePhoto = req.files.profilePhoto;
      }

      const updatedUser = await userService.update(id, updates);

      return res.json(updatedUser);
    } catch (e) {
      next(e);
    }
  }

  async load(req, res, next) {
    try {
      const { id } = req.user;

      const userData = await userService.load(id);

      if (userData && typeof userData === "object" && userData !== null) {
        const filteredData = {
          username: userData.username,
          sex: userData.sex,
          age: userData.age,
          weight: userData.weight,
          height: userData.height,
          profilePhoto: userData.profilePhoto,
        };
        return res.json(filteredData);
      } else {
        return next(ApiError.badRequest("Invalid user"));
      }
    } catch (e) {
      next(e);
    }
  }
}
module.exports = new UserController();

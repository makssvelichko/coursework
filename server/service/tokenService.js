const jwt = require("jsonwebtoken");
const { User } = require("../models/models");
const ApiError = require("../error/ApiError");

class TokenService {
  generateToken(payload) {
    try {
      const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
        expiresIn: "30m",
      });
      const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
        expiresIn: "30d",
      });
      return {
        accessToken,
        refreshToken,
      };
    } catch (e) {
      throw ApiError.forbidden(e.message);
    }
  }

  validateToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      return userData;
    } catch (e) {
      return null;
    }
  }

  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      return userData;
    } catch (e) {
      return null;
    }
  }

  async saveToken(id, refreshToken, accessToken) {
    try {
      const newToken = await User.update(
        { accessToken: accessToken, refreshToken: refreshToken },
        { where: { id: id } }
      );
      return newToken;
    } catch (e) {
      throw ApiError.forbidden(e.message);
    }
  }

  async removeToken(accessToken, refreshToken) {
    try {
      await User.update(
        { accessToken: null, refreshToken: null },
        { where: { accessToken: accessToken, refreshToken: refreshToken } }
      );
    } catch (e) {
      throw ApiError.forbidden(e.message);
    }
  }

  async findToken(refreshToken) {
    const tokenData = await User.findOne({ refreshToken: refreshToken });
    return tokenData;
  }
}

module.exports = new TokenService();

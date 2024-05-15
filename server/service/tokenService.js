const jwt = require("jsonwebtoken");
const { User } = require("../models/models");
const ApiError = require("../error/ApiError");

class TokenService {
  generateToken(payload) {
    try {
      const token = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
        expiresIn: "30m",
      });
      const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
        expiresIn: "30d",
      });
      return {
        token,
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

  async saveToken(id, refreshToken, token) {
    try {
      const newToken = await User.update(
        { token: token, refreshToken: refreshToken },
        { where: { id: id } }
      );
      return newToken;
    } catch (e) {
      throw ApiError.forbidden(e.message);
    }
  }

  async removeToken(refreshToken) {
    const tokenData = await User.update(
      { token: null, refreshToken: null },
      { where: { refreshToken: refreshToken } }
    );
    return tokenData.refreshToken;
  }

  async findToken(refreshToken) {
    const tokenData = await User.findOne({ refreshToken: refreshToken });
    return tokenData;
  }
}

module.exports = new TokenService();

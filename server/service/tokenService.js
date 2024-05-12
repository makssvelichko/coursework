const jwt = require("jsonwebtoken");
const { User } = require("../models/models");
const ApiError = require("../error/ApiError");

class TokenService {
  generateToken(payload) {
    try {
      const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
        expiresIn: "30m",
      });
      const refresh_Token = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
        expiresIn: "30d",
      });
      return {
        accessToken,
        refresh_Token,
      };
    } catch (e) {
      throw ApiError.forbidden(e.message);
    }
  }

  validateAccessToken(token) {
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

  async saveToken(id, refresh_Token, accessToken) {
    try {
      const token = await User.update(
        { token: accessToken, refresh_token: refresh_Token },
        { where: { id: id } }
      );
      return token;
    } catch (e) {
      throw ApiError.forbidden(e.message);
    }
  }

  async removeToken(refresh_Token) {
    const tokenData = await User.update(
      { token: null, refresh_token: null },
      { where: { refresh_token: refresh_Token } }
    );
    return tokenData.refresh_token;
  }

  async findToken(refresh_Token) {
    const tokenData = await User.findOne({ refresh_token: refresh_Token });
    return tokenData;
  }
}

module.exports = new TokenService();

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
}

module.exports = new TokenService();

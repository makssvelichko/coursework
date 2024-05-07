const jwt = require("jsonwebtoken");
const User = require("../models/models");

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
      next(ApiError.forbidden(e.message));
    }
  }

  async saveToken(id, refresh_Token) {
    try {
      const tokenData = await User.findOne({ user: id });
      if (tokenData) {
        tokenData.refresh_Token = refresh_Token;
        return tokenData.save();
      }
      const token = await User.update(
        { refresh_Token: refresh_Token },
        { where: { id } }
      );
      return token;
    } catch (e) {
      next(ApiError.forbidden(e.message));
    }
  }
}

module.exports = new TokenService();

const ApiError = require("../error/ApiError");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const path = require("path");
const jwt = require("jsonwebtoken");
const { User } = require("../models/models");

const generateJwt = (id, email, role) => {
  return jwt.sign({ id, email, role }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
};

class UserController {
  async registration(req, res, next) {
    try {
      const { username, email, password, sex, age, weight, height, role } =
        req.body;

      /*const { profile_photo } = req.files;
      let fileName = uuid.v4() + ".jpg";
      profile_photo.mv(path.resolve(__dirname, "..", "static", fileName));*/
      if (
        !email ||
        !password ||
        !username ||
        !sex ||
        !age ||
        !weight ||
        !height
      ) {
        return next(ApiError.badRequest("You don`t fill all info"));
      }
      const candidate = await User.findOne({ where: { email } });
      if (candidate) {
        return next(ApiError.badRequest("Use another email"));
      }
      const hashPassword = await bcrypt.hash(password, 5);
      const user = await User.create({
        email,
        role,
        username,
        sex,
        age,
        weight,
        height,
        password: hashPassword,
      });
      const token = generateJwt(user.id, user.email, user.role);
      return res.json({ token });
    } catch (e) {
      next(ApiError.badRequest(e.message));
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
    const { id } = req.query;
    if (!id) {
      return next(ApiError.badRequest("ID din`t give"));
    }
    res.json(id);
  }
}

module.exports = new UserController();

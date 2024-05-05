const { Subscribe_types } = require("../models/models");
const ApiError = require("../error/ApiError");

class SubTypeController {
  async create(req, res) {
    const { name, price, duration } = req.body;
    const sub_type = await Subscribe_types.create({ name, price, duration });
    return res.json(sub_type);
  }

  async getALL(req, res) {
    const sub_types = await Subscribe_types.findAll();
    return res.json(sub_types);
  }
}

module.exports = new SubTypeController();

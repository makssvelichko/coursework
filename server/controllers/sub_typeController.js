const { Subscribe_types } = require("../models/models");
const ApiError = require("../error/ApiError");

class SubTypeController {
  async create(req, res) {
    const { name, price } = req.body;
    const sub_type = await Subscribe_types.create({ name, price });
    return res.json(sub_type);
  }

  async getALL(req, res) {}
}

module.exports = new SubTypeController();

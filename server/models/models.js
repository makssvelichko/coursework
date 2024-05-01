const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  username: { type: DataTypes.STRING, unique: true },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  profile_photo: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.STRING, defaultValue: "USER" },
  token: { type: DataTypes.STRING, unique: true },
  refresh_token: { type: DataTypes.STRING, unique: true },
  reset_password_token: { type: DataTypes.STRING, unique: true },
  created_at: { type: DataTypes.TIME },
  delete_at: { type: DataTypes.TIME },
});

const User_payment = sequelize.define("user_payment", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  payment_type: { type: DataTypes.STRING },
  provider: { type: DataTypes.STRING },
  account_no: { type: DataTypes.INTEGER, unique: true },
});

const Subscribe = sequelize.define("subscribe", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  payment_type: { type: DataTypes.STRING },
  created_at: { type: DataTypes.TIME },
  finished_at: { type: DataTypes.TIME },
  delete_at: { type: DataTypes.TIME },
});

const Subscribe_types = sequelize.define("subscribe_types", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  duration: { type: DataTypes.TIME },
  price: { type: DataTypes.INTEGER, allowNull: false },
});

User.hasOne(User_payment);
User_payment.belongsTo(User);

User.hasOne(Subscribe);
Subscribe.belongsTo(User);

Subscribe_types.hasMany(Subscribe);
Subscribe.belongsTo(Subscribe_types);

module.exports = {
  User,
  User_payment,
  Subscribe,
  Subscribe_types,
};

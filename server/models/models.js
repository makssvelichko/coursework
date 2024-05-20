const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  username: { type: DataTypes.STRING, unique: true },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  profilePhoto: { type: DataTypes.STRING },
  sex: { type: DataTypes.STRING },
  weight: { type: DataTypes.INTEGER },
  height: { type: DataTypes.INTEGER },
  role: { type: DataTypes.STRING, defaultValue: "USER" },
  accessToken: { type: DataTypes.STRING, unique: true },
  refreshToken: { type: DataTypes.STRING, unique: true },
  isActivated: { type: DataTypes.BOOLEAN, defaultValue: false },
  activationLink: { type: DataTypes.STRING },
});

const UserPayment = sequelize.define("user_payment", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  payment_type: { type: DataTypes.STRING },
  provider: { type: DataTypes.STRING },
  account_no: { type: DataTypes.INTEGER, unique: true },
});

const Subscribe = sequelize.define("subscribe", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  payment_type: { type: DataTypes.STRING },
  finished_at: { type: DataTypes.TIME },
});

const SubscribeTypes = sequelize.define("subscribe_types", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
  duration: { type: DataTypes.INTEGER, allowNull: false },
  price: { type: DataTypes.INTEGER, allowNull: false },
});

User.hasOne(UserPayment);
UserPayment.belongsTo(User);

User.hasOne(Subscribe);
Subscribe.belongsTo(User);

SubscribeTypes.hasMany(Subscribe);
Subscribe.belongsTo(SubscribeTypes);

module.exports = {
  User,
  UserPayment,
  Subscribe,
  SubscribeTypes,
};

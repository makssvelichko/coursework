require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sequelize = require("./db");
const models = require("./models/models");
const PORT = process.env.PORT || 5000;
const router = require("./routes/index");
const errorHander = require("./middleware/ErrorHandlingMiddleware");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", router);

//Handler errors
app.use(errorHander);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();

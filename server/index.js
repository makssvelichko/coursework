require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sequelize = require("./db");
const models = require("./models/models");
const fileUpload = require("express-fileupload");
const router = require("./routes/index");
const errorHander = require("./middleware/ErrorHandlingMiddleware");
const path = require("path");
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT || 5000;
const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
};

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, "static")));
app.use(fileUpload({}));
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

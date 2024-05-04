const Router = require("express");
const router = new Router();
const userRouter = require("./userRouter");
const sub_typeRouter = require("./sub_typeRouter");

router.use("/user", userRouter);
router.use("/sub_type", sub_typeRouter);

module.exports = router;

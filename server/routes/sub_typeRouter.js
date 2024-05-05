const Router = require("express");
const router = new Router();
const sub_typeController = require("../controllers/sub_typeController");
const checkRole = require("../middleware/checkRoleMiddleware");

router.post("/", checkRole("ADMIN"), sub_typeController.create);
router.get("/", sub_typeController.getALL);

module.exports = router;

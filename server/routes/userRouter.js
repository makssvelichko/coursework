const Router = require("express");
const router = new Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const { body } = require("express-validator");

router.post(
  "/registration",
  body("email").isEmail(),
  body("password").isLength({ min: 4, max: 32 }),
  body("profilePhoto").custom((value, { req }) => {
    const photo = req.files?.profilePhoto || null;
    if (photo) {
      const allowedExtensions = ["jpg", "jpeg", "png"];
      const fileExtension = photo.name.split(".").pop();
      if (!allowedExtensions.includes(fileExtension)) {
        throw new Error(
          "Invalid file type. Only JPG, JPEG, and PNG are allowed."
        );
      }
    }
    return true; // Якщо файл відсутній або валідація успішна, повертаємо true
  }),
  userController.registration
);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/activate/:link", userController.activate);
router.get("/refresh", userController.refresh);

module.exports = router;

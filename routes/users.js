const express = require("express");
const {
  signup,
  login,
  logOut,
  currentUser,
  addAvatar
} = require("../controllers/userControllers");
const { userSchema, loginSchema } = require("../schemas/userSchemas");
const validateBody = require("../decorators/validateBody");
const { authenticate } = require("../middlewares/authenticate");
const upload = require("../middlewares/upload");

const router = express.Router();

router.post("/signup", validateBody(userSchema), signup);
router.post("/login", validateBody(loginSchema), login);
router.post("/logout", authenticate, logOut);
router.get("/current", authenticate, currentUser);
router.patch("/avatar",authenticate, upload.single("avatarURL"), addAvatar);

module.exports = router;

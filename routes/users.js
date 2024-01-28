const express = require("express");
const {
  signup,
  login,
  logOut,
  currentUser,
} = require("../controllers/userControllers");
const { userSchema, loginSchema } = require("../schemas/userSchemas");
const validateBody = require("../decorators/validateBody");
const { authenticate } = require("../middlewares/authenticate");

const router = express.Router();

router.post("/signup", validateBody(userSchema), signup);
router.post("/login", validateBody(loginSchema), login);
router.post("/logout", authenticate, logOut);
router.get("/current", authenticate, currentUser);

module.exports = router;

const express = require("express");
const { signup } = require("../controllers/userControllers");
const { userSchema } = require("../schemas/userSchemas");
const validateBody = require("../decorators/validateBody");

const router = express.Router();

router.post("/signup", validateBody(userSchema), signup);
router.post("/login");
router.post("/logout");
router.get("/current");

module.exports = router;

const express = require("express");

const router = express.Router();

router.post("/singup");
router.post("/login");
router.post("/logout");
router.get("/current");

module.exports = router;

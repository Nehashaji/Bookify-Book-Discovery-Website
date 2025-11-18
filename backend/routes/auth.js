const express = require("express");
const router = express.Router();
const { signup, login, googleSignup, googleLogin } = require("../controllers/authController");

router.post("/signup", signup);
router.post("/login", login);
router.post("/google-signup", googleSignup);
router.post("/google-login", googleLogin);

module.exports = router;
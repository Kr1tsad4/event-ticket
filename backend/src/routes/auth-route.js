const express = require("express");
const {
  loginController,
  registerController,
  verifyEmailController,
  resendVerificationEmailController,
} = require("../controllers/auth-controller");

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/verify-email", verifyEmailController);
router.post("/resend-verification", resendVerificationEmailController);

module.exports = router;

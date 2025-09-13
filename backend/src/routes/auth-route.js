const express = require("express");
const {
  loginController,
  registerController,
  verifyEmailController,
  resendVerificationEmailController,
  refreshTokenController,
  logoutController,
} = require("../controllers/auth-controller");

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/verify-email", verifyEmailController);
router.post("/resend-verification", resendVerificationEmailController);
router.post("/refresh-token", refreshTokenController);
router.post("/logout", logoutController);
module.exports = router;

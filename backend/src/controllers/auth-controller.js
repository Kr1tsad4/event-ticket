const authService = require("../services/auth-service");
const asyncHandler = require("express-async-handler");

const registerController = asyncHandler(async (req, res) => {
  const result = await authService.register(req.body);
  return res.status(200).json(result);
});

const loginController = asyncHandler(async (req, res) => {
  const result = await authService.login(req.body.email, req.body.password);
  return res.status(200).json(result);
});

const verifyEmailController = asyncHandler(async (req, res) => {
  const { token } = req.body; 

  const result = await authService.verifyEmail(token);
  return res.json(result);
});

const resendVerificationEmailController = asyncHandler(async (req, res) => {
  const result = await authService.resendVerificationEmail(req.body.email);
  return res.status(200).json(result);
});
module.exports = {
  registerController,
  loginController,
  verifyEmailController,
  resendVerificationEmailController,
};

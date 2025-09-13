const authService = require("../services/auth-service");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const registerController = asyncHandler(async (req, res) => {
  const result = await authService.register(req.body);
  return res.status(200).json(result);
});

const loginController = asyncHandler(async (req, res) => {
  const result = await authService.login(req.body.email, req.body.password);
  const { user, access_token, refresh_token } = result;
  res.cookie("refresh_token", refresh_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    path: "/",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return res.status(200).json({ user: user, access_token: access_token });
});

const logoutController = (req, res) => {
  res.cookie("refresh_token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Lax",
    path: "/",
    expires: new Date(0),
  });

  return res.status(200).json({ message: "Logged out successfully" });
};

const verifyEmailController = asyncHandler(async (req, res) => {
  const { token } = req.body;

  const result = await authService.verifyEmail(token);
  return res.json(result);
});

const resendVerificationEmailController = asyncHandler(async (req, res) => {
  const result = await authService.resendVerificationEmail(req.body.email);
  return res.status(200).json(result);
});

const refreshTokenController = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refresh_token;
  const result = await authService.refreshToken(refreshToken);

  res.cookie("refresh_token", result.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    path: "/",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return res.status(200).json({ access_token: result.accessToken });
});

module.exports = {
  registerController,
  loginController,
  verifyEmailController,
  resendVerificationEmailController,
  refreshTokenController,
  logoutController
};

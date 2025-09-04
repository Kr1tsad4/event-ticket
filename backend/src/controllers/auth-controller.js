const authService = require("../services/auth-service");
const asyncHandler = require("express-async-handler");

const registerController = asyncHandler(async (req, res) => {
  try {
    const result = await authService.register(req.body);
    res.json(result);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
});

const loginController = asyncHandler(async (req, res) => {
  try {
    const result = await authService.login(req.body.email, req.body.password);
    res.json(result);
  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
});
module.exports = {
  registerController,
  loginController,
};

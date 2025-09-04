const authService = require("../services/auth-service");
const asyncHandler = require("express-async-handler");

const registerController = asyncHandler(async (req, res) => {
    const result = await authService.register(req.body);
    return res.json(result);
});

const loginController = asyncHandler(async (req, res) => {
    const result = await authService.login(req.body.email, req.body.password);
    return res.json(result);
});
module.exports = {
  registerController,
  loginController,
};

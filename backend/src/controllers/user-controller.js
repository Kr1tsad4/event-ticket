const userService = require("../services/user-service");
const asyncHandler = require("express-async-handler");

const getUsers = asyncHandler(async (req, res) => {
  const users = await userService.findAll();
  return res.status(200).json(users);
});

const getUserById = asyncHandler(async (req, res) => {
  const user = await userService.findById(req.params.id);
  return res.status(200).json(user);
});

const deleteUserById = asyncHandler(async (req, res) => {
  await userService.deleteById(req.params.id);
  return res.status(200).json({ message: "User delete successfully." });
});

const updateUser = asyncHandler(async (req, res) => {
  const updatedUser = await userService.update(req.params.id, req.body);
  return res.status(200).json(updatedUser);
});
module.exports = {
  getUsers,
  getUserById,
  deleteUserById,
  updateUser
};

const userService = require("../services/user-service");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const SECRET_KEY = process.env.SECRET_KEY;

const createError = require("http-errors");

const register = async (user) => {
  const { email } = user;

  const existingUser = await userService.findByEmail(email);
  if (existingUser) {
    throw createError(400, "Email already in use.");
  }

  const newUser = await userService.create(user);

  const token = jwt.sign({ email: newUser.email }, SECRET_KEY, {
    expiresIn: "1h",
  });
 const newUserObj = newUser.toObject();
  delete newUserObj.__v;
  delete newUserObj.password;
  delete newUser.createdAt;
  delete newUser.updatedAt;

  return {
    user: newUserObj,
    token,
  };
};

const login = async (email, password) => {
  const user = await userService.findByEmail(email);
  if (!user) {
    throw createError(404, "User not found.");
  }
  const matchedPassword = bcrypt.compareSync(password, user.password);
  if (!matchedPassword) {
    throw createError(401, "Email or password is incorrect.");
  }

  const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: "1h" });
  const userObj = user.toObject();
  delete userObj.__v;
  delete userObj.password;

  return { user: userObj, token };
};

module.exports = {
    register,
    login
}
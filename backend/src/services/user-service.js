const User = require("../models/user");
const bcrypt = require("bcryptjs");
const createError = require("http-errors");

const findAll = async () => {
  return await User.find().select("-__v");
};

const findById = async (id) => {
  const existingUser = await User.findById(id);
  if (!existingUser) {
    throw createError(404, `User not found with id ${id}.`);
  }

  return existingUser;
};

const findByEmail = async (email) => {
  return await User.findOne({ email });
};

const create = async (user) => {
  const { fullName, email, password } = user;
  const hashedPassword = bcrypt.hashSync(password, 10);

  const newUser = await User.create({
    fullName,
    email,
    password: hashedPassword,
  });

  const newUserObj = newUser.toObject();
  delete newUserObj.__v;
  delete newUserObj.password;
  return newUser;
};

const deleteById = async (id) => {
  const existingUser = await User.findById(id);
  if (!existingUser) {
    throw createError(404, `User not found with id ${id}`);
  }
  await User.deleteOne(existingUser._id);
};
module.exports = { findAll, findById, create, findByEmail,deleteById };

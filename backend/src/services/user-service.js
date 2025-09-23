const User = require("../models/user");
const createError = require("http-errors");

const findAll = async () => {
  return await User.find().select("-__v -password");
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
  const { fullName, email, password, phoneNumber, dob } = user;

  const newUser = await User.create({
    fullName,
    email,
    password: password,
    phoneNumber: phoneNumber,
    dob: dob,
  });

  const newUserObj = newUser.toObject();
  delete newUserObj.__v;
  delete newUserObj.password;
  return newUser;
};

const update = async (id, user) => {
  const { fullName } = user;

  const updatedUser = await User.findOneAndUpdate(
    { _id: id },
    { fullName },
    { new: true }
  );

  if (!updatedUser) {
    throw createError(404, `User not found with id ${id}`);
  }

  return updatedUser;
};

const deleteById = async (id) => {
  const existingUser = await User.findById(id);
  if (!existingUser) {
    throw createError(404, `User not found with id ${id}`);
  }
  await User.deleteOne(existingUser._id);
};
module.exports = { findAll, findById, create, findByEmail, deleteById, update };

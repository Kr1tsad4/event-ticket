const userService = require("../services/user-service");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const mailService = require("../services/mail-service");
const SECRET_KEY = process.env.SECRET_KEY;

const createError = require("http-errors");

const register = async (user) => {
  const { fullName, email, password } = user;

  const existingUser = await userService.findByEmail(email);
  if (existingUser) {
    throw createError(400, "Email already in use.");
  }

  if (!password || password.length < 8 || password.length > 16) {
    throw createError(400, "Password must be 8-16 characters");
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  const newUser = await userService.create({
    fullName: fullName,
    email: email,
    password: hashedPassword,
  });

  const token = jwt.sign(
    { email: newUser.email, fullName: newUser.fullName, role: newUser.role },
    SECRET_KEY,
    {
      expiresIn: "1h",
    }
  );
  await mailService.sendMail({
    to: email,
    subject: "Verify your email",
    text: `Please verify your email by clicking this link:\n\n${process.env.FRONTEND_URL}/verify-email/?token=${token}`,
  });

  const newUserObj = newUser.toObject();
  delete newUserObj.__v;
  delete newUserObj.password;
  delete newUserObj.createdAt;
  delete newUserObj.updatedAt;

  return newUserObj;
};

const login = async (email, password) => {
  const user = await userService.findByEmail(email);
  if (!user) {
    throw createError(404, "Account not found");
  }
  const matchedPassword = bcrypt.compareSync(password, user.password);

  if (!matchedPassword) {
    throw createError(401, "Email or password is incorrect");
  }

  const accessToken = jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    SECRET_KEY,
    { expiresIn: "30m" }
  );

  const refreshToken = jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    SECRET_KEY,
    { expiresIn: "7d" }
  );
  const userObj = user.toObject();
  delete userObj.__v;
  delete userObj.password;

  return {
    user: userObj,
    access_token: accessToken,
    refresh_token: refreshToken,
  };
};

const resendVerificationEmail = async (email) => {
  const user = await userService.findByEmail(email);
  if (!user) {
    throw createError(404, "Account not found");
  }

  if (user.isVerified) {
    throw createError(400, "User is already verified");
  }

  const token = jwt.sign(
    { email: user.email, fullName: user.fullName, role: user.role },
    SECRET_KEY,
    { expiresIn: "1h" }
  );

  await mailService.sendMail({
    to: email,
    subject: "Verify your email (resend)",
    text: `${process.env.FRONTEND_URL}/verify-email/?token=${token}`,
    html: `<p>Click <a href="${process.env.FRONTEND_URL}/verify-email/?token=${token}">here</a> to verify your email.</p>`,
  });

  return { message: "Verification email resent successfully" };
};

const verifyEmail = async (token) => {
  try {
    const decoded = jwt.verify(token, SECRET_KEY);

    const user = await userService.findByEmail(decoded.email);
    if (!user) {
      throw createError(404, "Account not found");
    }
    user.isVerified = true;
    await user.save();

    return { message: "Email verified successfully" };
  } catch (err) {
    throw createError(401, "Verification failed: " + err.message);
  }
};
const refreshToken = async (token) => {
  try {
    const decoded = jwt.verify(token, SECRET_KEY);

    const accessToken = jwt.sign(
      {
        id: decoded._id,
        email: decoded.email,
        role: decoded.role,
      },
      SECRET_KEY,
      { expiresIn: "30m" }
    );
    const refreshToken = jwt.sign(
      {
        id: decoded._id,
        email: decoded.email,
        role: decoded.role,
      },
      process.env.SECRET_KEY,
      { expiresIn: "7d" }
    );
    return { accessToken, refreshToken };
  } catch (err) {
    throw createError(401, "Invalid or expired refresh token");
  }
};

module.exports = {
  register,
  login,
  verifyEmail,
  resendVerificationEmail,
  refreshToken,
};

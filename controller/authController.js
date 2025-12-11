const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");

const {
  User,
  validateRegisterUser,
  validateLoginUser,
} = require("../models/User");

/**
 * @desc     Register New User
 * @route    /api/auth/register
 * @method   POST
 * @access   public
 */

const register = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;
  //Validate
  const { error } = validateRegisterUser({
    email,
    username,
    password,
  });
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  // Check if exist or not
  let user = await User.findOne({ email: email });
  if (user) {
    return res.status(400).json({ message: "This User Already Register" });
  }
  // Need to Hash the password Before Store it in Database using bcrypt module
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  user = new User({
    email: email,
    username: username,
    password: hashPassword,
  });
  const result = await user.save();
  // For future Token Process
  const Token = user.generateToken();
  const { password: hashedPassword, ...other } = result._doc;

  return res.status(201).json({ ...other, Token });
});

/**
 * @desc     Login User
 * @route    /api/auth/login
 * @method   POST
 * @access   public
 */
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  //Validate
  const { error } = validateLoginUser({
    email,
    password,
  });
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  // Check if exist or not
  let user = await User.findOne({ email: email });
  if (!user) {
    return res.status(400).json({ message: "invalid Email Or Password" });
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    return res.status(400).json({ message: "invalid Email Or Password" });
  }
  // For future Token Process
  // Create New Token with function called sign
  // sign function take ({payload},Secret of private Key)
  // Show in 3 parts
  // {Header.Payload.signature}
  const Token = user.generateToken();
  const { password: hashedPassword, ...other } = user._doc;

  return res.status(200).json({ ...other, Token });
});
module.exports = { register, login };

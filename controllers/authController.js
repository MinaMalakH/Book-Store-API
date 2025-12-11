const bcrypt = require("bcryptjs");
const {
  User,
  validateRegisterUser,
  validateLoginUser,
} = require("../models/User");

async function register(req, res) {
  const { email, username, password } = req.body;
  const { error } = validateRegisterUser({ email, username, password });
  if (error) return res.status(400).json({ message: error.details[0].message });

  let user = await User.findOne({ email });
  if (user)
    return res.status(400).json({ message: "This User Already Register" });

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  user = new User({ email, username, password: hashPassword });
  const result = await user.save();

  const Token = user.generateToken();
  const { password: hashedPassword, ...other } = result._doc;
  return res.status(201).json({ ...other, Token });
}

async function login(req, res) {
  const { email, password } = req.body;
  const { error } = validateLoginUser({ email, password });
  if (error) return res.status(400).json({ message: error.details[0].message });

  const user = await User.findOne({ email });
  if (!user)
    return res.status(400).json({ message: "invalid Email Or Password" });

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch)
    return res.status(400).json({ message: "invalid Email Or Password" });

  const Token = user.generateToken();
  const { password: hashedPassword, ...other } = user._doc;
  return res.status(200).json({ ...other, Token });
}

module.exports = { register, login };

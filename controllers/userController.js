const bcrypt = require("bcryptjs");
const { User, validateUpdateUser } = require("../models/User");

async function updateUser(req, res) {
  const { email, username, password, idAdmin } = req.body;
  const { error } = validateUpdateUser({ email, username, password, idAdmin });
  if (error) return res.status(400).json({ message: error.message });

  let newPassword = password;
  if (password) {
    const salt = await bcrypt.genSalt(10);
    newPassword = await bcrypt.hash(password, salt);
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    { $set: { email, password: newPassword, username } },
    { new: true }
  ).select("-password");

  res.status(200).json(updatedUser);
}

async function getAllUsers(req, res) {
  const users = await User.find().select("-password");
  res.status(200).json(users);
}

async function getUserById(req, res) {
  const user = await User.findById(req.params.id).select("-password");
  if (user) return res.status(200).json(user);
  return res.status(404).json({ message: "User Not Found" });
}

async function deleteUser(req, res) {
  const user = await User.findById(req.params.id).select("-password");
  if (user) {
    await User.findByIdAndDelete(req.params.id);
    return res
      .status(200)
      .json({ message: "User Has Been Deleted Successfully" });
  }
  return res.status(404).json({ message: "User Not Found" });
}

module.exports = { updateUser, getAllUsers, getUserById, deleteUser };

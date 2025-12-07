const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");

const { User, validateUpdateUser } = require("../models/User");

const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middlewares/VerifyToken");

/**
 * @desc     Update User
 * @route    /api/users/:id
 * @method   PUT
 * @access   private
 */

router.put(
  "/:id",
  verifyTokenAndAuthorization,
  asyncHandler(async (req, res) => {
    const { email, username, password, idAdmin } = req.body;
    const { error } = validateUpdateUser({
      email,
      username,
      password,
      idAdmin,
    });
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    let newPassword = password;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      newPassword = await bcrypt.hash(password, salt);
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          email: email,
          password: newPassword,
          username: username,
        },
      },
      { new: true }
    ).select("-password");

    res.status(200).json(updatedUser);
  })
);

/**
 * @desc     Get All Users
 * @route    /api/users/
 * @method   GET
 * @access   private (Only for Admin)
 */

router.get(
  "/",
  verifyTokenAndAdmin,
  asyncHandler(async (req, res) => {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  })
);

/**
 * @desc     Get User By Id
 * @route    /api/users/:id
 * @method   GET
 * @access   private (Only for Admin and Yser Himself)
 */

router.get(
  "/:id",
  verifyTokenAndAuthorization,
  // Protected Route
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select("-password");
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User Not Found" });
    }
  })
);

/**
 * @desc     Delete User By Id
 * @route    /api/users/:id
 * @method   Delete
 * @access   private (Only for Admin and Yser Himself)
 */

router.delete(
  "/:id",
  verifyTokenAndAuthorization,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select("-password");
    if (user) {
      const result = await User.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "User Has Been Deleted Successfully" });
    } else {
      res.status(404).json({ message: "User Not Found" });
    }
  })
);
module.exports = router;

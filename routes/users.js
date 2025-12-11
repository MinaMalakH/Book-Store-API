const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");

const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middlewares/VerifyToken");

const {
  updateUser,
  getAllUsers,
  getUserById,
  deleteUser,
} = require("../controllers/userController");

/**
 * @desc     Update User
 * @route    /api/users/:id
 * @method   PUT
 * @access   private
 */

router.put("/:id", verifyTokenAndAuthorization, asyncHandler(updateUser));

/**
 * @desc     Get All Users
 * @route    /api/users/
 * @method   GET
 * @access   private (Only for Admin)
 */

router.get("/", verifyTokenAndAdmin, asyncHandler(getAllUsers));

/**
 * @desc     Get User By Id
 * @route    /api/users/:id
 * @method   GET
 * @access   private (Only for Admin and Yser Himself)
 */

router.get("/:id", verifyTokenAndAuthorization, asyncHandler(getUserById));

/**
 * @desc     Delete User By Id
 * @route    /api/users/:id
 * @method   Delete
 * @access   private (Only for Admin and Yser Himself)
 */

router.delete("/:id", verifyTokenAndAuthorization, asyncHandler(deleteUser));
module.exports = router;

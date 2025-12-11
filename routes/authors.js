const express = require("express");
const { verifyTokenAndAdmin } = require("../middlewares/VerifyToken");
const asyncHandler = require("express-async-handler");
const router = express.Router();
const {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
} = require("../controllers/authorController");

// GET , POST , DELETE , PUT

/**
 * @desc     Get All Authors
 * @route    /api/authors
 * @method   GET
 * @access   public
 */
router.get("/", asyncHandler(getAllAuthors));

/*******************************************/
/**
 * @desc     Get Author By ID
 * @route    /api/authors
 * @method   GET
 * @access   public
 */
router.get("/:id", asyncHandler(getAuthorById));

/***************************************/
/**
 * @desc     Add New Author With validation
 * @route    /api/author
 * @method   POST
 * @access   private (Only Admin)
 */
router.post("/", verifyTokenAndAdmin, asyncHandler(createAuthor));

/***************************************/
/**
 * @desc     Update Existing Author By ID
 * @route    /api/author
 * @method   PUT
 * @access   private (Only Admin)
 */
router.put("/:id", verifyTokenAndAdmin, asyncHandler(updateAuthor));
/***************************************/
/**
 * @desc     Delete  Author By ID
 * @route    /api/author
 * @method   PUT
 * @access   private (Only Admin)
 */
router.delete("/:id", verifyTokenAndAdmin, asyncHandler(deleteAuthor));
/***************************************/
module.exports = router;

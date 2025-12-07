const express = require("express");
const { verifyTokenAndAdmin } = require("../middlewares/VerifyToken");
const asyncHandler = require("express-async-handler");
const router = express.Router();

const {
  Author,
  validateCreateAuthor,
  validateUpdateAuthor,
} = require("../models/Author");

// GET , POST , DELETE , PUT

/**
 * @desc     Get All Authors
 * @route    /api/authors
 * @method   GET
 * @access   public
 */
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const authors = await Author.find();
    // const authors = await Author.find()
    //   .sort({ firstName: 1 })
    //   .select("firstName lastName -_id");
    res.status(200).json(authors);
  })
);

/*******************************************/
/**
 * @desc     Get Author By ID
 * @route    /api/authors
 * @method   GET
 * @access   public
 */
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const author = await Author.findById(req.params.id);
    if (!author) {
      return res.status(404).json({ message: "Author isn't Found" });
    }
    return res.status(200).json(author);
  })
);

/***************************************/
/**
 * @desc     Add New Author With validation
 * @route    /api/author
 * @method   POST
 * @access   private (Only Admin)
 */
router.post(
  "/",
  verifyTokenAndAdmin,
  asyncHandler(async (req, res) => {
    const { firstName, lastName, nationality, image } = req.body;
    const { error } = validateCreateAuthor({
      firstName,
      lastName,
      nationality,
      image,
    });
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    const newAuthor = new Author({
      firstName: firstName,
      lastName: lastName,
      nationality: nationality,
      image: image,
    });
    //return Promise
    const result = await newAuthor.save();
    res.status(200).json(result);
  })
);

/***************************************/
/**
 * @desc     Update Existing Author By ID
 * @route    /api/author
 * @method   PUT
 * @access   private (Only Admin)
 */
router.put(
  "/:id",
  verifyTokenAndAdmin,
  asyncHandler(async (req, res) => {
    const { firstName, lastName, nationality, image } = req.body;
    const { error } = validateUpdateAuthor({
      firstName,
      lastName,
      nationality,
      image,
    });
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    const updatedAuthor = await Author.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          firstName: firstName,
          lastName: lastName,
          nationality: nationality,
          image: image,
        },
      },
      { new: true }
    );
    res.status(200).json(updatedAuthor);
  })
);
/***************************************/
/**
 * @desc     Delete  Author By ID
 * @route    /api/author
 * @method   PUT
 * @access   private (Only Admin)
 */
router.delete(
  "/:id",
  verifyTokenAndAdmin,
  asyncHandler(async (req, res) => {
    const author = await Author.findById(req.params.id);
    if (author) {
      const deleteAuthor = await Author.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Author has been Deleted" });
    } else {
      res.status(404).json({ message: "The Author not Found" });
    }
  })
);
/***************************************/
module.exports = router;

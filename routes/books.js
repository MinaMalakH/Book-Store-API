const express = require("express");
const { verifyTokenAndAdmin } = require("../middlewares/VerifyToken");

const {
  Book,
  validateCreateBook,
  validateUpdateBook,
} = require("../models/Books");

const router = express.Router();

const asyncHandler = require("express-async-handler");

// const books = [
//   {
//     id: 1,
//     title: "Black ",
//     author: "Nasim Taleb",
//     description: "About Black Swan",
//     price: 10,
//     cover: "soft cover",
//   },
//   {
//     id: 2,
//     title: "Rich Dad Poor Dad",
//     author: "Robert Kiyosaki",
//     description: "About Black Rich Dad Poor Dad",
//     price: 12,
//     cover: "soft cover",
//   },
// ];

// HTTP Methods (Called Verbs)
// app.get();
// app.post();
// app.delete();
// app.put();

// Let's Start with get method
// Take 2 Argument (URL,Callback Function [Called Route handler])
// Route handler take 2 Argument (req,res)

// Now let's make a get function that send message to the client on get method

/**
 * @desc     Get All Books
 * @route    /api/books
 * @method   GET
 * @access   public
 */
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const books = await Book.find().populate("author", [
      "_id",
      "firstName",
      "lastName",
    ]);
    res.status(200).json(books);
  })
);

/**
 * @desc     Get Book By ID
 * @route    /api/books
 * @method   GET
 * @access   public
 */
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    //   const book = books.find((b) => b.id.toString() === req.params.id);
    const book = await Book.findById(req.params.id).populate("author");
    if (book) {
      res.status(200).json(book);
    } else {
      res.status(404).json({ message: "Book Not Found " });
    }
  })
);

/**
 * @desc     Add New Book With Validation
 * @route    /api/books
 * @method   POST
 * @access   private (Only Admin)
 */

router.post(
  "/",
  verifyTokenAndAdmin,
  asyncHandler(async (req, res) => {
    /*Have a big problem that i the field is empty
    Also will store empty data 
    needed for a validation 
    */
    const { title, author, description, price, cover } = req.body;
    const { error } = validateCreateBook({
      title,
      author,
      description,
      price,
      cover,
    });
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const newBook = new Book({
      title: title,
      author: author,
      description: description,
      price: price,
      cover: cover,
    });
    const result = await newBook.save();
    res.status(200).json(result);
  })
);
/**
 * @desc     Update a existing book
 * @route    /api/books/:id
 * @method   PUT
 * @access   private (only Admin)
 */

router.put(
  "/:id",
  verifyTokenAndAdmin,
  asyncHandler(async (req, res) => {
    const { title, author, description, price, cover } = req.body;
    const { error } = validateUpdateBook({
      title,
      author,
      description,
      price,
      cover,
    });

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          title: title,
          author: author,
          description: description,
          price: price,
          cover: cover,
        },
      },
      { new: true }
    );

    return res.status(200).json(updatedBook);
  })
);
/**
 * @desc     Delete a existing book
 * @route    /api/books/:id
 * @method   Delete
 * @access   private (only Admin)
 */

router.delete(
  "/:id",
  verifyTokenAndAdmin,
  asyncHandler(async (req, res) => {
    const existingBook = await Book.findById(req.params.id);
    if (!existingBook) {
      return res.status(404).json({ message: "The Book isn't Found" });
    } else {
      await Book.findByIdAndDelete(req.params.id);
      return res.status(200).json({ message: "The Book has been Deleted" });
    }
  })
);

module.exports = router;

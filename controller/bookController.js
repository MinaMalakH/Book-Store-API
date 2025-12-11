const asyncHandler = require("express-async-handler");

const {
  Book,
  validateCreateBook,
  validateUpdateBook,
} = require("../models/Books");

// For Get All Book Method
/**
 * @desc     Get All Books
 * @route    /api/books
 * @method   GET
 * @access   public
 */
const getAllBook = asyncHandler(async (req, res) => {
  const normalQuery = { ...req.query };
  const { minPrice, maxPrice } = normalQuery;
  let books;
  if (minPrice & maxPrice) {
    books = await Book.find({
      price: { $gte: minPrice, $lte: maxPrice },
    }).populate("author", ["_id", "firstName", "lastName"]);
  } else {
    books = await Book.find().populate("author", [
      "_id",
      "firstName",
      "lastName",
    ]);
  }
  res.status(200).json(books);
});

/**
 * @desc     Get Book By ID
 * @route    /api/books
 * @method   GET
 * @access   public
 */
const getBookByID = asyncHandler(async (req, res) => {
  //   const book = books.find((b) => b.id.toString() === req.params.id);
  const book = await Book.findById(req.params.id).populate("author");
  if (book) {
    res.status(200).json(book);
  } else {
    res.status(404).json({ message: "Book Not Found " });
  }
});

/**
 * @desc     Add New Book With Validation
 * @route    /api/books
 * @method   POST
 * @access   private (Only Admin)
 */
const createNewBook = asyncHandler(async (req, res) => {
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
});

/**
 * @desc     Update a existing book
 * @route    /api/books/:id
 * @method   PUT
 * @access   private (only Admin)
 */

const updateExistingBook = asyncHandler(async (req, res) => {
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
});

/**
 * @desc     Delete a existing book
 * @route    /api/books/:id
 * @method   Delete
 * @access   private (only Admin)
 */

const deleteExistingBook = asyncHandler(async (req, res) => {
  const existingBook = await Book.findById(req.params.id);
  if (!existingBook) {
    return res.status(404).json({ message: "The Book isn't Found" });
  } else {
    await Book.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "The Book has been Deleted" });
  }
});

module.exports = {
  getAllBook,
  getBookByID,
  createNewBook,
  updateExistingBook,
  deleteExistingBook,
};

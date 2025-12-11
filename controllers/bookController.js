const {
  Book,
  validateCreateBook,
  validateUpdateBook,
} = require("../models/Books");

async function getAllBooks(req, res) {
  const books = await Book.find().populate("author", [
    "_id",
    "firstName",
    "lastName",
  ]);
  res.status(200).json(books);
}

async function getBookById(req, res) {
  const book = await Book.findById(req.params.id).populate("author");
  if (book) return res.status(200).json(book);
  return res.status(404).json({ message: "Book Not Found " });
}

async function createBook(req, res) {
  const { title, author, description, price, cover } = req.body;
  const { error } = validateCreateBook({
    title,
    author,
    description,
    price,
    cover,
  });
  if (error) return res.status(400).json({ message: error.details[0].message });

  const newBook = new Book({ title, author, description, price, cover });
  const result = await newBook.save();
  res.status(200).json(result);
}

async function updateBook(req, res) {
  const { title, author, description, price, cover } = req.body;
  const { error } = validateUpdateBook({
    title,
    author,
    description,
    price,
    cover,
  });
  if (error) return res.status(400).json({ message: error.details[0].message });

  const updatedBook = await Book.findByIdAndUpdate(
    req.params.id,
    { $set: { title, author, description, price, cover } },
    { new: true }
  );
  return res.status(200).json(updatedBook);
}

async function deleteBook(req, res) {
  const existingBook = await Book.findById(req.params.id);
  if (!existingBook)
    return res.status(404).json({ message: "The Book isn't Found" });
  await Book.findByIdAndDelete(req.params.id);
  return res.status(200).json({ message: "The Book has been Deleted" });
}

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};

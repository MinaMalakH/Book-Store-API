const {
  Author,
  validateCreateAuthor,
  validateUpdateAuthor,
} = require("../models/Author");

async function getAllAuthors(req, res) {
  const authors = await Author.find();
  res.status(200).json(authors);
}

async function getAuthorById(req, res) {
  const author = await Author.findById(req.params.id);
  if (!author) return res.status(404).json({ message: "Author isn't Found" });
  return res.status(200).json(author);
}

async function createAuthor(req, res) {
  const { firstName, lastName, nationality, image } = req.body;
  const { error } = validateCreateAuthor({
    firstName,
    lastName,
    nationality,
    image,
  });
  if (error) return res.status(400).json({ message: error.message });
  const newAuthor = new Author({ firstName, lastName, nationality, image });
  const result = await newAuthor.save();
  res.status(200).json(result);
}

async function updateAuthor(req, res) {
  const { firstName, lastName, nationality, image } = req.body;
  const { error } = validateUpdateAuthor({
    firstName,
    lastName,
    nationality,
    image,
  });
  if (error) return res.status(400).json({ message: error.message });
  const updatedAuthor = await Author.findByIdAndUpdate(
    req.params.id,
    { $set: { firstName, lastName, nationality, image } },
    { new: true }
  );
  res.status(200).json(updatedAuthor);
}

async function deleteAuthor(req, res) {
  const author = await Author.findById(req.params.id);
  if (author) {
    await Author.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "Author has been Deleted" });
  }
  return res.status(404).json({ message: "The Author not Found" });
}

module.exports = {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
};

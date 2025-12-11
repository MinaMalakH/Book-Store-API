const { Book } = require("./models/Books");

const { Author } = require("./models/Author");

const { books, authors } = require("./data");

const { connectToDB } = require("./config/db");

require("dotenv").config();

// Connection To DB
connectToDB();

// Import Books (Seeding database )
const importBooks = async () => {
  try {
    await Book.insertMany(books);
    console.log("Books Imported");
  } catch (error) {
    console.log(error);
    console.log("Books being inserted:", books);
    // Stop The DB Connection
    process.exit(1);
  }
};

// Remove Books
const removeBooks = async () => {
  try {
    await Book.deleteMany();
    console.log("Books Removed");
  } catch (error) {
    console.log(error);

    // Stop The DB Connection
    process.exit(1);
  }
};

// Import Authors (Seeding database )
const importAuthors = async () => {
  try {
    await Author.insertMany(authors);
    console.log("Authors Imported");
  } catch (error) {
    console.log(error);
    console.log("Authors being inserted:", authors);
    // Stop The DB Connection
    process.exit(1);
  }
};

// Remove Books
const removeAuthors = async () => {
  try {
    await Author.deleteMany();
    console.log("Books Removed");
  } catch (error) {
    console.log(error);

    // Stop The DB Connection
    process.exit(1);
  }
};

// In Terminal
// Node seeder -import
if (process.argv[2] === "-import") {
  importBooks();
}
// Node seeder -remove
else if (process.argv[2] === "-remove") {
  removeBooks();
} else if (process.argv[2] === "-import-authors") {
  importAuthors();
}

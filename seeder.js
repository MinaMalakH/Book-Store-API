const { Book } = require("./models/Books");

const { books } = require("./data");

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

// In Terminal
// Node seeder -import
if (process.argv[2] === "-import") {
  importBooks();
}
// Node seeder -remove
else if (process.argv[2] === "-remove") {
  removeBooks();
}

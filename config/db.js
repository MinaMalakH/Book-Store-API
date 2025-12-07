const mongoose = require("mongoose");
// Connection To Database
// Return Promise
async function connectToDB() {
  try {
    await mongoose.connect(process.env.MongoURI);
    console.log("Connected to MongoDB..");
  } catch (error) {
    console.log("Connection Failed To MongoDB!", error);
  }
}

// mongoose
//   .connect(process.env.MongoURI)
//   .then(() => console.log("Connected to MongoDB.."))
//   .catch((error) => console.log("Connection Failed To MongoDB!", error));
module.exports = { connectToDB };

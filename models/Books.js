const mongoose = require("mongoose");

// Install Joi To make a input validation
const Joi = require("joi");

const BookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
      trim: true,
      minlength: 3,
      maxlength: 250,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "Author",
    },
    description: {
      type: String,
      require: true,
      trim: true,
      minlength: 5,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    cover: {
      type: String,
      require: true,
      enum: ["Soft Cover", "Hard Cover"],
    },
  },
  { timestamps: true }
);

// Book MOdel

const Book = mongoose.model("Book", BookSchema);
/**********************************/

function validateCreateBook({ title, author, description, price, cover }) {
  const schema = Joi.object({
    title: Joi.string().trim().min(3).max(250).required(),
    author: Joi.string().required(),
    description: Joi.string().trim().min(5).required(),
    price: Joi.number().min(0).required(),
    cover: Joi.string().valid("Soft Cover", "Hard Cover").required(),
  });
  return schema.validate({
    title,
    author,
    description,
    price,
    cover,
  });
}

function validateUpdateBook({ title, author, description, price, cover }) {
  const schema = Joi.object({
    title: Joi.string().trim().min(3).max(250),
    author: Joi.string(),
    description: Joi.string().trim().min(5),
    price: Joi.number().min(0),
    cover: Joi.string().valid("Soft Cover", "Hard Cover"),
  });
  return schema.validate({
    title,
    author,
    description,
    price,
    cover,
  });
}
module.exports = { Book, validateCreateBook, validateUpdateBook };

const mongoose = require("mongoose");
const Joi = require("joi");

const AuthorSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 200,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 200,
    },
    nationality: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    image: {
      type: String,
      default: "default-avatar.png",
    },
  },
  {
    timestamps: true,
  }
);

const Author = mongoose.model("Author", AuthorSchema);

function validateCreateAuthor({ firstName, lastName, nationality, image }) {
  const schema = Joi.object({
    firstName: Joi.string().min(3).max(200).trim().required(),
    lastName: Joi.string().min(3).max(200).trim().required(),
    nationality: Joi.string().min(2).max(100).trim().required(),
    image: Joi.string(),
  });
  return schema.validate({
    firstName,
    lastName,
    nationality,
    image,
  });
}
function validateUpdateAuthor({ firstName, lastName, nationality, image }) {
  const schema = Joi.object({
    firstName: Joi.string().min(3).max(200).trim(),
    lastName: Joi.string().min(3).max(200).trim(),
    nationality: Joi.string().min(2).max(100).trim(),
    image: Joi.string(),
  });
  return schema.validate({
    firstName,
    lastName,
    nationality,
    image,
  });
}
module.exports = { Author, validateCreateAuthor, validateUpdateAuthor };

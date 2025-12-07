const mongoose = require("mongoose");

const Joi = require("joi");

const JWT = require("jsonwebtoken");

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 5,
      maxlength: 100,
    },
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 200,
    },
    password: {
      type: String,
      require: true,
      trim: true,
      minlength: 6,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Generate Token
// Can't use Arrow function with this keyword
UserSchema.methods.generateToken = function () {
  return JWT.sign(
    { id: this._id, isAdmin: this.isAdmin },
    process.env.JWT_SECRET_KEY
    /*{ expiresIn: "4h" }*/
  );
};
const User = mongoose.model("User", UserSchema);

// Validation Register User
function validateRegisterUser({ email, username, password }) {
  const schema = Joi.object({
    email: Joi.string().trim().required().min(5).max(100).email(),
    username: Joi.string().trim().min(2).max(200).required(),
    password: Joi.string().required().trim().min(6),
  });
  return schema.validate({ email, username, password });
}

// Validation Login User
function validateLoginUser({ email, password }) {
  const schema = Joi.object({
    email: Joi.string().trim().required().min(5).max(100).email(),
    password: Joi.string().required().trim().min(6),
  });
  return schema.validate({ email, password });
}

// Validation Update User
function validateUpdateUser({ email, username, password, isAdmin }) {
  const schema = Joi.object({
    email: Joi.string().trim().min(5).max(100).email(),
    username: Joi.string().trim().min(2).max(200),
    password: Joi.string().trim().min(6),
  });
  return schema.validate({ email, username, password, isAdmin });
}

module.exports = {
  User,
  validateRegisterUser,
  validateLoginUser,
  validateUpdateUser,
};

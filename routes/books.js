const express = require("express");
const { verifyTokenAndAdmin } = require("../middlewares/VerifyToken");
const asyncHandler = require("express-async-handler");
const router = express.Router();
const {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} = require("../controllers/bookController");

router.get("/", asyncHandler(getAllBooks));

router.get("/:id", asyncHandler(getBookById));

router.post("/", verifyTokenAndAdmin, asyncHandler(createBook));

router.put("/:id", verifyTokenAndAdmin, asyncHandler(updateBook));

router.delete("/:id", verifyTokenAndAdmin, asyncHandler(deleteBook));

module.exports = router;

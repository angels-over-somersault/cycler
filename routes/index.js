const express = require("express");
const router = express.Router();
const Book = require("../models/book");
router.get("/", async (req, res) => {
  let books;
  try {
    books = await Book.find()
      .sort({
        createAt: "desc",
      })
      .limit(10)
      .exec();
  } catch (error) {
    books = [];
  }
  res.render("index", {
    books: books,
  });
});

// Export this route to make it available to our application:
module.exports = router;

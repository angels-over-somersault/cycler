const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index");
});

// Export this route to make it available to our application:
module.exports = router;

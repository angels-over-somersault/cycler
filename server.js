// Load `.env` only in Development environment:
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: "./.env" });
  // require("dotenv").
}

// Dependencies:
const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const port = process.env.PORT || 8000;

// Link application to routes in 'routes/index.js':
const indexRouter = require("./routes/index");
const authorRouter = require("./routes/authors");
const bookRouter = require("./routes/books");

// Configuring Express application:
// Set the 'view engine' to use 'ejs':
app.set("view engine", "ejs");

// Set location of 'views' and 'layouts' directory:
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");

// Tell Express to use 'expressLayouts'
app.use(expressLayouts);
// Tell Express location of 'public' directory for stylesheets, javascript, imgs
app.use(express.static("public"));
// '_method' parameter will take a 'put' or 'delete' argument
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: false }));
// Connect to MongoDB Database using mongoose:
const mongoose = require("mongoose");
mongoose.connect(process.env.BIKEAPP_DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Mongoose."));

// Use the linked 'routes/index.js' route in application:
// 'indexRouter' and 'authorRouter' is the name assigned from import/require
app.use("/", indexRouter);
app.use("/authors", authorRouter);
app.use("/books", bookRouter);

// Set up Server and Listening Port
app.listen(port, () => {
  console.log(`Listening on Port: ${port}`);
});

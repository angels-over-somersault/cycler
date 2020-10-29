// Load `.env` only in Development environment:
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: "./.env" });
}

// Dependencies:
const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const bodyParser = require("body-parser");
const port = process.env.PORT || 8000;

// Link application to routes in 'routes/index.js':
const indexRouter = require("./routes/index");
const authorRouter = require("./routes/authors");

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
app.use("/", indexRouter);
app.use("/authors", authorRouter);

// Set up Server and Listening Port
app.listen(port, () => {
  console.log(`Listening on Port: ${port}`);
});

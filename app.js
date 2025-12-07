const express = require("express");
const logger = require("./middlewares/logger");
const ErrorHandlerMiddleware = require("./middlewares/ErrorHandler");
const NotFoundHandlerMiddleware = require("./middlewares/NotFoundHandler");
const app = express();
require("dotenv").config();

// Connection To Database
const { connectToDB } = require("./config/db");
connectToDB();

// Express provide middleware convert JSON to js object Called express.json
// Apply middleware
app.use(express.json());
app.use(logger);

// Routes
app.use("/api/books", require("./routes/books"));
app.use("/api/authors", require("./routes/authors"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));

// Not Found API Handler Middleware
app.use(NotFoundHandlerMiddleware);

// Error Handler Middleware [Must be after the Routers]
app.use(ErrorHandlerMiddleware);
// Running the server
// app.listen Take two argument (No of port , Callback function)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(
    `Now the server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
  );
});

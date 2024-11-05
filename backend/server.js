const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const httpErrors = require("http-errors");
require("dotenv").config();
const db = require("./model");

const ProductRouter = require("./route/product-route");
const CategoryRouter = require("./route/category-route");
const BillRouter =require("./route/bill-route")
const app = express();
const userRouter= require("./route/user-route");

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Database Connection
db.connectDB()
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch(err => {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1); // Exit if DB connection fails
  });

// Routes
app.use("/product", ProductRouter);
app.use("/category", CategoryRouter);
app.use("/bill",BillRouter)
app.use("/users", userRouter);

// Default route
app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to RESTFul API - NodeJS" });
});

// 404 Not Found
app.use((req, res, next) => {
  res.status(404).json({ error: "Not Found" });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err); // Log error details
  res.status(err.status || 500).json({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

// Start Server
const HOST = process.env.NODE_ENV === "production" ? "0.0.0.0" : process.env.HOSTNAME || "127.0.0.1";
const PORT = process.env.PORT || 8080;

app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});

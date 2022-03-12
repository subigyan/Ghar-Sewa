const express = require("express");
const dotenv = require("dotenv").config();
const errorHandler = require("./middlewares/errorMiddleware");
const colors = require("colors");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;

const app = express();
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const customerRoute = require("./routes/customerRoutes");
const reviewRoutes = require("./routes/reviewRoutes");

app.use("/api/customers", customerRoute);
app.use("/api/reviews", reviewRoutes);
app.use(errorHandler);

app.listen(PORT, () =>
  console.log(`Server is running on port ${PORT}`.green.bold)
);

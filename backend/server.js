const express = require("express");
const dotenv = require("dotenv").config();
const errorHandler = require("./middlewares/errorMiddleware");
const colors = require("colors");
const connectDB = require("./config/db");
var cors = require("cors");

const PORT = process.env.PORT || 5000;

const app = express();
connectDB();

app.use(express.json());
app.use(cors());

app.use(express.urlencoded({ extended: false }));

const customerRoute = require("./routes/customerRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const serviceProviderRoutes = require("./routes/serviceProviderRoutes");
const quotationRoutes = require("./routes/quotationRoutes");

app.use("/api/customers", customerRoute);
app.use("/api/reviews", reviewRoutes);
app.use("/api/serviceProviders", serviceProviderRoutes);
app.use("/api/quotations", quotationRoutes);

app.use(errorHandler);

app.listen(PORT, () =>
  console.log(`Server is running on port ${PORT}`.green.bold)
);

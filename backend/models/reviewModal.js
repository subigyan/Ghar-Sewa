const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Customer",
    },
    serviceProvider: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "ServiceProvider",
    },
    rating: {
      type: Number,
      required: [true, "Please enter a rating"],
    },
    reviewHeadline: {
      type: String,
      required: [true, "Please enter a review headline"],
    },
    review: {
      type: String,
      required: [true, "Please enter a review"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Review", reviewSchema);

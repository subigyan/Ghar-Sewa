const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Customer",
    },
    // serviceProvider: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true,
    //     ref: "Customer",
    // },
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

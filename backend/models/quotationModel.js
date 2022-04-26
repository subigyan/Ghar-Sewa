const mongoose = require("mongoose");

const quotationSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Customer",
    },
    requestHeadline: {
      type: String,
      required: [true, "Please enter a quotation headline"],
    },
    requestBody: {
      type: String,
      required: [true, "Please enter a quotation"],
    },
    service: {
      type: String,
      required: [true, "Please enter a service"],
    },
    quotations: [
      {
        serviceProvider: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "ServiceProvider",
          required: [true, "Please enter a service provider"],
        },
        quote: {
          type: String,
          required: [true, "Please enter a quote"],
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("quotation", quotationSchema);

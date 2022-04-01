const mongoose = require("mongoose");
const Review = require("./reviewModal");

const serviceProviderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a name"],
    },
    phoneNumber: {
      type: Number,
      required: [true, "Please enter a phone number"],
    },
    email: {
      type: String,
      required: [true, "Please enter an email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
    },
    type: {
      type: String,
      enum: ["individual", "company"],
      required: [true, "Please enter a type"],
    },
    businessEmail: {
      type: String,
      unique: true,
    },
    businessContactNumber: {
      type: Number,
    },
    description: {
      type: String,
    },
    owner: {
      type: String,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    services: {
      type: [String],
    },
    profileImage: {
      type: String,
    },
    portfolioImages: [String],
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
    address: {
      neighbourhood: {
        type: String,
        required: [true, "Please enter a neighbourhood "],
      },
      city: {
        type: String,
        required: [true, "Please enter an city"],
      },
      district: {
        type: String,
        required: [true, "Please enter a district"],
      },
      longitude: {
        type: Number,
      },
      latitude: {
        type: Number,
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ServiceProvider", serviceProviderSchema);

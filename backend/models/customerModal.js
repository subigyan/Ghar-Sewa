const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a name"],
    },
    // phoneNumber: {
    //   type: Number,
    //   required: [true, "Please enter a phone number"],
    // },
    email: {
      type: String,
      required: [true, "Please enter an email"],
      lowercase: true,
      unique: true,
    },

    password: {
      type: String,
      required: [true, "Please enter a password"],
    },
  },
  {
    timestamps: true,
  }
);

// const customerModel = mongoose.model("Customer", customerSchema);

module.exports = mongoose.model("Customer", customerSchema);

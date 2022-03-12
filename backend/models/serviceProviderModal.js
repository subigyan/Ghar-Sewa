const mongoose = require("mongoose");

const serviceProviderSchema = new mongoose.Schema({
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
  neighborhood: {
    type: String,
    required: [true, "Please enter a neighborhood"],
  },
  city: {
    type: String,
    required: [true, "Please enter an address"],
  },
  type: {
    type: String,
    enum: ["individual", "company"],
    required: [true, "Please enter a type"],
  },
  about: {
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
});

module.exports = mongoose.model("ServiceProvider", serviceProviderSchema);

const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, "Please enter a name"],
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
  },
});

module.exports = mongoose.model("Admin", adminSchema);

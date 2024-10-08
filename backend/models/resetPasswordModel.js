const mongoose = require("mongoose");

const resetPasswordSchema = new mongoose.Schema({
  email: String,
  otp: String,
  createdAt: Date,
});

module.exports = mongoose.model("resetPassword", resetPasswordSchema);

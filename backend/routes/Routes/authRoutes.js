const express = require("express");
const router = express.Router();
const {
  createUser,
  signIn,
  otpVerification,
  requestPasswordReset,
  resetPasswordVerification,
  PasswordReset,
  ContactUs,
} = require("../../controllers/authControllers");

// Registration
router.post("/register", createUser);

// Login
router.post("/login", signIn);

// OTP verification for signup
router.post("/otpverification", otpVerification);

// Reset password API
router.post("/resetPasswordRequest", requestPasswordReset);

// Verify the otp sent to reset Email
router.post("/resetPasswordVerification", resetPasswordVerification);

// Resetting password
router.put("/resetPassword", PasswordReset);

// Send me the contact Form
router.post("/contact", ContactUs);

module.exports = router;

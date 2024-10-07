const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/userModel");
require("dotenv").config();
const nodemailer = require("nodemailer");
const userOTPVerification = require("../../models/userOTPVerificationModel");

// function that generates OTP
function generateOtp() {
  const char = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let otp = "";
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * char.length);
    otp += char[randomIndex];
  }
  return otp;
}

// Send OTP Verification to email and store in the database
const sendOTPVerification = async (email, otp) => {
  try {
    // Nodemailer
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASSWORD,
      },
    });

    //mail Options
    const mailOptions = {
      from: process.env.AUTH_EMAIL,
      to: email,
      subject: "Email Address Verification",
      html: `<p>Kindly find below your one time password. Please do not SHARE !</p><br><b>${otp}</b>`,
    };

    //Send mail with otp to the email given as props
    const sendMail = await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error);
  }
};

// Registration
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Checking if email is already in use
    const existingEmail = await User.findOne({ email: email });
    if (existingEmail) {
      res.status(400).json({ message: "Email already in use please login" });
    }

    // hash the password using bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      verified: false,
    });

    const otp = generateOtp();
    const newUserOTPVerification = await userOTPVerification.create({
      email: email,
      otp: otp,
      createdAt: Date.now(),
      expiresAt: Date.now() + 3600000,
    });
    await sendOTPVerification(email, otp);
  
    res.status(200).json({
      message: "Created user Successfully with email otp verification sent",
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


// Login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const query = username.includes("@")
      ? { email: username }
      : { username: username };

    const existingUser = await User.findOne(query);

    if (existingUser) {
      const correctPassword = await bcrypt.compare(
        password,
        existingUser.password
      );
      if (correctPassword) {
        res.status(200).json({ message: "Login Successful" });
      } else {
        res.status(400).json({ message: "Wrong Password" });
      }
    } else {
      res.status(400).json({ message: "User does not exist" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;

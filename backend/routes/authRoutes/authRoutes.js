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
      html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
      <div style="text-align: center;">
        <h1 style="color: #4CAF50;">Email Verification</h1>
        <p style="font-size: 16px; color: #555;">You're almost there! Use the OTP below to verify your email address and complete your sign-up process.</p>
      </div>
      <div style="text-align: center; margin: 40px 0;">
        <span style="font-size: 24px; font-weight: bold; color: #333; letter-spacing: 2px; padding: 15px 30px; border-radius: 50px; background-color: #f7f7f7; border: 2px solid #4CAF50; display: inline-block;">${otp}</span>
      </div>
      <p style="font-size: 14px; color: #777;">This OTP is valid for 10 minutes. Please do not share it with anyone.</p>
      <hr style="border: none; border-top: 1px solid #eee; margin: 40px 0;" />
      <p style="font-size: 12px; color: #aaa; text-align: center;">If you did not request this email, please ignore it.</p>
      </div>`,
    };

    //Send mail with otp to the email given as props
    const sendMail = await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error);
  }
};

// Notify the user his email is verified
const sendOTPVerificationAfter = async (email) => {
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
      html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
      <div style="text-align: center;">
        <h1 style="color: #4CAF50;">🎉 Email Verified!</h1>
        <p style="font-size: 16px; color: #555;">Congratulations, your email <b>${email}</b> has been successfully verified.</p>
      </div>
      <div style="text-align: center; margin: 40px 0;">
        <span style="font-size: 24px; font-weight: bold; color: #333;">Thank you for becoming an awesome member!</span>
      </div>
      <p style="font-size: 16px; color: #555;">You can now enjoy all the features of your account. Welcome aboard!</p>
      <div style="text-align: center; margin-top: 20px;">
        <a href="#" style="text-decoration: none; color: white; background-color: #4CAF50; padding: 10px 25px; border-radius: 5px; font-size: 16px;">Go to Dashboard</a>
      </div>
      <hr style="border: none; border-top: 1px solid #eee; margin: 40px 0;" />
      <p style="font-size: 12px; color: #aaa; text-align: center;">If you did not perform this action, please contact support immediately.</p>
    </div>`,
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
      return res.status(400).json({ message: "Email already in use please login" });
    }

    // hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      verified: false,
    });

    const otp = generateOtp();

    // hash the password using bcrypt
    const hashedOtp = await bcrypt.hash(otp, salt);

    const newUserOTPVerification = await userOTPVerification.create({
      email: email,
      otp: hashedOtp,
      createdAt: Date.now(),
      expiresAt: Date.now() + 3600000,
    });
    await sendOTPVerification(email, otp);

    return res.status(200).json({message: "Created user Successfully with email otp verification sent",});
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

// OTP verification
router.post("/otpverification", async (req, res) => {
  try {
    const { email, otp } = req.body;

    const emailRecord = await userOTPVerification
      .findOne({ email: email })
      .sort({ createdAt: -1 });

    if (!emailRecord) {
      return res
        .status(400)
        .json({ message: "Invalid Email Address or OTP failed to send" });
    }
    // Check if the OTP has expired
    if (!isWithinOneHour(emailRecord.createdAt)) {
      return res
        .status(400)
        .json({ message: "OTP has expired. Please request a new one." });
    }
    // Check if the provided OTP matches the one in the database
    // const hashedOtp = await bcrypt.hash(otp, saltRounds);
    const otpCheck = await bcrypt.compare(otp, emailRecord.otp);

    //check if OTP is valid
    if (!otpCheck) {
      return res.status(400).json({ message: "OTP is incorrect" });
    }
    await User.updateOne({ email: email }, { verified: true });
    // Delete the OTP record after successful verification
    await userOTPVerification.deleteOne({ email: email });

    // Send verification successful email
    sendOTPVerificationAfter(email);
    return res.status(200).json({ message: "OTP verified successfully. User is now verified." });
  } catch (error) {
    return res.status(500).json({ error: error.message });
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

// function that compare createdAt and expiresAt and return true if < 1h, false >1 h
function isWithinOneHour(createdAt) {
  // Convert the ISO date string to a Date object
  const createdDate = new Date(createdAt);

  // Get the current time in milliseconds
  const currentDate = Date.now();

  // Calculate the absolute difference in milliseconds
  const timeDifference = currentDate - createdDate.getTime();

  // Return true if the difference is less than 1 hour (3600000 ms), false otherwise
  return timeDifference < 3600000; // less than 1 hour
}

module.exports = router;

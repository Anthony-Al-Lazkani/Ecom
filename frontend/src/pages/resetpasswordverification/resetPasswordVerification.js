import "./resetPasswordVerification.css";
import React, { useState, useContext } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { PasswordContext } from "../../context/resetPasswordContext";
import { motion } from "framer-motion";

const ResetPasswordVerification = () => {
  // get the setEmail Variable from EmailContext
  const { emailReset } = useContext(PasswordContext);
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  async function handlePasswordReset(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/user/auth/resetPasswordVerification",
        {
          emailReset,
          otp,
        }
      );
      window.alert(response.data.message);
      navigate("/resetpassword");
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        window.alert(
          error.response.data.message || "An error occurred. Please try again."
        );
      } else if (error.request) {
        // The request was made but no response was received
        console.error("Request data:", error.request);
        window.alert("No response received from the server.");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error message:", error.message);
        window.alert("Error in OTP verification. Please try again.");
      }
    }
  }

  return (
    <div className="resetPasswordVerificationContainer">
      <motion.div
        className="resetPasswordVerificationBox"
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "-100%", opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <div className="resetPasswordVerificationTitle">
          <h3>Reset Password Verification</h3>
        </div>

        <div className="resetPasswordVerificationInput">
          <form onSubmit={handlePasswordReset}>
            <input
              type="text"
              placeholder="OTP"
              maxLength={6}
              onChange={(e) => {
                setOtp(e.target.value);
              }}
            />
            <button>Verify</button>
          </form>
        </div>

        <div className="backButton">
          <Link to="/resetpassreq">
            <FaArrowLeft />
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default ResetPasswordVerification;

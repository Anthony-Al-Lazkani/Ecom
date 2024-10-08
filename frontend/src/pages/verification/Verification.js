import "./Verification.css";
import React, { useState, useContext } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import { EmailContext } from "../../context/emailContext";
import { useNavigate } from "react-router-dom";

const Verification = () => {
  const navigate = useNavigate();
  const { email } = useContext(EmailContext);
  const [otp, setOtp] = useState("");

  async function handleOTPVerification(e) {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:4000/user/auth/otpverification",
        {
          email,
          otp,
        }
      );

      // If the request is successful, handle the response
      window.alert(response.data.message); // Show success message
      navigate("/");
    } catch (error) {
      // Error handling
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
    <div className="verificationContainer">
      <div className="verificationBox">
        <div className="verificationTitle">
          <h3>OTP Verification</h3>
        </div>

        <div className="verificationInput">
          <form onSubmit={handleOTPVerification}>
            <input
              type="text"
              placeholder="OTP"
              maxLength={6}
              onChange={(e) => {
                setOtp(e.target.value);
              }}
            />
            <button>Verify Email</button>
          </form>
        </div>

        <div className="backButton">
          <Link to="/signup">
            <FaArrowLeft />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Verification;

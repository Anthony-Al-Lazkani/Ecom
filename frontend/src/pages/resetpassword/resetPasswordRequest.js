import "./resetPasswordRequest.css";
import React, { useState, useContext } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { PasswordContext } from "../../context/resetPasswordContext";

const ResetPasswordRequest = () => {
  const [email, setEmail] = useState("");

  // get the setEmail Variable from EmailContext
  const { setEmailContextReset } = useContext(PasswordContext);
  const navigate = useNavigate();

  // handleResetPasswordRequest function
  async function handleResetPasswordRequest(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/user/auth/resetPasswordRequest",
        {
          email,
        }
      );
      window.alert(response.data.message);
      navigate("/resetpasswordverification");
      setEmailContextReset(email);
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
    <div className="resetPasswordRequestContainer">
      <div className="resetPasswordRequestBox">
        <div className="resetPasswordRequestTitle">
          <h3>Reset Password</h3>
        </div>

        <div className="resetPasswordRequestInput">
          <form onSubmit={handleResetPasswordRequest}>
            <input
              type="email"
              placeholder="Email"
              maxLength={50}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <button>Send Code</button>
          </form>
        </div>

        <div className="backButton">
          <Link to="/login">
            <FaArrowLeft />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordRequest;

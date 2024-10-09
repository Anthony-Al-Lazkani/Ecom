import "./resetPassword.css";
import { React, useContext, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { PasswordContext } from "../../context/resetPasswordContext";

const ResetPassword = () => {
  // This is specifically used for password visibility
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordVisible2, setPasswordVisible2] = useState(false);
  const [passwordVisible3, setPasswordVisible3] = useState(false);

  const navigate = useNavigate;

  // Input useStates
  const [oldpassword, setOldPassword] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // get the email from the context
  const { emailReset } = useContext(PasswordContext);

  function toggleVisibility() {
    setPasswordVisible(!passwordVisible);
  }

  function toggleVisibility2() {
    setPasswordVisible2(!passwordVisible2);
  }

  function toggleVisibility3() {
    setPasswordVisible3(!passwordVisible3);
  }

  function passCheck(pass1, pass2) {
    return pass1 === pass2;
  }

  async function handleReset(e) {
    e.preventDefault();
    try {
      if (passCheck(newpassword, confirmPassword)) {
        const response = await axios.put(
          "http://localhost:4000/user/auth/resetPassword",
          {
            emailReset,
            oldpassword,
            newpassword,
          }
        );
        window.alert(response.data.message);
        navigate("/");
      } else {
        window.alert("Passwords do not match !");
      }
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
    <div className="resetPasswordContainer">
      <div className="resetPasswordBox">
        <div className="resetPasswordleftPart">
          <form className="resetPasswordinputContainer" onSubmit={handleReset}>
            <div className="resetPasswordinputBox">
              <input
                type={passwordVisible ? "text" : "password"}
                placeholder="Old Password"
                onChange={(e) => {
                  setOldPassword(e.target.value);
                }}
              />
              <div className="eyeIcon">
                {passwordVisible ? (
                  <FaEye onClick={toggleVisibility} />
                ) : (
                  <FaEyeSlash onClick={toggleVisibility} />
                )}
              </div>
            </div>

            <div className="resetPasswordinputBox">
              <input
                type={passwordVisible2 ? "text" : "password"}
                placeholder="New Password"
                onChange={(e) => {
                  setNewPassword(e.target.value);
                }}
              />
              <div className="eyeIcon">
                {passwordVisible2 ? (
                  <FaEye onClick={toggleVisibility2} />
                ) : (
                  <FaEyeSlash onClick={toggleVisibility2} />
                )}
              </div>
            </div>

            <div className="resetPasswordinputBox">
              <input
                type={passwordVisible3 ? "text" : "password"}
                placeholder="Confirm New Password"
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
              <div className="eyeIcon">
                {passwordVisible3 ? (
                  <FaEye onClick={toggleVisibility3} />
                ) : (
                  <FaEyeSlash onClick={toggleVisibility3} />
                )}
              </div>
            </div>

            <button type="submit">Reset</button>
          </form>
        </div>
        <div className="resetPasswordrightPart">
          <h1>Reset Password</h1>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;

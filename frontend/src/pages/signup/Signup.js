import "./Signup.css";
import { React, useState, useContext } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { EmailContext } from "../../context/emailContext";

const Signup = () => {
  // use States for credentials to save them in the DB
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // get the setEmail Variable from EmailContext
  const { setEmailContext } = useContext(EmailContext);

  // This is specifically used for password visibility
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordVisible1, setPasswordVisible1] = useState(false);

  // After registration is done, user is navigated to the home page
  const navigate = useNavigate();

  // Check if password == Confirm password
  function passwordCheck(pass1, pass2) {
    return pass1 === pass2;
  }

  function toggleVisibility() {
    setPasswordVisible(!passwordVisible);
  }

  function toggleVisibility1() {
    setPasswordVisible1(!passwordVisible1);
  }

  // Registration API Fetch using axios
  async function handleRegistration(e) {
    e.preventDefault();

    // Check if passwords match
    if (!passwordCheck(password, confirmPassword)) {
      window.alert("Passwords don't match");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/user/auth/register",
        {
          username,
          email,
          password,
        }
      );

      // If the request is successful, handle the response
      console.log(response);
      console.log(response.data);
      console.log(response.data.message);
      window.alert(response.data.message); // Show success message
      setEmailContext(email);
      navigate("/verification");
    } catch (error) {
      // Error handling
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);

        // Use the message from the server if it exists
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
        window.alert("Error in registration. Please try again.");
      }
    }
  }
  return (
    <div className="signupContainer">
      <div className="signupBox">
        <div className="leftPart">
          <h1>Sign Up</h1>
          <h4>Become a Member</h4>
        </div>
        <div className="rightPart">
          <form className="inputContainer" onSubmit={handleRegistration}>
            <div className="inputBox">
              <input
                type="text"
                placeholder="Username"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </div>

            <div className="inputBox">
              <input
                type="email"
                placeholder="Email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>

            <div className="inputBox">
              <input
                type={passwordVisible ? "text" : "password"}
                placeholder="Password"
                onChange={(e) => {
                  setPassword(e.target.value);
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

            <div className="inputBox">
              <input
                type={passwordVisible1 ? "text" : "password"}
                placeholder="Confirm Password"
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
              <div className="eyeIcon">
                {passwordVisible1 ? (
                  <FaEye onClick={toggleVisibility1} />
                ) : (
                  <FaEyeSlash onClick={toggleVisibility1} />
                )}
              </div>
            </div>
            <span>
              Already have an account ? <Link to="/login">Login</Link>
            </span>

            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;

import "./Signup.css";
import { React, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Signup = () => {
  // use States for credentials to save them in the DB
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
  function handleRegistration(e) {
    e.preventDefault();
    if (passwordCheck(password, confirmPassword)) {
      axios
        .post("http://localhost:4000/user/auth/register", {
          username,
          email,
          password,
        })
        .then((result) => {
          console.log(result);
          navigate("/verification");
          setTimeout(() => {
            window.alert(`Thank You ${username} for joining the Ecom Team !`);
          }, 1500); // 2000 milliseconds = 2 seconds
        });
    } else {
      window.alert("Passwords doesn't match");
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

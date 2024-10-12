import "./Login.css";
import { React, useCallback, useContext, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "../../context/authContext";

const Login = () => {
  // use States for credentials to save them in the DB
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setIsLoggedIn } = useContext(AuthContext);

  // This is specifically used for password visibility
  const [passwordVisible, setPasswordVisible] = useState(false);

  // After registration is done, user is navigated to the home page
  const navigate = useNavigate();

  function toggleVisibility() {
    setPasswordVisible(!passwordVisible);
  }

  // Login API Fetch using axios
  async function handleLogin(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/user/auth/login",
        {
          email,
          password,
        }
      );

      window.alert(response.data.message);
      // console.log(response.data.token);
      localStorage.setItem("authToken", response.data.token);
      setIsLoggedIn(response.data.token);
      navigate("/");
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
    <div className="loginContainer">
      <div className="loginBox">
        <div className="loginleftPart">
          <form className="logininputContainer" onSubmit={handleLogin}>
            <div className="logininputBox">
              <input
                type="text"
                placeholder=" Email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>

            <div className="logininputBox">
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
            <span>
              Don't have an account ? <Link to="/signup">Register</Link>
            </span>
            <span>
              Forgot Password ? <Link to="/resetpassreq">Reset</Link>
            </span>

            <button type="submit">Login</button>
          </form>
        </div>
        <div className="loginrightPart">
          <h1>Login</h1>
          <h4>Welcome to Ecom</h4>
        </div>
      </div>
    </div>
  );
};

export default Login;

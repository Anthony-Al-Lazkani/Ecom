import "./Login.css";
import { React, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  // use States for credentials to save them in the DB
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // This is specifically used for password visibility
  const [passwordVisible, setPasswordVisible] = useState(false);

  // After registration is done, user is navigated to the home page
  const navigate = useNavigate();

  function toggleVisibility() {
    setPasswordVisible(!passwordVisible);
  }

  // Login API Fetch using axios
  function handleLogin(e) {
    e.preventDefault();
    axios
      .post("http://localhost:4000/user/auth/login", { username, password })
      .then((response) => {
        console.log(response);
        window.alert(response.data.message);
        navigate("/");
        setTimeout(() => {
          window.alert(`Welcome back ${username} !`);
        }, 1500); // 2000 milliseconds = 2 seconds
      })
      .catch((error) => {
        window.alert(error.response.data.message);
      });
  }

  return (
    <div className="loginContainer">
      <div className="loginBox">
        <div className="loginleftPart">
          <form className="logininputContainer" onSubmit={handleLogin}>
            <div className="logininputBox">
              <input
                type="text"
                placeholder="Username Or Email"
                onChange={(e) => {
                  setUsername(e.target.value);
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

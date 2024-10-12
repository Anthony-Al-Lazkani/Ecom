import "./Navbar.css";
import { Link } from "react-router-dom";
import { useContext, useState, React } from "react";
import { AuthContext } from "../../context/authContext";

function Navbar() {
  const { isLoggedIn, Logout } = useContext(AuthContext);

  return (
    <nav className="NavigationBar">
      <div className="logo">
        <h3>Ecom</h3>
      </div>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/">About</Link>
        <Link to="/">Contact</Link>
        <button className="getStartedBtn">
          {!isLoggedIn && <Link to="/signup">Get Started</Link>}
          {isLoggedIn && (
            <Link to="/" onClick={Logout}>
              Logout
            </Link>
          )}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;

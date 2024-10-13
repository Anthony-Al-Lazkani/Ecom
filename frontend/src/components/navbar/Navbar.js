import "./Navbar.css";
import { Link } from "react-router-dom";
import { useContext, useState, React } from "react";
import { AuthContext } from "../../context/authContext";
import { motion } from "framer-motion";

function Navbar() {
  const { isLoggedIn, Logout } = useContext(AuthContext);

  return (
    <motion.nav
      className="NavigationBar"
      initial={{ y: "-100%", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -"100%", opacity: 0 }}
      transition={{duration : .7 , ease : "easeInOut"}}
    >
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
    </motion.nav>
  );
}

export default Navbar;

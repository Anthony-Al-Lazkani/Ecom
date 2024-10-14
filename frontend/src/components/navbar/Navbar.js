import "./Navbar.css";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import React from "react";
import { AuthContext } from "../../context/authContext";
import { motion } from "framer-motion";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

function Navbar() {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const { isLoggedIn, Logout } = useContext(AuthContext);

  const handleMouseEnter = () => {
    setDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    setDropdownVisible(false);
  };

  return (
    <motion.nav
      className="NavigationBar"
      initial={{ y: "-100%", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -"100%", opacity: 0 }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
    >
      <div className="logo">
        
      </div>
      <div className="links">
        <div
          className="Drop"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Link to="/">
            Home{" "}
            {isDropdownVisible ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
          </Link>
          {isDropdownVisible && (
            <motion.div
              className="DropMenu"
              initial={{ opacity: 0, y: -20 }} // Start above with opacity 0
              animate={{ opacity: 1, y: 0 }} // Fade in and move to normal position
              exit={{ opacity: 0, y: -20 }} // Fade out and move back up
              transition={{ duration: 0.3 }}
            >
              <ul>
                <li>
                  <a href="#section2">Bedroom</a>
                </li>
                <li>
                  <a href="">Kitchen</a>
                </li>
                <li>
                  <a href="">Living Room</a>
                </li>
              </ul>
            </motion.div>
          )}
        </div>
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

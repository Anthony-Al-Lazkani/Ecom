import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
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
          <Link to="/signup">Get Started</Link>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

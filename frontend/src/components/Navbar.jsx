import { Link } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav>

      <div className="logo">
        🚀 AI Interview Coach
      </div>
      <div
     className="menu-icon"
     onClick={() => setIsMenuOpen(!isMenuOpen)}
  >
    ☰
  </div>


      <ul className={isMenuOpen ? "nav-links active" : "nav-links"}>

        <li>
           <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
        </li>

        <li>
          <Link to="/dsa" onClick={() => setIsMenuOpen(false)}>DSA</Link>
        </li>

        <li>
          <Link to="/resume" onClick={() => setIsMenuOpen(false)}>Resume</Link>
        </li>

        <li>
          <Link to="/mock-interview" onClick={() => setIsMenuOpen(false)}>Mock Interview</Link>
        </li>

        <li>
          <Link to="/about" onClick={() => setIsMenuOpen(false)}>About</Link>
        </li>

      </ul>

      <div className="nav-buttons">

        <button className="login-btn">
          Login
        </button>

        <button className="start-btn">
          Get Started
        </button>

      </div>

    </nav>
  );
}

export default Navbar;
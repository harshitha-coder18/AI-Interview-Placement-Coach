import { NavLink } from "react-router-dom";
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
           <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")} onClick={() => setIsMenuOpen(false)}>Home</NavLink>
        </li>

        <li>
          <NavLink to="/dsa" className={({ isActive }) => (isActive ? "active" : "")} onClick={() => setIsMenuOpen(false)}>DSA</NavLink>
        </li>

        <li>
          <NavLink to="/resume" className={({ isActive }) => (isActive ? "active" : "")} onClick={() => setIsMenuOpen(false)}>Resume</NavLink>
        </li>

        <li>
          <NavLink to="/mock-interview" className={({ isActive }) => (isActive ? "active" : "")} onClick={() => setIsMenuOpen(false)}>Mock Interview</NavLink>
        </li>

        <li>
          <NavLink to="/about" className={({ isActive }) => (isActive ? "active" : "")} onClick={() => setIsMenuOpen(false)}>About</NavLink>
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
import { NavLink } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">

      {/* Logo */}
      <div className="logo">
        🚀 AI Interview Coach
      </div>

      {/* Mobile menu button */}
      <div
        className="menu-icon"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        ☰
      </div>

      {/* Navigation links */}
      <ul
        className={
          isMenuOpen
            ? "nav-links active"
            : "nav-links"
        }
      >

        <li>
          <NavLink to="/" onClick={closeMenu}>
            Home
          </NavLink>
        </li>

        <li>
          <NavLink to="/dsa" onClick={closeMenu}>
            DSA
          </NavLink>
        </li>

        <li>
          <NavLink to="/resume" onClick={closeMenu}>
            Resume
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/mock-interview"
            onClick={closeMenu}
          >
            Mock Interview
          </NavLink>
        </li>

        <li>
          <NavLink to="/about" onClick={closeMenu}>
            About
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/dashboard"
            onClick={closeMenu}
          >
            Dashboard
          </NavLink>
        </li>

      </ul>

      {/* Buttons */}
      <div className="nav-buttons">

        <NavLink to="/login">
          <button className="login-btn">
            Login
          </button>
        </NavLink>

        <NavLink to="/dashboard">
          <button className="start-btn">
            Get Started
          </button>
        </NavLink>

      </div>

    </nav>
  );
}

export default Navbar;
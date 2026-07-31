import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>

      <div className="logo">
        🚀 AI Interview Coach
      </div>

      <ul>

        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/dsa">DSA</Link>
        </li>

        <li>
          <Link to="/">Resume</Link>
        </li>

        <li>
          <Link to="/mock-interview">Mock Interview</Link>
        </li>

        <li>
          <Link to="/about">About</Link>
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
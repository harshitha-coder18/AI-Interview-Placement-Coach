function Navbar() {
  return (
    <nav>

      <div className="logo">
        🚀 AI Interview Coach
      </div>

      <ul>
        <li>Home</li>
        <li>DSA</li>
        <li>Resume</li>
        <li>Mock Interview</li>
        <li>About</li>
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
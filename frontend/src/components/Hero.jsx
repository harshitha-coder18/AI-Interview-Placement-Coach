import { FaUserGraduate, FaCode, FaBriefcase } from "react-icons/fa";

function Hero({ title, description }) {
  return (
    <section className="hero">
      <div className="hero-left">

        <span className="tag">
          🚀 AI Powered Learning Platform
        </span>

        <h1>{title}</h1>

        <p>{description}</p>

        <div className="hero-buttons">
          <button className="btn-primary">Get Started</button>
          <button className="btn-secondary">Explore</button>
        </div>

        <div className="stats">

          <div className="stat-card">
            <FaUserGraduate />
            <h3>10K+</h3>
            <p>Students</p>
          </div>

          <div className="stat-card">
            <FaCode />
            <h3>500+</h3>
            <p>DSA Questions</p>
          </div>

          <div className="stat-card">
            <FaBriefcase />
            <h3>95%</h3>
            <p>Placement Success</p>
          </div>

        </div>

      </div>

      <div className="hero-right">
        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt="Student"
        />
      </div>
    </section>
  );
}

export default Hero;
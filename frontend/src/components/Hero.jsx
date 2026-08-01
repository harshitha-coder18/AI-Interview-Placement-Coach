import {
  FaUserGraduate,
  FaCode,
  FaBriefcase,
} from "react-icons/fa";

import Button from "./Button";
import StatCard from "./StatCard";

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
          <Button
            text="Get Started"
            className="btn-primary"
          />

          <Button
            text="Explore"
            className="btn-secondary"
          />
        </div>

        {/* Statistics */}
        <div className="stats">
          <StatCard
            icon={<FaUserGraduate />}
            number="10K+"
            text="Students"
          />

          <StatCard
            icon={<FaCode />}
            number="500+"
            text="DSA Questions"
          />

          <StatCard
            icon={<FaBriefcase />}
            number="95%"
            text="Placement Success"
          />
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
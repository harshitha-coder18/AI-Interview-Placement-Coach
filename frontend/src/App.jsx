import { useState } from "react";
import "./App.css";
import CompanyRoadmap from "./pages/CompanyRoadmap";
import CompanyPreparation from "./pages/CompanyPreparation";
import { Routes, Route } from "react-router-dom";

// Components
import Navbar from "./components/Navbar";
import Resume from "./components/Resume";
import ResumePreview from "./components/ResumePreview";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

// Pages
import DSA from "./pages/DSA";
import MockInterview from "./pages/MockInterview";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";

function App() {
  const [resumeData, setResumeData] = useState({
    name: "",
    email: "",
    college: "",
    skills: "",
  });

  const [count, setCount] = useState(0);

  const increase = () => {
    setCount(count + 1);
  };

  const decrease = () => {
    setCount(count - 1);
  };

  const reset = () => {
    setCount(0);
  };

  // =========================
  // Home Page
  // =========================

  function HomePage() {
    return (
      <>
        <Resume
          resumeData={resumeData}
          setResumeData={setResumeData}
        />

        <ResumePreview
          resumeData={resumeData}
        />

        {/* React Counter */}
        <section className="counter">
          <h2>React Counter</h2>

          <h1>{count}</h1>

          <div className="counter-buttons">
            <button onClick={increase}>
              Increase
            </button>

            <button onClick={decrease}>
              Decrease
            </button>

            <button onClick={reset}>
              Reset
            </button>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      {/* =========================
          Navbar
      ========================= */}

      <Navbar />

      {/* =========================
          Routes
      ========================= */}

      <Routes>

        {/* Home */}
        <Route
          path="/"
          element={<HomePage />}
        />

        {/* DSA */}
        <Route
          path="/dsa"
          element={<DSA />}
        />

        {/* Resume */}
        <Route
          path="/resume"
          element={
            <>
              <Resume
                resumeData={resumeData}
                setResumeData={setResumeData}
              />

              <ResumePreview
                resumeData={resumeData}
              />
            </>
          }
        />

        {/* Mock Interview */}
        <Route
          path="/mock-interview"
          element={<MockInterview />}
        />

        {/* About */}
        <Route
          path="/about"
          element={<About />}
        />

        {/* Login */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />
        <Route
          path="/companies"
          element={<CompanyRoadmap />}
        />
        <Route
          path="/companies/:companyId"
          element={<CompanyPreparation />}
        />

      </Routes>

      {/* Scroll to top */}
      <ScrollToTop />

      {/* Footer */}
      <Footer />
    </>
  );
}

export default App;
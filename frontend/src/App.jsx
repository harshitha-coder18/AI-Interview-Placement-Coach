import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import SearchBar from "./components/SearchBar";
import Resume from "./components/Resume";
import ResumePreview from "./components/ResumePreview";
import Footer from "./components/Footer";
import DSA from "./pages/DSA";
import MockInterview from "./pages/MockInterview";
import About from "./pages/About";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  const [resumeData, setResumeData] = useState({
    name: "",
    email: "",
    college: "",
    skills: "",
  });

  const [count, setCount] = useState(0);

  const increase = () => setCount(count + 1);
  const decrease = () => setCount(count - 1);
  const reset = () => setCount(0);

  function HomePage() {
    return (
      <>
        <Hero
          title="Crack Your Dream Placement 🚀"
          description="Practice DSA, build an ATS-friendly resume, and prepare for coding interviews with AI-powered guidance."
        />

        <SearchBar />

        <Resume
          resumeData={resumeData}
          setResumeData={setResumeData}
        />

        <ResumePreview
          resumeData={resumeData}
        />

        <section className="counter">
          <h2>React Counter</h2>

          <h1>{count}</h1>

          <div className="counter-buttons">
            <button onClick={increase}>Increase</button>

            <button onClick={decrease}>Decrease</button>

            <button onClick={reset}>Reset</button>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dsa" element={<DSA />} />
        <Route path="/mock-interview" element={<MockInterview />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <ScrollToTop />
       <Footer />
    </>
  );
}

export default App;
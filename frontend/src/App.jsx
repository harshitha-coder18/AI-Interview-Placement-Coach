import { useState } from "react";
import "./App.css";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import SearchBar from "./components/SearchBar";
import Resume from "./components/Resume";

function App() {
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

  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <Hero
        title="Crack Your Dream Placement 🚀"
        description="Practice DSA, build an ATS-friendly resume, and prepare for coding interviews with AI-powered guidance."
      />

      {/* Search Bar */}
      <SearchBar />

      {/* Resume Builder */}
      <Resume />

      {/* Counter */}
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

export default App;
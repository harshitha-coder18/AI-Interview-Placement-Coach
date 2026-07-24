import './App.css'

function App() {
  return (
    <>
      <nav>
        <h1 className="logo">AI Interview Placement Coach</h1>

        <ul>
          <li>Home</li>
          <li>DSA</li>
          <li>Resume</li>
          <li>Mock Interview</li>
          <li>Login</li>
        </ul>
      </nav>

      <section className="hero">
        <div className="hero-left">
          <h1>Crack Your Dream Placement 🚀</h1>

          <p>
            Practice DSA, build an ATS-friendly resume, and prepare
            for coding interviews with AI-powered guidance.
          </p>

          <button>Get Started</button>
        </div>

        <div className="hero-right">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="Student"
          />
        </div>
      </section>
    </>
  )
}

export default App
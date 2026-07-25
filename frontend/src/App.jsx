import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'

function App() {
  return (
    <>
      <Navbar />

      <Hero
        title="Crack Your Dream Placement 🚀"
        description="Practice DSA, build an ATS-friendly resume, and prepare for coding interviews with AI-powered guidance."
      />
    </>
  )
}

export default App
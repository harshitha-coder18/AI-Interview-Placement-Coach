import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />

      <Hero
        title="Crack Your Dream Placement 🚀"
        description="Practice DSA, build an ATS-friendly resume, and prepare for coding interviews with AI-powered guidance."
      />
      <h2>Counter: {count}</h2>

<button onClick={() => setCount(count + 1)}>
  Increase
</button>

<button onClick={() => setCount(count - 1)}>
  Decrease
</button>

<button onClick={() => setCount(0)}>
  Reset
</button>
    </>
  )
}

export default App
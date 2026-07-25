function Hero({ title, description }) {
  return (
    <section className="hero">
      <div className="hero-left">
        <h1>{title}</h1>

        <p>{description}</p>

        <button>Get Started</button>
      </div>

      <div className="hero-right">
        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt="Student"
        />
      </div>
    </section>
  )
}

export default Hero
import { useState } from "react";

function Resume() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [college, setCollege] = useState("");
  const [skills, setSkills] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    alert(
      `Name: ${name}
Email: ${email}
College: ${college}
Skills: ${skills}`
    );
  };

  return (
    <section className="resume-section">

      <h2>📄 Resume Builder</h2>

      <form onSubmit={handleSubmit} className="resume-form">

        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="text"
          placeholder="Enter your college"
          value={college}
          onChange={(e) => setCollege(e.target.value)}
        />

        <input
          type="text"
          placeholder="Enter your skills"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
        />

        <button type="submit">
          Generate Resume
        </button>

      </form>

    </section>
  );
}

export default Resume;
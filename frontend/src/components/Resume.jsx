import { useState } from "react";

function Resume({ resumeData, setResumeData }) {

  const handleChange = (e) => {

    const { name, value } = e.target;

    setResumeData({
      ...resumeData,
      [name]: value,
    });

  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Resume Generated Successfully!");
  };

  return (

    <section className="resume-section">

      <h2>📄 Resume Builder</h2>

      <form onSubmit={handleSubmit} className="resume-form">

        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          value={resumeData.name}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={resumeData.email}
          onChange={handleChange}
        />

        <input
          type="text"
          name="college"
          placeholder="Enter your college"
          value={resumeData.college}
          onChange={handleChange}
        />

        <input
          type="text"
          name="skills"
          placeholder="Enter your skills"
          value={resumeData.skills}
          onChange={handleChange}
        />

        <button type="submit">
          Generate Resume
        </button>

      </form>

    </section>

  );

}

export default Resume;
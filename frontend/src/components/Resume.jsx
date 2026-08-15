import { useState, useEffect } from "react";
import { saveResume, getResume } from "../api";

function Resume({ resumeData, setResumeData }) {

  // ============================================
  // LOAD EXISTING RESUME
  // ============================================

  useEffect(() => {

    const token = localStorage.getItem("token");

    if (!token) {
      return;
    }

    getResume(token)
      .then((data) => {

        setResumeData({
          name: data.name || "",
          email: data.email || "",
          college: data.college || "",
          skills: data.skills || "",
        });

      })
      .catch((error) => {

        // 404 means resume has not been created yet
        if (error.message !== "Resume not found") {
          console.error("Get resume error:", error);
        }

      });

  }, [setResumeData]);


  // ============================================
  // HANDLE INPUT
  // ============================================

  const handleChange = (e) => {

    const { name, value } = e.target;

    setResumeData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

  };


  // ============================================
  // SAVE RESUME
  // ============================================

  const handleSubmit = async (e) => {

    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first.");
      return;
    }

    try {

      const data = await saveResume(
        resumeData,
        token
      );

      alert(data.message);

    } catch (error) {

      console.error("Resume error:", error);

      alert(error.message);

    }

  };


  // ============================================
  // UI
  // ============================================

  return (

    <section className="resume-section">

      <h2>📄 Resume Builder</h2>

      <form
        onSubmit={handleSubmit}
        className="resume-form"
      >

        {/* NAME */}

        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          value={resumeData.name || ""}
          onChange={handleChange}
          required
        />


        {/* EMAIL */}

        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={resumeData.email || ""}
          onChange={handleChange}
          required
        />


        {/* COLLEGE */}

        <input
          type="text"
          name="college"
          placeholder="Enter your college"
          value={resumeData.college || ""}
          onChange={handleChange}
          required
        />


        {/* SKILLS */}

        <textarea
          name="skills"
          placeholder="Python, DSA, React, SQL..."
          value={resumeData.skills || ""}
          onChange={handleChange}
          required
        />


        {/* BUTTON */}

        <button type="submit">
          Save Resume
        </button>

      </form>

    </section>

  );

}

export default Resume;
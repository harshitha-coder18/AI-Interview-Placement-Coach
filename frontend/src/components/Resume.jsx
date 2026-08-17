import { useEffect, useState } from "react";
import {
  saveResume,
  getResume,
  analyzeResume
} from "../api";

import jsPDF from "jspdf";


function Resume({ resumeData, setResumeData }) {

  // ============================================
  // STATES
  // ============================================

  const [downloading, setDownloading] = useState(false);

  const [atsResult, setAtsResult] = useState(null);

  const [analyzing, setAnalyzing] = useState(false);


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

        // Resume may not exist yet

        if (error.message !== "Resume not found") {

          console.error(
            "Get resume error:",
            error
          );

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

    const token =
      localStorage.getItem("token");


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

    }

    catch (error) {

      console.error(
        "Resume error:",
        error
      );

      alert(error.message);

    }

  };


  // ============================================
  // ANALYZE RESUME
  // ============================================

  const handleAnalyzeResume = async () => {

    const token =
      localStorage.getItem("token");


    if (!token) {

      alert("Please login first.");

      return;

    }


    try {

      setAnalyzing(true);

      const data =
        await analyzeResume(token);

      setAtsResult(data);

    }

    catch (error) {

      console.error(
        "ATS analysis error:",
        error
      );

      alert(error.message);

    }

    finally {

      setAnalyzing(false);

    }

  };


  // ============================================
  // DOWNLOAD RESUME PDF
  // ============================================

  const downloadResume = () => {

    try {

      setDownloading(true);


      // ========================================
      // CREATE PDF
      // ========================================

      const pdf = new jsPDF(
        "p",
        "mm",
        "a4"
      );


      const pageWidth =
        pdf.internal.pageSize.getWidth();

      const pageHeight =
        pdf.internal.pageSize.getHeight();


      // ========================================
      // RESUME DATA
      // ========================================

      const name =
        resumeData.name ||
        "Your Name";

      const email =
        resumeData.email ||
        "your@email.com";

      const college =
        resumeData.college ||
        "Your College";

      const skills =
        resumeData.skills ||
        "Your skills";


      // ========================================
      // NAME
      // ========================================

      pdf.setFont(
        "helvetica",
        "bold"
      );

      pdf.setFontSize(24);

      pdf.text(
        name,
        pageWidth / 2,
        25,
        {
          align: "center",
        }
      );


      // ========================================
      // EMAIL
      // ========================================

      pdf.setFont(
        "helvetica",
        "normal"
      );

      pdf.setFontSize(11);

      pdf.text(
        email,
        pageWidth / 2,
        34,
        {
          align: "center",
        }
      );


      // ========================================
      // LINE
      // ========================================

      pdf.line(
        20,
        42,
        190,
        42
      );


      // ========================================
      // EDUCATION
      // ========================================

      pdf.setFont(
        "helvetica",
        "bold"
      );

      pdf.setFontSize(15);

      pdf.text(
        "Education",
        20,
        58
      );


      pdf.setFont(
        "helvetica",
        "normal"
      );

      pdf.setFontSize(11);

      pdf.text(
        college,
        20,
        68
      );


      // ========================================
      // SKILLS
      // ========================================

      pdf.setFont(
        "helvetica",
        "bold"
      );

      pdf.setFontSize(15);

      pdf.text(
        "Skills",
        20,
        88
      );


      pdf.setFont(
        "helvetica",
        "normal"
      );

      pdf.setFontSize(11);


      const skillLines =
        pdf.splitTextToSize(
          skills,
          170
        );


      pdf.text(
        skillLines,
        20,
        98
      );


      // ========================================
      // FOOTER
      // ========================================

      pdf.setFontSize(9);

      pdf.setTextColor(
        100,
        100,
        100
      );

      pdf.text(
        "Generated by AI Interview Coach",
        pageWidth / 2,
        pageHeight - 15,
        {
          align: "center",
        }
      );


      // ========================================
      // SAVE PDF
      // ========================================

      const fileName =
        `${name.replace(
          /\s+/g,
          "_"
        )}_Resume.pdf`;


      pdf.save(fileName);

    }

    catch (error) {

      console.error(
        "PDF generation error:",
        error
      );

      alert(
        "Failed to download resume."
      );

    }

    finally {

      setDownloading(false);

    }

  };


  // ============================================
  // UI
  // ============================================

  return (

    <section className="resume-section">


      {/* ========================================
          TITLE
      ======================================== */}

      <h2>
        📄 Resume Builder
      </h2>


      <p>
        Create, save, analyze and download
        your resume.
      </p>


      {/* ========================================
          RESUME FORM
      ======================================== */}

      <form
        onSubmit={handleSubmit}
        className="resume-form"
      >


        {/* NAME */}

        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          value={
            resumeData.name || ""
          }
          onChange={handleChange}
          required
        />


        {/* EMAIL */}

        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={
            resumeData.email || ""
          }
          onChange={handleChange}
          required
        />


        {/* COLLEGE */}

        <input
          type="text"
          name="college"
          placeholder="Enter your college"
          value={
            resumeData.college || ""
          }
          onChange={handleChange}
          required
        />


        {/* SKILLS */}

        <textarea
          name="skills"
          placeholder="Python, DSA, React, SQL..."
          value={
            resumeData.skills || ""
          }
          onChange={handleChange}
          required
        />


        {/* SAVE */}

        <button type="submit">

          💾 Save Resume

        </button>

      </form>


      {/* ========================================
          RESUME PREVIEW
      ======================================== */}

      <div
        id="resume-preview"
        className="resume-preview"
      >

        <h2>
          {resumeData.name ||
            "Your Name"}
        </h2>


        <p>

          <strong>
            Email:
          </strong>{" "}

          {resumeData.email ||
            "your@email.com"}

        </p>


        <p>

          <strong>
            College:
          </strong>{" "}

          {resumeData.college ||
            "Your College"}

        </p>


        <h3>
          Skills
        </h3>


        <p>

          {resumeData.skills ||
            "Your skills"}

        </p>

      </div>


      {/* ========================================
          DOWNLOAD PDF
      ======================================== */}

      <button
        type="button"
        onClick={downloadResume}
        disabled={downloading}
      >

        {downloading
          ? "Generating PDF..."
          : "📥 Download Resume"}

      </button>


      {/* ========================================
          ATS ANALYZE
      ======================================== */}

      <button
        type="button"
        onClick={handleAnalyzeResume}
        disabled={analyzing}
      >

        {analyzing
          ? "Analyzing..."
          : "🔍 Analyze Resume"}

      </button>


      {/* ========================================
          ATS RESULT
      ======================================== */}

      {atsResult && (

        <div className="ats-result">


          <h2>
            📊 ATS Analysis
          </h2>


          <h3>

            ATS Score:{" "}

            {atsResult.ats_score}/100

          </h3>


          <p>

            <strong>
              Level:
            </strong>{" "}

            {atsResult.level}

          </p>


          <h3>
            💡 Suggestions
          </h3>


          <ul>

            {atsResult.suggestions.map(
              (suggestion, index) => (

                <li key={index}>

                  {suggestion}

                </li>

              )
            )}

          </ul>


        </div>

      )}


    </section>

  );

}


export default Resume;
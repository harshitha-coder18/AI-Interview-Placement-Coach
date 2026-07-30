import DownloadButton from "./DownloadButton";
function ResumePreview({ resumeData }) {

  return (

    <section className="preview-section">
      <DownloadButton />

      <h2>📄 Resume Preview</h2>

      <div className="preview-card">

        <div className="profile-circle">
          👤
        </div>

        <h3>
          {resumeData.name || "Your Name"}
        </h3>

        <p>
          <strong>Email:</strong>{" "}
          {resumeData.email || "your@email.com"}
        </p>

        <p>
          <strong>College:</strong>{" "}
          {resumeData.college || "Your College"}
        </p>

        <p>
          <strong>Skills:</strong>{" "}
          {resumeData.skills || "HTML, CSS, React"}
        </p>

      </div>

    </section>

  );

}

export default ResumePreview;
function DownloadButton() {

  const handleDownload = () => {
    alert("Resume download feature will be added soon!");
  };

  return (
    <button
      className="download-btn"
      onClick={handleDownload}
    >
      📥 Download Resume
    </button>
  );
}

export default DownloadButton;
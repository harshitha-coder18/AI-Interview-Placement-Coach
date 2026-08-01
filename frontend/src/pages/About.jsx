import PageTitle from "../components/PageTitle";

function About() {
  return (
    <>
      <PageTitle title="About Us" />

      <p
        style={{
          textAlign: "center",
          color: "white",
          marginTop: "20px",
        }}
      >
        AI Interview Placement Coach helps students prepare for placements
        through DSA practice, resume building, and mock interviews.
      </p>
    </>
  );
}

export default About;
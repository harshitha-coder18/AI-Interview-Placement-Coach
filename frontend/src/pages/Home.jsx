import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";

function Home() {
  return (
    <>
      <Hero
        title="Crack Your Dream Placement 🚀"
        description="Practice DSA, build an ATS-friendly resume, and prepare for coding interviews with AI-powered guidance."
      />

      <SearchBar />
    </>
  );
}

export default Home;
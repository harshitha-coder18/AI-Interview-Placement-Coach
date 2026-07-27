import { useState } from "react";

const topics = [
  "Arrays",
  "Strings",
  "Linked List",
  "Stack",
  "Queue",
  "Trees",
  "Graphs",
  "Dynamic Programming",
  "React",
  "JavaScript",
  "Operating System",
  "DBMS",
  "Computer Networks",
  "SQL",
  "OOP"
];

function SearchBar() {
  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = () => {
    const filtered = topics.filter((topic) =>
      topic.toLowerCase().includes(search.toLowerCase())
    );

    setResult(filtered);
    setSearched(true);
  };

  const clearSearch = () => {
    setSearch("");
    setResult([]);
    setSearched(false);
  };

  return (
    <section className="search-section">

      <h2>Search Learning Topics</h2>

      <div className="search-container">

        <input
          type="text"
          placeholder="Search DSA, DBMS, React..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button onClick={handleSearch}>
          Search
        </button>

        <button className="clear-btn" onClick={clearSearch}>
          Clear
        </button>

      </div>

      <div className="search-results">

        {!searched && (
          <p className="info-text">
            🔍 Search any topic to start learning.
          </p>
        )}

        {searched && result.length > 0 &&

          result.map((item, index) => (
            <div className="topic-card" key={index}>
              📘 {item}
            </div>
          ))

        }

        {searched && result.length === 0 && (
          <p className="no-result">
            ❌ No matching topic found.
          </p>
        )}

      </div>

    </section>
  );
}

export default SearchBar;
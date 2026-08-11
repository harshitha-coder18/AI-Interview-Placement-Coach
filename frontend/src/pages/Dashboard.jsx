import { useEffect, useState } from "react";
import { getDashboard } from "../api";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Please login first.");
      return;
    }

    getDashboard(token)
      .then((data) => {
        console.log("Dashboard data:", data);
        setDashboard(data);
      })
      .catch((err) => {
        console.error("Dashboard error:", err);
        setError(err.message);
      });
  }, []);

  // Error
  if (error) {
    return (
      <div className="dashboard-page">
        <h2>Error</h2>
        <p>{error}</p>

        <button onClick={() => navigate("/login")}>
          Go to Login
        </button>
      </div>
    );
  }

  // Loading
  if (!dashboard) {
    return (
      <div className="dashboard-page">
        <h2>Loading dashboard...</h2>
      </div>
    );
  }

  return (
    <div className="dashboard-page">

      {/* Header */}
      <div className="dashboard-header">
        <h1>Dashboard</h1>

        <h2>
          Welcome, {dashboard.name} 👋
        </h2>
      </div>

      {/* Statistics */}
      <div className="dashboard-stats">

        <div className="stat-card">
          <h3>Interview Questions</h3>

          <p className="stat-number">
            {dashboard.total_questions}
          </p>

          <p>
            Questions practiced
          </p>
        </div>

        <div className="stat-card">
          <h3>Answers Submitted</h3>

          <p className="stat-number">
            {dashboard.total_answers}
          </p>

          <p>
            Answers submitted
          </p>
        </div>

        <div className="stat-card">
          <h3>Topics Practiced</h3>

          <p className="stat-number">
            {dashboard.categories?.length || 0}
          </p>

          <p>
            Different categories
          </p>
        </div>

      </div>

      {/* Categories */}
      <div className="dashboard-section">

        <h2>Topics Practiced</h2>

        <div className="category-list">

          {dashboard.categories?.length > 0 ? (
            dashboard.categories.map((category, index) => (
              <span
                className="category-badge"
                key={index}
              >
                {category}
              </span>
            ))
          ) : (
            <p>No categories practiced yet.</p>
          )}

        </div>

      </div>

      {/* Recent Questions */}
      <div className="dashboard-section">

        <div className="section-header">

          <h2>
            Recent Questions
          </h2>

          <button
            onClick={() => navigate("/dsa")}
          >
            Practice DSA
          </button>

        </div>

        {dashboard.recent_questions?.length > 0 ? (

          <div className="recent-question-list">

            {dashboard.recent_questions.map(
              (question) => (

                <div
                  className="question-card"
                  key={question.id}
                >

                  <h3>
                    {question.question}
                  </h3>

                  <span>
                    {question.category}
                  </span>

                </div>

              )
            )}

          </div>

        ) : (

          <p>
            No questions practiced yet.
          </p>

        )}

      </div>

    </div>
  );
}

export default Dashboard;
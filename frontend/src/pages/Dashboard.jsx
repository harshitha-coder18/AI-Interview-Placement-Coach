import { useEffect, useState } from "react";
import { getDashboard } from "../api";

function Dashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    console.log("Token:", token);

    // No token
    if (!token) {
      setError("No login token found. Please login first.");
      return;
    }

    // Get dashboard data
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

  // Dashboard
  return (
    <div className="dashboard-page">

      <h1>Dashboard</h1>

      <h2>
        Welcome, {dashboard.name}
      </h2>

      <p>
        Total Questions: {dashboard.total_questions}
      </p>

      <p>
        Total Answers: {dashboard.total_answers}
      </p>

      {/* Categories */}
      <h3>Categories</h3>

      <ul>
        {dashboard.categories?.map((category, index) => (
          <li key={index}>
            {category}
          </li>
        ))}
      </ul>

      {/* Recent Questions */}
      <h3>Recent Questions</h3>

      <ul>
        {dashboard.recent_questions?.map((question) => (
          <li key={question.id}>
            {question.question} - {question.category}
          </li>
        ))}
      </ul>

    </div>
  );
}

export default Dashboard;
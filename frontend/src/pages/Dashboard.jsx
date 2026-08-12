import { useEffect, useState } from "react";
import { getDashboard } from "../api";
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const [dashboard, setDashboard] = useState(null);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    // ========================================
    // LOAD DASHBOARD
    // ========================================

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

    // ========================================
    // ERROR
    // ========================================

    if (error) {
        return (
            <div className="dashboard-page">

                <h2>Error</h2>

                <p>{error}</p>

                <button
                    onClick={() => navigate("/login")}
                >
                    Go to Login
                </button>

            </div>
        );
    }

    // ========================================
    // LOADING
    // ========================================

    if (!dashboard) {
        return (
            <div className="dashboard-page">

                <h2>
                    Loading dashboard...
                </h2>

            </div>
        );
    }

    // ========================================
    // SAFE VALUES
    // ========================================

    const totalQuestions =
        dashboard.total_questions || 0;

    const totalAnswers =
        dashboard.total_answers || 0;

    const solvedQuestions =
        dashboard.solved_questions || 0;

    const inProgressQuestions =
        dashboard.in_progress_questions || 0;

    const notStartedQuestions =
        dashboard.not_started_questions || 0;

    const easyQuestions =
        dashboard.easy_questions || 0;

    const mediumQuestions =
        dashboard.medium_questions || 0;

    const hardQuestions =
        dashboard.hard_questions || 0;

    const progressPercentage =
        dashboard.progress_percentage || 0;

    // ========================================
    // PERCENTAGE CALCULATIONS
    // ========================================

    const solvedPercentage =
        totalQuestions === 0
            ? 0
            : Math.round(
                (solvedQuestions / totalQuestions) * 100
            );

    const inProgressPercentage =
        totalQuestions === 0
            ? 0
            : Math.round(
                (inProgressQuestions / totalQuestions) * 100
            );

    const notStartedPercentage =
        totalQuestions === 0
            ? 0
            : Math.round(
                (notStartedQuestions / totalQuestions) * 100
            );

    const easyPercentage =
        totalQuestions === 0
            ? 0
            : Math.round(
                (easyQuestions / totalQuestions) * 100
            );

    const mediumPercentage =
        totalQuestions === 0
            ? 0
            : Math.round(
                (mediumQuestions / totalQuestions) * 100
            );

    const hardPercentage =
        totalQuestions === 0
            ? 0
            : Math.round(
                (hardQuestions / totalQuestions) * 100
            );

    // ========================================
    // PAGE
    // ========================================

    return (
        <div className="dashboard-page">

            {/* ========================================
                HEADER
            ======================================== */}

            <div className="dashboard-header">

                <h1>
                    Dashboard
                </h1>

                <h2>
                    Welcome, {dashboard.name} 👋
                </h2>

            </div>


            {/* ========================================
                GENERAL STATISTICS
            ======================================== */}

            <div className="dashboard-stats">

                <div className="stat-card">

                    <h3>
                        Interview Questions
                    </h3>

                    <p className="stat-number">
                        {totalQuestions}
                    </p>

                    <p>
                        Questions practiced
                    </p>

                </div>


                <div className="stat-card">

                    <h3>
                        Answers Submitted
                    </h3>

                    <p className="stat-number">
                        {totalAnswers}
                    </p>

                    <p>
                        Answers submitted
                    </p>

                </div>


                <div className="stat-card">

                    <h3>
                        Topics Practiced
                    </h3>

                    <p className="stat-number">
                        {dashboard.categories?.length || 0}
                    </p>

                    <p>
                        Different categories
                    </p>

                </div>

            </div>


            {/* ========================================
                OVERALL PROGRESS
            ======================================== */}

            <div className="dashboard-section">

                <div className="section-header">

                    <h2>
                        DSA Progress
                    </h2>

                    <button
                        onClick={() => navigate("/dsa")}
                    >
                        Practice DSA
                    </button>

                </div>


                <div className="progress-container">

                    <div className="progress-header">

                        <span>
                            Overall Progress
                        </span>

                        <strong>
                            {progressPercentage}%
                        </strong>

                    </div>


                    <div className="progress-bar">

                        <div
                            className="progress-fill"
                            style={{
                                width:
                                    `${progressPercentage}%`,
                            }}
                        ></div>

                    </div>


                    <p className="progress-text">

                        {solvedQuestions} of{" "}
                        {totalQuestions} questions solved.

                    </p>

                </div>

            </div>


            {/* ========================================
                STATUS ANALYTICS
            ======================================== */}

            <div className="dashboard-section">

                <h2>
                    Question Status
                </h2>


                {/* SOLVED */}

                <div className="analytics-row">

                    <div className="analytics-label">

                        <span>
                            Solved
                        </span>

                        <strong>
                            {solvedQuestions}
                        </strong>

                    </div>


                    <div className="analytics-bar">

                        <div
                            className="analytics-fill"
                            style={{
                                width:
                                    `${solvedPercentage}%`,
                            }}
                        ></div>

                    </div>


                    <span className="analytics-percentage">

                        {solvedPercentage}%

                    </span>

                </div>


                {/* IN PROGRESS */}

                <div className="analytics-row">

                    <div className="analytics-label">

                        <span>
                            In Progress
                        </span>

                        <strong>
                            {inProgressQuestions}
                        </strong>

                    </div>


                    <div className="analytics-bar">

                        <div
                            className="analytics-fill"
                            style={{
                                width:
                                    `${inProgressPercentage}%`,
                            }}
                        ></div>

                    </div>


                    <span className="analytics-percentage">

                        {inProgressPercentage}%

                    </span>

                </div>


                {/* NOT STARTED */}

                <div className="analytics-row">

                    <div className="analytics-label">

                        <span>
                            Not Started
                        </span>

                        <strong>
                            {notStartedQuestions}
                        </strong>

                    </div>


                    <div className="analytics-bar">

                        <div
                            className="analytics-fill"
                            style={{
                                width:
                                    `${notStartedPercentage}%`,
                            }}
                        ></div>

                    </div>


                    <span className="analytics-percentage">

                        {notStartedPercentage}%

                    </span>

                </div>

            </div>


            {/* ========================================
                DIFFICULTY ANALYTICS
            ======================================== */}

            <div className="dashboard-section">

                <h2>
                    Difficulty Breakdown
                </h2>


                {/* EASY */}

                <div className="analytics-row">

                    <div className="analytics-label">

                        <span>
                            Easy
                        </span>

                        <strong>
                            {easyQuestions}
                        </strong>

                    </div>


                    <div className="analytics-bar">

                        <div
                            className="analytics-fill"
                            style={{
                                width:
                                    `${easyPercentage}%`,
                            }}
                        ></div>

                    </div>


                    <span className="analytics-percentage">

                        {easyPercentage}%

                    </span>

                </div>


                {/* MEDIUM */}

                <div className="analytics-row">

                    <div className="analytics-label">

                        <span>
                            Medium
                        </span>

                        <strong>
                            {mediumQuestions}
                        </strong>

                    </div>


                    <div className="analytics-bar">

                        <div
                            className="analytics-fill"
                            style={{
                                width:
                                    `${mediumPercentage}%`,
                            }}
                        ></div>

                    </div>


                    <span className="analytics-percentage">

                        {mediumPercentage}%

                    </span>

                </div>


                {/* HARD */}

                <div className="analytics-row">

                    <div className="analytics-label">

                        <span>
                            Hard
                        </span>

                        <strong>
                            {hardQuestions}
                        </strong>

                    </div>


                    <div className="analytics-bar">

                        <div
                            className="analytics-fill"
                            style={{
                                width:
                                    `${hardPercentage}%`,
                            }}
                        ></div>

                    </div>


                    <span className="analytics-percentage">

                        {hardPercentage}%

                    </span>

                </div>

            </div>


            {/* ========================================
                TOPICS
            ======================================== */}

            <div className="dashboard-section">

                <h2>
                    Topics Practiced
                </h2>


                <div className="category-list">

                    {dashboard.categories?.length > 0 ? (

                        dashboard.categories.map(
                            (category, index) => (

                                <span
                                    className="category-badge"
                                    key={index}
                                >
                                    {category}
                                </span>

                            )
                        )

                    ) : (

                        <p>
                            No categories practiced yet.
                        </p>

                    )}

                </div>

            </div>


            {/* ========================================
                RECENT QUESTIONS
            ======================================== */}

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


                                    <div>

                                        <strong>
                                            Difficulty:
                                        </strong>{" "}

                                        {question.difficulty ||
                                            "Easy"}

                                    </div>


                                    <div>

                                        <strong>
                                            Status:
                                        </strong>{" "}

                                        {question.status ||
                                            "Not Started"}

                                    </div>

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
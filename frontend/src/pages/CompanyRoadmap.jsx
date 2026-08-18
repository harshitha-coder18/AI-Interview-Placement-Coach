import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function CompanyRoadmap() {

    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // ============================================
    // LOAD COMPANIES
    // ============================================

    useEffect(() => {

        fetch("http://127.0.0.1:8000/companies")
            .then((response) => {

                if (!response.ok) {
                    throw new Error("Failed to load companies");
                }

                return response.json();
            })
            .then((data) => {

                console.log("Companies:", data);

                setCompanies(data);
                setLoading(false);
            })
            .catch((error) => {

                console.error(
                    "Company roadmap error:",
                    error
                );

                setError(error.message);
                setLoading(false);
            });

    }, []);


    // ============================================
    // LOADING
    // ============================================

    if (loading) {

        return (
            <div className="company-roadmap-page">

                <h2>
                    Loading company roadmap...
                </h2>

            </div>
        );
    }


    // ============================================
    // ERROR
    // ============================================

    if (error) {

        return (
            <div className="company-roadmap-page">

                <h2>
                    Company Roadmap
                </h2>

                <p>
                    {error}
                </p>

            </div>
        );
    }


    // ============================================
    // PAGE
    // ============================================

    return (

        <div className="company-roadmap-page">

            <div className="company-roadmap-header">

                <h1>
                    🚀 Company Roadmap
                </h1>

                <p>
                    Prepare for your dream company step by step.
                </p>

            </div>


            {/* ========================================
                COMPANY CARDS
            ======================================== */}

            <div className="company-grid">

                {companies.map((company) => (

                    <div
                        className="company-card"
                        key={company.id}
                    >

                        <h2>
                            {company.company_name}
                        </h2>


                        <p>
                            <strong>
                                Difficulty:
                            </strong>{" "}
                            {company.difficulty}
                        </p>


                        <div className="company-section">

                            <h3>
                                💻 Skills
                            </h3>

                            <p>
                                {company.skills}
                            </p>

                        </div>


                        <div className="company-section">

                            <h3>
                                🧠 DSA Topics
                            </h3>

                            <p>
                                {company.dsa_topics}
                            </p>

                        </div>


                        <div className="company-section">

                            <h3>
                                📚 Core Subjects
                            </h3>

                            <p>
                                {company.core_subjects}
                            </p>

                        </div>


                        {/* PROGRESS */}

                        <div className="company-progress">

                            <div className="progress-header">

                                <span>
                                    Preparation Progress
                                </span>

                                <strong>
                                    {company.progress}%
                                </strong>

                            </div>


                            <div className="progress-bar">

                                <div
                                    className="progress-fill"
                                    style={{
                                        width:
                                            `${company.progress}%`
                                    }}
                                ></div>

                            </div>

                        </div>


                        <button
                            type="button"
                            onClick={() =>
                                navigate(
            `                         /companies/${company.id}`
                                )
                            }
                        >
                            Start Preparation
                        </button>

                    </div>

                ))}

            </div>

        </div>
    );
}

export default CompanyRoadmap;
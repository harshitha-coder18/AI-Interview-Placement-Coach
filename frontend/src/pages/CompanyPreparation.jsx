import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function CompanyPreparation() {

    const { companyId } = useParams();

    const [company, setCompany] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [progress, setProgress] = useState(0);


    // ============================================
    // LOAD COMPANY
    // ============================================

    useEffect(() => {

        fetch(
            `http://127.0.0.1:8000/companies/${companyId}`
        )
            .then((response) => {

                if (!response.ok) {

                    throw new Error(
                        "Failed to load company"
                    );

                }

                return response.json();

            })
            .then((data) => {

                console.log(
                    "Company:",
                    data
                );

                setCompany(data);

                setProgress(
                    data.progress || 0
                );

                setLoading(false);

            })
            .catch((error) => {

                console.error(
                    "Company preparation error:",
                    error
                );

                setError(
                    error.message
                );

                setLoading(false);

            });

    }, [companyId]);


    // ============================================
    // UPDATE PROGRESS
    // ============================================

    const updateProgress = async () => {

        const token =
            localStorage.getItem("token");

        if (!token) {

            alert(
                "Please login first."
            );

            return;

        }

        try {

            const response = await fetch(
                `http://127.0.0.1:8000/companies/${companyId}/progress?progress=${progress}`,
                {
                    method: "PUT",

                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            const data =
                await response.json();

            if (!response.ok) {

                throw new Error(
                    data.detail ||
                    "Failed to update progress"
                );

            }

            alert(
                "Progress updated successfully!"
            );

            setCompany((previous) => ({
                ...previous,
                progress: data.progress
            }));

        }
        catch (error) {

            console.error(
                "Progress update error:",
                error
            );

            alert(
                error.message
            );

        }

    };


    // ============================================
    // LOADING
    // ============================================

    if (loading) {

        return (
            <div className="company-preparation-page">

                <h2>
                    Loading preparation roadmap...
                </h2>

            </div>
        );

    }


    // ============================================
    // ERROR
    // ============================================

    if (error) {

        return (
            <div className="company-preparation-page">

                <h2>
                    Company Preparation
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

        <div className="company-preparation-page">

            {/* HEADER */}

            <div className="company-preparation-header">

                <h1>
                    🚀 {company.company_name}
                </h1>

                <p>
                    Prepare step by step for your target company.
                </p>

            </div>


            {/* SKILLS */}

            <div className="preparation-card">

                <h2>
                    💻 Required Skills
                </h2>

                <p>
                    {company.skills}
                </p>

            </div>


            {/* DSA */}

            <div className="preparation-card">

                <h2>
                    🧠 DSA Topics
                </h2>

                <p>
                    {company.dsa_topics}
                </p>

            </div>


            {/* CORE SUBJECTS */}

            <div className="preparation-card">

                <h2>
                    📚 Core Subjects
                </h2>

                <p>
                    {company.core_subjects}
                </p>

            </div>


            {/* DIFFICULTY */}

            <div className="preparation-card">

                <h2>
                    🎯 Difficulty
                </h2>

                <p>
                    {company.difficulty}
                </p>

            </div>


            {/* PROGRESS */}

            <div className="preparation-card">

                <h2>
                    📊 Preparation Progress
                </h2>

                <div className="company-progress">

                    <div className="progress-header">

                        <span>
                            Progress
                        </span>

                        <strong>
                            {progress}%
                        </strong>

                    </div>


                    <div className="progress-bar">

                        <div
                            className="progress-fill"
                            style={{
                                width:
                                    `${progress}%`
                            }}
                        ></div>

                    </div>

                </div>


                {/* PROGRESS CONTROL */}

                <div className="progress-controls">

                    <label>
                        Update Preparation Progress
                    </label>

                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={progress}
                        onChange={(e) =>
                            setProgress(
                                Number(
                                    e.target.value
                                )
                            )
                        }
                    />

                    <span>
                        {progress}%
                    </span>

                    <button
                        type="button"
                        onClick={updateProgress}
                    >
                        💾 Save Progress
                    </button>

                </div>

            </div>

        </div>

    );

}

export default CompanyPreparation;
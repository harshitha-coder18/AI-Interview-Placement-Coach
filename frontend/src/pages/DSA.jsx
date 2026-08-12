import { useEffect, useState } from "react";
import PageTitle from "../components/PageTitle";

import {
    getQuestions,
    createQuestion,
    updateQuestion,
    deleteQuestion,
    createAnswer,
    getAnswers,
} from "../api";


function DSA() {

    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);

    const [questionText, setQuestionText] = useState("");
    const [category, setCategory] = useState("DSA");

    const [answerText, setAnswerText] = useState("");
    const [selectedQuestion, setSelectedQuestion] = useState(null);

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);


    // ========================================
    // LOAD DATA
    // ========================================

    useEffect(() => {

        const token = localStorage.getItem("token");

        if (!token) {
            setError("Please login first.");
            setLoading(false);
            return;
        }

        loadData(token);

    }, []);


    async function loadData(token) {

        try {

            setError("");

            const questionData =
                await getQuestions(token);

            const answerData =
                await getAnswers(token);

            setQuestions(questionData);
            setAnswers(answerData);

        } catch (err) {

            console.error(err);

            setError(err.message);

        } finally {

            setLoading(false);

        }
    }


    // ========================================
    // PROGRESS CALCULATIONS
    // ========================================

    const totalQuestions =
        questions.length;


    const solvedQuestions =
        questions.filter(
            (question) =>
                question.status === "Solved"
        ).length;


    const inProgressQuestions =
        questions.filter(
            (question) =>
                question.status === "In Progress"
        ).length;


    const notStartedQuestions =
        questions.filter(
            (question) =>
                !question.status ||
                question.status === "Not Started"
        ).length;


    // ========================================
    // DIFFICULTY CALCULATIONS
    // ========================================

    const easyQuestions =
        questions.filter(
            (question) =>
                !question.difficulty ||
                question.difficulty === "Easy"
        ).length;


    const mediumQuestions =
        questions.filter(
            (question) =>
                question.difficulty === "Medium"
        ).length;


    const hardQuestions =
        questions.filter(
            (question) =>
                question.difficulty === "Hard"
        ).length;


    // ========================================
    // PROGRESS PERCENTAGE
    // ========================================

    const progressPercentage =
        totalQuestions === 0
            ? 0
            : Math.min(
                Math.round(
                    (solvedQuestions /
                        totalQuestions) *
                    100
                ),
                100
            );


    // ========================================
    // ADD QUESTION
    // ========================================

    async function handleAddQuestion(e) {

        e.preventDefault();

        if (!questionText.trim()) {

            setError(
                "Please enter a question."
            );

            return;

        }

        const token =
            localStorage.getItem("token");

        if (!token) {

            setError(
                "Please login first."
            );

            return;

        }

        try {

            setError("");

            await createQuestion(
                {
                    question:
                        questionText.trim(),

                    category:
                        category,

                    difficulty:
                        "Easy",

                    status:
                        "Not Started",
                },
                token
            );

            setQuestionText("");

            await loadData(token);

        } catch (err) {

            console.error(err);

            setError(
                err.message
            );

        }
    }


    // ========================================
    // CHANGE DIFFICULTY
    // ========================================

    async function handleDifficultyChange(
        question,
        difficulty
    ) {

        const token =
            localStorage.getItem("token");

        if (!token) {

            setError(
                "Please login first."
            );

            return;

        }

        try {

            setError("");

            await updateQuestion(
                question.id,
                {
                    question:
                        question.question,

                    category:
                        question.category,

                    difficulty:
                        difficulty,

                    status:
                        question.status ||
                        "Not Started",
                },
                token
            );

            await loadData(token);

        } catch (err) {

            console.error(err);

            setError(
                err.message
            );

        }
    }


    // ========================================
    // CHANGE STATUS
    // ========================================

    async function handleStatusChange(
        question,
        status
    ) {

        const token =
            localStorage.getItem("token");

        if (!token) {

            setError(
                "Please login first."
            );

            return;

        }

        try {

            setError("");

            await updateQuestion(
                question.id,
                {
                    question:
                        question.question,

                    category:
                        question.category,

                    difficulty:
                        question.difficulty ||
                        "Easy",

                    status:
                        status,
                },
                token
            );

            await loadData(token);

        } catch (err) {

            console.error(err);

            setError(
                err.message
            );

        }
    }


    // ========================================
    // DELETE QUESTION
    // ========================================

    async function handleDeleteQuestion(
        questionId
    ) {

        const confirmDelete =
            window.confirm(
                "Are you sure you want to delete this question?"
            );

        if (!confirmDelete) {
            return;
        }

        const token =
            localStorage.getItem("token");

        if (!token) {

            setError(
                "Please login first."
            );

            return;

        }

        try {

            setError("");

            await deleteQuestion(
                questionId,
                token
            );

            if (
                selectedQuestion?.id ===
                questionId
            ) {

                setSelectedQuestion(
                    null
                );

                setAnswerText("");

            }

            await loadData(token);

        } catch (err) {

            console.error(err);

            setError(
                err.message
            );

        }
    }


    // ========================================
    // EDIT QUESTION
    // ========================================

    async function handleEditQuestion(
        question
    ) {

        const newQuestion =
            window.prompt(
                "Edit question:",
                question.question
            );

        if (
            !newQuestion ||
            !newQuestion.trim()
        ) {

            return;

        }

        const token =
            localStorage.getItem("token");

        if (!token) {

            setError(
                "Please login first."
            );

            return;

        }

        try {

            setError("");

            await updateQuestion(
                question.id,
                {
                    question:
                        newQuestion.trim(),

                    category:
                        question.category,

                    difficulty:
                        question.difficulty ||
                        "Easy",

                    status:
                        question.status ||
                        "Not Started",
                },
                token
            );

            await loadData(token);

        } catch (err) {

            console.error(err);

            setError(
                err.message
            );

        }
    }


    // ========================================
    // SELECT QUESTION FOR ANSWER
    // ========================================

    function handleAnswerClick(
        question
    ) {

        setSelectedQuestion(
            question
        );

        setAnswerText("");

        setError("");

    }


    // ========================================
    // CLOSE ANSWER FORM
    // ========================================

    function handleCloseAnswer() {

        setSelectedQuestion(
            null
        );

        setAnswerText("");

        setError("");

    }


    // ========================================
    // SUBMIT ANSWER
    // ========================================

    async function handleSubmitAnswer(e) {

        e.preventDefault();

        if (!selectedQuestion) {

            setError(
                "Please select a question."
            );

            return;

        }

        if (!answerText.trim()) {

            setError(
                "Please write an answer."
            );

            return;

        }

        const token =
            localStorage.getItem("token");

        if (!token) {

            setError(
                "Please login first."
            );

            return;

        }

        try {

            setError("");

            await createAnswer(
                {
                    question_id:
                        selectedQuestion.id,

                    answer:
                        answerText.trim(),
                },
                token
            );

            setAnswerText("");

            setSelectedQuestion(
                null
            );

            await loadData(token);

        } catch (err) {

            console.error(err);

            setError(
                err.message
            );

        }
    }


    // ========================================
    // LOADING
    // ========================================

    if (loading) {

        return (

            <div className="dsa-page">

                <PageTitle
                    title="DSA Practice"
                />

                <div className="dsa-card">

                    <p>
                        Loading questions...
                    </p>

                </div>

            </div>

        );

    }


    // ========================================
    // PAGE
    // ========================================

    return (

        <div className="dsa-page">

            <PageTitle
                title="DSA Practice"
            />


            <p>
                Practice interview questions,
                track difficulty and monitor
                your DSA progress.
            </p>


            {/* ========================================
                ERROR
            ======================================== */}

            {error && (

                <div className="error-message">

                    {error}

                </div>

            )}


            {/* ========================================
                PROGRESS
            ======================================== */}

            <section className="dsa-progress">

                <h2>
                    DSA Progress
                </h2>


                {/* STATUS CARDS */}

                <div className="progress-cards">

                    <div className="progress-card">

                        <h3>
                            Total Questions
                        </h3>

                        <h1>
                            {totalQuestions}
                        </h1>

                        <p>
                            Questions practiced
                        </p>

                    </div>


                    <div className="progress-card">

                        <h3>
                            Solved
                        </h3>

                        <h1>
                            {solvedQuestions}
                        </h1>

                        <p>
                            Questions solved
                        </p>

                    </div>


                    <div className="progress-card">

                        <h3>
                            In Progress
                        </h3>

                        <h1>
                            {inProgressQuestions}
                        </h1>

                        <p>
                            Currently practicing
                        </p>

                    </div>


                    <div className="progress-card">

                        <h3>
                            Not Started
                        </h3>

                        <h1>
                            {notStartedQuestions}
                        </h1>

                        <p>
                            Questions remaining
                        </p>

                    </div>

                </div>


                {/* ========================================
                    DIFFICULTY CARDS
                ======================================== */}

                <div className="progress-cards">

                    <div className="progress-card">

                        <h3>
                            Easy
                        </h3>

                        <h1>
                            {easyQuestions}
                        </h1>

                        <p>
                            Easy questions
                        </p>

                    </div>


                    <div className="progress-card">

                        <h3>
                            Medium
                        </h3>

                        <h1>
                            {mediumQuestions}
                        </h1>

                        <p>
                            Medium questions
                        </p>

                    </div>


                    <div className="progress-card">

                        <h3>
                            Hard
                        </h3>

                        <h1>
                            {hardQuestions}
                        </h1>

                        <p>
                            Hard questions
                        </p>

                    </div>

                </div>


                {/* ========================================
                    PROGRESS BAR
                ======================================== */}

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

                        {totalQuestions === 0

                            ? "Add your first DSA question to start tracking progress."

                            : `${solvedQuestions} of ${totalQuestions} questions solved.`}

                    </p>

                </div>

            </section>


            {/* ========================================
                ADD QUESTION
            ======================================== */}

            <section className="dsa-form">

                <h2>
                    Add Interview Question
                </h2>


                <form
                    onSubmit={
                        handleAddQuestion
                    }
                >

                    <input
                        type="text"
                        placeholder="Enter DSA question"
                        value={
                            questionText
                        }
                        onChange={(e) =>
                            setQuestionText(
                                e.target.value
                            )
                        }
                    />


                    <select
                        value={
                            category
                        }
                        onChange={(e) =>
                            setCategory(
                                e.target.value
                            )
                        }
                    >

                        <option value="DSA">
                            DSA
                        </option>

                        <option value="Arrays">
                            Arrays
                        </option>

                        <option value="Strings">
                            Strings
                        </option>

                        <option value="Linked List">
                            Linked List
                        </option>

                        <option value="Stack">
                            Stack
                        </option>

                        <option value="Queue">
                            Queue
                        </option>

                        <option value="Trees">
                            Trees
                        </option>

                        <option value="Graphs">
                            Graphs
                        </option>

                        <option value="Dynamic Programming">
                            Dynamic Programming
                        </option>

                    </select>


                    <button type="submit">
                        + Add Question
                    </button>

                </form>

            </section>


            {/* ========================================
                QUESTIONS
            ======================================== */}

            <section className="dsa-questions">

                <h2>
                    Your Questions
                </h2>


                {questions.length === 0 ? (

                    <div className="dsa-question-card">

                        <p>
                            No questions yet.
                        </p>

                    </div>

                ) : (

                    <div className="question-list">

                        {questions.map(
                            (question) => {

                                const questionAnswers =
                                    answers.filter(
                                        (answer) =>
                                            answer.question_id ===
                                            question.id
                                    );


                                const currentDifficulty =
                                    question.difficulty ||
                                    "Easy";


                                const currentStatus =
                                    question.status ||
                                    "Not Started";


                                return (

                                    <div
                                        className="dsa-question-card"
                                        key={
                                            question.id
                                        }
                                    >

                                        {/* QUESTION */}

                                        <h3>
                                            {
                                                question.question
                                            }
                                        </h3>


                                        {/* CATEGORY */}

                                        <span className="dsa-category">

                                            {
                                                question.category
                                            }

                                        </span>


                                        {/* DIFFICULTY */}

                                        <div className="status-section">

                                            <label>
                                                Difficulty:
                                            </label>


                                            <select
                                                value={
                                                    currentDifficulty
                                                }
                                                onChange={(e) =>
                                                    handleDifficultyChange(
                                                        question,
                                                        e.target.value
                                                    )
                                                }
                                            >

                                                <option value="Easy">
                                                    Easy
                                                </option>

                                                <option value="Medium">
                                                    Medium
                                                </option>

                                                <option value="Hard">
                                                    Hard
                                                </option>

                                            </select>

                                        </div>


                                        {/* STATUS */}

                                        <div className="status-section">

                                            <label>
                                                Status:
                                            </label>


                                            <select
                                                value={
                                                    currentStatus
                                                }
                                                onChange={(e) =>
                                                    handleStatusChange(
                                                        question,
                                                        e.target.value
                                                    )
                                                }
                                            >

                                                <option value="Not Started">
                                                    Not Started
                                                </option>

                                                <option value="In Progress">
                                                    In Progress
                                                </option>

                                                <option value="Solved">
                                                    Solved
                                                </option>

                                            </select>

                                        </div>


                                        {/* BUTTONS */}

                                        <div className="question-actions">

                                            <button
                                                onClick={() =>
                                                    handleEditQuestion(
                                                        question
                                                    )
                                                }
                                            >
                                                Edit
                                            </button>


                                            <button
                                                onClick={() =>
                                                    handleDeleteQuestion(
                                                        question.id
                                                    )
                                                }
                                            >
                                                Delete
                                            </button>


                                            <button
                                                onClick={() =>
                                                    handleAnswerClick(
                                                        question
                                                    )
                                                }
                                            >
                                                Answer
                                            </button>

                                        </div>


                                        {/* ========================================
                                            ANSWER FORM
                                        ======================================== */}

                                        {
                                            selectedQuestion?.id ===
                                            question.id && (

                                                <form
                                                    className="answer-section"
                                                    onSubmit={
                                                        handleSubmitAnswer
                                                    }
                                                >

                                                    <h3>
                                                        Your Answer
                                                    </h3>


                                                    <textarea
                                                        placeholder="Write your answer..."
                                                        value={
                                                            answerText
                                                        }
                                                        onChange={(e) =>
                                                            setAnswerText(
                                                                e.target.value
                                                            )
                                                        }
                                                    />


                                                    <div className="question-actions">

                                                        <button
                                                            type="submit"
                                                        >
                                                            Submit Answer
                                                        </button>


                                                        <button
                                                            type="button"
                                                            onClick={
                                                                handleCloseAnswer
                                                            }
                                                        >
                                                            Cancel
                                                        </button>

                                                    </div>

                                                </form>

                                            )
                                        }


                                        {/* ========================================
                                            PREVIOUS ANSWERS
                                        ======================================== */}

                                        {
                                            questionAnswers.length >
                                            0 && (

                                                <div className="answers-list">

                                                    <h4>
                                                        Previous Answers
                                                    </h4>


                                                    {
                                                        questionAnswers.map(
                                                            (answer) => (

                                                                <div
                                                                    className="answer-card"
                                                                    key={
                                                                        answer.id
                                                                    }
                                                                >

                                                                    {
                                                                        answer.answer
                                                                    }

                                                                </div>

                                                            )
                                                        )
                                                    }

                                                </div>

                                            )
                                        }

                                    </div>

                                );

                            }
                        )}

                    </div>

                )}

            </section>


            {/* ========================================
                ANSWER HISTORY
            ======================================== */}

            <section className="dsa-questions">

                <h2>
                    Answer History
                </h2>


                {answers.length === 0 ? (

                    <div className="dsa-question-card">

                        <p>
                            No answers submitted yet.
                        </p>

                    </div>

                ) : (

                    <div className="question-list">

                        {
                            answers.map(
                                (answer) => (

                                    <div
                                        className="dsa-question-card"
                                        key={
                                            answer.id
                                        }
                                    >

                                        <h3>
                                            {
                                                answer.question
                                            }
                                        </h3>


                                        <span className="dsa-category">

                                            {
                                                answer.category
                                            }

                                        </span>


                                        <div className="answer-card">

                                            <strong>
                                                Your Answer
                                            </strong>


                                            <p>
                                                {
                                                    answer.answer
                                                }
                                            </p>

                                        </div>

                                    </div>

                                )
                            )
                        }

                    </div>

                )}

            </section>

        </div>

    );
}


export default DSA;
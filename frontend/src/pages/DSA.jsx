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

            const questionData = await getQuestions(token);
            const answerData = await getAnswers(token);

            setQuestions(questionData);
            setAnswers(answerData);

        } catch (err) {

            console.error(err);
            setError(err.message);

        } finally {

            setLoading(false);

        }
    }

    async function handleAddQuestion(e) {

        e.preventDefault();

        if (!questionText.trim()) {
            setError("Please enter a question.");
            return;
        }

        const token = localStorage.getItem("token");

        try {

            setError("");

            await createQuestion(
                {
                    question: questionText,
                    category: category,
                },
                token
            );

            setQuestionText("");

            await loadData(token);

        } catch (err) {

            setError(err.message);

        }
    }

    async function handleDeleteQuestion(questionId) {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this question?"
        );

        if (!confirmDelete) {
            return;
        }

        const token = localStorage.getItem("token");

        try {

            setError("");

            await deleteQuestion(
                questionId,
                token
            );

            await loadData(token);

        } catch (err) {

            setError(err.message);

        }
    }

    async function handleEditQuestion(question) {

        const newQuestion = prompt(
            "Edit question:",
            question.question
        );

        if (!newQuestion || !newQuestion.trim()) {
            return;
        }

        const token = localStorage.getItem("token");

        try {

            setError("");

            await updateQuestion(
                question.id,
                {
                    question: newQuestion,
                    category: question.category,
                },
                token
            );

            await loadData(token);

        } catch (err) {

            setError(err.message);

        }
    }

    function handleAnswerClick(question) {

        setSelectedQuestion(question);
        setAnswerText("");
        setError("");

    }

    async function handleSubmitAnswer(e) {

        e.preventDefault();

        if (!answerText.trim()) {
            setError("Please write an answer.");
            return;
        }

        const token = localStorage.getItem("token");

        try {

            setError("");

            await createAnswer(
                {
                    question_id: selectedQuestion.id,
                    answer: answerText,
                },
                token
            );

            setAnswerText("");
            setSelectedQuestion(null);

            await loadData(token);

        } catch (err) {

            setError(err.message);

        }
    }

    if (loading) {

        return (
            <div className="dsa-page">

                <PageTitle title="DSA Practice" />

                <div className="dsa-card">
                    <p>Loading questions...</p>
                </div>

            </div>
        );
    }

    return (

        <div className="dsa-page">

            <PageTitle title="DSA Practice" />

            <p>
                Practice interview questions, write your answers,
                and improve your DSA preparation.
            </p>


            {/* ERROR */}

            {error && (
                <div className="error-message">
                    {error}
                </div>
            )}


            {/* ADD QUESTION */}

            <section className="dsa-form">

                <h2>Add Interview Question</h2>

                <form onSubmit={handleAddQuestion}>

                    <input
                        type="text"
                        placeholder="Enter DSA question"
                        value={questionText}
                        onChange={(e) =>
                            setQuestionText(e.target.value)
                        }
                    />

                    <select
                        value={category}
                        onChange={(e) =>
                            setCategory(e.target.value)
                        }
                    >

                        <option value="DSA">DSA</option>
                        <option value="Arrays">Arrays</option>
                        <option value="Strings">Strings</option>
                        <option value="Linked List">
                            Linked List
                        </option>
                        <option value="Stack">Stack</option>
                        <option value="Queue">Queue</option>
                        <option value="Trees">Trees</option>
                        <option value="Graphs">Graphs</option>
                        <option value="Dynamic Programming">
                            Dynamic Programming
                        </option>

                    </select>

                    <button type="submit">
                        + Add Question
                    </button>

                </form>

            </section>


            {/* QUESTIONS */}

            <section className="dsa-questions">

                <h2>Your Questions</h2>

                {questions.length === 0 ? (

                    <div className="dsa-question-card">
                        <p>No questions yet.</p>
                    </div>

                ) : (

                    <div className="question-list">

                        {questions.map((question) => {

                            const questionAnswers =
                                answers.filter(
                                    (answer) =>
                                        answer.question ===
                                        question.question
                                );

                            return (

                                <div
                                    className="dsa-question-card"
                                    key={question.id}
                                >

                                    <h3>
                                        {question.question}
                                    </h3>

                                    <span className="dsa-category">
                                        {question.category}
                                    </span>


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


                                    {/* ANSWER FORM */}

                                    {selectedQuestion?.id ===
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
                                                value={answerText}
                                                onChange={(e) =>
                                                    setAnswerText(
                                                        e.target.value
                                                    )
                                                }
                                            />

                                            <button type="submit">
                                                Submit Answer
                                            </button>

                                        </form>

                                    )}


                                    {/* PREVIOUS ANSWERS */}

                                    {questionAnswers.length > 0 && (

                                        <div className="answers-list">

                                            <h4>
                                                Previous Answers
                                            </h4>

                                            {questionAnswers.map(
                                                (answer) => (

                                                    <div
                                                        className="answer-card"
                                                        key={answer.id}
                                                    >
                                                        {answer.answer}
                                                    </div>

                                                )
                                            )}

                                        </div>

                                    )}

                                </div>

                            );

                        })}

                    </div>

                )}

            </section>


            {/* ANSWER HISTORY */}

            <section className="dsa-questions">

                <h2>Answer History</h2>

                {answers.length === 0 ? (

                    <div className="dsa-question-card">
                        <p>No answers submitted yet.</p>
                    </div>

                ) : (

                    <div className="question-list">

                        {answers.map((answer) => (

                            <div
                                className="dsa-question-card"
                                key={answer.id}
                            >

                                <h3>
                                    {answer.question}
                                </h3>

                                <span className="dsa-category">
                                    {answer.category}
                                </span>

                                <div className="answer-card">

                                    <strong>
                                        Your Answer
                                    </strong>

                                    <p>
                                        {answer.answer}
                                    </p>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </section>

        </div>
    );
}

export default DSA;
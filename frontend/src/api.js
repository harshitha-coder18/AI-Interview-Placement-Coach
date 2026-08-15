const API_URL = "http://127.0.0.1:8000";


// ============================================================
// LOGIN
// ============================================================

export async function loginUser(user) {

    const response = await fetch(
        `${API_URL}/login`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify(user),
        }
    );

    const data = await response.json();

    if (!response.ok) {

        throw new Error(
            data.detail || "Login failed"
        );

    }

    return data;
}


// ============================================================
// DASHBOARD
// ============================================================

export async function getDashboard(token) {

    const response = await fetch(
        `${API_URL}/dashboard`,
        {
            method: "GET",

            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        }
    );

    const data = await response.json();

    if (!response.ok) {

        throw new Error(
            data.detail || "Failed to fetch dashboard"
        );

    }

    return data;
}


// ============================================================
// CREATE QUESTION
// ============================================================

export async function createQuestion(
    question,
    token
) {

    const response = await fetch(
        `${API_URL}/questions`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },

            /*
             * question can now contain:
             *
             * {
             *     question: "...",
             *     category: "Arrays",
             *     difficulty: "Easy",
             *     status: "Not Started"
             * }
             */

            body: JSON.stringify(question),
        }
    );

    const data = await response.json();

    if (!response.ok) {

        throw new Error(
            data.detail || "Failed to create question"
        );

    }

    return data;
}


// ============================================================
// GET QUESTIONS
// ============================================================

export async function getQuestions(token) {

    const response = await fetch(
        `${API_URL}/questions`,
        {
            method: "GET",

            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        }
    );

    const data = await response.json();

    if (!response.ok) {

        throw new Error(
            data.detail || "Failed to fetch questions"
        );

    }

    return data;
}


// ============================================================
// UPDATE QUESTION
// ============================================================

export async function updateQuestion(
    questionId,
    question,
    token
) {

    const response = await fetch(
        `${API_URL}/questions/${questionId}`,
        {
            method: "PUT",

            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },

            /*
             * question can contain:
             *
             * {
             *     question: "...",
             *     category: "Arrays",
             *     difficulty: "Medium",
             *     status: "In Progress"
             * }
             */

            body: JSON.stringify(question),
        }
    );

    const data = await response.json();

    if (!response.ok) {

        throw new Error(
            data.detail || "Failed to update question"
        );

    }

    return data;
}


// ============================================================
// DELETE QUESTION
// ============================================================

export async function deleteQuestion(
    questionId,
    token
) {

    const response = await fetch(
        `${API_URL}/questions/${questionId}`,
        {
            method: "DELETE",

            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        }
    );

    const data = await response.json();

    if (!response.ok) {

        throw new Error(
            data.detail || "Failed to delete question"
        );

    }

    return data;
}


// ============================================================
// CREATE ANSWER
// ============================================================

export async function createAnswer(
    answer,
    token
) {

    const response = await fetch(
        `${API_URL}/answers`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },

            body: JSON.stringify(answer),
        }
    );

    const data = await response.json();

    if (!response.ok) {

        throw new Error(
            data.detail || "Failed to submit answer"
        );

    }

    return data;
}


// ============================================================
// GET ALL ANSWERS
// ============================================================

export async function getAnswers(token) {

    const response = await fetch(
        `${API_URL}/answers`,
        {
            method: "GET",

            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        }
    );

    const data = await response.json();

    if (!response.ok) {

        throw new Error(
            data.detail || "Failed to fetch answers"
        );

    }

    return data;
}


// ============================================================
// GET ANSWERS FOR SPECIFIC QUESTION
// ============================================================

export async function getQuestionAnswers(
    questionId,
    token
) {

    const response = await fetch(
        `${API_URL}/questions/${questionId}/answers`,
        {
            method: "GET",

            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        }
    );

    const data = await response.json();

    if (!response.ok) {

        throw new Error(
            data.detail || "Failed to fetch answers"
        );

    }

    return data;
}
// ============================================================
// RESUME
// ============================================================




// ============================================================
// GET RESUME
// ============================================================


// ============================================================
// CREATE / UPDATE RESUME
// ============================================================

export async function saveResume(resume, token) {

    const response = await fetch(
        `${API_URL}/resume`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },

            body: JSON.stringify(resume),
        }
    );

    const data = await response.json();

    if (!response.ok) {

        throw new Error(
            data.detail || "Failed to save resume"
        );

    }

    return data;
}


// ============================================================
// GET RESUME
// ============================================================

export async function getResume(token) {

    const response = await fetch(
        `${API_URL}/resume`,
        {
            method: "GET",

            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        }
    );

    const data = await response.json();

    if (!response.ok) {

        throw new Error(
            data.detail || "Failed to fetch resume"
        );

    }

    return data;
}

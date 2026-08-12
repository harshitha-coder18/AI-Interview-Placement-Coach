from pydantic import BaseModel


# ============================================
# USER
# ============================================

class UserCreate(BaseModel):

    name: str
    email: str
    password: str


# ============================================
# QUESTION
# ============================================

class QuestionCreate(BaseModel):

    question: str
    category: str

    # Each question remembers its own difficulty
    difficulty: str = "Easy"

    # Each question remembers its own status
    status: str = "Not Started"


# ============================================
# ANSWER
# ============================================

class AnswerCreate(BaseModel):

    answer: str
    question_id: int
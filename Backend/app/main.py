from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session

from .database import Base, engine, SessionLocal
from .models import User, Question, Answer
from .schemas import UserCreate, QuestionCreate, AnswerCreate
from .auth import hash_password, verify_password
from .security import create_access_token
from .dependencies import get_current_user


# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI()


# =========================
# Database connection
# =========================

def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()


# =========================
# Home
# =========================

@app.get("/")
def home():
    return {
        "message": "Welcome to AI Interview Placement Coach Backend 🚀"
    }


# =========================
# Register
# =========================

@app.post("/register")
def register(
    user: UserCreate,
    db: Session = Depends(get_db)
):
    new_user = User(
        name=user.name,
        email=user.email,
        password=hash_password(user.password)
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "message": "User registered successfully",
        "id": new_user.id
    }


# =========================
# Login
# =========================

@app.post("/login")
def login(
    user: UserCreate,
    db: Session = Depends(get_db)
):
    db_user = db.query(User).filter(
        User.email == user.email
    ).first()

    if not db_user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    if not verify_password(
        user.password,
        db_user.password
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid password"
        )

    access_token = create_access_token(
        data={"sub": str(db_user.id)}
    )

    return {
        "message": "Login successful",
        "user": db_user.name,
        "access_token": access_token
    }


# =========================
# Protected Profile
# =========================

@app.get("/profile")
def profile(
    user_id: str = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    user = db.query(User).filter(
        User.id == int(user_id)
    ).first()

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    return {
        "name": user.name,
        "email": user.email
    }


# =========================
# Create Interview Question
# =========================

@app.post("/questions")
def create_question(
    question: QuestionCreate,
    db: Session = Depends(get_db),
    user_id: str = Depends(get_current_user)
):
    new_question = Question(
        question=question.question,
        category=question.category,
        user_id=int(user_id)
    )

    db.add(new_question)
    db.commit()
    db.refresh(new_question)

    return {
        "message": "Question created successfully",
        "id": new_question.id
    }


# =========================
# Get Interview Questions
# =========================

@app.get("/questions")
def get_questions(
    db: Session = Depends(get_db),
    user_id: str = Depends(get_current_user)
):
    questions = db.query(Question).filter(
        Question.user_id == int(user_id)
    ).all()

    return questions
@app.delete("/questions/{question_id}")
def delete_question(
    question_id: int,
    db: Session = Depends(get_db),
    user_id: str = Depends(get_current_user)
):
    question = db.query(Question).filter(
        Question.id == question_id,
        Question.user_id == int(user_id)
    ).first()

    if not question:
        raise HTTPException(
            status_code=404,
            detail="Question not found"
        )

    db.delete(question)
    db.commit()

    return {
        "message": "Question deleted successfully"
    }
@app.put("/questions/{question_id}")
def update_question(
    question_id: int,
    question: QuestionCreate,
    db: Session = Depends(get_db),
    user_id: str = Depends(get_current_user)
):
    existing_question = db.query(Question).filter(
        Question.id == question_id,
        Question.user_id == int(user_id)
    ).first()

    if not existing_question:
        raise HTTPException(
            status_code=404,
            detail="Question not found"
        )

    existing_question.question = question.question
    existing_question.category = question.category

    db.commit()
    db.refresh(existing_question)

    return {
        "message": "Question updated successfully",
        "id": existing_question.id
    }
@app.post("/answers")
def create_answer(
    answer: AnswerCreate,
    db: Session = Depends(get_db),
    user_id: str = Depends(get_current_user)
):
    question = db.query(Question).filter(
        Question.id == answer.question_id,
        Question.user_id == int(user_id)
    ).first()

    if not question:
        raise HTTPException(
            status_code=404,
            detail="Question not found"
        )

    new_answer = Answer(
        answer=answer.answer,
        question_id=answer.question_id,
        user_id=int(user_id)
    )

    db.add(new_answer)
    db.commit()
    db.refresh(new_answer)

    return {
        "message": "Answer submitted successfully",
        "id": new_answer.id
    }
@app.get("/answers")
def get_answers(
    db: Session = Depends(get_db),
    user_id: str = Depends(get_current_user)
):
    answers = db.query(Answer).filter(
        Answer.user_id == int(user_id)
    ).all()

    return answers
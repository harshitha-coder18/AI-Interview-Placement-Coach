from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from .database import Base, engine, SessionLocal
from .models import (
    User,
    Question,
    Answer,
    Resume,
    CompanyRoadmap
)
from .schemas import (
    UserCreate,
    QuestionCreate,
    AnswerCreate,
    ResumeCreate
)
from .auth import hash_password, verify_password
from .security import create_access_token
from .dependencies import get_current_user


# ============================================================
# CREATE DATABASE TABLES
# ============================================================

Base.metadata.create_all(bind=engine)


# ============================================================
# FASTAPI APP
# ============================================================

app = FastAPI(
    title="AI Interview Placement Coach API",
    description="Backend API for AI Interview Placement Coach",
    version="1.0.0"
)


# ============================================================
# CORS
# ============================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ============================================================
# DATABASE CONNECTION
# ============================================================

def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()


# ============================================================
# HOME
# ============================================================

@app.get("/")
def home():

    return {
        "message": "Welcome to AI Interview Placement Coach Backend 🚀"
    }


# ============================================================
# REGISTER
# ============================================================

@app.post("/register")
def register(
    user: UserCreate,
    db: Session = Depends(get_db)
):

    existing_user = db.query(User).filter(
        User.email == user.email
    ).first()

    if existing_user:

        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

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


# ============================================================
# LOGIN
# ============================================================

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
        data={
            "sub": str(db_user.id)
        }
    )

    return {
        "message": "Login successful",
        "user": db_user.name,
        "access_token": access_token
    }


# ============================================================
# PROFILE
# ============================================================

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


# ============================================================
# CREATE QUESTION
# ============================================================

@app.post("/questions")
def create_question(
    question: QuestionCreate,
    db: Session = Depends(get_db),
    user_id: str = Depends(get_current_user)
):

    new_question = Question(
        question=question.question,
        category=question.category,
        difficulty=question.difficulty,
        status=question.status,
        user_id=int(user_id)
    )

    db.add(new_question)

    db.commit()

    db.refresh(new_question)

    return {
        "id": new_question.id,
        "question": new_question.question,
        "category": new_question.category,
        "difficulty": new_question.difficulty,
        "status": new_question.status,
        "user_id": new_question.user_id
    }


# ============================================================
# GET QUESTIONS
# ============================================================

@app.get("/questions")
def get_questions(
    db: Session = Depends(get_db),
    user_id: str = Depends(get_current_user)
):

    questions = db.query(Question).filter(
        Question.user_id == int(user_id)
    ).all()

    return [
        {
            "id": question.id,
            "question": question.question,
            "category": question.category,
            "difficulty": question.difficulty,
            "status": question.status,
            "user_id": question.user_id
        }
        for question in questions
    ]


# ============================================================
# UPDATE QUESTION
# ============================================================

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
    existing_question.difficulty = question.difficulty
    existing_question.status = question.status

    db.commit()

    db.refresh(existing_question)

    return {
        "id": existing_question.id,
        "question": existing_question.question,
        "category": existing_question.category,
        "difficulty": existing_question.difficulty,
        "status": existing_question.status
    }


# ============================================================
# DELETE QUESTION
# ============================================================

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


# ============================================================
# CREATE ANSWER
# ============================================================

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

    question.status = "Solved"

    db.commit()

    db.refresh(new_answer)

    return {
        "message": "Answer submitted successfully",
        "id": new_answer.id,
        "question_id": new_answer.question_id
    }


# ============================================================
# GET ALL ANSWERS
# ============================================================

@app.get("/answers")
def get_answers(
    db: Session = Depends(get_db),
    user_id: str = Depends(get_current_user)
):

    answers = db.query(Answer).filter(
        Answer.user_id == int(user_id)
    ).all()

    result = []

    for answer in answers:

        result.append({

            "id": answer.id,

            "question_id": answer.question_id,

            "question": answer.question.question,

            "category": answer.question.category,

            "difficulty": answer.question.difficulty,

            "status": answer.question.status,

            "answer": answer.answer

        })

    return result


# ============================================================
# GET ANSWERS FOR SPECIFIC QUESTION
# ============================================================

@app.get("/questions/{question_id}/answers")
def get_question_answers(
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

    answers = db.query(Answer).filter(
        Answer.question_id == question_id,
        Answer.user_id == int(user_id)
    ).all()

    return [

        {
            "id": answer.id,
            "answer": answer.answer,
            "question_id": answer.question_id
        }

        for answer in answers

    ]


# ============================================================
# DASHBOARD
# ============================================================

@app.get("/dashboard")
def dashboard(
    db: Session = Depends(get_db),
    user_id: str = Depends(get_current_user)
):

    user = db.query(User).filter(
        User.id == int(user_id)
    ).first()

    if not user:

        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    questions = db.query(Question).filter(
        Question.user_id == int(user_id)
    ).all()

    total_questions = len(questions)

    total_answers = db.query(Answer).filter(
        Answer.user_id == int(user_id)
    ).count()

    solved_questions = sum(
        1
        for question in questions
        if question.status == "Solved"
    )

    in_progress_questions = sum(
        1
        for question in questions
        if question.status == "In Progress"
    )

    not_started_questions = sum(
        1
        for question in questions
        if question.status == "Not Started"
        or question.status is None
    )

    easy_questions = sum(
        1
        for question in questions
        if question.difficulty == "Easy"
        or question.difficulty is None
    )

    medium_questions = sum(
        1
        for question in questions
        if question.difficulty == "Medium"
    )

    hard_questions = sum(
        1
        for question in questions
        if question.difficulty == "Hard"
    )

    if total_questions == 0:

        progress_percentage = 0

    else:

        progress_percentage = round(
            (solved_questions / total_questions) * 100
        )

    categories = list(
        set(
            question.category
            for question in questions
            if question.category
        )
    )

    recent_questions = (
        db.query(Question)
        .filter(
            Question.user_id == int(user_id)
        )
        .order_by(
            Question.id.desc()
        )
        .limit(5)
        .all()
    )

    return {

        "name": user.name,

        "total_questions": total_questions,

        "total_answers": total_answers,

        "solved_questions": solved_questions,

        "in_progress_questions": in_progress_questions,

        "not_started_questions": not_started_questions,

        "easy_questions": easy_questions,

        "medium_questions": medium_questions,

        "hard_questions": hard_questions,

        "progress_percentage": progress_percentage,

        "categories": categories,

        "recent_questions": [

            {
                "id": question.id,

                "question": question.question,

                "category": question.category,

                "difficulty": question.difficulty
                    or "Easy",

                "status": question.status
                    or "Not Started"
            }

            for question in recent_questions

        ]
    }


# ============================================================
# CREATE / UPDATE RESUME
# ============================================================

@app.post("/resume")
def create_resume(
    resume: ResumeCreate,
    db: Session = Depends(get_db),
    user_id: str = Depends(get_current_user)
):

    existing_resume = db.query(Resume).filter(
        Resume.user_id == int(user_id)
    ).first()

    if existing_resume:

        existing_resume.name = resume.name
        existing_resume.email = resume.email
        existing_resume.college = resume.college
        existing_resume.skills = resume.skills

        db.commit()

        db.refresh(existing_resume)

        return {
            "message": "Resume updated successfully",
            "id": existing_resume.id
        }

    new_resume = Resume(
        name=resume.name,
        email=resume.email,
        college=resume.college,
        skills=resume.skills,
        user_id=int(user_id)
    )

    db.add(new_resume)

    db.commit()

    db.refresh(new_resume)

    return {
        "message": "Resume created successfully",
        "id": new_resume.id
    }


# ============================================================
# GET RESUME
# ============================================================

@app.get("/resume")
def get_resume(
    db: Session = Depends(get_db),
    user_id: str = Depends(get_current_user)
):

    resume = db.query(Resume).filter(
        Resume.user_id == int(user_id)
    ).first()

    if not resume:

        raise HTTPException(
            status_code=404,
            detail="Resume not found"
        )

    return {
        "id": resume.id,
        "name": resume.name,
        "email": resume.email,
        "college": resume.college,
        "skills": resume.skills
    }


# ============================================================
# RESUME ATS ANALYZER
# ============================================================

@app.get("/resume/analyze")
def analyze_resume(
    db: Session = Depends(get_db),
    user_id: str = Depends(get_current_user)
):

    resume = db.query(Resume).filter(
        Resume.user_id == int(user_id)
    ).first()

    if not resume:

        raise HTTPException(
            status_code=404,
            detail="Resume not found"
        )

    score = 0

    suggestions = []

    if resume.name and resume.name.strip():

        score += 10

    else:

        suggestions.append(
            "Add your full name."
        )

    if resume.email and resume.email.strip():

        score += 10

    else:

        suggestions.append(
            "Add a professional email address."
        )

    if resume.college and resume.college.strip():

        score += 15

    else:

        suggestions.append(
            "Add your college or university."
        )

    if resume.skills and resume.skills.strip():

        score += 35

        skills = [
            skill.strip()
            for skill in resume.skills.split(",")
            if skill.strip()
        ]

        if len(skills) >= 5:

            score += 20

        elif len(skills) >= 3:

            score += 10

        else:

            suggestions.append(
                "Add more relevant technical skills."
            )

    else:

        suggestions.append(
            "Add technical skills such as Python, DSA, SQL, React, etc."
        )

    if score > 100:

        score = 100

    if not suggestions:

        suggestions.append(
            "Your resume has good basic information."
        )

        suggestions.append(
            "Consider adding projects and certifications."
        )

    if score >= 80:

        level = "Excellent"

    elif score >= 60:

        level = "Good"

    elif score >= 40:

        level = "Needs Improvement"

    else:

        level = "Weak"

    return {

        "ats_score": score,

        "level": level,

        "suggestions": suggestions

    }


# ============================================================
# COMPANY ROADMAP - GET COMPANIES
# ============================================================

@app.get("/companies")
def get_companies(
    db: Session = Depends(get_db)
):

    companies = db.query(
        CompanyRoadmap
    ).all()

    return [

        {
            "id": company.id,

            "company_name": company.company_name,

            "skills": company.skills,

            "dsa_topics": company.dsa_topics,

            "core_subjects": company.core_subjects,

            "difficulty": company.difficulty,

            "progress": company.progress
        }

        for company in companies

    ]


# ============================================================
# COMPANY ROADMAP - GET SINGLE COMPANY
# ============================================================

@app.get("/companies/{company_id}")
def get_company(
    company_id: int,
    db: Session = Depends(get_db)
):

    company = db.query(
        CompanyRoadmap
    ).filter(
        CompanyRoadmap.id == company_id
    ).first()

    if not company:

        raise HTTPException(
            status_code=404,
            detail="Company not found"
        )

    return {

        "id": company.id,

        "company_name": company.company_name,

        "skills": company.skills,

        "dsa_topics": company.dsa_topics,

        "core_subjects": company.core_subjects,

        "difficulty": company.difficulty,

        "progress": company.progress

    }


# ============================================================
# COMPANY ROADMAP - SEED COMPANIES
# ============================================================

@app.post("/companies/seed")
def seed_companies(
    db: Session = Depends(get_db)
):

    existing = db.query(
        CompanyRoadmap
    ).count()

    if existing > 0:

        return {
            "message": "Companies already exist"
        }

    companies = [

        CompanyRoadmap(
            company_name="Cisco",
            skills="Python, C++, Networking, Linux",
            dsa_topics="Arrays, Strings, Linked List, Trees, Graphs",
            core_subjects="DBMS, OS, Computer Networks",
            difficulty="Medium",
            progress=0
        ),

        CompanyRoadmap(
            company_name="TCS",
            skills="C++, Java, Python, SQL",
            dsa_topics="Arrays, Strings, Sorting, Searching",
            core_subjects="DBMS, OS, OOP",
            difficulty="Easy",
            progress=0
        ),

        CompanyRoadmap(
            company_name="Infosys",
            skills="Java, Python, SQL",
            dsa_topics="Arrays, Strings, Linked List, Recursion",
            core_subjects="DBMS, OS, OOP",
            difficulty="Easy",
            progress=0
        ),

        CompanyRoadmap(
            company_name="Amazon",
            skills="Python, Java, C++, SQL",
            dsa_topics="Arrays, Trees, Graphs, DP, Hashing",
            core_subjects="DBMS, OS, Networking, OOP",
            difficulty="Hard",
            progress=0
        ),

        CompanyRoadmap(
            company_name="Microsoft",
            skills="C++, Java, Python, SQL",
            dsa_topics="Arrays, Trees, Graphs, DP, Backtracking",
            core_subjects="OS, DBMS, Networking, OOP",
            difficulty="Hard",
            progress=0
        ),

        CompanyRoadmap(
            company_name="Google",
            skills="C++, Python, Java",
            dsa_topics="Arrays, Trees, Graphs, DP, Graph Algorithms",
            core_subjects="OS, DBMS, Networking, System Design",
            difficulty="Hard",
            progress=0
        )
    ]

    db.add_all(companies)

    db.commit()

    return {
        "message": "Company roadmap created successfully"
    }


# ============================================================
# UPDATE COMPANY PREPARATION PROGRESS
# ============================================================

@app.put("/companies/{company_id}/progress")
def update_company_progress(
    company_id: int,
    progress: int,
    db: Session = Depends(get_db),
    user_id: str = Depends(get_current_user)
):

    company = db.query(
        CompanyRoadmap
    ).filter(
        CompanyRoadmap.id == company_id
    ).first()

    if not company:

        raise HTTPException(
            status_code=404,
            detail="Company not found"
        )

    if progress < 0 or progress > 100:

        raise HTTPException(
            status_code=400,
            detail="Progress must be between 0 and 100"
        )

    company.progress = progress

    db.commit()

    db.refresh(company)

    return {

        "message": "Progress updated successfully",

        "company_id": company.id,

        "progress": company.progress

    }
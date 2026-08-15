from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

from .database import Base


# ============================================================
# USER MODEL
# ============================================================

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String, nullable=False)

    email = Column(String, unique=True, index=True, nullable=False)

    password = Column(String, nullable=False)

    # Questions
    questions = relationship(
        "Question",
        back_populates="user",
        cascade="all, delete-orphan"
    )

    # Answers
    answers = relationship(
        "Answer",
        back_populates="user",
        cascade="all, delete-orphan"
    )

    # Resume
    resume = relationship(
        "Resume",
        back_populates="user",
        uselist=False,
        cascade="all, delete-orphan"
    )


# ============================================================
# QUESTION MODEL
# ============================================================

class Question(Base):
    __tablename__ = "questions"

    id = Column(Integer, primary_key=True, index=True)

    question = Column(String, nullable=False)

    category = Column(String, nullable=True)

    difficulty = Column(String, nullable=True)

    status = Column(String, nullable=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )

    # Relationship with User
    user = relationship(
        "User",
        back_populates="questions"
    )

    # Relationship with Answers
    answers = relationship(
        "Answer",
        back_populates="question",
        cascade="all, delete-orphan"
    )


# ============================================================
# ANSWER MODEL
# ============================================================

class Answer(Base):
    __tablename__ = "answers"

    id = Column(Integer, primary_key=True, index=True)

    answer = Column(String, nullable=False)

    question_id = Column(
        Integer,
        ForeignKey("questions.id"),
        nullable=False
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )

    # Relationship with Question
    question = relationship(
        "Question",
        back_populates="answers"
    )

    # Relationship with User
    user = relationship(
        "User",
        back_populates="answers"
    )


# ============================================================
# RESUME MODEL
# ============================================================

class Resume(Base):
    __tablename__ = "resumes"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    name = Column(
        String,
        nullable=False
    )

    email = Column(
        String,
        nullable=False
    )

    college = Column(
        String,
        nullable=False
    )

    skills = Column(
        String,
        nullable=False
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        unique=True,
        nullable=False
    )

    # Relationship with User
    user = relationship(
        "User",
        back_populates="resume"
    )
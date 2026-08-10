from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

from .database import Base


# ============================================
# User Model
# ============================================

class User(Base):
    __tablename__ = "users"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    name = Column(
        String,
        index=True
    )

    email = Column(
        String,
        unique=True,
        index=True
    )

    password = Column(
        String
    )


# ============================================
# Question Model
# ============================================

class Question(Base):
    __tablename__ = "questions"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    question = Column(
        String,
        nullable=False
    )

    category = Column(
        String,
        nullable=False
    )

    user_id = Column(
        Integer,
        nullable=False
    )

    answers = relationship(
        "Answer",
        back_populates="question"
    )


# ============================================
# Answer Model
# ============================================

class Answer(Base):
    __tablename__ = "answers"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    answer = Column(
        String,
        nullable=False
    )

    question_id = Column(
        Integer,
        ForeignKey("questions.id"),
        nullable=False
    )

    user_id = Column(
        Integer,
        nullable=False
    )

    question = relationship(
        "Question",
        back_populates="answers"
    )
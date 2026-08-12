from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

from .database import Base


# ============================================
# USER
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
# QUESTION
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

    # ========================================
    # DAY 24
    # Difficulty of this specific question
    # ========================================

    difficulty = Column(
        String,
        nullable=False,
        default="Easy"
    )

    # ========================================
    # DAY 24
    # Status of this specific question
    # ========================================

    status = Column(
        String,
        nullable=False,
        default="Not Started"
    )

    # ========================================
    # USER
    # ========================================

    user_id = Column(
        Integer,
        nullable=False
    )

    # ========================================
    # ANSWERS
    # ========================================

    answers = relationship(
        "Answer",
        back_populates="question",
        cascade="all, delete-orphan"
    )


# ============================================
# ANSWER
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
        ForeignKey(
            "questions.id",
            ondelete="CASCADE"
        ),
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
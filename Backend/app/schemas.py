from pydantic import BaseModel


class UserCreate(BaseModel):
    name: str
    email: str
    password: str

class QuestionCreate(BaseModel):
    question: str
    category: str
class AnswerCreate(BaseModel):
    answer: str
    question_id: int
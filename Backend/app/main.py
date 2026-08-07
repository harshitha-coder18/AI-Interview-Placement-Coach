from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session

from .database import Base, engine, SessionLocal
from .models import User
from .schemas import UserCreate
from .auth import hash_password, verify_password
from .security import create_access_token
from .dependencies import get_current_user


Base.metadata.create_all(bind=engine)

app = FastAPI()


# Database connection
def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()


# Home
@app.get("/")
def home():
    return {
        "message": "Welcome to AI Interview Placement Coach Backend 🚀"
    }


# Register
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


# Login
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


# Protected Profile
@app.get("/profile")
def profile(
    user_id: str = Depends(get_current_user)
):

    return {
        "message": "You accessed a protected route!",
        "user_id": user_id
    }
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def home():
    return {
        "message": "Welcome to AI Interview Placement Coach Backend 🚀"
    }
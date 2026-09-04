import os
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from sqlalchemy.orm import Session
from .database import engine, get_db, Base
from .models import UserModel, ProblemModel, TestCaseModel, SubmissionModel, CodingTestModel
from .sandbox import run_in_sandbox

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Khmer Code Test API",
    description="Backend API for Cambodian coding test and learning platform",
    version="1.0.0"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Schemas
class UserCreate(BaseModel):
    name: str
    khmer_name: str
    email: str
    password: str
    role: Optional[str] = "student"

class CodeRunRequest(BaseModel):
    code: str
    language: str
    problem_id: str
    user_id: str

@app.get("/")
def read_root():
    return {
        "status": "online",
        "service": "Khmer Code Test Backend API",
        "languages": ["Python 3.11+", "C++17"],
        "sandbox": "Docker Isolated Sandbox"
    }

@app.get("/api/problems")
def get_problems(language: Optional[str] = None, difficulty: Optional[str] = None, db: Session = Depends(get_db)):
    query = db.query(ProblemModel)
    if language:
        query = query.filter(ProblemModel.language == language)
    if difficulty:
        query = query.filter(ProblemModel.difficulty == difficulty)
    return query.all()

@app.get("/api/problems/{problem_id}")
def get_problem(problem_id: str, db: Session = Depends(get_db)):
    prob = db.query(ProblemModel).filter(ProblemModel.id == problem_id).first()
    if not prob:
        raise HTTPException(status_code=404, detail="Problem not found")
    return prob

@app.post("/api/submissions/run")
def run_code_submission(req: CodeRunRequest, db: Session = Depends(get_db)):
    prob = db.query(ProblemModel).filter(ProblemModel.id == req.problem_id).first()
    if not prob:
        raise HTTPException(status_code=404, detail="Problem not found")

    test_cases = db.query(TestCaseModel).filter(TestCaseModel.problem_id == req.problem_id).all()
    results = []
    all_passed = True
    first_failing_status = "accepted"

    for tc in test_cases:
        res = run_in_sandbox(
            code=req.code,
            language=req.language,
            input_str=tc.input_data,
            time_limit_sec=prob.time_limit_ms / 1000.0,
            memory_limit_mb=prob.memory_limit_mb
        )

        passed = False
        if res["status"] == "success":
            actual_clean = res["stdout"].strip().replace("\r\n", "\n")
            expected_clean = tc.expected_output.strip().replace("\r\n", "\n")
            passed = (actual_clean == expected_clean)
            if not passed:
                all_passed = False
                if first_failing_status == "accepted":
                    first_failing_status = "wrong_answer"
        else:
            all_passed = False
            if first_failing_status == "accepted":
                first_failing_status = res["status"]

        results.append({
            "test_case_id": tc.id,
            "passed": passed,
            "is_hidden": tc.is_hidden,
            "execution_time_ms": res["execution_time_ms"],
            "memory_mb": res["memory_mb"],
            "actual_output": "" if tc.is_hidden else res["stdout"],
            "status": "accepted" if passed else (res["status"] if res["status"] != "success" else "wrong_answer")
        })

    final_status = "accepted" if all_passed else first_failing_status
    passed_count = sum(1 for r in results if r["passed"])

    return {
        "status": final_status,
        "tests_passed": passed_count,
        "total_tests": len(test_cases),
        "results": results
    }

@app.get("/api/tests")
def list_tests(db: Session = Depends(get_db)):
    return db.query(CodingTestModel).all()

@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "sandbox_docker": "active",
        "cpu_limit": "1.0",
        "memory_limit": "64MB"
    }

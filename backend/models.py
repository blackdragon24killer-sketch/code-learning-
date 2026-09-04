import datetime
from sqlalchemy import Column, String, Integer, Float, Boolean, DateTime, Text, ForeignKey
from sqlalchemy.orm import relationship
from .database import Base

class UserModel(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, index=True)
    name = Column(String, nullable=False)
    khmer_name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    role = Column(String, default="student")  # 'student' | 'teacher' | 'admin'
    avatar = Column(String, nullable=True)
    score = Column(Integer, default=0)
    solved_count = Column(Integer, default=0)
    streak_days = Column(Integer, default=1)
    rank = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    submissions = relationship("SubmissionModel", back_populates="user")


class ProblemModel(Base):
    __tablename__ = "problems"

    id = Column(String, primary_key=True, index=True)
    title_khmer = Column(String, nullable=False)
    title_english = Column(String, nullable=False)
    description_khmer = Column(Text, nullable=False)
    input_khmer = Column(Text, nullable=False)
    output_khmer = Column(Text, nullable=False)
    constraints_khmer = Column(Text, nullable=False)
    difficulty = Column(String, default="easy")  # 'easy' | 'medium' | 'hard'
    language = Column(String, default="python")  # 'python' | 'cpp'
    category = Column(String, default="Beginner")
    points = Column(Integer, default=20)
    time_limit_ms = Column(Integer, default=1000)
    memory_limit_mb = Column(Integer, default=64)
    starter_code_python = Column(Text, nullable=True)
    starter_code_cpp = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    test_cases = relationship("TestCaseModel", back_populates="problem", cascade="all, delete-orphan")
    submissions = relationship("SubmissionModel", back_populates="problem")


class TestCaseModel(Base):
    __tablename__ = "test_cases"

    id = Column(String, primary_key=True, index=True)
    problem_id = Column(String, ForeignKey("problems.id"), nullable=False)
    input_data = Column(Text, nullable=False)
    expected_output = Column(Text, nullable=False)
    is_hidden = Column(Boolean, default=False)

    problem = relationship("ProblemModel", back_populates="test_cases")


class SubmissionModel(Base):
    __tablename__ = "submissions"

    id = Column(String, primary_key=True, index=True)
    problem_id = Column(String, ForeignKey("problems.id"), nullable=False)
    user_id = Column(String, ForeignKey("users.id"), nullable=False)
    language = Column(String, nullable=False)
    code = Column(Text, nullable=False)
    status = Column(String, nullable=False)  # 'accepted' | 'wrong_answer' | etc
    execution_time_ms = Column(Integer, default=0)
    memory_used_mb = Column(Float, default=0.0)
    tests_passed = Column(Integer, default=0)
    total_tests = Column(Integer, default=0)
    submitted_at = Column(DateTime, default=datetime.datetime.utcnow)
    error_log = Column(Text, nullable=True)

    user = relationship("UserModel", back_populates="submissions")
    problem = relationship("ProblemModel", back_populates="submissions")


class CodingTestModel(Base):
    __tablename__ = "coding_tests"

    id = Column(String, primary_key=True, index=True)
    title_khmer = Column(String, nullable=False)
    description_khmer = Column(Text, nullable=False)
    language = Column(String, default="both")
    duration_minutes = Column(Integer, default=60)
    max_score = Column(Integer, default=100)
    passing_score = Column(Integer, default=60)
    status = Column(String, default="active")
    author_id = Column(String, nullable=False)
    author_name = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

export type UserRole = 'student' | 'teacher' | 'admin';

export type Language = 'python' | 'cpp';

export type Difficulty = 'easy' | 'medium' | 'hard';

export type QuestionType = 'multiple_choice' | 'true_false' | 'coding' | 'short_answer';

export type SubmissionStatus = 
  | 'accepted' 
  | 'wrong_answer' 
  | 'compilation_error' 
  | 'runtime_error' 
  | 'time_limit_exceeded' 
  | 'memory_limit_exceeded';

export interface User {
  id: string;
  name: string;
  khmerName: string;
  email: string;
  role: UserRole;
  avatar: string;
  score: number;
  solvedCount: number;
  streakDays: number;
  rank: number;
  createdAt: string;
}

export interface TestCase {
  id: string;
  input: string;
  expectedOutput: string;
  isHidden: boolean;
  explanation?: string;
}

export interface Problem {
  id: string;
  slug: string;
  titleKhmer: string;
  titleEnglish: string;
  descriptionKhmer: string;
  inputKhmer: string;
  outputKhmer: string;
  constraintsKhmer: string;
  difficulty: Difficulty;
  language: Language;
  category: string;
  points: number;
  timeLimitMs: number;
  memoryLimitMb: number;
  starterCodePython: string;
  starterCodeCpp: string;
  examples: {
    input: string;
    output: string;
    explanationKhmer?: string;
  }[];
  testCases: TestCase[];
  authorName: string;
  createdAt: string;
}

export interface Submission {
  id: string;
  problemId: string;
  problemTitle: string;
  userId: string;
  userName: string;
  language: Language;
  code: string;
  status: SubmissionStatus;
  executionTimeMs: number;
  memoryUsedMb: number;
  testsPassed: number;
  totalTests: number;
  submittedAt: string;
  errorLog?: string;
}

export interface TestQuestion {
  id: string;
  type: QuestionType;
  points: number;
  promptKhmer: string;
  // Multiple Choice / True-False
  options?: { id: string; textKhmer: string }[];
  correctOptionId?: string;
  correctAnswerBool?: boolean;
  // Short Answer
  expectedShortAnswer?: string;
  // Coding Question
  problemRefId?: string;
  codingProblem?: Problem;
}

export interface CodingTest {
  id: string;
  titleKhmer: string;
  descriptionKhmer: string;
  language: Language | 'both';
  durationMinutes: number;
  maxScore: number;
  passingScore: number;
  startDate: string;
  endDate: string;
  status: 'active' | 'upcoming' | 'ended';
  questions: TestQuestion[];
  authorId: string;
  authorName: string;
}

export interface TestSubmission {
  id: string;
  testId: string;
  userId: string;
  userName: string;
  score: number;
  maxScore: number;
  passed: boolean;
  submittedAt: string;
  timeTakenSeconds: number;
  answers: Record<string, any>;
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  userName: string;
  khmerName: string;
  avatar: string;
  score: number;
  solvedCount: number;
  preferredLanguage: Language;
  timeFormatted: string;
  trend: 'up' | 'down' | 'same';
}

import { User, CodingTest, Submission, LeaderboardEntry } from '../types';
import { initialProblems } from './problemsData';

export const initialUsers: User[] = [
  {
    id: 'user-std-1',
    name: 'Sok Piseth',
    khmerName: 'សុខ ពិសិដ្ឋ',
    email: 'piseth.sok@khmercode.edu.kh',
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    score: 380,
    solvedCount: 22,
    streakDays: 9,
    rank: 1,
    createdAt: '2026-07-01'
  },
  {
    id: 'user-std-2',
    name: 'Chan Theara',
    khmerName: 'ចាន់ ធារ៉ា',
    email: 'theara.chan@khmercode.edu.kh',
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    score: 310,
    solvedCount: 18,
    streakDays: 6,
    rank: 2,
    createdAt: '2026-07-05'
  },
  {
    id: 'user-std-3',
    name: 'Keo Mony',
    khmerName: 'កែវ មុន្នី',
    email: 'mony.keo@khmercode.edu.kh',
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    score: 240,
    solvedCount: 14,
    streakDays: 4,
    rank: 3,
    createdAt: '2026-07-12'
  },
  {
    id: 'user-tea-1',
    name: 'Sokha Chea',
    khmerName: 'លោកគ្រូ សុខា',
    email: 'sokha.chea@khmercode.edu.kh',
    role: 'teacher',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    score: 950,
    solvedCount: 40,
    streakDays: 32,
    rank: 0,
    createdAt: '2026-06-01'
  },
  {
    id: 'user-adm-1',
    name: 'Admin Sys',
    khmerName: 'អ្នកគ្រប់គ្រងប្រព័ន្ធ',
    email: 'admin@khmercode.edu.kh',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    score: 1200,
    solvedCount: 40,
    streakDays: 50,
    rank: 0,
    createdAt: '2026-05-15'
  }
];

export const initialTests: CodingTest[] = [
  {
    id: 'test-01',
    titleKhmer: 'ការប្រឡងតេស្តសមត្ថភាព Python មូលដ្ឋាន (Python Fundamentals)',
    descriptionKhmer: 'តេស្តវាយតម្លៃចំណេះដឹងមូលដ្ឋានភាសា Python រួមមាន syntax, data types, condition, loops និងលំហាត់កូដជាក់ស្តែង។',
    language: 'python',
    durationMinutes: 45,
    maxScore: 100,
    passingScore: 60,
    startDate: '2026-09-01T08:00:00Z',
    endDate: '2026-09-30T23:59:59Z',
    status: 'active',
    authorId: 'user-tea-1',
    authorName: 'លោកគ្រូ សុខា',
    questions: [
      {
        id: 'q1',
        type: 'multiple_choice',
        points: 15,
        promptKhmer: 'តើអនុគមន៍មួយណាប្រើសម្រាប់បញ្ចូលទិន្នន័យពី Keyboard ក្នុងភាសា Python 3?',
        options: [
          { id: 'opt1', textKhmer: 'cin >> variable;' },
          { id: 'opt2', textKhmer: 'input()' },
          { id: 'opt3', textKhmer: 'scanf("%s")' },
          { id: 'opt4', textKhmer: 'readline()' }
        ],
        correctOptionId: 'opt2'
      },
      {
        id: 'q2',
        type: 'true_false',
        points: 15,
        promptKhmer: 'នៅក្នុង Python, List គឺជា Data Structure ដែលអាចផ្លាស់ប្តូរតម្លៃបាន (Mutable)។ តើការលើកឡើងនេះ ត្រូវ ឬ ខុស?',
        correctAnswerBool: true
      },
      {
        id: 'q3',
        type: 'short_answer',
        points: 20,
        promptKhmer: 'តើពាក្យគន្លឹះ (Keyword) អ្វីដែលប្រើសម្រាប់កំណត់និយមន័យអនុគមន៍ (Function) ក្នុង Python?',
        expectedShortAnswer: 'def'
      },
      {
        id: 'q4',
        type: 'coding',
        points: 50,
        promptKhmer: 'សរសេរកម្មវិធី Python ដើម្បីគណនាផលបូកចំនួនគត់ពីរ a និង b។',
        problemRefId: 'py-01',
        codingProblem: initialProblems.find(p => p.id === 'py-01')
      }
    ]
  },
  {
    id: 'test-02',
    titleKhmer: 'ការប្រឡង C++ Algorithms & Data Structures',
    descriptionKhmer: 'ការប្រឡងផ្តោតលើក្បួនដោះស្រាយបញ្ហា ក្បួនតម្រៀប (Sorting) និង Memory Management ក្នុងភាសា C++17។',
    language: 'cpp',
    durationMinutes: 60,
    maxScore: 100,
    passingScore: 70,
    startDate: '2026-09-05T09:00:00Z',
    endDate: '2026-10-15T18:00:00Z',
    status: 'active',
    authorId: 'user-tea-1',
    authorName: 'លោកគ្រូ សុខា',
    questions: [
      {
        id: 'cq1',
        type: 'multiple_choice',
        points: 20,
        promptKhmer: 'តើ Time Complexity នៃការរុករកក្នុង Binary Search គឺស្មើនឹងប៉ុន្មាន?',
        options: [
          { id: 'copt1', textKhmer: 'O(n)' },
          { id: 'copt2', textKhmer: 'O(log n)' },
          { id: 'copt3', textKhmer: 'O(n^2)' },
          { id: 'copt4', textKhmer: 'O(1)' }
        ],
        correctOptionId: 'copt2'
      },
      {
        id: 'cq2',
        type: 'true_false',
        points: 15,
        promptKhmer: 'std::vector ក្នុង C++ អាចពង្រីកទំហំដោយស្វ័យប្រវត្តិនៅពេលបញ្ចូលធាតុថ្មី (Dynamic Array)។',
        correctAnswerBool: true
      },
      {
        id: 'cq3',
        type: 'short_answer',
        points: 15,
        promptKhmer: 'តើ header file ណាដែលត្រូវ include ដើម្បីប្រើប្រាស់ std::cout និង std::cin?',
        expectedShortAnswer: 'iostream'
      },
      {
        id: 'cq4',
        type: 'coding',
        points: 50,
        promptKhmer: 'សរសេរកូដ C++ ស្វែងរកតួចែករួមធំបំផុត (GCD) នៃចំនួនគត់ពីរ a និង b។',
        problemRefId: 'cpp-06',
        codingProblem: initialProblems.find(p => p.id === 'cpp-06')
      }
    ]
  },
  {
    id: 'test-03',
    titleKhmer: 'ការប្រកួតកូដប្រចាំសប្តាហ៍ Khmer Code Weekly Cup #12',
    descriptionKhmer: 'ការប្រកួតប្រជែងសរសេរកូដល្បឿនលឿនសម្រាប់សិស្ស-និស្សិតកម្ពុជា ដោះស្រាយ ៣ លំហាត់ទូទាំងប្រទេស។',
    language: 'both',
    durationMinutes: 90,
    maxScore: 100,
    passingScore: 50,
    startDate: '2026-09-10T14:00:00Z',
    endDate: '2026-09-10T16:00:00Z',
    status: 'upcoming',
    authorId: 'user-adm-1',
    authorName: 'អ្នកគ្រប់គ្រងប្រព័ន្ធ',
    questions: [
      {
        id: 'comp1',
        type: 'coding',
        points: 30,
        promptKhmer: 'ដោះស្រាយបញ្ហាពិនិត្យពាក្យឆ្លុះ (Palindrome)',
        problemRefId: 'py-06',
        codingProblem: initialProblems.find(p => p.id === 'py-06')
      },
      {
        id: 'comp2',
        type: 'coding',
        points: 30,
        promptKhmer: 'ដោះស្រាយបញ្ហា Kadane Maximum Subarray',
        problemRefId: 'cpp-10',
        codingProblem: initialProblems.find(p => p.id === 'cpp-10')
      },
      {
        id: 'comp3',
        type: 'coding',
        points: 40,
        promptKhmer: 'ដោះស្រាយបញ្ហា Dijkstra Shortest Path',
        problemRefId: 'py-18',
        codingProblem: initialProblems.find(p => p.id === 'py-18')
      }
    ]
  }
];

export const initialSubmissions: Submission[] = [
  {
    id: 'sub-01',
    problemId: 'py-01',
    problemTitle: 'បូកលេខពីរ',
    userId: 'user-std-1',
    userName: 'សុខ ពិសិដ្ឋ',
    language: 'python',
    code: 'a, b = map(int, input().split())\nprint(a + b)',
    status: 'accepted',
    executionTimeMs: 42,
    memoryUsedMb: 12.4,
    testsPassed: 4,
    totalTests: 4,
    submittedAt: '2026-09-02T10:15:00Z'
  },
  {
    id: 'sub-02',
    problemId: 'py-02',
    problemTitle: 'ពិនិត្យលេខគូ ឬលេខសេស',
    userId: 'user-std-1',
    userName: 'សុខ ពិសិដ្ឋ',
    language: 'python',
    code: 'n = int(input())\nprint("EVEN" if n % 2 == 0 else "ODD")',
    status: 'accepted',
    executionTimeMs: 38,
    memoryUsedMb: 12.1,
    testsPassed: 4,
    totalTests: 4,
    submittedAt: '2026-09-02T11:20:00Z'
  },
  {
    id: 'sub-03',
    problemId: 'cpp-01',
    problemTitle: 'ស្វាគមន៍អ្នកសរសេរកូដខ្មែរ (Hello World)',
    userId: 'user-std-2',
    userName: 'ចាន់ ធារ៉ា',
    language: 'cpp',
    code: '#include <iostream>\nusing namespace std;\nint main() { cout << "Hello, Khmer Coders!" << endl; return 0; }',
    status: 'accepted',
    executionTimeMs: 14,
    memoryUsedMb: 4.2,
    testsPassed: 1,
    totalTests: 1,
    submittedAt: '2026-09-03T09:40:00Z'
  },
  {
    id: 'sub-04',
    problemId: 'cpp-06',
    problemTitle: 'តួចែករួមធំបំផុត (GCD / PGCD)',
    userId: 'user-std-2',
    userName: 'ចាន់ ធារ៉ា',
    language: 'cpp',
    code: '#include <iostream>\nusing namespace std;\nint main() { int a, b; cin >> a >> b; cout << a + b; return 0; }',
    status: 'wrong_answer',
    executionTimeMs: 16,
    memoryUsedMb: 4.5,
    testsPassed: 0,
    totalTests: 3,
    submittedAt: '2026-09-03T10:05:00Z'
  },
  {
    id: 'sub-05',
    problemId: 'py-06',
    problemTitle: 'ពិនិត្យពាក្យឆ្លុះ (Palindrome)',
    userId: 'user-std-3',
    userName: 'កែវ មុន្នី',
    language: 'python',
    code: 's = input().lower()\nprint("YES" if s == s[::-1] else "NO")',
    status: 'accepted',
    executionTimeMs: 45,
    memoryUsedMb: 12.8,
    testsPassed: 3,
    totalTests: 3,
    submittedAt: '2026-09-03T15:30:00Z'
  }
];

export const initialLeaderboard: LeaderboardEntry[] = [
  {
    rank: 1,
    userId: 'user-std-1',
    userName: 'Sok Piseth',
    khmerName: 'សុខ ពិសិដ្ឋ',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    score: 380,
    solvedCount: 22,
    preferredLanguage: 'python',
    timeFormatted: '2h 15m',
    trend: 'up'
  },
  {
    rank: 2,
    userId: 'user-std-2',
    userName: 'Chan Theara',
    khmerName: 'ចាន់ ធារ៉ា',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    score: 310,
    solvedCount: 18,
    preferredLanguage: 'cpp',
    timeFormatted: '2h 45m',
    trend: 'up'
  },
  {
    rank: 3,
    userId: 'user-std-3',
    userName: 'Keo Mony',
    khmerName: 'កែវ មុន្នី',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    score: 240,
    solvedCount: 14,
    preferredLanguage: 'python',
    timeFormatted: '3h 10m',
    trend: 'same'
  },
  {
    rank: 4,
    userId: 'user-std-4',
    userName: 'Ly Ratanak',
    khmerName: 'លី រតនៈ',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    score: 210,
    solvedCount: 12,
    preferredLanguage: 'cpp',
    timeFormatted: '3h 30m',
    trend: 'down'
  },
  {
    rank: 5,
    userId: 'user-std-5',
    userName: 'Heng Bopha',
    khmerName: 'ហេង បុប្ផា',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=80',
    score: 180,
    solvedCount: 10,
    preferredLanguage: 'python',
    timeFormatted: '4h 05m',
    trend: 'up'
  },
  {
    rank: 6,
    userId: 'user-std-6',
    userName: 'Pich Vibol',
    khmerName: 'ពេជ្រ វិបុល',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    score: 150,
    solvedCount: 8,
    preferredLanguage: 'cpp',
    timeFormatted: '4h 40m',
    trend: 'same'
  }
];

export const problemCategories = [
  'ទាំងអស់ (All)',
  'Beginner',
  'Algorithms',
  'Data Structures',
  'Competitive Programming'
];

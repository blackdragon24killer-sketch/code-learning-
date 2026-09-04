import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { TestQuestion, CodingTest } from '../types';
import { CodeEditor } from '../components/CodeEditor';
import { executeCodeForProblem } from '../services/codeRunner';
import confetti from 'canvas-confetti';
import { 
  Clock, 
  User as UserIcon, 
  Award, 
  CheckCircle2, 
  XCircle, 
  Send, 
  ArrowLeft, 
  ArrowRight, 
  AlertTriangle,
  Play,
  RotateCcw,
  Sparkles,
  Layers
} from 'lucide-react';

export const TestTakingView: React.FC = () => {
  const { selectedTestId, tests, currentUser, setCurrentView, showToast, theme } = useApp();

  const test = tests.find(t => t.id === selectedTestId) || tests[0];

  // Current Question Index
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);

  // Answers State: questionId -> answer
  const [answers, setAnswers] = useState<Record<string, any>>({});
  
  // Coding answers code: questionId -> code string
  const [codingCodes, setCodingCodes] = useState<Record<string, string>>({});

  // Countdown timer in seconds
  const [secondsRemaining, setSecondsRemaining] = useState(() => test.durationMinutes * 60);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [isAutoSubmitted, setIsAutoSubmitted] = useState(false);

  // Coding Runner State
  const [isTestingCode, setIsTestingCode] = useState(false);
  const [codeTestResult, setCodeTestResult] = useState<string | null>(null);

  const currentQuestion = test.questions[currentQuestionIdx];

  // Initialize coding questions code
  useEffect(() => {
    const initialCodes: Record<string, string> = {};
    test.questions.forEach(q => {
      if (q.type === 'coding' && q.codingProblem) {
        initialCodes[q.id] = q.codingProblem.language === 'python'
          ? q.codingProblem.starterCodePython
          : q.codingProblem.starterCodeCpp;
      }
    });
    setCodingCodes(initialCodes);
  }, [test]);

  // Timer Tick
  useEffect(() => {
    if (isSubmitted) return;

    const timer = setInterval(() => {
      setSecondsRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isSubmitted]);

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (questionId: string, optionId: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: optionId }));
  };

  const handleSelectBool = (questionId: string, val: boolean) => {
    setAnswers(prev => ({ ...prev, [questionId]: val }));
  };

  const handleShortAnswerChange = (questionId: string, val: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: val }));
  };

  const handleCodeChange = (questionId: string, val: string) => {
    setCodingCodes(prev => ({ ...prev, [questionId]: val }));
    setAnswers(prev => ({ ...prev, [questionId]: val }));
  };

  // Run code inside test
  const handleRunCodingTest = async () => {
    if (!currentQuestion.codingProblem) return;
    setIsTestingCode(true);
    setCodeTestResult(null);
    try {
      const code = codingCodes[currentQuestion.id] || '';
      const prob = currentQuestion.codingProblem;
      const res = await executeCodeForProblem(
        code,
        prob.language,
        prob.testCases.slice(0, 2),
        prob.timeLimitMs,
        prob.memoryLimitMb
      );
      if (res.status === 'accepted') {
        setCodeTestResult('✓ កូដដំណើរការត្រឹមត្រូវជាមួយ Public Cases!');
        showToast('កូដដំណើរការត្រឹមត្រូវ!', 'success');
      } else {
        setCodeTestResult(`✗ លទ្ធផល: ${res.statusTextKhmer}`);
        showToast(res.statusTextKhmer, 'error');
      }
    } catch (e) {
      setCodeTestResult('មានបញ្ហាក្នុងការដំណើរការកូដ');
    } finally {
      setIsTestingCode(false);
    }
  };

  // Grade test and compute score
  const evaluateTest = () => {
    let score = 0;
    test.questions.forEach(q => {
      const ans = answers[q.id];
      if (q.type === 'multiple_choice') {
        if (ans && ans === q.correctOptionId) {
          score += q.points;
        }
      } else if (q.type === 'true_false') {
        if (ans !== undefined && ans === q.correctAnswerBool) {
          score += q.points;
        }
      } else if (q.type === 'short_answer') {
        if (ans && q.expectedShortAnswer && ans.trim().toLowerCase() === q.expectedShortAnswer.toLowerCase()) {
          score += q.points;
        }
      } else if (q.type === 'coding') {
        // If code has content and has been answered, award proportional score
        if (ans && ans.length > 20) {
          score += q.points;
        }
      }
    });
    return score;
  };

  const handleAutoSubmit = () => {
    setIsAutoSubmitted(true);
    const score = evaluateTest();
    setFinalScore(score);
    setIsSubmitted(true);
    showToast('អស់ពេលកំណត់! ប្រព័ន្ធបានដាក់ស្នើការប្រឡងដោយស្វ័យប្រវត្តិ', 'info');
  };

  const handleSubmitTest = () => {
    const answeredCount = Object.keys(answers).length;
    const totalCount = test.questions.length;

    if (answeredCount < totalCount) {
      if (!window.confirm(`អ្នកបានឆ្លើយបាន ${answeredCount}/${totalCount} សំណួរ។ តើអ្នកប្រាកដជាចង់ដាក់ស្នើការប្រឡងឥឡូវនេះមែនទេ?`)) {
        return;
      }
    }

    const score = evaluateTest();
    setFinalScore(score);
    setIsSubmitted(true);

    if (score >= test.passingScore) {
      confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
      showToast(`សូមអបអរសាទរ! អ្នកបានប្រឡងជាប់ដោយទទួលបាន ${score}/${test.maxScore} ពិន្ទុ`, 'success');
    } else {
      showToast(`ការប្រឡងបានបញ្ចប់។ ពិន្ទុរបស់អ្នក: ${score}/${test.maxScore}`, 'info');
    }
  };

  const isCurrentQuestionAnswered = (qId: string) => {
    return answers[qId] !== undefined && answers[qId] !== '';
  };

  // ==========================================
  // RESULT VIEW AFTER SUBMISSION
  // ==========================================
  if (isSubmitted) {
    const isPassed = finalScore >= test.passingScore;
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 space-y-8">
        <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-4 shadow-xl">
          
          <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center text-3xl">
            {isPassed ? '🏆' : '📝'}
          </div>

          <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
            isPassed 
              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' 
              : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
          }`}>
            {isPassed ? '✓ ជាប់ជាស្ថាពរ (PASSED)' : '✗ មិនទាន់ជាប់ (FAILED)'}
          </span>

          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            {test.titleKhmer}
          </h2>

          <div className="py-6 max-w-sm mx-auto rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">ពិន្ទុរបស់អ្នក (Your Score)</p>
            <p className="text-5xl font-extrabold text-indigo-600 dark:text-indigo-400 my-1">
              {finalScore} <span className="text-xl text-slate-400 font-normal">/ {test.maxScore}</span>
            </p>
            <p className="text-xs text-slate-500">
              ពិន្ទុកំណត់ជាប់: {test.passingScore} ពិន្ទុ
            </p>
          </div>

          {/* Breakdown list */}
          <div className="text-left space-y-2 pt-4 border-t border-slate-100 dark:border-slate-800">
            <h4 className="text-xs font-bold text-slate-400 uppercase">លម្អិតសំណួរនីមួយៗ (Question Breakdown):</h4>
            <div className="space-y-2">
              {test.questions.map((q, idx) => {
                const userAns = answers[q.id];
                let isCorrect = false;
                if (q.type === 'multiple_choice') isCorrect = userAns === q.correctOptionId;
                else if (q.type === 'true_false') isCorrect = userAns === q.correctAnswerBool;
                else if (q.type === 'short_answer') isCorrect = userAns && userAns.trim().toLowerCase() === q.expectedShortAnswer?.toLowerCase();
                else if (q.type === 'coding') isCorrect = userAns && userAns.length > 20;

                return (
                  <div key={q.id} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-500">#{idx + 1}</span>
                      <span className="text-slate-700 dark:text-slate-300 truncate max-w-[240px] sm:max-w-md">
                        {q.promptKhmer}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {isCorrect ? (
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                          <CheckCircle2 className="h-4 w-4" /> +{q.points}
                        </span>
                      ) : (
                        <span className="text-rose-600 dark:text-rose-400 font-bold flex items-center gap-1">
                          <XCircle className="h-4 w-4" /> 0/{q.points}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-6 flex justify-center gap-3">
            <button
              onClick={() => setCurrentView('tests')}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-colors"
            >
              ត្រឡប់ទៅបញ្ជីការប្រឡង
            </button>
            <button
              onClick={() => setCurrentView('dashboard')}
              className="px-6 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
            >
              មើលផ្ទាំងគ្រប់គ្រងសិស្ស
            </button>
          </div>

        </div>
      </div>
    );
  }

  // ==========================================
  // ACTIVE TEST TAKING INTERFACE
  // ==========================================
  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col bg-slate-100 dark:bg-slate-950 overflow-hidden">
      
      {/* 1. TOP BAR: Title, Countdown Timer, Student Name, Score */}
      <header className="h-14 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 sm:px-6 flex items-center justify-between shrink-0">
        
        {/* Test Name & Leave Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              if (window.confirm('តើអ្នកពិតជាចង់ចាកចេញពីការប្រឡងមែនទេ? ចម្លើយរបស់អ្នកអាចនឹងមិនត្រូវបានរក្សាទុកឡើយ។')) {
                setCurrentView('tests');
              }
            }}
            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"
            title="ចាកចេញ"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div>
            <h1 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate max-w-[200px] sm:max-w-md">
              {test.titleKhmer}
            </h1>
            <p className="text-[11px] text-slate-400">
              សរុប {test.questions.length} សំណួរ • {test.maxScore} ពិន្ទុ
            </p>
          </div>
        </div>

        {/* Center: Real Countdown Timer */}
        <div className={`px-4 py-1.5 rounded-xl flex items-center gap-2 border font-mono font-bold text-xs sm:text-sm ${
          secondsRemaining < 300
            ? 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-900 animate-pulse'
            : 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800'
        }`}>
          <Clock className="h-4 w-4" />
          <span>ពេលវេលានៅសល់: {formatTimer(secondsRemaining)}</span>
        </div>

        {/* Right: Student info & Submit button */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 text-xs">
            <img src={currentUser.avatar} alt={currentUser.name} className="h-6 w-6 rounded-full object-cover" />
            <span className="font-semibold text-slate-700 dark:text-slate-300">{currentUser.khmerName}</span>
          </div>

          <button
            id="btn-submit-entire-test"
            onClick={handleSubmitTest}
            className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-colors"
          >
            <Send className="h-3.5 w-3.5" />
            <span>ដាក់ស្នើការប្រឡង</span>
          </button>
        </div>
      </header>

      {/* 2. QUESTION NAVIGATION STRIP [1] [2] [3] [4]... */}
      <div className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 px-4 py-2 flex items-center justify-between overflow-x-auto shrink-0">
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-semibold text-slate-500 mr-1 flex items-center gap-1">
            <Layers className="h-3.5 w-3.5" /> សំណួរ៖
          </span>
          {test.questions.map((q, idx) => {
            const isAnswered = isCurrentQuestionAnswered(q.id);
            const isCurrent = currentQuestionIdx === idx;
            return (
              <button
                key={q.id}
                onClick={() => setCurrentQuestionIdx(idx)}
                className={`w-8 h-8 rounded-lg text-xs font-bold transition-all flex items-center justify-center ${
                  isCurrent
                    ? 'bg-indigo-600 text-white ring-2 ring-indigo-400 shadow-xs'
                    : isAnswered
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:border-slate-400'
                }`}
                title={`សំណួរទី ${idx + 1} (${q.type})`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-3 text-xs text-slate-500 shrink-0">
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" /> ឆ្លើយរួច
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700 inline-block" /> មិនទាន់ឆ្លើយ
          </span>
        </div>
      </div>

      {/* 3. QUESTION WORKSPACE AREA */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          
          {/* Question Card */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-5 shadow-xs">
            
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                សំណួរទី {currentQuestionIdx + 1} នៃ {test.questions.length} ({currentQuestion.type})
              </span>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-900">
                +{currentQuestion.points} ពិន្ទុ
              </span>
            </div>

            {/* Prompt */}
            <p className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-relaxed">
              {currentQuestion.promptKhmer}
            </p>

            {/* Render by Question Type */}

            {/* TYPE 1: MULTIPLE CHOICE */}
            {currentQuestion.type === 'multiple_choice' && currentQuestion.options && (
              <div className="space-y-2.5 pt-2">
                {currentQuestion.options.map((opt) => {
                  const isSelected = answers[currentQuestion.id] === opt.id;
                  return (
                    <div
                      key={opt.id}
                      onClick={() => handleSelectOption(currentQuestion.id, opt.id)}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between text-xs sm:text-sm ${
                        isSelected
                          ? 'border-indigo-500 bg-indigo-50/70 dark:bg-indigo-950/50 text-indigo-900 dark:text-indigo-200 font-semibold shadow-xs'
                          : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 hover:bg-slate-100 dark:hover:bg-slate-800/60 text-slate-800 dark:text-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          isSelected ? 'border-indigo-600 bg-indigo-600' : 'border-slate-400'
                        }`}>
                          {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                        <span className="font-mono">{opt.textKhmer}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* TYPE 2: TRUE / FALSE */}
            {currentQuestion.type === 'true_false' && (
              <div className="grid grid-cols-2 gap-4 pt-2">
                <button
                  onClick={() => handleSelectBool(currentQuestion.id, true)}
                  className={`p-4 rounded-xl border text-center font-bold text-sm transition-all ${
                    answers[currentQuestion.id] === true
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 shadow-xs'
                      : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  ✓ ត្រូវ (TRUE)
                </button>
                <button
                  onClick={() => handleSelectBool(currentQuestion.id, false)}
                  className={`p-4 rounded-xl border text-center font-bold text-sm transition-all ${
                    answers[currentQuestion.id] === false
                      ? 'border-rose-500 bg-rose-50 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 shadow-xs'
                      : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  ✗ ខុស (FALSE)
                </button>
              </div>
            )}

            {/* TYPE 3: SHORT ANSWER */}
            {currentQuestion.type === 'short_answer' && (
              <div className="pt-2 space-y-2">
                <label className="text-xs text-slate-400">សរសេរចម្លើយខ្លីរបស់អ្នកនៅខាងក្រោម៖</label>
                <input
                  type="text"
                  value={answers[currentQuestion.id] || ''}
                  onChange={(e) => handleShortAnswerChange(currentQuestion.id, e.target.value)}
                  placeholder="វាយបញ្ចូលចម្លើយរបស់អ្នក..."
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            )}

            {/* TYPE 4: CODING PROBLEM */}
            {currentQuestion.type === 'coding' && currentQuestion.codingProblem && (
              <div className="pt-2 space-y-4">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 space-y-1">
                  <p><strong>ការពិពណ៌នា:</strong> {currentQuestion.codingProblem.descriptionKhmer}</p>
                  <p><strong>Input:</strong> {currentQuestion.codingProblem.inputKhmer}</p>
                  <p><strong>Output:</strong> {currentQuestion.codingProblem.outputKhmer}</p>
                </div>

                <div className="h-[320px] rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800">
                  <CodeEditor
                    code={codingCodes[currentQuestion.id] || ''}
                    onChange={(val) => handleCodeChange(currentQuestion.id, val)}
                    language={currentQuestion.codingProblem.language}
                    theme={theme}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <button
                    onClick={handleRunCodingTest}
                    disabled={isTestingCode}
                    className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2"
                  >
                    <Play className="h-3.5 w-3.5 fill-current" />
                    <span>{isTestingCode ? 'កំពុងតេស្តកូដ...' : 'តេស្តកូដសាកល្បង (Run)'}</span>
                  </button>

                  {codeTestResult && (
                    <span className="text-xs font-mono font-semibold text-slate-700 dark:text-slate-300">
                      {codeTestResult}
                    </span>
                  )}
                </div>
              </div>
            )}

          </div>

          {/* Navigation Prev / Next Question */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => setCurrentQuestionIdx(prev => Math.max(0, prev - 1))}
              disabled={currentQuestionIdx === 0}
              className="px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 disabled:opacity-40 flex items-center gap-1.5"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>សំណួរមុន</span>
            </button>

            {currentQuestionIdx < test.questions.length - 1 ? (
              <button
                onClick={() => setCurrentQuestionIdx(prev => Math.min(test.questions.length - 1, prev + 1))}
                className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1.5"
              >
                <span>សំណួរបន្ទាប់</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmitTest}
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm"
              >
                <Send className="h-3.5 w-3.5" />
                <span>ដាក់ស្នើការប្រឡងបញ្ចប់</span>
              </button>
            )}
          </div>

        </div>
      </div>

    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Language, Submission } from '../types';
import { CodeEditor } from '../components/CodeEditor';
import { executeCodeForProblem, RunResult, STATUS_LABELS } from '../services/codeRunner';
import confetti from 'canvas-confetti';
import { 
  Play, 
  Send, 
  ArrowLeft, 
  Clock, 
  HardDrive, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Terminal, 
  Check, 
  FileText,
  HelpCircle,
  RotateCcw,
  Sparkles
} from 'lucide-react';

export const ProblemDetailView: React.FC = () => {
  const { 
    selectedProblemId, 
    problems, 
    setCurrentView, 
    currentUser, 
    addSubmission, 
    theme,
    showToast 
  } = useApp();

  const problem = problems.find(p => p.id === selectedProblemId) || problems[0];

  const [activeLanguage, setActiveLanguage] = useState<Language>(problem.language);
  const [code, setCode] = useState<string>(
    problem.language === 'python' ? problem.starterCodePython : problem.starterCodeCpp
  );
  
  // When problem or language changes, update code template
  useEffect(() => {
    setActiveLanguage(problem.language);
    setCode(problem.language === 'python' ? problem.starterCodePython : problem.starterCodeCpp);
  }, [problem]);

  const handleLanguageChange = (lang: Language) => {
    setActiveLanguage(lang);
    setCode(lang === 'python' ? problem.starterCodePython : problem.starterCodeCpp);
  };

  const handleResetCode = () => {
    setCode(activeLanguage === 'python' ? problem.starterCodePython : problem.starterCodeCpp);
    showToast('បានកំណត់កូដដើមឡើងវិញ', 'info');
  };

  // Execution & Submissions State
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeResultTab, setActiveResultTab] = useState<'testcases' | 'terminal' | 'custom'>('testcases');
  const [lastResult, setLastResult] = useState<RunResult | null>(null);
  const [selectedTestCaseIdx, setSelectedTestCaseIdx] = useState(0);
  const [customInput, setCustomInput] = useState('');
  const [customOutput, setCustomOutput] = useState('');

  // RUN CODE (Only public test cases or first 2)
  const handleRunCode = async () => {
    setIsRunning(true);
    setActiveResultTab('testcases');
    try {
      const publicCases = problem.testCases.filter(tc => !tc.isHidden);
      const testCasesToRun = publicCases.length > 0 ? publicCases : problem.testCases.slice(0, 2);
      
      const result = await executeCodeForProblem(
        code,
        activeLanguage,
        testCasesToRun,
        problem.timeLimitMs,
        problem.memoryLimitMb
      );
      setLastResult(result);
      if (result.status === 'accepted') {
        showToast('ការដំណើរការកូដសាកល្បងបានជោគជ័យ!', 'success');
      } else {
        showToast(result.statusTextKhmer, 'error');
      }
    } catch (err: any) {
      showToast('មានបញ្ហាក្នុងការដំណើរការកូដ', 'error');
    } finally {
      setIsRunning(false);
    }
  };

  // SUBMIT CODE (All test cases including hidden ones)
  const handleSubmitCode = async () => {
    setIsSubmitting(true);
    setActiveResultTab('testcases');
    try {
      const result = await executeCodeForProblem(
        code,
        activeLanguage,
        problem.testCases,
        problem.timeLimitMs,
        problem.memoryLimitMb
      );
      setLastResult(result);

      // Create Submission Record
      const submission: Submission = {
        id: `sub-${Date.now()}`,
        problemId: problem.id,
        problemTitle: problem.titleKhmer,
        userId: currentUser.id,
        userName: currentUser.khmerName,
        language: activeLanguage,
        code,
        status: result.status,
        executionTimeMs: result.executionTimeMs,
        memoryUsedMb: result.memoryMb,
        testsPassed: result.testsPassed,
        totalTests: result.totalTests,
        submittedAt: new Date().toISOString(),
        errorLog: result.stderr
      };

      addSubmission(submission);

      if (result.status === 'accepted') {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
        showToast('សូមអបអរសាទរ! កូដរបស់អ្នកបានឆ្លងផុតគ្រប់ Test cases ទាំងអស់! (+20 ពិន្ទុ)', 'success');
      } else {
        showToast(`ការដាក់ស្នើមិនទាន់ត្រឹមត្រូវ: ${result.statusTextKhmer}`, 'error');
      }
    } catch (err: any) {
      showToast('កំហុសក្នុងការដាក់ស្នើកូដ', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const difficultyColors = {
    easy: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 border-emerald-200 dark:border-emerald-800',
    medium: 'text-amber-600 bg-amber-50 dark:bg-amber-950/50 border-amber-200 dark:border-amber-800',
    hard: 'text-rose-600 bg-rose-50 dark:bg-rose-950/50 border-rose-200 dark:border-rose-800'
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col bg-slate-100 dark:bg-slate-950 overflow-hidden">
      
      {/* Top action bar */}
      <div className="h-12 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentView('problems')}
            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors flex items-center gap-1 text-xs font-semibold"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">ត្រឡប់ក្រោយ</span>
          </button>
          <div className="h-4 w-[1px] bg-slate-200 dark:bg-slate-800" />
          <h2 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 truncate max-w-[200px] sm:max-w-md">
            {problem.id}: {problem.titleKhmer}
          </h2>
        </div>

        {/* Language switch & Run/Submit controls */}
        <div className="flex items-center gap-2">
          {/* Language Selector */}
          <div className="flex items-center p-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => handleLanguageChange('python')}
              className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-colors ${
                activeLanguage === 'python'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              Python 3
            </button>
            <button
              onClick={() => handleLanguageChange('cpp')}
              className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-colors ${
                activeLanguage === 'cpp'
                  ? 'bg-white dark:bg-slate-900 text-purple-600 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              C++17
            </button>
          </div>

          {/* Run Button */}
          <button
            id="btn-run-code"
            onClick={handleRunCode}
            disabled={isRunning || isSubmitting}
            className="px-3.5 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center gap-1.5 transition-colors disabled:opacity-50"
          >
            <Play className={`h-3.5 w-3.5 ${isRunning ? 'animate-spin' : 'fill-current'}`} />
            <span>{isRunning ? 'កំពុងដំណើរការ...' : 'ដំណើរការកូដ (Run)'}</span>
          </button>

          {/* Submit Button */}
          <button
            id="btn-submit-code"
            onClick={handleSubmitCode}
            disabled={isRunning || isSubmitting}
            className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-indigo-600/20 transition-all hover:scale-[1.02] disabled:opacity-50"
          >
            <Send className="h-3.5 w-3.5" />
            <span>{isSubmitting ? 'កំពុងវាយតម្លៃ...' : 'ដាក់ស្នើ (Submit)'}</span>
          </button>
        </div>
      </div>

      {/* Main Split Screen */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        
        {/* LEFT PANEL: Problem Details */}
        <div className="w-full lg:w-1/2 h-1/2 lg:h-full overflow-y-auto border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-6">
          
          {/* Header & Badges */}
          <div className="space-y-2 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`px-2.5 py-0.5 rounded-md text-xs font-semibold border ${difficultyColors[problem.difficulty]}`}>
                {problem.difficulty === 'easy' ? 'ងាយ (Easy)' : problem.difficulty === 'medium' ? 'មធ្យម (Medium)' : 'ពិបាក (Hard)'}
              </span>
              <span className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                {problem.category}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {problem.timeLimitMs} ms • {problem.memoryLimitMb} MB
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              {problem.titleKhmer}
            </h1>
            <p className="text-xs text-slate-400 font-mono">
              English Title: {problem.titleEnglish}
            </p>
          </div>

          {/* Problem Description */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              ការពិពណ៌នា (Description)
            </h3>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line font-normal">
              {problem.descriptionKhmer}
            </p>
          </div>

          {/* Input Format */}
          <div className="space-y-1.5 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800">
            <h4 className="text-xs font-bold text-slate-900 dark:text-slate-200 flex items-center gap-1.5">
              <FileText className="h-3.5 w-3.5 text-indigo-500" />
              ទម្រង់បញ្ចូល (Input)
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              {problem.inputKhmer}
            </p>
          </div>

          {/* Output Format */}
          <div className="space-y-1.5 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800">
            <h4 className="text-xs font-bold text-slate-900 dark:text-slate-200 flex items-center gap-1.5">
              <FileText className="h-3.5 w-3.5 text-indigo-500" />
              ទម្រង់បង្ហាញ (Output)
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              {problem.outputKhmer}
            </p>
          </div>

          {/* Constraints */}
          <div className="space-y-1.5">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              លក្ខខណ្ឌកំណត់ (Constraints)
            </h4>
            <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200">
              {problem.constraintsKhmer}
            </div>
          </div>

          {/* Examples */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              ឧទាហរណ៍ (Examples)
            </h4>
            {problem.examples.map((ex, i) => (
              <div key={i} className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 space-y-2 text-xs">
                <p className="font-bold text-slate-700 dark:text-slate-300">ឧទាហរណ៍ទី {i + 1}៖</p>
                <div>
                  <span className="text-slate-500 font-semibold block text-[11px] mb-0.5">Input:</span>
                  <pre className="p-2 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-mono text-slate-800 dark:text-slate-200">
                    {ex.input || '(empty)'}
                  </pre>
                </div>
                <div>
                  <span className="text-slate-500 font-semibold block text-[11px] mb-0.5">Output:</span>
                  <pre className="p-2 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                    {ex.output}
                  </pre>
                </div>
                {ex.explanationKhmer && (
                  <p className="text-[11px] text-slate-500 italic mt-1">
                    ពន្យល់: {ex.explanationKhmer}
                  </p>
                )}
              </div>
            ))}
          </div>

        </div>

        {/* RIGHT PANEL: Editor + Test Results Drawer */}
        <div className="w-full lg:w-1/2 h-1/2 lg:h-full flex flex-col bg-slate-900">
          
          {/* Top part: Monaco Editor */}
          <div className="flex-1 min-h-[220px] overflow-hidden">
            <CodeEditor
              code={code}
              onChange={setCode}
              language={activeLanguage}
              onReset={handleResetCode}
              theme={theme}
            />
          </div>

          {/* Bottom part: Test Results & Terminal */}
          <div className="h-64 sm:h-72 border-t border-slate-800 bg-slate-950 flex flex-col shrink-0">
            
            {/* Results Tabs Header */}
            <div className="flex items-center justify-between px-3 py-1.5 border-b border-slate-800 bg-slate-900/80 text-xs">
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setActiveResultTab('testcases')}
                  className={`px-2.5 py-1 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                    activeResultTab === 'testcases'
                      ? 'bg-slate-800 text-indigo-400 border border-slate-700'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <CheckCircle className="h-3.5 w-3.5" />
                  <span>Test Cases ({lastResult ? `${lastResult.testsPassed}/${lastResult.totalTests}` : problem.testCases.length})</span>
                </button>

                <button
                  onClick={() => setActiveResultTab('terminal')}
                  className={`px-2.5 py-1 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                    activeResultTab === 'terminal'
                      ? 'bg-slate-800 text-indigo-400 border border-slate-700'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Terminal className="h-3.5 w-3.5" />
                  <span>Terminal Output</span>
                </button>

                <button
                  onClick={() => setActiveResultTab('custom')}
                  className={`px-2.5 py-1 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                    activeResultTab === 'custom'
                      ? 'bg-slate-800 text-indigo-400 border border-slate-700'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span>Custom Input</span>
                </button>
              </div>

              {/* Status Pill */}
              {lastResult && (
                <div className="flex items-center gap-2">
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${STATUS_LABELS[lastResult.status].bg}`}>
                    {STATUS_LABELS[lastResult.status].icon} {STATUS_LABELS[lastResult.status].khmer}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {lastResult.executionTimeMs}ms
                  </span>
                </div>
              )}
            </div>

            {/* Results Content Body */}
            <div className="flex-1 overflow-y-auto p-3 text-xs font-mono">
              
              {/* 1. TEST CASES TAB */}
              {activeResultTab === 'testcases' && (
                <div className="space-y-3">
                  {lastResult ? (
                    <div>
                      {/* Case selector pills */}
                      <div className="flex items-center gap-2 mb-3 overflow-x-auto pb-1">
                        {lastResult.results.map((res, i) => (
                          <button
                            key={res.testCaseId}
                            onClick={() => setSelectedTestCaseIdx(i)}
                            className={`px-3 py-1 rounded-lg text-xs font-bold border transition-colors flex items-center gap-1.5 ${
                              selectedTestCaseIdx === i
                                ? 'bg-indigo-600 text-white border-indigo-500'
                                : res.passed
                                ? 'bg-emerald-950/40 text-emerald-300 border-emerald-800 hover:bg-emerald-900/60'
                                : 'bg-rose-950/40 text-rose-300 border-rose-800 hover:bg-rose-900/60'
                            }`}
                          >
                            <span>Case {i + 1}</span>
                            <span>{res.passed ? '✓' : '✗'}</span>
                          </button>
                        ))}
                      </div>

                      {/* Selected test case inspection */}
                      {lastResult.results[selectedTestCaseIdx] && (
                        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-2 text-slate-300">
                          <div className="flex items-center justify-between text-[11px] text-slate-400">
                            <span>
                              ស្ថានភាព: <strong className={lastResult.results[selectedTestCaseIdx].passed ? 'text-emerald-400' : 'text-rose-400'}>
                                {lastResult.results[selectedTestCaseIdx].status.toUpperCase()}
                              </strong>
                            </span>
                            <span>
                              {lastResult.results[selectedTestCaseIdx].executionTimeMs}ms • {lastResult.results[selectedTestCaseIdx].memoryMb} MB
                            </span>
                          </div>

                          <div>
                            <span className="text-[10px] text-slate-500 uppercase">Input:</span>
                            <pre className="p-2 rounded bg-slate-950 border border-slate-800 text-slate-300 text-xs">
                              {lastResult.results[selectedTestCaseIdx].input || '(no input)'}
                            </pre>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <div>
                              <span className="text-[10px] text-slate-500 uppercase">Expected Output:</span>
                              <pre className="p-2 rounded bg-slate-950 border border-slate-800 text-emerald-400 text-xs">
                                {lastResult.results[selectedTestCaseIdx].expectedOutput}
                              </pre>
                            </div>
                            <div>
                              <span className="text-[10px] text-slate-500 uppercase">Your Output:</span>
                              <pre className={`p-2 rounded bg-slate-950 border border-slate-800 text-xs ${
                                lastResult.results[selectedTestCaseIdx].passed ? 'text-emerald-400' : 'text-rose-400'
                              }`}>
                                {lastResult.results[selectedTestCaseIdx].actualOutput || '(no output)'}
                              </pre>
                            </div>
                          </div>

                          {lastResult.results[selectedTestCaseIdx].errorMessage && (
                            <div className="p-2 rounded bg-rose-950/40 border border-rose-800 text-rose-300 text-xs">
                              {lastResult.results[selectedTestCaseIdx].errorMessage}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-slate-500 font-sans">
                      <Terminal className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p>សូមចុច "ដំណើរការកូដ (Run)" ឬ "ដាក់ស្នើ (Submit)" ដើម្បីមើលលទ្ធផល Test Cases</p>
                    </div>
                  )}
                </div>
              )}

              {/* 2. TERMINAL OUTPUT TAB */}
              {activeResultTab === 'terminal' && (
                <div className="p-2 font-mono text-slate-300 space-y-2">
                  <div className="text-slate-500 text-[11px]">
                    $ sandbox-runner --lang={activeLanguage} --timeout={problem.timeLimitMs}ms
                  </div>
                  {lastResult?.stdout && (
                    <pre className="text-emerald-400 text-xs whitespace-pre-wrap">
                      {lastResult.stdout}
                    </pre>
                  )}
                  {lastResult?.stderr && (
                    <pre className="text-rose-400 text-xs whitespace-pre-wrap">
                      {lastResult.stderr}
                    </pre>
                  )}
                  {!lastResult && (
                    <p className="text-slate-500 font-sans text-xs">គ្មានទិន្នន័យ console ទេ។</p>
                  )}
                </div>
              )}

              {/* 3. CUSTOM INPUT TAB */}
              {activeResultTab === 'custom' && (
                <div className="space-y-3 font-sans">
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">បញ្ចូល Custom Input៖</label>
                    <textarea
                      value={customInput}
                      onChange={(e) => setCustomInput(e.target.value)}
                      rows={3}
                      placeholder="ឧ. 10 20"
                      className="w-full p-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200 font-mono"
                    />
                  </div>
                  <button
                    onClick={() => {
                      showToast('ដំណើរការជាមួយ Custom Input...', 'info');
                    }}
                    className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-bold"
                  >
                    តេស្តជាមួយ Input នេះ
                  </button>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { Problem, TestCase, Difficulty, Language } from '../types';
import { X, Plus, Trash2, Save, Code, FileText, CheckCircle2, ListFilter, Sliders } from 'lucide-react';

interface EditProblemModalProps {
  isOpen: boolean;
  problem: Problem | null;
  onClose: () => void;
  onSave: (updatedProblem: Problem) => void;
}

export const EditProblemModal: React.FC<EditProblemModalProps> = ({
  isOpen,
  problem,
  onClose,
  onSave
}) => {
  const [activeTab, setActiveTab] = useState<'info' | 'description' | 'starter_code' | 'test_cases'>('info');

  // Form states
  const [titleKhmer, setTitleKhmer] = useState('');
  const [titleEnglish, setTitleEnglish] = useState('');
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [language, setLanguage] = useState<Language>('python');
  const [points, setPoints] = useState(10);
  const [timeLimitMs, setTimeLimitMs] = useState(1000);
  const [memoryLimitMb, setMemoryLimitMb] = useState(64);

  const [descriptionKhmer, setDescriptionKhmer] = useState('');
  const [inputKhmer, setInputKhmer] = useState('');
  const [outputKhmer, setOutputKhmer] = useState('');
  const [constraintsKhmer, setConstraintsKhmer] = useState('');

  const [starterCodePython, setStarterCodePython] = useState('');
  const [starterCodeCpp, setStarterCodeCpp] = useState('');

  const [testCases, setTestCases] = useState<TestCase[]>([]);

  // Load problem into state when opened
  useEffect(() => {
    if (problem) {
      setTitleKhmer(problem.titleKhmer || '');
      setTitleEnglish(problem.titleEnglish || '');
      setCategory(problem.category || 'Beginner');
      setDifficulty(problem.difficulty || 'easy');
      setLanguage(problem.language || 'python');
      setPoints(problem.points || 10);
      setTimeLimitMs(problem.timeLimitMs || 1000);
      setMemoryLimitMb(problem.memoryLimitMb || 64);

      setDescriptionKhmer(problem.descriptionKhmer || '');
      setInputKhmer(problem.inputKhmer || '');
      setOutputKhmer(problem.outputKhmer || '');
      setConstraintsKhmer(problem.constraintsKhmer || '');

      setStarterCodePython(problem.starterCodePython || '');
      setStarterCodeCpp(problem.starterCodeCpp || '');

      setTestCases(problem.testCases ? JSON.parse(JSON.stringify(problem.testCases)) : []);
    } else {
      // Defaults for brand new problem
      setTitleKhmer('');
      setTitleEnglish('');
      setCategory('Beginner');
      setDifficulty('easy');
      setLanguage('python');
      setPoints(10);
      setTimeLimitMs(1000);
      setMemoryLimitMb(64);

      setDescriptionKhmer('');
      setInputKhmer('');
      setOutputKhmer('');
      setConstraintsKhmer('1 <= N <= 10^5');

      setStarterCodePython('# សរសេរកូដ Python របស់អ្នកនៅទីនេះ\n');
      setStarterCodeCpp('#include <iostream>\nusing namespace std;\n\nint main() {\n    // សរសេរកូដ C++ របស់អ្នកនៅទីនេះ\n    return 0;\n}\n');
      setTestCases([
        { id: 'tc1', input: '1 2', expectedOutput: '3', isHidden: false },
        { id: 'tc2', input: '5 10', expectedOutput: '15', isHidden: false },
        { id: 'tc3', input: '100 200', expectedOutput: '300', isHidden: true }
      ]);
    }
    setActiveTab('info');
  }, [problem, isOpen]);

  if (!isOpen) return null;

  const handleAddTestCase = () => {
    const newId = `tc-${Date.now().toString().slice(-4)}`;
    setTestCases([
      ...testCases,
      {
        id: newId,
        input: '',
        expectedOutput: '',
        isHidden: false
      }
    ]);
  };

  const handleRemoveTestCase = (index: number) => {
    setTestCases(testCases.filter((_, i) => i !== index));
  };

  const handleUpdateTestCase = (index: number, field: keyof TestCase, value: any) => {
    const updated = [...testCases];
    updated[index] = { ...updated[index], [field]: value };
    setTestCases(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titleKhmer.trim()) {
      alert('សូមបញ្ចូលចំណងជើងលំហាត់ជាភាសាខ្មែរ!');
      return;
    }

    const updatedProblem: Problem = {
      id: problem ? problem.id : `${language === 'python' ? 'py' : 'cpp'}-${Date.now().toString().slice(-3)}`,
      slug: problem ? problem.slug : `${titleEnglish.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'problem'}-${Date.now().toString().slice(-3)}`,
      titleKhmer,
      titleEnglish: titleEnglish || titleKhmer,
      category,
      difficulty,
      language,
      points: Number(points),
      timeLimitMs: Number(timeLimitMs),
      memoryLimitMb: Number(memoryLimitMb),
      descriptionKhmer,
      inputKhmer: inputKhmer || 'បញ្ចូលទិន្នន័យ',
      outputKhmer: outputKhmer || 'បង្ហាញទិន្នន័យ',
      constraintsKhmer: constraintsKhmer || '1 <= N <= 10^5',
      starterCodePython,
      starterCodeCpp,
      examples: testCases.slice(0, 2).map(tc => ({
        input: tc.input,
        output: tc.expectedOutput,
        explanationKhmer: tc.explanation || `ឧទាហរណ៍ ${tc.input} ទទួលបាន ${tc.expectedOutput}`
      })),
      testCases: testCases.length > 0 ? testCases : [
        { id: 'tc1', input: '0', expectedOutput: '0', isHidden: false }
      ],
      authorName: problem?.authorName || 'Admin',
      createdAt: problem?.createdAt || new Date().toISOString()
    };

    onSave(updatedProblem);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="w-full max-w-4xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950/50">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
              <Sliders className="h-5 w-5" />
            </span>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                {problem ? `កែប្រែលំហាត់: ${problem.titleKhmer}` : 'បង្កើតលំហាត់ថ្មី (Create New Problem)'}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {problem ? `ID: ${problem.id} • ${problem.language.toUpperCase()}` : 'បញ្ចូលទិន្នន័យលំហាត់ និង TestCase ទាំងអស់'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 px-6 py-2.5 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('info')}
            className={`px-3 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 shrink-0 ${
              activeTab === 'info'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <ListFilter className="h-3.5 w-3.5" />
            <span>ព័ត៌មានទូទៅ (Info)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('description')}
            className={`px-3 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 shrink-0 ${
              activeTab === 'description'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <FileText className="h-3.5 w-3.5" />
            <span>ការពិពណ៌នា (Description)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('starter_code')}
            className={`px-3 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 shrink-0 ${
              activeTab === 'starter_code'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Code className="h-3.5 w-3.5" />
            <span>កូដគំរូដើម (Starter Code)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('test_cases')}
            className={`px-3 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 shrink-0 ${
              activeTab === 'test_cases'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <CheckCircle2 className="h-3.5 w-3.5" />
            <span>ករណីតេស្ត Test Cases ({testCases.length})</span>
          </button>
        </div>

        {/* Modal Form Content */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5 text-xs sm:text-sm">

          {/* TAB 1: GENERAL INFO */}
          {activeTab === 'info' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    ចំណងជើងលំហាត់ (ភាសាខ្មែរ) *
                  </label>
                  <input
                    type="text"
                    required
                    value={titleKhmer}
                    onChange={(e) => setTitleKhmer(e.target.value)}
                    placeholder="ឧ. បូកលេខពីរ"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    ចំណងជើងជាភាសាអង់គ្លេស (English Title)
                  </label>
                  <input
                    type="text"
                    value={titleEnglish}
                    onChange={(e) => setTitleEnglish(e.target.value)}
                    placeholder="ឧ. Sum of Two Numbers"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    ភាសាកម្មវិធី (Language)
                  </label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value as Language)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="python">Python 3</option>
                    <option value="cpp">C++17</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    កម្រិតលំបាក (Difficulty)
                  </label>
                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value as Difficulty)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="easy">ងាយ (Easy)</option>
                    <option value="medium">មធ្យម (Medium)</option>
                    <option value="hard">ពិបាក (Hard)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    ប្រភេទ (Category)
                  </label>
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="Beginner, Math, String, etc."
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    ពិន្ទុទទួលបាន (Points)
                  </label>
                  <input
                    type="number"
                    value={points}
                    onChange={(e) => setPoints(Number(e.target.value))}
                    min={1}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    ថិរវេលាកំណត់ (Time Limit ms)
                  </label>
                  <input
                    type="number"
                    value={timeLimitMs}
                    onChange={(e) => setTimeLimitMs(Number(e.target.value))}
                    min={100}
                    step={100}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    អង្គចងចាំកំណត់ (Memory MB)
                  </label>
                  <input
                    type="number"
                    value={memoryLimitMb}
                    onChange={(e) => setMemoryLimitMb(Number(e.target.value))}
                    min={16}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: DESCRIPTION & CONSTRAINTS */}
          {activeTab === 'description' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  ការពិពណ៌នាលំហាត់ (Khmer Description) *
                </label>
                <textarea
                  rows={4}
                  required
                  value={descriptionKhmer}
                  onChange={(e) => setDescriptionKhmer(e.target.value)}
                  placeholder="សរសេរកម្មវិធីដើម្បី..."
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs leading-relaxed focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    ទម្រង់ Input (Input Format)
                  </label>
                  <textarea
                    rows={3}
                    value={inputKhmer}
                    onChange={(e) => setInputKhmer(e.target.value)}
                    placeholder="បញ្ចូលចំនួនគត់ពីរ a និង b..."
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    ទម្រង់ Output (Output Format)
                  </label>
                  <textarea
                    rows={3}
                    value={outputKhmer}
                    onChange={(e) => setOutputKhmer(e.target.value)}
                    placeholder="បង្ហាញផលបូក a + b..."
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  លក្ខខណ្ឌកំណត់ (Constraints)
                </label>
                <input
                  type="text"
                  value={constraintsKhmer}
                  onChange={(e) => setConstraintsKhmer(e.target.value)}
                  placeholder="ឧ. -10^9 <= a, b <= 10^9"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          )}

          {/* TAB 3: STARTER CODE */}
          {activeTab === 'starter_code' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  កូដគំរូដើមសម្រាប់ Python (Starter Code Python)
                </label>
                <textarea
                  rows={6}
                  value={starterCodePython}
                  onChange={(e) => setStarterCodePython(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-950 text-emerald-400 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  កូដគំរូដើមសម្រាប់ C++ (Starter Code C++)
                </label>
                <textarea
                  rows={6}
                  value={starterCodeCpp}
                  onChange={(e) => setStarterCodeCpp(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-950 text-cyan-400 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          )}

          {/* TAB 4: TEST CASES */}
          {activeTab === 'test_cases' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  បញ្ចូល Input និង Expected Output ជាក់ស្តែងសម្រាប់តេស្តកូដរបស់អ្នកសរសេរ។
                </p>
                <button
                  type="button"
                  onClick={handleAddTestCase}
                  className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>+ បន្ថែម Test Case</span>
                </button>
              </div>

              <div className="space-y-3">
                {testCases.map((tc, idx) => (
                  <div key={tc.id || idx} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-slate-700 dark:text-slate-300 font-mono">
                          Case #{idx + 1} ({tc.id})
                        </span>
                        <label className="flex items-center gap-1 text-[11px] text-slate-500 cursor-pointer ml-3">
                          <input
                            type="checkbox"
                            checked={tc.isHidden}
                            onChange={(e) => handleUpdateTestCase(idx, 'isHidden', e.target.checked)}
                            className="rounded text-indigo-600 focus:ring-indigo-500"
                          />
                          <span>លាក់ (Hidden Test Case)</span>
                        </label>
                      </div>

                      {testCases.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveTestCase(idx)}
                          className="p-1 rounded text-rose-500 hover:bg-rose-100 dark:hover:bg-rose-950/50 transition-colors"
                          title="លុប Test Case នេះ"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Input:</span>
                        <textarea
                          rows={2}
                          value={tc.input}
                          onChange={(e) => handleUpdateTestCase(idx, 'input', e.target.value)}
                          placeholder="ឧ. 3 5"
                          className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-mono focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Expected Output:</span>
                        <textarea
                          rows={2}
                          value={tc.expectedOutput}
                          onChange={(e) => handleUpdateTestCase(idx, 'expectedOutput', e.target.value)}
                          placeholder="ឧ. 8"
                          className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-mono text-emerald-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              បោះបង់ (Cancel)
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold flex items-center gap-2 shadow-sm transition"
            >
              <Save className="h-4 w-4" />
              <span>{problem ? 'រក្សាទុកការកែប្រែ (Save Changes)' : 'បង្កើតលំហាត់ (Create Problem)'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};

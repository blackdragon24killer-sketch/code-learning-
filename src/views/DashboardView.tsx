import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Problem, CodingTest, Difficulty, Language, UserRole } from '../types';
import { STATUS_LABELS } from '../services/codeRunner';
import { EditProblemModal } from '../components/EditProblemModal';
import { EditTestModal } from '../components/EditTestModal';
import { 
  User as UserIcon, 
  Award, 
  Code2, 
  Clock, 
  Flame, 
  PlusCircle, 
  Trash2, 
  Edit3, 
  ShieldCheck, 
  GraduationCap, 
  Cpu, 
  Terminal, 
  CheckCircle2, 
  BookOpen, 
  Users,
  Search,
  Settings,
  Layers,
  Save,
  X
} from 'lucide-react';

export const DashboardView: React.FC = () => {
  const { 
    currentUser, 
    currentRole, 
    problems, 
    addProblem, 
    updateProblem,
    deleteProblem, 
    tests, 
    addTest, 
    updateTest,
    submissions, 
    users, 
    setCurrentView, 
    setSelectedProblemId,
    showToast 
  } = useApp();

  // Active sub-tab inside dashboard
  const [activeAdminTab, setActiveAdminTab] = useState<'problems' | 'users' | 'sandbox'>('problems');
  const [activeTeacherTab, setActiveTeacherTab] = useState<'tests' | 'students'>('tests');

  // Modals
  const [isNewProblemModalOpen, setIsNewProblemModalOpen] = useState(false);
  const [isNewTestModalOpen, setIsNewTestModalOpen] = useState(false);
  const [editingProblem, setEditingProblem] = useState<Problem | null>(null);
  const [isEditProblemModalOpen, setIsEditProblemModalOpen] = useState(false);
  const [editingTest, setEditingTest] = useState<CodingTest | null>(null);
  const [isEditTestModalOpen, setIsEditTestModalOpen] = useState(false);

  // New Problem Form State
  const [newProbTitleKh, setNewProbTitleKh] = useState('');
  const [newProbTitleEn, setNewProbTitleEn] = useState('');
  const [newProbDescKh, setNewProbDescKh] = useState('');
  const [newProbInputKh, setNewProbInputKh] = useState('');
  const [newProbOutputKh, setNewProbOutputKh] = useState('');
  const [newProbLang, setNewProbLang] = useState<Language>('python');
  const [newProbDiff, setNewProbDiff] = useState<Difficulty>('easy');
  const [newProbCategory, setNewProbCategory] = useState('Beginner');
  const [newProbPoints, setNewProbPoints] = useState(20);
  const [newProbStarterPy, setNewProbStarterPy] = useState('# សរសេរកូដ Python របស់អ្នកនៅទីនេះ\n');
  const [newProbStarterCpp, setNewProbStarterCpp] = useState('#include <iostream>\nusing namespace std;\n\nint main() {\n    // សរសេរកូដ C++ របស់អ្នកនៅទីនេះ\n    return 0;\n}\n');

  // New Test Form State
  const [newTestTitleKh, setNewTestTitleKh] = useState('');
  const [newTestDescKh, setNewTestDescKh] = useState('');
  const [newTestLang, setNewTestLang] = useState<'python' | 'cpp' | 'both'>('python');
  const [newTestDuration, setNewTestDuration] = useState(45);
  const [newTestMaxScore, setNewTestMaxScore] = useState(100);
  const [newTestPassing, setNewTestPassing] = useState(60);

  // Handlers
  const handleCreateProblem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProbTitleKh.trim()) {
      showToast('សូមបញ្ចូលចំណងជើងលំហាត់ជាភាសាខ្មែរ', 'error');
      return;
    }
    const newId = `${newProbLang === 'python' ? 'py' : 'cpp'}-${Date.now().toString().slice(-3)}`;
    const newProb: Problem = {
      id: newId,
      slug: newId,
      titleKhmer: newProbTitleKh,
      titleEnglish: newProbTitleEn || newProbTitleKh,
      descriptionKhmer: newProbDescKh,
      inputKhmer: newProbInputKh || 'បញ្ចូលទិន្នន័យ',
      outputKhmer: newProbOutputKh || 'បង្ហាញទិន្នន័យ',
      constraintsKhmer: '1 <= N <= 10^5',
      difficulty: newProbDiff,
      language: newProbLang,
      category: newProbCategory,
      points: Number(newProbPoints),
      timeLimitMs: 1000,
      memoryLimitMb: 64,
      authorName: currentUser.khmerName,
      createdAt: new Date().toISOString(),
      starterCodePython: newProbStarterPy,
      starterCodeCpp: newProbStarterCpp,
      examples: [
        {
          input: '5',
          output: '25',
          explanationKhmer: 'ឧទាហរណ៍ជាក់ស្តែង'
        }
      ],
      testCases: [
        {
          id: 'tc-1',
          input: '5',
          expectedOutput: '25',
          isHidden: false
        },
        {
          id: 'tc-2',
          input: '10',
          expectedOutput: '100',
          isHidden: true
        }
      ]
    };
    addProblem(newProb);
    setIsNewProblemModalOpen(false);
    // reset form
    setNewProbTitleKh('');
    setNewProbTitleEn('');
    setNewProbDescKh('');
  };

  const handleCreateTest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTestTitleKh.trim()) {
      showToast('សូមបញ្ចូលចំណងជើងការប្រឡង', 'error');
      return;
    }
    const newT: CodingTest = {
      id: `test-${Date.now().toString().slice(-3)}`,
      titleKhmer: newTestTitleKh,
      descriptionKhmer: newTestDescKh,
      language: newTestLang,
      durationMinutes: Number(newTestDuration),
      maxScore: Number(newTestMaxScore),
      passingScore: Number(newTestPassing),
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 30 * 86400000).toISOString(),
      status: 'active',
      authorId: currentUser.id,
      authorName: currentUser.khmerName,
      questions: [
        {
          id: 'q-new-1',
          type: 'multiple_choice',
          points: 30,
          promptKhmer: 'សំណួរទី ១៖ តើ Syntax ខាងក្រោមនេះត្រឹមត្រូវដែរឬទេ?',
          options: [
            { id: 'opt1', textKhmer: 'ត្រូវ' },
            { id: 'opt2', textKhmer: 'ខុស' }
          ],
          correctOptionId: 'opt1'
        },
        {
          id: 'q-new-2',
          type: 'coding',
          points: 70,
          promptKhmer: 'សំណួរទី ២៖ សរសេរកូដដោះស្រាយបញ្ហា',
          problemRefId: problems[0].id,
          codingProblem: problems[0]
        }
      ]
    };
    addTest(newT);
    setIsNewTestModalOpen(false);
    setNewTestTitleKh('');
    setNewTestDescKh('');
  };

  // =========================================================================
  // 1. STUDENT DASHBOARD
  // =========================================================================
  if (currentRole === 'student') {
    const studentSubmissions = submissions.filter(s => s.userId === currentUser.id);
    const solvedCount = new Set(studentSubmissions.filter(s => s.status === 'accepted').map(s => s.problemId)).size;

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Profile Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-20 h-20 rounded-2xl object-cover ring-2 ring-indigo-500/30"
            />
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                  {currentUser.khmerName}
                </h1>
                <span className="text-xs px-2.5 py-0.5 rounded-md font-semibold bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                  សិស្ស (Student)
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                {currentUser.email} • សមាជិកតាំងពី {currentUser.createdAt?.split('T')[0]}
              </p>
              <div className="flex items-center gap-3 pt-1 text-xs text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1 font-semibold text-amber-500">
                  <Flame className="h-4 w-4 fill-amber-500" /> {currentUser.streakDays} ថ្ងៃបន្តបន្ទាប់
                </span>
                <span>•</span>
                <span>ចំណាត់ថ្នាក់លេខ <strong>#{currentUser.rank || 1}</strong></span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-center p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200/60 dark:border-indigo-900/60 min-w-[100px]">
              <p className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400">{currentUser.score}</p>
              <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">ពិន្ទុសរុប</p>
            </div>
            <div className="text-center p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200/60 dark:border-emerald-900/60 min-w-[100px]">
              <p className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">{solvedCount}</p>
              <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">លំហាត់ជោគជ័យ</p>
            </div>
          </div>
        </div>

        {/* Recent Submissions History */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs space-y-4 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                ប្រវត្តិការដាក់ស្នើកូដ (Submission History)
              </h2>
              <p className="text-xs text-slate-400">
                រាល់កូដដែលអ្នកបានដំណើរការ និងដាក់ស្នើក្នុងប្រព័ន្ធ
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 font-bold uppercase">
                  <th className="py-3 px-3">លំហាត់</th>
                  <th className="py-3 px-3">ភាសា</th>
                  <th className="py-3 px-3">ស្ថានភាព</th>
                  <th className="py-3 px-3">ពេលវេលា</th>
                  <th className="py-3 px-3">Memory</th>
                  <th className="py-3 px-3 text-right">កាលបរិច្ឆេទ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                {studentSubmissions.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-slate-400">
                      មិនទាន់មានប្រវត្តិដាក់ស្នើនៅឡើយទេ។ សូមចូលទៅហាត់សរសេរកូដ!
                    </td>
                  </tr>
                ) : (
                  studentSubmissions.map((sub) => {
                    const statusInfo = STATUS_LABELS[sub.status];
                    return (
                      <tr key={sub.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                        <td className="py-3 px-3 font-semibold text-slate-800 dark:text-slate-200">
                          {sub.problemTitle}
                        </td>
                        <td className="py-3 px-3">
                          <span className={`px-2 py-0.5 rounded font-mono font-bold text-[10px] ${
                            sub.language === 'python' ? 'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300' : 'bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300'
                          }`}>
                            {sub.language.toUpperCase()}
                          </span>
                        </td>
                        <td className="py-3 px-3">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold border ${statusInfo.bg}`}>
                            {statusInfo.icon} {statusInfo.khmer}
                          </span>
                        </td>
                        <td className="py-3 px-3 font-mono text-slate-500">
                          {sub.executionTimeMs} ms
                        </td>
                        <td className="py-3 px-3 font-mono text-slate-500">
                          {sub.memoryUsedMb} MB
                        </td>
                        <td className="py-3 px-3 text-right text-slate-400 font-mono">
                          {sub.submittedAt.split('T')[0]}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    );
  }

  // =========================================================================
  // 2. TEACHER DASHBOARD
  // =========================================================================
  if (currentRole === 'teacher') {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Top summary stats */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                ផ្ទាំងគ្រប់គ្រងគ្រូបង្រៀន (Teacher Dashboard)
              </h1>
              <span className="text-xs px-2.5 py-0.5 rounded-md font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                គ្រូ: {currentUser.khmerName}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              បង្កើតការប្រឡង ដាក់លំហាត់តេស្ត និងតាមដានលទ្ធផលសិស្ស-និស្សិត
            </p>
          </div>

          <button
            id="teacher-btn-create-test"
            onClick={() => setIsNewTestModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-2 shadow-sm self-start sm:self-auto transition-colors"
          >
            <PlusCircle className="h-4 w-4" />
            <span>+ បង្កើតការប្រឡងថ្មី</span>
          </button>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
            <p className="text-xs text-slate-400 font-semibold uppercase">ការប្រឡងដែលបានបង្កើត</p>
            <p className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400 mt-1">{tests.length}</p>
          </div>
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
            <p className="text-xs text-slate-400 font-semibold uppercase">សិស្សដែលបានដាក់ស្នើកូដ</p>
            <p className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">{submissions.length}</p>
          </div>
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
            <p className="text-xs text-slate-400 font-semibold uppercase">អត្រាជោគជ័យជាមធ្យម</p>
            <p className="text-3xl font-extrabold text-amber-600 dark:text-amber-400 mt-1">78.5%</p>
          </div>
        </div>

        {/* Tests Management List */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-4 shadow-xs">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            បញ្ជីការប្រឡងដែលអ្នកគ្រប់គ្រង
          </h2>

          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {tests.map((t) => (
              <div key={t.id} className="py-4 flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    {t.titleKhmer}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                    <span>ភាសា: <strong>{t.language.toUpperCase()}</strong></span>
                    <span>•</span>
                    <span>ថិរវេលា: <strong>{t.durationMinutes} នាទី</strong></span>
                    <span>•</span>
                    <span>សំណួរ: <strong>{t.questions.length}</strong></span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setEditingTest(t);
                      setIsEditTestModalOpen(true);
                    }}
                    className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 text-indigo-600 dark:text-indigo-400 text-xs font-semibold flex items-center gap-1"
                    title="កែប្រែការប្រឡង"
                  >
                    <Edit3 className="h-4 w-4" />
                    <span>កែប្រែ</span>
                  </button>
                  <button
                    onClick={() => {
                      setCurrentView('tests');
                    }}
                    className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300"
                  >
                    មើលទិដ្ឋភាពសិស្ស
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal: Create Test */}
        {isNewTestModalOpen && (
          <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="w-full max-w-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  បង្កើតការប្រឡងថ្មី (Create New Test)
                </h3>
                <button onClick={() => setIsNewTestModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleCreateTest} className="space-y-4 text-xs">
                <div>
                  <label className="font-semibold block mb-1">ចំណងជើងការប្រឡង (ភាសាខ្មែរ) *</label>
                  <input
                    type="text"
                    required
                    value={newTestTitleKh}
                    onChange={(e) => setNewTestTitleKh(e.target.value)}
                    placeholder="ឧ. ការប្រឡងពាក់កណ្តាលឆមាស Python មូលដ្ឋាន"
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs"
                  />
                </div>

                <div>
                  <label className="font-semibold block mb-1">ការពិពណ៌នាខ្លី</label>
                  <textarea
                    rows={2}
                    value={newTestDescKh}
                    onChange={(e) => setNewTestDescKh(e.target.value)}
                    placeholder="ពិពណ៌នាអំពីខ្លឹមសារ និងវិញ្ញាសា..."
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold block mb-1">ភាសាកូដ</label>
                    <select
                      value={newTestLang}
                      onChange={(e) => setNewTestLang(e.target.value as any)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs"
                    >
                      <option value="python">Python 3</option>
                      <option value="cpp">C++17</option>
                      <option value="both">ទាំងពីរ (Python & C++)</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-semibold block mb-1">ថិរវេលា (នាទី)</label>
                    <input
                      type="number"
                      value={newTestDuration}
                      onChange={(e) => setNewTestDuration(Number(e.target.value))}
                      className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold block mb-1">ពិន្ទុសរុប (Max Score)</label>
                    <input
                      type="number"
                      value={newTestMaxScore}
                      onChange={(e) => setNewTestMaxScore(Number(e.target.value))}
                      className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs"
                    />
                  </div>
                  <div>
                    <label className="font-semibold block mb-1">ពិន្ទុកំណត់ជាប់ (Passing)</label>
                    <input
                      type="number"
                      value={newTestPassing}
                      onChange={(e) => setNewTestPassing(Number(e.target.value))}
                      className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs"
                    />
                  </div>
                </div>

                <div className="pt-3 flex justify-end gap-2 border-t border-slate-100 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => setIsNewTestModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold"
                  >
                    បោះបង់
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold"
                  >
                    បង្កើតការប្រឡង
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    );
  }

  // =========================================================================
  // 3. ADMIN DASHBOARD
  // =========================================================================
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              ផ្ទាំងគ្រប់គ្រងប្រព័ន្ធ (System Admin)
            </h1>
            <span className="text-xs px-2.5 py-0.5 rounded-md font-semibold bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
              Admin: {currentUser.khmerName}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            គ្រប់គ្រងលំហាត់កូដ គណនីអ្នកប្រើប្រាស់ និងតាមដាន Sandbox Docker Container
          </p>
        </div>

        <button
          id="admin-btn-add-problem"
          onClick={() => {
            setEditingProblem(null);
            setIsEditProblemModalOpen(true);
          }}
          className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-2 shadow-sm self-start sm:self-auto transition-colors"
        >
          <PlusCircle className="h-4 w-4" />
          <span>+ បន្ថែមលំហាត់ថ្មី</span>
        </button>
      </div>

      {/* Admin Subtabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          onClick={() => setActiveAdminTab('problems')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
            activeAdminTab === 'problems'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          គ្រប់គ្រងលំហាត់ ({problems.length})
        </button>
        <button
          onClick={() => setActiveAdminTab('users')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
            activeAdminTab === 'users'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          គ្រប់គ្រងអ្នកប្រើប្រាស់ ({users.length})
        </button>
        <button
          onClick={() => setActiveAdminTab('sandbox')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 ${
            activeAdminTab === 'sandbox'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <ShieldCheck className="h-3.5 w-3.5" />
          <span>Docker Sandbox Status</span>
        </button>
      </div>

      {/* TAB 1: PROBLEMS MANAGEMENT */}
      {activeAdminTab === 'problems' && (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
          <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
            <span className="font-bold text-slate-700 dark:text-slate-300">បញ្ជីលំហាត់សរុប {problems.length} លំហាត់</span>
            <span className="text-slate-400 font-mono">Python: {problems.filter(p => p.language === 'python').length} • C++: {problems.filter(p => p.language === 'cpp').length}</span>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800/80 max-h-[500px] overflow-y-auto">
            {problems.map((p) => (
              <div key={p.id} className="p-3.5 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors text-xs">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold w-12">{p.id}</span>
                  <div>
                    <p className="font-bold text-slate-800 dark:text-slate-200">{p.titleKhmer}</p>
                    <p className="text-[11px] text-slate-400 font-mono">
                      {p.language.toUpperCase()} • {p.difficulty} • {p.points} ពិន្ទុ • {p.testCases.length} Test cases
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setEditingProblem(p);
                      setIsEditProblemModalOpen(true);
                    }}
                    className="px-2.5 py-1 rounded-md bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 text-indigo-600 dark:text-indigo-400 font-semibold flex items-center gap-1"
                    title="កែប្រែលំហាត់"
                  >
                    <Edit3 className="h-3.5 w-3.5" />
                    <span>កែប្រែ</span>
                  </button>
                  <button
                    onClick={() => {
                      setSelectedProblemId(p.id);
                      setCurrentView('problem_detail');
                    }}
                    className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold"
                  >
                    តេស្តកូដ
                  </button>
                  <button
                    onClick={() => deleteProblem(p.id)}
                    className="p-1.5 rounded-md hover:bg-rose-50 text-rose-600 dark:hover:bg-rose-950/40 transition-colors"
                    title="លុបលំហាត់"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: USERS MANAGEMENT */}
      {activeAdminTab === 'users' && (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 text-slate-400 font-bold uppercase">
                <th className="py-3 px-4">អ្នកប្រើប្រាស់</th>
                <th className="py-3 px-4">អ៊ីមែល</th>
                <th className="py-3 px-4">តួនាទី (Role)</th>
                <th className="py-3 px-4 text-center">ពិន្ទុ</th>
                <th className="py-3 px-4 text-center">លំហាត់ជោគជ័យ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2.5">
                      <img src={u.avatar} alt={u.name} className="h-7 w-7 rounded-full object-cover" />
                      <span className="font-bold text-slate-800 dark:text-slate-200">{u.khmerName}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-500">{u.email}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded-md text-[11px] font-semibold border ${
                      u.role === 'admin' ? 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950 dark:text-purple-300' :
                      u.role === 'teacher' ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300' :
                      'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300'
                    }`}>
                      {u.role.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center font-bold text-indigo-600 dark:text-indigo-400">{u.score}</td>
                  <td className="py-3 px-4 text-center text-slate-600 dark:text-slate-400">{u.solvedCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* TAB 3: DOCKER SANDBOX STATUS */}
      {activeAdminTab === 'sandbox' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Sandbox Docker Isolation Status: <span className="text-emerald-500">HEALTHY & ACTIVE</span>
              </h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              រាល់កូដ Python 3 និង C++17 របស់អ្នកប្រើប្រាស់ ត្រូវដំណើរការក្នុង isolated sandbox container ដែលគ្មាន network access និងមានកម្រិត CPU / RAM ច្បាស់លាស់។
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <span className="text-[11px] text-slate-400 uppercase font-bold block">Python Runtime</span>
                <span className="text-sm font-bold text-blue-500 font-mono">Python 3.11-slim</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <span className="text-[11px] text-slate-400 uppercase font-bold block">C++ Compiler</span>
                <span className="text-sm font-bold text-purple-500 font-mono">g++-17 (O2 optimize)</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <span className="text-[11px] text-slate-400 uppercase font-bold block">CPU Limit</span>
                <span className="text-sm font-bold text-emerald-500 font-mono">1.0 CPU Core</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <span className="text-[11px] text-slate-400 uppercase font-bold block">Memory Limit</span>
                <span className="text-sm font-bold text-amber-500 font-mono">64 MB per process</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Add Problem */}
      {isNewProblemModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                បន្ថែមលំហាត់កូដថ្មី (Add New Coding Problem)
              </h3>
              <button onClick={() => setIsNewProblemModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProblem} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold block mb-1">ចំណងជើងជាភាសាខ្មែរ *</label>
                  <input
                    type="text"
                    required
                    value={newProbTitleKh}
                    onChange={(e) => setNewProbTitleKh(e.target.value)}
                    placeholder="ឧ. រកផលគុណពីរចំនួន"
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs"
                  />
                </div>
                <div>
                  <label className="font-semibold block mb-1">ចំណងជើងជាភាសាអង់គ្លេស</label>
                  <input
                    type="text"
                    value={newProbTitleEn}
                    onChange={(e) => setNewProbTitleEn(e.target.value)}
                    placeholder="e.g. Product of Two Numbers"
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold block mb-1">ការពិពណ៌នាលំហាត់ជាភាសាខ្មែរ *</label>
                <textarea
                  rows={3}
                  required
                  value={newProbDescKh}
                  onChange={(e) => setNewProbDescKh(e.target.value)}
                  placeholder="សរសេរកម្មវិធីដើម្បីទទួលចំនួនគត់ពីរ..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-semibold block mb-1">ភាសាកូដ</label>
                  <select
                    value={newProbLang}
                    onChange={(e) => setNewProbLang(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs"
                  >
                    <option value="python">Python 3</option>
                    <option value="cpp">C++17</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold block mb-1">កម្រិតពិបាក</label>
                  <select
                    value={newProbDiff}
                    onChange={(e) => setNewProbDiff(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs"
                  >
                    <option value="easy">ងាយ (Easy)</option>
                    <option value="medium">មធ្យម (Medium)</option>
                    <option value="hard">ពិបាក (Hard)</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold block mb-1">ពិន្ទុ (Points)</label>
                  <input
                    type="number"
                    value={newProbPoints}
                    onChange={(e) => setNewProbPoints(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsNewProblemModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold"
                >
                  បោះបង់
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold"
                >
                  រក្សាទុកលំហាត់ថ្មី
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit / Create Problem Modal */}
      <EditProblemModal
        isOpen={isEditProblemModalOpen}
        problem={editingProblem}
        onClose={() => {
          setIsEditProblemModalOpen(false);
          setEditingProblem(null);
        }}
        onSave={(updated) => {
          if (editingProblem) {
            updateProblem(updated);
          } else {
            addProblem(updated);
          }
        }}
      />

      {/* Edit Test Modal */}
      <EditTestModal
        isOpen={isEditTestModalOpen}
        test={editingTest}
        onClose={() => {
          setIsEditTestModalOpen(false);
          setEditingTest(null);
        }}
        onSave={(updated) => {
          updateTest(updated);
        }}
      />

    </div>
  );
};

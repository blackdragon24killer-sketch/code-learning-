import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Play, 
  Code2, 
  Terminal, 
  Trophy, 
  CheckCircle2, 
  Users, 
  Clock, 
  Cpu, 
  ShieldCheck, 
  Sparkles,
  ArrowRight,
  Flame,
  Star,
  Layers,
  ChevronRight
} from 'lucide-react';

export const HomeView: React.FC = () => {
  const { setCurrentView, setPreferredLanguage, setSelectedProblemId, setSelectedTestId, problems, tests, leaderboard } = useApp();

  const pythonCount = problems.filter(p => p.language === 'python').length;
  const cppCount = problems.filter(p => p.language === 'cpp').length;

  const pythonPopular = problems.filter(p => p.language === 'python').slice(0, 3);
  const cppPopular = problems.filter(p => p.language === 'cpp').slice(0, 3);

  const activeTest = tests.find(t => t.status === 'active') || tests[0];

  return (
    <div className="space-y-16 pb-16">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-8 md:pt-16 pb-12">
        {/* Glow backdrop decorative */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-indigo-500/15 to-purple-500/15 blur-3xl -z-10 rounded-full pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center px-4 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-semibold shadow-xs">
            <Sparkles className="h-3.5 w-3.5 text-indigo-500 animate-pulse" />
            <span>វេទិកាប្រឡង និងរៀនកូដភាសាខ្មែរដំបូងគេបង្អស់</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.25]">
            រៀនសរសេរកូដ <span className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">Python និង C++</span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            អភិវឌ្ឍជំនាញ Programming របស់អ្នកតាមរយៈលំហាត់ជាក់ស្តែង ការប្រឡងកំណត់ម៉ោង និងការប្រកួតប្រជែងថ្នាក់ជាតិ ជាមួយប្រព័ន្ធដំណើរការកូដប្រកបដោយសុវត្ថិភាព។
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              id="hero-btn-start-coding"
              onClick={() => {
                setPreferredLanguage('all');
                setCurrentView('problems');
              }}
              className="px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-indigo-600/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Play className="h-4 w-4 fill-white" />
              <span>ចាប់ផ្តើមរៀនកូដឥឡូវនេះ</span>
            </button>

            <button
              id="hero-btn-take-test"
              onClick={() => {
                setCurrentView('tests');
              }}
              className="px-6 py-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 hover:border-indigo-500 dark:hover:border-indigo-500 text-slate-800 dark:text-slate-200 font-semibold text-sm flex items-center gap-2 shadow-xs transition-all hover:scale-[1.02]"
            >
              <Clock className="h-4 w-4 text-indigo-500" />
              <span>ចូលរួមការប្រឡងសរសេរកូដ</span>
            </button>
          </div>

          {/* Quick Technology Chips */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <Terminal className="h-3.5 w-3.5 text-indigo-500" /> Python 3.11+
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <Cpu className="h-3.5 w-3.5 text-blue-500" /> C++17 (GCC)
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" /> Isolated Sandbox
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <Trophy className="h-3.5 w-3.5 text-amber-500" /> Real-time Leaderboard
            </span>
          </div>
        </div>
      </section>

      {/* 2. STATS OVERVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
                <Code2 className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  {problems.length}+
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">លំហាត់កូដសរុប</p>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">100%</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">កែដោយស្វ័យប្រវត្តិ</p>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">3 Roles</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">សិស្ស, គ្រូ, Admin</p>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
                <Trophy className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">2,500+</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">ការដាក់ស្នើកូដ</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. DUAL LANGUAGE TRACKS: PYTHON & C++ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              ជ្រើសរើសភាសាសម្រាប់ហាត់រៀន
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              ចាប់ផ្តើមជាមួយភាសាដែលអ្នកពេញចិត្ត ឬហាត់ទាំងពីរដើម្បីពង្រឹងជំនាញ
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Python Track Card */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-blue-50/70 to-indigo-50/30 dark:from-slate-900 dark:to-indigo-950/20 border border-blue-200/80 dark:border-slate-800 space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-lg shadow-md shadow-blue-500/20">
                  Py
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Python 3 សម្រាប់អ្នកចាប់ផ្តើម & Data
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {pythonCount} លំហាត់ • ងាយស្រួលយល់ • Syntax ស្អាត
                  </p>
                </div>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-300">
                ពេញនិយម
              </span>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                លំហាត់ណែនាំកំពូល៖
              </p>
              {pythonPopular.map((p) => (
                <div
                  key={p.id}
                  onClick={() => {
                    setSelectedProblemId(p.id);
                    setCurrentView('problem_detail');
                  }}
                  className="p-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between cursor-pointer hover:border-blue-400 dark:hover:border-blue-500 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-blue-600 dark:text-blue-400 font-bold">
                      #{p.id}
                    </span>
                    <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                      {p.titleKhmer}
                    </span>
                  </div>
                  <span className="text-[11px] px-2 py-0.5 rounded font-medium bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
                    +{p.points} ពិន្ទុ
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                setPreferredLanguage('python');
                setCurrentView('problems');
              }}
              className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>មើលលំហាត់ Python ទាំងអស់</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* C++ Track Card */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-purple-50/70 to-indigo-50/30 dark:from-slate-900 dark:to-purple-950/20 border border-purple-200/80 dark:border-slate-800 space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold text-lg shadow-md shadow-purple-500/20">
                  C++
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    C++17 សម្រាប់ Algorithms & CP
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {cppCount} លំហាត់ • ល្បឿនលឿនបំផុត • Memory Control
                  </p>
                </div>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900/60 dark:text-purple-300">
                Competitive
              </span>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                លំហាត់ណែនាំកំពូល៖
              </p>
              {cppPopular.map((p) => (
                <div
                  key={p.id}
                  onClick={() => {
                    setSelectedProblemId(p.id);
                    setCurrentView('problem_detail');
                  }}
                  className="p-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between cursor-pointer hover:border-purple-400 dark:hover:border-purple-500 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-purple-600 dark:text-purple-400 font-bold">
                      #{p.id}
                    </span>
                    <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                      {p.titleKhmer}
                    </span>
                  </div>
                  <span className="text-[11px] px-2 py-0.5 rounded font-medium bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
                    +{p.points} ពិន្ទុ
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                setPreferredLanguage('cpp');
                setCurrentView('problems');
              }}
              className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>មើលលំហាត់ C++ ទាំងអស់</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

        </div>
      </section>

      {/* 4. ACTIVE CODING TEST HIGHLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-r from-indigo-900 to-slate-900 text-white shadow-xl relative overflow-hidden">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/30 border border-indigo-400/40 text-indigo-200 text-xs font-semibold">
              <Flame className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
              <span>ការប្រឡងកំពុងបើកដំណើរការ (Active Test)</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold leading-tight">
              {activeTest.titleKhmer}
            </h3>

            <p className="text-sm text-slate-300">
              {activeTest.descriptionKhmer}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 pt-2">
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-indigo-400" />
                រយៈពេល: {activeTest.durationMinutes} នាទី
              </span>
              <span className="flex items-center gap-1.5">
                <Layers className="h-4 w-4 text-indigo-400" />
                សំណួរ: {activeTest.questions.length} សំណួរ
              </span>
              <span className="flex items-center gap-1.5">
                <Star className="h-4 w-4 text-amber-400" />
                ពិន្ទុអតិបរមា: {activeTest.maxScore} ពិន្ទុ
              </span>
            </div>

            <div className="pt-2">
              <button
                id="home-btn-take-active-test"
                onClick={() => {
                  setSelectedTestId(activeTest.id);
                  setCurrentView('test_taking');
                }}
                className="px-6 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition-transform hover:scale-[1.02]"
              >
                <span>ចូលរួមប្រឡងភ្លាមៗ (Start Test)</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. LEADERBOARD PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              តារាងចំណាត់ថ្នាក់សិស្សឆ្នើម (Leaderboard)
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              សិស្ស-និស្សិតដែលមានពិន្ទុខ្ពស់ជាងគេក្នុងការដោះស្រាយលំហាត់
            </p>
          </div>
          <button
            onClick={() => setCurrentView('leaderboard')}
            className="text-xs sm:text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
          >
            <span>មើលទាំងអស់</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
          <div className="divide-y divide-slate-100 dark:divide-slate-800/80">
            {leaderboard.slice(0, 4).map((entry) => (
              <div key={entry.userId} className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <div className="flex items-center gap-3.5">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                    entry.rank === 1 ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300' :
                    entry.rank === 2 ? 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300' :
                    entry.rank === 3 ? 'bg-amber-700/20 text-amber-800 dark:text-amber-400' :
                    'bg-slate-100 text-slate-600 dark:bg-slate-900 dark:text-slate-400'
                  }`}>
                    {entry.rank === 1 ? '🥇' : entry.rank === 2 ? '🥈' : entry.rank === 3 ? '🥉' : `#${entry.rank}`}
                  </div>
                  <img src={entry.avatar} alt={entry.khmerName} className="h-9 w-9 rounded-full object-cover" />
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-slate-100">
                      {entry.khmerName}
                    </p>
                    <p className="text-xs text-slate-500 font-mono">
                      {entry.userName} • ភាសាពេញចិត្ត: {entry.preferredLanguage.toUpperCase()}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
                    {entry.score} ពិន្ទុ
                  </span>
                  <p className="text-[11px] text-slate-400">
                    ជោគជ័យ {entry.solvedCount} លំហាត់
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

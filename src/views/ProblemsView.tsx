import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { Language, Difficulty } from '../types';
import { 
  Search, 
  Code2, 
  CheckCircle2, 
  Clock, 
  Cpu, 
  SlidersHorizontal,
  ChevronRight
} from 'lucide-react';

export const ProblemsView: React.FC = () => {
  const { 
    problems, 
    submissions, 
    currentUser, 
    preferredLanguage, 
    setPreferredLanguage, 
    setSelectedProblemId, 
    setCurrentView 
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | 'all'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Solved problem ids for this user
  const solvedProblemIds = useMemo(() => {
    return new Set(
      submissions
        .filter(s => s.userId === currentUser.id && s.status === 'accepted')
        .map(s => s.problemId)
    );
  }, [submissions, currentUser]);

  const categories = useMemo(() => {
    const set = new Set<string>();
    problems.forEach(p => set.add(p.category));
    return ['all', ...Array.from(set)];
  }, [problems]);

  const filteredProblems = useMemo(() => {
    return problems.filter(p => {
      // Language filter
      if (preferredLanguage !== 'all' && p.language !== preferredLanguage) {
        return false;
      }
      // Difficulty filter
      if (selectedDifficulty !== 'all' && p.difficulty !== selectedDifficulty) {
        return false;
      }
      // Category filter
      if (selectedCategory !== 'all' && p.category !== selectedCategory) {
        return false;
      }
      // Search
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchTitleKh = p.titleKhmer.toLowerCase().includes(query);
        const matchTitleEn = p.titleEnglish.toLowerCase().includes(query);
        const matchDesc = p.descriptionKhmer.toLowerCase().includes(query);
        const matchCategory = p.category.toLowerCase().includes(query);
        return matchTitleKh || matchTitleEn || matchDesc || matchCategory;
      }
      return true;
    });
  }, [problems, preferredLanguage, selectedDifficulty, selectedCategory, searchQuery]);

  const difficultyBadges: Record<Difficulty, { label: string; class: string }> = {
    easy: {
      label: 'ងាយ (Easy)',
      class: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
    },
    medium: {
      label: 'មធ្យម (Medium)',
      class: 'bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300 border-amber-200 dark:border-amber-800'
    },
    hard: {
      label: 'ពិបាក (Hard)',
      class: 'bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300 border-rose-200 dark:border-rose-800'
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            បញ្ជីលំហាត់សរសេរកូដ (Coding Problems)
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            សរុប {problems.length} លំហាត់ • បានដោះស្រាយជោគជ័យ {solvedProblemIds.size} លំហាត់
          </p>
        </div>

        {/* Language Quick Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 self-start md:self-auto">
          <button
            onClick={() => setPreferredLanguage('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              preferredLanguage === 'all'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            ទាំងអស់ ({problems.length})
          </button>
          <button
            onClick={() => setPreferredLanguage('python')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors ${
              preferredLanguage === 'python'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-blue-600'
            }`}
          >
            <Code2 className="h-3.5 w-3.5" />
            <span>Python ({problems.filter(p => p.language === 'python').length})</span>
          </button>
          <button
            onClick={() => setPreferredLanguage('cpp')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors ${
              preferredLanguage === 'cpp'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-purple-600'
            }`}
          >
            <Cpu className="h-3.5 w-3.5" />
            <span>C++ ({problems.filter(p => p.language === 'cpp').length})</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Search Input */}
        <div className="relative lg:col-span-2">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ស្វែងរកតាមចំណងជើង ឬពាក្យគន្លឹះ..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all placeholder:text-slate-400"
          />
        </div>

        {/* Difficulty Select */}
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-slate-400 shrink-0" />
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value as any)}
            className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">កម្រិតទាំងអស់ (All Difficulties)</option>
            <option value="easy">ងាយ (Easy)</option>
            <option value="medium">មធ្យម (Medium)</option>
            <option value="hard">ពិបាក (Hard)</option>
          </select>
        </div>

        {/* Category Select */}
        <div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">ប្រភេទទូទៅ (All Categories)</option>
            {categories.filter(c => c !== 'all').map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Problems List */}
      <div className="space-y-2.5">
        {filteredProblems.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
            <Code2 className="h-12 w-12 mx-auto text-slate-300 dark:text-slate-600 mb-3" />
            <p className="text-base font-bold text-slate-700 dark:text-slate-300">
              រកមិនឃើញលំហាត់ដែលអ្នកស្វែងរកទេ
            </p>
            <p className="text-xs text-slate-400 mt-1">
              សូមព្យាយាមផ្លាស់ប្តូរពាក្យស្វែងរក ឬ Reset Filter ឡើងវិញ
            </p>
          </div>
        ) : (
          filteredProblems.map((problem) => {
            const isSolved = solvedProblemIds.has(problem.id);
            return (
              <div
                key={problem.id}
                id={`problem-row-${problem.id}`}
                onClick={() => {
                  setSelectedProblemId(problem.id);
                  setCurrentView('problem_detail');
                }}
                className="group p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500 dark:hover:border-indigo-500 transition-all cursor-pointer shadow-xs hover:shadow-md flex items-center justify-between gap-4"
              >
                <div className="flex items-start sm:items-center gap-3.5">
                  {/* Status Checkbox */}
                  <div className="pt-0.5 sm:pt-0">
                    {isSolved ? (
                      <div className="p-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400" title="បានដោះស្រាយជោគជ័យ">
                        <CheckCircle2 className="h-4 w-4" />
                      </div>
                    ) : (
                      <div className="w-6 h-6 rounded-full border-2 border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-300 text-xs font-mono">
                        {problem.id.split('-')[1]}
                      </div>
                    )}
                  </div>

                  {/* Titles and tags */}
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {problem.titleKhmer}
                      </h3>
                      <span className="text-xs text-slate-400 font-mono hidden sm:inline">
                        ({problem.titleEnglish})
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 mt-1.5 text-xs text-slate-500 dark:text-slate-400">
                      <span className={`px-2 py-0.5 rounded-md font-semibold text-[11px] border ${
                        problem.language === 'python'
                          ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300 border-blue-200 dark:border-blue-900'
                          : 'bg-purple-50 text-purple-700 dark:bg-purple-950/50 dark:text-purple-300 border-purple-200 dark:border-purple-900'
                      }`}>
                        {problem.language === 'python' ? 'Python 3' : 'C++17'}
                      </span>

                      <span className={`px-2 py-0.5 rounded-md font-semibold text-[11px] border ${difficultyBadges[problem.difficulty].class}`}>
                        {difficultyBadges[problem.difficulty].label}
                      </span>

                      <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[11px] font-medium">
                        {problem.category}
                      </span>

                      <span className="hidden md:flex items-center gap-1 text-slate-400 text-[11px]">
                        <Clock className="h-3 w-3" /> {problem.timeLimitMs}ms
                      </span>
                    </div>
                  </div>
                </div>

                {/* Points & Arrow */}
                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right">
                    <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
                      +{problem.points} ពិន្ទុ
                    </span>
                    <p className="text-[10px] text-slate-400">
                      {problem.testCases.length} Test cases
                    </p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-slate-400 group-hover:text-indigo-500 group-hover:translate-x-0.5 transition-all" />
                </div>
              </div>
            );
          })
        )}
      </div>

    </div>
  );
};

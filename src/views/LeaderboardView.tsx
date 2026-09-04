import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Trophy, 
  Award, 
  Flame, 
  ArrowUp, 
  ArrowDown, 
  Minus, 
  Search, 
  Medal,
  Sparkles,
  Code2,
  Cpu
} from 'lucide-react';

export const LeaderboardView: React.FC = () => {
  const { leaderboard } = useApp();

  const [timeFilter, setTimeFilter] = useState<'weekly' | 'monthly' | 'all'>('all');
  const [langFilter, setLangFilter] = useState<'all' | 'python' | 'cpp'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEntries = useMemo(() => {
    return leaderboard.filter(entry => {
      if (langFilter !== 'all' && entry.preferredLanguage !== langFilter) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return entry.khmerName.toLowerCase().includes(q) || entry.userName.toLowerCase().includes(q);
      }
      return true;
    });
  }, [leaderboard, langFilter, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300 text-xs font-semibold">
          <Trophy className="h-3.5 w-3.5 text-amber-500" />
          <span>តារាងកិត្តិយសអ្នកសរសេរកូដកម្ពុជា</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
          តារាងចំណាត់ថ្នាក់ (Leaderboard)
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          ប្រកួតប្រជែងដោះស្រាយលំហាត់ សន្សំពិន្ទុ និងឈានទៅកាន់កំពូលអ្នកអភិវឌ្ឍន៍សូហ្វវែរឆ្នើម
        </p>
      </div>

      {/* Top 3 Podium Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 items-end">
        
        {/* Rank 2 (Silver) */}
        {filteredEntries[1] && (
          <div className="order-2 md:order-1 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-3 shadow-xs">
            <div className="relative inline-block">
              <img src={filteredEntries[1].avatar} alt={filteredEntries[1].khmerName} className="w-16 h-16 rounded-full object-cover ring-4 ring-slate-300 dark:ring-slate-700 mx-auto" />
              <div className="absolute -bottom-2 -right-1 w-6 h-6 rounded-full bg-slate-300 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center justify-center">
                🥈
              </div>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                {filteredEntries[1].khmerName}
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                {filteredEntries[1].userName}
              </p>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 font-bold text-slate-700 dark:text-slate-300 text-sm">
              {filteredEntries[1].score} ពិន្ទុ
            </div>
            <span className="text-[11px] text-slate-400">
              ដោះស្រាយបាន {filteredEntries[1].solvedCount} លំហាត់
            </span>
          </div>
        )}

        {/* Rank 1 (Gold) */}
        {filteredEntries[0] && (
          <div className="order-1 md:order-2 p-8 rounded-3xl bg-gradient-to-b from-amber-50 to-white dark:from-amber-950/20 dark:to-slate-900 border-2 border-amber-300 dark:border-amber-700/80 text-center space-y-4 shadow-xl md:-translate-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 text-xs font-bold">
              👑 ចំណាត់ថ្នាក់លេខ ១
            </div>
            <div className="relative inline-block">
              <img src={filteredEntries[0].avatar} alt={filteredEntries[0].khmerName} className="w-20 h-20 rounded-full object-cover ring-4 ring-amber-400 mx-auto" />
              <div className="absolute -bottom-2 -right-1 w-8 h-8 rounded-full bg-amber-400 text-slate-900 font-bold text-sm flex items-center justify-center shadow-md">
                🥇
              </div>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-lg">
                {filteredEntries[0].khmerName}
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                {filteredEntries[0].userName}
              </p>
            </div>
            <div className="p-3 rounded-2xl bg-amber-100/70 dark:bg-amber-950/50 font-extrabold text-amber-900 dark:text-amber-300 text-xl">
              {filteredEntries[0].score} ពិន្ទុ
            </div>
            <span className="text-xs text-slate-500 font-medium">
              ដោះស្រាយបាន {filteredEntries[0].solvedCount} លំហាត់
            </span>
          </div>
        )}

        {/* Rank 3 (Bronze) */}
        {filteredEntries[2] && (
          <div className="order-3 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-3 shadow-xs">
            <div className="relative inline-block">
              <img src={filteredEntries[2].avatar} alt={filteredEntries[2].khmerName} className="w-16 h-16 rounded-full object-cover ring-4 ring-amber-700/40 mx-auto" />
              <div className="absolute -bottom-2 -right-1 w-6 h-6 rounded-full bg-amber-700/30 text-amber-800 dark:text-amber-400 font-bold text-xs flex items-center justify-center">
                🥉
              </div>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                {filteredEntries[2].khmerName}
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                {filteredEntries[2].userName}
              </p>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 font-bold text-slate-700 dark:text-slate-300 text-sm">
              {filteredEntries[2].score} ពិន្ទុ
            </div>
            <span className="text-[11px] text-slate-400">
              ដោះស្រាយបាន {filteredEntries[2].solvedCount} លំហាត់
            </span>
          </div>
        )}

      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
        {/* Time filters */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 self-start sm:self-auto">
          <button
            onClick={() => setTimeFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
              timeFilter === 'all' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs' : 'text-slate-500'
            }`}
          >
            គ្រប់ពេល (All-time)
          </button>
          <button
            onClick={() => setTimeFilter('monthly')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
              timeFilter === 'monthly' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs' : 'text-slate-500'
            }`}
          >
            ប្រចាំខែ (Monthly)
          </button>
          <button
            onClick={() => setTimeFilter('weekly')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
              timeFilter === 'weekly' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs' : 'text-slate-500'
            }`}
          >
            ប្រចាំសប្តាហ៍ (Weekly)
          </button>
        </div>

        {/* Language & Search */}
        <div className="flex items-center gap-2">
          {/* Language filter */}
          <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setLangFilter('all')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${langFilter === 'all' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs' : 'text-slate-500'}`}
            >
              ទាំងអស់
            </button>
            <button
              onClick={() => setLangFilter('python')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${langFilter === 'python' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-500'}`}
            >
              Python
            </button>
            <button
              onClick={() => setLangFilter('cpp')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${langFilter === 'cpp' ? 'bg-purple-600 text-white shadow-xs' : 'text-slate-500'}`}
            >
              C++
            </button>
          </div>

          {/* Search box */}
          <div className="relative w-48">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ស្វែងរកឈ្មោះ..."
              className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 text-slate-500 font-bold uppercase tracking-wider">
              <th className="py-3.5 px-4 w-16 text-center">ចំណាត់ថ្នាក់</th>
              <th className="py-3.5 px-4">សិស្ស / អ្នកចូលរួម</th>
              <th className="py-3.5 px-4 hidden sm:table-cell">ភាសាពេញចិត្ត</th>
              <th className="py-3.5 px-4 text-center">លំហាត់ជោគជ័យ</th>
              <th className="py-3.5 px-4 text-right">ពិន្ទុសរុប</th>
              <th className="py-3.5 px-4 text-center w-20">និន្នាការ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
            {filteredEntries.map((entry, idx) => (
              <tr key={entry.userId} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <td className="py-3.5 px-4 text-center font-bold">
                  {idx === 0 ? '🥇 1' : idx === 1 ? '🥈 2' : idx === 2 ? '🥉 3' : `#${idx + 1}`}
                </td>
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-3">
                    <img src={entry.avatar} alt={entry.khmerName} className="h-8 w-8 rounded-full object-cover" />
                    <div>
                      <p className="font-bold text-slate-900 dark:text-slate-100">
                        {entry.khmerName}
                      </p>
                      <p className="text-[11px] text-slate-400 font-mono">
                        {entry.userName}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="py-3.5 px-4 hidden sm:table-cell">
                  <span className={`px-2 py-0.5 rounded-md font-mono font-bold text-[11px] ${
                    entry.preferredLanguage === 'python'
                      ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300'
                      : 'bg-purple-50 text-purple-700 dark:bg-purple-950/50 dark:text-purple-300'
                  }`}>
                    {entry.preferredLanguage.toUpperCase()}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-center font-bold text-slate-700 dark:text-slate-300">
                  {entry.solvedCount}
                </td>
                <td className="py-3.5 px-4 text-right font-extrabold text-indigo-600 dark:text-indigo-400 text-sm">
                  {entry.score}
                </td>
                <td className="py-3.5 px-4 text-center">
                  {entry.trend === 'up' && <ArrowUp className="h-4 w-4 text-emerald-500 mx-auto" />}
                  {entry.trend === 'down' && <ArrowDown className="h-4 w-4 text-rose-500 mx-auto" />}
                  {entry.trend === 'same' && <Minus className="h-4 w-4 text-slate-400 mx-auto" />}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

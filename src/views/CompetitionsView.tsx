import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Trophy, 
  Clock, 
  Users, 
  Calendar, 
  Award, 
  Flame, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export const CompetitionsView: React.FC = () => {
  const { setSelectedTestId, setCurrentView, showToast } = useApp();

  const competitions = [
    {
      id: 'comp-01',
      titleKhmer: 'ការប្រកួតកូដនិស្សិតកម្ពុជា Khmer Code Cup 2026 (រដូវកាលទី ១)',
      descKhmer: 'ការប្រកួតប្រជែងថ្នាក់ជាតិសម្រាប់សិស្ស-និស្សិតនៅកម្ពុជា ដោះស្រាយបញ្ហា Algorithms ៣ លំហាត់ក្នុងរយៈពេល ៩០ នាទី។',
      languages: 'Python 3 & C++17',
      duration: '90 នាទី',
      participantsCount: 342,
      prizePool: '1,500,000 រៀល + វិញ្ញាបនបត្រ',
      startDate: '១០ កញ្ញា ២០២៦ • ម៉ោង ២:០០ រសៀល',
      status: 'active',
      testIdRef: 'test-03'
    },
    {
      id: 'comp-02',
      titleKhmer: 'ការប្រឡងសាកល្បងអូឡាំពិកព័ត៌មានវិទ្យា (National Informatics Olympiad Mock)',
      descKhmer: 'វិញ្ញាសាស្តង់ដារ IOI កម្រិតវិទ្យាល័យ ផ្តោតលើ Dynamic Programming, Graph Theory និង Data Structures។',
      languages: 'C++17 (Strict GCC)',
      duration: '១៨០ នាទី',
      participantsCount: 128,
      prizePool: 'មេដាយមាស ប្រាក់ សំរឹទ្ធ',
      startDate: '២០ កញ្ញា ២០២៦ • ម៉ោង ៨:៣០ ព្រឹក',
      status: 'upcoming',
      testIdRef: 'test-02'
    },
    {
      id: 'comp-03',
      titleKhmer: 'Python Speed Code Challenge #8',
      descKhmer: 'ការប្រកួតល្បឿនសរសេរកូដ Python ឆាប់រហ័ស ស្អាត និងមានប្រសិទ្ធភាពខ្ពស់ ៥ លំហាត់ក្នុងរយៈពេល ៤៥ នាទី។',
      languages: 'Python 3.11',
      duration: '៤៥ នាទី',
      participantsCount: 215,
      prizePool: '500,000 រៀល + Course Pro',
      startDate: '០២ តុលា ២០២៦ • ម៉ោង ៧:០០ យប់',
      status: 'upcoming',
      testIdRef: 'test-01'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300 text-xs font-semibold">
          <Trophy className="h-3.5 w-3.5 text-amber-500" />
          <span>ការប្រកួតប្រជែងសរសេរកូដថ្នាក់ជាតិ</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
          ការប្រកួតសរសេរកូដ (Programming Competitions)
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          ចូលរួមប្រកួតដើម្បីឈ្នះរង្វាន់ មេដាយកិត្តិយស និងកសាង Portfolio ដ៏លេចធ្លោសម្រាប់អាជីព Software Engineer
        </p>
      </div>

      {/* Competitions Cards */}
      <div className="space-y-6">
        {competitions.map((comp) => {
          const isActive = comp.status === 'active';
          return (
            <div
              key={comp.id}
              className={`p-6 sm:p-8 rounded-3xl border transition-all ${
                isActive
                  ? 'border-indigo-500/80 bg-gradient-to-br from-indigo-50/50 via-white to-white dark:from-indigo-950/20 dark:via-slate-900 dark:to-slate-900 shadow-lg'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                
                <div className="space-y-4 max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                      isActive
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800 animate-pulse'
                        : 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800'
                    }`}>
                      {isActive ? '● កំពុងប្រកួត (LIVE)' : '⏳ ជិតមកដល់'}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                      {comp.languages}
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                    {comp.titleKhmer}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {comp.descKhmer}
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2 text-xs text-slate-600 dark:text-slate-400">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-indigo-500" />
                      <span>ថិរវេលា: <strong>{comp.duration}</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-indigo-500" />
                      <span>បេក្ខជន: <strong>{comp.participantsCount} នាក់</strong></span>
                    </div>
                    <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                      <Award className="h-4 w-4 text-amber-500" />
                      <span>រង្វាន់: <strong>{comp.prizePool}</strong></span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>កាលបរិច្ឆេទ: {comp.startDate}</span>
                  </div>
                </div>

                {/* Right action */}
                <div className="shrink-0 flex flex-col items-start lg:items-end justify-center gap-3">
                  <button
                    onClick={() => {
                      if (isActive) {
                        setSelectedTestId(comp.testIdRef);
                        setCurrentView('test_taking');
                      } else {
                        showToast('អ្នកបានចុះឈ្មោះចូលរួមការប្រកួតនេះរួចរាល់ហើយ!', 'success');
                      }
                    }}
                    className={`px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all hover:scale-[1.02] ${
                      isActive
                        ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-600/25'
                        : 'bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:border-indigo-500 text-slate-800 dark:text-slate-200'
                    }`}
                  >
                    <span>{isActive ? 'ចូលរួមការប្រកួតភ្លាមៗ (Join Contest)' : 'ចុះឈ្មោះចូលរួម (Register)'}</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  <p className="text-[11px] text-slate-400 text-right">
                    ✓ ច្បាប់ប្រកួតស្តង់ដារ ICPC & IOI
                  </p>
                </div>

              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};

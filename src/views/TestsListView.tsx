import React from 'react';
import { useApp } from '../context/AppContext';
import { CodingTest } from '../types';
import { 
  BookOpen, 
  Clock, 
  Award, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  Layers, 
  Code2, 
  PlusCircle 
} from 'lucide-react';

export const TestsListView: React.FC = () => {
  const { tests, setSelectedTestId, setCurrentView, currentRole } = useApp();

  const handleStartTest = (testId: string) => {
    setSelectedTestId(testId);
    setCurrentView('test_taking');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            ការប្រឡង និងតេស្តសមត្ថភាព (Coding Tests)
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            ចូលរួមប្រឡងកំណត់ពេលវេលាពិតប្រាកដ ដើម្បីវាស់ស្ទង់សមត្ថភាពសរសេរកូដ និងទទួលបានពិន្ទុវិញ្ញាបនបត្រ
          </p>
        </div>

        {/* Teacher / Admin Action */}
        {(currentRole === 'teacher' || currentRole === 'admin') && (
          <button
            onClick={() => setCurrentView('dashboard')}
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-2 shadow-sm self-start sm:self-auto transition-colors"
          >
            <PlusCircle className="h-4 w-4" />
            <span>បង្កើតការប្រឡងថ្មី</span>
          </button>
        )}
      </div>

      {/* Tests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tests.map((test) => {
          const isActive = test.status === 'active';
          const isUpcoming = test.status === 'upcoming';
          return (
            <div
              key={test.id}
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 flex flex-col justify-between space-y-5 shadow-xs hover:shadow-md hover:border-indigo-500 dark:hover:border-indigo-500 transition-all"
            >
              <div className="space-y-3">
                {/* Status & Language */}
                <div className="flex items-center justify-between">
                  <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
                    isActive 
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800' 
                      : isUpcoming
                      ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800'
                      : 'bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400'
                  }`}>
                    {isActive ? '● កំពុងបើកប្រឡង' : isUpcoming ? '⏳ ជិតចាប់ផ្តើម' : 'បានបញ្ចប់'}
                  </span>

                  <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300 font-mono">
                    {test.language === 'both' ? 'Python & C++' : test.language.toUpperCase()}
                  </span>
                </div>

                {/* Title & Description */}
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white line-clamp-2">
                  {test.titleKhmer}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                  {test.descriptionKhmer}
                </p>

                {/* Meta details */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 grid grid-cols-2 gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-indigo-500" />
                    <span>ថិរវេលា: <strong>{test.durationMinutes} នាទី</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Layers className="h-3.5 w-3.5 text-indigo-500" />
                    <span>សំណួរ: <strong>{test.questions.length}</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Award className="h-3.5 w-3.5 text-amber-500" />
                    <span>ពិន្ទុសរុប: <strong>{test.maxScore}</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                    <span>ពិន្ទុជាប់: <strong>{test.passingScore}</strong></span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  id={`btn-start-test-${test.id}`}
                  onClick={() => handleStartTest(test.id)}
                  className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
                >
                  <span>ចូលប្រឡង (Start Test)</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};

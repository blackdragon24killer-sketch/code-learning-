import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { HomeView } from './views/HomeView';
import { ProblemsView } from './views/ProblemsView';
import { ProblemDetailView } from './views/ProblemDetailView';
import { TestsListView } from './views/TestsListView';
import { TestTakingView } from './views/TestTakingView';
import { CompetitionsView } from './views/CompetitionsView';
import { LeaderboardView } from './views/LeaderboardView';
import { DashboardView } from './views/DashboardView';
import { AuthModal } from './components/AuthModal';
import { ToastContainer } from './components/ToastContainer';
import { Code2, Heart, Sparkles } from 'lucide-react';

const MainContent: React.FC = () => {
  const { currentView, setCurrentView } = useApp();

  const isFullScreenView = currentView === 'problem_detail' || currentView === 'test_taking';

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <Navbar />

      <main className="flex-1">
        {currentView === 'home' && <HomeView />}
        {currentView === 'problems' && <ProblemsView />}
        {currentView === 'problem_detail' && <ProblemDetailView />}
        {currentView === 'tests' && <TestsListView />}
        {currentView === 'test_taking' && <TestTakingView />}
        {currentView === 'competitions' && <CompetitionsView />}
        {currentView === 'leaderboard' && <LeaderboardView />}
        {currentView === 'dashboard' && <DashboardView />}
      </main>

      {!isFullScreenView && (
        <footer className="border-t border-slate-200 dark:border-slate-800/80 bg-white/70 dark:bg-slate-950/70 backdrop-blur-md py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                <Code2 className="h-3.5 w-3.5" />
              </div>
              <span className="font-bold text-slate-800 dark:text-slate-200">
                Khmer Code Test
              </span>
              <span>• វេទិកាប្រឡង និងរៀនកូដកម្ពុជា</span>
            </div>

            <div className="flex items-center gap-4">
              <button onClick={() => setCurrentView('problems')} className="hover:text-indigo-600">
                បញ្ជីលំហាត់
              </button>
              <button onClick={() => setCurrentView('tests')} className="hover:text-indigo-600">
                ការប្រឡង
              </button>
              <button onClick={() => setCurrentView('leaderboard')} className="hover:text-indigo-600">
                តារាងចំណាត់ថ្នាក់
              </button>
            </div>

            <div className="flex items-center gap-1">
              <span>បង្កើតឡើងសម្រាប់សិស្ស-និស្សិតកម្ពុជា</span>
              <Heart className="h-3 w-3 text-rose-500 fill-rose-500 inline" />
            </div>
          </div>
        </footer>
      )}

      <AuthModal />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}

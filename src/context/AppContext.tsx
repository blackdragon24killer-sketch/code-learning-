import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole, Problem, CodingTest, Submission, LeaderboardEntry, Language } from '../types';
import { initialProblems } from '../data/problemsData';
import { initialUsers, initialTests, initialSubmissions, initialLeaderboard } from '../data/initialData';

export type ActiveView = 
  | 'home' 
  | 'problems' 
  | 'playground'
  | 'problem_detail' 
  | 'tests' 
  | 'test_taking' 
  | 'competitions' 
  | 'leaderboard' 
  | 'dashboard';

interface Toast {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

interface AppContextType {
  currentUser: User;
  users: User[];
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  setCurrentUser: (user: User) => void;
  switchRoleQuickly: (role: UserRole) => void;
  
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  
  currentView: ActiveView;
  setCurrentView: (view: ActiveView) => void;
  selectedProblemId: string | null;
  setSelectedProblemId: (id: string | null) => void;
  selectedTestId: string | null;
  setSelectedTestId: (id: string | null) => void;
  
  preferredLanguage: Language | 'all';
  setPreferredLanguage: (lang: Language | 'all') => void;
  
  problems: Problem[];
  addProblem: (p: Problem) => void;
  updateProblem: (p: Problem) => void;
  deleteProblem: (id: string) => void;
  
  tests: CodingTest[];
  addTest: (t: CodingTest) => void;
  updateTest: (t: CodingTest) => void;
  
  submissions: Submission[];
  addSubmission: (sub: Submission) => void;
  
  leaderboard: LeaderboardEntry[];
  
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  authModalMode: 'login' | 'register';
  setAuthModalMode: (mode: 'login' | 'register') => void;
  loginUser: (email: string, role: UserRole) => boolean;
  registerUser: (name: string, khmerName: string, email: string, role: UserRole) => void;
  logoutUser: () => void;
  
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme setup
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('kct_theme');
    return (saved === 'light' || saved === 'dark') ? saved : 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('kct_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Users & Roles
  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('kct_users');
    return saved ? JSON.parse(saved) : initialUsers;
  });

  const [currentUser, setCurrentUser] = useState<User>(() => {
    const saved = localStorage.getItem('kct_current_user');
    return saved ? JSON.parse(saved) : initialUsers[0]; // Sok Piseth (Student)
  });

  const [currentRole, setCurrentRole] = useState<UserRole>(currentUser.role);

  // Navigation
  const [currentView, setCurrentView] = useState<ActiveView>('home');
  const [selectedProblemId, setSelectedProblemId] = useState<string | null>('py-01');
  const [selectedTestId, setSelectedTestId] = useState<string | null>(null);
  const [preferredLanguage, setPreferredLanguage] = useState<Language | 'all'>('all');

  // Problems
  const [problems, setProblems] = useState<Problem[]>(() => {
    const saved = localStorage.getItem('kct_problems');
    return saved ? JSON.parse(saved) : initialProblems;
  });

  // Tests
  const [tests, setTests] = useState<CodingTest[]>(() => {
    const saved = localStorage.getItem('kct_tests');
    return saved ? JSON.parse(saved) : initialTests;
  });

  // Submissions
  const [submissions, setSubmissions] = useState<Submission[]>(() => {
    const saved = localStorage.getItem('kct_submissions');
    return saved ? JSON.parse(saved) : initialSubmissions;
  });

  // Leaderboard
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>(() => {
    const saved = localStorage.getItem('kct_leaderboard');
    return saved ? JSON.parse(saved) : initialLeaderboard;
  });

  // Auth modal
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');

  // Toasts
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, type, message }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('kct_current_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('kct_problems', JSON.stringify(problems));
  }, [problems]);

  useEffect(() => {
    localStorage.setItem('kct_tests', JSON.stringify(tests));
  }, [tests]);

  useEffect(() => {
    localStorage.setItem('kct_submissions', JSON.stringify(submissions));
  }, [submissions]);

  // Quick Switcher between Student, Teacher, Admin
  const switchRoleQuickly = (role: UserRole) => {
    const userForRole = users.find(u => u.role === role);
    if (userForRole) {
      setCurrentUser(userForRole);
      setCurrentRole(role);
      showToast(`បានប្តូរទៅកាន់តួនាទី: ${role === 'student' ? 'សិស្ស' : role === 'teacher' ? 'គ្រូបង្រៀន' : 'អ្នកគ្រប់គ្រង'} (${userForRole.khmerName})`, 'info');
    }
  };

  const addProblem = (p: Problem) => {
    setProblems(prev => [p, ...prev]);
    showToast('បានបង្កើតលំហាត់ថ្មីដោយជោគជ័យ!', 'success');
  };

  const updateProblem = (p: Problem) => {
    setProblems(prev => prev.map(item => item.id === p.id ? p : item));
    showToast('បានកែប្រែលំហាត់ដោយជោគជ័យ!', 'success');
  };

  const deleteProblem = (id: string) => {
    setProblems(prev => prev.filter(p => p.id !== id));
    showToast('បានលុបលំហាត់ដោយជោគជ័យ!', 'info');
  };

  const addTest = (t: CodingTest) => {
    setTests(prev => [t, ...prev]);
    showToast('បានបង្កើតការប្រឡងថ្មីដោយជោគជ័យ!', 'success');
  };

  const updateTest = (t: CodingTest) => {
    setTests(prev => prev.map(item => item.id === t.id ? t : item));
    showToast('បានកែប្រែការប្រឡងដោយជោគជ័យ!', 'success');
  };

  const addSubmission = (sub: Submission) => {
    setSubmissions(prev => [sub, ...prev]);
    if (sub.status === 'accepted') {
      // update user score
      setCurrentUser(prev => ({
        ...prev,
        score: prev.score + 20,
        solvedCount: prev.solvedCount + 1
      }));
    }
  };

  const loginUser = (email: string, role: UserRole) => {
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (user) {
      setCurrentUser(user);
      setCurrentRole(user.role);
      setIsAuthModalOpen(false);
      showToast(`សូមស្វាគមន៍ការត្រឡប់មកវិញ ${user.khmerName}!`, 'success');
      return true;
    } else {
      // Mock login as role
      const newUser: User = {
        id: `user-${Date.now()}`,
        name: email.split('@')[0],
        khmerName: email.split('@')[0],
        email,
        role,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
        score: 100,
        solvedCount: 5,
        streakDays: 1,
        rank: users.length + 1,
        createdAt: new Date().toISOString()
      };
      setUsers(prev => [...prev, newUser]);
      setCurrentUser(newUser);
      setCurrentRole(role);
      setIsAuthModalOpen(false);
      showToast(`សូមស្វាគមន៍ ${newUser.khmerName}!`, 'success');
      return true;
    }
  };

  const registerUser = (name: string, khmerName: string, email: string, role: UserRole) => {
    const newUser: User = {
      id: `user-${Date.now()}`,
      name,
      khmerName: khmerName || name,
      email,
      role,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      score: 50,
      solvedCount: 1,
      streakDays: 1,
      rank: users.length + 1,
      createdAt: new Date().toISOString()
    };
    setUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);
    setCurrentRole(role);
    setIsAuthModalOpen(false);
    showToast(`បានចុះឈ្មោះគណនីជោគជ័យ! សូមស្វាគមន៍ ${newUser.khmerName}`, 'success');
  };

  const logoutUser = () => {
    // switch to first guest/default student
    setCurrentUser(initialUsers[0]);
    setCurrentRole('student');
    showToast('បានចាកចេញពីគណនី', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        users,
        currentRole,
        setCurrentRole,
        setCurrentUser,
        switchRoleQuickly,
        theme,
        toggleTheme,
        currentView,
        setCurrentView,
        selectedProblemId,
        setSelectedProblemId,
        selectedTestId,
        setSelectedTestId,
        preferredLanguage,
        setPreferredLanguage,
        problems,
        addProblem,
        updateProblem,
        deleteProblem,
        tests,
        addTest,
        updateTest,
        submissions,
        addSubmission,
        leaderboard,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authModalMode,
        setAuthModalMode,
        loginUser,
        registerUser,
        logoutUser,
        toasts,
        showToast,
        removeToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

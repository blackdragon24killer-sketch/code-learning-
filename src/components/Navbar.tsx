import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';
import { 
  Code2, 
  BookOpen, 
  Award, 
  Trophy, 
  LayoutDashboard, 
  Sun, 
  Moon, 
  Menu, 
  X, 
  User as UserIcon, 
  LogOut, 
  ShieldCheck, 
  GraduationCap, 
  UserCheck, 
  ChevronDown,
  Sparkles,
  Play,
  Terminal
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    currentUser, 
    currentRole, 
    switchRoleQuickly, 
    theme, 
    toggleTheme, 
    currentView, 
    setCurrentView,
    setIsAuthModalOpen,
    setAuthModalMode,
    logoutUser
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', labelKhmer: 'ទំព័រដើម', icon: Sparkles },
    { id: 'problems', labelKhmer: 'ហាត់សរសេរកូដ', icon: Code2 },
    { id: 'playground', labelKhmer: 'តេស្តកូដ', icon: Play, badge: 'Live' },
    { id: 'tests', labelKhmer: 'ប្រឡងសរសេរកូដ', icon: BookOpen },
    { id: 'competitions', labelKhmer: 'ការប្រកួត', icon: Trophy },
    { id: 'leaderboard', labelKhmer: 'តារាងចំណាត់ថ្នាក់', icon: Award },
    { id: 'dashboard', labelKhmer: 'ផ្ទាំងគ្រប់គ្រង', icon: LayoutDashboard },
  ];

  const roleLabels: Record<UserRole, { label: string; icon: any; badgeClass: string }> = {
    student: {
      label: 'សិស្ស (Student)',
      icon: GraduationCap,
      badgeClass: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 border-blue-200 dark:border-blue-800'
    },
    teacher: {
      label: 'គ្រូបង្រៀន (Teacher)',
      icon: UserCheck,
      badgeClass: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
    },
    admin: {
      label: 'អ្នកគ្រប់គ្រង (Admin)',
      icon: ShieldCheck,
      badgeClass: 'bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300 border-purple-200 dark:border-purple-800'
    }
  };

  const handleRoleSelect = (role: UserRole) => {
    switchRoleQuickly(role);
    setRoleDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div 
          onClick={() => setCurrentView('home')} 
          className="flex items-center gap-2.5 cursor-pointer select-none group"
          id="nav-brand-logo"
        >
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/25 group-hover:scale-105 transition-transform">
            <Code2 className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                Khmer Code Test
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                PRO
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 -mt-0.5 font-medium">
              វេទិកាប្រឡង និងហាត់រៀនកូដ Python & C++
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-0.5 lg:gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => setCurrentView(item.id as any)}
                className={`px-2.5 lg:px-3 py-1.5 lg:py-2 rounded-lg text-xs lg:text-sm font-medium transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400 font-semibold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900/60'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{item.labelKhmer}</span>
                {item.badge && (
                  <span className="hidden xl:inline text-[9px] uppercase font-bold tracking-wider px-1 py-0.2 rounded bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Section: Role Switcher, Theme Toggle, Auth */}
        <div className="flex items-center gap-2.5">
          
          {/* Quick Role Switcher */}
          <div className="relative">
            <button
              id="btn-role-switcher"
              onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
              className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold border ${roleLabels[currentRole].badgeClass} transition-colors`}
              title="ចុចដើម្បីប្តូរតួនាទីសាកល្បង (Student, Teacher, Admin)"
            >
              {React.createElement(roleLabels[currentRole].icon, { className: "h-3.5 w-3.5" })}
              <span>{roleLabels[currentRole].label}</span>
              <ChevronDown className="h-3 w-3 opacity-70" />
            </button>

            {roleDropdownOpen && (
              <div 
                className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150"
                id="role-dropdown-menu"
              >
                <div className="px-3 py-1 text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  ប្តូរតួនាទីសាកល្បង (Test Roles)
                </div>
                {(['student', 'teacher', 'admin'] as UserRole[]).map(role => (
                  <button
                    key={role}
                    onClick={() => handleRoleSelect(role)}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors ${
                      currentRole === role ? 'font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50/50 dark:bg-indigo-950/40' : 'text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {React.createElement(roleLabels[role].icon, { className: "h-4 w-4" })}
                      <span>{roleLabels[role].label}</span>
                    </div>
                    {currentRole === role && <span className="text-indigo-600 dark:text-indigo-400">✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Theme Toggle Button */}
          <button
            id="btn-theme-toggle"
            onClick={toggleTheme}
            className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
            title={theme === 'dark' ? 'ប្តូរទៅ Light Mode' : 'ប្តូរទៅ Dark Mode'}
            aria-label="ប្តូរពន្លឺ"
          >
            {theme === 'dark' ? (
              <Sun className="h-4 w-4 text-amber-400 hover:rotate-45 transition-transform" />
            ) : (
              <Moon className="h-4 w-4 text-slate-600 hover:-rotate-12 transition-transform" />
            )}
          </button>

          {/* User Profile / Menu */}
          <div className="relative">
            <button
              id="btn-user-menu"
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-900 border border-slate-200/80 dark:border-slate-800 transition-all"
            >
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="h-7 w-7 rounded-lg object-cover ring-1 ring-indigo-500/20"
              />
              <div className="hidden lg:block text-left text-xs pr-1">
                <p className="font-semibold text-slate-800 dark:text-slate-200 leading-none">
                  {currentUser.khmerName}
                </p>
                <p className="text-[10px] text-indigo-600 dark:text-indigo-400 font-medium leading-none mt-1">
                  {currentUser.score} ពិន្ទុ
                </p>
              </div>
            </button>

            {userMenuOpen && (
              <div 
                className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl p-2 z-50 animate-in fade-in duration-150"
                id="user-profile-menu"
              >
                <div className="p-3 border-b border-slate-100 dark:border-slate-800/80 mb-1">
                  <p className="text-sm font-bold text-slate-900 dark:text-slate-100">
                    {currentUser.khmerName}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-mono truncate">
                    {currentUser.email}
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <span className={`text-[11px] px-2 py-0.5 rounded-md font-semibold border ${roleLabels[currentRole].badgeClass}`}>
                      {roleLabels[currentRole].label}
                    </span>
                    <span className="text-[11px] font-bold text-amber-500 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded-md border border-amber-200 dark:border-amber-900">
                      ★ {currentUser.score} ពិន្ទុ
                    </span>
                  </div>
                </div>

                <button
                  id="menu-btn-dashboard"
                  onClick={() => {
                    setCurrentView('dashboard');
                    setUserMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                >
                  <LayoutDashboard className="h-4 w-4 text-indigo-500" />
                  <span>ផ្ទាំងគ្រប់គ្រង ({roleLabels[currentRole].label})</span>
                </button>

                <button
                  id="menu-btn-switch-account"
                  onClick={() => {
                    setAuthModalMode('login');
                    setIsAuthModalOpen(true);
                    setUserMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                >
                  <UserIcon className="h-4 w-4 text-slate-500" />
                  <span>ប្តូរ ឬចូលគណនីផ្សេង</span>
                </button>

                <div className="border-t border-slate-100 dark:border-slate-800 my-1" />

                <button
                  id="menu-btn-logout"
                  onClick={() => {
                    logoutUser();
                    setUserMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-lg transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span>ចាកចេញ (Logout)</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            id="btn-mobile-menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 pt-2 pb-6 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentView(item.id as any);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400 font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="h-5 w-5" />
                  <span>{item.labelKhmer}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-3 border-t border-slate-200 dark:border-slate-800">
            <p className="text-xs font-bold text-slate-400 mb-2">ប្តូរតួនាទីសាកល្បង</p>
            <div className="grid grid-cols-3 gap-1.5">
              {(['student', 'teacher', 'admin'] as UserRole[]).map(role => (
                <button
                  key={role}
                  onClick={() => {
                    switchRoleQuickly(role);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-xs py-2 px-1 text-center rounded-lg border font-semibold ${
                    currentRole === role 
                      ? 'bg-indigo-600 text-white border-indigo-600' 
                      : 'bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800'
                  }`}
                >
                  {role === 'student' ? 'សិស្ស' : role === 'teacher' ? 'គ្រូបង្រៀន' : 'Admin'}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

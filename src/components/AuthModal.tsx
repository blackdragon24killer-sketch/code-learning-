import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';
import { X, Code2, Lock, Mail, User as UserIcon } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, authModalMode, setAuthModalMode, loginUser, registerUser } = useApp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [khmerName, setKhmerName] = useState('');
  const [role, setRole] = useState<UserRole>('student');

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authModalMode === 'login') {
      loginUser(email, role);
    } else {
      registerUser(name, khmerName, email, role);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6 relative">
        
        {/* Close Button */}
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute right-5 top-5 p-1.5 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-indigo-600/30">
            <Code2 className="h-6 w-6" />
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
            {authModalMode === 'login' ? 'ចូលគណនី (Login)' : 'ចុះឈ្មោះគណនីថ្មី (Register)'}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            វេទិកាហាត់រៀន និងប្រឡងកូដ Khmer Code Test
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          
          {authModalMode === 'register' && (
            <>
              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  ឈ្មោះជាភាសាខ្មែរ (Khmer Name) *
                </label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={khmerName}
                    onChange={(e) => setKhmerName(e.target.value)}
                    placeholder="ឧ. សុខ ពិសិដ្ឋ"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  ឈ្មោះជាឡាតាំង (English Name)
                </label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Sok Piseth"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
              អ៊ីមែល (Email) *
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="piseth.sok@khmercode.edu.kh"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
              ពាក្យសម្ងាត់ (Password) *
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
              ជ្រើសរើសតួនាទី (Role)
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as UserRole)}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-indigo-500"
            >
              <option value="student">សិស្ស (Student)</option>
              <option value="teacher">គ្រូបង្រៀន (Teacher)</option>
              <option value="admin">អ្នកគ្រប់គ្រង (Admin)</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/25 transition-all"
          >
            {authModalMode === 'login' ? 'ចូលគណនី' : 'ចុះឈ្មោះ'}
          </button>
        </form>

        <div className="text-center text-xs text-slate-500">
          {authModalMode === 'login' ? (
            <span>
              មិនទាន់មានគណនីមែនទេ?{' '}
              <button
                onClick={() => setAuthModalMode('register')}
                className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                ចុះឈ្មោះនៅទីនេះ
              </button>
            </span>
          ) : (
            <span>
              មានគណនីរួចហើយ?{' '}
              <button
                onClick={() => setAuthModalMode('login')}
                className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                ចូលគណនី
              </button>
            </span>
          )}
        </div>

      </div>
    </div>
  );
};

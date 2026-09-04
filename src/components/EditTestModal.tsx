import React, { useState, useEffect } from 'react';
import { CodingTest, Language } from '../types';
import { X, Save, FileSpreadsheet, Clock, Award, ShieldAlert } from 'lucide-react';

interface EditTestModalProps {
  isOpen: boolean;
  test: CodingTest | null;
  onClose: () => void;
  onSave: (updatedTest: CodingTest) => void;
}

export const EditTestModal: React.FC<EditTestModalProps> = ({
  isOpen,
  test,
  onClose,
  onSave
}) => {
  const [titleKhmer, setTitleKhmer] = useState('');
  const [descriptionKhmer, setDescriptionKhmer] = useState('');
  const [language, setLanguage] = useState<Language | 'both'>('python');
  const [durationMinutes, setDurationMinutes] = useState(30);
  const [passingScore, setPassingScore] = useState(60);
  const [status, setStatus] = useState<'active' | 'upcoming' | 'ended'>('active');

  useEffect(() => {
    if (test) {
      setTitleKhmer(test.titleKhmer || '');
      setDescriptionKhmer(test.descriptionKhmer || '');
      setLanguage(test.language || 'python');
      setDurationMinutes(test.durationMinutes || 30);
      setPassingScore(test.passingScore || 60);
      setStatus(test.status || 'active');
    }
  }, [test, isOpen]);

  if (!isOpen || !test) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titleKhmer.trim()) {
      alert('សូមបញ្ចូលចំណងជើងការប្រឡង!');
      return;
    }

    const updated: CodingTest = {
      ...test,
      titleKhmer,
      descriptionKhmer,
      language,
      durationMinutes: Number(durationMinutes),
      passingScore: Number(passingScore),
      status
    };

    onSave(updated);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950/50">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
              <FileSpreadsheet className="h-5 w-5" />
            </span>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                កែប្រែការប្រឡង: {test.id}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                កែប្រែព័ត៌មានលម្អិត និងកំណត់ពេលប្រឡង
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs sm:text-sm overflow-y-auto">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              ចំណងជើងការប្រឡង (ភាសាខ្មែរ) *
            </label>
            <input
              type="text"
              required
              value={titleKhmer}
              onChange={(e) => setTitleKhmer(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              ការពិពណ៌នាអំពីការប្រឡង
            </label>
            <textarea
              rows={3}
              value={descriptionKhmer}
              onChange={(e) => setDescriptionKhmer(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                ភាសាកូដកំណត់ (Language)
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="python">Python</option>
                <option value="cpp">C++</option>
                <option value="both">ទាំងពីរ (Python & C++)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                ស្ថានភាពប្រឡង (Status)
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="active">កំពុងដំណើរការ (Active)</option>
                <option value="upcoming">ជិតមកដល់ (Upcoming)</option>
                <option value="ended">បានបញ្ចប់ (Ended)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1">
                <Clock className="h-3.5 w-3.5 text-slate-400" />
                <span>ថិរវេលាធ្វើតេស្ត (នាទី)</span>
              </label>
              <input
                type="number"
                min={5}
                max={300}
                value={durationMinutes}
                onChange={(e) => setDurationMinutes(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1">
                <Award className="h-3.5 w-3.5 text-slate-400" />
                <span>ពិន្ទុជាប់អប្បបរមា (Passing Score)</span>
              </label>
              <input
                type="number"
                min={0}
                max={test.maxScore || 100}
                value={passingScore}
                onChange={(e) => setPassingScore(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              បោះបង់
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold flex items-center gap-2 shadow-sm transition"
            >
              <Save className="h-4 w-4" />
              <span>រក្សាទុកការកែប្រែ</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

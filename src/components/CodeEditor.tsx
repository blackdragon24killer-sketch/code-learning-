import React, { useState, useEffect } from 'react';
import Editor, { loader } from '@monaco-editor/react';
import { Language } from '../types';
import { RotateCcw, Copy, Check, Terminal, Type } from 'lucide-react';

interface CodeEditorProps {
  code: string;
  onChange: (value: string) => void;
  language: Language;
  onRun?: () => void;
  onSubmit?: () => void;
  onReset?: () => void;
  theme: 'dark' | 'light';
  readOnly?: boolean;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  code,
  onChange,
  language,
  onReset,
  theme,
  readOnly = false
}) => {
  const [copied, setCopied] = useState(false);
  const [fontSize, setFontSize] = useState(14);
  const [isMonacoLoaded, setIsMonacoLoaded] = useState(false);

  const monacoLanguage = language === 'cpp' ? 'cpp' : 'python';
  const monacoTheme = theme === 'dark' ? 'vs-dark' : 'light';

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
      {/* Editor Top Bar */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 text-xs">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 font-mono font-semibold px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-900/60">
            <Terminal className="h-3.5 w-3.5" />
            <span>{language === 'python' ? 'Python 3' : 'C++17 (g++)'}</span>
          </div>
          <span className="hidden sm:inline text-slate-400 dark:text-slate-500 font-sans text-[11px]">
            {readOnly ? '(មើលតែប៉ុណ្ណោះ / Read-Only)' : 'Ctrl + Enter ដើម្បីដំណើរការកូដ'}
          </span>
        </div>

        <div className="flex items-center gap-1">
          {/* Font Size controls */}
          <div className="hidden sm:flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-slate-200/50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300">
            <Type className="h-3 w-3 opacity-60" />
            <button
              onClick={() => setFontSize(prev => Math.max(11, prev - 1))}
              className="px-1 hover:text-indigo-600 font-mono text-xs"
              title="បង្រួមអក្សរ"
            >
              -
            </button>
            <span className="font-mono text-[11px] px-0.5">{fontSize}</span>
            <button
              onClick={() => setFontSize(prev => Math.min(22, prev + 1))}
              className="px-1 hover:text-indigo-600 font-mono text-xs"
              title="ពង្រីកអក្សរ"
            >
              +
            </button>
          </div>

          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className="p-1.5 rounded-md hover:bg-slate-200/70 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors"
            title="ចម្លងកូដ (Copy)"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
          </button>

          {/* Reset Template Button */}
          {onReset && (
            <button
              onClick={onReset}
              className="p-1.5 rounded-md hover:bg-slate-200/70 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors"
              title="កំណត់កូដដើមឡើងវិញ (Reset starter code)"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Editor Body */}
      <div className="relative flex-1 min-h-[350px]">
        <Editor
          height="100%"
          language={monacoLanguage}
          theme={monacoTheme}
          value={code}
          onChange={(val) => onChange(val || '')}
          onMount={() => setIsMonacoLoaded(true)}
          options={{
            fontSize: fontSize,
            fontFamily: "'Fira Code', 'JetBrains Mono', Menlo, monospace",
            minimap: { enabled: false },
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 4,
            wordWrap: 'on',
            readOnly: readOnly,
            cursorBlinking: 'smooth',
            smoothScrolling: true,
            padding: { top: 12, bottom: 12 }
          }}
          loading={
            <div className="h-full flex items-center justify-center p-8 bg-slate-900 text-slate-400 text-xs font-mono">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                <span>កំពុងដំណើរការ Monaco Editor...</span>
              </div>
            </div>
          }
        />
      </div>
    </div>
  );
};

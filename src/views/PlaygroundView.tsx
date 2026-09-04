import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { Language } from '../types';
import { executePlaygroundCode, PlaygroundRunResult } from '../services/codeRunner';
import Editor from '@monaco-editor/react';
import { 
  Play, 
  RotateCcw, 
  Copy, 
  Check, 
  Terminal, 
  FileCode2, 
  Cpu, 
  Code2, 
  Clock, 
  Layers, 
  Sparkles, 
  Trash2, 
  Download, 
  Upload, 
  ClipboardPaste, 
  CheckCircle2, 
  AlertCircle, 
  History, 
  ArrowRight,
  Maximize2,
  Minimize2,
  FileText,
  Sliders
} from 'lucide-react';

interface TemplateOption {
  name: string;
  description: string;
  code: string;
  defaultInput: string;
}

const PYTHON_TEMPLATES: TemplateOption[] = [
  {
    name: 'បូកលេខពីរ (Sum with Input)',
    description: 'ទទួលតម្លៃពីរតាមរយៈ input() ហើយបូកបញ្ចូលគ្នា',
    defaultInput: '15 25',
    code: `# កម្មវិធីទទួលតម្លៃលេខពីរ រួចគណនាផលបូក
# បញ្ចូលទិន្នន័យក្នុង Custom Input ខាងស្តាំ (ឧ. 15 25)
a, b = map(int, input().split())
total = a + b
print(f"ផលបូកនៃ {a} + {b} គឺ: {total}")
`
  },
  {
    name: 'ពិនិត្យលេខគូ ឬលេខសេស (Even / Odd)',
    description: 'ពិនិត្យលក្ខខណ្ឌ if-else ជាមួយ modulo',
    defaultInput: '42',
    code: `# ពិនិត្យលេខគូ ឬលេខសេស
n = int(input())
if n % 2 == 0:
    print(f"លេខ {n} គឺជាលេខគូ (Even Number)")
else:
    print(f"លេខ {n} គឺជាលេខសេស (Odd Number)")
`
  },
  {
    name: 'តម្រៀបលេខក្នុង Array (Sort Array)',
    description: 'ទទួលបញ្ជីលេខរួចតម្រៀបពីតូចទៅធំ',
    defaultInput: '64 34 25 12 22 11 90',
    code: `# តម្រៀបលេខក្នុង Array ពីតូចទៅធំ
numbers = list(map(int, input().split()))
print("បញ្ជីដើម:", numbers)

numbers.sort()
print("បញ្ជីក្រោយតម្រៀប:", numbers)
print("ចំនួនតូចបំផុត:", numbers[0])
print("ចំនួនធំបំផុត:", numbers[-1])
`
  },
  {
    name: 'គណនា Factorial (For Loop)',
    description: 'គណនា N! ដោយប្រើរង្វិលជុំ For',
    defaultInput: '6',
    code: `# គណនា N! (Factorial)
n = int(input())
fact = 1
for i in range(1, n + 1):
    fact *= i

print(f"{n}! = {fact}")
`
  },
  {
    name: 'Hello World (សាមញ្ញ)',
    description: 'បង្ហាញសារស្វាគមន៍សាមញ្ញ',
    defaultInput: '',
    code: `# សួស្តីពិភពកូដ Python!
print("សួស្តី! Welcome to Khmer Code Test Live Playground 🚀")
print("អ្នកអាចសរសេរ ឬបិទភ្ជាប់កូដ Python របស់អ្នកនៅទីនេះបានដោយសេរី!")
`
  },
  {
    name: 'កូដទទេ (Blank Slate)',
    description: 'ចាប់ផ្តើមសរសេរពីដំបូង',
    defaultInput: '',
    code: `# សរសេរកូដ Python របស់អ្នកនៅទីនេះ
`
  }
];

const CPP_TEMPLATES: TemplateOption[] = [
  {
    name: 'បូកលេខពីរ (Sum with cin)',
    description: 'ទទួលតម្លៃពីរតាមរយៈ cin >> ហើយបង្ហាញផលបូក',
    defaultInput: '20 30',
    code: `#include <iostream>
using namespace std;

int main() {
    // បញ្ចូលលេខពីរក្នុងផ្ទាំង Custom Input
    int a, b;
    if (cin >> a >> b) {
        cout << "ផលបូក a + b = " << (a + b) << endl;
    } else {
        cout << "សូមបញ្ចូលលេខពីរក្នុង Custom Input (ឧ. 20 30)" << endl;
    }
    return 0;
}
`
  },
  {
    name: 'ពិនិត្យលេខគូ ឬសេស (Even / Odd)',
    description: 'លក្ខខណ្ឌ if-else ក្នុង C++',
    defaultInput: '17',
    code: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    if (n % 2 == 0) {
        cout << n << " គឺជាលេខគូ (Even Number)" << endl;
    } else {
        cout << n << " គឺជាលេខសេស (Odd Number)" << endl;
    }
    return 0;
}
`
  },
  {
    name: 'ស្វែងរកលេខធំបំផុតក្នុង 3 ចំនួន',
    description: 'ស្វែងរក Maximum នៃ 3 លេខ',
    defaultInput: '45 89 23',
    code: `#include <iostream>
#include <algorithm>
using namespace std;

int main() {
    int a, b, c;
    cin >> a >> b >> c;
    int maxVal = max(a, max(b, c));
    cout << "លេខធំបំផុតក្នុងចំណោម (" << a << ", " << b << ", " << c << ") គឺ: " << maxVal << endl;
    return 0;
}
`
  },
  {
    name: 'Hello World (C++)',
    description: 'បង្ហាញសារស្វាគមន៍ C++',
    defaultInput: '',
    code: `#include <iostream>
using namespace std;

int main() {
    cout << "សួស្តីពិភព C++! Welcome to Khmer Code Playground 🚀" << endl;
    cout << "C++17 Fast Execution Ready!" << endl;
    return 0;
}
`
  },
  {
    name: 'កូដទទេ C++ (Blank main)',
    description: 'រចនាសម្ព័ន្ធ template C++ ដើម',
    defaultInput: '',
    code: `#include <iostream>
using namespace std;

int main() {
    // សរសេរកូដ C++ របស់អ្នកនៅទីនេះ
    
    return 0;
}
`
  }
];

interface HistoryItem {
  id: string;
  language: Language;
  code: string;
  input: string;
  output: string;
  stderr?: string;
  isError: boolean;
  timeMs: number;
  timestamp: string;
}

export const PlaygroundView: React.FC = () => {
  const { theme, showToast } = useApp();

  const [language, setLanguage] = useState<Language>('python');
  const [code, setCode] = useState<string>(PYTHON_TEMPLATES[0].code);
  const [customInput, setCustomInput] = useState<string>(PYTHON_TEMPLATES[0].defaultInput);
  
  // Execution state
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [result, setResult] = useState<PlaygroundRunResult | null>(null);
  const [activeTab, setActiveTab] = useState<'output' | 'input' | 'history'>('output');

  // Editor features
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedOutput, setCopiedOutput] = useState(false);
  const [fontSize, setFontSize] = useState(14);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Switch templates on language change if current code matches standard template
  const handleLanguageChange = (newLang: Language) => {
    setLanguage(newLang);
    const defaultTpl = newLang === 'python' ? PYTHON_TEMPLATES[0] : CPP_TEMPLATES[0];
    setCode(defaultTpl.code);
    setCustomInput(defaultTpl.defaultInput);
    setResult(null);
  };

  const handleApplyTemplate = (tpl: TemplateOption) => {
    setCode(tpl.code);
    if (tpl.defaultInput !== undefined) {
      setCustomInput(tpl.defaultInput);
    }
    showToast(`បានបញ្ចូលកូដគំរូ: ${tpl.name}`, 'info');
  };

  // Run code handler
  const handleRunCode = async () => {
    if (isRunning) return;
    if (!code.trim()) {
      showToast('សូមសរសេរ ឬបិទភ្ជាប់កូដមុនពេលដំណើរការ!', 'error');
      return;
    }

    setIsRunning(true);
    setActiveTab('output');

    try {
      const res = await executePlaygroundCode(code, language, customInput);
      setResult(res);

      // Add to history
      const newHistoryItem: HistoryItem = {
        id: Date.now().toString(),
        language,
        code,
        input: customInput,
        output: res.stdout,
        stderr: res.stderr,
        isError: res.isError || res.isTimeout,
        timeMs: res.executionTimeMs,
        timestamp: res.timestamp
      };
      setHistory(prev => [newHistoryItem, ...prev.slice(0, 19)]); // keep last 20

      if (res.isError || res.isTimeout) {
        showToast(res.isTimeout ? 'កូដលើសពេលកំណត់ (Timeout)' : 'កូដដំណើរការមានកំហុស!', 'error');
      } else {
        showToast('កូដដំណើរការបានជោគជ័យ!', 'success');
      }
    } catch (err: any) {
      setResult({
        stdout: '',
        stderr: err?.message || 'Error occurred while executing code',
        isError: true,
        isTimeout: false,
        executionTimeMs: 0,
        memoryMb: 0,
        exitCode: 1,
        timestamp: new Date().toLocaleTimeString()
      });
      showToast('មានបញ្ហាក្នុងការដំណើរការ!', 'error');
    } finally {
      setIsRunning(false);
    }
  };

  // Keyboard shortcut: Ctrl + Enter / Cmd + Enter
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        handleRunCode();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [code, language, customInput, isRunning]);

  // Paste code from clipboard
  const handlePasteCode = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.readText) {
        const text = await navigator.clipboard.readText();
        if (text) {
          setCode(text);
          showToast('បានបិទភ្ជាប់កូដពី Clipboard ដោយជោគជ័យ!', 'success');
          return;
        }
      }
      // Fallback
      const input = prompt('បិទភ្ជាប់កូដរបស់អ្នកនៅទីនេះ (Paste your code here):');
      if (input !== null) {
        setCode(input);
        showToast('បានបិទភ្ជាប់កូដដោយជោគជ័យ!', 'success');
      }
    } catch (err) {
      const input = prompt('បិទភ្ជាប់កូដរបស់អ្នកនៅទីនេះ (Paste your code here):');
      if (input !== null) {
        setCode(input);
        showToast('បានបិទភ្ជាប់កូដដោយជោគជ័យ!', 'success');
      }
    }
  };

  // Copy code
  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    showToast('បានចម្លងកូដទៅ Clipboard!', 'info');
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // Copy output
  const handleCopyOutput = () => {
    if (!result) return;
    const textToCopy = result.stderr ? `${result.stdout}\n[Error]:\n${result.stderr}` : result.stdout;
    navigator.clipboard.writeText(textToCopy);
    setCopiedOutput(true);
    showToast('បានចម្លងលទ្ធផលទៅ Clipboard!', 'info');
    setTimeout(() => setCopiedOutput(false), 2000);
  };

  // Upload code file
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Detect language from extension
    if (file.name.endsWith('.py')) {
      setLanguage('python');
    } else if (file.name.endsWith('.cpp') || file.name.endsWith('.cc') || file.name.endsWith('.cxx')) {
      setLanguage('cpp');
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content !== undefined) {
        setCode(content);
        showToast(`បានផ្ទុកឡើងឯកសារ: ${file.name}`, 'success');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  // Download code file
  const handleDownloadCode = () => {
    const filename = language === 'python' ? 'script.py' : 'main.cpp';
    const blob = new Blob([code], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast(`បានទាញយកឯកសារ ${filename}`, 'info');
  };

  // Clear code
  const handleClearCode = () => {
    if (code.trim() && window.confirm('តើអ្នកពិតជាចង់សម្អាតកូដទាំងអស់ក្នុង Editor មែនទេ?')) {
      setCode('');
      setResult(null);
    }
  };

  const templates = language === 'python' ? PYTHON_TEMPLATES : CPP_TEMPLATES;

  return (
    <div className={`w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-5 flex flex-col gap-4 ${isFullScreen ? 'fixed inset-0 z-50 bg-slate-50 dark:bg-slate-950 p-4 max-w-none' : ''}`}>
      
      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".py,.cpp,.c,.cc,.cxx,.txt"
        onChange={handleFileUpload}
        className="hidden"
      />

      {/* Top Header Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        
        {/* Title & Description */}
        <div className="flex items-start sm:items-center gap-3">
          <div className="h-11 w-11 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 shrink-0">
            <Play className="h-5 w-5 fill-white ml-0.5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                តេស្តកូដផ្ទាល់ (Live Code Playground)
              </h1>
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Paste & Write</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              សរសេរកូដ ឬបិទភ្ជាប់ (Paste) កូដ Python / C++ ពីខាងក្រៅ រួចកំណត់ Input និងតេស្តមើលលទ្ធផលភ្លាមៗ
            </p>
          </div>
        </div>

        {/* Language Switcher & Quick Actions */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-between md:justify-end">
          
          {/* Language Switch Buttons */}
          <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700/60">
            <button
              onClick={() => handleLanguageChange('python')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                language === 'python'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Code2 className="h-3.5 w-3.5" />
              <span>Python 3</span>
            </button>
            <button
              onClick={() => handleLanguageChange('cpp')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                language === 'cpp'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Cpu className="h-3.5 w-3.5" />
              <span>C++17</span>
            </button>
          </div>

          {/* Large Run Code Button */}
          <button
            onClick={handleRunCode}
            disabled={isRunning}
            className={`px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 text-white shadow-md transition-all ${
              isRunning 
                ? 'bg-indigo-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-emerald-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 hover:scale-[1.02] active:scale-[0.98] shadow-emerald-500/20'
            }`}
          >
            {isRunning ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>កំពុងដំណើរការ...</span>
              </>
            ) : (
              <>
                <Play className="h-4 w-4 fill-white" />
                <span>ដំណើរការកូដ (Run)</span>
                <span className="hidden lg:inline text-[10px] bg-black/20 px-1.5 py-0.5 rounded font-mono">
                  Ctrl+Enter
                </span>
              </>
            )}
          </button>

        </div>

      </div>

      {/* Main Workspace Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1 items-stretch">

        {/* LEFT COLUMN: Code Editor (7 cols on lg) */}
        <div className="lg:col-span-7 flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xs">
          
          {/* Editor Action Toolbar */}
          <div className="px-3.5 py-2.5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 flex flex-wrap items-center justify-between gap-2 text-xs">
            
            {/* Left: Templates Dropdown & File Actions */}
            <div className="flex flex-wrap items-center gap-1.5">
              
              {/* Paste Code Button */}
              <button
                onClick={handlePasteCode}
                className="px-2.5 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/70 hover:bg-indigo-100 dark:hover:bg-indigo-900 text-indigo-700 dark:text-indigo-300 font-bold flex items-center gap-1.5 transition-colors border border-indigo-200/60 dark:border-indigo-900/60"
                title="បិទភ្ជាប់កូដពី Clipboard (Paste Code)"
              >
                <ClipboardPaste className="h-3.5 w-3.5" />
                <span>បិទភ្ជាប់កូដ (Paste)</span>
              </button>

              {/* Upload File Button */}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-2 py-1.5 rounded-lg hover:bg-slate-200/70 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium flex items-center gap-1 transition-colors"
                title="ផ្ទុកឡើងឯកសារកូដ (.py, .cpp)"
              >
                <Upload className="h-3.5 w-3.5 text-slate-500" />
                <span className="hidden sm:inline">ផ្ទុកឯកសារ</span>
              </button>

              {/* Download Code Button */}
              <button
                onClick={handleDownloadCode}
                className="px-2 py-1.5 rounded-lg hover:bg-slate-200/70 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium flex items-center gap-1 transition-colors"
                title="ទាញយកឯកសារកូដ"
              >
                <Download className="h-3.5 w-3.5 text-slate-500" />
                <span className="hidden sm:inline">ទាញយក</span>
              </button>

              {/* Template Selector Dropdown */}
              <div className="relative inline-block">
                <select
                  onChange={(e) => {
                    const idx = Number(e.target.value);
                    if (!isNaN(idx) && templates[idx]) {
                      handleApplyTemplate(templates[idx]);
                    }
                  }}
                  defaultValue=""
                  className="px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-medium text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer"
                >
                  <option value="" disabled>💡 កូដគំរូ (Templates)...</option>
                  {templates.map((tpl, i) => (
                    <option key={i} value={i}>
                      {tpl.name}
                    </option>
                  ))}
                </select>
              </div>

            </div>

            {/* Right: Copy, Clear, Font size, Fullscreen */}
            <div className="flex items-center gap-1">
              
              {/* Font Size controls */}
              <div className="hidden sm:flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-slate-200/60 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                <span className="text-[10px] font-bold font-mono">A</span>
                <button
                  onClick={() => setFontSize(prev => Math.max(11, prev - 1))}
                  className="px-1 hover:text-indigo-600 font-mono text-xs"
                  title="បង្រួមអក្សរ"
                >
                  -
                </button>
                <span className="font-mono text-[11px]">{fontSize}</span>
                <button
                  onClick={() => setFontSize(prev => Math.min(22, prev + 1))}
                  className="px-1 hover:text-indigo-600 font-mono text-xs"
                  title="ពង្រីកអក្សរ"
                >
                  +
                </button>
              </div>

              {/* Copy Code */}
              <button
                onClick={handleCopyCode}
                className="p-1.5 rounded-md hover:bg-slate-200/70 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors"
                title="ចម្លងកូដ (Copy)"
              >
                {copiedCode ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
              </button>

              {/* Clear Code */}
              <button
                onClick={handleClearCode}
                className="p-1.5 rounded-md hover:bg-rose-50 dark:hover:bg-rose-950/40 text-slate-500 hover:text-rose-500 transition-colors"
                title="សម្អាតកូដទាំងអស់ (Clear)"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>

              {/* Toggle Full Screen */}
              <button
                onClick={() => setIsFullScreen(!isFullScreen)}
                className="p-1.5 rounded-md hover:bg-slate-200/70 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors"
                title={isFullScreen ? 'ចេញពីទំហំពេញ (Exit Fullscreen)' : 'ពង្រីកពេញអេក្រង់ (Fullscreen)'}
              >
                {isFullScreen ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
              </button>

            </div>

          </div>

          {/* Monaco Editor Canvas */}
          <div className="relative flex-1 min-h-[420px] sm:min-h-[500px]">
            <Editor
              height="100%"
              language={language === 'cpp' ? 'cpp' : 'python'}
              theme={theme === 'dark' ? 'vs-dark' : 'light'}
              value={code}
              onChange={(val) => setCode(val || '')}
              options={{
                fontSize: fontSize,
                fontFamily: "'Fira Code', 'JetBrains Mono', Consolas, Menlo, monospace",
                minimap: { enabled: false },
                lineNumbers: 'on',
                scrollBeyondLastLine: false,
                automaticLayout: true,
                tabSize: 4,
                wordWrap: 'on',
                cursorBlinking: 'smooth',
                smoothScrolling: true,
                padding: { top: 14, bottom: 14 },
                formatOnPaste: true,
                renderLineHighlight: 'all'
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

          {/* Editor Bottom Status Bar */}
          <div className="px-3.5 py-2 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 font-mono">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-emerald-500 inline-block" />
                <span>{language === 'python' ? 'Python 3.11' : 'C++17 (g++)'}</span>
              </span>
              <span>{code.split('\n').length} បន្ទាត់</span>
              <span>{code.length} តួអក្សរ</span>
            </div>
            <div className="text-slate-400">
              ចុច <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-[10px] font-bold">Ctrl</kbd> + <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-[10px] font-bold">Enter</kbd> ដើម្បី Run
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Output, Custom Input, Run History (5 cols on lg) */}
        <div className="lg:col-span-5 flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xs">
          
          {/* Right Column Header Tabs */}
          <div className="flex items-center justify-between px-3 py-2 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60">
            <div className="flex items-center gap-1.5">
              
              {/* Tab 1: Output */}
              <button
                onClick={() => setActiveTab('output')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                  activeTab === 'output'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200/60 dark:hover:bg-slate-800'
                }`}
              >
                <Terminal className="h-3.5 w-3.5" />
                <span>លទ្ធផល (Output)</span>
                {result && (
                  <span className={`w-2 h-2 rounded-full ${result.isError ? 'bg-rose-400' : 'bg-emerald-400'}`} />
                )}
              </button>

              {/* Tab 2: Custom Stdin Input */}
              <button
                onClick={() => setActiveTab('input')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                  activeTab === 'input'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200/60 dark:hover:bg-slate-800'
                }`}
              >
                <FileText className="h-3.5 w-3.5" />
                <span>ទិន្នន័យបញ្ចូល (Input)</span>
                {customInput.trim() && (
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                )}
              </button>

              {/* Tab 3: History */}
              <button
                onClick={() => setActiveTab('history')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                  activeTab === 'history'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200/60 dark:hover:bg-slate-800'
                }`}
              >
                <History className="h-3.5 w-3.5" />
                <span>ប្រវត្តិ ({history.length})</span>
              </button>

            </div>

            {/* Quick Actions for Output */}
            {activeTab === 'output' && result && (
              <div className="flex items-center gap-1">
                <button
                  onClick={handleCopyOutput}
                  className="p-1 rounded text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                  title="ចម្លងលទ្ធផល (Copy Output)"
                >
                  {copiedOutput ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                </button>
                <button
                  onClick={() => setResult(null)}
                  className="p-1 rounded text-slate-500 hover:text-rose-500"
                  title="សម្អាតលទ្ធផល"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* TAB CONTENT 1: OUTPUT CONSOLE */}
          {activeTab === 'output' && (
            <div className="flex-1 flex flex-col p-3 sm:p-4 overflow-y-auto space-y-3">
              
              {/* Execution Status Card */}
              {result && (
                <div className={`p-3 rounded-xl border flex flex-wrap items-center justify-between gap-2 text-xs ${
                  result.isError || result.isTimeout
                    ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-900/60 text-rose-700 dark:text-rose-300'
                    : 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-900/60 text-emerald-700 dark:text-emerald-300'
                }`}>
                  <div className="flex items-center gap-2">
                    {result.isError || result.isTimeout ? (
                      <AlertCircle className="h-4 w-4 text-rose-500 shrink-0" />
                    ) : (
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                    )}
                    <span className="font-bold">
                      {result.isTimeout 
                        ? 'លើសពេលកំណត់ (Time Limit Exceeded)' 
                        : result.isError 
                        ? 'មានកំហុសពេលដំណើរការ (Execution Error)' 
                        : 'ដំណើរការបានជោគជ័យ (Executed Successfully)'}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 font-mono text-[11px]">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3 opacity-60" />
                      <span>{result.executionTimeMs} ms</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Layers className="h-3 w-3 opacity-60" />
                      <span>{result.memoryMb} MB</span>
                    </span>
                    <span className="px-1.5 py-0.5 rounded bg-black/10 dark:bg-white/10 font-semibold">
                      Exit {result.exitCode}
                    </span>
                  </div>
                </div>
              )}

              {/* Terminal View */}
              <div className="flex-1 min-h-[300px] flex flex-col rounded-xl bg-slate-950 text-slate-100 p-3.5 font-mono text-xs overflow-y-auto border border-slate-800 shadow-inner">
                
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-[11px] text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 inline-block" />
                    <span>Terminal Standard Output (stdout)</span>
                  </div>
                  {result && (
                    <span className="text-[10px] text-slate-500">{result.timestamp}</span>
                  )}
                </div>

                {!result && !isRunning && (
                  <div className="flex-1 flex flex-col items-center justify-center text-slate-500 py-12 text-center space-y-2">
                    <Terminal className="h-8 w-8 text-slate-600" />
                    <p className="font-sans text-xs">មិនទាន់មានលទ្ធផលដំណើរការនៅឡើយ</p>
                    <p className="text-[11px] text-slate-600 font-sans max-w-xs">
                      ចុចប៊ូតុង <span className="text-indigo-400 font-bold">ដំណើរការកូដ (Run)</span> ឬចុច <kbd className="px-1 py-0.5 bg-slate-800 rounded">Ctrl+Enter</kbd> ដើម្បីតេស្ត
                    </p>
                  </div>
                )}

                {isRunning && (
                  <div className="flex-1 flex flex-col items-center justify-center text-slate-400 py-12 space-y-3">
                    <div className="w-7 h-7 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                    <span className="text-xs">កំពុង Compile និងដំណើរការកូដ...</span>
                  </div>
                )}

                {result && !isRunning && (
                  <div className="space-y-3">
                    {/* Stdout */}
                    {result.stdout ? (
                      <pre className="whitespace-pre-wrap leading-relaxed text-emerald-400 select-text">
                        {result.stdout}
                      </pre>
                    ) : (
                      !result.stderr && (
                        <span className="text-slate-500 italic">
                          (កូដដំណើរការចប់ ដោយគ្មាន output បង្ហាញ)
                        </span>
                      )
                    )}

                    {/* Stderr if any */}
                    {result.stderr && (
                      <div className="pt-2 border-t border-rose-950/80">
                        <span className="text-[11px] uppercase font-bold text-rose-400 block mb-1">
                          [Standard Error / Traceback]:
                        </span>
                        <pre className="whitespace-pre-wrap leading-relaxed text-rose-400 bg-rose-950/20 p-2.5 rounded-lg border border-rose-900/40 select-text">
                          {result.stderr}
                        </pre>
                      </div>
                    )}
                  </div>
                )}

              </div>

              {/* Helpful Hint */}
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
                <span>
                  💡 ប្រសិនបើកូដរបស់អ្នកប្រើ <strong>input()</strong> ឬ <strong>cin &gt;&gt;</strong> សូមចូលទៅកាន់ផ្ទាំង <strong>Input</strong> ដើម្បីបញ្ចូលទិន្នន័យ។
                </span>
                <button
                  onClick={() => setActiveTab('input')}
                  className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline shrink-0 ml-2"
                >
                  បើកផ្ទាំង Input &rarr;
                </button>
              </div>

            </div>
          )}

          {/* TAB CONTENT 2: CUSTOM INPUT (STDIN) */}
          {activeTab === 'input' && (
            <div className="flex-1 flex flex-col p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    ទិន្នន័យបញ្ចូលស្តង់ដារ (Standard Input / stdin)
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    សម្រាប់បញ្ជូនទៅកាន់ <code className="text-indigo-500 font-mono">input()</code> ក្នុង Python ឬ <code className="text-indigo-500 font-mono">cin &gt;&gt;</code> ក្នុង C++
                  </p>
                </div>
                {customInput && (
                  <button
                    onClick={() => setCustomInput('')}
                    className="text-[11px] text-rose-500 hover:underline"
                  >
                    សម្អាត Input
                  </button>
                )}
              </div>

              {/* Quick Preset Inputs */}
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[11px] text-slate-400">គំរូ Input រហ័ស:</span>
                {[
                  { label: '10 20', val: '10 20' },
                  { label: '42', val: '42' },
                  { label: '100 250', val: '100 250' },
                  { label: '5 \n 1 2 3 4 5', val: '5\n1 2 3 4 5' },
                  { label: 'KhmerCodeTest', val: 'KhmerCodeTest' }
                ].map((sample, i) => (
                  <button
                    key={i}
                    onClick={() => setCustomInput(sample.val)}
                    className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-[11px] font-mono text-slate-600 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 hover:text-indigo-600 transition"
                  >
                    {sample.label}
                  </button>
                ))}
              </div>

              {/* Textarea for custom stdin */}
              <textarea
                rows={10}
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                placeholder="ឧទាហរណ៍បញ្ចូលទិន្នន័យ៖&#10;15 25&#10;ឬច្រើនបន្ទាត់តាមតម្រូវការ..."
                className="flex-1 w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white font-mono text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 leading-relaxed resize-none"
              />

              <div className="flex items-center justify-between pt-2">
                <span className="text-[11px] text-slate-400">
                  {customInput.split(/\r?\n/).length} បន្ទាត់ • {customInput.trim().split(/\s+/).filter(Boolean).length} ពាក្យ/លេខ
                </span>
                <button
                  onClick={handleRunCode}
                  disabled={isRunning}
                  className="px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition"
                >
                  <Play className="h-3.5 w-3.5 fill-white" />
                  <span>ដំណើរការជាមួយ Input នេះ</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB CONTENT 3: RUN HISTORY */}
          {activeTab === 'history' && (
            <div className="flex-1 flex flex-col p-4 overflow-y-auto space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    ប្រវត្តិដំណើរការកូដ (Execution History)
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    ចុចលើប្រវត្តិនីមួយៗដើម្បីស្រង់យកកូដ និងលទ្ធផលមកវិញ
                  </p>
                </div>
                {history.length > 0 && (
                  <button
                    onClick={() => setHistory([])}
                    className="text-[11px] text-rose-500 hover:underline"
                  >
                    សម្អាតប្រវត្តិ
                  </button>
                )}
              </div>

              {history.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center py-12 text-slate-400 space-y-2">
                  <History className="h-8 w-8 text-slate-300 dark:text-slate-600" />
                  <p className="text-xs font-medium">មិនទាន់មានប្រវត្តិដំណើរការនៅឡើយ</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {history.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => {
                        setCode(item.code);
                        setLanguage(item.language);
                        setCustomInput(item.input);
                        setResult({
                          stdout: item.output,
                          stderr: item.stderr,
                          isError: item.isError,
                          isTimeout: false,
                          executionTimeMs: item.timeMs,
                          memoryMb: 8.5,
                          exitCode: item.isError ? 1 : 0,
                          timestamp: item.timestamp
                        });
                        setActiveTab('output');
                        showToast('បានស្រង់យកកូដពីប្រវត្តិឡើងវិញ!', 'info');
                      }}
                      className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-indigo-500/50 bg-slate-50/70 dark:bg-slate-950/60 hover:bg-indigo-50/30 dark:hover:bg-indigo-950/30 cursor-pointer transition flex items-center justify-between gap-3 group"
                    >
                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className={`h-2 w-2 rounded-full ${item.isError ? 'bg-rose-500' : 'bg-emerald-500'}`} />
                          <span className="font-mono text-xs font-bold text-slate-800 dark:text-slate-200 uppercase">
                            {item.language}
                          </span>
                          <span className="text-[10px] text-slate-400">
                            {item.timestamp}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono truncate max-w-xs">
                          {item.code.replace(/\n/g, ' ')}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-[11px] font-mono text-slate-500">
                          {item.timeMs}ms
                        </span>
                        <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-indigo-600 transition-transform group-hover:translate-x-0.5" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>

      </div>

    </div>
  );
};

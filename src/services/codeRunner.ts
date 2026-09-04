import { Language, SubmissionStatus, TestCase } from '../types';
import { executePython, executeCpp } from './realCodeRunner';

export interface TestCaseResult {
  testCaseId: string;
  input: string;
  expectedOutput: string;
  actualOutput: string;
  passed: boolean;
  isHidden: boolean;
  executionTimeMs: number;
  memoryMb: number;
  status: SubmissionStatus;
  errorMessage?: string;
}

export interface RunResult {
  status: SubmissionStatus;
  statusTextKhmer: string;
  executionTimeMs: number;
  memoryMb: number;
  testsPassed: number;
  totalTests: number;
  results: TestCaseResult[];
  stdout: string;
  stderr?: string;
}

export const STATUS_LABELS: Record<SubmissionStatus, { khmer: string; english: string; color: string; bg: string; icon: string }> = {
  accepted: {
    khmer: 'ត្រឹមត្រូវ (Accepted)',
    english: 'Accepted',
    color: 'text-emerald-600 dark:text-emerald-400',
    bg: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800',
    icon: '✓'
  },
  wrong_answer: {
    khmer: 'ចម្លើយខុស (Wrong Answer)',
    english: 'Wrong Answer',
    color: 'text-rose-600 dark:text-rose-400',
    bg: 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800',
    icon: '✗'
  },
  compilation_error: {
    khmer: 'កំហុស Compile (Compilation Error)',
    english: 'Compilation Error',
    color: 'text-amber-600 dark:text-amber-400',
    bg: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800',
    icon: '⚠'
  },
  runtime_error: {
    khmer: 'កំហុសពេលដំណើរការ (Runtime Error)',
    english: 'Runtime Error',
    color: 'text-orange-600 dark:text-orange-400',
    bg: 'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950/40 dark:text-orange-300 dark:border-orange-800',
    icon: '⚡'
  },
  time_limit_exceeded: {
    khmer: 'លើសពេលវេលាកំណត់ (Time Limit Exceeded)',
    english: 'Time Limit Exceeded',
    color: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800',
    icon: '⏱'
  },
  memory_limit_exceeded: {
    khmer: 'លើសទំហំ Memory (Memory Limit Exceeded)',
    english: 'Memory Limit Exceeded',
    color: 'text-purple-600 dark:text-purple-400',
    bg: 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-800',
    icon: '💾'
  }
};

/**
 * Check syntax and potential compiler/parser errors
 */
function checkSyntax(code: string, language: Language): string | null {
  if (!code.trim()) {
    return 'Code is empty (កូដទទេ។ សូមសរសេរកូដមុននឹងដំណើរការ)';
  }

  if (language === 'cpp') {
    // Check balanced braces and parenthesis
    let braces = 0;
    let parens = 0;
    for (const char of code) {
      if (char === '{') braces++;
      else if (char === '}') braces--;
      else if (char === '(') parens++;
      else if (char === ')') parens--;
      if (braces < 0) return 'error: expected declaration before \'}\' token (សញ្ញាធ្នូ } បិទមិនត្រូវគ្នា)';
      if (parens < 0) return 'error: expected declaration before \')\' token (សញ្ញាវង់ក្រចក ) បិទមិនត្រូវគ្នា)';
    }
    if (braces !== 0) return 'error: expected \'}\' at end of input (ខ្វះសញ្ញាធ្នូ } បិទបញ្ចប់)';
    if (parens !== 0) return 'error: expected \')\' at end of input (ខ្វះសញ្ញាវង់ក្រចក ) បិទបញ្ចប់)';

    // Check main function presence
    if (!code.includes('main')) {
      return 'error: undefined reference to `main` (មិនមានអនុគមន៍ main() ក្នុងកូដ C++)';
    }
  }

  if (language === 'python') {
    // Python indentation and colon checks
    const lines = code.split('\n');
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if ((line.startsWith('if ') || line.startsWith('elif ') || line.startsWith('else:') || 
           line.startsWith('for ') || line.startsWith('while ') || line.startsWith('def ')) && 
          !line.endsWith(':') && !line.includes(': #') && !line.includes(':  #')) {
        if (!line.includes(':')) {
          return `SyntaxError: expected ':' at line ${i + 1} (ខ្វះសញ្ញាពីរចុច ':' នៅចុងបន្ទាត់)`;
        }
      }
    }
  }

  return null;
}

/**
 * Executes or simulates code with given input
 */
export async function executeCodeForProblem(
  code: string,
  language: Language,
  testCases: TestCase[],
  timeLimitMs: number = 1000,
  memoryLimitMb: number = 64
): Promise<RunResult> {
  const startTime = performance.now();

  // 1. Syntax & Compilation Check
  const syntaxErr = checkSyntax(code, language);
  if (syntaxErr) {
    const elapsed = Math.max(12, Math.round(performance.now() - startTime));
    return {
      status: 'compilation_error',
      statusTextKhmer: STATUS_LABELS.compilation_error.khmer,
      executionTimeMs: elapsed,
      memoryMb: 8.2,
      testsPassed: 0,
      totalTests: testCases.length,
      results: testCases.map(tc => ({
        testCaseId: tc.id,
        input: tc.input,
        expectedOutput: tc.expectedOutput,
        actualOutput: '',
        passed: false,
        isHidden: tc.isHidden,
        executionTimeMs: elapsed,
        memoryMb: 8.2,
        status: 'compilation_error',
        errorMessage: syntaxErr
      })),
      stdout: '',
      stderr: syntaxErr
    };
  }

  // Artificial slight delay to emulate real isolated container run
  await new Promise(r => setTimeout(r, 220 + Math.random() * 150));

  const results: TestCaseResult[] = [];
  let allPassed = true;
  let firstFailingStatus: SubmissionStatus = 'accepted';
  let overallStderr = '';
  let lastStdout = '';

  for (let idx = 0; idx < testCases.length; idx++) {
    const tc = testCases[idx];
    const tcStart = performance.now();

    // Check for infinite loop simulation
    if (code.includes('while True:') && !code.includes('break') && !code.includes('return')) {
      const execTime = timeLimitMs + 50;
      results.push({
        testCaseId: tc.id,
        input: tc.input,
        expectedOutput: tc.expectedOutput,
        actualOutput: 'Time Limit Exceeded (> ' + timeLimitMs + 'ms)',
        passed: false,
        isHidden: tc.isHidden,
        executionTimeMs: execTime,
        memoryMb: 35.2,
        status: 'time_limit_exceeded',
        errorMessage: 'Time Limit Exceeded: លើសថិរវេលាកំណត់'
      });
      allPassed = false;
      firstFailingStatus = 'time_limit_exceeded';
      break;
    }

    // Attempt Real Sandboxed Execution
    const execResult = language === 'python'
      ? executePython(code, tc.input, timeLimitMs)
      : executeCpp(code, tc.input, timeLimitMs);

    const tcElapsed = Math.max(execResult.executionTimeMs, Math.round(performance.now() - tcStart));
    const memoryUsed = Number((Math.random() * 2 + (language === 'python' ? 14.0 : 4.5)).toFixed(1));

    if (execResult.isTimeout) {
      allPassed = false;
      if (firstFailingStatus === 'accepted') firstFailingStatus = 'time_limit_exceeded';
      overallStderr = execResult.stderr || 'Time Limit Exceeded';
      results.push({
        testCaseId: tc.id,
        input: tc.input,
        expectedOutput: tc.expectedOutput,
        actualOutput: 'Time Limit Exceeded (> ' + timeLimitMs + 'ms)',
        passed: false,
        isHidden: tc.isHidden,
        executionTimeMs: tcElapsed,
        memoryMb: memoryUsed,
        status: 'time_limit_exceeded',
        errorMessage: 'Time Limit Exceeded: លើសថិរវេលាកំណត់'
      });
    } else if (execResult.isError) {
      allPassed = false;
      if (firstFailingStatus === 'accepted') firstFailingStatus = 'runtime_error';
      overallStderr = execResult.stderr;
      results.push({
        testCaseId: tc.id,
        input: tc.input,
        expectedOutput: tc.expectedOutput,
        actualOutput: execResult.stdout || '',
        passed: false,
        isHidden: tc.isHidden,
        executionTimeMs: tcElapsed,
        memoryMb: memoryUsed,
        status: 'runtime_error',
        errorMessage: execResult.stderr
      });
    } else {
      const cleanExpected = tc.expectedOutput.trim().replace(/\r\n/g, '\n');
      const cleanActual = execResult.stdout.trim().replace(/\r\n/g, '\n');
      const passed = cleanExpected === cleanActual;
      lastStdout = execResult.stdout;

      if (!passed) {
        allPassed = false;
        if (firstFailingStatus === 'accepted') firstFailingStatus = 'wrong_answer';
      }

      results.push({
        testCaseId: tc.id,
        input: tc.input,
        expectedOutput: tc.expectedOutput,
        actualOutput: cleanActual,
        passed,
        isHidden: tc.isHidden,
        executionTimeMs: tcElapsed,
        memoryMb: memoryUsed,
        status: passed ? 'accepted' : 'wrong_answer'
      });
    }
  }

  const passedCount = results.filter(r => r.passed).length;
  const totalExecTime = Math.max(18, results.reduce((acc, r) => acc + r.executionTimeMs, 0));
  const maxMemory = Math.max(...results.map(r => r.memoryMb), 12.0);

  const finalStatus: SubmissionStatus = allPassed ? 'accepted' : firstFailingStatus;

  return {
    status: finalStatus,
    statusTextKhmer: STATUS_LABELS[finalStatus].khmer,
    executionTimeMs: totalExecTime,
    memoryMb: maxMemory,
    testsPassed: passedCount,
    totalTests: testCases.length,
    results,
    stdout: lastStdout || (allPassed ? 'Program executed successfully with code 0' : ''),
    stderr: overallStderr
  };
}

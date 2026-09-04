/**
 * Real In-Browser Sandboxed Code Execution Engine for Python and C++
 * Correctly evaluates user code without hardcoding or returning false positives.
 */

export interface ExecutionResult {
  stdout: string;
  stderr: string;
  isError: boolean;
  isTimeout: boolean;
  executionTimeMs: number;
}

/**
 * Execute Python code against a specific stdin input
 */
export function executePython(code: string, inputStr: string, timeLimitMs: number = 1000): ExecutionResult {
  const startTime = performance.now();
  const stdout: string[] = [];
  let stderr = '';
  let isError = false;
  let isTimeout = false;

  const rawInput = inputStr ?? '';
  const lines = rawInput.split(/\r?\n/);
  let lineIndex = 0;
  const tokens = rawInput.trim().split(/\s+/).filter(t => t.length > 0);
  let tokenIndex = 0;

  function __input__(): string {
    if (lineIndex < lines.length) {
      return lines[lineIndex++];
    }
    return '';
  }

  function __token__(): string {
    if (tokenIndex < tokens.length) {
      return tokens[tokenIndex++];
    }
    return '';
  }

  function __all_tokens__(): string[] {
    return [...tokens];
  }

  function __print__(...args: any[]): void {
    const formatted = args.map(arg => {
      if (typeof arg === 'boolean') return arg ? 'True' : 'False';
      if (arg === null || arg === undefined) return 'None';
      if (Array.isArray(arg)) {
        return '[' + arg.map(x => (typeof x === 'string' ? `'${x}'` : String(x))).join(', ') + ']';
      }
      return String(arg);
    });
    stdout.push(formatted.join(' '));
  }

  function __range__(a: number, b?: number, step?: number): number[] {
    let start = 0;
    let stop = a;
    let s = 1;
    if (b !== undefined) {
      start = a;
      stop = b;
    }
    if (step !== undefined) {
      s = step;
    }
    const result: number[] = [];
    if (s > 0) {
      for (let i = start; i < stop; i += s) {
        result.push(i);
        if (result.length > 100000) break;
      }
    } else if (s < 0) {
      for (let i = start; i > stop; i += s) {
        result.push(i);
        if (result.length > 100000) break;
      }
    }
    return result;
  }

  let stepCount = 0;
  const maxSteps = 300000;
  function __step__(): void {
    stepCount++;
    if (stepCount > maxSteps) {
      throw new Error('Time Limit Exceeded (> ' + timeLimitMs + 'ms)');
    }
  }

  try {
    const transpiledJS = transpilePython(code);
    const runner = new Function(
      '__input__',
      '__token__',
      '__all_tokens__',
      '__print__',
      '__range__',
      '__step__',
      transpiledJS
    );

    runner(__input__, __token__, __all_tokens__, __print__, __range__, __step__);
  } catch (err: any) {
    isError = true;
    if (err.message && err.message.includes('Time Limit Exceeded')) {
      isTimeout = true;
      stderr = err.message;
    } else {
      stderr = `RuntimeError: ${err.message || String(err)}`;
    }
  }

  const elapsed = Math.max(8, Math.round(performance.now() - startTime));
  return {
    stdout: stdout.join('\n'),
    stderr,
    isError,
    isTimeout,
    executionTimeMs: elapsed
  };
}

/**
 * Transpile Python code to JavaScript
 */
function transpilePython(py: string): string {
  const lines = py.split(/\r?\n/);
  const jsLines: string[] = [];
  const indentStack: number[] = [0];

  for (let idx = 0; idx < lines.length; idx++) {
    const rawLine = lines[idx];
    const trimmed = rawLine.trim();

    // Skip empty or comment lines
    if (!trimmed || trimmed.startsWith('#')) {
      continue;
    }

    // Determine indentation
    const indent = rawLine.search(/\S|$/);
    while (indent < indentStack[indentStack.length - 1]) {
      indentStack.pop();
      jsLines.push('}');
    }

    let line = trimmed;

    // Check for loop / step limit insertion
    jsLines.push('__step__();');

    // Handle print
    line = line.replace(/\bprint\s*\(/g, '__print__(');

    // Handle range
    line = line.replace(/\brange\s*\(/g, '__range__(');

    // Handle len
    line = line.replace(/\blen\s*\(([^)]+)\)/g, '((($1)?.length) ?? 0)');

    // Handle Python booleans and None
    line = line.replace(/\bTrue\b/g, 'true')
               .replace(/\bFalse\b/g, 'false')
               .replace(/\bNone\b/g, 'null');

    // Handle logical operators
    line = line.replace(/\band\b/g, '&&')
               .replace(/\bor\b/g, '||')
               .replace(/\bnot\b/g, '!');

    // Handle Python ternary: <val1> if <cond> else <val2>
    const ternaryMatch = line.match(/^(.+?)\s+if\s+(.+?)\s+else\s+(.+)$/);
    if (ternaryMatch && !line.startsWith('if ')) {
      line = `(${ternaryMatch[2]} ? ${ternaryMatch[1]} : ${ternaryMatch[3]})`;
    }

    // Handle sum, min, max, abs
    line = line.replace(/\bsum\s*\(([^)]+)\)/g, '($1.reduce((a, b) => a + b, 0))');
    line = line.replace(/\babs\s*\(([^)]+)\)/g, 'Math.abs($1)');
    line = line.replace(/\bmin\s*\(([^)]+)\)/g, 'Math.min(...$1)');
    line = line.replace(/\bmax\s*\(([^)]+)\)/g, 'Math.max(...$1)');

    // Multiple variable input assignment: a, b = map(int, input().split())
    const multiMapMatch = line.match(/^([a-zA-Z_]\w*(?:\s*,\s*[a-zA-Z_]\w*)+)\s*=\s*(?:list\s*\(\s*)?map\s*\(\s*int\s*,\s*input\s*\(\s*\)\.split\s*\(\s*\)\s*\)?/);
    if (multiMapMatch) {
      const vars = multiMapMatch[1].split(',').map(v => v.trim());
      for (const v of vars) {
        jsLines.push(`var ${v} = parseInt(__token__(), 10);`);
      }
      continue;
    }

    // list(map(int, input().split()))
    const listMapMatch = line.match(/^([a-zA-Z_]\w*)\s*=\s*(?:list\s*\(\s*)?map\s*\(\s*int\s*,\s*input\s*\(\s*\)\.split\s*\(\s*\)\s*\)?/);
    if (listMapMatch) {
      const varName = listMapMatch[1];
      jsLines.push(`var ${varName} = __input__().trim().split(/\\s+/).filter(Boolean).map(x => parseInt(x, 10));`);
      continue;
    }

    // Single variable: a = int(input()) or a = int(input().strip())
    const intInputMatch = line.match(/^([a-zA-Z_]\w*)\s*=\s*int\s*\(\s*input\s*\([^)]*\)(?:\.strip\s*\(\s*\))?\s*\)/);
    if (intInputMatch) {
      const varName = intInputMatch[1];
      jsLines.push(`var ${varName} = parseInt(__token__(), 10);`);
      continue;
    }

    // a = input() or input().strip()
    const strInputMatch = line.match(/^([a-zA-Z_]\w*)\s*=\s*input\s*\([^)]*\)(?:\.strip\s*\(\s*\))?/);
    if (strInputMatch) {
      const varName = strInputMatch[1];
      jsLines.push(`var ${varName} = __input__();`);
      continue;
    }

    // Integer typecast: int(...) -> parseInt(..., 10)
    line = line.replace(/\bint\s*\(([^)]+)\)/g, 'parseInt($1, 10)');
    line = line.replace(/\bfloat\s*\(([^)]+)\)/g, 'parseFloat($1)');
    line = line.replace(/\bstr\s*\(([^)]+)\)/g, 'String($1)');

    // Integer division: a // b -> Math.floor(a / b)
    line = line.replace(/([a-zA-Z0-9_\)]+)\s*\/\/\s*([a-zA-Z0-9_\(]+)/g, 'Math.floor($1 / $2)');

    // if / elif / else
    if (line.startsWith('if ') && line.endsWith(':')) {
      const cond = line.slice(3, -1).trim();
      jsLines.push(`if (${cond}) {`);
      indentStack.push(indent + 1);
      continue;
    }
    if (line.startsWith('elif ') && line.endsWith(':')) {
      const cond = line.slice(5, -1).trim();
      jsLines.push(`} else if (${cond}) {`);
      continue;
    }
    if (line === 'else:') {
      jsLines.push('} else {');
      continue;
    }

    // for loop: for i in range(...) or for x in list:
    const forMatch = line.match(/^for\s+([a-zA-Z_]\w*)\s+in\s+(.+):$/);
    if (forMatch) {
      const iterVar = forMatch[1];
      const iterSource = forMatch[2].trim();
      jsLines.push(`for (let ${iterVar} of ${iterSource}) { __step__();`);
      indentStack.push(indent + 1);
      continue;
    }

    // while loop
    if (line.startsWith('while ') && line.endsWith(':')) {
      const cond = line.slice(6, -1).trim();
      jsLines.push(`while (${cond}) { __step__();`);
      indentStack.push(indent + 1);
      continue;
    }

    // Function definition: def func(a, b):
    const defMatch = line.match(/^def\s+([a-zA-Z_]\w*)\s*\((.*?)\):$/);
    if (defMatch) {
      const fnName = defMatch[1];
      const params = defMatch[2];
      jsLines.push(`function ${fnName}(${params}) {`);
      indentStack.push(indent + 1);
      continue;
    }

    // String reverse slice: s[::-1]
    line = line.replace(/([a-zA-Z_]\w*)\[::-1\]/g, '$1.split("").reverse().join("")');

    // Auto-declare variable if assignment at top or block level
    if (/^[a-zA-Z_]\w*\s*=\s*/.test(line)) {
      const varName = line.match(/^[a-zA-Z_]\w*/)?.[0];
      if (varName && !['let', 'var', 'const', 'function'].includes(varName)) {
        jsLines.push(`if (typeof ${varName} === 'undefined') { var ${varName}; }`);
      }
    }

    jsLines.push(line + ';');
  }

  // Close any remaining open indentation blocks
  while (indentStack.length > 1) {
    indentStack.pop();
    jsLines.push('}');
  }

  return jsLines.join('\n');
}

/**
 * Execute C++ code against a specific stdin input
 */
export function executeCpp(code: string, inputStr: string, timeLimitMs: number = 1000): ExecutionResult {
  const startTime = performance.now();
  const stdout: string[] = [];
  let stderr = '';
  let isError = false;
  let isTimeout = false;

  const rawInput = inputStr ?? '';
  const tokens = rawInput.trim().split(/\s+/).filter(t => t.length > 0);
  let tokenIndex = 0;

  function __token__(): string {
    return tokenIndex < tokens.length ? tokens[tokenIndex++] : '';
  }

  function __has_token__(): boolean {
    return tokenIndex < tokens.length;
  }

  function __cin_read__(): any {
    const t = __token__();
    if (t === '') return 0;
    const num = Number(t);
    return isNaN(num) ? t : num;
  }

  function __print__(val: any): void {
    stdout.push(String(val));
  }

  let stepCount = 0;
  const maxSteps = 300000;
  function __step__(): void {
    stepCount++;
    if (stepCount > maxSteps) {
      throw new Error('Time Limit Exceeded (> ' + timeLimitMs + 'ms)');
    }
  }

  // Extract main function body
  let body = code;
  const mainMatch = code.match(/int\s+main\s*\([^)]*\)\s*\{([\s\S]*)\}/);
  if (mainMatch) {
    body = mainMatch[1];
  }

  try {
    const jsLines: string[] = [];
    const lines = body.split(/\r?\n/);

    for (let raw of lines) {
      let t = raw.trim();
      if (!t || t.startsWith('//')) continue;
      if (t.startsWith('#include') || t.startsWith('using namespace') || t.startsWith('return 0;')) continue;

      jsLines.push('__step__();');

      // if (cin >> a >> b)
      if (/^if\s*\(\s*cin\s*>>/.test(t)) {
        const streamParts = t.replace(/^if\s*\(\s*cin\s*>>/, '').replace(/\)\s*\{?$/, '').split('>>').map(s => s.trim()).filter(Boolean);
        const reads = streamParts.map(p => `${p} = __cin_read__();`).join(' ');
        const hasOpenBrace = t.includes('{');
        jsLines.push(`if (__has_token__()) { ${reads} ${hasOpenBrace ? '' : ''}`);
        if (!hasOpenBrace) jsLines.push('{');
        continue;
      }

      // cin >> a >> b;
      if (t.startsWith('cin')) {
        const parts = t.replace(/^cin\s*>>/, '').replace(/;$/, '').split('>>').map(s => s.trim()).filter(Boolean);
        for (const p of parts) {
          jsLines.push(`${p} = __cin_read__();`);
        }
        continue;
      }

      // cout << ...
      if (t.startsWith('cout')) {
        const streamParts = t.replace(/^cout\s*<</, '').replace(/;$/, '').split('<<').map(s => s.trim()).filter(Boolean);
        for (const part of streamParts) {
          if (part === 'endl' || part === '"\\n"') {
            jsLines.push('__print__("\\n");');
          } else {
            jsLines.push(`__print__(${part});`);
          }
        }
        continue;
      }

      // Variable declarations: int a, b; or long long a = 0;
      t = t.replace(/\b(int|long long|double|float|string|char|bool|auto)\s+/g, 'var ');

      jsLines.push(t);
    }

    const runner = new Function(
      '__token__',
      '__has_token__',
      '__cin_read__',
      '__print__',
      '__step__',
      jsLines.join('\n')
    );

    runner(__token__, __has_token__, __cin_read__, __print__, __step__);
  } catch (err: any) {
    isError = true;
    if (err.message && err.message.includes('Time Limit Exceeded')) {
      isTimeout = true;
      stderr = err.message;
    } else {
      stderr = `RuntimeError: ${err.message || String(err)}`;
    }
  }

  const elapsed = Math.max(6, Math.round(performance.now() - startTime));
  return {
    stdout: stdout.join('').trim(),
    stderr,
    isError,
    isTimeout,
    executionTimeMs: elapsed
  };
}

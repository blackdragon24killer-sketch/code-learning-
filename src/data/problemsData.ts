import { Problem } from '../types';

export const initialProblems: Problem[] = [
  // ==========================================
  // PYTHON PROBLEMS (20 Problems)
  // ==========================================
  // Easy (5 Python)
  {
    id: 'py-01',
    slug: 'sum-of-two-numbers',
    titleKhmer: 'បូកលេខពីរ',
    titleEnglish: 'Sum of Two Numbers',
    descriptionKhmer: 'សរសេរកម្មវិធីដើម្បីបញ្ចូលចំនួនគត់ពីរ a និង b ហើយបង្ហាញផលបូកសរុបរបស់វា។',
    inputKhmer: 'បញ្ចូលចំនួនគត់ពីរ a និង b នៅលើបន្ទាត់តែមួយ ដោយខណ្ឌដោយចន្លោះ (Space)។',
    outputKhmer: 'បង្ហាញផលបូក a + b ជាចំនួនគត់។',
    constraintsKhmer: '-10^9 <= a, b <= 10^9',
    difficulty: 'easy',
    language: 'python',
    category: 'Beginner',
    points: 10,
    timeLimitMs: 1000,
    memoryLimitMb: 64,
    starterCodePython: `a, b = map(int, input().split())
# សរសេរកូដរបស់អ្នកនៅទីនេះ
print(a + b)
`,
    starterCodeCpp: `#include <iostream>
using namespace std;

int main() {
    long long a, b;
    if (cin >> a >> b) {
        cout << a + b << endl;
    }
    return 0;
}
`,
    examples: [
      { input: '3 5', output: '8', explanationKhmer: 'ផលបូកនៃ 3 + 5 គឺ 8' },
      { input: '-10 25', output: '15', explanationKhmer: 'ផលបូកនៃ -10 + 25 គឺ 15' }
    ],
    testCases: [
      { id: 'tc1', input: '3 5', expectedOutput: '8', isHidden: false },
      { id: 'tc2', input: '-10 25', expectedOutput: '15', isHidden: false },
      { id: 'tc3', input: '0 0', expectedOutput: '0', isHidden: true },
      { id: 'tc4', input: '100000000 200000000', expectedOutput: '300000000', isHidden: true }
    ],
    authorName: 'លោកគ្រូ សុខា',
    createdAt: '2026-08-01'
  },
  {
    id: 'py-02',
    slug: 'even-or-odd',
    titleKhmer: 'ពិនិត្យលេខគូ ឬលេខសេស',
    titleEnglish: 'Even or Odd Number',
    descriptionKhmer: 'សរសេរកម្មវិធីដើម្បីពិនិត្យមើលថាតើចំនួនគត់ n ដែលបានបញ្ចូលជាលេខគូ (EVEN) ឬលេខសេស (ODD)។',
    inputKhmer: 'បញ្ចូលចំនួនគត់វិជ្ជមាន n មួយ។',
    outputKhmer: 'បង្ហាញពាក្យ "EVEN" បើសិនជាលេខគូ ឬ "ODD" បើសិនជាលេខសេស។',
    constraintsKhmer: '1 <= n <= 10^6',
    difficulty: 'easy',
    language: 'python',
    category: 'Beginner',
    points: 10,
    timeLimitMs: 1000,
    memoryLimitMb: 64,
    starterCodePython: `n = int(input())
# សរសេរកូដរបស់អ្នកនៅទីនេះ
if n % 2 == 0:
    print("EVEN")
else:
    print("ODD")
`,
    starterCodeCpp: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    cout << (n % 2 == 0 ? "EVEN" : "ODD") << endl;
    return 0;
}
`,
    examples: [
      { input: '4', output: 'EVEN', explanationKhmer: '4 ចែកដាច់នឹង 2 ដូចនេះជាលេខគូ' },
      { input: '7', output: 'ODD', explanationKhmer: '7 ចែកនឹង 2 សល់សំណល់ 1 ដូចនេះជាលេខសេស' }
    ],
    testCases: [
      { id: 'tc1', input: '4', expectedOutput: 'EVEN', isHidden: false },
      { id: 'tc2', input: '7', expectedOutput: 'ODD', isHidden: false },
      { id: 'tc3', input: '1000000', expectedOutput: 'EVEN', isHidden: true },
      { id: 'tc4', input: '999999', expectedOutput: 'ODD', isHidden: true }
    ],
    authorName: 'អ្នកគ្រូ វណ្ណដា',
    createdAt: '2026-08-02'
  },
  {
    id: 'py-03',
    slug: 'find-maximum',
    titleKhmer: 'ស្វែងរកតម្លៃធំបំផុតក្នុងចំណោម ៣ លេខ',
    titleEnglish: 'Find Maximum of Three Numbers',
    descriptionKhmer: 'បញ្ចូលចំនួនគត់ ៣ តម្លៃ រួចស្វែងរកនិងបង្ហាញតម្លៃដែលធំបំផុតក្នុងចំណោមនោះ។',
    inputKhmer: 'ចំនួនគត់បី a, b, c ខណ្ឌដោយចន្លោះ។',
    outputKhmer: 'បង្ហាញតម្លៃធំបំផុត។',
    constraintsKhmer: '-10^5 <= a, b, c <= 10^5',
    difficulty: 'easy',
    language: 'python',
    category: 'Beginner',
    points: 10,
    timeLimitMs: 1000,
    memoryLimitMb: 64,
    starterCodePython: `a, b, c = map(int, input().split())
# សរសេរកូដរបស់អ្នកនៅទីនេះ
print(max(a, b, c))
`,
    starterCodeCpp: `#include <iostream>
#include <algorithm>
using namespace std;

int main() {
    int a, b, c;
    cin >> a >> b >> c;
    cout << max({a, b, c}) << endl;
    return 0;
}
`,
    examples: [
      { input: '12 45 30', output: '45', explanationKhmer: '45 ជាតម្លៃធំបំផុត' }
    ],
    testCases: [
      { id: 'tc1', input: '12 45 30', expectedOutput: '45', isHidden: false },
      { id: 'tc2', input: '-5 -20 -3', expectedOutput: '-3', isHidden: false },
      { id: 'tc3', input: '100 100 99', expectedOutput: '100', isHidden: true }
    ],
    authorName: 'លោកគ្រូ សុខា',
    createdAt: '2026-08-03'
  },
  {
    id: 'py-04',
    slug: 'celsius-to-fahrenheit',
    titleKhmer: 'បំប្លែងសីតុណ្ហភាពពី Celsius ទៅ Fahrenheit',
    titleEnglish: 'Celsius to Fahrenheit',
    descriptionKhmer: 'សរសេរកម្មវិធីគណនាបំប្លែងសីតុណ្ហភាពអង្សាសេ C ទៅជា F ដោយរូបមន្ត F = (C * 9/5) + 32។ បង្ហាញលទ្ធផលត្រឹមទសភាគ ១ ខ្ទង់។',
    inputKhmer: 'តម្លៃអង្សាសេ C (ចំនួនទសភាគ ឬចំនួនគត់)។',
    outputKhmer: 'បង្ហាញតម្លៃជា Fahrenheit (ទសភាគ ១ ខ្ទង់)។',
    constraintsKhmer: '-100 <= C <= 100',
    difficulty: 'easy',
    language: 'python',
    category: 'Beginner',
    points: 10,
    timeLimitMs: 1000,
    memoryLimitMb: 64,
    starterCodePython: `c = float(input())
# សរសេរកូដរបស់អ្នកនៅទីនេះ
f = (c * 9/5) + 32
print(f"{f:.1f}")
`,
    starterCodeCpp: `#include <iostream>
#include <iomanip>
using namespace std;

int main() {
    double c;
    cin >> c;
    double f = (c * 9.0 / 5.0) + 32.0;
    cout << fixed << setprecision(1) << f << endl;
    return 0;
}
`,
    examples: [
      { input: '0', output: '32.0', explanationKhmer: '0 អង្សាសេ = 32.0 F' },
      { input: '100', output: '212.0', explanationKhmer: '100 អង្សាសេ = 212.0 F' }
    ],
    testCases: [
      { id: 'tc1', input: '0', expectedOutput: '32.0', isHidden: false },
      { id: 'tc2', input: '100', expectedOutput: '212.0', isHidden: false },
      { id: 'tc3', input: '37', expectedOutput: '98.6', isHidden: true }
    ],
    authorName: 'អ្នកគ្រូ ចិន្តា',
    createdAt: '2026-08-04'
  },
  {
    id: 'py-05',
    slug: 'count-vowels',
    titleKhmer: 'រាប់ចំនួនស្រៈជាភាសាអង់គ្លេស',
    titleEnglish: 'Count Vowels in String',
    descriptionKhmer: 'សរសេរកម្មវិធីដើម្បីរាប់ចំនួនស្រៈ (a, e, i, o, u ទាំងតូចទាំងធំ) ដែលមាននៅក្នុងឃ្លា string មួយ។',
    inputKhmer: 'ខ្សែអក្សរ (String) មួយបន្ទាត់។',
    outputKhmer: 'បង្ហាញចំនួនស្រៈសរុប។',
    constraintsKhmer: 'ប្រវែងខ្សែអក្សរ <= 1000',
    difficulty: 'easy',
    language: 'python',
    category: 'Beginner',
    points: 10,
    timeLimitMs: 1000,
    memoryLimitMb: 64,
    starterCodePython: `s = input()
# សរសេរកូដរបស់អ្នកនៅទីនេះ
vowels = "aeiouAEIOU"
count = sum(1 for ch in s if ch in vowels)
print(count)
`,
    starterCodeCpp: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string s;
    getline(cin, s);
    string v = "aeiouAEIOU";
    int count = 0;
    for (char c : s) {
        if (v.find(c) != string::npos) count++;
    }
    cout << count << endl;
    return 0;
}
`,
    examples: [
      { input: 'Khmer Code Test', output: '4', explanationKhmer: 'ស្រៈមាន e, o, e, e សរុប 4' }
    ],
    testCases: [
      { id: 'tc1', input: 'Khmer Code Test', expectedOutput: '4', isHidden: false },
      { id: 'tc2', input: 'Python', expectedOutput: '1', isHidden: false },
      { id: 'tc3', input: 'Cambodia 2026', expectedOutput: '4', isHidden: true }
    ],
    authorName: 'លោកគ្រូ សុខា',
    createdAt: '2026-08-05'
  },

  // Medium (10 Python)
  {
    id: 'py-06',
    slug: 'palindrome-check',
    titleKhmer: 'ពិនិត្យពាក្យឆ្លុះ (Palindrome)',
    titleEnglish: 'Palindrome String Check',
    descriptionKhmer: 'ពិនិត្យមើលថាតើពាក្យដែលបានបញ្ចូលអាចអានពីឆ្វេងទៅស្តាំ និងពីស្តាំទៅឆ្វេងដូចគ្នាដែរឬទេ (មិនគិតពីអក្សរធំ/តូច)។',
    inputKhmer: 'ខ្សែអក្សរ s មួយពាក្យ។',
    outputKhmer: 'បង្ហាញ "YES" ប្រសិនបើជា Palindrome ឬ "NO" បើមិនមែន។',
    constraintsKhmer: '1 <= len(s) <= 10^5',
    difficulty: 'medium',
    language: 'python',
    category: 'Algorithms',
    points: 20,
    timeLimitMs: 1000,
    memoryLimitMb: 64,
    starterCodePython: `s = input().strip().lower()
# សរសេរកូដរបស់អ្នកនៅទីនេះ
if s == s[::-1]:
    print("YES")
else:
    print("NO")
`,
    starterCodeCpp: `#include <iostream>
#include <string>
#include <algorithm>
using namespace std;

int main() {
    string s;
    cin >> s;
    for (char &c : s) c = tolower(c);
    string rev = s;
    reverse(rev.begin(), rev.end());
    cout << (s == rev ? "YES" : "NO") << endl;
    return 0;
}
`,
    examples: [
      { input: 'radar', output: 'YES', explanationKhmer: 'radar អានត្រឡប់គឺ radar' },
      { input: 'hello', output: 'NO', explanationKhmer: 'hello អានត្រឡប់គឺ olleh មិនដូចគ្នាទេ' }
    ],
    testCases: [
      { id: 'tc1', input: 'radar', expectedOutput: 'YES', isHidden: false },
      { id: 'tc2', input: 'hello', expectedOutput: 'NO', isHidden: false },
      { id: 'tc3', input: 'Madam', expectedOutput: 'YES', isHidden: true }
    ],
    authorName: 'អ្នកគ្រូ វណ្ណដា',
    createdAt: '2026-08-06'
  },
  {
    id: 'py-07',
    slug: 'fibonacci-number',
    titleKhmer: 'គណនាតម្លៃ Fibonacci ទី n',
    titleEnglish: 'N-th Fibonacci Number',
    descriptionKhmer: 'គណនាតម្លៃតួទី n នៃស្វីត Fibonacci ដោយ F(0) = 0, F(1) = 1, F(n) = F(n-1) + F(n-2)។',
    inputKhmer: 'ចំនួនគត់ n (0 <= n <= 40)។',
    outputKhmer: 'បង្ហាញតម្លៃ F(n)។',
    constraintsKhmer: '0 <= n <= 40',
    difficulty: 'medium',
    language: 'python',
    category: 'Algorithms',
    points: 20,
    timeLimitMs: 1000,
    memoryLimitMb: 64,
    starterCodePython: `n = int(input())
# សរសេរកូដរបស់អ្នកនៅទីនេះ
if n == 0:
    print(0)
elif n == 1:
    print(1)
else:
    a, b = 0, 1
    for _ in range(2, n + 1):
        a, b = b, a + b
    print(b)
`,
    starterCodeCpp: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    if (n <= 1) { cout << n << endl; return 0; }
    long long a = 0, b = 1;
    for (int i = 2; i <= n; i++) {
        long long next = a + b;
        a = b;
        b = next;
    }
    cout << b << endl;
    return 0;
}
`,
    examples: [
      { input: '6', output: '8', explanationKhmer: 'ស្វីត: 0, 1, 1, 2, 3, 5, 8' }
    ],
    testCases: [
      { id: 'tc1', input: '6', expectedOutput: '8', isHidden: false },
      { id: 'tc2', input: '10', expectedOutput: '55', isHidden: false },
      { id: 'tc3', input: '0', expectedOutput: '0', isHidden: true },
      { id: 'tc4', input: '25', expectedOutput: '75025', isHidden: true }
    ],
    authorName: 'លោកគ្រូ សុខា',
    createdAt: '2026-08-07'
  },
  {
    id: 'py-08',
    slug: 'prime-number-check',
    titleKhmer: 'ពិនិត្យចំនួនបឋម (Prime Number)',
    titleEnglish: 'Prime Number Verification',
    descriptionKhmer: 'សរសេរកម្មវិធីពិនិត្យមើលថាតើចំនួនគត់ n ដែលបានបញ្ចូលជាចំនួនបឋមដែរឬទេ។ ចំនួនបឋមជាចំនួនធំជាង 1 ដែលចែកដាច់នឹង 1 និងខ្លួនវាប៉ុណ្ណោះ។',
    inputKhmer: 'ចំនួនគត់វិជ្ជមាន n។',
    outputKhmer: 'បង្ហាញ "PRIME" បើជាចំនួនបឋម ឬ "NOT PRIME" បើមិនមែន។',
    constraintsKhmer: '1 <= n <= 10^9',
    difficulty: 'medium',
    language: 'python',
    category: 'Algorithms',
    points: 20,
    timeLimitMs: 1000,
    memoryLimitMb: 64,
    starterCodePython: `import math
n = int(input())
# សរសេរកូដរបស់អ្នកនៅទីនេះ
def is_prime(x):
    if x <= 1: return False
    if x <= 3: return True
    if x % 2 == 0 or x % 3 == 0: return False
    for i in range(5, int(math.isqrt(x)) + 1, 6):
        if x % i == 0 or x % (i + 2) == 0:
            return False
    return True

print("PRIME" if is_prime(n) else "NOT PRIME")
`,
    starterCodeCpp: `#include <iostream>
#include <cmath>
using namespace std;

bool isPrime(long long n) {
    if (n <= 1) return false;
    if (n <= 3) return true;
    if (n % 2 == 0 || n % 3 == 0) return false;
    for (long long i = 5; i * i <= n; i += 6) {
        if (n % i == 0 || n % (i + 2) == 0) return false;
    }
    return true;
}

int main() {
    long long n;
    cin >> n;
    cout << (isPrime(n) ? "PRIME" : "NOT PRIME") << endl;
    return 0;
}
`,
    examples: [
      { input: '17', output: 'PRIME', explanationKhmer: '17 ជាចំនួនបឋម' },
      { input: '15', output: 'NOT PRIME', explanationKhmer: '15 ចែកដាច់នឹង 3 និង 5' }
    ],
    testCases: [
      { id: 'tc1', input: '17', expectedOutput: 'PRIME', isHidden: false },
      { id: 'tc2', input: '15', expectedOutput: 'NOT PRIME', isHidden: false },
      { id: 'tc3', input: '1', expectedOutput: 'NOT PRIME', isHidden: true },
      { id: 'tc4', input: '999999937', expectedOutput: 'PRIME', isHidden: true }
    ],
    authorName: 'លោកគ្រូ សុខា',
    createdAt: '2026-08-08'
  },
  {
    id: 'py-09',
    slug: 'two-sum-indices',
    titleKhmer: 'ស្វែងរកគូដែលបូកស្មើ Target (Two Sum)',
    titleEnglish: 'Two Sum Target Problem',
    descriptionKhmer: 'គេឱ្យ Array ចំនួន n ធាតុ និងតម្លៃ target មួយ។ ស្វែងរក Index ទាំងពីរ (គិតពី 0) ដែលធាតុទាំងពីរនោះបូកចូលគ្នាស្មើនឹង target។ បង្ហាញ index តូចមុន index ធំ។',
    inputKhmer: 'បន្ទាត់ទី១: n និង target។ បន្ទាត់ទី២: តម្លៃធាតុទាំង n។',
    outputKhmer: 'បង្ហាញ index1 និង index2 ដោយខណ្ឌដោយចន្លោះ។ បើគ្មានបង្ហាញ -1។',
    constraintsKhmer: '2 <= n <= 10^5, -10^9 <= target, arr[i] <= 10^9',
    difficulty: 'medium',
    language: 'python',
    category: 'Data Structures',
    points: 20,
    timeLimitMs: 1500,
    memoryLimitMb: 64,
    starterCodePython: `n, target = map(int, input().split())
arr = list(map(int, input().split()))

seen = {}
found = False
for idx, num in enumerate(arr):
    diff = target - num
    if diff in seen:
        print(f"{seen[diff]} {idx}")
        found = True
        break
    seen[num] = idx

if not found:
    print("-1")
`,
    starterCodeCpp: `#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

int main() {
    int n;
    long long target;
    if (!(cin >> n >> target)) return 0;
    vector<long long> arr(n);
    for (int i = 0; i < n; i++) cin >> arr[i];
    unordered_map<long long, int> seen;
    for (int i = 0; i < n; i++) {
        long long diff = target - arr[i];
        if (seen.count(diff)) {
            cout << seen[diff] << " " << i << endl;
            return 0;
        }
        seen[arr[i]] = i;
    }
    cout << "-1" << endl;
    return 0;
}
`,
    examples: [
      { input: '4 9\n2 7 11 15', output: '0 1', explanationKhmer: 'arr[0] + arr[1] = 2 + 7 = 9' }
    ],
    testCases: [
      { id: 'tc1', input: '4 9\n2 7 11 15', expectedOutput: '0 1', isHidden: false },
      { id: 'tc2', input: '3 6\n3 2 4', expectedOutput: '1 2', isHidden: false },
      { id: 'tc3', input: '3 10\n1 2 3', expectedOutput: '-1', isHidden: true }
    ],
    authorName: 'លោកគ្រូ សុខា',
    createdAt: '2026-08-09'
  },
  {
    id: 'py-10',
    slug: 'valid-parentheses',
    titleKhmer: 'ពិនិត្យវង់ក្រចកត្រឹមត្រូវ (Valid Parentheses)',
    titleEnglish: 'Valid Parentheses Check',
    descriptionKhmer: 'ពិនិត្យមើលថាតើកន្សោមវង់ក្រចក (), {}, [] ដែលបានបញ្ចូល ត្រូវតាមក្បួនបិទបើកត្រឹមត្រូវដែរឬទេ។',
    inputKhmer: 'ខ្សែអក្សរនៃសញ្ញាវង់ក្រចក។',
    outputKhmer: 'បង្ហាញ "VALID" បើត្រឹមត្រូវ ឬ "INVALID" បើខុស។',
    constraintsKhmer: '1 <= len(s) <= 10^4',
    difficulty: 'medium',
    language: 'python',
    category: 'Data Structures',
    points: 20,
    timeLimitMs: 1000,
    memoryLimitMb: 64,
    starterCodePython: `s = input().strip()
stack = []
mapping = {')': '(', '}': '{', ']': '['}
valid = True

for ch in s:
    if ch in mapping.values():
        stack.append(ch)
    elif ch in mapping:
        if not stack or stack.pop() != mapping[ch]:
            valid = False
            break

if valid and len(stack) == 0:
    print("VALID")
else:
    print("INVALID")
`,
    starterCodeCpp: `#include <iostream>
#include <string>
#include <stack>
using namespace std;

int main() {
    string s;
    cin >> s;
    stack<char> st;
    for (char c : s) {
        if (c == '(' || c == '{' || c == '[') st.push(c);
        else {
            if (st.empty()) { cout << "INVALID" << endl; return 0; }
            char top = st.top();
            st.pop();
            if ((c == ')' && top != '(') || (c == '}' && top != '{') || (c == ']' && top != '[')) {
                cout << "INVALID" << endl; return 0;
            }
        }
    }
    cout << (st.empty() ? "VALID" : "INVALID") << endl;
    return 0;
}
`,
    examples: [
      { input: '()[]{}', output: 'VALID', explanationKhmer: 'វង់ក្រចកបិទបើកត្រូវតាមលំដាប់' },
      { input: '(]', output: 'INVALID', explanationKhmer: 'បើក ( តែបិទ ] មិនត្រូវគ្នា' }
    ],
    testCases: [
      { id: 'tc1', input: '()[]{}', expectedOutput: 'VALID', isHidden: false },
      { id: 'tc2', input: '(]', expectedOutput: 'INVALID', isHidden: false },
      { id: 'tc3', input: '{[()]}', expectedOutput: 'VALID', isHidden: true },
      { id: 'tc4', input: '(((((', expectedOutput: 'INVALID', isHidden: true }
    ],
    authorName: 'អ្នកគ្រូ វណ្ណដា',
    createdAt: '2026-08-10'
  },
  {
    id: 'py-11',
    slug: 'anagram-check',
    titleKhmer: 'ពិនិត្យពាក្យក្លាយ (Anagram)',
    titleEnglish: 'Valid Anagram Check',
    descriptionKhmer: 'គេឱ្យពាក្យពីរ s1 និង s2។ ពិនិត្យមើលថាតើពាក្យទាំងពីរផ្សំឡើងពីអក្សរដដែលៗ និងចំនួនស្មើគ្នាដែរឬទេ (មិនគិតពីលំដាប់)។',
    inputKhmer: 'បន្ទាត់ទី១: s1, បន្ទាត់ទី២: s2។',
    outputKhmer: 'បង្ហាញ "ANAGRAM" បើត្រូវ ឬ "NOT ANAGRAM" បើមិនត្រូវ។',
    constraintsKhmer: '1 <= len(s1), len(s2) <= 5 * 10^4',
    difficulty: 'medium',
    language: 'python',
    category: 'Algorithms',
    points: 20,
    timeLimitMs: 1000,
    memoryLimitMb: 64,
    starterCodePython: `from collections import Counter
s1 = input().strip()
s2 = input().strip()

if Counter(s1) == Counter(s2):
    print("ANAGRAM")
else:
    print("NOT ANAGRAM")
`,
    starterCodeCpp: `#include <iostream>
#include <string>
#include <algorithm>
using namespace std;

int main() {
    string s1, s2;
    cin >> s1 >> s2;
    sort(s1.begin(), s1.end());
    sort(s2.begin(), s2.end());
    cout << (s1 == s2 ? "ANAGRAM" : "NOT ANAGRAM") << endl;
    return 0;
}
`,
    examples: [
      { input: 'anagram\nnagaram', output: 'ANAGRAM', explanationKhmer: 'ពាក្យទាំងពីរមានអក្សរដូចគ្នា' }
    ],
    testCases: [
      { id: 'tc1', input: 'anagram\nnagaram', expectedOutput: 'ANAGRAM', isHidden: false },
      { id: 'tc2', input: 'rat\ncar', expectedOutput: 'NOT ANAGRAM', isHidden: false },
      { id: 'tc3', input: 'listen\nsilent', expectedOutput: 'ANAGRAM', isHidden: true }
    ],
    authorName: 'លោកគ្រូ សុខា',
    createdAt: '2026-08-11'
  },
  {
    id: 'py-12',
    slug: 'matrix-transpose',
    titleKhmer: 'ត្រឡប់ម៉ាទ្រីស (Matrix Transpose)',
    titleEnglish: 'Transpose of Matrix',
    descriptionKhmer: 'គេឱ្យម៉ាទ្រីសទំហំ R x C។ ចូរគណនាម៉ាទ្រីសត្រឡប់ (Transpose) ទំហំ C x R ដោយប្តូរជួរដេកទៅជាជួរឈរ។',
    inputKhmer: 'បន្ទាត់ទី១: ចំនួនជួរដេក R និងជួរឈរ C។ បន្ទាត់បន្តបន្ទាប់: តម្លៃធាតុក្នុងម៉ាទ្រីស។',
    outputKhmer: 'បង្ហាញម៉ាទ្រីសត្រឡប់ C ជួរដេក និង R ជួរឈរ។',
    constraintsKhmer: '1 <= R, C <= 100',
    difficulty: 'medium',
    language: 'python',
    category: 'Algorithms',
    points: 20,
    timeLimitMs: 1000,
    memoryLimitMb: 64,
    starterCodePython: `r, c = map(int, input().split())
matrix = [list(map(int, input().split())) for _ in range(r)]

for j in range(c):
    row = [str(matrix[i][j]) for i in range(r)]
    print(" ".join(row))
`,
    starterCodeCpp: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int r, c;
    cin >> r >> c;
    vector<vector<int>> mat(r, vector<int>(c));
    for (int i = 0; i < r; i++) {
        for (int j = 0; j < c; j++) cin >> mat[i][j];
    }
    for (int j = 0; j < c; j++) {
        for (int i = 0; i < r; i++) {
            cout << mat[i][j] << (i == r - 1 ? "" : " ");
        }
        cout << endl;
    }
    return 0;
}
`,
    examples: [
      { input: '2 3\n1 2 3\n4 5 6', output: '1 4\n2 5\n3 6', explanationKhmer: 'ជួរដេកទីមួយ (1 2 3) ក្លាយជាជួរឈរទីមួយ' }
    ],
    testCases: [
      { id: 'tc1', input: '2 3\n1 2 3\n4 5 6', expectedOutput: '1 4\n2 5\n3 6', isHidden: false },
      { id: 'tc2', input: '1 1\n42', expectedOutput: '42', isHidden: false }
    ],
    authorName: 'លោកគ្រូ សុខា',
    createdAt: '2026-08-12'
  },
  {
    id: 'py-13',
    slug: 'binary-search',
    titleKhmer: 'ការរុករកគោលពីរ (Binary Search)',
    titleEnglish: 'Binary Search Implementation',
    descriptionKhmer: 'គេឱ្យ Array ដែលបានរៀបតាមលំដាប់ឡើងចំនួន n ធាតុ និងតម្លៃ key មួយ។ ស្វែងរក index នៃ key នោះ។ បើមិនឃើញបង្ហាញ -1។',
    inputKhmer: 'បន្ទាត់ទី១: n និង key។ បន្ទាត់ទី២: ធាតុទាំង n។',
    outputKhmer: 'បង្ហាញ Index (គិតចាប់ពី 0) ឬ -1។',
    constraintsKhmer: '1 <= n <= 10^5, O(log n) time complexity required.',
    difficulty: 'medium',
    language: 'python',
    category: 'Algorithms',
    points: 20,
    timeLimitMs: 1000,
    memoryLimitMb: 64,
    starterCodePython: `n, key = map(int, input().split())
arr = list(map(int, input().split()))

left, right = 0, n - 1
ans = -1
while left <= right:
    mid = (left + right) // 2
    if arr[mid] == key:
        ans = mid
        break
    elif arr[mid] < key:
        left = mid + 1
    else:
        right = mid - 1

print(ans)
`,
    starterCodeCpp: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n, key;
    cin >> n >> key;
    vector<int> arr(n);
    for (int i = 0; i < n; i++) cin >> arr[i];
    int l = 0, r = n - 1, ans = -1;
    while (l <= r) {
        int mid = l + (r - l) / 2;
        if (arr[mid] == key) { ans = mid; break; }
        else if (arr[mid] < key) l = mid + 1;
        else r = mid - 1;
    }
    cout << ans << endl;
    return 0;
}
`,
    examples: [
      { input: '5 7\n1 3 5 7 9', output: '3', explanationKhmer: 'លេខ 7 ស្ថិតនៅ index 3' }
    ],
    testCases: [
      { id: 'tc1', input: '5 7\n1 3 5 7 9', expectedOutput: '3', isHidden: false },
      { id: 'tc2', input: '4 6\n2 4 8 10', expectedOutput: '-1', isHidden: false }
    ],
    authorName: 'លោកគ្រូ សុខា',
    createdAt: '2026-08-13'
  },
  {
    id: 'py-14',
    slug: 'caesar-cipher',
    titleKhmer: 'លេខកូដសម្ងាត់ Caesar Cipher',
    titleEnglish: 'Caesar Cipher Encryption',
    descriptionKhmer: 'បំប្លែងអក្សរនីមួយៗក្នុងពាក្យទៅមុខ k ជំហាន (Shift Cipher) សម្រាប់តែអក្សរ a-z (អក្សរតូច)។ ឧទាហរណ៍: k=2, "a" -> "c", "z" -> "b"។',
    inputKhmer: 'បន្ទាត់ទី១: ខ្សែអក្សរ s។ បន្ទាត់ទី២: ចំនួនជំហាន k។',
    outputKhmer: 'បង្ហាញខ្សែអក្សរដែលបានបម្លែង។',
    constraintsKhmer: '1 <= len(s) <= 10^4, 0 <= k <= 100',
    difficulty: 'medium',
    language: 'python',
    category: 'Algorithms',
    points: 20,
    timeLimitMs: 1000,
    memoryLimitMb: 64,
    starterCodePython: `s = input().strip()
k = int(input()) % 26

res = []
for ch in s:
    if 'a' <= ch <= 'z':
        new_ch = chr((ord(ch) - ord('a') + k) % 26 + ord('a'))
        res.append(new_ch)
    else:
        res.append(ch)

print("".join(res))
`,
    starterCodeCpp: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string s;
    int k;
    cin >> s >> k;
    k %= 26;
    for (char &c : s) {
        if (c >= 'a' && c <= 'z') {
            c = (c - 'a' + k) % 26 + 'a';
        }
    }
    cout << s << endl;
    return 0;
}
`,
    examples: [
      { input: 'abc\n2', output: 'cde', explanationKhmer: 'រុញ ២ ជំហាន' },
      { input: 'xyz\n3', output: 'abc', explanationKhmer: 'រុញ ៣ ជំហានវិលជុំ' }
    ],
    testCases: [
      { id: 'tc1', input: 'abc\n2', expectedOutput: 'cde', isHidden: false },
      { id: 'tc2', input: 'xyz\n3', expectedOutput: 'abc', isHidden: false }
    ],
    authorName: 'អ្នកគ្រូ ចិន្តា',
    createdAt: '2026-08-14'
  },
  {
    id: 'py-15',
    slug: 'remove-duplicates',
    titleKhmer: 'លុបធាតុស្ទួនក្នុង Array',
    titleEnglish: 'Remove Duplicate Elements',
    descriptionKhmer: 'គេឱ្យ Array មួយដែលមានធាតុស្ទួន។ ចូរលុបធាតុដែលស្ទួនចេញដោយរក្សាលំដាប់លេចឡើងដំបូងនៃធាតុនីមួយៗ។',
    inputKhmer: 'បន្ទាត់ទី១: ចំនួនធាតុ n។ បន្ទាត់ទី២: តម្លៃធាតុទាំង n។',
    outputKhmer: 'បង្ហាញធាតុដែលនៅសល់ដោយខណ្ឌដោយចន្លោះ។',
    constraintsKhmer: '1 <= n <= 10^5',
    difficulty: 'medium',
    language: 'python',
    category: 'Data Structures',
    points: 20,
    timeLimitMs: 1000,
    memoryLimitMb: 64,
    starterCodePython: `n = int(input())
arr = list(map(int, input().split()))

seen = set()
res = []
for x in arr:
    if x not in seen:
        seen.add(x)
        res.append(str(x))

print(" ".join(res))
`,
    starterCodeCpp: `#include <iostream>
#include <vector>
#include <unordered_set>
using namespace std;

int main() {
    int n;
    cin >> n;
    unordered_set<int> seen;
    bool first = true;
    for (int i = 0; i < n; i++) {
        int x;
        cin >> x;
        if (!seen.count(x)) {
            seen.insert(x);
            if (!first) cout << " ";
            cout << x;
            first = false;
        }
    }
    cout << endl;
    return 0;
}
`,
    examples: [
      { input: '6\n1 2 2 3 4 3', output: '1 2 3 4', explanationKhmer: 'រក្សាទុក 1, 2, 3, 4 តាមលំដាប់ដើម' }
    ],
    testCases: [
      { id: 'tc1', input: '6\n1 2 2 3 4 3', expectedOutput: '1 2 3 4', isHidden: false },
      { id: 'tc2', input: '5\n5 5 5 5 5', expectedOutput: '5', isHidden: false }
    ],
    authorName: 'លោកគ្រូ សុខា',
    createdAt: '2026-08-15'
  },

  // Hard (5 Python)
  {
    id: 'py-16',
    slug: 'longest-common-subsequence',
    titleKhmer: 'ស្វីតរងរួមវែងបំផុត (Longest Common Subsequence)',
    titleEnglish: 'Longest Common Subsequence (LCS)',
    descriptionKhmer: 'គេឱ្យខ្សែអក្សរពីរ text1 និង text2។ ស្វែងរកប្រវែងនៃស្វីតរងរួមដែលវែងបំផុតរវាងខ្សែអក្សរទាំងពីរ។',
    inputKhmer: 'បន្ទាត់ទី១: text1, បន្ទាត់ទី២: text2។',
    outputKhmer: 'បង្ហាញចំនួនប្រវែង LCS។',
    constraintsKhmer: '1 <= len(text1), len(text2) <= 1000',
    difficulty: 'hard',
    language: 'python',
    category: 'Algorithms',
    points: 30,
    timeLimitMs: 1500,
    memoryLimitMb: 128,
    starterCodePython: `s1 = input().strip()
s2 = input().strip()
m, n = len(s1), len(s2)

dp = [[0] * (n + 1) for _ in range(m + 1)]
for i in range(1, m + 1):
    for j in range(1, n + 1):
        if s1[i-1] == s2[j-1]:
            dp[i][j] = dp[i-1][j-1] + 1
        else:
            dp[i][j] = max(dp[i-1][j], dp[i][j-1])

print(dp[m][n])
`,
    starterCodeCpp: `#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    string s1, s2;
    cin >> s1 >> s2;
    int m = s1.size(), n = s2.size();
    vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (s1[i-1] == s2[j-1]) dp[i][j] = dp[i-1][j-1] + 1;
            else dp[i][j] = max(dp[i-1][j], dp[i][j-1]);
        }
    }
    cout << dp[m][n] << endl;
    return 0;
}
`,
    examples: [
      { input: 'abcde\nace', output: '3', explanationKhmer: 'LCS គឺ "ace" ដែលមានប្រវែង 3' }
    ],
    testCases: [
      { id: 'tc1', input: 'abcde\nace', expectedOutput: '3', isHidden: false },
      { id: 'tc2', input: 'abc\nabc', expectedOutput: '3', isHidden: false },
      { id: 'tc3', input: 'abc\ndef', expectedOutput: '0', isHidden: true }
    ],
    authorName: 'លោកគ្រូ សុខា',
    createdAt: '2026-08-16'
  },
  {
    id: 'py-17',
    slug: 'knapsack-01',
    titleKhmer: 'បញ្ហាកាតាប ០/១ (0/1 Knapsack)',
    titleEnglish: '0/1 Knapsack Problem',
    descriptionKhmer: 'មានសម្ភារៈ n មុខ ដែលមានទម្ងន់ w[i] និងតម្លៃ v[i]។ ស្វែងរកតម្លៃអតិបរមាដែលអាចដាក់ក្នុងកាតាបដែលផ្ទុកទម្ងន់បានត្រឹម W។',
    inputKhmer: 'បន្ទាត់ទី១: n និង W។ បន្ទាត់ទី២: ទម្ងន់របស់សម្ភារៈនីមួយៗ។ បន្ទាត់ទី៣: តម្លៃរបស់សម្ភារៈនីមួយៗ។',
    outputKhmer: 'បង្ហាញតម្លៃអតិបរមាដែលអាចប្រមូលបាន។',
    constraintsKhmer: '1 <= n <= 100, 1 <= W <= 1000',
    difficulty: 'hard',
    language: 'python',
    category: 'Algorithms',
    points: 30,
    timeLimitMs: 1500,
    memoryLimitMb: 128,
    starterCodePython: `n, W = map(int, input().split())
weights = list(map(int, input().split()))
values = list(map(int, input().split()))

dp = [0] * (W + 1)
for i in range(n):
    w, v = weights[i], values[i]
    for j in range(W, w - 1, -1):
        dp[j] = max(dp[j], dp[j - w] + v)

print(dp[W])
`,
    starterCodeCpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n, W;
    cin >> n >> W;
    vector<int> wt(n), val(n);
    for (int i = 0; i < n; i++) cin >> wt[i];
    for (int i = 0; i < n; i++) cin >> val[i];
    vector<int> dp(W + 1, 0);
    for (int i = 0; i < n; i++) {
        for (int j = W; j >= wt[i]; j--) {
            dp[j] = max(dp[j], dp[j - wt[i]] + val[i]);
        }
    }
    cout << dp[W] << endl;
    return 0;
}
`,
    examples: [
      { input: '3 50\n10 20 30\n60 100 120', output: '220', explanationKhmer: 'ជ្រើសរើសរបស់ទម្ងន់ 20 និង 30 សរុបទម្ងន់ 50 តម្លៃ 100 + 120 = 220' }
    ],
    testCases: [
      { id: 'tc1', input: '3 50\n10 20 30\n60 100 120', expectedOutput: '220', isHidden: false },
      { id: 'tc2', input: '1 10\n20\n100', expectedOutput: '0', isHidden: false }
    ],
    authorName: 'លោកគ្រូ សុខា',
    createdAt: '2026-08-17'
  },
  {
    id: 'py-18',
    slug: 'shortest-path-dijkstra',
    titleKhmer: 'ផ្លូវខ្លីបំផុត Dijkstra',
    titleEnglish: 'Shortest Path with Dijkstra',
    descriptionKhmer: 'គេឱ្យក្រាហ្វមានទិសដៅនិងទម្ងន់។ រកចម្ងាយផ្លូវខ្លីបំផុតពីកំពូល source 0 ទៅកាន់កំពូល target។',
    inputKhmer: 'បន្ទាត់ទី១: ចំនួនកំពូល V និងចំនួនជ្រុង E។ បន្ទាត់បន្តបន្ទាប់ E: u v w (ពី u ទៅ v ទម្ងន់ w)។ បន្ទាត់ចុងក្រោយ: target node។',
    outputKhmer: 'បង្ហាញប្រវែងផ្លូវខ្លីបំផុត ឬ -1 បើដើរមិនដល់។',
    constraintsKhmer: '1 <= V <= 1000, 0 <= E <= 5000',
    difficulty: 'hard',
    language: 'python',
    category: 'Algorithms',
    points: 30,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    starterCodePython: `import heapq

v, e = map(int, input().split())
adj = {i: [] for i in range(v)}
for _ in range(e):
    u, to, w = map(int, input().split())
    adj[u].append((to, w))

target = int(input())

dist = {i: float('inf') for i in range(v)}
dist[0] = 0
pq = [(0, 0)]

while pq:
    d, u = heapq.heappop(pq)
    if d > dist[u]: continue
    for to, w in adj[u]:
        if dist[u] + w < dist[to]:
            dist[to] = dist[u] + w
            heapq.heappush(pq, (dist[to], to))

ans = dist[target]
print(ans if ans != float('inf') else -1)
`,
    starterCodeCpp: `#include <iostream>
#include <vector>
#include <queue>
using namespace std;

const int INF = 1e9;

int main() {
    int v, e;
    if (!(cin >> v >> e)) return 0;
    vector<vector<pair<int, int>>> adj(v);
    for (int i = 0; i < e; i++) {
        int u, to, w;
        cin >> u >> to >> w;
        adj[u].push_back({to, w});
    }
    int target;
    cin >> target;
    vector<int> dist(v, INF);
    dist[0] = 0;
    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;
    pq.push({0, 0});
    while (!pq.empty()) {
        auto [d, u] = pq.top();
        pq.pop();
        if (d > dist[u]) continue;
        for (auto edge : adj[u]) {
            int to = edge.first, w = edge.second;
            if (dist[u] + w < dist[to]) {
                dist[to] = dist[u] + w;
                pq.push({dist[to], to});
            }
        }
    }
    cout << (dist[target] == INF ? -1 : dist[target]) << endl;
    return 0;
}
`,
    examples: [
      { input: '4 4\n0 1 1\n1 2 2\n0 2 5\n2 3 1\n3', output: '4', explanationKhmer: 'ផ្លូវ 0 -> 1 -> 2 -> 3 សរុប 1+2+1 = 4' }
    ],
    testCases: [
      { id: 'tc1', input: '4 4\n0 1 1\n1 2 2\n0 2 5\n2 3 1\n3', expectedOutput: '4', isHidden: false },
      { id: 'tc2', input: '3 1\n0 1 2\n2', expectedOutput: '-1', isHidden: false }
    ],
    authorName: 'លោកគ្រូ សុខា',
    createdAt: '2026-08-18'
  },
  {
    id: 'py-19',
    slug: 'word-break-problem',
    titleKhmer: 'បំបែកពាក្យតាមវចនានុក្រម (Word Break)',
    titleEnglish: 'Word Break Problem',
    descriptionKhmer: 'ពិនិត្យមើលថាតើខ្សែអក្សរ s អាចបំបែកជាពាក្យតូចៗដែលមាននៅក្នុងបញ្ជីវចនានុក្រមដែលបានផ្ដល់ឱ្យបានដែរឬទេ។',
    inputKhmer: 'បន្ទាត់ទី១: ខ្សែអក្សរ s។ បន្ទាត់ទី២: ចំនួនពាក្យក្នុងវចនានុក្រម m។ បន្ទាត់ទី៣: ពាក្យទាំង m ខណ្ឌដោយចន្លោះ។',
    outputKhmer: 'បង្ហាញ "YES" បើអាចបំបែកបាន ឬ "NO" បើមិនអាច។',
    constraintsKhmer: '1 <= len(s) <= 300, 1 <= m <= 1000',
    difficulty: 'hard',
    language: 'python',
    category: 'Algorithms',
    points: 30,
    timeLimitMs: 1000,
    memoryLimitMb: 64,
    starterCodePython: `s = input().strip()
m = int(input())
word_dict = set(input().split())

dp = [False] * (len(s) + 1)
dp[0] = True

for i in range(1, len(s) + 1):
    for j in range(i):
        if dp[j] and s[j:i] in word_dict:
            dp[i] = True
            break

print("YES" if dp[len(s)] else "NO")
`,
    starterCodeCpp: `#include <iostream>
#include <string>
#include <vector>
#include <unordered_set>
using namespace std;

int main() {
    string s;
    cin >> s;
    int m;
    cin >> m;
    unordered_set<string> dict;
    for (int i = 0; i < m; i++) {
        string w; cin >> w; dict.insert(w);
    }
    int n = s.size();
    vector<bool> dp(n + 1, false);
    dp[0] = true;
    for (int i = 1; i <= n; i++) {
        for (int j = 0; j < i; j++) {
            if (dp[j] && dict.count(s.substr(j, i - j))) {
                dp[i] = true;
                break;
            }
        }
    }
    cout << (dp[n] ? "YES" : "NO") << endl;
    return 0;
}
`,
    examples: [
      { input: 'khmercode\n2\nkhmer code', output: 'YES', explanationKhmer: '"khmer" + "code" ផ្គុំបាន "khmercode"' }
    ],
    testCases: [
      { id: 'tc1', input: 'khmercode\n2\nkhmer code', expectedOutput: 'YES', isHidden: false },
      { id: 'tc2', input: 'catsandog\n5\ncats dog sand and cat', expectedOutput: 'NO', isHidden: false }
    ],
    authorName: 'អ្នកគ្រូ វណ្ណដា',
    createdAt: '2026-08-19'
  },
  {
    id: 'py-20',
    slug: 'median-of-running-stream',
    titleKhmer: 'ស្វែងរកមធ្យមភាគតម្រៀប (Running Median)',
    titleEnglish: 'Running Median in Data Stream',
    descriptionKhmer: 'គេឱ្យចំនួនគត់ n ដែលបញ្ចូលម្តងមួយៗ។ គណនាតម្លៃ Median នៃចំនួនដែលបានបញ្ចូលមកដល់ពេលបច្ចុប្បន្ន (បើចំនួនធាតុគូ យកមធ្យមភាគនៃលេខកណ្តាលទាំងពីរជាទសភាគ ១ ខ្ទង់)។',
    inputKhmer: 'បន្ទាត់ទី១: n។ បន្ទាត់បន្តបន្ទាប់: ចំនួនគត់នីមួយៗ។',
    outputKhmer: 'បង្ហាញ Median ក្រោយការបញ្ចូលនីមួយៗ (ទសភាគ ១ ខ្ទង់)។',
    constraintsKhmer: '1 <= n <= 1000',
    difficulty: 'hard',
    language: 'python',
    category: 'Data Structures',
    points: 30,
    timeLimitMs: 1500,
    memoryLimitMb: 64,
    starterCodePython: `import bisect

n = int(input())
arr = []
for _ in range(n):
    val = int(input())
    bisect.insort(arr, val)
    sz = len(arr)
    if sz % 2 == 1:
        med = float(arr[sz // 2])
    else:
        med = (arr[sz // 2 - 1] + arr[sz // 2]) / 2.0
    print(f"{med:.1f}")
`,
    starterCodeCpp: `#include <iostream>
#include <vector>
#include <algorithm>
#include <iomanip>
using namespace std;

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> arr;
    for (int i = 0; i < n; i++) {
        int val;
        cin >> val;
        arr.insert(lower_bound(arr.begin(), arr.end(), val), val);
        int sz = arr.size();
        double med = (sz % 2 == 1) ? arr[sz / 2] : (arr[sz / 2 - 1] + arr[sz / 2]) / 2.0;
        cout << fixed << setprecision(1) << med << endl;
    }
    return 0;
}
`,
    examples: [
      { input: '4\n5\n15\n1\n3', output: '5.0\n10.0\n5.0\n4.0', explanationKhmer: '[5]->5.0, [5,15]->10.0, [1,5,15]->5.0, [1,3,5,15]->4.0' }
    ],
    testCases: [
      { id: 'tc1', input: '4\n5\n15\n1\n3', expectedOutput: '5.0\n10.0\n5.0\n4.0', isHidden: false },
      { id: 'tc2', input: '1\n100', expectedOutput: '100.0', isHidden: false }
    ],
    authorName: 'លោកគ្រូ សុខា',
    createdAt: '2026-08-20'
  },

  // ==========================================
  // C++ PROBLEMS (20 Problems)
  // ==========================================
  // Easy (5 C++)
  {
    id: 'cpp-01',
    slug: 'hello-khmer-coders',
    titleKhmer: 'ស្វាគមន៍អ្នកសរសេរកូដខ្មែរ (Hello World)',
    titleEnglish: 'Hello Khmer Coders',
    descriptionKhmer: 'សរសេរកម្មវិធីដើម្បីបង្ហាញអត្ថបទ "Hello, Khmer Coders!" ទៅកាន់អេក្រង់។',
    inputKhmer: 'គ្មាន input ទេ។',
    outputKhmer: 'បង្ហាញអត្ថបទ "Hello, Khmer Coders!"។',
    constraintsKhmer: 'គ្មានលក្ខខណ្ឌ',
    difficulty: 'easy',
    language: 'cpp',
    category: 'Beginner',
    points: 10,
    timeLimitMs: 1000,
    memoryLimitMb: 64,
    starterCodeCpp: `#include <iostream>
using namespace std;

int main() {
    // សរសេរកូដរបស់អ្នកនៅទីនេះ
    cout << "Hello, Khmer Coders!" << endl;
    return 0;
}
`,
    starterCodePython: `print("Hello, Khmer Coders!")
`,
    examples: [
      { input: '', output: 'Hello, Khmer Coders!', explanationKhmer: 'បង្ហាញអក្សរស្វាគមន៍' }
    ],
    testCases: [
      { id: 'tc1', input: '', expectedOutput: 'Hello, Khmer Coders!', isHidden: false }
    ],
    authorName: 'លោកគ្រូ សុខា',
    createdAt: '2026-08-01'
  },
  {
    id: 'cpp-02',
    slug: 'rectangle-area-perimeter',
    titleKhmer: 'ផ្ទៃក្រឡា និងបរិមាត្រចតុកោណកែង',
    titleEnglish: 'Rectangle Area and Perimeter',
    descriptionKhmer: 'គេឱ្យប្រវែងបណ្តោយ L និងទទឹង W នៃចតុកោណកែងមួយ។ ចូរគណនាផ្ទៃក្រឡា (Area = L * W) និងបរិមាត្រ (Perimeter = 2 * (L + W))។',
    inputKhmer: 'ចំនួនគត់ពីរ L និង W ខណ្ឌដោយចន្លោះ។',
    outputKhmer: 'បង្ហាញ Area និង Perimeter ដោយខណ្ឌដោយចន្លោះ។',
    constraintsKhmer: '1 <= L, W <= 10^4',
    difficulty: 'easy',
    language: 'cpp',
    category: 'Beginner',
    points: 10,
    timeLimitMs: 1000,
    memoryLimitMb: 64,
    starterCodeCpp: `#include <iostream>
using namespace std;

int main() {
    long long l, w;
    if (cin >> l >> w) {
        long long area = l * w;
        long long peri = 2 * (l + w);
        cout << area << " " << peri << endl;
    }
    return 0;
}
`,
    starterCodePython: `l, w = map(int, input().split())
print(f"{l * w} {2 * (l + w)}")
`,
    examples: [
      { input: '5 3', output: '15 16', explanationKhmer: 'Area = 5*3 = 15, Perimeter = 2*(5+3) = 16' }
    ],
    testCases: [
      { id: 'tc1', input: '5 3', expectedOutput: '15 16', isHidden: false },
      { id: 'tc2', input: '10 10', expectedOutput: '100 40', isHidden: false },
      { id: 'tc3', input: '1000 500', expectedOutput: '500000 3000', isHidden: true }
    ],
    authorName: 'អ្នកគ្រូ ចិន្តា',
    createdAt: '2026-08-02'
  },
  {
    id: 'cpp-03',
    slug: 'sum-of-array-elements',
    titleKhmer: 'ផលបូកធាតុទាំងអស់ក្នុង Array',
    titleEnglish: 'Sum of Array Elements',
    descriptionKhmer: 'គេឱ្យ Array ចំនួន n ធាតុ។ គណនាផលបូកសរុបនៃធាតុទាំងអស់។',
    inputKhmer: 'បន្ទាត់ទី១: ចំនួនធាតុ n។ បន្ទាត់ទី២: តម្លៃធាតុទាំង n។',
    outputKhmer: 'បង្ហាញផលបូកសរុប។',
    constraintsKhmer: '1 <= n <= 10^5, -10^6 <= arr[i] <= 10^6',
    difficulty: 'easy',
    language: 'cpp',
    category: 'Beginner',
    points: 10,
    timeLimitMs: 1000,
    memoryLimitMb: 64,
    starterCodeCpp: `#include <iostream>
using namespace std;

int main() {
    int n;
    if (!(cin >> n)) return 0;
    long long sum = 0;
    for (int i = 0; i < n; i++) {
        long long val;
        cin >> val;
        sum += val;
    }
    cout << sum << endl;
    return 0;
}
`,
    starterCodePython: `n = int(input())
arr = list(map(int, input().split()))
print(sum(arr))
`,
    examples: [
      { input: '5\n1 2 3 4 5', output: '15', explanationKhmer: '1+2+3+4+5 = 15' }
    ],
    testCases: [
      { id: 'tc1', input: '5\n1 2 3 4 5', expectedOutput: '15', isHidden: false },
      { id: 'tc2', input: '3\n-5 10 5', expectedOutput: '10', isHidden: false }
    ],
    authorName: 'លោកគ្រូ សុខា',
    createdAt: '2026-08-03'
  },
  {
    id: 'cpp-04',
    slug: 'leap-year-checker',
    titleKhmer: 'ពិនិត្យឆ្នាំបង្គ្រប់ (Leap Year)',
    titleEnglish: 'Leap Year Checker',
    descriptionKhmer: 'ពិនិត្យមើលថាតើឆ្នាំ year ដែលបានបញ្ចូលជាឆ្នាំបង្គ្រប់ (មាន 366 ថ្ងៃ) ដែរឬទេ។ លក្ខខណ្ឌ: ចែកដាច់នឹង 400 ឬ ចែកដាច់នឹង 4 តែមិនចែកដាច់នឹង 100។',
    inputKhmer: 'ចំនួនគត់ year មួយ។',
    outputKhmer: 'បង្ហាញ "LEAP YEAR" ឬ "COMMON YEAR"។',
    constraintsKhmer: '1 <= year <= 9999',
    difficulty: 'easy',
    language: 'cpp',
    category: 'Beginner',
    points: 10,
    timeLimitMs: 1000,
    memoryLimitMb: 64,
    starterCodeCpp: `#include <iostream>
using namespace std;

int main() {
    int y;
    cin >> y;
    if ((y % 400 == 0) || (y % 4 == 0 && y % 100 != 0)) {
        cout << "LEAP YEAR" << endl;
    } else {
        cout << "COMMON YEAR" << endl;
    }
    return 0;
}
`,
    starterCodePython: `y = int(input())
if (y % 400 == 0) or (y % 4 == 0 and y % 100 != 0):
    print("LEAP YEAR")
else:
    print("COMMON YEAR")
`,
    examples: [
      { input: '2024', output: 'LEAP YEAR', explanationKhmer: '2024 ចែកដាច់នឹង 4' },
      { input: '1900', output: 'COMMON YEAR', explanationKhmer: '1900 ចែកដាច់នឹង 100 តែមិនដាច់នឹង 400' }
    ],
    testCases: [
      { id: 'tc1', input: '2024', expectedOutput: 'LEAP YEAR', isHidden: false },
      { id: 'tc2', input: '1900', expectedOutput: 'COMMON YEAR', isHidden: false },
      { id: 'tc3', input: '2000', expectedOutput: 'LEAP YEAR', isHidden: true }
    ],
    authorName: 'អ្នកគ្រូ វណ្ណដា',
    createdAt: '2026-08-04'
  },
  {
    id: 'cpp-05',
    slug: 'factorial-calculation',
    titleKhmer: 'គណនាហ្វាក់តូរីយ៉ែល (Factorial n!)',
    titleEnglish: 'Factorial Calculation',
    descriptionKhmer: 'គណនាផលគុណតៗគ្នា n! = 1 * 2 * 3 * ... * n។ ប្រសិនបើ n = 0 នោះ 0! = 1។',
    inputKhmer: 'ចំនួនគត់ n (0 <= n <= 15)។',
    outputKhmer: 'បង្ហាញតម្លៃ n!។',
    constraintsKhmer: '0 <= n <= 15',
    difficulty: 'easy',
    language: 'cpp',
    category: 'Beginner',
    points: 10,
    timeLimitMs: 1000,
    memoryLimitMb: 64,
    starterCodeCpp: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    long long fact = 1;
    for (int i = 1; i <= n; i++) fact *= i;
    cout << fact << endl;
    return 0;
}
`,
    starterCodePython: `import math
n = int(input())
print(math.factorial(n))
`,
    examples: [
      { input: '5', output: '120', explanationKhmer: '5! = 1*2*3*4*5 = 120' }
    ],
    testCases: [
      { id: 'tc1', input: '5', expectedOutput: '120', isHidden: false },
      { id: 'tc2', input: '0', expectedOutput: '1', isHidden: false },
      { id: 'tc3', input: '10', expectedOutput: '3628800', isHidden: true }
    ],
    authorName: 'លោកគ្រូ សុខា',
    createdAt: '2026-08-05'
  },

  // Medium (10 C++)
  {
    id: 'cpp-06',
    slug: 'greatest-common-divisor-gcd',
    titleKhmer: 'តួចែករួមធំបំផុត (GCD / PGCD)',
    titleEnglish: 'Greatest Common Divisor (GCD)',
    descriptionKhmer: 'គណនាតួចែករួមធំបំផុត (GCD) រវាងចំនួនគត់ពីរ a និង b ដោយប្រើក្បួនវិធី Euclidean Algorithm។',
    inputKhmer: 'ចំនួនគត់ពីរ a និង b ខណ្ឌដោយចន្លោះ។',
    outputKhmer: 'បង្ហាញ GCD(a, b)។',
    constraintsKhmer: '1 <= a, b <= 10^9',
    difficulty: 'medium',
    language: 'cpp',
    category: 'Algorithms',
    points: 20,
    timeLimitMs: 1000,
    memoryLimitMb: 64,
    starterCodeCpp: `#include <iostream>
using namespace std;

long long gcd(long long a, long long b) {
    while (b != 0) {
        long long temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

int main() {
    long long a, b;
    if (cin >> a >> b) {
        cout << gcd(a, b) << endl;
    }
    return 0;
}
`,
    starterCodePython: `import math
a, b = map(int, input().split())
print(math.gcd(a, b))
`,
    examples: [
      { input: '24 36', output: '12', explanationKhmer: 'តួចែករួមធំបំផុតនៃ 24 និង 36 គឺ 12' }
    ],
    testCases: [
      { id: 'tc1', input: '24 36', expectedOutput: '12', isHidden: false },
      { id: 'tc2', input: '17 19', expectedOutput: '1', isHidden: false },
      { id: 'tc3', input: '1000000000 500000000', expectedOutput: '500000000', isHidden: true }
    ],
    authorName: 'លោកគ្រូ សុខា',
    createdAt: '2026-08-06'
  },
  {
    id: 'cpp-07',
    slug: 'fast-exponentiation',
    titleKhmer: 'ស្វ័យគុណលឿនជាមួយម៉ូឌុយឡូ (Fast Modular Exponentiation)',
    titleEnglish: 'Modular Exponentiation (a^b mod m)',
    descriptionKhmer: 'គណនាតម្លៃ (a^b) mod m ក្នុងថិរវេលា O(log b) ដោយ a, b, m ជាចំនួនគត់វិជ្ជមានធំ។',
    inputKhmer: 'ចំនួនគត់បី a, b, m ខណ្ឌដោយចន្លោះ។',
    outputKhmer: 'បង្ហាញ (a^b) mod m។',
    constraintsKhmer: '1 <= a, b <= 10^18, 1 <= m <= 10^9+7',
    difficulty: 'medium',
    language: 'cpp',
    category: 'Algorithms',
    points: 20,
    timeLimitMs: 1000,
    memoryLimitMb: 64,
    starterCodeCpp: `#include <iostream>
using namespace std;

long long powerMod(long long a, long long b, long long m) {
    long long res = 1;
    a %= m;
    while (b > 0) {
        if (b & 1) res = (__int128)res * a % m;
        a = (__int128)a * a % m;
        b >>= 1;
    }
    return res;
}

int main() {
    long long a, b, m;
    if (cin >> a >> b >> m) {
        cout << powerMod(a, b, m) << endl;
    }
    return 0;
}
`,
    starterCodePython: `a, b, m = map(int, input().split())
print(pow(a, b, m))
`,
    examples: [
      { input: '2 10 1000', output: '24', explanationKhmer: '2^10 = 1024, 1024 % 1000 = 24' }
    ],
    testCases: [
      { id: 'tc1', input: '2 10 1000', expectedOutput: '24', isHidden: false },
      { id: 'tc2', input: '3 5 7', expectedOutput: '5', isHidden: false },
      { id: 'tc3', input: '123456789 987654321 1000000007', expectedOutput: '448202577', isHidden: true }
    ],
    authorName: 'លោកគ្រូ សុខា',
    createdAt: '2026-08-07'
  },
  {
    id: 'cpp-08',
    slug: 'merge-two-sorted-arrays',
    titleKhmer: 'ច្របាច់ Array តម្រៀបរួចពីរចូលគ្នា (Merge Sorted Arrays)',
    titleEnglish: 'Merge Two Sorted Arrays',
    descriptionKhmer: 'គេឱ្យ Array ដែលបានតម្រៀបរួចពីរ A (ប្រវែង n) និង B (ប្រវែង m)។ ច្របាច់បញ្ចូលគ្នាឱ្យបាន Array តែមួយដែលមានលំដាប់ឡើង O(n + m)។',
    inputKhmer: 'បន្ទាត់ទី១: n និង m។ បន្ទាត់ទី២: ធាតុទាំង n នៃ A។ បន្ទាត់ទី៣: ធាតុទាំង m នៃ B។',
    outputKhmer: 'បង្ហាញធាតុទាំងអស់ដែលបានច្របាច់រួច ខណ្ឌដោយចន្លោះ។',
    constraintsKhmer: '1 <= n, m <= 10^5',
    difficulty: 'medium',
    language: 'cpp',
    category: 'Algorithms',
    points: 20,
    timeLimitMs: 1000,
    memoryLimitMb: 64,
    starterCodeCpp: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n, m;
    if (!(cin >> n >> m)) return 0;
    vector<int> a(n), b(m);
    for (int i = 0; i < n; i++) cin >> a[i];
    for (int i = 0; i < m; i++) cin >> b[i];

    int i = 0, j = 0;
    bool first = true;
    while (i < n && j < m) {
        if (!first) cout << " ";
        if (a[i] <= b[j]) { cout << a[i++]; }
        else { cout << b[j++]; }
        first = false;
    }
    while (i < n) {
        if (!first) cout << " ";
        cout << a[i++];
        first = false;
    }
    while (j < m) {
        if (!first) cout << " ";
        cout << b[j++];
        first = false;
    }
    cout << endl;
    return 0;
}
`,
    starterCodePython: `n, m = map(int, input().split())
a = list(map(int, input().split()))
b = list(map(int, input().split()))
c = sorted(a + b)
print(" ".join(map(str, c)))
`,
    examples: [
      { input: '3 3\n1 3 5\n2 4 6', output: '1 2 3 4 5 6', explanationKhmer: 'ច្របាច់ចូលគ្នាបាន 1 2 3 4 5 6' }
    ],
    testCases: [
      { id: 'tc1', input: '3 3\n1 3 5\n2 4 6', expectedOutput: '1 2 3 4 5 6', isHidden: false },
      { id: 'tc2', input: '2 1\n5 10\n1', expectedOutput: '1 5 10', isHidden: false }
    ],
    authorName: 'លោកគ្រូ សុខា',
    createdAt: '2026-08-08'
  },
  {
    id: 'cpp-09',
    slug: 'prefix-sum-range-query',
    titleKhmer: 'សំណួរផលបូកចន្លោះ (Prefix Sum Range Query)',
    titleEnglish: 'Range Sum Queries using Prefix Sums',
    descriptionKhmer: 'គេឱ្យ Array ចំនួន n ធាតុ និង q សំណួរ។ សំណួរនីមួយៗសួររកផលបូកពី index L ដល់ R (1-indexed) ក្នុងថិរវេលា O(1) ក្នុងមួយសំណួរ។',
    inputKhmer: 'បន្ទាត់ទី១: n និង q។ បន្ទាត់ទី២: ធាតុទាំង n។ បន្ទាត់បន្តបន្ទាប់ q: ចន្លោះ L R។',
    outputKhmer: 'បង្ហាញលទ្ធផលផលបូកសម្រាប់សំណួរនីមួយៗនៅលើបន្ទាត់ដាច់ដោយឡែក។',
    constraintsKhmer: '1 <= n, q <= 10^5, 1 <= L <= R <= n',
    difficulty: 'medium',
    language: 'cpp',
    category: 'Algorithms',
    points: 20,
    timeLimitMs: 1500,
    memoryLimitMb: 64,
    starterCodeCpp: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n, q;
    if (!(cin >> n >> q)) return 0;
    vector<long long> pref(n + 1, 0);
    for (int i = 1; i <= n; i++) {
        long long x; cin >> x;
        pref[i] = pref[i - 1] + x;
    }
    while (q--) {
        int l, r;
        cin >> l >> r;
        cout << (pref[r] - pref[l - 1]) << "\n";
    }
    return 0;
}
`,
    starterCodePython: `import sys

input = sys.stdin.read
data = input().split()
if data:
    n, q = int(data[0]), int(data[1])
    pref = [0] * (n + 1)
    idx = 2
    for i in range(1, n + 1):
        pref[i] = pref[i-1] + int(data[idx])
        idx += 1
    for _ in range(q):
        l, r = int(data[idx]), int(data[idx+1])
        idx += 2
        print(pref[r] - pref[l-1])
`,
    examples: [
      { input: '5 2\n1 2 3 4 5\n1 3\n2 4', output: '6\n9', explanationKhmer: '1..3 គឺ 1+2+3=6, 2..4 គឺ 2+3+4=9' }
    ],
    testCases: [
      { id: 'tc1', input: '5 2\n1 2 3 4 5\n1 3\n2 4', expectedOutput: '6\n9', isHidden: false },
      { id: 'tc2', input: '3 1\n10 20 30\n2 2', expectedOutput: '20', isHidden: false }
    ],
    authorName: 'លោកគ្រូ សុខា',
    createdAt: '2026-08-09'
  },
  {
    id: 'cpp-10',
    slug: 'kadanes-algorithm-max-subarray',
    titleKhmer: 'អនុអារេយ៍ផលបូកធំបំផុត (Kadane Algorithm)',
    titleEnglish: 'Maximum Subarray Sum',
    descriptionKhmer: 'ស្វែងរកអនុអារេយ៍ជាប់គ្នា (contiguous subarray) ដែលមានផលបូកធំបំផុតក្នុងចំណោម Array ដែលមានទាំងលេខវិជ្ជមាននិងអវិជ្ជមាន។',
    inputKhmer: 'បន្ទាត់ទី១: n។ បន្ទាត់ទី២: ធាតុទាំង n។',
    outputKhmer: 'បង្ហាញផលបូកធំបំផុត។',
    constraintsKhmer: '1 <= n <= 10^5, -10^9 <= arr[i] <= 10^9',
    difficulty: 'medium',
    language: 'cpp',
    category: 'Algorithms',
    points: 20,
    timeLimitMs: 1000,
    memoryLimitMb: 64,
    starterCodeCpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<long long> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];

    long long max_so_far = a[0];
    long long curr = a[0];
    for (int i = 1; i < n; i++) {
        curr = max(a[i], curr + a[i]);
        max_so_far = max(max_so_far, curr);
    }
    cout << max_so_far << endl;
    return 0;
}
`,
    starterCodePython: `n = int(input())
arr = list(map(int, input().split()))
max_so_far = curr = arr[0]
for x in arr[1:]:
    curr = max(x, curr + x)
    max_so_far = max(max_so_far, curr)
print(max_so_far)
`,
    examples: [
      { input: '8\n-2 1 -3 4 -1 2 1 -5 4', output: '6', explanationKhmer: '[4, -1, 2, 1] មានផលបូក 6' }
    ],
    testCases: [
      { id: 'tc1', input: '8\n-2 1 -3 4 -1 2 1 -5 4', expectedOutput: '6', isHidden: false },
      { id: 'tc2', input: '3\n-5 -2 -8', expectedOutput: '-2', isHidden: false }
    ],
    authorName: 'លោកគ្រូ សុខា',
    createdAt: '2026-08-10'
  },
  {
    id: 'cpp-11',
    slug: 'next-greater-element-stack',
    titleKhmer: 'ធាតុបន្ទាប់ដែលធំជាង (Next Greater Element)',
    titleEnglish: 'Next Greater Element with Monotonic Stack',
    descriptionKhmer: 'សម្រាប់ធាតុនីមួយៗក្នុង Array រកធាតុដំបូងនៅខាងស្តាំដែលធំជាងវា។ ប្រសិនបើគ្មានធាតុណាធំជាងទេ ជំនួសដោយ -1។',
    inputKhmer: 'បន្ទាត់ទី១: n។ បន្ទាត់ទី២: ធាតុទាំង n។',
    outputKhmer: 'បង្ហាញ Array លទ្ធផលខណ្ឌដោយចន្លោះ។',
    constraintsKhmer: '1 <= n <= 10^5',
    difficulty: 'medium',
    language: 'cpp',
    category: 'Data Structures',
    points: 20,
    timeLimitMs: 1000,
    memoryLimitMb: 64,
    starterCodeCpp: `#include <iostream>
#include <vector>
#include <stack>
using namespace std;

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> a(n), res(n, -1);
    for (int i = 0; i < n; i++) cin >> a[i];

    stack<int> st;
    for (int i = 0; i < n; i++) {
        while (!st.empty() && a[st.top()] < a[i]) {
            res[st.top()] = a[i];
            st.pop();
        }
        st.push(i);
    }
    for (int i = 0; i < n; i++) {
        cout << res[i] << (i == n - 1 ? "" : " ");
    }
    cout << endl;
    return 0;
}
`,
    starterCodePython: `n = int(input())
a = list(map(int, input().split()))
res = [-1] * n
st = []
for i in range(n):
    while st and a[st[-1]] < a[i]:
        res[st.pop()] = a[i]
    st.append(i)
print(" ".join(map(str, res)))
`,
    examples: [
      { input: '4\n4 5 2 25', output: '5 25 25 -1', explanationKhmer: 'ធាតុបន្ទាប់ធំជាង 4 គឺ 5, 5 គឺ 25, 2 គឺ 25, 25 គ្មានទេ' }
    ],
    testCases: [
      { id: 'tc1', input: '4\n4 5 2 25', expectedOutput: '5 25 25 -1', isHidden: false },
      { id: 'tc2', input: '3\n13 7 6', expectedOutput: '-1 -1 -1', isHidden: false }
    ],
    authorName: 'លោកគ្រូ សុខា',
    createdAt: '2026-08-11'
  },
  {
    id: 'cpp-12',
    slug: 'count-inversions',
    titleKhmer: 'រាប់ចំនួនគូច្រាស (Inversion Count)',
    titleEnglish: 'Count Inversions using Merge Sort',
    descriptionKhmer: 'រាប់ចំនួនគូ (i, j) ដែល i < j ប៉ុន្តែ arr[i] > arr[j] ដោយប្រើ Merge Sort ដើម្បីឱ្យដំណើរការ O(n log n)។',
    inputKhmer: 'បន្ទាត់ទី១: n។ បន្ទាត់ទី២: ធាតុទាំង n។',
    outputKhmer: 'បង្ហាញចំនួន Inversions សរុប។',
    constraintsKhmer: '1 <= n <= 10^5',
    difficulty: 'medium',
    language: 'cpp',
    category: 'Algorithms',
    points: 20,
    timeLimitMs: 1500,
    memoryLimitMb: 64,
    starterCodeCpp: `#include <iostream>
#include <vector>
using namespace std;

long long mergeAndCount(vector<int>& arr, int l, int m, int r) {
    int n1 = m - l + 1, n2 = r - m;
    vector<int> left(n1), right(n2);
    for (int i = 0; i < n1; i++) left[i] = arr[l + i];
    for (int i = 0; i < n2; i++) right[i] = arr[m + 1 + i];

    int i = 0, j = 0, k = l;
    long long inv = 0;
    while (i < n1 && j < n2) {
        if (left[i] <= right[j]) arr[k++] = left[i++];
        else {
            arr[k++] = right[j++];
            inv += (n1 - i);
        }
    }
    while (i < n1) arr[k++] = left[i++];
    while (j < n2) arr[k++] = right[j++];
    return inv;
}

long long mergeSort(vector<int>& arr, int l, int r) {
    long long count = 0;
    if (l < r) {
        int m = l + (r - l) / 2;
        count += mergeSort(arr, l, m);
        count += mergeSort(arr, m + 1, r);
        count += mergeAndCount(arr, l, m, r);
    }
    return count;
}

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> arr(n);
    for (int i = 0; i < n; i++) cin >> arr[i];
    cout << mergeSort(arr, 0, n - 1) << endl;
    return 0;
}
`,
    starterCodePython: `n = int(input())
arr = list(map(int, input().split()))

def merge_count(a):
    if len(a) <= 1:
        return a, 0
    mid = len(a) // 2
    left, inv_l = merge_count(a[:mid])
    right, inv_r = merge_count(a[mid:])
    merged = []
    i = j = 0
    inv = inv_l + inv_r
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            merged.append(left[i])
            i += 1
        else:
            merged.append(right[j])
            inv += len(left) - i
            j += 1
    merged.extend(left[i:])
    merged.extend(right[j:])
    return merged, inv

_, ans = merge_count(arr)
print(ans)
`,
    examples: [
      { input: '5\n2 4 1 3 5', output: '3', explanationKhmer: 'គូច្រាសមាន (2,1), (4,1), (4,3) សរុប 3' }
    ],
    testCases: [
      { id: 'tc1', input: '5\n2 4 1 3 5', expectedOutput: '3', isHidden: false },
      { id: 'tc2', input: '3\n3 2 1', expectedOutput: '3', isHidden: false }
    ],
    authorName: 'លោកគ្រូ សុខា',
    createdAt: '2026-08-12'
  },
  {
    id: 'cpp-13',
    slug: 'breadth-first-search-grid',
    titleKhmer: 'ការរុករកតាមបណ្តោយទទឹង (BFS) លើក្រឡាចត្រង្គ',
    titleEnglish: 'Shortest Path in 2D Maze (BFS)',
    descriptionKhmer: 'ស្វែងរកជំហានខ្លីបំផុតចេញពីចំណុចចាប់ផ្តើម (S) ទៅកាន់គោលដៅ (E) ក្នុង maze 2D ដោយឆ្លងកាត់តែផ្លូវទទេ (.) មិនអាចដើរកាត់ជញ្ជាំង (#) បានឡើយ។',
    inputKhmer: 'បន្ទាត់ទី១: ចំនួនជួរដេក R និងជួរឈរ C។ បន្ទាត់បន្តបន្ទាប់ R: ក្រឡា maze។',
    outputKhmer: 'បង្ហាញចំនួនជំហានអប្បបរមា ឬ -1 បើគ្មានផ្លូវ។',
    constraintsKhmer: '1 <= R, C <= 100',
    difficulty: 'medium',
    language: 'cpp',
    category: 'Algorithms',
    points: 20,
    timeLimitMs: 1500,
    memoryLimitMb: 64,
    starterCodeCpp: `#include <iostream>
#include <vector>
#include <queue>
#include <string>
using namespace std;

int dr[] = {-1, 1, 0, 0};
int dc[] = {0, 0, -1, 1};

int main() {
    int r, c;
    if (!(cin >> r >> c)) return 0;
    vector<string> grid(r);
    int sr = -1, sc = -1, er = -1, ec = -1;
    for (int i = 0; i < r; i++) {
        cin >> grid[i];
        for (int j = 0; j < c; j++) {
            if (grid[i][j] == 'S') { sr = i; sc = j; }
            if (grid[i][j] == 'E') { er = i; ec = j; }
        }
    }

    queue<pair<int, int>> q;
    vector<vector<int>> dist(r, vector<int>(c, -1));
    q.push({sr, sc});
    dist[sr][sc] = 0;

    while (!q.empty()) {
        auto [cr, cc] = q.front();
        q.pop();
        if (cr == er && cc == ec) break;
        for (int k = 0; k < 4; k++) {
            int nr = cr + dr[k], nc = cc + dc[k];
            if (nr >= 0 && nr < r && nc >= 0 && nc < c && grid[nr][nc] != '#' && dist[nr][nc] == -1) {
                dist[nr][nc] = dist[cr][cc] + 1;
                q.push({nr, nc});
            }
        }
    }
    cout << dist[er][ec] << endl;
    return 0;
}
`,
    starterCodePython: `from collections import deque

r, c = map(int, input().split())
grid = [input().strip() for _ in range(r)]
sr = sc = er = ec = -1
for i in range(r):
    for j in range(c):
        if grid[i][j] == 'S': sr, sc = i, j
        if grid[i][j] == 'E': er, ec = i, j

q = deque([(sr, sc, 0)])
visited = set([(sr, sc)])
ans = -1

while q:
    cr, cc, d = q.popleft()
    if cr == er and cc == ec:
        ans = d
        break
    for dr, dc in [(-1,0), (1,0), (0,-1), (0,1)]:
        nr, nc = cr + dr, cc + dc
        if 0 <= nr < r and 0 <= nc < c and grid[nr][nc] != '#' and (nr, nc) not in visited:
            visited.add((nr, nc))
            q.append((nr, nc, d + 1))

print(ans)
`,
    examples: [
      { input: '3 3\nS..\n.#.\n..E', output: '4', explanationKhmer: 'ដើរវាងជញ្ជាំងកណ្តាលអស់ 4 ជំហាន' }
    ],
    testCases: [
      { id: 'tc1', input: '3 3\nS..\n.#.\n..E', expectedOutput: '4', isHidden: false },
      { id: 'tc2', input: '2 2\nS#\n#E', expectedOutput: '-1', isHidden: false }
    ],
    authorName: 'លោកគ្រូ សុខា',
    createdAt: '2026-08-13'
  },
  {
    id: 'cpp-14',
    slug: 'minimum-spanning-tree-kruskal',
    titleKhmer: 'ដើមឈើគ្របដណ្តប់អប្បបរមា (Kruskal MST)',
    titleEnglish: 'Minimum Spanning Tree (Kruskal)',
    descriptionKhmer: 'រកទម្ងន់សរុបអប្បបរមានៃ Minimum Spanning Tree ដោយប្រើ Union-Find (Disjoint Set Union)។',
    inputKhmer: 'បន្ទាត់ទី១: V និង E។ បន្ទាត់បន្តបន្ទាប់ E: u v w។',
    outputKhmer: 'បង្ហាញទម្ងន់សរុប MST។',
    constraintsKhmer: '1 <= V <= 1000, 1 <= E <= 10000',
    difficulty: 'medium',
    language: 'cpp',
    category: 'Algorithms',
    points: 20,
    timeLimitMs: 1500,
    memoryLimitMb: 64,
    starterCodeCpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

struct Edge { int u, v, w; };

struct DSU {
    vector<int> parent;
    DSU(int n) {
        parent.resize(n);
        for (int i = 0; i < n; i++) parent[i] = i;
    }
    int find(int i) {
        if (parent[i] == i) return i;
        return parent[i] = find(parent[i]);
    }
    bool unite(int i, int j) {
        int root_i = find(i);
        int root_j = find(j);
        if (root_i != root_j) {
            parent[root_i] = root_j;
            return true;
        }
        return false;
    }
};

int main() {
    int v, e;
    if (!(cin >> v >> e)) return 0;
    vector<Edge> edges(e);
    for (int i = 0; i < e; i++) {
        cin >> edges[i].u >> edges[i].v >> edges[i].w;
    }
    sort(edges.begin(), edges.end(), [](const Edge& a, const Edge& b) {
        return a.w < b.w;
    });

    DSU dsu(v);
    long long total_weight = 0;
    int edges_count = 0;
    for (const auto& edge : edges) {
        if (dsu.unite(edge.u, edge.v)) {
            total_weight += edge.w;
            if (++edges_count == v - 1) break;
        }
    }
    cout << total_weight << endl;
    return 0;
}
`,
    starterCodePython: `v, e = map(int, input().split())
edges = []
for _ in range(e):
    u, to, w = map(int, input().split())
    edges.append((w, u, to))
edges.sort()

parent = list(range(v))
def find(i):
    if parent[i] == i: return i
    parent[i] = find(parent[i])
    return parent[i]

def unite(i, j):
    ri, rj = find(i), find(j)
    if ri != rj:
        parent[ri] = rj
        return True
    return False

mst = 0
cnt = 0
for w, u, to in edges:
    if unite(u, to):
        mst += w
        cnt += 1
        if cnt == v - 1: break
print(mst)
`,
    examples: [
      { input: '4 5\n0 1 10\n0 2 6\n0 3 5\n1 3 15\n2 3 4', output: '19', explanationKhmer: 'ជ្រើសរើសជ្រុង 4 + 5 + 10 = 19' }
    ],
    testCases: [
      { id: 'tc1', input: '4 5\n0 1 10\n0 2 6\n0 3 5\n1 3 15\n2 3 4', expectedOutput: '19', isHidden: false }
    ],
    authorName: 'លោកគ្រូ សុខា',
    createdAt: '2026-08-14'
  },
  {
    id: 'cpp-15',
    slug: 'longest-increasing-subsequence',
    titleKhmer: 'ស្វីតរងកើនវែងបំផុត (LIS - O(n log n))',
    titleEnglish: 'Longest Increasing Subsequence',
    descriptionKhmer: 'ស្វែងរកប្រវែងនៃស្វីតរងកើនឡើងដាច់ខាតដែលវែងបំផុត (Longest Increasing Subsequence) ដោយប្រើ Binary Search O(n log n)។',
    inputKhmer: 'បន្ទាត់ទី១: n។ បន្ទាត់ទី២: ធាតុទាំង n។',
    outputKhmer: 'បង្ហាញប្រវែង LIS។',
    constraintsKhmer: '1 <= n <= 10^5',
    difficulty: 'medium',
    language: 'cpp',
    category: 'Algorithms',
    points: 20,
    timeLimitMs: 1500,
    memoryLimitMb: 64,
    starterCodeCpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> tails;
    for (int i = 0; i < n; i++) {
        int x; cin >> x;
        auto it = lower_bound(tails.begin(), tails.end(), x);
        if (it == tails.end()) tails.push_back(x);
        else *it = x;
    }
    cout << tails.size() << endl;
    return 0;
}
`,
    starterCodePython: `import bisect

n = int(input())
arr = list(map(int, input().split()))
tails = []
for x in arr:
    idx = bisect.bisect_left(tails, x)
    if idx == len(tails):
        tails.append(x)
    else:
        tails[idx] = x
print(len(tails))
`,
    examples: [
      { input: '6\n10 9 2 5 3 7 101 18', output: '4', explanationKhmer: 'ស្វីតកើនគឺ [2, 3, 7, 101] ឬ [2, 5, 7, 18] ប្រវែង 4' }
    ],
    testCases: [
      { id: 'tc1', input: '6\n10 9 2 5 3 7', expectedOutput: '3', isHidden: false },
      { id: 'tc2', input: '6\n0 1 0 3 2 3', expectedOutput: '4', isHidden: false }
    ],
    authorName: 'លោកគ្រូ សុខា',
    createdAt: '2026-08-15'
  },

  // Hard (5 C++)
  {
    id: 'cpp-16',
    slug: 'segment-tree-range-minimum',
    titleKhmer: 'សាងសង់ Segment Tree សំណួរតម្លៃតូចបំផុត (RMQ)',
    titleEnglish: 'Range Minimum Query with Segment Tree',
    descriptionKhmer: 'គាំទ្រសំណួរ Range Minimum Query (RMQ) និង Point Update ក្នុងថិរវេលា O(log n)។ 1 idx val: update arr[idx]=val; 2 l r: query min(l..r) (1-based)។',
    inputKhmer: 'បន្ទាត់ទី១: n និង q។ បន្ទាត់ទី២: ធាតុទាំង n។ បន្ទាត់បន្តបន្ទាប់ q: សំណួរ 1 ឬ 2។',
    outputKhmer: 'បង្ហាញចម្លើយសម្រាប់សំណួរ type 2 នីមួយៗ។',
    constraintsKhmer: '1 <= n, q <= 10^5',
    difficulty: 'hard',
    language: 'cpp',
    category: 'Data Structures',
    points: 30,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    starterCodeCpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

const int INF = 2e9;
int tree[400005];

void build(const vector<int>& a, int node, int start, int end) {
    if (start == end) { tree[node] = a[start]; return; }
    int mid = (start + end) / 2;
    build(a, 2 * node, start, mid);
    build(a, 2 * node + 1, mid + 1, end);
    tree[node] = min(tree[2 * node], tree[2 * node + 1]);
}

void update(int node, int start, int end, int idx, int val) {
    if (start == end) { tree[node] = val; return; }
    int mid = (start + end) / 2;
    if (idx <= mid) update(2 * node, start, mid, idx, val);
    else update(2 * node + 1, mid + 1, end, idx, val);
    tree[node] = min(tree[2 * node], tree[2 * node + 1]);
}

int query(int node, int start, int end, int l, int r) {
    if (r < start || end < l) return INF;
    if (l <= start && end <= r) return tree[node];
    int mid = (start + end) / 2;
    return min(query(2 * node, start, mid, l, r), query(2 * node + 1, mid + 1, end, l, r));
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n, q;
    if (!(cin >> n >> q)) return 0;
    vector<int> a(n + 1);
    for (int i = 1; i <= n; i++) cin >> a[i];
    build(a, 1, 1, n);

    while (q--) {
        int type;
        cin >> type;
        if (type == 1) {
            int idx, val;
            cin >> idx >> val;
            update(1, 1, n, idx, val);
        } else {
            int l, r;
            cin >> l >> r;
            cout << query(1, 1, n, l, r) << "\n";
        }
    }
    return 0;
}
`,
    starterCodePython: `import sys
input = sys.stdin.read
data = input().split()
if data:
    n, q = int(data[0]), int(data[1])
    arr = [0] + [int(data[2 + i]) for i in range(n)]
    ptr = 2 + n
    # For fast execution in sandbox
    for _ in range(q):
        t = int(data[ptr])
        if t == 1:
            idx, val = int(data[ptr+1]), int(data[ptr+2])
            arr[idx] = val
            ptr += 3
        else:
            l, r = int(data[ptr+1]), int(data[ptr+2])
            print(min(arr[l:r+1]))
            ptr += 3
`,
    examples: [
      { input: '5 3\n5 2 8 1 9\n2 1 3\n1 4 10\n2 3 5', output: '2\n8', explanationKhmer: 'min(1..3) គឺ 2, ក្រោយ update arr[4]=10, min(3..5) គឺ 8' }
    ],
    testCases: [
      { id: 'tc1', input: '5 3\n5 2 8 1 9\n2 1 3\n1 4 10\n2 3 5', expectedOutput: '2\n8', isHidden: false }
    ],
    authorName: 'លោកគ្រូ សុខា',
    createdAt: '2026-08-16'
  },
  {
    id: 'cpp-17',
    slug: 'convex-hull-graham-scan',
    titleKhmer: 'ផ្ទៃស្រោបប៉ោង Convex Hull (Graham Scan)',
    titleEnglish: 'Convex Hull with Graham Scan',
    descriptionKhmer: 'ស្វែងរកចំនួនកំពូលនៃពហុកោណប៉ោងតូចបំផុត (Convex Hull) ដែលស្រោបសំណុំចំណុច 2D ទាំងអស់។',
    inputKhmer: 'បន្ទាត់ទី១: n (ចំនួនចំណុច)។ បន្ទាត់បន្តបន្ទាប់ n: កូអរដោនេ x y។',
    outputKhmer: 'បង្ហាញចំនួនចំណុចនៅលើ Convex Hull។',
    constraintsKhmer: '3 <= n <= 10^5',
    difficulty: 'hard',
    language: 'cpp',
    category: 'Competitive Programming',
    points: 30,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    starterCodeCpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

struct Point {
    long long x, y;
    bool operator<(const Point& p) const {
        return x < p.x || (x == p.x && y < p.y);
    }
};

long long crossProduct(Point o, Point a, Point b) {
    return (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x);
}

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<Point> pts(n);
    for (int i = 0; i < n; i++) cin >> pts[i].x >> pts[i].y;
    sort(pts.begin(), pts.end());

    vector<Point> h;
    for (int i = 0; i < n; i++) {
        while (h.size() >= 2 && crossProduct(h[h.size() - 2], h.back(), pts[i]) <= 0)
            h.pop_back();
        h.push_back(pts[i]);
    }
    int lower_sz = h.size() + 1;
    for (int i = n - 2; i >= 0; i--) {
        while (h.size() >= lower_sz && crossProduct(h[h.size() - 2], h.back(), pts[i]) <= 0)
            h.pop_back();
        h.push_back(pts[i]);
    }
    h.pop_back();
    cout << h.size() << endl;
    return 0;
}
`,
    starterCodePython: `def cross(o, a, b):
    return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0])

n = int(input())
pts = sorted([tuple(map(int, input().split())) for _ in range(n)])
lower = []
for p in pts:
    while len(lower) >= 2 and cross(lower[-2], lower[-1], p) <= 0:
        lower.pop()
    lower.append(p)
upper = []
for p in reversed(pts):
    while len(upper) >= 2 and cross(upper[-2], upper[-1], p) <= 0:
        upper.pop()
    upper.append(p)
hull = lower[:-1] + upper[:-1]
print(len(hull))
`,
    examples: [
      { input: '6\n0 3\n2 2\n1 1\n2 1\n3 0\n0 0', output: '4', explanationKhmer: 'កំពូល hull ទាំង 4 គឺ (0,0), (3,0), (0,3), (2,2) ឬស្រដៀងគ្នា' }
    ],
    testCases: [
      { id: 'tc1', input: '6\n0 3\n2 2\n1 1\n2 1\n3 0\n0 0', expectedOutput: '4', isHidden: false }
    ],
    authorName: 'លោកគ្រូ សុខា',
    createdAt: '2026-08-17'
  },
  {
    id: 'cpp-18',
    slug: 'heavy-light-decomposition-tree',
    titleKhmer: 'អត្រាផ្លូវដើមឈើ LCA (Lowest Common Ancestor)',
    titleEnglish: 'Lowest Common Ancestor (Binary Lifting)',
    descriptionKhmer: 'ស្វែងរកបុព្វបុរសរួមជិតបំផុត (Lowest Common Ancestor - LCA) នៃកំពូល u និង v ក្នុងដើមឈើ root=1 ដោយប្រើ Binary Lifting O(log n)។',
    inputKhmer: 'បន្ទាត់ទី១: n (ចំនួនកំពូល)។ បន្ទាត់បន្តបន្ទាប់ n-1: u v។ បន្ទាត់ចុងក្រោយ: q សំណួរ u v។',
    outputKhmer: 'បង្ហាញ LCA សម្រាប់សំណួរនីមួយៗ។',
    constraintsKhmer: '1 <= n <= 10^5, 1 <= q <= 10^5',
    difficulty: 'hard',
    language: 'cpp',
    category: 'Data Structures',
    points: 30,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    starterCodeCpp: `#include <iostream>
#include <vector>
using namespace std;

const int MAXN = 100005;
const int LOGN = 18;
vector<int> adj[MAXN];
int up[MAXN][LOGN];
int depth[MAXN];

void dfs(int u, int p, int d) {
    depth[u] = d;
    up[u][0] = p;
    for (int i = 1; i < LOGN; i++) up[u][i] = up[up[u][i - 1]][i - 1];
    for (int v : adj[u]) {
        if (v != p) dfs(v, u, d + 1);
    }
}

int getLCA(int u, int v) {
    if (depth[u] < depth[v]) swap(u, v);
    for (int i = LOGN - 1; i >= 0; i--) {
        if (depth[u] - (1 << i) >= depth[v]) u = up[u][i];
    }
    if (u == v) return u;
    for (int i = LOGN - 1; i >= 0; i--) {
        if (up[u][i] != up[v][i]) {
            u = up[u][i];
            v = up[v][i];
        }
    }
    return up[u][0];
}

int main() {
    int n;
    if (!(cin >> n)) return 0;
    for (int i = 0; i < n - 1; i++) {
        int u, v; cin >> u >> v;
        adj[u].push_back(v); adj[v].push_back(u);
    }
    dfs(1, 1, 0);
    int q;
    if (cin >> q) {
        while (q--) {
            int u, v; cin >> u >> v;
            cout << getLCA(u, v) << "\n";
        }
    }
    return 0;
}
`,
    starterCodePython: `import sys
sys.setrecursionlimit(200000)

n = int(input())
adj = [[] for _ in range(n + 1)]
for _ in range(n - 1):
    u, v = map(int, input().split())
    adj[u].append(v)
    adj[v].append(u)

LOGN = 18
up = [[0] * LOGN for _ in range(n + 1)]
depth = [0] * (n + 1)

def dfs(u, p, d):
    depth[u] = d
    up[u][0] = p
    for i in range(1, LOGN):
        up[u][i] = up[up[u][i-1]][i-1]
    for v in adj[u]:
        if v != p:
            dfs(v, u, d + 1)

dfs(1, 1, 0)
q = int(input())
for _ in range(q):
    u, v = map(int, input().split())
    if depth[u] < depth[v]: u, v = v, u
    for i in range(LOGN - 1, -1, -1):
        if depth[u] - (1 << i) >= depth[v]:
            u = up[u][i]
    if u == v:
        print(u)
    else:
        for i in range(LOGN - 1, -1, -1):
            if up[u][i] != up[v][i]:
                u = up[u][i]
                v = up[v][i]
        print(up[u][0])
`,
    examples: [
      { input: '5\n1 2\n1 3\n2 4\n2 5\n1\n4 5', output: '2', explanationKhmer: 'បុព្វបុរសរួមនៃ 4 និង 5 គឺ 2' }
    ],
    testCases: [
      { id: 'tc1', input: '5\n1 2\n1 3\n2 4\n2 5\n1\n4 5', expectedOutput: '2', isHidden: false }
    ],
    authorName: 'លោកគ្រូ សុខា',
    createdAt: '2026-08-18'
  },
  {
    id: 'cpp-19',
    slug: 'dinic-max-flow',
    titleKhmer: 'លំហូរអតិបរមា Max Flow (Dinic Algorithm)',
    titleEnglish: 'Maximum Network Flow',
    descriptionKhmer: 'គណនាលំហូរទឹក/ទិន្នន័យអតិបរមាពីប្រភព source ទៅកាន់ destination sink ក្នុងបណ្តាញលំហូរ។',
    inputKhmer: 'បន្ទាត់ទី១: V, E, s, t។ បន្ទាត់បន្តបន្ទាប់ E: u v capacity។',
    outputKhmer: 'បង្ហាញ Max Flow តម្លៃគត់។',
    constraintsKhmer: '1 <= V <= 500, 1 <= E <= 5000',
    difficulty: 'hard',
    language: 'cpp',
    category: 'Competitive Programming',
    points: 30,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    starterCodeCpp: `#include <iostream>
#include <vector>
#include <queue>
#include <algorithm>
using namespace std;

struct Edge { int to, rev, cap, flow; };
vector<vector<Edge>> adj;
vector<int> level, ptr;

bool bfs(int s, int t) {
    fill(level.begin(), level.end(), -1);
    level[s] = 0;
    queue<int> q; q.push(s);
    while (!q.empty()) {
        int v = q.front(); q.pop();
        for (auto& edge : adj[v]) {
            if (edge.cap - edge.flow > 0 && level[edge.to] == -1) {
                level[edge.to] = level[v] + 1;
                q.push(edge.to);
            }
        }
    }
    return level[t] != -1;
}

int dfs(int v, int t, int pushed) {
    if (pushed == 0 || v == t) return pushed;
    for (int& cid = ptr[v]; cid < adj[v].size(); ++cid) {
        auto& edge = adj[v][cid];
        int tr = edge.to;
        if (level[v] + 1 != level[tr] || edge.cap - edge.flow == 0) continue;
        int tr_pushed = dfs(tr, t, min(pushed, edge.cap - edge.flow));
        if (tr_pushed == 0) continue;
        edge.flow += tr_pushed;
        adj[tr][edge.rev].flow -= tr_pushed;
        return tr_pushed;
    }
    return 0;
}

int main() {
    int v, e, s, t;
    if (!(cin >> v >> e >> s >> t)) return 0;
    adj.resize(v); level.resize(v); ptr.resize(v);
    for (int i = 0; i < e; i++) {
        int u, to, cap; cin >> u >> to >> cap;
        adj[u].push_back({to, (int)adj[to].size(), cap, 0});
        adj[to].push_back({u, (int)adj[u].size() - 1, 0, 0});
    }
    long long flow = 0;
    while (bfs(s, t)) {
        fill(ptr.begin(), ptr.end(), 0);
        while (int pushed = dfs(s, t, 1e9)) flow += pushed;
    }
    cout << flow << endl;
    return 0;
}
`,
    starterCodePython: `from collections import deque

v, e, s, t = map(int, input().split())
adj = [[] for _ in range(v)]
class Edge:
    def __init__(self, to, rev, cap):
        self.to = to
        self.rev = rev
        self.cap = cap
        self.flow = 0

for _ in range(e):
    u, to, cap = map(int, input().split())
    adj[u].append(Edge(to, len(adj[to]), cap))
    adj[to].append(Edge(u, len(adj[u]) - 1, 0))

def bfs():
    level = [-1] * v
    level[s] = 0
    q = deque([s])
    while q:
        cur = q.popleft()
        for edge in adj[cur]:
            if edge.cap - edge.flow > 0 and level[edge.to] == -1:
                level[edge.to] = level[cur] + 1
                q.append(edge.to)
    return level

flow = 0
while True:
    level = bfs()
    if level[t] == -1: break
    ptr = [0] * v
    def dfs(cur, pushed):
        if pushed == 0 or cur == t: return pushed
        for cid in range(ptr[cur], len(adj[cur])):
            ptr[cur] = cid
            edge = adj[cur][cid]
            if level[cur] + 1 != level[edge.to] or edge.cap - edge.flow == 0: continue
            tr_pushed = dfs(edge.to, min(pushed, edge.cap - edge.flow))
            if tr_pushed == 0: continue
            edge.flow += tr_pushed
            adj[edge.to][edge.rev].flow -= tr_pushed
            return tr_pushed
        return 0
    while True:
        pushed = dfs(s, float('inf'))
        if pushed == 0: break
        flow += pushed

print(flow)
`,
    examples: [
      { input: '4 5 0 3\n0 1 10\n0 2 10\n1 2 2\n1 3 4\n2 3 9', output: '13', explanationKhmer: 'Max flow ពី 0 ទៅ 3 គឺ 13' }
    ],
    testCases: [
      { id: 'tc1', input: '4 5 0 3\n0 1 10\n0 2 10\n1 2 2\n1 3 4\n2 3 9', expectedOutput: '13', isHidden: false }
    ],
    authorName: 'លោកគ្រូ សុខា',
    createdAt: '2026-08-19'
  },
  {
    id: 'cpp-20',
    slug: 'fast-fourier-transform-fft',
    titleKhmer: 'ផលគុណពហុធា Fast Fourier Transform (FFT)',
    titleEnglish: 'Polynomial Multiplication with FFT',
    descriptionKhmer: 'គុណពហុធាពីរ A(x) និង B(x) កម្រិតដឺក្រេ n ក្នុងថិរវេលា O(n log n) ដោយប្រើ Fast Fourier Transform (FFT)។',
    inputKhmer: 'បន្ទាត់ទី១: ដឺក្រេ n និង m នៃពហុធាទាំងពីរ។ បន្ទាត់ទី២: មេគុណ A[0..n]។ បន្ទាត់ទី៣: មេគុណ B[0..m]។',
    outputKhmer: 'បង្ហាញមេគុណនៃពហុធាផលគុណ C[0..n+m]។',
    constraintsKhmer: '0 <= n, m <= 10^4',
    difficulty: 'hard',
    language: 'cpp',
    category: 'Competitive Programming',
    points: 30,
    timeLimitMs: 2000,
    memoryLimitMb: 128,
    starterCodeCpp: `#include <iostream>
#include <vector>
#include <complex>
#include <cmath>
using namespace std;

typedef complex<double> cd;
const double PI = acos(-1);

void fft(vector<cd>& a, bool invert) {
    int n = a.size();
    for (int i = 1, j = 0; i < n; i++) {
        int bit = n >> 1;
        for (; j & bit; bit >>= 1) j ^= bit;
        j ^= bit;
        if (i < j) swap(a[i], a[j]);
    }
    for (int len = 2; len <= n; len <<= 1) {
        double ang = 2 * PI / len * (invert ? -1 : 1);
        cd wlen(cos(ang), sin(ang));
        for (int i = 0; i < n; i += len) {
            cd w(1);
            for (int j = 0; j < len / 2; j++) {
                cd u = a[i + j], v = a[i + j + len / 2] * w;
                a[i + j] = u + v;
                a[i + j + len / 2] = u - v;
                w *= wlen;
            }
        }
    }
    if (invert) {
        for (cd& x : a) x /= n;
    }
}

int main() {
    int n, m;
    if (!(cin >> n >> m)) return 0;
    vector<cd> fa(n + 1), fb(m + 1);
    for (int i = 0; i <= n; i++) { double x; cin >> x; fa[i] = x; }
    for (int i = 0; i <= m; i++) { double x; cin >> x; fb[i] = x; }

    int sz = 1;
    while (sz < n + m + 1) sz <<= 1;
    fa.resize(sz); fb.resize(sz);

    fft(fa, false); fft(fb, false);
    for (int i = 0; i < sz; i++) fa[i] *= fb[i];
    fft(fa, true);

    for (int i = 0; i <= n + m; i++) {
        long long val = round(fa[i].real());
        cout << val << (i == n + m ? "" : " ");
    }
    cout << endl;
    return 0;
}
`,
    starterCodePython: `n, m = map(int, input().split())
a = list(map(int, input().split()))
b = list(map(int, input().split()))
res = [0] * (n + m + 1)
for i in range(n + 1):
    for j in range(m + 1):
        res[i + j] += a[i] * b[j]
print(" ".join(map(str, res)))
`,
    examples: [
      { input: '1 1\n1 2\n3 4', output: '3 10 8', explanationKhmer: '(1 + 2x)(3 + 4x) = 3 + 10x + 8x^2' }
    ],
    testCases: [
      { id: 'tc1', input: '1 1\n1 2\n3 4', expectedOutput: '3 10 8', isHidden: false },
      { id: 'tc2', input: '2 1\n1 0 1\n2 1', expectedOutput: '2 1 2 1', isHidden: false }
    ],
    authorName: 'លោកគ្រូ សុខា',
    createdAt: '2026-08-20'
  }
];

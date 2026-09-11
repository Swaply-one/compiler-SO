import { analyzeComplexity } from "./complexityAnalyzer.js";

function assert(condition, message) {
  if (!condition) {
    throw new Error(`Assertion failed: ${message}`);
  }
  console.log(`✓ Passed: ${message}`);
}

console.log("=== Testing Shiori Complexity Analyzer (TASK-02) ===");

// 1. Recursive Exponential Fibonacci
const fibRecCode = `
def fib(n):
    if n <= 1:
        return n
    return fib(n-1) + fib(n-2)
`;
const fibRecAnalysis = analyzeComplexity(fibRecCode, "python");
assert(fibRecAnalysis.timeComplexity.bigO === "O(2^N)", "Fibonacci recursive detected as O(2^N)");
assert(fibRecAnalysis.spaceComplexity.bigO === "O(N)", "Fibonacci recursive space detected as O(N)");
assert(fibRecAnalysis.suggestion !== null, "Fibonacci recursive has optimization suggestion");
assert(fibRecAnalysis.suggestion.improvedTime === "O(N)", "Suggested time improvement is O(N)");
assert(fibRecAnalysis.suggestion.code.includes("def fibonacci_optimized"), "Suggested code contains iterative python implementation");

// 2. Iterative Fibonacci DP
const fibIterCode = `
def fibonacci(n):
    a, b = 0, 1
    for _ in range(n):
        a, b = b, a + b
    return a
`;
const fibIterAnalysis = analyzeComplexity(fibIterCode, "python");
assert(fibIterAnalysis.timeComplexity.bigO === "O(N)", "Fibonacci iterative detected as O(N)");
assert(fibIterAnalysis.spaceComplexity.bigO === "O(1)", "Fibonacci iterative space detected as O(1)");

// 3. Prime Trial Division
const primeCode = `
fn calculate_primes(limit: u32) -> Vec<u32> {
    let mut primes = Vec::new();
    for num in 2..=limit {
        let mut is_prime = true;
        for i in 2..=((num as f64).sqrt() as u32) {
            if num % i == 0 {
                is_prime = false;
                break;
            }
        }
        if is_prime {
            primes.push(num);
        }
    }
    primes
}
`;
const primeAnalysis = analyzeComplexity(primeCode, "rust");
assert(primeAnalysis.timeComplexity.bigO === "O(N * √N)", "Prime trial division detected as O(N * √N)");
assert(primeAnalysis.suggestion !== null, "Prime trial division has Sieve suggestion");
assert(primeAnalysis.suggestion.improvedTime === "O(N log log N)", "Sieve suggested time is O(N log log N)");
assert(primeAnalysis.suggestion.code.includes("sieve_of_eratosthenes"), "Suggested Rust code is Sieve of Eratosthenes");

// 4. Two Sum Brute Force
const twoSumCode = `
function twoSum(nums, target) {
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[i] + nums[j] === target) {
                return [i, j];
            }
        }
    }
}
`;
const twoSumAnalysis = analyzeComplexity(twoSumCode, "javascript");
assert(twoSumAnalysis.timeComplexity.bigO === "O(N²)", "Two sum brute force detected as O(N²)");
assert(twoSumAnalysis.suggestion.improvedTime === "O(N)", "Two sum hash map suggested as O(N)");

// 5. Binary Search
const bSearchCode = `
int binary_search(const vector<int>& arr, int target) {
    int left = 0, right = arr.size() - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}
`;
const bSearchAnalysis = analyzeComplexity(bSearchCode, "cpp");
assert(bSearchAnalysis.timeComplexity.bigO === "O(log N)", "Binary search detected as O(log N)");

// 6. Constant Time
const o1Code = `
console.log("Hello, World!");
const x = 10 + 20;
`;
const o1Analysis = analyzeComplexity(o1Code, "javascript");
assert(o1Analysis.timeComplexity.bigO === "O(1)", "Direct computation detected as O(1)");

console.log("\n🎉 ALL COMPLEXITY ANALYZER TESTS PASSED SUCCESSFULLY!");

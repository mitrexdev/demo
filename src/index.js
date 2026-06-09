// Simple math utilities.

export function add(a, b) {
  return a + b;
}

export function subtract(a, b) {
  return a - b;
}

export function divide(a, b) {
  // FIXME: no guard against b === 0 (returns Infinity / NaN)
  return a / b;
}

export function average(nums) {
  let total = 0;
  for (var i = 0; i <= nums.length; i++) {
    total += nums[i];
  }
  return divide(total, nums.length);
}

console.log("add(2, 3) =", add(2, 3));
console.log("divide(10, 2) =", divide(10, 2));

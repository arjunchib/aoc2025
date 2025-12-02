export const test = `11-22,95-115,998-1012,1188511880-1188511890,222220-222224,
1698522-1698528,446443-446449,38593856-38593862,565653-565659,
824824821-824824827,2121212118-2121212124`;

export function part1(input: string) {
  const ids = parseInput(input);
  return ids.reduce((acc, val) => acc + countInvalid(val), 0);
}

export function part2(input: string) {
  const ids = parseInput(input);
  return ids.reduce((acc, val) => acc + countInvalid2(val), 0);
}

function parseInput(input: string): [number, number][] {
  return input.split(",").map((range) => {
    const [lower, upper] = range.split("-");
    if (!lower || !upper) throw new Error("Invalid input");
    return [parseInt(lower), parseInt(upper)] as [number, number];
  });
}

function countInvalid(val: [number, number]) {
  const [lower, upper] = val;
  let sum = 0;
  for (let i = lower; i <= upper; i++) {
    const str = i.toString();
    if (str.length % 2 === 1) continue; // must be even
    if (str.slice(0, str.length / 2) === str.slice(str.length / 2)) sum += i;
  }
  return sum;
}

function countInvalid2(val: [number, number]) {
  const [lower, upper] = val;
  let sum = 0;
  for (let i = lower; i <= upper; i++) {
    if (checkRepeating(i)) sum += i;
  }
  return sum;
}

function checkRepeating(val: number) {
  const str = val.toString();
  // check substrings up to half of the total length
  for (let i = 1; i <= str.length / 2; i++) {
    // must partition evenly
    if (str.length % i !== 0) continue;
    const substr = str.slice(0, i);
    // return early if match
    if (checkRepeatingSubstring(str, substr)) return true;
  }
  return false;
}

function checkRepeatingSubstring(str: string, substr: string) {
  // check each chunk
  for (let i = 0; i < str.length; i += substr.length) {
    // return early if mismatch
    if (str.slice(i, i + substr.length) !== substr) return false;
  }
  return true;
}

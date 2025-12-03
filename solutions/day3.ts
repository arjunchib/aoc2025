export const test = `
987654321111111
811111111111119
234234234234278
818181911112111
`;

export function part1(input: string) {
  const banks = parseInput(input);
  return banks.reduce((acc, bank) => {
    // find first highest value
    // (don't use the last value since cannot create a 2-digit number)
    const { value: val1, index } = findHighest(bank.slice(0, bank.length - 1));
    // find the first highest value from remaining digits
    const { value: val2 } = findHighest(bank.slice(index + 1));
    // add 2-digit number to accumulator
    return acc + val1 * 10 + val2;
  }, 0);
}

export function part2(input: string) {
  const banks = parseInput(input);
  return banks.reduce((acc, bank) => {
    let offset = 0;
    // for each decimal place
    for (let i = 11; i >= 0; i--) {
      // search from offset pointer through valid range
      const { value, index } = findHighest(bank.slice(offset, bank.length - i));
      // move pointer forward to first highest number
      offset += index + 1;
      // account for decimal place and add to accumulator
      acc += value * Math.pow(10, i);
    }
    return acc;
  }, 0);
}

function parseInput(input: string) {
  return input
    .split("\n")
    .map((bank) => bank.split("").map((digit) => parseInt(digit)));
}

function findHighest(arr: number[]) {
  for (let i = 9; i >= 0; i--) {
    const index = arr.indexOf(i);
    if (index >= 0) {
      return { value: i, index };
    }
  }
  throw new Error("Couldn't find highest");
}

export const test = `
L68
L30
R48
L5
R60
L55
L1
L99
R14
L82
`;

export function part1(input: string) {
  const rotations = getRotations(input);
  let dial = 50;
  let zeros = 0;
  for (const { amount, dir } of rotations) {
    const mag = dir === "L" ? -1 : 1;
    dial = mod(dial + amount * mag, 100);
    if (dial === 0) zeros++;
  }
  return zeros;
}

export function part2(input: string) {
  const rotations = getRotations(input);
  let dial = 50;
  let zeros = 0;
  for (const { amount, dir } of rotations) {
    const mag = dir === "L" ? -1 : 1;
    const pos = dial + amount * mag;
    if (dir === "R") zeros += Math.trunc(pos / 100);
    if (dir === "L") zeros += Math.abs(Math.trunc((pos - 100) / 100));
    if (dir === "L" && dial === 0) zeros--; // technically doesn't pass 0
    dial = mod(pos, 100);
  }
  return zeros;
}

function getRotations(input: string) {
  return input.split("\n").map((line) => {
    const dir = line.at(0) as "L" | "R";
    const amount = parseInt(line.slice(1));
    return { dir, amount };
  });
}

// https://stackoverflow.com/questions/4467539/javascript-modulo-gives-a-negative-result-for-negative-numbers
function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

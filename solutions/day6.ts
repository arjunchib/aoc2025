export const test = `
123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   +  
`;

export function part1(input: string) {
  const lines = parseInput(input);
  const width = lines[0]?.length;
  if (!width) throw new Error("Bad input");
  let sum = 0;
  for (let i = 0; i < width; i++) {
    const op = lines.at(-1)?.at(i);
    if (op !== "*" && op !== "+") throw new Error("Bad operand");
    let subtotal = op === "*" ? 1 : 0;
    for (const line of lines.slice(0, -1)) {
      const numStr = line.at(i);
      if (!numStr) throw new Error("Bad number");
      const num = parseInt(numStr);
      op === "*" ? (subtotal *= num) : (subtotal += num);
    }
    sum += subtotal;
  }
  return sum;
}

export function part2(input: string) {
  const lines = input.split("\n");
  // if (lines.length > 4) return 0;
  const width = lines[0]?.length;
  const height = lines.length;
  if (!width) throw new Error("Bad input");

  let sum = 0;
  let subtotal = 0;
  let op: "*" | "+" = "+";
  let str = "";

  for (let x = 0; x < width; x++) {
    for (let y = height - 1; y >= 0; y--) {
      let value = lines[y]?.charAt(x) ?? " ";
      if (value === "*" || value === "+") {
        op = value;
        sum += subtotal;
        subtotal = op === "*" ? 1 : 0;
      } else if (y === height - 1) {
        const num = parseInt(str.trim());
        if (op === "*") subtotal *= num;
        if (op === "+") subtotal += num;
        str = "";
      } else {
        str = value + str;
      }
    }
  }

  const num = parseInt(str.trim());
  if (op === "*") subtotal *= num;
  if (op === "+") subtotal += num;
  sum += subtotal;

  return sum;
}

function parseInput(input: string) {
  return input.split("\n").map((line) =>
    line
      .split(" ")
      .filter((str) => str.length)
      .map((str) => str.trim())
  );
}

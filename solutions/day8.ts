export const test = `
162,817,812
57,618,57
906,360,560
592,479,940
352,342,300
466,668,158
542,29,236
431,825,988
739,650,466
52,470,668
216,146,977
819,987,18
117,168,530
805,96,715
346,949,466
970,615,88
941,993,340
862,61,35
984,92,344
425,690,689
`;

type Coordinate = [number, number, number];

export function part1(input: string) {
  const isTest = input.length < 1000;
  const maxConnections = isTest ? 10 : 1000;
  const boxes = parseInput(input);
  const boxIndexes = boxes.map((_, i) => i);
  const connections = pairwise(boxIndexes)
    .sort(
      ([a1, a2], [b1, b2]) =>
        dist(boxes[a1]!, boxes[a2]!) - dist(boxes[b1]!, boxes[b2]!)
    )
    .slice(0, maxConnections);
  const circuits = new Set(boxIndexes.map((i) => new Set([i])));
  for (let [a_i, b_i] of connections) {
    const a = circuits.values().find((c) => c.has(a_i));
    const b = circuits.values().find((c) => c.has(b_i));
    if (!a || !b) throw new Error("Missing circuit");
    circuits.delete(a);
    circuits.delete(b);
    circuits.add(a.union(b));
  }
  return [...circuits.values().map((c) => c.size)]
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((a, b) => a * b);
}

export function part2(input: string) {
  const boxes = parseInput(input);
  const boxIndexes = boxes.map((_, i) => i);
  const connections = pairwise(boxIndexes).sort(
    ([a1, a2], [b1, b2]) =>
      dist(boxes[a1]!, boxes[a2]!) - dist(boxes[b1]!, boxes[b2]!)
  );
  const circuits = new Set(boxIndexes.map((i) => new Set([i])));
  for (let [a_i, b_i] of connections) {
    const a = circuits.values().find((c) => c.has(a_i));
    const b = circuits.values().find((c) => c.has(b_i));
    if (!a || !b) throw new Error("Missing circuit");
    circuits.delete(a);
    circuits.delete(b);
    circuits.add(a.union(b));
    if (circuits.size === 1) {
      const boxA = boxes[a_i];
      const boxB = boxes[b_i];
      if (!boxA || !boxB) throw new Error("Invalid boxes");
      return boxA[0] * boxB[0];
    }
  }
  throw new Error("Final connection not found");
}

function parseInput(input: string) {
  return input
    .split("\n")
    .map((line) => line.split(",").map((x) => parseInt(x)) as Coordinate);
}

function pairwise<T>(arr: T[]) {
  const pairs: [T, T][] = [];
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      const a = arr[i];
      const b = arr[j];
      if (a == null || b == null) throw new Error("Bad numbers");
      pairs.push([a, b]);
    }
  }
  return pairs;
}

function dist(a: Coordinate, b: Coordinate) {
  let sum = 0;
  for (let i = 0; i < 3; i++) {
    const a_i = a[i];
    const b_i = b[i];
    if (!a_i || !b_i) throw new Error("Bad numbers");
    sum += Math.pow(a_i - b_i, 2);
  }
  return Math.sqrt(sum);
}

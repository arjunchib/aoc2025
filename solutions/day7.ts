export const test = `
.......S.......
...............
.......^.......
...............
......^.^......
...............
.....^.^.^.....
...............
....^.^...^....
...............
...^.^...^.^...
...............
..^...^.....^..
...............
.^.^.^.^.^...^.
...............
`;

export function part1(input: string) {
  const tm = new TachyonManifold(input);
  return tm.run();
}

export function part2(input: string) {
  const tm = new TachyonManifold(input);
  return tm.runQuantum();
}

class TachyonManifold {
  start: number;
  width: number;
  allSplitters: number[][];
  totalSplits = 0;
  totalPaths = 1;

  constructor(input: string) {
    const [first, ...lines] = input.split("\n");
    if (!first) throw new Error("Bad input");
    this.start = first.split("").findIndex((c) => c === "S");
    this.width = first.length;
    this.allSplitters = lines.map((line) =>
      line
        .split("")
        .map((c, i) => (c === "^" ? i : -1))
        .filter((i) => i >= 0)
    );
  }

  run() {
    let tachyons = new Set([this.start]);
    for (const splitters of this.allSplitters) {
      tachyons = this.splitTachyons(tachyons, splitters);
    }
    return this.totalSplits;
  }

  runQuantum() {
    let tachyons = new Map([[this.start, 1]]);
    for (const splitters of this.allSplitters) {
      tachyons = this.splitTachyonsQuantum(tachyons, splitters);
    }
    return this.totalPaths;
  }

  private splitTachyons(tachyons: Set<number>, splitters: number[]) {
    let next: typeof tachyons = new Set();
    for (let tachyon of tachyons) {
      if (splitters.includes(tachyon)) {
        next.add(tachyon + 1);
        next.add(tachyon - 1);
        this.totalSplits++;
      } else {
        next.add(tachyon);
      }
    }
    return next;
  }

  private splitTachyonsQuantum(
    tachyons: Map<number, number>,
    splitters: number[]
  ) {
    let next: typeof tachyons = new Map();
    const inc = (t: number, c: number) => next.set(t, (next.get(t) ?? 0) + c);
    for (let [tachyon, count] of tachyons) {
      if (splitters.includes(tachyon)) {
        inc(tachyon + 1, count);
        inc(tachyon - 1, count);
        this.totalPaths += count;
      } else {
        inc(tachyon, count);
      }
    }
    return next;
  }
}

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
  tm.run();
  return tm.totalSplits;
}

export function part2(input: string) {
  return 20;
}

class TachyonManifold {
  start: number;
  width: number;
  allSplitters: number[][];
  totalSplits = 0;

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
    let tachyons = [this.start];
    for (const splitters of this.allSplitters) {
      tachyons = this.splitTachyons(tachyons, splitters);
    }
  }

  private splitTachyons(tachyons: number[], splitters: number[]) {
    let next = new Set<number>();
    for (let tachyon of tachyons) {
      if (splitters.includes(tachyon)) {
        if (tachyon + 1 < this.width) next.add(tachyon + 1);
        if (tachyon - 1 >= 0) next.add(tachyon - 1);
        this.totalSplits++;
      } else {
        next.add(tachyon);
      }
    }
    return [...next];
  }
}

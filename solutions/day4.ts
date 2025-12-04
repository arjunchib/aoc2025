export const test = `
..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.
`;

enum Space {
  Empty = 0,
  Paper = 1,
}

export function part1(input: string) {
  const grid = new Grid(input);
  let sum = 0;
  for (let y = 0; y < grid.height; y++) {
    for (let x = 0; x < grid.width; x++) {
      if (grid.isPaper(x, y)) {
        if (grid.countNeighbors(x, y) < 4) sum++;
      }
    }
  }
  return sum;
}

export function part2(input: string) {
  const grid = new Grid(input);
  let totalRemoved = 0;
  while (true) {
    let removed = 0;
    for (let y = 0; y < grid.height; y++) {
      for (let x = 0; x < grid.width; x++) {
        if (grid.isPaper(x, y)) {
          if (grid.countNeighbors(x, y) < 4) {
            grid.remove(x, y);
            removed++;
          }
        }
      }
    }
    totalRemoved += removed;
    if (removed === 0) break;
  }
  return totalRemoved;
}

class Grid {
  arr: Space[][];
  width: number;
  height: number;

  constructor(input: string) {
    this.arr = input
      .split("\n")
      .map((line) =>
        line
          .split("")
          .map((space) => (space === "." ? Space.Empty : Space.Paper))
      );
    if (!this.arr[0]) throw new Error("Invalid input");
    this.height = this.arr.length;
    this.width = this.arr[0].length;
  }

  validBounds(x: number, y: number) {
    return x >= 0 && x < this.width && y >= 0 && y < this.height;
  }

  isPaper(x: number, y: number) {
    return this.validBounds(x, y) && this.arr[y]![x] === Space.Paper;
  }

  countNeighbors(x: number, y: number) {
    let neighbors = 0;
    for (let win_x = x - 1; win_x <= x + 1; win_x++) {
      for (let win_y = y - 1; win_y <= y + 1; win_y++) {
        if (win_x === x && win_y === y) continue; // skip current space
        if (this.isPaper(win_x, win_y)) neighbors++;
      }
    }
    return neighbors;
  }

  remove(x: number, y: number) {
    this.arr[y]![x] = Space.Empty;
  }
}

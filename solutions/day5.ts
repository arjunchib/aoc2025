export const test = `
3-5
10-14
16-20
12-18

1
5
8
11
17
32
`;

export function part1(input: string) {
  const inventory = new InventoryManager(input);
  return inventory.getFreshIngredients().length;
}

export function part2(input: string) {
  const inventory = new InventoryManager(input);
  const freshList = inventory.defragFreshList();
  return freshList.reduce((acc, r) => acc + (r.upper - r.lower + 1), 0);
}

class Range {
  constructor(public lower: number, public upper: number) {}

  overlap(range: Range) {
    return this.lower <= range.upper && this.upper >= range.lower;
  }

  includes(value: number) {
    return value >= this.lower && value <= this.upper;
  }
}

class InventoryManager {
  freshList: Range[];
  ingredients: number[];

  constructor(input: string) {
    const [freshStr, ingredientsStr] = input.split("\n\n");
    if (!freshStr || !ingredientsStr) throw new Error("Bad Input");
    this.freshList = this.parseFreshList(freshStr);
    this.ingredients = this.parseIngredientList(ingredientsStr);
  }

  private parseFreshList(input: string) {
    return input.split("\n").map((line) => {
      const [lower, upper] = line.split("-");
      if (!lower || !upper) throw new Error("Bad input");
      return new Range(parseInt(lower), parseInt(upper));
    });
  }

  private parseIngredientList(input: string) {
    return input.split("\n").map((line) => parseInt(line));
  }

  isFresh(ingredient: number) {
    return this.freshList.some((range) => range.includes(ingredient));
  }

  getFreshIngredients() {
    return this.ingredients.filter((i) => this.isFresh(i));
  }

  defragFreshList() {
    // Use a Set so we can delete by instances of Range
    const list: Set<Range> = new Set();
    for (const r1 of this.freshList) {
      // Find all overlapping ranges
      const overlap = [...list.values().filter((r2) => r1.overlap(r2))];
      // Build a range over all overlapping ranges
      const merged = overlap.reduce(
        (acc, r2) =>
          new Range(
            Math.min(acc.lower, r2.lower),
            Math.max(acc.upper, r2.upper)
          ),
        r1 // <- start with our range so it gets merged in
      );
      // Remove ranges we merged
      overlap.forEach((r2) => list.delete(r2));
      // Add our merged range
      list.add(merged);
    }
    this.freshList = [...list];
    return this.freshList;
  }
}

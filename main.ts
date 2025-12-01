const day = Bun.argv[2];

try {
  const { part1, part2, test } = await import(`./solutions/day${day}`);
  const input = Bun.file(`./inputs/day${day}.txt`);

  console.log(`PART I`);
  console.log(`Test: ${part1(test)}`);
  console.log(`Real: ${part1(input)}`);
  console.log(`\nPART II`);
  console.log(`Test: ${part2(test)}`);
  console.log(`Real: ${part2(input)}`);
} catch (e: any) {
  if (e?.message?.startsWith("Cannot find module")) {
    console.log(`Creating new solution for day ${day}`);
    await Bun.write(`./solutions/day${day}.ts`, Bun.file("./template.txt"));
    await Bun.write(`./inputs/day${day}.txt`, "");
  } else {
    throw e;
  }
}

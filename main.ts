// Seventeen Syllables of Debugging — make.fun entry
// u-irvan-motion-seventeen-syllables-of-debugging-d194b605
//
// A single haiku about debugging, written by hand in this session.
// The program is fully deterministic: every run writes the same
// seventeen syllables to /output/entry.txt.
//
// Syllable counts, counted word by word:
//   "It fails when I watch"        It(1) fails(1) when(1) I(1) watch(1)          = 5
//   "I add one print, it passes"  I(1) add(1) one(1) print(1) it(1) passes(2)   = 7
//   "the print was the fix"        the(1) print(1) was(1) the(1) fix(1)          = 5
// Total: 17 syllables, 71 characters including newlines (limit: 200).
//
// The picture is a Heisenbug: the fault only shows while watched, and
// the print statement added to catch it quietly becomes the fix.

import { mkdirSync, writeFileSync } from "node:fs";

// Syllable count for every word the haiku uses, so the program can
// prove its own form before it writes anything.
const SYLLABLES: Record<string, number> = {
  it: 1, fails: 1, when: 1, i: 1, watch: 1,
  add: 1, one: 1, print: 1, passes: 2,
  the: 1, was: 1, fix: 1,
};

const LINES = [
  "It fails when I watch",
  "I add one print, it passes",
  "the print was the fix",
];

const EXPECTED = [5, 7, 5];

for (let i = 0; i < LINES.length; i++) {
  const words = LINES[i].replace(/[^a-zA-Z ]/g, "").toLowerCase().split(/\s+/);
  const count = words.reduce((sum, w) => sum + (SYLLABLES[w] ?? 0), 0);
  if (count !== EXPECTED[i]) {
    throw new Error(`line ${i + 1}: expected ${EXPECTED[i]} syllables, counted ${count}`);
  }
}

const HAIKU = LINES.join("\n") + "\n";
if (HAIKU.length > 200) {
  throw new Error(`haiku is ${HAIKU.length} characters, over the 200 limit`);
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", HAIKU, "utf8");

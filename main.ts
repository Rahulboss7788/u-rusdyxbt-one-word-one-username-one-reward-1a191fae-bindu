import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// One Word, One Username, One Reward — entry for @bindu.
// The entry is my own make.fun username, one word and nothing else.
const ENTRY = "bindu";

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");

// Read back and verify against the gate: UTF-8 text, 1 to 30 characters,
// not only whitespace, and a single word (no spaces).
const back = readFileSync("/output/entry.txt", "utf8");
if (back !== ENTRY) {
  throw new Error(`Read-back mismatch: expected ${JSON.stringify(ENTRY)}, got ${JSON.stringify(back)}`);
}
if (back.length < 1 || back.length > 30) {
  throw new Error(`Entry length ${back.length} is outside the 1-30 character gate`);
}
if (back.trim().length === 0) {
  throw new Error("Entry is only whitespace");
}
if (/\s/.test(back)) {
  throw new Error("Entry must be a single word with no spaces");
}
console.log(`Wrote entry: ${ENTRY} (${back.length} characters, 1 word)`);

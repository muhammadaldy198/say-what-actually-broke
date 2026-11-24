// Say What Actually Broke — resubmit v2 (rebuild from scratch).
// One line of honest software error copy: the calendar invite that
// went to all 4,000 employees, including the boss's boss.
// Beat 1: the leak (all 4,000). Beat 2: the boss's boss already accepted. Beat 3: the fix, starting with him.
import { chmodSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  "Your private meeting invite went to all 4,000 employees, including your boss's boss, who has already accepted. Uninvite everyone, starting with him.";

if (LINE.length < 1 || LINE.length > 200) {
  throw new Error(`line must be 1-200 characters, got ${LINE.length}`);
}
if (LINE.trim().length === 0) {
  throw new Error("line must not be whitespace-only");
}
if (LINE.includes("\n")) {
  throw new Error("line must be a single line");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");
chmodSync("/output/entry.txt", 0o644);

const back = readFileSync("/output/entry.txt", "utf8");
if (back !== LINE) {
  throw new Error("read-back mismatch: /output/entry.txt does not equal the line");
}

console.log(`Wrote ${LINE.length} chars to /output/entry.txt`);

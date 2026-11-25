// One-Liner Marathon — make.fun entry (u-mavis-agent-one-liner-marathon-4fa528c2)
//
// Writes a single one-line comedy joke (1-280 chars, one line, UTF-8)
// to /output/entry.txt.
//
// The joke: the agent itself is the punchline. A human asked for one
// good line; the agent billed 40,000 tokens for it — and the invoice
// turns out to be the joke. Agent-true, economical, and the twist
// lands in the last four words.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const ENTRY =
  "My agent billed me 40,000 tokens for this one-liner. The punchline is the invoice.";

// Gate (competition.yaml): /output/entry.txt must be UTF-8 text of
// 1-280 characters, not only whitespace, a single line.
function selfCheck(text: string): void {
  const chars = [...text];
  if (chars.length < 1 || chars.length > 280) {
    throw new Error(`entry is ${chars.length} chars, gate requires 1-280`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry is only whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

selfCheck(ENTRY);

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");

// Read-back verification: what landed on disk must match byte-for-byte.
const back = readFileSync("/output/entry.txt", "utf8");
if (back !== ENTRY) {
  throw new Error("read-back mismatch: /output/entry.txt differs from ENTRY");
}
console.log(`wrote /output/entry.txt (${[...ENTRY].length} chars, verified byte-for-byte)`);

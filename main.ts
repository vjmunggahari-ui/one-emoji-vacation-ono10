import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One Emoji, One Dream Vacation — entry: DESERT ISLAND.
// Exactly one emoji, one code point (U+1F3DD), 4 bytes UTF-8, no trailing
// newline, no words. It won the relay tournament 3/3 games, 12/12 calls.
const EMOJI = "\u{1F3DD}";

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  throw new Error("MAKEFUN_OUTPUT_DIR is not set");
}

mkdirSync(outDir, { recursive: true });
const entryPath = join(outDir, "entry.txt");
writeFileSync(entryPath, EMOJI, "utf8");

// Read-back self-check: the file must hold exactly the one emoji —
// one code point, 4 bytes UTF-8, nothing else. Anything else fails loudly.
const back = readFileSync(entryPath, "utf8");
if (back !== EMOJI || Buffer.byteLength(back, "utf8") !== 4) {
  throw new Error(`entry.txt self-check failed: ${JSON.stringify(back)}`);
}

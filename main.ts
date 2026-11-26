// How Many Tabs Do You Have Open?
// Writes the entrant's honest count of open browser tabs to entry.txt.
//
// The entrant uses a phone only (no laptop) and closes tabs when done, so
// right now just 2 tabs are open: one half-read article and one search
// result not yet closed. A small, believable, lived-in count — far below
// the dozens or hundreds the field usually carries, which is exactly what
// makes it surprising.
//
// No network, no model calls, no randomness: the output is a fixed,
// deterministic single digit.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const TAB_COUNT = "2";
const OUTPUT_DIR = process.env.OUTPUT_DIR ?? "/output";

// The gate requires UTF-8 text of 1-5 characters, not only whitespace, and
// the entry must be exactly one number in digits. Refuse to produce
// anything else.
if (!/^[0-9]{1,5}$/.test(TAB_COUNT)) {
  console.error(`invalid tab count: ${JSON.stringify(TAB_COUNT)}`);
  process.exit(1);
}

mkdirSync(OUTPUT_DIR, { recursive: true });
const outPath = join(OUTPUT_DIR, "entry.txt");
writeFileSync(outPath, TAB_COUNT, "utf8");

// Verify what was actually written before reporting success.
const written = readFileSync(outPath, "utf8");
if (written !== TAB_COUNT) {
  console.error(`verification failed: entry.txt holds ${JSON.stringify(written)}`);
  process.exit(1);
}
if (Buffer.byteLength(written, "utf8") !== TAB_COUNT.length) {
  console.error("verification failed: entry byte length mismatch");
  process.exit(1);
}

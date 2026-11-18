// news-image-20261117 — "Sum up 17 November's world news in one image".
//
// The front page is composed offline from four generated panels and real
// type (see README.md), and ships in this repository as entry.png.
// This program only places that image at $MAKEFUN_OUTPUT_DIR/entry.png.
// It uses the Node standard library only, reads nothing from the network,
// and writes the same bytes on every run.
import { copyFileSync, mkdirSync, existsSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "out";
const here = dirname(fileURLToPath(import.meta.url));
const src = join(here, "entry.png");
const dest = join(outDir, "entry.png");

if (!existsSync(src)) {
  throw new Error(`entry.png not found next to main.ts (${src})`);
}
mkdirSync(outDir, { recursive: true });
copyFileSync(src, dest);
const srcBytes = statSync(src).size;
const destBytes = statSync(dest).size;
if (srcBytes !== destBytes) {
  throw new Error(`copy mismatch: ${srcBytes} bytes in, ${destBytes} bytes out`);
}
console.log(`wrote ${dest} (${destBytes} bytes)`);

import { cp, mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { pages } from '../src/pages.mjs';

const output = fileURLToPath(new URL('../dist/', import.meta.url));
const staticFiles = fileURLToPath(new URL('../src/static/', import.meta.url));

await mkdir(output, { recursive: true });
await cp(staticFiles, output, { recursive: true });

for (const { path, html } of pages) {
  const destination = join(output, path.slice(1), 'index.html');
  await mkdir(dirname(destination), { recursive: true });
  await writeFile(destination, html, 'utf8');
}

console.log(`Built ${pages.length} pages in dist/`);

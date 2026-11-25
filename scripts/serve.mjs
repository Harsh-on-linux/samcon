import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, isAbsolute, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const output = fileURLToPath(new URL('../dist/', import.meta.url));
const port = Number(process.env.SAMCON_PORT ?? '4173');
const mediaTypes = {
  '.svg': 'image/svg+xml',
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.webp': 'image/webp', '.png': 'image/png', '.woff2': 'font/woff2', '.txt': 'text/plain; charset=utf-8',
};

function end(response, code, message) {
  response.writeHead(code, { 'Content-Type': 'text/plain; charset=utf-8' });
  response.end(message);
}

const server = createServer(async (request, response) => {
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    response.setHeader('Allow', 'GET, HEAD');
    return end(response, 405, 'Method not allowed');
  }

  let filename;
  try {
    const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    filename = resolve(output, `.${pathname}`);
    const localPath = relative(output, filename);
    if (localPath.startsWith('..') || isAbsolute(localPath)) return end(response, 404, 'Page not found');
  } catch {
    return end(response, 400, 'Invalid request path');
  }

  try {
    if ((await stat(filename)).isDirectory()) filename = join(filename, 'index.html');
    const contents = await readFile(filename);
    response.writeHead(200, {
      'Content-Type': mediaTypes[extname(filename)] ?? 'application/octet-stream',
      'Content-Length': contents.length,
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
    });
    response.end(request.method === 'HEAD' ? undefined : contents);
  } catch (error) {
    const notFound = error.code === 'ENOENT' || error.code === 'ENOTDIR';
    end(response, notFound ? 404 : 500, notFound ? 'Page not found' : 'Unable to load this page');
  }
});

server.listen(port, '127.0.0.1', () => {
  console.log(`Samcon preview at http://127.0.0.1:${server.address().port}`);
});

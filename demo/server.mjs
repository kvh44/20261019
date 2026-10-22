import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';

const html = await readFile(new URL('./index.html', import.meta.url));
const server = createServer((request, response) => {
  if (request.url !== '/') {
    response.writeHead(404).end('Not found');
    return;
  }
  response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  response.end(html);
});
server.listen(3000, '127.0.0.1', () => console.log('Demo: http://127.0.0.1:3000'));
for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => server.close(() => process.exit(0)));
}

/**
 * Сборка standalone.html: один файл для деплоя (CSS и JS внутри HTML).
 * Запуск из папки проекта: node build-standalone.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const read = (rel) => fs.readFileSync(path.join(__dirname, rel), 'utf8');

function escapeScriptBody(s) {
  return String(s).replace(/<\/script>/gi, '<\\/script>');
}

const css = read('styles.css');
const scriptFiles = [
  'data/bookmakers.js',
  'data/partners.js',
  'main.js',
  'resize.js',
];

let html = read('index.html');

html = html.replace(
  /<link\s+rel="stylesheet"\s+href="\.\/styles\.css"\s*\/?>\s*/i,
  `<style>\n${css}\n</style>\n`
);

const firstScript = html.indexOf('<script src="./data/bookmakers.js"');
const endBody = html.lastIndexOf('</body>');
if (firstScript === -1 || endBody === -1) {
  throw new Error('Не найдена разметка script или </body> в index.html');
}

const inlineScripts = scriptFiles
  .map((f) => `<script>\n${escapeScriptBody(read(f))}\n</script>`)
  .join('\n');

html = html.slice(0, firstScript) + inlineScripts + '\n' + html.slice(endBody);

const outPath = path.join(__dirname, 'standalone.html');
fs.writeFileSync(outPath, html, 'utf8');
console.log('OK:', outPath, '(' + Math.round(fs.statSync(outPath).size / 1024) + ' KB)');

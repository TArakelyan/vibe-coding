/**
 * Сборка index.html для деплоя (один файл).
 * Запуск: node build-standalone.mjs
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
  'data/config.js',
  'data/i18n.js',
  'data/matches.js',
  'auth.js',
  'main.js',
  'resize.js',
];

let html = read('index.source.html');

html = html.replace(
  /<link\s+rel="stylesheet"\s+href="\.\/styles\.css"\s*\/?>\s*/i,
  `<style>\n${css}\n</style>\n`
);

const firstScript = html.indexOf('<script src="./data/config.js"');
const endBody = html.lastIndexOf('</body>');
if (firstScript === -1 || endBody === -1) {
  throw new Error('Не найдена разметка script в index.source.html');
}

const inlineScripts = scriptFiles
  .map((f) => `<script>\n${escapeScriptBody(read(f))}\n</script>`)
  .join('\n');

html = html.slice(0, firstScript) + inlineScripts + '\n' + html.slice(endBody);

fs.writeFileSync(path.join(__dirname, 'index.html'), html, 'utf8');
console.log('OK: index.html — ' + Math.round(fs.statSync(path.join(__dirname, 'index.html')).size / 1024) + ' KB');

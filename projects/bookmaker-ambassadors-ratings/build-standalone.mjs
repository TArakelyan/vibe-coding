/**
 * Сборка index.html для деплоя (один файл: стили и скрипты внутри).
 * Исходная разметка с внешними файлами — index.source.html.
 * Запуск: node build-standalone.mjs
 * Дублирует результат в standalone.html (совместимость со старыми ссылками).
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
  'data/ambassadors.js',
  'main.js',
  'resize.js',
];

let html = read('index.source.html');

html = html.replace(
  /<link\s+rel="stylesheet"\s+href="\.\/styles\.css"\s*\/?>\s*/i,
  `<style>\n${css}\n</style>\n`
);

const firstScript = html.indexOf('<script src="./data/bookmakers.js"');
const endBody = html.lastIndexOf('</body>');
if (firstScript === -1 || endBody === -1) {
  throw new Error('Не найдена разметка script или </body> в index.source.html');
}

const inlineScripts = scriptFiles
  .map((f) => `<script>\n${escapeScriptBody(read(f))}\n</script>`)
  .join('\n');

html = html.slice(0, firstScript) + inlineScripts + '\n' + html.slice(endBody);

const indexPath = path.join(__dirname, 'index.html');
const standalonePath = path.join(__dirname, 'standalone.html');
fs.writeFileSync(indexPath, html, 'utf8');
fs.writeFileSync(standalonePath, html, 'utf8');
const kb = Math.round(fs.statSync(indexPath).size / 1024);
console.log('OK: index.html + standalone.html (' + kb + ' KB)');

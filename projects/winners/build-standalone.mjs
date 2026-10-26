/**
 * Сборка index.html для деплоя на dumpster (один файл: CSS, JS, шрифты внутри).
 * Разработка с внешними файлами — index.source.html.
 * Запуск: node build-standalone.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const read = (rel) =>
  fs.readFileSync(path.join(__dirname, rel), 'utf8').replace(/^\uFEFF/, '');

const fontCache = new Map();

function escapeScriptBody(s) {
  return String(s).replace(/<\/script>/gi, '<\\/script>');
}

function fontDataUrl(relPath) {
  if (fontCache.has(relPath)) {
    return fontCache.get(relPath);
  }

  const absPath = path.join(__dirname, relPath);
  if (!fs.existsSync(absPath)) {
    throw new Error(`Файл шрифта не найден: ${relPath}`);
  }

  const base64 = fs.readFileSync(absPath).toString('base64');
  const dataUrl = `data:font/ttf;base64,${base64}`;
  fontCache.set(relPath, dataUrl);
  return dataUrl;
}

function inlineFonts(css) {
  return css.replace(/url\((["']?)(\.\/fonts\/[^)"']+)\1\)/g, (_match, _quote, relPath) => {
    const dataUrl = fontDataUrl(relPath.slice(2));
    return `url("${dataUrl}")`;
  });
}

function svgDataUrl(relPath) {
  const absPath = path.join(__dirname, relPath);
  if (!fs.existsSync(absPath)) {
    throw new Error(`SVG не найден: ${relPath}`);
  }

  const svg = fs.readFileSync(absPath, 'utf8').replace(/^\uFEFF/, '').trim();
  const encoded = encodeURIComponent(svg)
    .replace(/'/g, '%27')
    .replace(/"/g, '%22');
  return `data:image/svg+xml,${encoded}`;
}

function inlineSvg(css) {
  return css.replace(/url\((["']?)(\.\/pattern-bg\.svg)\1\)/g, () => {
    return `url("${svgDataUrl('pattern-bg.svg')}")`;
  });
}

function inlineLocalImages(js) {
  return js.replace(/"\.\/images\/([^"]+)"/g, (_match, filename) => {
    const relPath = `images/${filename}`;
    const absPath = path.join(__dirname, relPath);
    if (!fs.existsSync(absPath)) {
      throw new Error(`Изображение не найдено: ${relPath}`);
    }

    const ext = path.extname(filename).slice(1).toLowerCase();
    const mime =
      ext === 'png' ? 'image/png' : ext === 'webp' ? 'image/webp' : 'image/jpeg';
    const base64 = fs.readFileSync(absPath).toString('base64');
    return `"data:${mime};base64,${base64}"`;
  });
}

const css = inlineSvg(inlineFonts(read('styles.css')));
const scriptFiles = ['data/config.js', 'data/intro.js', 'data/champions.js', 'data/search-aliases.js', 'data/logo-scales.js', 'main.js', 'resize.js'];

let html = read('index.source.html');

html = html.replace(/<link\s+rel="preload"[^>]*>\s*/gi, '');

// Выносим шрифт заголовка в отдельный ранний <style>, чтобы он декодировался до огромного Neoris.
const bluescreensFaceMatch = css.match(/@font-face\s*\{[^}]*font-family:\s*"TT Bluescreens Trial"[^}]*\}/);
const bluescreensFace = bluescreensFaceMatch ? bluescreensFaceMatch[0] : '';
const cssWithoutEarlyFace = bluescreensFace
  ? css.replace(bluescreensFace, '/* TT Bluescreens — см. early style */')
  : css;

const earlyFontStyle = bluescreensFace
  ? `<style>\n${bluescreensFace}\n</style>\n`
  : '';

html = html.replace(
  /<link\s+rel="stylesheet"\s+href="\.\/styles\.css"\s*\/?>\s*/i,
  `${earlyFontStyle}<style>\n${cssWithoutEarlyFace}\n</style>\n`
);

const firstScript = html.indexOf('<script src="./data/config.js"');
const endBody = html.lastIndexOf('</body>');
if (firstScript === -1 || endBody === -1) {
  throw new Error('Не найдена разметка script или </body> в index.source.html');
}

const inlineScripts = scriptFiles
  .map((f) => {
    let content = read(f);
    if (f === 'data/champions.js') {
      content = inlineLocalImages(content);
    }
    return `<script>\n${escapeScriptBody(content)}\n</script>`;
  })
  .join('\n');

html = html.slice(0, firstScript) + inlineScripts + '\n' + html.slice(endBody);

const indexPath = path.join(__dirname, 'index.html');
fs.writeFileSync(indexPath, html, 'utf8');
const kb = Math.round(fs.statSync(indexPath).size / 1024);
console.log('OK: index.html (standalone) — ' + kb + ' KB');

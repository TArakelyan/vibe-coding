/**
 * Сканирует PNG-логотипы из data/champions.js и пишет data/logo-scales.js.
 * Запуск: node scripts/measure-logo-scales.mjs
 */
import fs from 'fs';
import path from 'path';
import zlib from 'zlib';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const championsPath = path.join(root, 'data', 'champions.js');
const outPath = path.join(root, 'data', 'logo-scales.js');

const TARGET_FILL = 0.88;
const MAX_SCALE = 1.75;
const MIN_FILL_TO_SCALE = 0.47;

/** Ручные правки: широкие/мелкие логотипы, где автоизмерение ошибается. */
const MANUAL_OVERRIDES = {
  // Спартак: старое московское +10%, кубковое +50% от РПЛ 2016/17
  'https://dumpster.cdn.sports.ru/d/af/ca516e65b6dbd233bad8ef6719f4d.png': 1.1,
  'https://dumpster.cdn.sports.ru/2/e5/815d447505f31ad8600d7abbb1614.png': 1.5,
  'https://dumpster.cdn.sports.ru/f/e3/aa0eed13d98336a2273397af5a8fd.png': 1.52,
  'https://dumpster.cdn.sports.ru/4/c5/01da99f6f099cbc7d3dbab5349af3.png': 1.42,
  'https://dumpster.cdn.sports.ru/f/23/c3a4af03388795c12014166cfd869.png': 1,
  'https://dumpster.cdn.sports.ru/c/6d/0c4055a4841ca8316b9cc9ed5fcf1.png': 1.3,
  'https://dumpster.cdn.sports.ru/0/f1/8b4a6bae7c8b9cdf43e2ea1cd373d.png': 1.2,
  'https://dumpster.cdn.sports.ru/f/b1/0307b2371830226a9afb0b8364e32.png': 1.4,
  'https://dumpster.cdn.sports.ru/5/63/3986d0a595c0b253ca7bdba4b9469.png': 1.1,
  // Хоккей
  'https://dumpster.cdn.sports.ru/9/b5/1c938e9f76f175919d10f3cb2496c.png': 1.1,
  'https://dumpster.cdn.sports.ru/d/d7/67e65f9990e2e191a93816999bb9b.png': 1.15,
  'https://dumpster.cdn.sports.ru/1/bc/62be8a9a676d70b4c491b50ae5b81.png': 1.15,
  'https://dumpster.cdn.sports.ru/c/e7/29dfb24a8ac175947769a8d7bcc4b.png': 0.93,
  // НХЛ
  'https://dumpster.cdn.sports.ru/b/91/23cbea1b830342c21f389ddbe7324.png': 2,
  'https://dumpster.cdn.sports.ru/9/4a/8481597771a5438dff2c92cf2c571.png': 1,
  'https://dumpster.cdn.sports.ru/c/5d/24795ace0f6f4094ab879e3cb15ca.png': 1,
  'https://dumpster.cdn.sports.ru/5/6c/d186b12ee56e0763efb270151ff93.png': 1.14,
  'https://dumpster.cdn.sports.ru/6/33/59dadd9a124fdef0cce58e4c0f7d1.png': 1.2,
  // Киберспорт
  'https://dumpster.cdn.sports.ru/2/35/a9a991a17c022c9282aadcd898e09.png': 1,
  'https://dumpster.cdn.sports.ru/c/de/ea79dc5fbccc419e6bf4392fb3b4f.png': 0.86,
};

function paethPredictor(a, b, c) {
  const p = a + b - c;
  const pa = Math.abs(p - a);
  const pb = Math.abs(p - b);
  const pc = Math.abs(p - c);
  if (pa <= pb && pa <= pc) return a;
  if (pb <= pc) return b;
  return c;
}

function unfilter(raw, width, height, bpp) {
  const stride = width * bpp;
  const out = Buffer.alloc(height * stride);
  let prev = Buffer.alloc(stride);

  for (let y = 0; y < height; y++) {
    const filter = raw[y * (stride + 1)];
    const start = y * (stride + 1) + 1;
    const row = Buffer.alloc(stride);

    for (let i = 0; i < stride; i++) {
      const rawByte = raw[start + i];
      const a = i >= bpp ? row[i - bpp] : 0;
      const b = prev[i];
      const c = i >= bpp ? prev[i - bpp] : 0;
      let val;

      switch (filter) {
        case 0:
          val = rawByte;
          break;
        case 1:
          val = (rawByte + a) & 0xff;
          break;
        case 2:
          val = (rawByte + b) & 0xff;
          break;
        case 3:
          val = (rawByte + Math.floor((a + b) / 2)) & 0xff;
          break;
        case 4:
          val = (rawByte + paethPredictor(a, b, c)) & 0xff;
          break;
        default:
          val = rawByte;
      }

      row[i] = val;
    }

    row.copy(out, y * stride);
    prev = row;
  }

  return out;
}

function decodePng(buffer) {
  const sig = buffer.subarray(0, 8).toString('hex');
  if (sig !== '89504e470d0a1a0a') {
    throw new Error('Not a PNG file');
  }

  let offset = 8;
  let width = 0;
  let height = 0;
  let colorType = 0;
  const idats = [];

  while (offset + 8 <= buffer.length) {
    const len = buffer.readUInt32BE(offset);
    const type = buffer.toString('ascii', offset + 4, offset + 8);
    const data = buffer.subarray(offset + 8, offset + 8 + len);

    if (type === 'IHDR') {
      width = data.readUInt32BE(0);
      height = data.readUInt32BE(4);
      colorType = data[9];
    } else if (type === 'IDAT') {
      idats.push(data);
    } else if (type === 'IEND') {
      break;
    }

    offset += 12 + len;
  }

  const bppByType = { 0: 1, 2: 3, 3: 1, 4: 2, 6: 4 };
  const bpp = bppByType[colorType];
  if (!bpp) {
    throw new Error('Unsupported PNG color type: ' + colorType);
  }

  const raw = zlib.inflateSync(Buffer.concat(idats));
  const pixels = unfilter(raw, width, height, bpp);
  return { width, height, bpp, pixels, colorType };
}

function isContentPixel(r, g, b, a) {
  return a > 24 && !(r > 235 && g > 235 && b > 235);
}

function measureFillRatio(buffer) {
  const { width, height, bpp, pixels, colorType } = decodePng(buffer);
  let minX = width;
  let minY = height;
  let maxX = 0;
  let maxY = 0;
  let contentPixels = 0;
  const totalPixels = width * height;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * bpp;
      let r = 0;
      let g = 0;
      let b = 0;
      let a = 255;

      if (colorType === 6) {
        r = pixels[i];
        g = pixels[i + 1];
        b = pixels[i + 2];
        a = pixels[i + 3];
      } else if (colorType === 2) {
        r = pixels[i];
        g = pixels[i + 1];
        b = pixels[i + 2];
      } else if (colorType === 4) {
        r = pixels[i];
        a = pixels[i + 1];
      } else {
        r = pixels[i];
        g = pixels[i];
        b = pixels[i];
      }

      if (!isContentPixel(r, g, b, a)) {
        continue;
      }

      contentPixels += 1;

      if (x < minX) minX = x;
      if (y < minY) minY = y;
      if (x > maxX) maxX = x;
      if (y > maxY) maxY = y;
    }
  }

  if (maxX < minX || maxY < minY || contentPixels === 0) {
    return 1;
  }

  const contentW = maxX - minX + 1;
  const contentH = maxY - minY + 1;
  const bboxFill = Math.max(contentW / width, contentH / height);
  const areaFill = contentPixels / totalPixels;
  const visualFill = Math.sqrt(areaFill);

  // Комбинируем bbox и плотность пикселей: ловит «разреженные» логотипы вроде Спартака.
  return Math.min(bboxFill, visualFill);
}

function scaleFromFill(fillRatio, referenceFill) {
  if (fillRatio >= MIN_FILL_TO_SCALE || fillRatio <= 0) {
    return 1;
  }

  return Math.min(MAX_SCALE, referenceFill / fillRatio);
}

function extractLogoUrls(source) {
  const urls = new Set();
  const re = /imageShape:\s*'logo'[\s\S]*?image:\s*"([^"]+)"/g;
  let match;

  while ((match = re.exec(source))) {
    urls.add(match[1]);
  }

  return [...urls];
}

const championsSource = fs.readFileSync(championsPath, 'utf8').replace(/^\uFEFF/, '');
const urls = extractLogoUrls(championsSource);
const measured = [];

for (const url of urls) {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error('HTTP ' + res.status);
    }

    const buffer = Buffer.from(await res.arrayBuffer());
    const fill = measureFillRatio(buffer);
    measured.push({ url, fill });
    console.log(' ', url.split('/').pop(), 'fill=' + fill.toFixed(3));
  } catch (err) {
    console.warn('!', url, err.message);
  }
}

const goodFills = measured
  .map(function (item) {
    return item.fill;
  })
  .filter(function (fill) {
    return fill >= MIN_FILL_TO_SCALE && fill <= 0.85;
  })
  .sort(function (a, b) {
    return a - b;
  });

const referenceFill =
  goodFills.length > 0
    ? goodFills[Math.floor(goodFills.length / 2)]
    : TARGET_FILL;

console.log('\nReference fill:', referenceFill.toFixed(3));

const scales = {};
const report = [];

measured.forEach(function (item) {
  let scale = scaleFromFill(item.fill, referenceFill);
  if (item.url in MANUAL_OVERRIDES) {
    scale = MANUAL_OVERRIDES[item.url];
  }
  if (scale < 0.98 || scale > 1.02) {
    scales[item.url] = Number(scale.toFixed(2));
  }
  report.push({ url: item.url, fill: item.fill.toFixed(3), scale: scale.toFixed(2) });
  console.log((scale < 0.98 || scale > 1.02) ? '+' : ' ', item.url.split('/').pop(), 'scale=' + scale.toFixed(2));
});

urls.forEach(function (url) {
  if (!(url in MANUAL_OVERRIDES) || url in scales) {
    return;
  }
  const scale = MANUAL_OVERRIDES[url];
  if (scale < 0.98 || scale > 1.02) {
    scales[url] = Number(scale.toFixed(2));
  }
  console.log('+', url.split('/').pop(), 'scale=' + scale.toFixed(2), '(manual, unmeasured)');
});

const fileBody =
  '/* eslint-disable */\n' +
  '// Автогенерация: node scripts/measure-logo-scales.mjs\n' +
  'var LOGO_SCALES = ' +
  JSON.stringify(scales, null, 4) +
  ';\n';

fs.writeFileSync(outPath, fileBody, 'utf8');
console.log('\nSaved', outPath, '—', Object.keys(scales).length, 'scaled logos');

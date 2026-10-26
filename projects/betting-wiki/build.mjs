/**
 * Полная сборка «Спортивной вики» перед деплоем.
 * Запуск: node build.mjs
 */
import { execSync } from 'child_process';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)));

const BUILD_STEPS = [
  'build-from-source.mjs',
  'apply-rebrand.mjs',
  'patch-section-tabs.mjs',
  'patch-category-pages.mjs',
];

const VERSIONED_ASSETS = [
  'patch.js',
  'patch.css',
  'data/config.js',
  'data/categories.js',
];

function runScript(scriptName) {
  const scriptPath = path.join(projectRoot, 'scripts', scriptName);
  if (!fs.existsSync(scriptPath)) {
    throw new Error(`Скрипт не найден: scripts/${scriptName}`);
  }
  console.log(`\n>> node scripts/${scriptName}`);
  execSync(`node "${scriptPath}"`, { cwd: projectRoot, stdio: 'inherit' });
}

function hashFile(relPath) {
  const abs = path.join(projectRoot, relPath);
  if (!fs.existsSync(abs)) return '0';
  return crypto.createHash('md5').update(fs.readFileSync(abs)).digest('hex').slice(0, 8);
}

function buildAssetVersion() {
  return VERSIONED_ASSETS.map(hashFile).join('-');
}

function collectHtmlFiles() {
  const files = [path.join(projectRoot, 'index.html'), path.join(projectRoot, 'category.html')];
  const pagesDir = path.join(projectRoot, 'pages');
  if (fs.existsSync(pagesDir)) {
    for (const name of fs.readdirSync(pagesDir)) {
      if (name.endsWith('.html')) files.push(path.join(pagesDir, name));
    }
  }
  return files.filter((f) => fs.existsSync(f));
}

function stampAssetUrls(html, version) {
  let result = html;

  for (const asset of VERSIONED_ASSETS) {
    const fileName = path.basename(asset);
    const dirPrefix = asset.includes('/') ? asset.slice(0, asset.lastIndexOf('/') + 1) : '';

    const patterns = [
      new RegExp(`((?:href|src)=")(\\./${asset})(?:\\?v=[^"]*)?"`, 'g'),
      new RegExp(`((?:href|src)=")(\\.\\./${asset})(?:\\?v=[^"]*)?"`, 'g'),
    ];

    if (!dirPrefix) {
      patterns.push(
        new RegExp(`((?:href|src)=")(\\./${fileName})(?:\\?v=[^"]*)?"`, 'g'),
        new RegExp(`((?:href|src)=")(\\.\\./${fileName})(?:\\?v=[^"]*)?"`, 'g')
      );
    }

    for (const re of patterns) {
      result = result.replace(re, `$1$2?v=${version}"`);
    }
  }

  return result;
}

function injectAssetVersions() {
  const version = buildAssetVersion();
  const htmlFiles = collectHtmlFiles();
  let updated = 0;

  for (const file of htmlFiles) {
    const before = fs.readFileSync(file, 'utf8');
    const after = stampAssetUrls(before, version);
    if (after !== before) {
      fs.writeFileSync(file, after);
      updated += 1;
    }
  }

  const meta = {
    version,
    builtAt: new Date().toISOString(),
    htmlFiles: htmlFiles.length,
    updatedFiles: updated,
  };
  fs.writeFileSync(path.join(projectRoot, 'build-version.json'), `${JSON.stringify(meta, null, 2)}\n`);
  console.log(`\nВерсия ассетов: ${version} (обновлено HTML: ${updated}/${htmlFiles.length})`);
}

console.log('=== Сборка betting-wiki ===');

for (const step of BUILD_STEPS) {
  runScript(step);
}

injectAssetVersions();

console.log('\n=== Готово. Можно деплоить папку projects/betting-wiki ===');

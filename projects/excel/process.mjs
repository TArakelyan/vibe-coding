import ExcelJS from 'exceljs';
import fs from 'fs';
import path from 'path';

const dir = path.resolve('.');
const outDir = path.join(dir, 'обработано');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

const files = fs.readdirSync(dir).filter(f => f.toLowerCase().endsWith('.xlsx') && !f.includes('~$'));

const CODE_COL = 2;   // Правильный код для дубликатов
const NAME_COL = 6;   // Новое наименование

// Достаём отображаемый текст из ячейки (строка, число, формула с result, richText)
function cellText(value) {
  if (value === null || value === undefined) return '';
  if (typeof value === 'string') return value;
  if (typeof value === 'number' || typeof value === 'boolean') return String(value);
  if (value instanceof Date) return value.toISOString();
  if (typeof value === 'object') {
    if ('result' in value && value.result !== undefined && value.result !== null) {
      return cellText(value.result);
    }
    if (Array.isArray(value.richText)) {
      return value.richText.map(r => r.text).join('');
    }
    if ('text' in value) return String(value.text);
    if ('hyperlink' in value && 'text' in value) return String(value.text);
  }
  return String(value);
}

for (const file of files) {
  const wb = new ExcelJS.Workbook();
  await wb.xlsx.readFile(path.join(dir, file));
  const ws = wb.worksheets[0];

  const lastRow = ws.rowCount;

  // 1) Замораживаем все формулы в их вычисленные значения (иначе ссылки поедут при удалении строк)
  for (let r = 1; r <= lastRow; r++) {
    const row = ws.getRow(r);
    row.eachCell({ includeEmpty: false }, (cell) => {
      const v = cell.value;
      if (v && typeof v === 'object' && ('formula' in v || 'sharedFormula' in v)) {
        cell.value = (v.result !== undefined && v.result !== null) ? v.result : cellText(v);
      }
    });
  }

  // 2) Группируем строки данных (со 2-й) по коду
  const groups = new Map(); // code -> [{rowIndex, nameLen}]
  const noCodeRows = [];     // строки без кода — не трогаем
  for (let r = 2; r <= lastRow; r++) {
    const row = ws.getRow(r);
    const code = cellText(row.getCell(CODE_COL).value).trim();
    if (code === '') { noCodeRows.push(r); continue; }
    const nameLen = cellText(row.getCell(NAME_COL).value).length;
    if (!groups.has(code)) groups.set(code, []);
    groups.get(code).push({ rowIndex: r, nameLen });
  }

  // 3) В каждой группе оставляем строку с самым длинным «Новое наименование» (при равенстве — первую)
  const rowsToDelete = [];
  let dupGroups = 0, removed = 0;
  for (const [code, arr] of groups) {
    if (arr.length <= 1) continue;
    dupGroups++;
    let best = arr[0];
    for (const item of arr) {
      if (item.nameLen > best.nameLen) best = item;
    }
    for (const item of arr) {
      if (item.rowIndex !== best.rowIndex) { rowsToDelete.push(item.rowIndex); removed++; }
    }
  }

  // 4) Удаляем снизу вверх, чтобы индексы не смещались
  rowsToDelete.sort((a, b) => b - a);
  for (const r of rowsToDelete) ws.spliceRows(r, 1);

  const outName = file.replace(/\.xlsx$/i, '') + ' — обработано.xlsx';
  await wb.xlsx.writeFile(path.join(outDir, outName));

  const totalData = lastRow - 1;
  console.log(`${file}`);
  console.log(`   строк данных было: ${totalData}, групп-дубликатов: ${dupGroups}, удалено строк: ${removed}, осталось: ${totalData - removed} (+без кода: ${noCodeRows.length})`);
  console.log(`   -> ${outName}`);
}
console.log('\nГотово. Файлы в папке: обработано/');

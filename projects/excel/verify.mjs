import ExcelJS from 'exceljs';
import fs from 'fs';
import path from 'path';

const outDir = path.resolve('обработано');
const files = fs.readdirSync(outDir).filter(f => f.toLowerCase().endsWith('.xlsx') && !f.includes('~$'));

function cellText(value) {
  if (value === null || value === undefined) return '';
  if (typeof value === 'string') return value;
  if (typeof value === 'number' || typeof value === 'boolean') return String(value);
  if (typeof value === 'object') {
    if ('result' in value) return cellText(value.result);
    if (Array.isArray(value.richText)) return value.richText.map(r => r.text).join('');
    if ('text' in value) return String(value.text);
  }
  return String(value);
}

for (const file of files) {
  const wb = new ExcelJS.Workbook();
  await wb.xlsx.readFile(path.join(outDir, file));
  const ws = wb.worksheets[0];
  const codes = new Map();
  let dups = 0;
  for (let r = 2; r <= ws.rowCount; r++) {
    const code = cellText(ws.getRow(r).getCell(2).value).trim();
    if (code === '') continue;
    codes.set(code, (codes.get(code) || 0) + 1);
  }
  for (const [, c] of codes) if (c > 1) dups++;
  const h1 = cellText(ws.getRow(1).getCell(1).value);
  const h6 = cellText(ws.getRow(1).getCell(6).value);
  console.log(`${file}: строк=${ws.rowCount}, уник.кодов=${codes.size}, кодов-с-дублями=${dups}, заголовок[1]="${h1}", заголовок[6]="${h6}"`);
}

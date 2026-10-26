import ExcelJS from 'exceljs';
import fs from 'fs';
import path from 'path';

const dir = path.resolve('.');
const files = fs.readdirSync(dir).filter(f => f.toLowerCase().endsWith('.xlsx'));

for (const file of files) {
  const wb = new ExcelJS.Workbook();
  await wb.xlsx.readFile(path.join(dir, file));
  console.log('\n==================================================');
  console.log('FILE:', file);
  console.log('Sheets:', wb.worksheets.map(w => w.name).join(' | '));
  const ws = wb.worksheets[0];
  console.log('Rows:', ws.rowCount, 'Cols:', ws.columnCount);
  const header = ws.getRow(1);
  const headers = [];
  header.eachCell({ includeEmpty: true }, (cell, col) => {
    headers.push(col + ':' + JSON.stringify(cell.value));
  });
  console.log('HEADER ROW 1:', headers.join(' | '));
  // print row 2 sample
  const r2 = ws.getRow(2);
  const s2 = [];
  r2.eachCell({ includeEmpty: true }, (cell, col) => {
    let v = cell.value;
    if (v && typeof v === 'object') v = JSON.stringify(v);
    s2.push(col + ':' + String(v).slice(0, 40));
  });
  console.log('SAMPLE ROW 2:', s2.join(' | '));
}

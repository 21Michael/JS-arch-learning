//=====================EMULATING EXEL TABLE=====================//
const ROWS = 5;
const columns = ['A', 'B', 'C', 'D', 'E', 'F'];
const data = {};

const table = new Proxy(data, {
  get(obj, key) {
    console.log('get', key);
    const cell = obj[key];
    return cell ? cell.value : '';
  },
  set(obj, key, value) {
    console.log('set', key, value);
    const type = typeof value;
    if (type === 'function') {
      const expression = String(value).replace(/([A-Z]\d+)/g,'table.$1');

      value = eval(expression)();
      obj[key] = { value, expression };
    } else {
      obj[key] = { value };
      const rowKey =  +key.slice(1);
      const columnKey = key.slice(0, 1);

      if(rowKey <= 1) return;
      const updateCellKey = 'F' + rowKey;
      const rowAmount = Math.max(...Object.keys(table).map(val => +val.slice(1)));
      const updateColumnSumKey = columnKey + rowAmount;

      const updateCell = obj[updateCellKey];
      const updateColumnSum = obj[updateColumnSumKey];

      if(!updateCell) return;
      updateCell.value = eval(updateCell.expression)();
      updateColumnSum.value = eval(updateColumnSum.expression)();
    }
    return true;
  }
});

// Usage

table.A1 = 'city';
table.B1 = 'population';
table.C1 = 'area';
table.D1 = 'density';
table.E1 = 'country';
table.F1 = 'relative';

table.A2 = 'Shanghai';
table.B2 = 24256800;
table.C2 = 6340;
table.D2 = 3826;
table.E2 = 'China';

table.A3 = 'Beijing';
table.B3 = 21516000;
table.C3 = 16411;
table.D3 = 1311;
table.E3 = 'China';

table.A4 = 'Delhi';
table.B4 = 16787941;
table.C4 = 1484;
table.D4 = 11313;
table.E4 = 'India';

table.D5 = () => Math.max(D2, D3, D4);

table.F2 = () => Math.round(D2 * 100 / D5) + '%';
table.F3 = () => Math.round(D3 * 100 / D5) + '%';
table.F4 = () => Math.round(D4 * 100 / D5) + '%';

table.D4 = 170; // reactive update column's max el cell (D5) and last column of this row (F4)

const output = [];

for (let i = 2; i <= ROWS; i++) {
  const row = {};
  output[i] = row;
  for (const col of columns) {
    row[col] = table[col + i];
  }
}

console.table(output);

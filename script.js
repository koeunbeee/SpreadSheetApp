const spreadSheetContainer = document.querySelector('#spreadsheet-container');
const ROWS = 10;
const COLS = 10;
const spreadsheet = [];

class Cell {
  constructor(
    isHeader,
    disabled,
    data,
    row,
    column,
    rowName,
    columnName,
    active = false
  ) {
    this.isHeader = isHeader;
    this.disabled = disabled;
    this.data = data;
    this.row = row;
    this.column = column;
    this.rowName = rowName;
    this.columnName = columnName;
    this.active = active;
  }
}

const alphabets = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
];

initSpreadsheet();

function initSpreadsheet() {
  for (let i = 0; i < COLS; i++) {
    let spreadsheetRow = [];
    for (let j = 0; j < COLS; j++) {
      let cellData = '';
      let isHeader = false;
      let disabled = false;

      if (j === 0) {
        cellData = i;
        isHeader = true;
        disabled = true;
      }
      if (i === 0) {
        isHeader = true;
        disabled = true;
        cellData = alphabets[j - 1];
      }

      if (!cellData) {
        cellData = '';
      }

      //   if (cellData <= 0) {
      //     cellData = '';
      //   }
      const rowName = i;
      const columnName = alphabets[j - 1];
      const cell = new Cell(
        isHeader,
        disabled,
        cellData,
        i,
        j,
        rowName,
        columnName,
        false
      );
      spreadsheetRow.push(cell);
    }
    spreadsheet.push(spreadsheetRow);
  }
  drawSheet();
  console.log('spreadsheet', spreadsheet);
}

function createCellEl(cell) {
  const cellEl = document.createElement('input');
  cellEl.className = 'cell';
  cellEl.id = 'cell_' + cell.row + cell.column;
  cellEl.value = cell.data;
  cellEl.disabled = cell.disabled;

  if (cell.isHeader) {
    cellEl.classList.add('header');
  }

  return cellEl;
}

function drawSheet() {
  for (let i = 0; i < spreadsheet.length; i++) {
    const rowContainerEl = document.createElement('div');
    rowContainerEl.className = 'cell-row';
    // console.log('rowContain', rowContainerEl);

    // for (let j = 0; j < spreadsheet[i].length; j++) {
    //   const cell = spreadsheet[i][j];
    //   rowContainerEl.append(createCellEl(cell));
    //   console.log('createCellEl', createCellEl(cell));
    // }
    spreadSheetContainer.append(rowContainerEl);
  }
}

function handleCellClick(cell) {
  clearHeaderActiveStates();
  const columnHeader = spreadsheet[0][cell.column];
  const rowHeader = spreadsheet[cell.row][0];
  const columnHeaderEl = getElFromRowCol(columnHeader.row, columnHeader.column);
  const rowHeaderEl = getElFromRowCol(rowHeader.row, rowHeader.column);
  columnHeaderEl.classList.add('active');
  rowHeaderEl.classList.add('active');
}

function clearHeaderActiveStates() {
  const headers = document.querySelectorAll('.header');

  headers.forEach((header) => {
    header.classList.remove('active');
  });
}

const exportBtn = document.querySelector('#export-btn');

exportBtn.onclick = function (e) {
  console.log(spreadsheet);
};

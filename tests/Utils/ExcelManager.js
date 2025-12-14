const ExcelJS = require("exceljs");

class ExcelManager {
  constructor(filePath) {
    this.filePath = filePath;
    this.workBook = new ExcelJS.Workbook();
  }

  async loadWorkbook() {
    await this.workBook.xlsx.readFile(this.filePath);
  }

  getWorksheet(sheetName = "Sheet1") {
    return this.workBook.getWorksheet(sheetName);
  }

  async findCell(workSheet, searchText) {
    let output = { row: -1, col: -1 };
    
    workSheet.eachRow((row, rowNumber) => {
      row.eachCell((cell, colNumber) => {
        if (cell.value === searchText) {
          output.row = rowNumber;
          output.col = colNumber;
          console.log(`Row: ${rowNumber}, column: ${colNumber}`);
        }
      });
    });
    
    return output;
  }

  async updateCellRelative(searchText, coordinatesChange, sheetName = "Sheet1") {
    await this.loadWorkbook();
    const workSheet = this.getWorksheet(sheetName);
    const cellLocation = await this.findCell(workSheet, searchText);
    
    if (cellLocation.row === -1 || cellLocation.col === -1) {
      throw new Error(`Search text "${searchText}" not found in worksheet`);
    }

    const targetRow = cellLocation.row + (coordinatesChange.rowChange || 0);
    const targetCol = cellLocation.col + (coordinatesChange.colChange || 0);
    const targetCell = workSheet.getCell(targetRow, targetCol);
    
    targetCell.value = coordinatesChange.changeVal;
    
    await this.workBook.xlsx.writeFile(this.filePath);
    
    return {
      searchLocation: cellLocation,
      targetLocation: { row: targetRow, col: targetCol },
      newValue: targetCell.value
    };
  }

  async saveWorkbook(outputPath = null) {
    const savePath = outputPath || this.filePath;
    await this.workBook.xlsx.writeFile(savePath);
  }
}

module.exports = ExcelManager;

// Usage example:
// const ExcelManager = require('./ExcelManager');
// 
// const excelManager = new ExcelManager("C:/Users/2025/Documents/ExcelFileDownloadExample.xlsx");
// await excelManager.updateCellRelative(
//   "Mango", 
//   { rowChange: 0, colChange: 2, changeVal: -100 }
// );
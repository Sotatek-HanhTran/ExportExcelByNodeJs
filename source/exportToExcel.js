const xlsx = require('xlsx');
const path = require('path');

const workSheetColumnName = [
    "Ngày",
    "Phòng ban",
    "Họ và tên"
]

const todayDate = new Date().toISOString().slice(0, 10);

const exportExcel = (data, workSheetColumnNames, workSheetName, filePath) => {
    const workBook = xlsx.utils.book_new();
    const workSheetData = [
        workSheetColumnNames,
        ... data
    ];
    const workSheet = xlsx.utils.aoa_to_sheet(workSheetData);
    xlsx.utils.book_append_sheet(workBook, workSheet, workSheetName);
    xlsx.writeFile(workBook, path.resolve(filePath));
}

const exportUsersToExcel = (thongtinkham, filePath) => {
    const data = thongtinkham.map(u=> {
        return [u.ngay, u.phongban, u.ten];
    });
    exportExcel(data, workSheetColumnName, todayDate, filePath);
}

module.exports = exportUsersToExcel;
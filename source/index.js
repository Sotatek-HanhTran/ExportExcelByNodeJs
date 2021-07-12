const exportUsersToExcel = require('./exportToExcel');

const todayDate = new Date().toISOString().slice(0, 10);

const thongtinkham = [
    {
        ngay: todayDate,
        phongban: 'khoa tri',
        ten: 'nguyen van a'
    },
    {
        ngay: todayDate,
        phongban: 'khoa kham thai',
        ten: 'nguyen van b'
    }
];

function Thongtinphongkham(obj) {
    this.ngay = "";
    this.phongban = "";
    this.ten = "";
  
  for (var prop in obj) {
    if (this.hasOwnProperty(prop)) {
      this[prop] = obj[prop];
    }else{
        this.metaData = [ ...this.metaData, {[prop]: obj[prop]} ];
    }
  }
}

const GetAllData = function (tt=[]) {
    var thongtinkham = [];
    for (var i = 0; i < tt.length; i++) {
        thongtinkham.push(new Thongtinphongkham(tt[i]));
    }
    return thongtinkham;
  };

const data = GetAllData(thongtinkham);

const filePath = './outputFiles/thongtinngay_'+ todayDate.replace('-','').replace('-','') + '.xlsx';

exportUsersToExcel(data, filePath);
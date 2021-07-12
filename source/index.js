const { publicDecrypt } = require('crypto');
const exportUsersToExcel = require('./exportToExcel');

const thongtinkham = [
    {
        ngay: '2021-07-12',
        phongban: 'khoa tri',
        ten: 'nguyen van a'
    },
    {
        ngay: '2021-07-11',
        phongban: 'khoa kham thai',
        ten: 'nguyen van b'
    },
    {
      ngay: '2021-07-12',
      phongban: 'khoa kham thai',
      ten: 'nguyen van d'
    },
    {
      ngay: '2021-07-12',
      phongban: 'khoa tri',
      ten: 'nguyen van c'
    },
    
];

// cast data
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

  String.prototype.insert = function(index, string) {
    if (index > 0) {
      return this.substring(0, index) + string + this.substr(index);
    }
  
    return string + this;
  };

  const data = GetAllData(thongtinkham);

  // format data to export
  const FomartData = function(startDate, endDate)
  {
    var thongtinkham = [];
    var tt = data;
    for (var i = parseInt(startDate); i <= parseInt(endDate); i++) 
    {
      var date = i.toString().insert(6,"-").insert(4,"-");
      var ttDate = tt.filter(l => l.ngay == date);
      if (ttDate.length > 0)
      {
        
        ttDate.sort(function(a, b) {
          var phongbanA = a.phongban.toUpperCase(); // ignore upper and lowercase
          var phongbanB = b.phongban.toUpperCase(); // ignore upper and lowercase
          if (phongbanA < phongbanB) {
            return -1;
          }
          if (phongbanA > phongbanB) {
            return 1;
          }
        
          // names must be equal
          return 0;
        });
        thongtinkham.push(new Thongtinphongkham(ttDate[0]));
        var phongban =  ttDate[0].phongban;
        if(ttDate.length <= 1)
        {
          continue;
        }
        for (var j = 1; j < ttDate.length; j++) 
        {
          ttDate[j].ngay = "";
          if (phongban == ttDate[j][1])
          {
             ttDate[j].phongban = "";
          }
          else
          {
            phongban = ttDate[j][1];
          }
          thongtinkham.push(new Thongtinphongkham(ttDate[j]));
        }
      }
    }
    return thongtinkham;
  }

const dataToExport = FomartData(20210711, 20210712);  

// combie file path
function getFormattedDate(date) {
  let year = date.getFullYear();
  let month = (1 + date.getMonth()).toString().padStart(2, '0');
  let day = date.getDate().toString().padStart(2, '0');

  return year + month + day;
}
const todayDate = getFormattedDate(new Date());

const filePath = './outputFiles/thongtinngay_'+ todayDate.replace('-','').replace('-','') + '.xlsx';

exportUsersToExcel(dataToExport, filePath);

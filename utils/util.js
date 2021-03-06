const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const formatDay = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/')
}

const wxuuid = function() {
  var s = [];
  var hexDigits = "0123456789abcdef";
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = "-";

  var uuid = s.join("");
  return uuid
}

// 今天是否已打卡
function isPunched(id, arrRecord) {
  var arrRecord = arrRecord ? arrRecord : wx.getStorageSync('signin' + id).arrRecord;
  var re = false;
  if (arrRecord && arrRecord.length > 0) {
    var len = arrRecord.length;
    for (var i = len - 1; i >= 0; i--) {
      if (arrRecord[i].nowDay == formatDay(new Date())) {
        re = true;
        break;
      }
    }
  }
  return re;
}

function signIn(id) {
  var nowDay = formatDay(new Date());
  var data = wx.getStorageSync('signin' + id);
  console.log("签到数据log", data)
  var arrRecord = data.arrRecord ? data.arrRecord : []
  if (!isPunched(id, arrRecord)) {
    arrRecord.push({
      nowDay
    });
    var data_add = {
      arrRecord: arrRecord
    }
    wx.setStorageSync('signin' + id, data_add);
    wx.showToast({
      title: '打卡成功',
      icon: 'success',
      duration: 1000
    })
  } else {
    wx.showToast({
      title: '已打卡',
      icon: 'none',
      duration: 1000
    })
  }
}
// 以下 2012-02-25 添加
// 显示失败提示
function showModal(title, content,doStringify = false){
  wx.hideToast()
  wx.showModal({
    title,
    content: doStringify ? JSON.stringify(content) : content,
    showCancel: false
  })

}
function getBookList(){
  var arr = wx.getStorageSync('book');
  var projectList = [];
  //遍历缓存数据并组装
  if (arr.length > 0) {
    var showFlag = false;
    arr.forEach((item, i) => {
      var listdata = {
        journal_book_id: item.journal_book_id,
        name: item.name,
        background_id: item.background_id,
        createTime: item.createTime,
      };
      projectList.push(listdata)
    })
  } else {
    showFlag = true;
  }
  console.log("home init", projectList)
  // 数据存入页面
  return projectList
}

// 显示成功提示
var showSuccess = title => {
  wx.hideToast()
  wx.showToast({
    title,
    icon: 'success'
  })
}

var getJournalList= bookid=>{
  return 'ok'
}
module.exports = {
  formatTime: formatTime,
  wxuuid: wxuuid,
  formatDay: formatDay,
  signIn: signIn,
  isPunched: isPunched,
  showModal: showModal,
  showSuccess: showSuccess,
  getBookList: getBookList,
  getJournalList: getJournalList
}
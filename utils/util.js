//补0
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// YYYY-MM-DD HH:MM:SS
const formatTimeString = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

// YYYY-MM-DD
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return [year, month, day].map(formatNumber).join('-')
}

//HH-MM-SS
const formatTimes = time => {
  const hour = time.getHours()
  const minute = time.getMinutes()
  const second = time.getSeconds()
  return [hour, minute, second].map(formatNumber).join(':')
}

//时间戳转日期
const toDate = number => {
  var n = number;
  var date = new Date(parseInt(n) * 1000);
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  m = m < 10 ? ('0' + m) : m;
  var d = date.getDate();
  d = d < 10 ? ('0' + d) : d;
  var h = date.getHours();
  h = h < 10 ? ('0' + h) : h;
  var minute = date.getMinutes();
  var second = date.getSeconds();
  minute = minute < 10 ? ('0' + minute) : minute;
  second = second < 10 ? ('0' + second) : second;
  return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
}

//当前日期加减天数
const mathChangeDate = (date, method, days) => {
  //method:'+' || '-'
  //ios不解析带'-'的日期格式，要转成'/'，不然Nan，切记
  var dateVal = date.replace(/-/g, '/');
  var timestamp = Date.parse(dateVal);
  if (method == '+') {
    timestamp = timestamp / 1000 + 24 * 60 * 60 * days;
  } else if (method == '-') {
    timestamp = timestamp / 1000 - 24 * 60 * 60 * days;
  }
  return formatTime(timestamp);
}

// 获得目前到达退休年的的最早年份
const retirementDate = date => {
  var dateVal = date.replace(/-/g, '/');
  var timestamp = Date.parse(dateVal);
  timestamp = timestamp / 1000 - 24 * 60 * 60 * 365 * 65;
  var reTime = toDate(timestamp).split(' ')[0]; //把字符串后面的时分秒去掉
  return reTime;
}

//时间戳转换具体时间
const getDateDiff = dateTimeStamp => {
  var result = '';
  var minute = 1000 * 60;
  var hour = minute * 60;
  var day = hour * 24;
  var halfamonth = day * 15;
  var month = day * 30;
  var now = new Date(); //有些特殊 不能使用 new Date()
  var diffValue = now - dateTimeStamp;
  if (diffValue < 0) {
    return;
  }
  var monthC = diffValue / month;
  var weekC = diffValue / (7 * day);
  var dayC = diffValue / day;
  var hourC = diffValue / hour;
  var minC = diffValue / minute;
  if (monthC >= 1) {
    result = "" + parseInt(monthC) + "月前";
  } else if (weekC >= 1) {
    result = "" + parseInt(weekC) + "周前";
  } else if (dayC >= 1) {
    result = "" + parseInt(dayC) + "天前";
  } else if (hourC >= 1) {
    result = "" + parseInt(hourC) + "小时前";
  } else if (minC >= 1) {
    result = "" + parseInt(minC) + "分钟前";
  } else
    result = "刚刚";
  return result;
};

//获取当前服务器时间
const formatDateThis = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

//比较两个时间大小(格式参考yyyy-mm-dd hh:mm:ss)
const compareTime = (startTime, endTime) => {
  //结束时间大于开始时间就是true  ， 反之则为 false
  if (startTime.localeCompare(endTime) == -1) {
    return true;
  }

  return false;
}

//验证是否是按下了空格键
const isSpaceBtn = (keyCode) => {
  if (keyCode == 32) {
    wx.showModal({
      title: '警告',
      content: '请不要输入空格键！',
      showCancel: true,
    });
    return true
  } else {
    return false;
  }
}

// 验证Email的正确性
const isEmail = (valueStr) => {
  const reg = new RegExp('^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$');
  let isEmail = reg.test(valueStr);
  return isEmail;
}

// 验证手机号码的正确性
const isPhone = (valueStr) => {
  const reg = new RegExp('/^[1][3,4,5,7,8][0-9]{9}$/');
  let isPhone = reg.test(valueStr);
  return isPhone;
}

// 验证是否输入值是否存在汉字和特殊字符
const isSpecial = valueStr => {
  const reg = new RegExp('^(?=[0-9a-zA-Z@_.]+$)'); // 是否存在除 @,_ 之外的特殊字符
  const reg_utf8 = new RegExp('^[\u4e00-\u9fa5]{0,}$'); // 是否存在汉字
  let error = {};
  if (!reg_utf8.test(valueStr)) {
    if (reg.test(valueStr)) {
      error.status = true;
    } else {
      error.status = false
      error.errorMsg = '微信号不能输入特殊字符';
    }
  } else {
     error.status = false
    error.errorMsg = '微信号不能输入汉字';
  }
  return error;
}

module.exports = {
  formatTimeString: formatTimeString,
  formatDateThis: formatDateThis,
  formatTime: formatTime,
  formatTimes: formatTimes,
  toDate: toDate,
  getDateDiff: getDateDiff,
  mathChangeDate: mathChangeDate,
  retirementDate: retirementDate,
  compareTime: compareTime,
  // 验证
  isSpaceBtn: isSpaceBtn,
  isEmail: isEmail,
  isPhone: isPhone,
  isSpecial: isSpecial
}
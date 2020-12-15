const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function getDate(istime){
  var date=new Date();
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  if(!istime)return [year, month, day].map(formatNumber).join('-');
  else return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

module.exports = {
  getDate: getDate
}

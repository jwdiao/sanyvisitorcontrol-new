/**
 * 时间戳格式化函数
 * @param  {string} format    格式
 * @param  {int}    timestamp 要格式化的时间 默认为当前时间
 * @return {string}           格式化的时间字符串
 */


export const date=(timestamp)=>{
  var aa = new Date(timestamp)
  var year = aa.getFullYear()
  var mouth = aa.getMonth()+1
  var day = aa.getDate()
  var Hour = aa.getHours()
  var MIn = aa.getMinutes()
  var sec = aa.getSeconds()

return year+'-'+add0(mouth)+'-'+add0(day)+' '+add0(Hour)+':'+add0(MIn)+':'+add0(sec)
}
function add0(m) {
 return m < 10 ? '0'+m:m
}

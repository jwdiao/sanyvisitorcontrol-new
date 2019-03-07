//参数h：应该传入Vue组件this
// 验证手机号
export const checkPhone = (tel,h) => {
  console.log('tel:',tel)
  if(tel.length === 11){
    if(!(/^1[3456789]\d{9}$/.test(tel))){
      // console.log('this:',h)
      h.$message({
        type:'error',
        message:'手机号码格式错误，请重新输入'
      })
    }
  }else {
    h.$message({
      type:'error',
      message:'请输入11位手机号码'
    })
  }
}
// 验证身份证号
export function checkIDCard (IDNumber,h) {
  if(IDNumber.length === 15){
    if(!/(^\d{15}$)/.test(IDNumber)){
      h.$message({
        type:'error',
        message:'身份证号码格式错误，请重新输入'
      })
    }
  }else if(IDNumber.length === 18){
    if(!/(^\d{17}([0-9]|x|X)$)/.test(IDNumber)){
      h.$message({
        type:'error',
        message:'身份证号码格式错误，请重新输入'
      })
    }
  }else{
    h.$message({
      type:'error',
      message:'请输入15位或18位身份证号码'
    })
  }
}
// 验证车牌号
export function checkCarCard (CarCardNum,h) {
  var PTNumExpress = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/;
  var XNYumExpress = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-Z0-9][0-9]{4}$))/;
  if(CarCardNum.length === 7){
    if(!(PTNumExpress.test(CarCardNum))){
      h.$message({
        type:'error',
        message:'车牌号码格式错误，请重新输入'
      })
    }
  }else if(CarCardNum.length === 8){
    if(!(XNYumExpress.test(CarCardNum))){
      h.$message({
        type:'error',
        message:'车牌号码格式错误，请重新输入'
      })
    }
  }else{
    h.$message({
      type:'error',
      message:'请输入7位或8位车牌号码'
    })
  }
}



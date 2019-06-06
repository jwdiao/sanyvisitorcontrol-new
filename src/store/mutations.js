export default {
    // 设置登陆信息
    loginMuta (state, item) {
      state.adminObj = item;
      sessionStorage.setItem('token', state.adminObj.token)
      sessionStorage.setItem('username', state.adminObj.username)
      sessionStorage.setItem('roleCode', state.adminObj.roleCode)
      sessionStorage.setItem('userNumber', state.adminObj.userNumber)
      sessionStorage.setItem('imgUrlUpload', state.adminObj.imgUrlUpload)
      sessionStorage.setItem('imgVerify', state.adminObj.imgVerify)
    },
    // 注销登陆
    logoutMuta (state) {
      state.adminObj = {};
      state.loginDataArr = {};
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('username');
      sessionStorage.removeItem('roleCode');
    },
    //state二维码
    getQrCodeImg(state,data){
      state.qrCodeImage = data
    },
}

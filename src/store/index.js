import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    adminObj: {
      username: '', // 用户名
      token: '', // token
      roleCode: '', // 角色区分
			userNumber:'',//工号
			imgUrlUpload:'',//照片路径
    }, // 管理页信息

    qrCodeImage:'',//二维码地址

        //登陆后返回的值

  },
  mutations: {
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
  },
  actions: {
    loginAction ({ commit }, item) {
      commit('loginMuta', item)
    },
		logOutAction({commit}){
			commit('logoutMuta')
		},

  }
})
export default store

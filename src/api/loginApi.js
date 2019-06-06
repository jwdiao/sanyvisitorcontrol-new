import $http from './http'
import BASE_URL from './global'
export const LoginRequest = async (param) => $http.post(`/user/SanyBasicShrUser/login`, param) //普通账号登录接口20190531
// export const LoginRequest = async (param) => $http.post(`/user/SanyBasicShrUser/visitorLogin`, param) //20190529域账号登录接口
// export const LoginRequest = async (param) => $http.post(`/user/SanyBasicShrUser/login`, param)   // 增加内外网20190505
// export const LoginRequest = async (param) => $http.post(`/SanyBasicShrUser/login`, param)    //20190430======================?
//忘记找回密码
export const resetPwd = (param) => $http.post(`/user/SanyBasicShrUser/updateLoginPwd`,param)
//退出登录
export const logOutRequest = () => $http.post(`/user/SanyBasicShrUser/logout`)
//0513登录页面---预约园区--接口 djw
export const reqBookParkArr = () =>$http.post(`/visitorcontrol/sanyBasicPark/getParkList`,{parkName:''})

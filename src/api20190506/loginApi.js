import $http from './http'
import BASE_URL from './global'
export const LoginRequest = async (param) => $http.post(`${BASE_URL}/user/SanyBasicShrUser/login`, param)
// export const LoginRequest = async (param) => $http.post(`/user/SanyBasicShrUser/login`, param)   // 增加内外网20190505
// export const LoginRequest = async (param) => $http.post(`${BASE_URL}/SanyBasicShrUser/login`, param)    //20190430======================?
//忘记找回密码
export const resetPwd = (param) => $http.post(`${BASE_URL}/user/SanyBasicShrUser/updateLoginPwd`,param)
//退出登录
export const logOutRequest = () => $http.post(`${BASE_URL}/user/SanyBasicShrUser/logout`)

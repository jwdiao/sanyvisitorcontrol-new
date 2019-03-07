import $http from './http'
import BASE_URL from './global'
export const LoginRequest = async (param) => $http.post(`${BASE_URL}/user/SanyBasicShrUser/login`, param)
//忘记找回密码
export const resetPwd = (param) => $http.post(`${BASE_URL}/user/SanyBasicShrUser/updateLoginPwd`,param)
//退出登录
export const logOutRequest = () => $http.get(`${BASE_URL}/user/SanyBasicShrUser/logout`)
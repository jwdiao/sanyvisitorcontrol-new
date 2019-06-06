<template>
  <div class="login">
    <section class="form_contianer">
      <div class="manage_tip">
        <img src="../../assets/images/icon_logo.png" alt="">
        <p class="title">园区人员车辆管理系统</p>
      </div>
      <el-form ref="loginForm" class="loginForm" :model="loginData" :rules="rules">
        <el-form-item prop="username">
          <i></i>
          <el-input placeholder="请输入域账号" v-model="loginData.username"><span></span></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <i></i>
          <el-input type="password" v-model="loginData.password" placeholder="请输入域密码" @keyup.native="isClickFun" @keyup.enter.native="login()"></el-input>
        </el-form-item>
      <!--  <el-form-item class="bookpark">
          <i class="bookparkicon"></i>
          <el-select v-model="loginData.bookPark" placeholder="请选择预约园区" @change="changeVisitPark">
            <el-option
              v-for="item in visitParkOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>-->
         <div class="login_forgetPwd">
          <!--<span @click="handleForgetPwd">设置密码</span>--><!--2090528使用域账号密码-->
          <span style="color: #ff0000;">请使用域账号密码登录</span>
        </div>
        <el-form-item>
            <el-button type="primary" block class="submit_btn" @click="login()" :disabled="isClickLogin">登 &nbsp; 录</el-button>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>

<script>
import CryptoJS from 'crypto-js'
import { LoginRequest,reqBookParkArr } from '../../api/loginApi'
// import {regRoleCodeIsMengang,} from '../../api'
import { mapActions } from 'vuex'
import {isInnerIPFn} from '../../util/isInnerIP'
import axios from 'axios'
export default {
  name: 'Login',
  data () {
    return {
      isInnerIpNum:'',//访问地址ip
      isClickLogin:false,//登录是否点击
      visitParkOptions:[],//预约园区数组
      loginData: {
				username: '',
				password: '',
        bookPark:'回龙观园区'
			},
			rules: {
				username: [
					{ required: true, message: '请输入用户名', trigger: 'blur' },
				],
				password: [
					{ required: true, message: '请输入密码', trigger: 'blur' }
				],

			}
    }
  },
  created(){},
  mounted(){
    // 判断是内网，外网  20190505
    const BaseUrlReq = isInnerIPFn().BASE_URL
    axios.defaults.baseURL = BaseUrlReq
    console.log('BaseUrlReq000:',BaseUrlReq)
    //初始化预约园区20190513
   // this.getBookPark()
  },

  methods: {
    ...mapActions(['loginAction']),
		//DES加密 Pkcs7填充方式
		encryptByDES(message, key){
			const keyHex = CryptoJS.enc.Utf8.parse(key);
			const encrypted = CryptoJS.DES.encrypt(message, keyHex, {
					mode: CryptoJS.mode.ECB,
					padding: CryptoJS.pad.Pkcs7
			});
			return encrypted.toString();
		},
		//DES解密
		decryptByDES(ciphertext, key){
			const keyHex = CryptoJS.enc.Utf8.parse(key);
			// direct decrypt ciphertext
			const decrypted = CryptoJS.DES.decrypt({
									ciphertext: CryptoJS.enc.Base64.parse(ciphertext)
			}, keyHex, {
									mode: CryptoJS.mode.ECB,
									padding: CryptoJS.pad.Pkcs7
			});
			return decrypted.toString(CryptoJS.enc.Utf8);
		},
    async login () {
			this.$refs.loginForm.validate(async (valid) => {
				if (!valid) return;
				const {username, password,bookPark} = this.loginData
        let loginStatus = false;

        /**
         * 加密应用：
         * const _key = username     const _password = password
         * 加密：let xx = this.encryptByDES(_password,_key) // 输出：sHTd/9exYuk=
         * 解密：let yy = this.decryptByDES(xx,_key) // 输出： 123456
        */

				const formData = {
					loginAccount: username,
          loginPwd: password,
          parkCode:bookPark,
          // loginPwd: this.encryptByDES(password,username) // 密码加密，后期放开
				}
          this.loginMethods(formData)
			});
		},
    // 要求密码必须大于6位，，，初始化保存密码时按钮可以点击
    isClickFun(){
      this.loginData.password.length>=6 ? this.isClickLogin = false : this.isClickLogin = true
    },

		async loginMethods (formData) {
      const res = await LoginRequest(formData);
      // debugger;
      // if (!res || res.status!==200 ||)
      const {code, data, msg} = res.data;
      if (code === 200) {
        this.$message({
          type: 'success',
          message: '登陆成功!'
        });
				// console.log(data);
        let user = {
          username: data.userName,
          token: data.token,
          roleCode: data.roleCode ,// 角色区分（"1":员工，"2":门岗，"3":管理）
					userNumber:data.userNo,//工号
					imgUrlUpload:data.imgUrlUpload,//登陆者图片路径
					imgVerify:data.imgVerify//照片是否合格
        }
        // 登陆成功，把信息记录到sessionstorage存储中
        this.loginAction(user)
        this.$router.push('/index')

      } else {
        this.$message({
          type: 'error',
          message: msg
        })
      }
    },

    handleForgetPwd () {
      this.$router.push('/resetpwd')
    },

    //预约园区
    changeVisitPark(val){
      let obj = {};
      obj = this.visitParkOptions.find((item)=>{
        return item.value === val;
      });
      this.loginData.bookPark = val
    },
    //请求后台预约园区list
    async getBookPark(){
      const res = await reqBookParkArr()
      if(!res && !res.data.code===200){
        return
      }
      let newBoookList = res.data.data
      this.loginData.bookPark = newBoookList[1].parkCode
      newBoookList.forEach(item=>{
        let newListObj = {}
        newListObj.value = item.parkCode
        newListObj.label = item.parkName
        this.visitParkOptions.push(newListObj)
      })
    },


  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.login{
  position: absolute;top:0;left:0;bottom:0;right:0;
  background: url(../../assets/images/login_bg.jpg);
  background-size: 100% 100%;
  .form_contianer{
    width: 400px;
    position: absolute;left: 55%;top:50%;
    transform: translateY(-50%);
    border: 1px solid rgba(77, 118, 194, 0.4);
    box-shadow: 17px 13px 40px rgba(3, 29, 68, 0.42);
    background-color:#111c3e;
  }
  .manage_tip{
    text-align: center;padding-top:30px;
    .title{font-size: 30px;color:#fff;padding-top:15px;}
  }
  .el-form{
    padding:0 50px 30px;margin-top:20px;
  }
  .el-form .el-form-item i {
      width: 45px;
     background: #fff;
     position: absolute;
     border-bottom-left-radius: 5px;
     border-top-left-radius: 5px;
     height: calc(100% - 2px);
     left: 1px;
     top: 1px;
     z-index: 5;
  }
  .loginForm .el-form-item .el-input /deep/ .el-input__inner{padding-left:45px;}
  .submit_btn{width: 100%;margin-top:20px;}
   /deep/ .el-form .el-form-item:nth-child(1) i{
    background: #fff url("../../assets/images/login_account.png") no-repeat 10px center;
  }
  /deep/ .el-form .el-form-item:nth-child(2) i{
    background: #fff url("../../assets/images/login_password.png") no-repeat 10px center;
  }
  /deep/ .el-form .el-form-item .bookparkicon{
    background: #fff url("../../assets/images/bookpark.png") no-repeat 10px center;
  }
  &_forgetPwd{
    color:#fff;font-size:12px;text-align: right;
    span{
      cursor: pointer;
    }
  }
}
  .bookpark{
   /deep/ .el-input__inner{
      width: 298px!important;
    }
  }

</style>
<style>
  .loginForm .el-form-item .el-input .el-input__inner{padding-left:45px;}
</style>

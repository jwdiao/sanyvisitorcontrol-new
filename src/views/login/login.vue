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
          <el-input placeholder="请输入用户名" v-model="loginData.username"><span></span></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <i></i>
          <el-input type="password" v-model="loginData.password" placeholder="请输入密码" @keyup.enter.native="login()"></el-input>
        </el-form-item>
        <div class="login_forgetPwd">
          <span @click="handleForgetPwd">忘记密码</span>
        </div>
        <el-form-item>
            <el-button type="primary" block class="submit_btn" @click="login()">登 &nbsp; 录</el-button>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>

<script>
import { LoginRequest } from '../../api/loginApi'
// import {regRoleCodeIsMengang} from '../../api'
import { mapActions } from 'vuex'


export default {
  name: 'Login',
  data () {
    return {
      loginData: {
				username: '',
				password: ''
			},
			rules: {
				username: [
					{ required: true, message: '请输入用户名', trigger: 'blur' },
				],
				password: [
					{ required: true, message: '请输入密码', trigger: 'blur' }
				]
			}
    }
  },
  created(){

  },
  methods: {
    ...mapActions(['loginAction']),

    async login () {
			this.$refs.loginForm.validate(async (valid) => {
				if (!valid) return;
				const {username, password} = this.loginData
				let loginStatus = false;
				const formData = {
					loginAccount: username,
					loginPwd: password
				}
				this.loginMethods(formData)
			});
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
				console.log(data);
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
    }
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
  &_forgetPwd{
    color:#fff;font-size:12px;text-align: right;
    span{
      cursor: pointer;
    }
  }
}
</style>
<style>
  .loginForm .el-form-item .el-input .el-input__inner{padding-left:45px;}
</style>

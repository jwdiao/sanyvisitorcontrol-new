<template>
  <div class="resetpwd">
    <section class="form_contianer">
      <p class="resetpwd_tip">找回密码</p>
      <el-form ref="loginForm" :model="loginData" :rules="rules">

        <el-form-item prop="usernum">
          <i></i>
          <el-input v-model="loginData.usernum" placeholder="工号"></el-input>
        </el-form-item>
        <el-form-item prop="card">
          <i></i>
          <el-input v-model="loginData.card" placeholder="身份证"></el-input>
        </el-form-item>
        <el-form-item prop="newPwd">
          <i></i>
          <el-input placeholder="新密码" v-model="loginData.newPwd"><span></span></el-input>
        </el-form-item>
        <div class="login_forgetPwd">
          <span @click="gobackLogin('/login')">返回登录</span>
        </div>
        <el-form-item>
            <el-button type="primary" block class="submit_btn" @click="login()">确 &nbsp; 定</el-button>
        </el-form-item>

      </el-form>
    </section>
  </div>
</template>

<script>
import { resetPwd } from '../../api/loginApi'
import { mapActions } from 'vuex'
export default {
  name: 'ResetPwd',
  data () {
    return {
      loginData: {
        newPwd: '',
        usernum: '',
        card: ''
			},
			rules: {
        newPwd: [
					{ required: true, message: '请输入新密码', trigger: 'blur' },
				],
				usernum: [
					{ required: true, message: '请输入工号', trigger: 'blur' }
        ],
        card: [
					{ required: true, message: '请输入身份证号', trigger: 'blur' }
				]
			}
    }
  },
  methods: {
    ...mapActions(['loginAction']),
    async login () {
			this.$refs.loginForm.validate(async (valid) => {
				if (!valid) return;
				const {newPwd, usernum, card} = this.loginData
				let loginStatus = false;
				const formData = {
          loginAccount:usernum,
          idCard:card,/////////////////loginAccount,idCard,loginPwd
          loginPwd:newPwd
				}
				this.loginMethods(formData)
			});
		},
		async loginMethods (formData) {
      const res = await resetPwd(formData)
       const {code, data, msg} = res.data;
				if (code === 200) {

          this.$router.push('/index')

				} else {
					this.$message({
						type: 'error',
						message: msg
					})
				}
		},
    gobackLogin(path){
      this.$router.replace(path)
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.resetpwd{
  position: absolute;top:0;left:0;bottom:0;right:0;
  background: url(../../assets/images/login_bg.jpg);
  background-size: 100% 100%;
  &_tip{
    font-size: 26px;color:#fff;padding: 60px 50px 0;
  }
  .form_contianer{
    width: 400px;
    position: absolute;left: 55%;top:50%;
    transform: translateY(-50%);
    border: 1px solid rgba(77, 118, 194, 0.4);
    box-shadow: 17px 13px 40px rgba(3, 29, 68, 0.42);
    background-color:#111c3e;
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
  /deep/ .el-input__inner{padding-left:45px;}
  .submit_btn{width: 100%;margin-top:20px;}
   /deep/ .el-form .el-form-item:nth-child(1) i{
    background: #fff url("../../assets/images/F1.png") no-repeat 10px center;
  }
  .submit_btn{width: 100%;margin-top:20px;}
   /deep/ .el-form .el-form-item:nth-child(2) i{
    background: #fff url("../../assets/images/F3.png") no-repeat 10px center;
  }
  /deep/ .el-form .el-form-item:nth-child(3) i{
    background: #fff url("../../assets/images/F2.png") no-repeat 10px center;
  }
  .login_forgetPwd{
    color:#fff;font-size:12px;text-align: right;
    span{
      cursor: pointer;
    }
  }
}
</style>

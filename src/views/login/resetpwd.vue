<template>
  <div class="resetpwd">
    <section class="form_contianer">
      <p class="resetpwd_tip">修改密码</p>
      <el-form ref="loginForm" :model="loginData" :rules="rules">

        <!--<el-form-item prop="usernum">
          <i></i>
          <el-input v-model="loginData.usernum" placeholder="登录账号"></el-input>
        </el-form-item>-->
        <el-form-item prop="phoneNum" style="width: 61%;">
          <i></i>
          <el-input v-model="loginData.phoneNum" :disabled="isEditPhone" placeholder="手机号" @keyup.native="phoneChange" @change="regPhone"></el-input>
          <el-button :disabled='reTimeBtnClick' type="primary" style="position: absolute;width: 117px;" @click="reqExpregNumClick">{{expregText}}</el-button>
        </el-form-item>
        <el-form-item prop="card">
          <i></i>
          <el-input v-model="loginData.card" placeholder="验证码"></el-input>
        </el-form-item>
        <el-form-item prop="newPwd">
          <i></i>
          <el-input placeholder="新密码至少6位" type="password" v-model="loginData.newPwd" @change="pwdRegExpFun"><span></span></el-input>
        </el-form-item>
        <el-form-item prop="reNewPwd">
          <i></i>
          <el-input placeholder="确认新密码" type="password" v-model="loginData.reNewPwd" @blur="regNewBlur"><span></span></el-input>
        </el-form-item>
        <div class="login_forgetPwd">
          <span @click="gobackLogin('/login')">进入登录</span>
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
import {checkPhone} from '../../util/regExp'
import {regTelIsExist,
  regSendExpregNumber,
  regSubmitNewPwd
}from '../../api'
export default {
  name: 'ResetPwd',
  data () {
    return {
      expregText:'获取验证码',
      reTimeBtnClick:true,//获取验证码时不能连续点击
      isEditPhone:false,//是否能编辑电话号码
      loginData: {
        newPwd: '',
        usernum: '',
        card: '',
        phoneNum:'',
        reNewPwd:'',
			},
			rules: {
        newPwd: [
					{ required: true, message: '请输入新密码', trigger: 'blur' },
				],
        reNewPwd: [
					{ required: true, message: '请输入确认新密码', trigger: 'blur' },
				],
				usernum: [
					{ required: true, message: '请输入登录账号', trigger: 'blur' }
        ],
        phoneNum: [
					{ required: true, message: '请输入手机号', trigger: 'blur' }
        ],
        card: [
					{ required: true, message: '请输入验证码', trigger: 'blur' }
				]
			}
    }
  },
  methods: {
    ...mapActions(['loginAction']),
    async login () {
			this.$refs.loginForm.validate(async (valid) => {
				if (!valid) return;
				const {newPwd, usernum, card,phoneNum} = this.loginData
				let loginStatus = false;
				const formData = {
          loginAccount:usernum,
          idCard:card,/////////////////loginAccount,idCard,loginPwd
          loginPwd:newPwd
				}
				//this.loginMethods(formData)
        this.submitLogin(newPwd,card,phoneNum)
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
    //忘记密码点击确定按钮
    async submitLogin(newPassword,code,telephone){
      if(this.loginData.newPwd.length<6){
        this.$message({type:'error',message:'密码不得少于6位'})
        return
      }
      const res = await regSubmitNewPwd(newPassword,code,telephone)
      if(res&&res.data.code===200){
        this.$message({type:'success',message:res.data.data})
        //跳转页面
        this.$router.replace('/login')
      }else{
        this.$message({type:'error',message:res.data.msg})
      }
    },
    gobackLogin(path){
      this.$router.replace(path)
    },
    //点击验证码按钮
    async reqExpregNumClick(){
      this.reTimeBtnClick = true
      var recondTime = 60
      //验证码发送请求
      const res = await regSendExpregNumber(this.loginData.phoneNum)
      if(res&&res.data.code===200){
        this.isEditPhone = true
        this.expregText = recondTime +'s后重新获取'
        this.$message({type:'success',message:'验证码已发送'})
        clearInterval(timers)
        var timers = setInterval(()=>{
          recondTime--
          this.expregText = recondTime +'s后重新获取'
          if(recondTime<=0){
            this.expregText = '获取验证码'
            this.reTimeBtnClick = false
            this.isEditPhone = false
            clearInterval(timers)
          }
        },1000)
      }
    },
    //手机号码改变
   async phoneChange(){
      var tel = this.loginData.phoneNum
     if(tel.length===11){
       const res = await regTelIsExist(tel)
       if(res&&res.data.code===200){
         this.reTimeBtnClick = false
       }else{
         this.reTimeBtnClick = true
         this.$message({
           type:'error',
           message:res.data.msg
         })
       }
     }else{
       this.reTimeBtnClick = true
     }
    },
    regPhone(){
      var tel = this.loginData.phoneNum
      checkPhone(tel,this)
    },
    //密码复杂性验证
    pwdRegExpFun(val){
      console.log('val:',val)
      var pattern = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z]{1,})(?=.*[a-z]{1,})/
     if(!pattern.test(val)){
       this.loginData.newPwd = ''
        this.$message({type:'error',message:'密码必须包含数字，大写，小写字母且6位以上'})
     }
    },
    //校验两次密码是否一致
    regNewBlur(){
      let {newPwd,reNewPwd} = this.loginData
     if(newPwd.length>=6){
       if(newPwd!==reNewPwd){
         this.$message({
           type:'error',
           message:'两次密码输入不一致'
         })
         this.loginData.reNewPwd = ''
       }
     }else{
        this.$message({type:'error',message:'密码不得少于6位'})
       return
     }
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
    background: #fff url("../../assets/images/phone.png") no-repeat 10px center;
  }
  .submit_btn{width: 100%;margin-top:20px;}
   /deep/ .el-form .el-form-item:nth-child(3) i{
    background: #fff url("../../assets/images/F2.png") no-repeat 10px center;
  }
  /deep/ .el-form .el-form-item:nth-child(4) i{
    background: #fff url("../../assets/images/regImage.png") no-repeat 10px center;
  }
  /deep/ .el-form .el-form-item:nth-child(5) i{
    background: #fff url("../../assets/images/newPwd.png") no-repeat 10px center;
  }
  .login_forgetPwd{
    color:#fff;font-size:12px;text-align: right;
    span{
      cursor: pointer;
    }
  }
}
</style>

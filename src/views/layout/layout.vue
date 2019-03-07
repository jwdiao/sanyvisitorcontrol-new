<template>
  <div class="fillcontain layout">
    <el-container class="fillcontain">
      <el-header>
        <el-row class="clear">
          <!-- <img class="layout_logo" src="../../assets/images/layout_logo.jpg" /> -->
					<div class="manage_title">
						<img src="../../assets/images/logo.png" />
						<i>访客预约系统</i>
					</div>
          <div class="layout_logout">
            <em>欢迎您 , {{username}}</em>&nbsp;&nbsp;&nbsp;
            <span @click = "handleLogout"><img src="../../assets/images/manage_layout.png" />退出</span>
          </div>
        </el-row>
      </el-header>
      <el-container>
        <Sidebar></Sidebar>
        <el-main>
					<head-top></head-top>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import headTop from '../../components/headTop'
import Sidebar from './sidebar'
import { logOutRequest } from '../../api/loginApi'
import { mapActions } from 'vuex'
export default {
  name: 'Layout',
  components: {
    Sidebar,headTop
  },
  data () {
    return {
      username: ''
    }
  },
  mounted () {
    this.username = sessionStorage.username
  },
  methods: {
		...mapActions(['logOutAction']),
    handleLogout () {
			 this.logoutHttp();
		},
		async logoutHttp(){
      const res = await logOutRequest();
			if(res && res.data.code === 200){
			   this.logOutAction(); 
			   this.$router.push('/login');	
			}else{
			   this.$message({
			   	type: 'error',
			   	message: '服务器错误'
         })
			}
			
		}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.layout_logo{
  padding-top:10px;
  padding-left: 10px;
}
.layout_logout{
  height: 60px;
  line-height:60px;
  float:right;
  text-align: right;
  padding-right: 30px;
  font-size: 14px;
  color: #fff;
	line-height:74px;
  em{font-style: normal}
  span{
    cursor: pointer;
		font-size:18px;
  }
  img{
    margin-left: 15px;
    margin-right: 5px;
    vertical-align: -2px;
		width:18px;
		height:18px;
  }
}
/deep/ .el-header{
	  background-color: #324157;
		padding: 0px 20px 0px 0px;
		.manage_title{
			color: #409EFF;
			font-size: 20px;
			line-height: 60px;
			width: 240px;
			background-color: #192433;
			padding-left: 25px;box-sizing: border-box;
			position:absolute;
			img{width: 26px;vertical-align: middle;margin-right: 8px;font-size: 24px;}
			i{vertical-align: middle;color: #5b9fff;font-size: 19px;}
		}
}
/deep/ .el-main{
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  background-color: #f8f8f8;
  box-shadow: -5px 2px 5px rgba(0, 0, 0, 0.1) inset;
}
</style>

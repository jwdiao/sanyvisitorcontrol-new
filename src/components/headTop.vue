<template>
  <div class="header_container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="(item, index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	.header_container{
    /*background-color: #EFF2F7;*/
    background-color: #DEE3E9;
		height: 60px;
	  display: flex;
		//justify-content: space-between;
		align-items: center;
		padding-left: 20px;
    font-size: 26px;
    /deep/ .el-breadcrumb{
      /deep/ .el-breadcrumb__item{
        /deep/ .el-breadcrumb__inner{
          font-size: 14px;
          font-weight: bold !important;
          color: #33475d !important;
        }
      }
    }

	}
	.avator{
		width:36px;
		height:36px;
		border-radius: 50%;
		margin-right: 37px;
	}
	.el-dropdown-menu__item{
        text-align: center;
    }


</style>

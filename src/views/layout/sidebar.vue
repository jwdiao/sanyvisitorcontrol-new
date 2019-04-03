<!--
<template>

  <el-aside width="240px">
    <el-menu
      router
      unique-opened
      :default-active="defaultActive"
      background-color="#33485d"
      active-text-color="#fff"
      text-color="#fff"
      class="fillcontain">
      <el-menu-item index="index" class="indexMenu"><i class="fontFamily hhtx-shouye-"></i>首页</el-menu-item>
      <el-submenu index="1" v-if="roleCode==='1' || roleCode==='3' || roleCode==='4'">
        <template slot="title"><i class="fontFamily hhtx-gerenzhongxin"></i>我的信息</template>
        <el-menu-item v-if="roleCode==='1' || roleCode==='4' || roleCode==='3'" index="myPhotoInput">我的照片录入</el-menu-item>&lt;!&ndash;全部员工和管理&ndash;&gt;
        <el-menu-item v-if="roleCode==='3' || roleCode==='4'" index="photoInputSearch">照片录入查询</el-menu-item>&lt;!&ndash;管理&ndash;&gt;
      </el-submenu>
      <el-submenu index="2">
        <template slot="title"><i class="fontFamily hhtx-yewuguanli-"></i>访客管理</template>
        <el-menu-item v-if="roleCode==='1' || roleCode==='4' || roleCode==='3'" index="myVisitor">我的访客信息</el-menu-item>&lt;!&ndash;全部员工和管理&ndash;&gt;
        <el-menu-item v-if="roleCode==='1' || roleCode==='4' || roleCode==='3'" index="visitHistoryRecord">拜访历史记录</el-menu-item>&lt;!&ndash;全部员工和管理&ndash;&gt;
        <el-menu-item v-if="roleCode==='2' || roleCode==='4'" index="tempVisitInput">临时拜访录入</el-menu-item>&lt;!&ndash;门岗&ndash;&gt;
        <el-menu-item v-if="roleCode==='2' || roleCode==='4'" index="bookVisitSearch">预约访客查询</el-menu-item>&lt;!&ndash;门岗&ndash;&gt;
        <el-menu-item v-if="roleCode==='2' || roleCode==='4'" index="endVisitSearch">结束拜访查询</el-menu-item>&lt;!&ndash;门岗&ndash;&gt;
      </el-submenu>

       <el-submenu index="brakeManage" v-if="roleCode==='4'">
        <template slot="title"><i class="fontFamily hhtx-menzha-"></i>门闸管理</template>
        <el-menu-item v-if="roleCode==='4' " index="parkBrake">园区闸机</el-menu-item>&lt;!&ndash;系统管理员&ndash;&gt;
      </el-submenu>

      <el-submenu index="3" v-if="roleCode==='2' || roleCode==='4'">
				&lt;!&ndash;hhtx-icon-test&ndash;&gt;
        <template slot="title"><i class="fontFamily hhtx-yuanquguanli-"></i>园区管理</template>
        <el-menu-item v-if="roleCode==='4'" index="parkService">园区维护</el-menu-item>&lt;!&ndash;系统管理员&ndash;&gt;
        <el-menu-item v-if="roleCode==='4'" index="parkPorter">园区门卫</el-menu-item>&lt;!&ndash;系统管理员&ndash;&gt;
        <el-menu-item v-if="roleCode==='4'" index="empowerment">组织授权</el-menu-item>&lt;!&ndash;系统管理员&ndash;&gt;

         <el-menu-item v-if="roleCode==='2' || roleCode==='4'" index="externalStaffManage">外部员工管理</el-menu-item> &lt;!&ndash;门岗&ndash;&gt;
         <el-menu-item v-if="roleCode==='2' || roleCode==='4'" index="externalStaffAccount">外部员工账号</el-menu-item> &lt;!&ndash;门岗&ndash;&gt;
         &lt;!&ndash;<el-menu-item v-if="roleCode==='2' || roleCode==='4'" index="staffCar">员工车辆</el-menu-item> &lt;!&ndash;门岗&ndash;&gt;&ndash;&gt;

      </el-submenu>
      <el-submenu index="systemManage" v-if="roleCode==='4'">
        <template slot="title"><i class="fontFamily hhtx-xitongpeizhi"></i>系统管理</template>
        <el-menu-item index="outsideOrg">外部组织机构</el-menu-item>&lt;!&ndash;系统管理员&ndash;&gt;
        <el-menu-item index="userManage">用户管理</el-menu-item>&lt;!&ndash;系统管理员&ndash;&gt;
        <el-menu-item index="roleManage">角色管理</el-menu-item>&lt;!&ndash;系统管理员&ndash;&gt;
        <el-menu-item index="userRole">用户角色</el-menu-item>&lt;!&ndash;系统管理员&ndash;&gt;
        <el-menu-item index="manageEmpowerment">管理授权</el-menu-item>&lt;!&ndash;系统管理员&ndash;&gt;
      </el-submenu>
      &lt;!&ndash; <el-submenu index="5">
        <template slot="title"><i class="el-icon-message"></i>公共页面</template>
        <el-menu-item index="nopage">空页面</el-menu-item>
        <el-menu-item index="template">模板页面</el-menu-item>
      </el-submenu> &ndash;&gt;
    </el-menu>
  </el-aside>
</template>
<script>
export default {
  name: 'Sidebar',
  data () {
    return {
      roleCode: '', // '1'：员工， '2':门岗，'3':管理, '4':系统管理员
    }
  },
  computed: {
    defaultActive: function(){
      return this.$route.path.replace('/', '');
    }
  },
  mounted () {
    this.roleCode = sessionStorage.getItem('roleCode')
  },
  methods: {

  }
}
</script>
<style lang="scss" scoped>
.indexMenu{
  font-size:16px !important;
}
  /deep/ .fontFamily{
		    font-size: 16px;
        margin-right: 7px;
	}
 /deep/.el-submenu__title{font-size:16px;}
.el-submenu /deep/ .el-menu-item{padding-left:50px !important;font-size: 14px;color:#9098a5 !important;}
 .el-menu /deep/.el-menu-item.is-active{background: rgba(48,65,86,1) !important;color:rgba(64,158,255,1) !important;}
.fontFamily{
	vertical-align: unset;
}
</style>
-->

<template>

  <el-aside width="240px">
    <el-menu
      router
      unique-opened
      :default-active="defaultActive"
      background-color="#33485d"
      active-text-color="#fff"
      text-color="#fff"
      class="fillcontain">
      <el-menu-item index="index" class="indexMenu"><i class="fontFamily hhtx-shouye-"></i>首页</el-menu-item>
      <el-submenu index="1" v-if="roleCode==='1' ||roleCode==='2'||roleCode==='3' || roleCode==='4'"><!--员工-->
        <template slot="title"><i class="fontFamily hhtx-gerenzhongxin"></i>我的信息</template>
        <el-menu-item v-if="roleCode==='1' || roleCode==='2' || roleCode==='4' || roleCode==='3'" index="myPhotoInput">我的照片录入</el-menu-item><!--全部员工和管理,门岗-->
      </el-submenu>
      <el-submenu index="2" v-if="roleCode==='1' ||roleCode==='2' || roleCode==='4'">
        <template slot="title"><i class="fontFamily hhtx-yewuguanli-"></i>访客管理</template>
        <el-menu-item v-if="roleCode==='1' ||roleCode==='4'" index="myVisitor">我的访客信息</el-menu-item><!--全部员工-->
        <el-menu-item v-if="roleCode==='1' ||roleCode==='4'" index="visitHistoryRecord">拜访历史记录</el-menu-item><!--全部员工-->
        <el-menu-item v-if="roleCode==='2' || roleCode==='4'" index="tempVisitInput">临时拜访录入</el-menu-item><!--门岗-->
        <el-menu-item v-if="roleCode==='2' || roleCode==='4'" index="bookVisitSearch">预约访客查询</el-menu-item><!--门岗-->
        <el-menu-item v-if="roleCode==='2' || roleCode==='4'" index="endVisitSearch">结束拜访查询</el-menu-item><!--门岗-->
      </el-submenu>

      <el-submenu index="3" v-if="roleCode==='2' || roleCode==='4'">
        <!--hhtx-icon-test-->
        <template slot="title"><i class="fontFamily hhtx-yuanquguanli-"></i>园区管理</template>
        <el-menu-item v-if="roleCode==='2'||roleCode==='4'" index="externalStaffManage">园区员工管理</el-menu-item> <!--门岗,系统管理员-->
        <el-menu-item v-if="roleCode==='2'||roleCode==='4'" index="parkCarManage">园区车辆管理</el-menu-item> <!--parkCarManage门岗,系统管理员-->


      </el-submenu>

       <el-submenu index="brakeManage" v-if="roleCode==='4'">
        <template slot="title"><i class="fontFamily hhtx-wodexinxi-"></i>基础管理</template>
         <el-menu-item v-if="roleCode==='4'" index="outsideOrg">园区组织机构</el-menu-item><!--系统管理员-->
         <el-menu-item v-if="roleCode==='4'" index="parkService">园区维护管理</el-menu-item><!--系统管理员-->
         <el-menu-item v-if="roleCode==='4'" index="empowerment">园区组织授权</el-menu-item><!--系统管理员-->
         <el-menu-item v-if="roleCode==='4'" index="externalStaffAccount">员工账号管理</el-menu-item> <!--系统管理员-->
         <el-menu-item v-if="roleCode==='4' " index="parkBrake">园区闸机</el-menu-item><!--系统管理员-->
      </el-submenu>


      <el-submenu index="systemManage" v-if="roleCode==='3' || roleCode==='4'">
        <template slot="title"><i class="fontFamily hhtx-xitongpeizhi"></i>系统管理</template>
        <el-menu-item v-if="roleCode==='3' || roleCode==='4'" index="photoInputSearch">照片录入查询</el-menu-item><!--管理-->
        <el-menu-item v-if="roleCode==='4'" index="userManage">用户管理</el-menu-item><!--系统管理员-->
        <el-menu-item v-if="roleCode==='4'" index="roleManage">角色管理</el-menu-item><!--系统管理员-->
        <el-menu-item v-if="roleCode==='4'" index="userRole">用户角色</el-menu-item><!--系统管理员-->
        <el-menu-item v-if="roleCode==='4'" index="manageEmpowerment">管理授权</el-menu-item><!--系统管理员-->
        <el-menu-item v-if="roleCode==='4'" index="parkPorter">园区门卫</el-menu-item><!--系统管理员-->
      </el-submenu>


      <!-- <el-submenu index="5">
        <template slot="title"><i class="el-icon-message"></i>公共页面</template>
        <el-menu-item index="nopage">空页面</el-menu-item>
        <el-menu-item index="template">模板页面</el-menu-item>
      </el-submenu> -->
    </el-menu>
  </el-aside>
</template>
<script>
export default {
  name: 'Sidebar',
  data () {
    return {
      roleCode: '', // '1'：员工， '2':门岗，'3':管理, '4':系统管理员
    }
  },
  computed: {
    defaultActive: function(){
      return this.$route.path.replace('/', '');
    }
  },
  mounted () {
    this.roleCode = sessionStorage.getItem('roleCode')
  },
  methods: {

  }
}
</script>
<style lang="scss" scoped>
.indexMenu{
  font-size:16px !important;
}
  /deep/ .fontFamily{
		    font-size: 16px;
        margin-right: 7px;
	}
 /deep/.el-submenu__title{font-size:16px;}
.el-submenu /deep/ .el-menu-item{padding-left:50px !important;font-size: 14px;color:#9098a5 !important;}
 .el-menu /deep/.el-menu-item.is-active{background: rgba(48,65,86,1) !important;color:rgba(64,158,255,1) !important;}
.fontFamily{
	vertical-align: unset;
}
</style>


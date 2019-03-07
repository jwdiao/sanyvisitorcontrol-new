<template>
  <div class="">
   <!-- <p class="common-breadcrumb">组织授权</p> -->
    <el-form
      :inline="true"
      :v-model="bookVisitArr"
      size="medium"
      class="marginTop20 common-form-inline"
    >
      <el-form-item label="组织名称">
        <el-input v-model="organizatioName" placeholder="请输入组织名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <div class="common-table">
      <el-table header-row-class-name="table-header" stripe style="width: 100%" ref="multipleTable" tooltip-effect="dark"
                @selection-change="handleSelectionChange"
                :data="empowermentTableData">
        <el-table-column type="index" label="序号" width="100"></el-table-column>
        <el-table-column prop="parkCode" label="园区编号" >  </el-table-column>
        <el-table-column prop="parkName" label="园区名称">  </el-table-column>
        <el-table-column prop="parkPosition" label="园区地址">  </el-table-column>
        <el-table-column prop="accredit" label="点击授权" width="200">
          <template slot-scope="scope">
            <el-button size="large" type="text"
                       @click="handleAccredit(scope.$index, scope.row)">点击授权</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="园区信息"
                 :visible.sync="addFormVisible"
                 :close-on-click-modal="false"
                 class="edit-form"
                 :before-close="handleClose">
        <el-form  label-width="80px" ref="editForm"><!--:v-model="editForm"-->
          <div class="inputText" style="display: flex">
            <el-form-item label="园区编号" prop="parkCode">
              <el-input v-model="editForm.parkCode" :disabled="true" auto-complete="off" placeholder="请输入园区编号" clearable></el-input>
            </el-form-item>
            <el-form-item label="园区名称" prop="parkName">
              <el-input v-model="editForm.parkName" :disabled="true" auto-complete="off" placeholder="请输入园区名称" clearable></el-input>
            </el-form-item>
          </div>

          <el-form-item label="选择组织">
						<!--accordion v-else 	:default-expanded-keys="[1]"
							:default-checked-keys="[1]"-->
           <!-- <span v-if="dataArr.length===0">正在请求数据中，请等待……</span>
						
						-->
            <el-tree 
              :data="dataArr"
							show-checkbox
              :props="defaultProps" 
							:default-expanded-keys="expandedArr"
							ref="tree"
							node-key="flag"
              @check-change="handleCheckChange"><!--@node-click="handleNodeClick"-->
            </el-tree>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="handleCancel('editForm')">取消</el-button>
          <el-button type="primary" @click.native="handleGivePowerFn('editForm')">提交</el-button>
        </div>
      </el-dialog>
    </div>
    <!--分页-->
    <!--<div class="marginTop10 text-right">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400">
      </el-pagination>
    </div>-->
  </div>
</template>

<script>
  import http from '../../../api/http'
  import {reqGivePower,reqParkServiceList,reqAddDepartment} from '../../../api'
  export default {
    name: "Template",
    data() {
      return {
        visitDate:'',
        organizatioName:'',
        editForm:[],
        bookVisitArr:'',
        orgArrs:[],//传入选中的组织org号
				expandedArr:[],
        newOrgCodeArr:[],
        addFormVisible:false,
        multipleTable:[],
        empowermentTableData: [],
        currentPage: 1,
        dataArr:[],//tree结构
        defaultProps:{
          children:'nodes',
          label:'orgText'
        },
      }
    },
    mounted(){
      ///初始化查询列表
      this.onSubmit()
      // var orgId = '50020020'
      //this.getEmpowerTree()
			
    },
    methods: {
     // 点击查询，返回的值
     async onSubmit() {
        const {organizatioName} = this
         const res = await reqParkServiceList(organizatioName)
         if(res.data.code === 200){
          this.empowermentTableData = res.data.data
         }
      },
      //初始渲染请求树
     async getEmpowerTree(){
       const res = await reqAddDepartment(this.editForm.parkCode)
       if(res.data.code === 200){
         this.dataArr = JSON.parse(res.data.data)
				 console.log(this.dataArr)
					const arr = [];
					for(var i = 10000;i<20000;i++){
						  arr.push(i)
					}
					this.$refs.tree.setCheckedKeys(arr);
					this.expandedArr = arr; 						 
       }
      },
			//点击授权
      handleAccredit(index, row) {
        // console.log(index, row);
        this.addFormVisible = true
        this.editForm = Object.assign({},row)
				this.getEmpowerTree()
				
      },
      handleClose(){
        this.addFormVisible = false
      },
      handleCancel(editForm){
        this.addFormVisible = false
      },
      /*方法名：handleGivePowerFn
      * 参数：
      *描述：
      * */
      handleGivePowerFn(){
       this.orgArrs = this.$refs.tree.getCheckedNodes()
       if(this.orgArrs.length === 0){
         this.$message({
           type:'error',
           message:"请选择组织"
         })
         return
       }
      let orgNewArr = []
        this.orgArrs.forEach((item,index)=>{
          var orgList
          orgList = item.orgId
          orgNewArr.push(orgList)
        })
        // console.log('orgNewArr:',orgNewArr.toString())
        this.givePowerFn(orgNewArr.toString())
        this.addFormVisible = false;
      },
      async givePowerFn(orgArrs){

        const res = await reqGivePower( this.editForm.parkCode,orgArrs)
        if(res.data.code === 200){
          this.$message({
            type:'success',
            message:res.data.data
          })
        }else{
          this.$message({
            type:'error',
            message:res.data.data
          })
        }
      },
      /**
       * 方法名：handleCheckChange
       * 参数：
       * 描述：树状结构选中触发逻辑
       */
      handleCheckChange(data,checked,indeterminate){
           // this.orgArrs = JSON.stringify(this.$refs.tree.getCheckedNodes())
         /* this.newOrgCodeArr = this.$refs.tree.getCheckedNodes()
        var orgCodeObj = {}
        for (var i = 0; i < this.newOrgCodeArr.length; i++) {
          orgCodeObj.orgId = this.newOrgCodeArr[i].orgId
          this.orgArrs.push(orgCodeObj)
        }*/
      },
      handleSelectionChange(val){
        this.multipleSelection = val;
      },
      handleSizeChange(){},
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
    }
  }
</script>

<style lang="scss" scoped>
 .el-form-item {
   /deep/.el-form-item__content{
     width: 250px;
   }
 }
 /deep/.el-dialog__footer{
   border-top: 1px solid #DCDFE6;/*#DCDFE6*/
 }
 /deep/ .el-dialog__header{
   border-bottom: 1px solid #DCDFE6;
 }
</style>


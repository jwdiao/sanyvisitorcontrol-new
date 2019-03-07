<template>
  <div class="">
    <!-- <p class="common-breadcrumb">园区门卫</p> -->
    <el-form
      :inline="true"
      :v-model="bookVisitArr"
      size="medium"
      class="marginTop20 common-form-inline"
    >
      <el-form-item label="门卫姓名">
        <el-input v-model="addParkService" clearable @clear="clearPorterName" placeholder="请输入门卫姓名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" style="width: 100px;">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="newAddPorterSubmit">新增门卫</el-button>
      </el-form-item>
      <el-form-item>
        <el-button class="deleteBtn" type="danger" @click="deleteParkSubmit" style="width: 100px;background: #ff404a;color: #fff;border: 1px solid #ff404a">删除</el-button>
      </el-form-item>
    </el-form>
    <div class="common-table">
      <el-table :data="porterTableData" fit align="left" stripe header-row-class-name="table-header" style="width: 100%;" height="650"
                ref="multipleTable" tooltip-effect="dark"
                @selection-change="handleSelectionChange">
        <el-table-column type="selection" label="选择" width="80"></el-table-column>
        <el-table-column type="index" label="序号" width="100"></el-table-column>
        <el-table-column align="center" prop="userCode" label="门卫员工编号">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.userCode }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="userName" label="门卫员工姓名">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.userName }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="parkName" label="归属园区">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.parkName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="编辑门卫" width="200" fixed="right">
          <template slot-scope="scope">
            <el-button size="small" @click="handleEditPorter(scope.$index, scope.row)" type="text">编辑门卫</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--编辑门卫-->
    <div class="parkPorterDialog">
      <el-dialog title="园区信息"
                 :visible.sync="editPorterDialogVisible"
                 :close-on-click-modal="false"
                 class="edit-form"
                 :before-close="editPorterDialogClose">
        <el-form :v-model="editForm" label-width="80px" ref="editForm"><!--:rules="editFormRules"-->
          <div class="parkPorter" style="display: flex;">
            <el-form-item label="门卫员工编号" prop="userCode" style="width: 48%">
              <el-input v-model="editForm.userCode + editForm.userName" :disabled="true" auto-complete="off" clearable></el-input>
            </el-form-item>
            <el-form-item label="园区名称" prop="parkName" style="width: 48%">
              <el-select v-model="value" clearable @clear="clearParkPorterName" placeholder="请选择" @change="selectParkName" style="width: 100%" >
                <el-option
                  v-for="item in parkNameOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="parkServiceDialog" style="display: flex;width: 100%;">
            <el-form-item label="备注说明" prop="portRemark" class="park-address-item" style="width: 96%;">
              <el-input type="textarea" v-model="editPortRemark" :row="2" placeholder="请输入内容" auto-complete="off" clearable></el-input><!--editForm.loginPwd-->
            </el-form-item>
          </div>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="editPorterDialogCancel('editForm')">取消</el-button>
          <el-button type="primary" @click.native="editPorterDialogAddFn(editForm)">提交</el-button>
        </div>
      </el-dialog>
    </div>
    <!--新增门卫-->
    <div class="editParkDialog">
      <el-dialog title="园区信息"
                 :visible.sync="NewParkDialogVisible"
                 :close-on-click-modal="false"
                 class="edit-form"
                 :before-close="NewParkDialogClose">
        <el-form label-width="80px" :model="prakPorter" ref="editForm" :rules="rules">
          <div class="parkServiceDialog" style="display: flex">
            <el-form-item label="选择员工" prop="selectPorter" style="width: 48%">
              <el-input placeholder="必须按提示选择"
                @keyup.native="querySearch"
                v-model="prakPorter.selectPorter"><!--@blur.native.capture="hideBlur"-->
              </el-input><!-- @keyup.native="querySearch"-->
              <div class="tempVisitInput_employerName" v-show="employerNameSelectShow">
                <el-scrollbar style="height:100%">
                  <ul>
                    <li v-for="(item,index) in restaurants" :key="index" @click="handleSelect(item)" style="cursor: pointer">
                      {{item.userName + item.userNo}}
                    </li>
                  </ul>
                </el-scrollbar>
              </div>
            </el-form-item>
            <el-form-item label="园区名称" prop="parkName" style="width: 48%">
              <el-select v-model="prakPorter.parkName" clearable placeholder="请选择" @change="selectParkName" style="width: 100%">
                <el-option
                  v-for="item in parkNameOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="parkServiceDialog" style="display: flex;width: 100%;">
            <el-form-item label="备注说明" prop="parkAddress" class="park-address-item" style="width: 96%;">
              <el-input type="textarea" v-model="portRemark" :row="2" placeholder="请输入内容" auto-complete="off" clearable></el-input><!--editForm.loginPwd-->
            </el-form-item>
          </div>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="NewParkDialogCancel('editForm')">取消</el-button>
          <el-button type="primary" @click.native="NewParkDialogAddFn('editForm')">提交</el-button>
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
  import {reqPorterList,reqNewAddPorterList,reqParkServiceList,reqCheckPorterName,reqdeletePorter,reqEditPorter} from '../../../api'
  import http from '../../../api/http'
  export default {
    name: "Template",
    data() {
      return {
        prakPorter:{
          selectPorter:'',
          parkName:'',
        },
        rules: {
          selectPorter: [
            { required: true, message: '必须按提示选择', trigger: 'blur' },
          ],
          parkName: [
            { required: true, message: '请选择园区名称', trigger: 'blur' }
          ]
        },
        bookVisitArr:'',
        visitDate:'',
        editForm:[],
        multipleTable:[],
        NewParkDialogVisible:false,
        editPorterDialogVisible:false,
        // parkName:'',  // 下拉选项中选择的内容
        selectParkCode:'', //下拉园区编号
        // selectPorter: '',   //新增选择员工input
        portRemark:'', //备注
        editPortRemark:'', //编辑备注
        parkNameOptions:[],
        multipleSelection:[],//多选框所选择的内容
        value:'',
        addParkService:"", //输入门卫姓名
        porterTableData: [],
        restaurants:[], //模糊查询所存储的数据
        employerNameSelectShow:false, //输入下拉菜单显示与隐藏
        userCode:'',
        userName:'',
        org:'',
        currentPage: 1
      }
    },
    mounted(){
      //this.restaurants = this.querySearch();
      const {addParkService} = this
      this.getPorterList(addParkService)
      var username = ''
      this.getSelectItem(username)
    },
    methods: {
      /**
       * 方法名：onSubmit
       * 参数：无
       * 描述：点击提交
       */
      onSubmit() {
        const {addParkService} = this
        this.getPorterList(addParkService)
      },
      /**
       * 方法名：getPorterList
       * 参数：无
       * 描述：与后台请求数据
       */
      async getPorterList(username){
        const res = await reqPorterList(username)
        if(res.data.code === 200){
          this.porterTableData = res.data.data
        }
      },
      /**
       * 方法名：getPorterList
       * 参数：无
       * 描述：获取园区下拉框内容请求
       */
      async getSelectItem(username){
        const res = await reqParkServiceList(username)
        if(res.data.code === 200){
          var newResultArr = res.data.data
          // console.log('newResultArr:',newResultArr)
          for (var i = 0; i < newResultArr.length; i++) {
            var porterObj = {}
            porterObj.value = newResultArr[i].parkCode
            porterObj.label = newResultArr[i].parkName
            this.parkNameOptions.push(porterObj)
          }
          // console.log('parkNameOptions:',this.parkNameOptions)
        }
      },
      /**
       * 方法名：newAddPorterSubmit
       * 参数：无
       * 描述：点击新增按钮弹出对话框
       */
      newAddPorterSubmit(){
        this.NewParkDialogVisible = true
        this.prakPorter.selectPorter = ""
        this.portRemark = ""
      },

      NewParkDialogClose(){
        this.NewParkDialogVisible = false
        this.employerNameSelectShow = false
      },
      NewParkDialogCancel(){this.NewParkDialogVisible = false},
      /**
       * 方法名：NewParkDialogAddFn
       * 参数：无
       * 描述：点击请求添加数据
       */
       NewParkDialogAddFn(){

        /*if(!selectParkCode || !portRemark || !parkName){
          this.$message({
            type:'error',
            message:"文本框不能为空"
          })
          return
        }*/
        this.$refs.editForm.validate(async (valid) => {
          if (!valid) return;

          const {parkName} = this.prakPorter
          const {portRemark,remarkItem,selectParkCode} = this
          const {userCode,userName,org} = this
          this.addParkPorter(userName,selectParkCode,userCode,org,portRemark)
        });
      },
      async addParkPorter(userName,selectParkCode,userCode,org,portRemark){
        const res = await reqNewAddPorterList(userName,selectParkCode,userCode,org,portRemark)
        if(res.data.code === 200){
          var parkNames = ''
          this.getPorterList(parkNames)
          this.$message({
            type:'success',
            message:res.data.data
          })
          this.NewParkDialogVisible = false
          //清空文本框
          this.userName = ''
          this.portRemark = ''
          this.prakPorter.parkName = ''
        }else{
          this.$message({
            type:'error',
            message:res.data.data
          })
        }
      },



      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      handleEdit(index, row) {
        console.log(index, row);
      },

      /**
       * 方法名：getNamesByLikeData
       * 参数：无
       * 描述：模糊查询方法
       */
      async getNamesByLikeData () {
        const {selectPorter} = this.prakPorter
        const res = await reqCheckPorterName(selectPorter)
        // const res = await http.post('http://10.88.195.171:8100/user/SanyBasicShrUser/selectUsersByUserNo',{loginAccount:selectPorter})
        if (res && res.data.code === 200) {
          var newArrList = res.data.data
          this.restaurants = selectPorter ? newArrList.filter(this.createFilter(selectPorter)) : newArrList;
          this.employerNameSelectShow = true
        }
      },
      /**
       * 方法名：querySearch
       * 参数：queryString：input输入参数
       * 描述：调用模糊查询方法
       */
      querySearch(queryString) {
        this.getNamesByLikeData()
      },
      //  模糊查询过滤
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.userNo.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleSelect(item) {
        this.prakPorter.selectPorter = item.userName + item.userNo
        this.userCode = item.userNo
        this.userName = item.userName
        this.org = item.org
        this.employerNameSelectShow = false;
      },

      handleInputSelect(item) {
        console.log('选择员工：',item.value);
      },
      /**
       * 方法名：clearPorterName
       * 参数：
       * 描述：门卫姓名清除X掉逻辑
       */
      clearPorterName(){
       this.addParkService = ""
        this.getPorterList(this.addParkService)
      },
      selectParkName(val){
        let obj = {};
        obj = this.parkNameOptions.find((item)=>{
          return item.value === val;
        });
        this.prakPorter.parkName = obj.label
        this.selectParkCode = val

        console.log('园区名称：',this.prakPorter.parkName)
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
        console.log(this.multipleSelection)
      },
      handleEditPorter(index,row){
        this.editPorterDialogVisible = true
        this.editForm = Object.assign({},row)

      },
      editPorterDialogClose(){
        this.editPorterDialogVisible = false
      },
      editPorterDialogCancel(){
        this.editPorterDialogVisible = false
      },
      editPorterDialogAddFn(editForm){
        const {selectParkCode,editPortRemark} = this
        if(!selectParkCode){
          this.$message({
            type:'error',
            message:"请选择园区名称"
          })
          return
        }
        //发请求
        //console.log('editForm:',editForm)
        var parkEmployerId = editForm.id
        // var parkCode = editForm.parkCode
        var userCode = editForm.userCode
        var userName = editForm.userName
        var remark = editForm.remark
        var org = editForm.org

        console.log('remark:',this.editPortRemark)
       this.porterEditFn(parkEmployerId,this.selectParkCode,userCode,userName,this.editPortRemark,org)
        this.editPorterDialogVisible = false
      },
      //编辑---清除园区名称
      clearParkPorterName(){
        this.selectParkCode = ''
      },
      //门卫编辑
       async porterEditFn(parkEmployerId,parkCode,userCode,userName,remark,org){
         const res = await reqEditPorter(parkEmployerId,parkCode,userCode,userName,remark,org)
         //更新界面
         const {addParkService} = this
         this.getPorterList(addParkService)
         this.$message({
           type:'success',
           message:'修改成功'
         })
       },
      /**
       * 方法名：deleteParkSubmit
       * 参数：
       * 描述：删除园区
       */
      deleteParkSubmit(){
        if(this.multipleSelection.length === 0){
          this.$message({
            type:'error',
            message:'请选择要删除的对象'
          })
          return
        }
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const {porterTableData,multipleSelection} = this
          for (var i = 0; i < multipleSelection.length; i++) {
            var parkEmployerId = multipleSelection[i].id
            //向后台发送删除请求
            this.deleteDataFn(parkEmployerId)
          }
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          setTimeout(()=>{
            const {addParkService} = this
            this.getPorterList(addParkService)
          },300)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

      },
      //删除功能方法
      async deleteDataFn(parkEmployerId){
        const res = await reqdeletePorter(parkEmployerId)
      },
      //光标移出
      hideBlur(){
        console.log('11111111111111111111111111111111111111111')
        this.employerNameSelectShow = false
      },

      /*分页器*/
      handleSizeChange(){},
      handleCurrentChange(){},
    }
  }
</script>

<style lang="scss" scoped>
  /deep/.parkPorter .el-form-item .el-form-item__content{
    margin-left: 100px;
  }
  /deep/.parkPorter .el-form-item .el-form-item__label{
    width: 100px;
  }
  /deep/ .el-scrollbar__wrap{
    overflow-x: hidden;
  }
  .tempVisitInput_employerName{
    height:180px;position:absolute;top:40px;z-index:20;border:1px solid #c0c4cc;width:185px;color:#606266;padding:0 10px;
    background-color:#fff;
    li{
      height: 25px;
      margin-bottom: 3px;
    }
  }
  /deep/.el-dialog__footer{
    border-top: 1px solid #DCDFE6;/*#DCDFE6*/
  }
  /deep/ .el-dialog__header{
    border-bottom: 1px solid #DCDFE6;
  }
</style>
<style>
  .parkPorter .el-form-item .el-form-item__content{
    margin-left: 100px!important;
  }
  .parkPorter .el-form-item .el-form-item__label{
    width: 100px!important;
  }
</style>


<template>
  <div class="">
    <!--表头-->
    <el-form
      :inline="true"
      :v-model="bookVisitArr"
      size="medium"
      class="marginTop20 common-form-inline"
    >
      <el-form-item label="姓名">
        <el-input v-model="parkCarManageName" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="工号">
        <el-input v-model="parkCarManageNum" placeholder="请输入工号"></el-input>
      </el-form-item>
      <el-form-item label="车牌号">
        <el-input v-model="parkCarManageCarNum" placeholder="请输入车牌号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="parkCarManageOnSubmit" style="width: 100px;">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="newAddCarsSubmit">新增车辆</el-button>
      </el-form-item>
      <el-form-item>
        <el-upload id="carsForm" style="display:inline-block;background:none" :limit="1"
                   class="upload-demo" ref="carsupload" accept=".xls,.xlsx"  action="/userPushRecord/find/all"
                   :on-change="beforeUpload" :on-exceed="handleExceed"
                   :on-remove="removeDoc"
                   :http-request="uploadSectionFile" :auto-upload="false">
          <el-button id="upload-document" slot="trigger" type="primary" v-show="isShow">车辆导入</el-button>
          <el-button style="width: 100px;" type="primary" @click="submitCarsUpload" v-show="!isShow">确定</el-button>
        </el-upload>

      </el-form-item>
      <el-form-item>
        <el-button class="deleteBtn" type="danger" @click="deleteCarsSubmit" style="width: 100px;background: #ff404a;color: #fff;border: 1px solid #ff404a">删除</el-button>
      </el-form-item>
    </el-form>
    <!--主列表-->
    <div class="common-table">
      <el-table :data="carTableData" fit align="left" stripe header-row-class-name="table-header" style="width: 100%;" height="650"
                ref="multipleTable" tooltip-effect="dark"
                @selection-change="handleSelectionChange">
        <el-table-column type="selection" label="选择" width="80"></el-table-column>
        <el-table-column type="index" label="序号" width="100"></el-table-column>
        <el-table-column prop="workno" label="员工工号">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.userNo }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="workname" label="员工姓名">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.userName }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="carNum" label="车牌号">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.carNo }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="carType" label="车辆类型">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.carType === '2' ? '小车' : '大车' }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="200" fixed="right">
          <template slot-scope="scope">
            <el-button size="small" @click="handleEditCars(scope.$index, scope.row)" type="text">编辑车辆</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--编辑车辆-->
    <div class="editParkDialog">
      <el-dialog title="园区车辆管理"
                 :visible.sync="editParkDialogVisible"
                 :close-on-click-modal="false"
                 class="edit-form"
                 :before-close="editParkDialogClose">
        <el-form :v-model="editForm" label-width="80px" ref="editForm"><!--:rules="editFormRules"-->
          <div class="parkServiceDialog" style="display: flex">
            <el-form-item label="员工工号" prop="userNo" style="width:48%;">
              <el-input v-model="editForm.userNo" disabled auto-complete="off" clearable></el-input>
            </el-form-item>
            <el-form-item label="员工姓名" prop="userName" style="width:48%;">
              <el-input v-model="editForm.userName" disabled auto-complete="off" clearable></el-input>
            </el-form-item>
          </div>
          <div class="parkServiceDialog" style="display: flex;">
            <el-form-item label="车辆号" prop="carNo" class="park-address-item" style="width:48%;">
              <el-input v-model="editForm.carNo" auto-complete="off" clearable></el-input><!--editForm.loginPwd-->
            </el-form-item>
            <el-form-item label="车辆类型" prop="carType" class="park-address-item" style="width:48%;">
              <el-select v-model="editValue" clearable placeholder="请选择" @change="editCarsSelect" style="width: 100%;">
                <el-option
                  v-for="item in editCarsOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="parkServiceDialog" style="display: flex;width: 100%;">
            <el-form-item label="备注" class="park-address-item" style="width:96%;" prop="remark">
              <el-input v-model="editForm.remark" auto-complete="off" clearable></el-input><!--editForm.loginPwd-->
            </el-form-item>
          </div>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="editParkDialogCancel('editForm')">取消</el-button>
          <el-button type="primary" @click.native="editParkDialogAddFn(editForm)">提交</el-button>
        </div>
      </el-dialog>
    </div>
    <!--新增车辆-->
    <div class="editParkDialog">
      <el-dialog title="园区车辆管理"
                 :visible.sync="NewParkDialogVisible"
                 :close-on-click-modal="false"
                 class="edit-form"
                 :before-close="NewParkDialogClose">
        <el-form  ref='addParkID' :model="addCarsContent" label-width="80px" :rules="rules" ><!--:rules="editFormRules"-->
          <div class="parkServiceDialog" style="display: flex">
            <el-form-item label="员工工号" prop="addWorkno" style="width: 48%;">
              <el-input v-model="addCarsContent.addWorkno" auto-complete="off" clearable placeholder="请输入员工工号"></el-input>
            </el-form-item>
            <el-form-item label="员工姓名" prop="addworkname" style="width: 48%;">
              <el-input v-model="addCarsContent.addworkname" auto-complete="off" clearable placeholder="请输入员工姓名"></el-input>
            </el-form-item>
          </div>
          <div class="parkServiceDialog" style="display: flex;">
            <el-form-item label="车牌号" prop="AddcarNum" class="park-address-item" style="width: 48%;">
              <el-input v-model="addCarsContent.AddcarNum" auto-complete="off" clearable placeholder="请输入车牌号"></el-input><!--editForm.loginPwd-->
            </el-form-item>
            <el-form-item label="车牌类型" prop="addCarType" class="park-address-item" style="width: 48%;">
              <el-select v-model="value" clearable placeholder="请选择" @change="selectParkName" style="width: 100%;">
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
            <el-form-item label="备注说明" prop="remarkItem" class="park-address-item" style="width: 96%;">
              <el-input type="textarea" v-model="remarkItem" :row="2" placeholder="请输入内容" auto-complete="off" clearable></el-input><!--editForm.loginPwd-->
            </el-form-item>
          </div>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="NewParkDialogCancel('editForm')">取消</el-button>
          <el-button type="primary" @click.native="NewParkDialogAddFn()">提交</el-button>
        </div>
      </el-dialog>
    </div>
    <!--分页-->
    <div class="marginTop10 text-right">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[20, 30, 500, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import http from '../../../api/http'
  import {reqSearchCarsList,reqAddCars,reqEditCars,reqDeleteCars,reqUploadCarsFile} from '../../../api'
  export default {
    name: "Template",
    data() {
      return {
        parkCarManageName:'',//查询姓名
        parkCarManageNum:'',//查询工号
        parkCarManageCarNum:'',//查询车牌号
        isShow:true,//数据导入按钮显示与隐藏
        addCarsContent:{
          AddcarNum:'',// 新增车牌号
          addworkname:'', // 新增员工姓名
          addWorkno:'',//新增员工工号
          addCarType:'',//新增车辆类型
        },
        rules: {
          addWorkno: [
            { required: true, message: '请输入员工工号', trigger: 'blur' },
          ],
          addworkname: [
            { required: true, message: '请输入员工姓名', trigger: 'blur' }
          ],
          AddcarNum: [
            { required: true, message: '请输入车牌号', trigger: 'blur' }
          ]
        },
        bookVisitArr:'',
        visitDate:'',
        editForm:{
          id: 0,
          name: '',
          price: 0,
          desc: '',
          reserve:'',
        },
        editParkDialogVisible:false,
        NewParkDialogVisible:false,
        multipleSelection: [],  //多选框所选择的内容
        parkServiceName:'', //输入园区名称
        workname:'',
        remarkItem:'',//备注

        parkNameOptions:[{//新增车辆
          value:'1',
          label:'大车'
        },{
          value:'2',
          label:'小车'
        }],value:'',
        addCarType:'',//新增当前车辆类型
        addCarValue:'',//新增当前车辆类型value
        editCarsOptions:[{ //编辑车辆
          value:'1',
          label:'大车'
        },{
          value:'2',
          label:'小车'
        }],editValue:'',
        editCarType:'',//选择当前车辆类型
        editCarValue:'',//选择当前车辆类型value
        carTableData: [], //查询主列表信息
        currentPage: 1,
        pageSize:20,
        total:0,
      }
    },

    mounted(){
      //初始化页面查询
      const {parkCarManageName,parkCarManageCarNum,parkCarManageNum,currentPage,pageSize} = this
      this.getCarManageList(parkCarManageCarNum,parkCarManageName,parkCarManageNum,currentPage,pageSize)
    },

    methods: {
      /**
       * 方法名：getCarManageList
       * 参数：workname
       * 描述：后台请求数据
       */
      async getCarManageList (carNo,userName,userNo,pageNum,pageSize){
        const res = await reqSearchCarsList(carNo,userName,userNo,pageNum,pageSize)
        if(res.data.code === 200){
          this.carTableData = res.data.data.list
          this.total = res.data.data.total
        }
      },
      /**
       * 方法名：parkCarManageOnSubmit
       * 参数：无
       * 描述：查询操作按钮
       */
      parkCarManageOnSubmit(){
        const {parkCarManageName,parkCarManageCarNum,parkCarManageNum,currentPage,pageSize} = this
        this.getCarManageList(parkCarManageCarNum,parkCarManageName,parkCarManageNum,currentPage,pageSize)
      },
      /**
       * 方法名：deleteCarsSubmit
       * 参数：
       * 描述：删除车辆
       */
      deleteCarsSubmit(){
        if(this.multipleSelection.length === 0){
          this.$message({
            type:'error',
            message:'请选择要删除的对象'
          })
          return
        }
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const {multipleSelection} = this
          var parkIdArr = []
          for (var i = 0; i < multipleSelection.length; i++) {
            //向后台发送删除请求
            var parkId = multipleSelection[i].id
            parkIdArr.push(parkId)
            this.deleteDataFn(parkId)
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      //删除功能方法
      async deleteDataFn(id){
        const res = await reqDeleteCars(id)
        if(res&&res.data&&res.data.code===200){
          this.$message({
            type: 'success',
            message: res.data.data
          });
          //刷新页面
          const {parkCarManageName,parkCarManageCarNum,parkCarManageNum,currentPage,pageSize} = this
          this.getCarManageList(parkCarManageCarNum,parkCarManageName,parkCarManageNum,currentPage,pageSize)
        }else{
          this.$message({
            type: 'error',
            message: res.data.data
          });
        }
      },
      /**
       * 方法名：newAddCarsSubmit
       * 参数：
       * 描述：新增车辆
       */
      newAddCarsSubmit() {
        this.NewParkDialogVisible = true
      },
      NewParkDialogClose(){this.NewParkDialogVisible = false},
      NewParkDialogCancel(){this.NewParkDialogVisible = false},
      /**
       * 方法名：NewParkDialogAddFn
       * 参数：
       * 描述：新增车辆提交操作，向后台发送请求，添加到数据库中
       */
      NewParkDialogAddFn(){
        this.$refs.addParkID.validate(async (valid) => {
          if (!valid) return;
          const {addworkname,addWorkno,AddcarNum} = this.addCarsContent
          const {remarkItem,addCarValue} = this

          this.addCarsFun(addWorkno,addworkname,addCarValue,AddcarNum,remarkItem)
        });
      },
      //新增异步
      async addCarsFun(userNo,username,carType,carNo,remark){
        const res = await reqAddCars(userNo,username,carType,carNo,remark)
        if(res&&res.data&&res.data.code === 200){
          this.$message({
            type:'success',
            message:res.data.data
          })
          //刷新列表
          const {parkCarManageName,parkCarManageCarNum,parkCarManageNum,currentPage,pageSize} = this
          this.getCarManageList(parkCarManageCarNum,parkCarManageName,parkCarManageNum,currentPage,pageSize)
          //添加后清空
          this.addCarsContent.addworkname = ''
          this.addCarsContent.addWorkno = ''
          this.addCarsContent.AddcarNum = ''
          this.remarkItem = ''
          this.addCarType = ''
          this.NewParkDialogVisible = false

        }else{
          this.$message({
            type:'error',
            message:res.data.data
          })
        }
      },

      //点击编辑车辆按钮事件
      handleEditCars(index, row){
        this.editParkDialogVisible = true
        this.editForm = Object.assign({}, row);
      },
      editParkDialogClose(){this.editParkDialogVisible = false},
      editParkDialogCancel(){this.editParkDialogVisible = false},
      editParkDialogAddFn(val){
        console.log('val:',val)
        var carId = val.id
        var carNo = val.carNo
        var carType = this.editCarValue
        var remark = val.remark
        this.editParkDialogVisible = false
        //向后台发送编辑请求
        this.editDataFn(carId,carNo,carType,remark)
      },
      //编辑数据方法
      async editDataFn(id,carNo,carType,remark){
        const res = await reqEditCars(id,carNo,carType,remark)
        if(res && res.data && res.data.code===200){
          this.$message({
            type:'success',
            message:res.data.data
          })
          //更新界面
          const {parkCarManageName,parkCarManageCarNum,parkCarManageNum,currentPage,pageSize} = this
          this.getCarManageList(parkCarManageCarNum,parkCarManageName,parkCarManageNum,currentPage,pageSize)
        }else{
          this.$message({
            type:'error',
            message:res.data.data
          })
        }
      },

      handleSelectionChange(val) {
        this.multipleSelection = val;
        console.log('multipleSelection:',this.multipleSelection)
      },
      //新增车辆类型选择
      selectParkName(val){
        let obj = {};
        obj = this.parkNameOptions.find((item)=>{
          return item.value === val;
        });
        this.addCarType = obj.label
        this.addCarValue = obj.value
         console.log('新增车辆类型：',this.addCarValue)
      },
      //编辑车辆类型选择
      editCarsSelect(val){
        let obj = {};
        obj = this.editCarsOptions.find((item)=>{
          return item.value === val;
        });
        this.editCarType = obj.label
        this.editCarValue = obj.value
        console.log('编辑车辆类型：',this.editCarType)
      },
      /*函数名：submitCarsUpload
       参数：
       描述：确定数据导入
     * */
      submitCarsUpload() {
        let list = document.getElementsByClassName('el-upload-list__item is-ready')
        if(list.length == 0){
          this.$message({
            type:'warning',
            message:"请选择需要导入的模板！"
          })
          return;
        }
        this.$refs.carsupload.submit();
      },
      uploadSectionFile(param){
        var fileObj = param.file;
        var form = new FormData(this.$refs.carsupload);
        form.append("file", fileObj);
        //与后台交互
        this.uploadDataFun(form)
      },
      async uploadDataFun(formData){
        const res = await reqUploadCarsFile(formData)
        if(res.data.code === 200){
          this.$message({
            type:'success',
            message:res.data.data
          })
          //刷新页面
          const {parkCarManageName,parkCarManageCarNum,parkCarManageNum,currentPage,pageSize} = this
          this.getCarManageList(parkCarManageCarNum,parkCarManageName,parkCarManageNum,currentPage,pageSize)
          //数据上传成功后清除按钮下的文件
          this.$refs.carsupload.clearFiles();
          this.isShow = true
        }
      },
      /*函数名：beforeUpload
     参数：
     描述：文件状态改变时的钩子，添加文件时都会被调用
   * */
      beforeUpload(file, fileList){
        this.isShow = false
      },
      /*函数名：removeDoc
      参数：
      描述：文件列表移除文件时的钩子
    * */
      removeDoc(file, fileList){
        this.isShow = true
      },
      /*函数名：handleExceed
      参数：
      描述：文件超出个数限制时的钩子
    * */
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      //分页操作
      handleSizeChange(val){
        const {parkCarManageName,parkCarManageCarNum,parkCarManageNum,currentPage} = this
        this.pageSize = val
        this.getCarManageList(parkCarManageCarNum,parkCarManageName,parkCarManageNum,currentPage,this.pageSize)
      },
      handleCurrentChange(val) {
        const {parkCarManageName,parkCarManageCarNum,parkCarManageNum,pageSize} = this
        this.currentPage = val
        this.getCarManageList(parkCarManageCarNum,parkCarManageName,parkCarManageNum,this.currentPage,pageSize)
      },
    }
  }
</script>

<style lang="scss" scoped>
  /deep/ .parkServiceDialog .el-form-item .el-form-item__content{
    margin-left: 100px;
  }
  /deep/ .parkServiceDialog .el-form-item .el-form-item__label{
    width: 100px;
  }

  .deleteBtn:hover{
    background: rgba(255,64,74,0.8)!important;
  }
  .deleteBtn:active{
    background: rgba(255,64,74,1)!important;
  }

  /deep/.el-dialog__footer{
    border-top: 1px solid #DCDFE6;/*#DCDFE6*/
  }
  /deep/ .el-dialog__header{
    border-bottom: 1px solid #DCDFE6;
  }
  /deep/.el-upload-list{
    position: absolute;
    top:25px;
    left: 0px;
  }

</style>
<style>
  .parkServiceDialog .el-form-item .el-form-item__content{
    margin-left: 100px!important;
  }
  .parkServiceDialog .el-form-item .el-form-item__label{
    width: 100px!important;
  }

</style>




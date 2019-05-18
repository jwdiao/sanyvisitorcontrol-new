<template>
  <div class="">
    <!-- <p class="common-breadcrumb">园区维护</p> -->
    <el-form
      :inline="true"
      :v-model="bookVisitArr"
      size="medium"
      class="marginTop20 common-form-inline"
    >
      <el-form-item label="园区名称">
        <el-input v-model="parkServiceName" placeholder="园区名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="btnIsBlue" type="primary" @click="onSubmit" style="width: 100px;">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button class="btnIsBlue" type="primary" @click="newAddParkSubmit">新增园区</el-button>
      </el-form-item>
      <el-form-item>
        <el-button class="deleteBtn" type="danger" @click="deleteParkSubmit" style="width: 100px;background: #ff404a;color: #fff;border: 1px solid #ff404a">删除</el-button>
      </el-form-item>
    </el-form>
    <div class="common-table">
      <div v-if="loadingStatus" class="lazyImg"><span class="lazyText">数据加载中</span></div>
      <div v-if="noDataStatus" class="lazyImg"><span class="lazyText">暂无数据</span></div>
      <el-table v-if="!loadingStatus" v-show="!noDataStatus" :data="parkTableData" fit align="left" stripe header-row-class-name="table-header" style="width: 100%;" height="650"
                ref="multipleTable" tooltip-effect="dark"
                @selection-change="handleSelectionChange">
        <el-table-column type="selection" label="选择" width="80"></el-table-column>
        <el-table-column type="index" label="序号" width="100"></el-table-column>
        <el-table-column prop="parkCode" label="园区编号">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.parkCode }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="parkName" label="园区名称">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.parkName }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="parkPosition" label="园区地址">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.parkPosition }}</span>
          </template>
        </el-table-column>

        <el-table-column label="编辑园区" width="200" fixed="right">
          <template slot-scope="scope">
            <el-button size="small" @click="handleEditPark(scope.$index, scope.row)" type="text">编辑园区</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
      <!--编辑-->
    <div class="editParkDialog">
      <el-dialog title="园区信息" v-dialogDrag
                 :visible.sync="editParkDialogVisible"
                 :close-on-click-modal="false"
                 class="edit-form"
                 :before-close="editParkDialogClose">
        <el-form :v-model="editForm" label-width="80px" ref="editForm" :model="editForm" :rules="editFormRules"><!--:rules="editFormRules"-->
          <div class="parkServiceDialog" style="display: flex">
            <el-form-item label="园区编号" prop="parkCode" style="width:48%;">
              <el-input v-model="editForm.parkCode" :disabled="true" auto-complete="off" clearable></el-input>
            </el-form-item>
            <el-form-item label="园区名称" prop="parkName" style="width:48%;">
              <el-input v-model="editForm.parkName" auto-complete="off" clearable></el-input>
            </el-form-item>
          </div>
          <div class="parkServiceDialog" style="display: flex;width: 100%;">
            <el-form-item label="园区地址" prop="parkPosition" class="park-address-item" style="width:96%;">
              <el-input v-model="editForm.parkPosition" auto-complete="off" clearable></el-input><!--editForm.loginPwd-->
            </el-form-item>
          </div>
          <div class="parkServiceDialog" style="display: flex;width: 100%;">
            <el-form-item label="备注说明" class="park-address-item" style="width:96%;">
              <el-input type="textarea" v-model="editForm.remark" auto-complete="off" clearable></el-input><!--editForm.loginPwd-->
            </el-form-item>
          </div>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="editParkDialogCancel('editForm')">取消</el-button>
          <el-button class="btnIsBlue" type="primary" @click.native="editParkDialogAddFn(editForm)">提交</el-button>
        </div>
      </el-dialog>
    </div>
     <!--新增园区-->
    <div class="editParkDialog">
      <el-dialog title="园区信息" v-dialogDrag
                 :visible.sync="NewParkDialogVisible"
                 :close-on-click-modal="false"
                 class="edit-form"
                 :before-close="NewParkDialogClose">
        <el-form  ref='addParkID' :model="addParkTextContent" label-width="80px" :rules="rules" ><!--:rules="editFormRules"-->
          <div class="parkServiceDialog" style="display: flex">
            <el-form-item label="园区编号" prop="addParkCode" style="width: 48%;">
              <el-input v-model="addParkTextContent.addParkCode" @change="parkCodeCheck" auto-complete="off" clearable placeholder="请输入园区编号"></el-input>
            </el-form-item>
            <el-form-item label="园区名称" prop="addParkName" style="width: 48%;">
              <!--<el-select v-model="value" clearable placeholder="请选择" @change="selectParkName">
                <el-option
                  v-for="item in parkNameOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>-->
              <el-input v-model="addParkTextContent.addParkName" auto-complete="off" clearable placeholder="请输入园区名称"></el-input>
            </el-form-item>
          </div>
          <div class="parkServiceDialog" style="display: flex;width: 100%;">
            <el-form-item label="园区地址" prop="AddPparkAddress" class="park-address-item" style="width: 96%;">
              <el-input v-model="addParkTextContent.AddPparkAddress" auto-complete="off" clearable placeholder="请输入园区地址"></el-input><!--editForm.loginPwd-->
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
          <el-button class="btnIsBlue" type="primary" @click.native="NewParkDialogAddFn('editForm')">提交</el-button>
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
        :page-sizes="[20,30,50,100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import http from '../../../api/http'
  import {reqParkServiceLists,reqNewAddPark,reqEditPark,reqdeletePark,addParkCodeCheck} from '../../../api'
  export default {
    name: "Template",
    data() {
      return {
        loadingStatus:true,//初始化显示数据加载中
        noDataStatus:false,//显示暂无数据,初始化不显示
        addParkTextContent:{
          AddPparkAddress:'',// 新增公园地址
          addParkName:'', // 新增公园名称
          addParkCode:'',//新增公园编号
        },
        rules: {
          addParkCode: [
            { required: true, message: '请输入园区编号', trigger: 'blur' },
          ],
          addParkName: [
            { required: true, message: '请输入园区名称', trigger: 'blur' }
          ],
          AddPparkAddress: [
            { required: true, message: '请输入园区地址', trigger: 'blur' }
          ]
        },
        editFormRules: {
          parkName: [
            { required: true, message: '请输入园区名称', trigger: 'blur' }
          ],
          parkPosition: [
            { required: true, message: '请输入园区地址', trigger: 'blur' }
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
        parkName:'',
        remarkItem:'',//备注

        parkNameOptions:[{
          value:'001',
          label:'回龙观产业园'
        },{
          value:'002',
          label:'南口观产业园'
        },{
          value:'003',
          label:'昆山观产业园'
        },{
          value:'004',
          label:'沈阳观产业园'
        }],value:'',
        parkTableData: [],
        currentPage: 1,
        pageSize: 20,
        total: 0,
      }
    },

    mounted(){
      //初始化页面查询
      const {parkServiceName,currentPage,pageSize} = this
      this.getParkList(parkServiceName,currentPage,pageSize)
    },

    methods: {
      /**
       * 方法名：getParkList
       * 参数：parkName
       * 描述：后台请求数据
       */
      async getParkList (parkName,pageNum,pageSize){
        const res = await reqParkServiceLists(parkName,pageNum,pageSize)
        if(!res || !res.data.code === 200) return
          this.parkTableData = res.data.data.list
          this.total = res.data.data.total
          //数据懒加载显示
          this.loadingStatus = false
          if(this.parkTableData.length === 0){
            this.noDataStatus = true
            return
          }else{
            this.noDataStatus = false
          }
      },
      /**
       * 方法名：onSubmit
       * 参数：无
       * 描述：查询操作按钮
       */
      onSubmit(){
        const {parkServiceName,currentPage,pageSize} = this
        this.getParkList(parkServiceName,currentPage,pageSize)
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
          const {parkTableData,multipleSelection} = this
          for (var i = 0; i < multipleSelection.length; i++) {
            //向后台发送删除请求
            var parkId = multipleSelection[i].id
            var parkCode = multipleSelection[i].parkCode
            this.deleteDataFn(parkId,parkCode)
          }

          setTimeout(()=>{
            //删除后渲染页面
            const {parkServiceName,currentPage,pageSize} = this
            this.getParkList(parkServiceName,currentPage,pageSize)
          },300)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

      },
      //删除功能方法
      async deleteDataFn(parkId,parkCode){
        const res = await reqdeletePark(parkId,parkCode)
        if(res&&res.data&&res.data.code===200){
          this.$message({
            type: 'success',
            message: res.data.data
          });
        }else{
          this.$message({
            type: 'error',
            message: res.data.data
          });
        }
      },
      /**
       * 方法名：newAddParkSubmit
       * 参数：
       * 描述：新增园区
       */
      newAddParkSubmit() {
        this.NewParkDialogVisible = true
        //添加后清空
        this.addParkTextContent.addParkName = ''
        this.addParkTextContent.addParkCode = ''
        this.addParkTextContent.AddPparkAddress = ''
        this.remarkItem = ''
      },
      NewParkDialogClose(){this.NewParkDialogVisible = false},
      NewParkDialogCancel(){this.NewParkDialogVisible = false},
      /**
       * 方法名：NewParkDialogAddFn
       * 参数：
       * 描述：新增园区提交操作，向后台发送请求，添加到数据库中
       */
       NewParkDialogAddFn(){
        this.$refs.addParkID.validate(async (valid) => {
          if (!valid) return;
          const {addParkName,addParkCode,AddPparkAddress} = this.addParkTextContent
          const {remarkItem} = this
          this.addParkFun(addParkName,addParkCode,AddPparkAddress,remarkItem)
        });
      },
      //新增异步
      async addParkFun(addParkName,addParkCode,AddPparkAddress,remarkItem){
        const res = await reqNewAddPark(addParkName,addParkCode,AddPparkAddress,remarkItem)
        if(res.data.code === 200){
          var newAddItemObj = {}
          newAddItemObj.parkCode = addParkCode
          newAddItemObj.parkName = addParkName
          newAddItemObj.parkPosition = AddPparkAddress
          // console.log('newAddItemObj:',newAddItemObj)
          this.parkTableData.unshift(newAddItemObj)
          // console.log('parkTableData:',this.parkTableData)
          var parkName = ''
          const {currentPage,pageSize} = this
          this.getParkList(parkName,currentPage,pageSize)
          this.$message({
            type:'success',
            message:res.data.data
          })
          //添加后清空
          this.addParkTextContent.addParkName = ''
          this.addParkTextContent.addParkCode = ''
          this.addParkTextContent.AddPparkAddress = ''
          this.remarkItem = ''
          this.NewParkDialogVisible = false

        }else{
          this.$message({
            type:'error',
            message:res.data.data
          })
        }
      },
      async parkCodeCheck(){
         const{addParkCode} = this.addParkTextContent
        const res = await addParkCodeCheck(addParkCode)
        if(res&& res.data&&res.data.code===200){
           this.$message({
             type:'error',
             message:res.data.data
           })
          this.addParkTextContent.addParkCode= ''
        }
         console.log('园区名称改变:',addParkCode)
      },
      handleEditPark(index, row){
        this.editParkDialogVisible = true
        this.editForm = Object.assign({}, row);
      },
      editParkDialogClose(){this.editParkDialogVisible = false},
      editParkDialogCancel(){this.editParkDialogVisible = false},
      //点击编辑提交按钮
      editParkDialogAddFn(val){
        this.$refs.editForm.validate(async (valid) => {
          if (!valid) return;

          var parkId = val.id
          var parkName = val.parkName
          var parkPosition = val.parkPosition
          var remark = val.remark
          this.editParkDialogVisible = false
          //向后台发送编辑请求
          this.editDataFn(parkId,parkName,parkPosition,remark)
        });
      },
      //编辑数据方法
      async editDataFn(parkId,parkName,parkPosition,remark){
        const res = await reqEditPark(parkId,parkName,parkPosition,remark)
        if(res && res.data && res.data.code===200){
          this.$message({
            type:'success',
            message:res.data.data
          })
        }
        //更新界面
        const {parkServiceName,currentPage,pageSize} = this
        this.getParkList(parkServiceName,currentPage,pageSize)
      },

      handleSelectionChange(val) {
        this.multipleSelection = val;
         console.log('multipleSelection:',this.multipleSelection)
      },
      selectParkName(val){
        let obj = {};
        obj = this.parkNameOptions.find((item)=>{
          return item.value === val;
        });
        this.parkName = obj.label
        // console.log('园区名称：',this.parkName)
      },
      handleSizeChange(val){
        const {parkServiceName,currentPage} = this
        this.pageSize = val
        this.getParkList(parkServiceName,currentPage,this.pageSize)
      },
      handleCurrentChange(val) {
        const {parkServiceName,pageSize} = this
        this.currentPage = val
        this.getParkList(parkServiceName,this.currentPage,pageSize)
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
  .parkServiceDialog{
    /deep/.el-input{


    }
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
</style>
<style>
  .parkServiceDialog .el-form-item .el-form-item__content{
    margin-left: 100px!important;
  }
  .parkServiceDialog .el-form-item .el-form-item__label{
    width: 100px!important;
  }

</style>

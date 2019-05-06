<template>
   <div class="">
    <!-- <p class="common-breadcrumb">园区闸机</p> -->
      <el-form
      :inline="true"
      :model="formInline"
      size="medium"
      class="marginTop20 common-form-inline"
      >
        <el-form-item label="园区选择">
          <el-select v-model="value3" placeholder="选择园区" clearable @clear="clearableSelectFun" @change="selectParkerList">
            <el-option
              v-for="item in ParkerListOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button class="btnIsBlue" type="primary" @click="onSubmit" style="width: 100px;">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button class="btnIsBlue" type="primary" @click="addDataFun" style="width: 100px;">新增</el-button>
        </el-form-item>
        <el-form-item>
          <el-button class="deleteBtn" type="danger" @click="deleteBrakeSubmit" style="width: 100px;background: #ff404a;color: #fff;border: 1px solid #ff404a">删除</el-button>
        </el-form-item>
      </el-form>
      <div class="common-table">
        <div v-if="tableDataBrake.length===0" class="lazyImg"><span class="lazyText">暂无数据</span></div>
        <el-table v-else
          :data="tableDataBrake" stripe
          header-row-class-name="table-header" @selection-change="handleSelectionChange"
          style="width: 100%" height="650">
          <el-table-column type="selection" label="选择" width="80"></el-table-column>
          <el-table-column type="index" label="序号" width="80">   </el-table-column>
          <el-table-column prop="typeName" label="闸机类型">   </el-table-column>
          <el-table-column prop="gateCode" label="闸机编号"> </el-table-column>
          <el-table-column prop="gateName" label="闸机名称"> </el-table-column>
          <el-table-column prop="parkName" label="归属园区"> </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="small" @click="handleEditPark(scope.$index, scope.row)" type="text">编辑闸机</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
     <!--编辑弹窗-->
     <div class="editParkDialog">
       <el-dialog title="闸机信息"
                  :visible.sync="editBrakeDialogVisible"
                  :close-on-click-modal="false"
                  class="edit-form" width="800px"
                  :before-close="editBrakeDialogClose">
         <el-form :v-model="editBrakeForm" label-width="80px" :model="editBrakeArr" ref="editFormItem" :rules="editRules"><!--:rules="editFormRules"-->
           <div class="parkServiceDialog" style="display: flex">
             <el-form-item label="闸机名称" prop="selectBrakeName" style="flex: 1">
               <el-input v-model="editBrakeArr.selectBrakeName" auto-complete="off" clearable></el-input>
             </el-form-item>
             <el-form-item label="闸机类型" prop="selectBrakeTypeName" style="flex: 1">
               <el-select v-model="selectBrakeTypeName" disabled clearable placeholder="请选择闸机类型" @change="selectBrakeType">
                 <el-option
                   v-for="item in editBrakeTypeOption"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value">
                 </el-option>
               </el-select>
             </el-form-item>
             <el-form-item label="归属园区" class="editGuiShuParkerName" style="flex: 1">
               <el-select v-model="editGuiShuParkerName" disabled placeholder="请输入归属园区" clearable @change="editSelectGuiShuParker">
                 <el-option
                   v-for="item in editGuiShuParkerOptions"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value">
                 </el-option>
               </el-select>
             </el-form-item>
           </div>

         </el-form>
         <div slot="footer" class="dialog-footer">
           <el-button @click.native="editBrakeDialogCancel('editForm')">取消</el-button>
           <el-button class="btnIsBlue" type="primary" @click.native="editBrakeDialogAddFn(editBrakeForm)">提交</el-button>
         </div>
       </el-dialog>
     </div>
     <!--新增弹窗-->
     <el-dialog title="园区闸机"
                :visible.sync="addFormVisible"
                :close-on-click-modal="false"
                class="edit-form" width="800px"
                :before-close="handleClose">
       <el-form  label-width="80px" ref="addBrakeItem" :model="addBrakeArr" :rules="addRules" >
         <div class="inputText" style="display: flex">
           <el-form-item label="闸机编号" v-show="false" style="flex: 1">
             <el-input  auto-complete="off" placeholder="请输入闸机编号" clearable></el-input>
           </el-form-item>
           <el-form-item label="闸机名称" prop="brakeName" style="flex: 1">
             <el-input v-model="addBrakeArr.brakeName"  auto-complete="off" placeholder="请输入闸机名称" clearable></el-input>
           </el-form-item>
           <el-form-item label="闸机类型" prop="brakeType" style="flex: 1">
             <el-select v-model="addBrakeArr.brakeType" clearable placeholder="请选择闸机类型" @change="selectBrakeType">
               <el-option
                 v-for="item in brakeTypeOptions"
                 :key="item.value"
                 :label="item.label"
                 :value="item.value">
               </el-option>
             </el-select>
           </el-form-item>
           <el-form-item label="归属园区" prop="brakeGuishuPark">
             <el-select v-model="addBrakeArr.brakeGuishuPark" placeholder="请输入归属园区" clearable @change="selectGuiShuParker">
               <el-option
                 v-for="item in GuiShuParkerOptions"
                 :key="item.value"
                 :label="item.label"
                 :value="item.value">
               </el-option>
             </el-select>
           </el-form-item>
         </div>
       </el-form>
       <div slot="footer" class="dialog-footer">
         <el-button @click.native="handleCancel('editForm')">取消</el-button>
         <el-button class="btnIsBlue" type="primary" @click.native="handleAddDataFn('editForm')">提交</el-button>
       </div>
     </el-dialog>
      <div class="marginTop10 text-right">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[20, 30, 50, 100]"
          :page-size='pageSize'
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
   </div>
</template>

<script>
  import {
    reqParkServiceList,
    reqBrakeTypeItem,
    reqSearchBrakeList,
    reqAddParkBrake,
    deleteParkBrake,
    editParkBrake,
  } from '../../api'
  export default {
    name: "ParkBrake",
    data() {
      return {
        formInline: {
          user: '',
          region: ''
        },
        editBrakeArr:[
          {
            selectBrakeName:''
          }
        ],
        addBrakeArr:[
          {
            brakeName:'',
            brakeType:'',
            brakeGuishuPark:'',
          }
        ],
        editRules: {
          selectBrakeName: [
            {required: true, message: '请输入闸机名称', trigger: 'blur'},
          ]
        },
        addRules: {
          brakeName: [
            {required: true, message: '请输入闸机名称', trigger: 'blur'},
          ],
          brakeType: [
            {required: true, message: '请输入闸机类型', trigger: 'blur'}
          ],
          brakeGuishuPark: [
            {required: true, message: '请输入归属园区', trigger: 'blur'}
          ]
        },
        tableDataBrake: [], //主列表展示
        addFormVisible:false,
        brakeTypeOptions:[],//闸机类型下拉选项
        editBrakeTypeOption:[],//编辑闸机类型下拉选项
        GuiShuParkerOptions:[],//归属园区下拉选项
        editGuiShuParkerOptions:[],//编辑归属园区下拉选项
        ParkerListOptions:[],//归属园区下拉选项
        value1:'',
        value2:'',
        value3:'',
        brakeTypeCode:'',//当前选择的闸机编号
        GuiShuParkerCode:'',//当前选择的归属园区编号
        ParkerItemName:'',//查询归属园区
        brakeName:'', //闸机名称
        currentPage: 1,
        pageSize:20,
        total:0,
        multipleSelection: [],  //多选框所选择的内容
        editBrakeDialogVisible:false,//编辑弹窗
        editBrakeForm:{},//编辑
        selectBrakeTypeName:'',//编辑闸机类型名称
        selectBrakeTypeCode:'',//编辑闸机类型编号
        editGuiShuParkerName:'',//编辑当前选择的归属园区
        editGuiShuParkerCode:'',//编辑当前选择的归属园区编号
        gataID:'',//编辑提交时带的id
      }
    },
    mounted(){
      var username = ''
      this.getSelectItem(username)
      this.getBrakeType()
      //初始化查询
      const {ParkerItemName,currentPage,pageSize} = this
      this.searchBrakeFun(ParkerItemName,currentPage,pageSize)
    },
    methods: {
      /*函数：onSubmit
        参数：
        描述：查询
      * */
      onSubmit() {
        const {ParkerItemName,currentPage,pageSize} = this
        this.searchBrakeFun(ParkerItemName,currentPage,pageSize)
      },
      //异步请求查询数据
      async searchBrakeFun(ParkerItemName,currentPage,pageSize){
        const res = await reqSearchBrakeList(ParkerItemName,currentPage,pageSize)
        if(res.data.code === 200){
          this.tableDataBrake = res.data.data.list
          this.total = res.data.data.total
        }
      },
      handleSizeChange(val) {
        this.pageSize = val
        const {ParkerItemName,currentPage} = this
        this.searchBrakeFun(ParkerItemName,currentPage,this.pageSize)
      },
      handleCurrentChange(val) {
        this.currentPage = val
        const {ParkerItemName,pageSize} = this
        this.searchBrakeFun(ParkerItemName,this.currentPage,pageSize)
      },
      addDataFun(){
        this.addFormVisible = true
        console.log('点击新增逻辑……')
      },
      handleClose(){
        this.addFormVisible = false
      },
      handleCancel(){
        this.addFormVisible = false
      },
      /*函数：handleAddDataFn
       参数：
       描述：新增向后台发送请求
     * */
      async handleAddDataFn(){
        this.$refs.addBrakeItem.validate(async (valid) => {
          if (!valid) return;

          const {brakeTypeCode,GuiShuParkerCode} = this
          const {brakeName,brakeType,brakeGuishuPark} = this.addBrakeArr
          if(brakeName && brakeGuishuPark && brakeType){
            const res = await reqAddParkBrake(brakeName,GuiShuParkerCode,brakeGuishuPark,brakeTypeCode,brakeType)
            if(res.data.code === 200){
              // console.log('res:',res.data)
              this.$message({
                type:'success',
                message:'添加成功'
              })
              const {ParkerItemName,pageSize} = this
              this.currentPage = 1
              this.searchBrakeFun(ParkerItemName,this.currentPage,pageSize)
              this.addBrakeArr.brakeName = ""
              this.addBrakeArr.brakeType = ""
              this.addBrakeArr.brakeGuishuPark = ""
              this.addFormVisible = false
            }
          }else{
            this.$message({
              type:'error',
              message:'请选择输入闸机名称，闸机类型和归属园区'
            })
          }


        });
      },

      /*函数：selectBrakeType
        参数：
        描述：闸机类型下拉选项
      * */
      selectBrakeType(val){
        let obj = {};
        obj = this.brakeTypeOptions.find((item)=>{
          return item.value === val;
        });
        this.addBrakeArr.brakeType = obj.label
        this.brakeTypeCode = obj.value
      },
      /*函数：selectGuiShuParker
        参数：
        描述：查询园区下拉选项
      * */
      selectParkerList(val){
        let obj = {};
        obj = this.ParkerListOptions.find((item)=>{
          return item.value === val;
        });
        this.ParkerItemName = obj.label
        // console.log('查询归属园区：',this.ParkerItemName)
      },
      /*函数：selectGuiShuParker
        参数：
        描述：归属园区下拉选项
      * */
      selectGuiShuParker(val){
        let obj = {};
        obj = this.GuiShuParkerOptions.find((item)=>{
          return item.value === val;
        });
        this.addBrakeArr.brakeGuishuPark = obj.label
        this.GuiShuParkerCode = obj.value
      },
      //异步请求获取下拉园区列表
      async getSelectItem(username){
        const res = await reqParkServiceList(username)
        if(res.data.code === 200){
          var newResultArr = res.data.data
          console.log('newResultArr:',newResultArr)
          for (var i = 0; i < newResultArr.length; i++) {
            var porterObj = {}
            porterObj.value = newResultArr[i].parkCode
            porterObj.label = newResultArr[i].parkName
            this.GuiShuParkerOptions.push(porterObj)
            this.editGuiShuParkerOptions.push(porterObj)
            this.ParkerListOptions.push(porterObj)
          }
        }
        console.log(this.ParkerListOptions)
      },
      /*函数：getBrakeType
       参数：
       描述：闸机类型下拉选项
     * */
      async getBrakeType(){
        const res = await reqBrakeTypeItem()
        if(res.data.code === 200){
          var newResultArr = res.data.data
          // console.log('newResultArr:',newResultArr)
          for (var i = 0; i < newResultArr.length; i++) {
            var porterObj = {}
            porterObj.value = newResultArr[i].codeCode
            porterObj.label = newResultArr[i].codeName
            this.brakeTypeOptions.push(porterObj)
            this.editBrakeTypeOption.push(porterObj)
          }
        }
      },
      //查询选择框清除逻辑
      clearableSelectFun(){
        this.ParkerItemName = ''
        const {currentPage,pageSize} = this
        this.searchBrakeFun(this.ParkerItemName,currentPage,pageSize)
      },
      //删除逻辑---------start-------------------->
      deleteBrakeSubmit(){
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
          const {multipleSelection} = this
          for (var i = 0; i < multipleSelection.length; i++) {
            //向后台发送删除请求
            var idArrItem= multipleSelection[i].id
            this.deleteDataFn(idArrItem)
          }
          setTimeout(()=>{
            //删除后渲染页面
            const {ParkerItemName,currentPage,pageSize} = this
            this.searchBrakeFun(ParkerItemName,currentPage,pageSize)
          },300)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
          //删除向后台请求
      async deleteDataFn(id){
        const res = await deleteParkBrake(id)
        if(res && res.data && res.data.code === 200){
          this.$message({
            type: 'success',
            message: res.data.data
          });
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
        console.log('multipleSelection:',this.multipleSelection)
      },
      //s删除--end---------------------------------->
      //编辑--start-------------------------------->
        //点击编辑
      handleEditPark(index,row){
        this.editBrakeDialogVisible = true
        this.editBrakeForm = Object.assign({}, row);
        this.editBrakeArr.selectBrakeName = row.gateName
        this.selectBrakeTypeName = row.typeName
        this.editGuiShuParkerName = row.parkName
        this.gataID = row.id
      },
      editBrakeDialogClose(){this.editBrakeDialogVisible = false},
      editBrakeDialogCancel(){this.editBrakeDialogVisible = false},
        //编辑提交
      editBrakeDialogAddFn(val){

        if(this.editBrakeArr.selectBrakeName === ''){
          return
        }
          this.editBrakeDialogVisible = false
          //向后台发送编辑请求
          const {gataID} = this
          const {selectBrakeName} = this.editBrakeArr

          this.editBrakeGate(gataID,this.editBrakeArr.selectBrakeName)

      },
        //编辑提交与后台的交互
        async editBrakeGate(id,gateName){
        const res = await editParkBrake(id,gateName)
          if(res&&res.data&&res.data.code===200){
          this.$message({
            type:'success',
            message:res.data.data
          })
          }
          //刷新页面
          const {ParkerItemName,currentPage,pageSize} = this
          this.searchBrakeFun(ParkerItemName,currentPage,pageSize)
        },
       //编辑闸机类型
      editSelectBrakeType(val){
        let obj = {};
        obj = this.editBrakeTypeOption.find((item)=>{
          return item.value === val;
        });
        this.selectBrakeTypeName = obj.label
        this.selectBrakeTypeCode = obj.value
      },
       //编辑归属园区
      editSelectGuiShuParker(val){
        let obj = {};
        obj = this.editGuiShuParkerOptions.find((item)=>{
          return item.value === val;
        });
        this.editGuiShuParkerName = obj.label
        this.editGuiShuParkerCode = obj.value
      },
      //编辑--end-------------------------------->
    }
  }
</script>

<style lang="scss" scoped>
  /deep/.el-dialog__footer{
    border-top: 1px solid #DCDFE6;/*#DCDFE6*/
  }
  /deep/ .el-dialog__header{
    border-bottom: 1px solid #DCDFE6;
  }
</style>

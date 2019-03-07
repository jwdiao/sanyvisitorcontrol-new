<template>
  <div class="">
   <!-- <p class="common-breadcrumb">预约访客查询</p> -->
    <el-form
      :inline="true"
      :model="bookVisitArr"
      size="medium"
      class="marginTop20 common-form-inline"
    >
      <el-form-item label="被访人姓名">
        <el-input v-model="bookVisitArr.user" clearable placeholder="被访人姓名"></el-input>
      </el-form-item>
      <el-form-item label="被访人工号">
        <el-input v-model="bookVisitArr.num" clearable placeholder="被访人工号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="subPhotoBtn">下发照片</el-button>
      </el-form-item>
    </el-form>
    <div class="common-table">
      <el-table header-row-class-name="table-header" stripe  border  style="width: 100%"
                ref="multipleTable" tooltip-effect="dark"
                @selection-change="handleSelectionChange"
        :data="visitTableListData">
        <el-table-column type="selection" label="选择" width="50"></el-table-column>
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="planBeginTime" label="拜访开始时间" width="160">  </el-table-column>
        <el-table-column prop="planEndTime" label="拜访结束时间"  width="160">  </el-table-column>
        <el-table-column prop="vistorNum" label="来访人员数" width="95">  </el-table-column>
        <el-table-column prop="isCar" label="是否驾车" width="80"> </el-table-column>
        <el-table-column prop="carNum" label="驾车数量" width="80"> </el-table-column>
        <el-table-column prop="visitorStatus" label="访问状态"> </el-table-column>
        <el-table-column prop="submitStatus" label="审核状态"> </el-table-column>
        <!--<el-table-column prop="auditingType" label="审核类型"> </el-table-column>-->
        <!--<el-table-column prop="recordType" label="录入类型"> </el-table-column>-->
        <el-table-column prop="employerCode" label="操作人工号"> </el-table-column>  <!---->
        <el-table-column prop="employerName" label="操作人姓名"> </el-table-column>  <!---->
        <el-table-column prop="downStatus" label="下发状态"> </el-table-column>  <!--s-->

       <!-- <el-table-column prop="checkSubmit" label="审核确认" width="140">
          <template slot-scope="scope">
            <el-button size="mini" type="text" v-show='scope.row.recordType==="访客机录入"'
                       @click="handleRealVisit(scope.$index, scope.row)">确认访问 </el-button>
            <el-button size="mini" type="text" v-show='scope.row.recordType==="访客机录入"'
                       @click="handleInvalidVisit(scope.$index, scope.row)">无效访问</el-button>
            <el-button size="mini" type="text" :disabled="true" v-show='scope.row.recordType!=="访客机录入"'
                       @click="handleInvalidVisit(scope.$index, scope.row)">无需审核</el-button>
          </template>
        </el-table-column>-->
        <el-table-column prop="che" label="信息维护">
          <template slot-scope="scope">
            <el-button size="mini" type="text"
                       @click="checkBookVisitInformation(scope.$index, scope.row)">信息维护</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="bookVisitSearch">
      <el-dialog title="预约访客信息"
                 :visible.sync="bookVisitorInfomation"
                 :close-on-click-modal="false"
                 class="edit-form"
                 :before-close="handleClose">
        <el-form :v-model="editForm" label-width="80px" ref="editForm"><!--:v-model="editForm"-->
          <div class="bookVisitSearchDialog" style="display: flex;">
            <el-form-item label="计划开始时间" prop="planBeginTime">
              <el-input :disabled="true"  v-model="editForm.planBeginTime" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="计划结束时间" prop="planEndTime">
              <el-input :disabled="true" v-model="editForm.planEndTime" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="来访人员数量" prop="vistorNum">
              <el-input :disabled="true" v-model="editForm.vistorNum" auto-complete="off"></el-input>
            </el-form-item>
          </div>
          <div class="bookVisitSearchDialog"  style="display: flex;">
            <el-form-item  label="是否驾车" prop="isCar">
              <el-input :disabled="true" v-model="editForm.isCar" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="驾车数量" prop="carNum">
              <el-input :disabled="true"  v-model="editForm.carNum" auto-complete="off"></el-input>
            </el-form-item>
          </div>
          <div class="bookVisitSearchDialog"  style="display: flex;">
            <el-form-item label="拜访原因" prop="reason" style="width: 275px;">
              <el-input class="visitReasonTextarea"
                        type="textarea" :rows="2" placeholder="请输入拜访原因"
                        v-model="editForm.reason">
              </el-input>
            </el-form-item>
          </div>
          <div class="common-table">
            <el-table header-row-class-name="table-header"  border  style="width: 100%" height="180"
                      :data="bookVisitorTableData">
              <el-table-column type="index" label="序号" width="50"></el-table-column>
              <el-table-column prop="visitorName" label="拜访人姓名" width="100">  </el-table-column>
              <el-table-column prop="phone" label="电话号码"  width="120">  </el-table-column>
              <el-table-column prop="visitorId" label="身份证号" >  </el-table-column>
              <el-table-column prop="carNo" label="车牌号码">  </el-table-column>
              <el-table-column prop="down" label="下发状态">  </el-table-column>

              <el-table-column label="上传" >
                <template slot-scope="scope">
                  <el-upload
                    class="upload-demo"
                    action="string"
                    accept="image/jpeg,image/png,image/jpg"
                    list-type="picture"
                    :show-file-list="false"
                    :before-upload="onBeforeUploadImage"
                    :http-request="UploadImage"
                  >
                    <el-button size="mini" type="primary"
                               v-show="scope.row.isSub==='未下发'"
                               @click="handleRepeatUploadPhoto(scope.$index, scope.row)">重新上传 </el-button>&nbsp;
                    <el-tooltip  v-show="scope.row.isSub==='未下发'" content="人脸图片命名一定和工卡号保持一致；人脸清晰；大小不超过2M" placement="top">
                      <img src="./images/imageSize.png" style="vertical-align: middle" alt="">
                    </el-tooltip>
                  </el-upload>
                </template>
              </el-table-column>

              <!--<el-table-column prop="beginTime" label="进入时间"  >  </el-table-column>
              <el-table-column prop="endTime" label="离开时间" >  </el-table-column>-->
              <el-table-column prop="pictureName" label="图片名称" width="100">
                <template slot-scope="scope">
                  <el-button size="mini" type="text" v-show="scope.row.imgUrl"
                             @click="checkPicture(scope.$index, scope.row)">查看图片
                  </el-button>
                  <el-button size="mini" type="text" :disabled="true" v-show="!scope.row.imgUrl"
                             @click="checkPicture(scope.$index, scope.row)">查看图片
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div><br/>
          <!--<div class="common-table">
            <el-table header-row-class-name="table-header"  border  style="width: 100%" height="150"
                      :data="bookVisitorCarTableData">
              <el-table-column type="index" label="序号" width="100"></el-table-column>
              <el-table-column prop="carNo" label="车牌号码">  </el-table-column>
              <el-table-column prop="beginTime" label="进入时间"  >  </el-table-column>
              <el-table-column prop="endTime" label="离开时间" >  </el-table-column>
            </el-table>
          </div>-->
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="handleCancel('editForm')">返回</el-button>
        </div>
      </el-dialog>
    </div>
    <div class="checkPictureInformation">
      <el-dialog title="图片信息"
                 :visible.sync="checkPictureInformationBookVisible"
                 :close-on-click-modal="false"
                 class="edit-form"
                 :before-close="handleClosePictures">
                 <div class="inputText" style="display: flex;justify-content: center;align-items: center;overflow: hidden;">
                    <img :src="checkImgUrl" alt="" style="max-width:100%;">
                </div>
      </el-dialog>
    </div>

    <div class="marginTop10 text-right">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[20, 30, 50, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalNumber">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import {reqRightForm,reqCheckDetailList} from '../../../api'
  import {confirmVisitRequest,invalidVisitRequest,fileUploadRequest} from '../../../api/businessManageApi'
  export default {
    name: "Template",
    data() {
      return {
        totalNumber:0, //分页总数
        currentPage:1,  //当前页
        pageSize:20,  // 每页显示多少条
        source:'2',//有效访问（预约为2，我的访客为1）
        checkImgUrl:'',//查看图片地址
        bookVisitArr: {
          user: '',
          num: ''
        },
        multipleTable:[],
        visitReason:'',
        editForm:[],
        bookVisitorInfomation:false,
        checkPictureInformationBookVisible:false,
        visitTableListData: [],
        bookVisitorTableData:[],
        bookVisitorCarTableData:[],
        currentUploadIndex:'',//重新上传
      }
    },
    mounted(){
      const {currentPage,pageSize} = this
      this.getBookVisitorInforFun(currentPage,pageSize,{visitedName:'',visitedNo:''})
    },
    methods: {
      /*函数名：getBookVisitorInforFun
       参数：pageNum,pageSize,query(输入框输入有内容)
       描述：主列表显示的数据请求，包括查询
     * */
     async getBookVisitorInforFun(pageNum,pageSize,query){
        const res = await reqRightForm(pageNum,pageSize,query)
        if(res.data.code === 200){
          const resultData = res.data.data
          this.totalNumber = resultData.total
          this.visitTableListData = resultData.list
          for (var i = 0; i < this.visitTableListData.length; i++) {
            this.visitTableListData[i].isCar === '0'? this.visitTableListData[i].isCar= '否':this.visitTableListData[i].isCar= '是'
            if(this.visitTableListData[i].auditingType === '01'){
              this.visitTableListData[i].auditingType= '个人审核通过'
            }else if(this.visitTableListData[i].auditingType === '02'){
              this.visitTableListData[i].auditingType= '门岗审核通过'
            }
            if(this.visitTableListData[i].visitorStatus === '01'){
              this.visitTableListData[i].visitorStatus= '待访问'
            }else if(this.visitTableListData[i].visitorStatus === '02'){
              this.visitTableListData[i].visitorStatus= '访问中'
            }else if(this.visitTableListData[i].visitorStatus === '03'){
              this.visitTableListData[i].visitorStatus= '访问结束'
            }else if(this.visitTableListData[i].visitorStatus === '04'){
              this.visitTableListData[i].visitorStatus= '无效访问'
            }
            if(this.visitTableListData[i].recordType === '01'){
              this.visitTableListData[i].recordType= '被访人录入'
            }else if(this.visitTableListData[i].recordType === '02'){
              this.visitTableListData[i].recordType= '访客机录入'
            }else if(this.visitTableListData[i].recordType === '03'){
              this.visitTableListData[i].recordType= '门岗录入'
            }
            if(this.visitTableListData[i].submitStatus === '01'){
              this.visitTableListData[i].submitStatus= '待审核（申请中）'
            }else if(this.visitTableListData[i].submitStatus === '02'){
              this.visitTableListData[i].submitStatus= '审核通过'
            }else if(this.visitTableListData[i].submitStatus === '03'){
              this.visitTableListData[i].submitStatus= '已驳回'
            }
          }
        }
      },
      /*函数名：onSubmit
        参数：
        描述：点击查询逻辑
      * */
      onSubmit() {
        const{user,num} = this.bookVisitArr
        let {currentPage,pageSize} = this
        currentPage = 1
        this.getBookVisitorInforFun(currentPage,pageSize,{visitedName:user,visitedNo:num})
      },

      /*确定访问*/
       handleRealVisit(index, row) {
         console.log('row:',row)
        this.$confirm('审核确认是否继续选择确认访问?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
         this.getVisitRequestFn(row.id,this.source)
        setTimeout(()=>{
          const{user,num} = this.bookVisitArr
          let {currentPage,pageSize} = this
          currentPage = 1
          this.getBookVisitorInforFun(currentPage,pageSize,{visitedName:user,visitedNo:num})
        },500)


        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消选择确认访问'
          });
        });
        // console.log(index, row);
      },
      async getVisitRequestFn(visitorId, source){
        const res = await confirmVisitRequest(visitorId, source)
        if(res.data.code === 200){
          // console.log('res',res.data.data)
          this.$message({
            type: 'success',
            message: res.data.data
          });
        }
      },
      /*无效访问*/
      handleInvalidVisit(index, row) {
        this.$confirm('审核确认是否继续选择无效访问?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.quxiaoPequest(row.id)

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消选择无效访问'
          });
        });
        console.log(index, row);
      },
      async quxiaoPequest(visitorId){
        const res = await invalidVisitRequest(visitorId)
        if(res.data.code === 200){
          this.$message({
            type: 'success',
            message: res.data.data
          });
        }
      },
      /*函数名：checkBookVisitInformation
      参数：index,row(获取对应行)
      描述：点击查看详情，去请求列表,可以在照片未下发的情况下,重新上传照片
    * */
      async checkBookVisitInformation(index,row){
        this.bookVisitorInfomation = true
        this.editForm = Object.assign({},row)
        const rowID = row.id
        const res = await reqCheckDetailList(rowID)
          if(res.data.code === 200){
            this.bookVisitorTableData = res.data.data.sanyBussVisitorDetailsList
            this.bookVisitorCarTableData = res.data.data.sanyBussVisitorCarList
          }
      },
      handleSelectionChange(val){
        this.multipleTable = val
      },
      handleClose(){
        this.bookVisitorInfomation = false
      },
      handleCancel(){
        this.bookVisitorInfomation = false
      },
      checkPicture(index,row){
        this.checkPictureInformationBookVisible = true
        this.checkImgUrl = row.imgUrl
      },
      handleClosePictures(){
        this.checkPictureInformationBookVisible = false
      },
      handleCancelPictures(){
        this.checkPictureInformationBookVisible = false
      },
      handleSizeChange(val){
        const{user,num} = this.bookVisitArr
        let {currentPage,pageSize} = this
        pageSize = val
        this.getBookVisitorInforFun(currentPage,pageSize,{visitedName:user,visitedNo:num})
      },
      handleCurrentChange(val) {
        const{user,num} = this.bookVisitArr
        let {currentPage,pageSize} = this
        currentPage = val
        this.getBookVisitorInforFun(currentPage,pageSize,{visitedName:user,visitedNo:num})
      },
      //下发照片按钮
      subPhotoBtn(){
        if(this.multipleTable.length === 0){
          this.$message({
            type:'error',
            message:'请选择要下发照片对象'
          })
          return
        }
        this.$confirm('确定下发?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const {multipleTable} = this
          for (var i = 0; i < multipleTable.length; i++) {
            //向后台发送请求
            var idArrItem= multipleTable[i].id
            //  this.deleteDataFn(idArrItem)

            //根据返回值出现相应的提示符


          }
          setTimeout(()=>{
            //删除后渲染页面
            //  this.searchBrakeFun(ParkerItemName,currentPage,pageSize)

          },300)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消下发照片'
          });
        });
      },
      //重新上传照片
      handleRepeatUploadPhoto(index,row){
        this.currentUploadIndex = index
        console.log('重新上传照片:',row)
      },
      /*getUpload (index) {
        return `uploadPerson${index}`
      },*/
      onBeforeUploadImage(file) {
        const isIMAGE = file.type === 'image/jpeg' || 'image/jpg' || 'image/png'
        const isLt1M = file.size / 1024 / 1024 < 2
        if (!isIMAGE) {
          this.$message.error('上传文件只能是图片格式!')
        }
        if (!isLt1M) {
          this.$message.error('上传文件大小不能超过 1MB!')
        }
        return isIMAGE && isLt1M
      },
      async UploadImage(param){
        var uploadObj = `uploadPerson${this.currentUploadIndex}`
        var formData = new FormData(document.getElementById(`${uploadObj}`));
        formData.append('file', param.file)
        const res = await fileUploadRequest(formData)
        if(res&&res.status===200){
          this.$message('上传成功')
          let {code,data,msg} = res.data;
          this.formInline.sanyBussVisitorDetailsList[this.currentUploadIndex].imgUrl = data
          this.checkImgUrl = data
        }
      },
    }
  }
</script>

<style lang="scss" scoped>
  /deep/.bookVisitSearchDialog .el-form-item__content{
    margin-left: 100px;
  }
  /deep/.bookVisitSearchDialog .el-form-item__label{
    width: 100px;
  }
  /deep/.el-dialog__footer{
    border-top: 1px solid #DCDFE6;/*#DCDFE6*/
  }
  /deep/ .el-dialog__header{
    border-bottom: 1px solid #DCDFE6;
  }
</style>
<style>
  .bookVisitSearchDialog .el-form-item .el-form-item__content{
    margin-left: 100px!important;
  }
  .bookVisitSearchDialog .el-form-item .el-form-item__label{
    width: 100px!important;
  }
  .visitReasonTextarea .el-textarea__inner{
    width: 430%;
  }
  .endVisitSearch .el-dialog__wrapper .el-dialog{
    margin-top: 11vh!important;
  }



</style>

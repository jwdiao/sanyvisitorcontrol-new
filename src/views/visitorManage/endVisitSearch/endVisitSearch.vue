<template>
  <div class="">
   <!-- <p class="common-breadcrumb">结束访客查询</p> -->
    <el-form
      :inline="true"
      :model="bookVisitArr"
      size="medium"
      class="marginTop20 common-form-inline"
    >
      <el-form-item label="访问开始日期">
        <el-date-picker v-model="visitDateStart" type="date" placeholder="选择访问开始日期"
                        @change="handleDateStart" value-format="yyyy-MM-dd"
            :picker-options="pickerOptionsStart"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="访问结束始日期">
        <el-date-picker v-model="visitDateEnd" type="date" placeholder="选择访问结束始日期"
                        @change="handleDateEnd" value-format="yyyy-MM-dd"
            :picker-options="pickerOptionsEnd"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button class="btnIsBlue" type="primary" style="width: 100px" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <!--主列表-->
    <div class="common-table">
      <div v-if="loadingStatus" class="lazyImg"><span class="lazyText">数据加载中</span></div>
      <div v-if="noDataStatus" class="lazyImg"><span class="lazyText">暂无数据</span></div>
      <el-table v-if="!loadingStatus" v-show="!noDataStatus" header-row-class-name="table-header" stripe  border  style="width: 100%" height="650"
                ref="multipleTable" tooltip-effect="dark" v-loading="loadingSwitch"
                @selection-change="handleSelectionChange"
                :data="tableData">
        <el-table-column prop="number" label="序号" width="50"></el-table-column>
        <el-table-column prop="planBeginTime" label="到访日期" width="180">  </el-table-column>
        <el-table-column prop="visitingTime" label="拜访时间"  width="120">  </el-table-column>
        <el-table-column prop="beginTime" label="实际开始时间" width="160">  </el-table-column>
        <el-table-column prop="endTime" label="实际结束时间"  width="160">  </el-table-column>
        <el-table-column prop="vistorNum" label="访客人数" width="100">  </el-table-column>
        <!--<el-table-column prop="isVip" label="访客类型" width="100">  </el-table-column>-->
        <el-table-column prop="isCar" label="是否驾车" width="100"> </el-table-column>
        <el-table-column prop="carNum" label="驾车数量" width="100"> </el-table-column>
        <el-table-column prop="visitorStatus" label="访问状态"> </el-table-column>
        <!--<el-table-column prop="auditingType" label="审核通过类型"> </el-table-column>-->
        <!--<el-table-column prop="recordType" label="录入类型"> </el-table-column>-->
        <el-table-column prop="operaterCode" label="操作人工号" width="120"> </el-table-column>
        <el-table-column prop="operaterName" label="操作人姓名" width="120"> </el-table-column>
        <el-table-column prop="che" label="查看">
          <template slot-scope="scope">
            <el-button size="mini" type="text"
                       @click="lookInformation(scope.$index, scope.row)">查看信息</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--查看信息-->
    <div class="endVisitSearch">
      <el-dialog title="访客信息" v-dialogDrag
                 :visible.sync="visitorInfomation"
                 :close-on-click-modal="false"
                 class="edit-form" width="1000px"
                 :before-close="handleClose">
        <el-form :v-model="editForm" ref="editForm"><!--:v-model="editForm"-->
          <div class="endVisitSearchDialog" style="display: flex;">
            <el-form-item label="到访日期" prop="planBeginTime" style="flex: 1">
              <el-input  v-model="editForm.planBeginTime" :disabled="true" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="拜访时间" prop="visitingTime" style="flex: 1">
              <el-input v-model="editForm.visitingTime" :disabled="true" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="来访人员数量" prop="vistorNum" style="flex: 1">
              <el-input v-model="editForm.vistorNum" :disabled="true" auto-complete="off"></el-input>
            </el-form-item>
          </div>
          <div class="endVisitSearchDialog" style="display: flex;">
            <el-form-item label="实际开始时间" prop="beginTime" style="flex: 1">
              <el-input  v-model="editForm.beginTime" :disabled="true" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="实际结束时间" prop="endTime" style="flex: 1">
              <el-input v-model="editForm.endTime" :disabled="true" auto-complete="off"></el-input>
            </el-form-item>

            <el-form-item label="访客类型" prop="visitorTableDataIsVip" style="flex: 1">
              <el-input  v-model="visitorTableDataIsVip" :disabled="true" auto-complete="off"></el-input>
            </el-form-item>
          </div>
          <div class="endVisitSearchDialog" style="display: flex;">
            <el-form-item label="是否驾车" prop="isCar" style="width: 33.3%">
              <el-input v-model="editForm.isCar" :disabled="true" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="驾车数量" prop="carNum" style="width: 33.3%">
              <el-input  v-model="editForm.carNum" :disabled="true" auto-complete="off"></el-input>
            </el-form-item>
          </div>

          <div class="endVisitSearchDialog" style="display: flex;">
            <el-form-item label="拜访原因" prop="visitReason" style="width: 100%;">
              <el-input class="visitReasonTextarea" disabled
                        type="textarea" :rows="2" placeholder="请输入拜访原因"
                        v-model="visitReason">
              </el-input>
            </el-form-item>
          </div>
          <div class="common-table">
            <el-table header-row-class-name="table-header"  border  style="width: 100%" height="180"
                      :data="visitorTableData">
              <el-table-column type="index" label="序号" width="50"></el-table-column>
              <el-table-column prop="visitorName" label="拜访人姓名" width="100">  </el-table-column>
              <el-table-column prop="phone" label="电话号码"  width="120">  </el-table-column>
              <el-table-column prop="visitorId" label="身份证号" width="170" >  </el-table-column>
              <el-table-column prop="carNo" label="车牌号码" width="100">  </el-table-column>
              <el-table-column prop="beginTime" label="实际开始时间"  >  </el-table-column>
              <el-table-column prop="endTime" label="实际结束时间" >  </el-table-column>
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
                      :data="visitorCarTableData">
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
    <!--查看图片-->
    <div class="checkPictureInformation">
      <el-dialog title="图片信息" v-dialogDrag
                 :visible.sync="checkPictureInformationVisible"
                 :close-on-click-modal="false"
                 class="edit-form"
                 :before-close="handleClosePictures">
              <img :src="checkImgUrl" alt="" style="width: 100%">
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="handleCancelPictures('editForm')">取消</el-button>
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
        :total="totalPage">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import {reqCheckDetailList,reqEndVisitList} from '../../../api'
  import {isInnerIPFn}from '../../../util/isInnerIP'
  export default {
    name: "Template",
    data() {
      return {
        loadingSwitch:false,//加载中
        loadingStatus:true,//初始化显示数据加载中
        noDataStatus:false,//显示暂无数据,初始化不显示
        visitDateStart:'',
        visitDateEnd:'',
        editForm:[],
        checkImgUrl:'',//查看图片地址信息
        visitorInfomation:false,
        multipleTable:[],
        pickerOptionsStart: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          }
        },
        pickerOptionsEnd:{
          disabledDate:(time) =>{
            return time.getTime() < new Date(this.visitDateStart).getTime() || time.getTime() > Date.now();
          }
        },
        visitReason:'',   //拜访原因
        checkPictureInformationVisible:false, //查看图片对话框
        bookVisitArr: {
          user: '',
          num: ''
        },
        tableData: [],      //主列表
        visitorTableData:[],//详细信息人员列表
        visitorCarTableData:[],//详细信息车列表
        currentPage: 1,//当前页
        totalPage:0,//总页数
        pageSize:20,//每页显示多少条
        visitorTableDataIsVip:'一般访客',
      }
    },
    watch:{
      tableData(){
        this.loadingSwitch = false
      }
    },
    mounted(){
      const{currentPage,pageSize,visitDateStart,visitDateEnd} = this
      this.getEndVisitList(currentPage,pageSize,{startTime:visitDateStart,endTime:visitDateEnd})
    },
    methods: {
      /*
      * 函数名：getEndVisitList
      * 参数：
      * 描述：初始化及查询调用
      * */
      async getEndVisitList(pageNo,pageSize,query){
        const res = await reqEndVisitList(pageNo,pageSize,query)
        if(!res ||!res.data.code===200) return
          this.tableData = res.data.data.list
          this.totalPage = res.data.data.total
          //数据懒加载显示
          this.loadingStatus = false
          if(this.tableData.length === 0){
            this.noDataStatus = true
            return
          }else{
            this.noDataStatus = false
          }
          for (var i = 0; i < this.tableData.length; i++) {
          this.tableData[i].number = (this.currentPage-1)*this.pageSize+(i+1)
            this.tableData[i].isCar === '0'? this.tableData[i].isCar= '否':this.tableData[i].isCar= '是'
            if(this.tableData[i].isVip === 0){
              this.tableData[i].isVip = '一般访客'
            }else if(this.tableData[i].isVip === 1){
              this.tableData[i].isVip = 'Vip'
            }
            if(this.tableData[i].auditingType === '01'){
              this.tableData[i].auditingType= '个人审核通过'
            }else if(this.tableData[i].auditingType === '02'){
              this.tableData[i].auditingType= '门岗审核通过'
            }
            if(this.tableData[i].visitorStatus === '01'){
              this.tableData[i].visitorStatus= '待访问'
            }else if(this.tableData[i].visitorStatus === '02'){
              this.tableData[i].visitorStatus= '访问中'
            }else if(this.tableData[i].visitorStatus === '03'){
              this.tableData[i].visitorStatus= '访问结束'
            }
            if(this.tableData[i].visitingTime === '01'){
              this.tableData[i].visitingTime= '上午'
            }else if(this.tableData[i].visitingTime === '02'){
              this.tableData[i].visitingTime= '下午'
            }else if(this.tableData[i].visitingTime === '03'){
              this.tableData[i].visitingTime= '全天'
            }
            if(this.tableData[i].recordType === '01'){
              this.tableData[i].recordType= '被访人录入'
            }else if(this.tableData[i].recordType === '02'){
              this.tableData[i].recordType= '访客机录入'
            }else if(this.tableData[i].recordType === '03'){
              this.tableData[i].recordType= '门岗录入'
            }
          }
      },

      onSubmit() {
        console.log('submit!');
        const{pageSize,visitDateStart,visitDateEnd} = this
        this.currentPage = 1
        this.getEndVisitList(this.currentPage,pageSize,{startTime:visitDateStart,endTime:visitDateEnd})
        this.loadingSwitch = true
      },
      handleDateStart(val){
        this.visitDateStart = val
      },
      handleDateEnd(val){
        this.visitDateEnd = val
      },
      handleCurrentChange(val) {
        const{pageSize,visitDateStart,visitDateEnd} = this
        this.currentPage = val
        this.getEndVisitList(this.currentPage,pageSize,{startTime:visitDateStart,endTime:visitDateEnd})
        this.loadingSwitch = true
      },
      handleSizeChange(val){
        const{currentPage,visitDateStart,visitDateEnd} = this
        this.pageSize = val
        this.getEndVisitList(currentPage,this.pageSize,{startTime:visitDateStart,endTime:visitDateEnd})
        this.loadingSwitch = true
      },
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleSelectionChange(val){
        this.multipleTable = val
      },
      /*
      * 函数名：lookInformation
      * 参数：
      * 描述：点击查看信息
      * */
      lookInformation(index, row) {
        this.visitorInfomation = true
        this.editForm = Object.assign({},row)
        console.log(index, row);
        const rowID = row.id
        this.handlerLookInfo(rowID)
      },

      async handlerLookInfo(visitorId){
        const res = await reqCheckDetailList(visitorId)
        if(res.data.code === 200){
          this.visitorTableData = res.data.data.sanyBussVisitorDetailsList
          this.visitorTableDataIsVip = res.data.data.sanyBussVisitorDetailsList[0].isVip
          if(res.data.data.sanyBussVisitorDetailsList[0].isVip === 1){
            this.visitorTableDataIsVip = 'Vip'
          }else if(res.data.data.sanyBussVisitorDetailsList[0].isVip === 0){
            this.visitorTableDataIsVip = '一般访客'
          }
          this.visitorCarTableData = res.data.data.sanyBussVisitorCarList


        }
      },


      handleClose(){
        this.visitorInfomation = false
      },
      handleCancel(){
        this.visitorInfomation = false
      },
      //查看图片
      checkPicture(index,row){
        this.checkPictureInformationVisible = true
        //根据内外网访问图片  isInnerIp:true为内网 false：外网
        const isInnerIp = isInnerIPFn().isInnerIp
        console.log('isInnerIp:',isInnerIp)
        if(isInnerIp){
          this.checkImgUrl = `http://10.19.8.21:8181${row.imgUrl.slice(22)}`
        }else{
          this.checkImgUrl = `http://222.240.233.67:8181${row.imgUrl.slice(22)}`
        }
      },
      handleCancelPictures(){
        this.checkPictureInformationVisible = false
      },
      handleClosePictures(){
        this.checkPictureInformationVisible = false
      },
    }
  }
</script>

<style lang="scss" scoped>
  /deep/.endVisitSearchDialog .el-form-item__content{
    margin-left: 100px;
  }
  /deep/ .endVisitSearchDialog .el-form-item__label{
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
  .endVisitSearchDialog .el-form-item .el-form-item__content{
    margin-left: 100px!important;
  }
  .endVisitSearchDialog .el-form-item .el-form-item__label{
    width: 100px!important;
  }
   .visitReasonTextarea .el-textarea__inner{
    width: 100%;
  }
  .endVisitSearch .el-dialog__wrapper .el-dialog{
    margin-top: 11vh!important;
  }


</style>

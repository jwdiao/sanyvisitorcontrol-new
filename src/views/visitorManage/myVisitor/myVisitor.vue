<template>
  <div class="">
    <!-- <p class="common-breadcrumb">我的访客信息</p> -->
    <el-form
      :inline="true"
      size="medium"
      class="marginTop20 common-form-inline"
    >
      <el-form-item label="访客姓名">
        <el-input v-model="visitorName" placeholder="访客姓名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="btnIsBlue" type="primary" @click="handleSearchByName" style="width: 100px;">查询</el-button>
        <el-button class="btnIsBlue" type="primary" @click="handleAddVisitor">新增访客</el-button>
        <!--<el-button type="primary" @click="handleDownSubPhoto">下发照片</el-button>-->
        <!--<el-button type="primary" @click="handleSendMessages">发送短信</el-button>-->
      </el-form-item>
      <div v-show="false">
        <canvas  style="width:300px;height:300px" id="canvas" ref="canvas"></canvas>
      </div>
    </el-form>
    <!--主列表-->
    <div class="common-table">
      <div v-if="loadingStatus" class="lazyImg"><span class="lazyText">数据加载中</span></div>
      <div v-if="noDataStatus" class="lazyImg"><span class="lazyText">暂无数据</span></div>
      <el-table v-if="!loadingStatus" v-show="!noDataStatus" header-row-class-name="table-header"  border  style="width: 100%" @selection-change="handleSelectionChange"
        :data="tableData" v-loading="loadingSwitch">

        <!--<el-table-column type="selection" label="选择" width="50"></el-table-column>-->
        <el-table-column prop="number" label="序号" width="50" align="left" header-align="left"></el-table-column>
        <el-table-column prop="planBeginTime" label="到访日期" width="100" align="left" header-align="left">  </el-table-column>
        <el-table-column prop="visitingTime" label="拜访时间"  align="left" header-align="left">  </el-table-column>
        <el-table-column prop="vistorNum" label="访客人数"  align="left" header-align="left">  </el-table-column>
        <el-table-column prop="isVip" label="访客类型"  align="left" header-align="left">  </el-table-column>
        <el-table-column prop="isCar" label="是否驾车"  align="left"> </el-table-column>
        <el-table-column prop="carNum" label="驾车数量"  align="left" header-align="left"> </el-table-column>
        <el-table-column prop="visitorStatus" label="访问状态"  align="left"> </el-table-column>
        <el-table-column prop="submitStatus" label="单据状态"  align="left"> </el-table-column>
        <!--<el-table-column prop="auditingType" label="审核类型" width="110" align="center"> </el-table-column>-->
       <!-- <el-table-column prop="recordType" label="录入类型" width="95" align="center"> </el-table-column>-->
        <el-table-column prop="userName" label="操作人" align="left" header-align="left" width="110"> </el-table-column>
        <!--<el-table-column prop="reviewNumAndName" label="审核人" align="left" header-align="left"> </el-table-column>-->
        <!--<el-table-column prop="reviewTime" label="审核时间" width="160" align="left" header-align="left"> </el-table-column>-->
        <el-table-column prop="downStatus" label="登记状态" align="left" header-align="left"> </el-table-column>
        <el-table-column label="信息维护" width="90" align="left" header-align="left">
          <template slot-scope="scope">
            <el-button size="mini" type="text"
              @click="handleLookInfo(scope.$index, scope.row)">信息维护</el-button>
          </template>
        </el-table-column>
        <el-table-column label="记录操作" width="140" align="left" header-align="left">
          <template slot-scope="scope">
            <!--<el-button size="mini" type="text"
                        v-show="scope.row.submitStatus==='编辑中'"
                       @click="handleConfirmVisit(scope.$index, scope.row)">确认访问 </el-button>
            <el-button size="mini" type="text"
                       v-show="scope.row.submitStatus==='编辑中'"
                       @click="handleInvalidVisit(scope.$index, scope.row)">无效访问</el-button>-->
            <el-button size="mini" type="text"
                        v-show="scope.row.submitStatus==='审核通过' && scope.row.downStatus==='未登记'"
                       @click="handleInvalid(scope.$index, scope.row)">作废 </el-button>
            <el-button size="mini" type="text"
                        v-show="scope.row.submitStatus==='审核通过' && scope.row.downStatus==='未登记'"
                       @click="handleDengJi(scope.$index, scope.row)">登记 </el-button>
            <!--<el-button size="mini" type="text"
                        v-show="scope.row.submitStatus!=='审核通过' && scope.row.downStatus!=='已下发'"
                       @click="handleDownSubPhoto(scope.$index, scope.row)" style="margin-left: 0px">下发照片 </el-button>-->
           <!-- <el-button size="mini" type="text"
                        v-show="scope.row.submitStatus==='审核通过' && scope.row.visitorStatus==='访问中'"
                       @click="handleEnd(scope.$index, scope.row)">手动结束 </el-button>-->

          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="marginTop10 text-right">
      <el-pagination
        background
        :current-page="currentPage"
        :page-sizes="[10, 20, 30]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalNum"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
    <!-- 新增弹窗 -->
    <AddVisitorDialog :visible="dialogVisible" @confirmadddialog="handleConfirmDialog" @cancleadddialog="handleCancleDialog"></AddVisitorDialog>
    <!-- 信息维护弹窗 -->
    <div class="common_lookInfoDialog">
      <el-dialog title="我的访客信息" v-dialogDrag
        :visible.sync="visitorInfomation"
        :close-on-click-modal="false"
        class="edit-form"
        width="1000px"
        >
        <el-form :v-model="editForm" label-width="110px" ref="editForm" :inline="true">
          <div class="">
            <el-form-item label="到访日期">
              <el-input  v-model="editForm.sanyBussVisitor.planBeginTime" disabled></el-input>
            </el-form-item>
            <el-form-item label="拜访时间">
              <el-input v-model="editForm.sanyBussVisitor.visitingTime" disabled></el-input>
            </el-form-item>
            <el-form-item label="来访人员数量">
              <el-input v-model="editForm.sanyBussVisitor.vistorNum" disabled></el-input>
            </el-form-item>
            <!--<el-form-item label="实际开始时间">
              <el-input  v-model="editForm.sanyBussVisitor.beginTime" disabled></el-input>
            </el-form-item>
            <el-form-item label="实际结束时间">
              <el-input v-model="editForm.sanyBussVisitor.endTime" disabled></el-input>
            </el-form-item>-->
            <el-form-item label="是否驾车">
              <el-input v-model="editForm.sanyBussVisitor.isCar" disabled></el-input>
            </el-form-item>
            <el-form-item label="驾车数量">
              <el-input  v-model="editForm.sanyBussVisitor.carNum" disabled></el-input>
            </el-form-item>
            <el-form-item label="访客类型">
              <el-input  v-model="editFormFirstIsVip" disabled></el-input>
            </el-form-item>
            <br />
            <el-form-item label="拜访原因" >
              <el-input disabled style="width:795px;"
                        type="textarea" :rows="3"
                        v-model="editForm.sanyBussVisitor.reason">
              </el-input>
            </el-form-item>
          </div>
        </el-form>
        <div class="common-table">
          <el-table header-row-class-name="table-header" border
                    :data="editForm.sanyBussVisitorDetailsList">
            <el-table-column type="index" label="序号" width="50"></el-table-column>
            <el-table-column prop="visitorName" label="拜访人姓名" width="110" >  </el-table-column>
            <el-table-column prop="phone" label="电话号码" width="115">  </el-table-column>
            <el-table-column prop="visitorId" label="身份证号" width="170">  </el-table-column>
            <el-table-column prop="carNo" label="车牌号码" width="110"></el-table-column>
           <!-- <el-table-column prop="beginTime" label="进入时间"  >  </el-table-column>
            <el-table-column prop="endTime" label="离开时间" >  </el-table-column>-->
            <el-table-column prop="isSub" label="登记状态" width="80" >  </el-table-column>
            <el-table-column label="上传" width="143">

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
                <el-button size="mini" type="primary" class="btnIsBlue"
                           v-show="isShowDownSubBtn"
                           @click="handleRepeatUploadPhoto(scope.$index, scope.row)">重新上传 </el-button>&nbsp;
                  <el-tooltip  v-show="isShowDownSubBtn" content="只能上传jpg/png文件，且大小不超过2M" placement="top">
                    <img src="./images/imageSize.png" style="vertical-align: middle" alt="">
                  </el-tooltip>
                </el-upload>

              </template>
            </el-table-column>
            <el-table-column prop="imgUrl" label="图片名称" width="90">
              <template slot-scope="scope">
                <el-button size="mini" type="text" v-show="scope.row.imgUrl"
                            @click="checkPicture(scope.$index, scope.row)">查看图片</el-button>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="90">
              <template slot-scope="scope">
                <el-button size="mini" type="text"
                            @click="handleSendMessagesInformation(scope.$index, scope.row)">发送信息</el-button>
              </template>
            </el-table-column>

          </el-table>
        </div><br/>
        <span slot="footer" class="dialog-footer">
      <!--<el-button v-show="isShowDownSubBtn" type="primary" @click="handleImageDownSub(editForm)">确 定</el-button>-->
    </span>
        <!--<div class="common-table">
          <el-table header-row-class-name="table-header"  border
                    :data="editForm.sanyBussVisitorCarList">
            <el-table-column type="index" label="序号" width="100"></el-table-column>
            <el-table-column prop="carNo" label="车牌号码"></el-table-column>
            <el-table-column prop="beginTime" label="进入时间"></el-table-column>
            <el-table-column prop="endTime" label="离开时间"></el-table-column>
          </el-table>
        </div>-->
      </el-dialog>
    </div>
    <!-- 查看信息弹窗 -->
    <!-- 查看照片 -->
    <div class="checkPictureInformation">
      <el-dialog title="图片信息" v-dialogDrag
        :visible.sync="checkPictureInformationVisible"
        :close-on-click-modal="false"
        class="edit-form">
        <div style="display: flex;justify-content: center;align-items: center;overflow: hidden;">
            <img :src="currentImg" alt="" style="width:100%;">
        </div>
      </el-dialog>
    </div>
    <!-- 查看照片end -->
  </div>
</template>

<script>
  import {
    getVisitorAllByVisitorNameRequest,
    confirmVisitRequest,
    invalidVisitRequest,
    cancelRequest,
    manualEndRequest,
    getVisitorDetailsRequest,
    fileUploadRequest,

  } from '../../../api/businessManageApi'
import {
  reqSendMessages,reqSubPhotoes,reqRUploadImage,reqSendMessageSingle,
  regNormalRegister,
}from '../../../api'
import {isInnerIPFn} from '../../../util/isInnerIP'
  // import {date}from '../../../util/dateFormat'
  import {date}from '../../../util/dateFormatEasy'
  import AddVisitorDialog from './addVisitorDialog'
  import QRCode from 'qrcode'

  import { mapState } from 'vuex';
  export default {
    name: "Template",
    components: {
      AddVisitorDialog
    },
    data() {
      return {
        tableData: [],
        loadingSwitch:false,//加载 中
        loadingStatus:true,//初始化显示数据加载中
        noDataStatus:false,//显示暂无数据,初始化不显示
        editFormFirstIsVip:'',//访客类型---0422---提取下表的第一条
        qrCode:'',//二维码地址
        reImageId:'',//信息维护--重新上传id
        currentPage: 1, // 当前页
        pageSize: 10, // 每页多少条
        totalNum: 0, // 总条数
        visitorName: '', // 访客姓名
        editForm: { // 查看信息的弹窗信息
          sanyBussVisitor: {},
          sanyBussVisitorDetailsList: [
            {
              imgUrl:'',//照片路径
            }
          ],
          sanyBussVisitorCarList: [],
        },
        dialogVisible: false, // 新增弹窗是否显示
        visitorInfomation: false, // 查看信息弹窗是否显示
        checkPictureInformationVisible: false, // 查看照片
        currentImg: '',
        multipleSelection:[],//选择主列表内容选项  下发照片   发送短信
        currentUploadIndex:"",//重新上传索引
        isShowDownSubBtn:false,//是否显信息维护弹窗内的确定按钮  &&  重新上传按钮显示与隐藏（逻辑就是下发状态为已下发时，不需要重新上传和下发，否则其它状态都需要下发照片与重新上传照片）
        // submitStatusComing:true,//单据类型true为不通过,false为审核通过不显示(审核通过时,信息维护不可以重新上传照片)
      }
    },
    mounted () {
      // 访客历史记录列表
      this.getAllVisitorData(this.currentPage,this.pageSize,this.visitorName)
    },
    watch:{
      tableData(){
        this.loadingSwitch = false
      }
    },
    methods: {
      async getAllVisitorData(pageNum, pageSize, visitorName) {
        let visitorNameQuery;
        if (visitorName === '') {
          visitorNameQuery=== null
        } else {
          visitorNameQuery = visitorName
        }
        const res = await getVisitorAllByVisitorNameRequest(pageNum, pageSize, visitorNameQuery);
        if (!res || !res.data || !res.data.code === '200')   return
        const {list, total} = res.data.data
        var qrCodeList = res.data.data.list
        this.totalNum = total
        this.tableData = list.map((item,index) => {
          var visitorStatus = item.visitorStatus // 访问状态
          if (visitorStatus === '01') {
            visitorStatus = '待访问'
          } else if (visitorStatus === '02') {
            visitorStatus = '访问中'
          } else if (visitorStatus === '03') {
            visitorStatus = '访问结束'
          } else if (visitorStatus === '04') {
            visitorStatus = '无效访问'
          }
          var submitStatus = item.submitStatus // 审核状态
          if (submitStatus === '01') {
            submitStatus = '编辑中'
          } else if (submitStatus === '02') {
            submitStatus = '审核通过'
          } else if (submitStatus === '03') {
            submitStatus = '审核失败'
          }
          var auditingType = item.auditingType // 审核通过类型
          if (auditingType === '01') {
            auditingType = '个人审核通过'
          } else if (auditingType === '02') {
            auditingType = '门岗审核通过'
          }
          var recordType = item.recordType // 录入类型
          if (recordType === '01') {
            recordType = '被访人录入'
          } else if (recordType === '02') {
            recordType = '访客机录入'
          } else if (recordType === '03') {
            recordType = '门岗录入'
          }
          var downStatus = item.isSub // 登记状态
          if (downStatus === '1') {
            downStatus = '已登记'
          } else if (downStatus === '2') {
            downStatus = '未登记'
          }
          var isCar = item.isCar // 是否驾车
          if (isCar === '1') {
            isCar = '是'
          } else if (isCar === '0') {
            isCar = '否'
          }
          var isVip = item.isVip // 访客类型
          if (isVip === 1) {
            isVip = 'Vip'
          } else if (isVip === 0) {
            isVip = '一般访客'
          }
         /* else if(downStatus === '3'){
            downStatus = '已下发照片不合规'
          }else if(downStatus === '4'){
            downStatus = '照片部分合规'
          }*/
          var visitingTime = item.visitingTime
          // console.log('item.visitingtime:',visitingTime)
          if(visitingTime === '01'){
            visitingTime = '上午'
          }else if(visitingTime === '02'){
            visitingTime = '下午'
          }else if(visitingTime === '03'){
            visitingTime = '全天'          }
          // 审核人工号/姓名
          let auditingCode = item.auditingCode? item.auditingCode: ''
          let auditingName = item.auditingName? item.auditingName: ''
          let reviewNumAndName = ''
          if (auditingCode) {
            reviewNumAndName = auditingCode+'/'+auditingName
          } else {
            reviewNumAndName = auditingName
          }
          // this.qrCode = item.qrCode
          this.documentNo = item.documentNo
          return {
            id: item.id, // id
            planBeginTime:item.planBeginTime, // 拜访开始时间/*date(item.planBeginTime)*/
            // planEndTime: item.planEndTime, // 拜访结束时间
            vistorNum: item.vistorNum, // 来访人员数
            isCar: isCar, // 是否驾车（1.是，0.否）
            isVip: isVip, // 访客类型（1.VIp，0.一般访客）
            carNum: item.carNum, // 来访车数量
            visitorStatus: visitorStatus, // 访问状态（01:待访问02：访问中03：访问结束'）
            submitStatus: submitStatus, // 审核状态（01:待审核（申请中）02：审核通过）
            auditingType: auditingType, // 审核通过类型（01：个人审核通过02：门岗审核通过'）
            recordType: recordType, // 录入类型（01：被访人录入02：访客机录入03：门岗录入'）
            visitingTime: visitingTime, // 拜访时间
            // operatorNumAndName: item.operaterCode?item.operaterCode:'' + '/' + item.operaterName?item.operaterName:'', // 操作人工号/姓名
            operatorNumAndName: item.operaterCode, // 操作人工号/姓名
            reviewNumAndName: reviewNumAndName, // 审核人工号/姓名
            reviewTime: item.auditingTime, // 审核时间
            downStatus: downStatus, // 登记状态
            qrCode:item.qrCode,  //二维码地址
            phone:item.phone, // 手机号
            documentNo:item.documentNo,//预约码
            userName:item.userName,
            number:(this.currentPage-1)*this.pageSize+(index+1)
          }
          console.log('isVip:',isVip)
        })
        //数据懒加载显示
        this.loadingStatus = false
        if(this.totalNum === 0){
          this.noDataStatus = true
        }else{
          this.noDataStatus = false
        }
        //20190515通过车牌号搜索
     /*   var idList = list.map((item,index)=>{
          return item.id
        })
        var carArrTotal = []
        for (var i = 0; i < idList.length; i++) {
          const resCarNo = await getVisitorDetailsRequest(idList[i]);
          if(!resCarNo&&!resCarNo.data.code===200) return
            var carNoItemArr = resCarNo.data.data.sanyBussVisitorDetailsList
          var carNoArr = carNoItemArr.map((item)=>{
            return item.carNo
            carArrTotal.push(carNoArr)
          })
          console.log('carNoArr:',carNoArr)

        }*/
      },
      // 每页多少条改变回调
      handleSizeChange(val) {
        // console.log(`每页多少条: ${val}`);
        this.pageSize = val
        this.currentPage = 1;
        this.getAllVisitorData(this.currentPage, this.pageSize, this.visitorName)
        this.loadingSwitch = true
      },
      // 当前页改变回调
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
        this.currentPage = val
        this.getAllVisitorData(this.currentPage, this.pageSize, this.visitorName)
        this.loadingSwitch = true
      },
      // 查询
      async handleSearchByName() {
        this.currentPage = 1
        this.getAllVisitorData(this.currentPage,this.pageSize,this.visitorName);
        this.loadingSwitch = true
      },

      // 查看信息
      handleLookInfo(index, row) {
        console.log('row:', row);
        this.visitorInfomation = true
        this.qrCode = row.qrCode
        //是否显示信息维护确定按钮
        row.downStatus === '已登记' ?  this.isShowDownSubBtn = false : this.isShowDownSubBtn = true
        // 查看信息接口
        this.getVisitorDetailsData(row.id)
      },
      async getVisitorDetailsData (visitorId) {
        const res = await getVisitorDetailsRequest(visitorId);
        // console.log('查看信息接口YYYYYYYY：', res)
        if (!res || res.data.code!==200) {
          this.$message({
            type: 'error',
            message: res.data.msg
          });
          return
        }
        this.editForm = res.data.data
        this.editForm.sanyBussVisitor.isCar = this.editForm.sanyBussVisitor.isCar==='1'? '是':'否'
        if(this.editForm.sanyBussVisitor.isVip===1){
          this.editForm.sanyBussVisitor.isVip = 'Vip'
        }else if(this.editForm.sanyBussVisitor.isVip===0){
          this.editForm.sanyBussVisitor.isVip = '一般访客'
        }
        if(this.editForm.sanyBussVisitor.visitingTime === '01'){
          this.editForm.sanyBussVisitor.visitingTime = '上午'
        }else if(this.editForm.sanyBussVisitor.visitingTime === '02'){
          this.editForm.sanyBussVisitor.visitingTime = '下午'
        }else if(this.editForm.sanyBussVisitor.visitingTime === '03'){
          this.editForm.sanyBussVisitor.visitingTime = '全天'
        }

        this.editForm.sanyBussVisitorDetailsList.map(item=>{
          // var isSub = item.isSub // 下发状态
          if (item.isSub === '1') {
            item.isSub = '已登记'
          } else if (item.isSub === '2') {
            item.isSub = '未登记'
          }
          if (item.isVip === 1) {
            this.editFormFirstIsVip = 'Vip'
          } else if (item.isVip === 0) {
            this.editFormFirstIsVip = '一般访客'
          }
          // console.log('isSub:',item.isSub)
          // console.log('sanyBussVisitorDetailsList:',this.editForm.sanyBussVisitorDetailsList)
          return {isSub:item.isSub}

        })

      },
      // 确认访问
      handleConfirmVisit(index, row) {
        this.$confirm('确认访问?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // console.log('当前id是：',row.id)
          // console.log('当前登陆人id:',sessionStorage.getItem('userId'))
          this.confirmVisitData(row.id, 1)
        }).catch(() => {

        });
      },
      // 确认访问请求接口
      async confirmVisitData (visitorId, source) {
        const res = await confirmVisitRequest(visitorId, source);
        // console.log('确认数据：',res)
        if (res.data.code === 200) {
          this.$message({
            type: 'success',
            message: res.data.data
          });
          // 刷新一下数据
        } else {
          this.$message({
            type: 'success',
            message: res.data.msg
          });
        }
      },
      // 无效/作废/手动结束请求接口
      async InvalidCancelManualEndData (visitorId, requestName) {
        let requestNames = requestName
        const res = await requestNames(visitorId);
        // console.log('无效数据：',res)
        if (res.data.code === 200) {
          this.$message({
            type: 'success',
            message: res.data.data
          });
          // 刷新一下数据
          this.getAllVisitorData(this.currentPage, this.pageSize, this.visitorName)
        } else {
          this.$message({
            type: 'success',
            message: res.data.msg
          });
        }
      },
      // 无效访问
      handleInvalidVisit(index, row) {
        console.log('无效访问:',row)
        this.$confirm('确定是无效访问?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.InvalidCancelManualEndData(row.id, invalidVisitRequest)
        }).catch(() => {

        });
      },
      // 作废
      handleInvalid(index, row) {
        console.log(index, row);
        this.$confirm('确定作废?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.InvalidCancelManualEndData(row.id, cancelRequest)
        }).catch(() => {

        });
      },
      //点击列表中登记按钮
      handleDengJi(index,row){
        this.$confirm('确定登记?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //向后台发送请求
          var idArrItem= row.id
          //this.subSendImage(idArrItem)
          this.getRegister(idArrItem)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消登记'
          });
        });
      },
      //登记向后台请求数据
      async getRegister(visitorId){
        const res = await regNormalRegister(visitorId)
        if(res&&res.data.code===200){
          this.$message({type:'success',message:res.data.data})
          //刷新列表
          this.getAllVisitorData(this.currentPage,this.pageSize,this.visitorName)
        }else{
          this.$message({type:'error',message:res.data.msg})
        }
      },
      // 手动结束
      handleEnd(index, row) {
        console.log(index, row);
        this.$confirm('确定手动结束?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.InvalidCancelManualEndData(row.id, manualEndRequest)
        }).catch(() => {

        });
      },
      //确认下发逻辑
      handleSelectionChange(val) {
        this.multipleSelection = val;
        console.log('multipleSelection:',this.multipleSelection)
      },

    //点击下发照片按钮
    handleDownSubPhoto(index,row){
      this.$confirm('确定下发?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
          //向后台发送请求
          var idItem= row.id
          this.subSendImage(idItem)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消下发照片'
        });
      });
    },
      //下发照片后台请求
      async subSendImage(visitorId){
        const res = await reqSubPhotoes(visitorId)
        if(res&&res.data&&res.data.code===200){
          //根据返回值出现相应的提示符
            this.$message({
              type:'success',
              message:res.data.data
            })
          //重新渲染页面
          this.currentPage = 1
          this.getAllVisitorData(this.currentPage,this.pageSize,this.visitorName);
        }else{
          this.$message({
            type:'error',
            message:res.data.data
          })
        }
      },

    //发送短信按钮---主页面
    handleSendMessages(){
      if(this.multipleSelection.length === 0){
        this.$message({
          type:'error',
          message:'请选择发送短信对象'
        })
        return
      }
      this.$confirm('确定发送?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const {multipleSelection} = this
        var messageDto =[]
        var messageDtoqrCodeArr =[]
        console.log('multipleSelection:',multipleSelection)
        for (var i = 0; i < multipleSelection.length; i++) {
          var ItemObj = {}
          ItemObj.uid = multipleSelection[i].id
          // ItemObj.qrCode = `twodimension/${multipleSelection[i].qrCode}`
          // ItemObj.qrCode = `sanyvisitorcontrol/sanyvisitormanage/#/twodimension/${i}`
          ItemObj.qrCode = multipleSelection[i].qrCode
          ItemObj.verifCode = multipleSelection[i].documentNo
          messageDto.push(ItemObj)
          messageDtoqrCodeArr.push(multipleSelection[i].qrCode)
          //向后台发送短信请求
        }
        this.sendMessageAsync(messageDto)
      /*    //二维码
        var qrCodeArr = []
        messageDtoqrCodeArr.forEach((item,index) =>{
          var qrcodeItem = item
          console.log('qrcode:',qrcodeItem)
          //根据返回值qrcode生成二维码
          let canvasID = this.$refs.canvas
          QRCode.toCanvas(canvasID, qrcodeItem, function (error) {
            if (error) console.error(error)
          })
          var imgSrc = canvasID.toDataURL("image/png");
          qrCodeArr.push(imgSrc)
          console.log('生成二维码地址：',qrCodeArr)
          // this.$store.commit('getQrCodeImg',qrCodeArr)
          this.$route.params.id = index
        })
         localStorage.setItem('getQrCodeImg',JSON.stringify(qrCodeArr))*/

        // localStorage.setItem('getQrCodeImg',JSON.stringify(messageDtoqrCodeArr))
        // this.$store.commit('getQrCodeImg',messageDtoqrCodeArr)

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消发送'
        });
      });
    },
    //发送短信按钮---信息维护
      handleSendMessagesInformation(index,row){
        console.log('row0000000:',row)
      this.$confirm('确定发送?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
       var messageDto = []
        var ItemObj = {}
        ItemObj.uid = row.id
        ItemObj.qrCode = row.qrCode
        ItemObj.verifCode = row.verifCode
        messageDto.push(ItemObj)
        this.sendMessageSingle(messageDto)
        //
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消发送'
        });
      });
    },
      //0328发送短信异步---信息维护中
      async sendMessageSingle(messageDto){
        const res = await reqSendMessageSingle(messageDto)
        if(res&&res.data&&res.data.code===200){
          this.$message({
            type:'success',
            message:'短信发送成功'
          })
          //刷新页面
          this.getAllVisitorData(this.currentPage,this.pageSize,this.visitorName)
        }else {
          this.$message({
            type:'error',
            message:res.data.msg
          })
        }

      },
      //发送短信异步请求
      async sendMessageAsync(messageDto){
        const res = await reqSendMessages(messageDto)
        if(res&&res.data&&res.data.code===200){
          this.$message({
            type:'success',
            message:'短信发送成功'
          })
          //刷新页面
          this.getAllVisitorData(this.currentPage,this.pageSize,this.visitorName)
        }else {
          this.$message({
            type:'error',
            message:res.data.msg
          })
        }
      },
      // 新增访客弹窗出现
      handleAddVisitor() {
        this.dialogVisible = true
      },
      // 新增弹窗确定按钮事件
      handleConfirmDialog (val) {
        this.dialogVisible = val
        this.currentPage = 1
        this.getAllVisitorData(this.currentPage, this.pageSize, this.visitorName)
      },
      // 新增弹窗取消按钮事件
      handleCancleDialog (val) {
        this.dialogVisible = val
      },
      // 查看图片
      checkPicture(index, row){
        this.checkPictureInformationVisible = true
        this.currentUploadIndex = index
        //根据内外网访问图片  isInnerIp:true为内网 false：外网
        const isInnerIp = isInnerIPFn().isInnerIp
        console.log('isInnerIp:',isInnerIp)
        if(isInnerIp){
          this.currentImg = `http://10.19.8.21:8181${this.editForm.sanyBussVisitorDetailsList[this.currentUploadIndex].imgUrl.slice(22)}`
        }else{
          this.currentImg = `http://222.240.233.67:8181${this.editForm.sanyBussVisitorDetailsList[this.currentUploadIndex].imgUrl.slice(22)}`
        }
        console.log('查看图片row',row)
      },
      //重新上传照片
      handleRepeatUploadPhoto(index,row){
        this.currentUploadIndex = index
        this.reImageId = row.id
       // console.log('重新上传照片:',row)
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
        console.log('param:',param)
        const res = await reqRUploadImage(formData,this.reImageId)
        if(res&&res.status===200){
          this.$message({
            type:'success',
            message:'上传成功'
          })
          let {code,data,msg} = res.data;
          console.log('imgUrl:',data)
          this.editForm.sanyBussVisitorDetailsList[this.currentUploadIndex].imgUrl = data
        }
      },
      //信息维护弹窗确定按钮
      handleImageDownSub(editForm){
        this.visitorInfomation = false
        //确定图片下发请求
        var reLoadId =editForm.sanyBussVisitor.id
        this.subSendImage(reLoadId)
      },
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

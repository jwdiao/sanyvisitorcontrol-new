<template>
  <div class="">
    <!-- <p class="common-breadcrumb">访客历史记录</p> -->
    <el-form
      :inline="true"
      size="medium"
      class="marginTop20 common-form-inline"
    >
      <el-form-item label="开始日期">
        <el-date-picker
          v-model="startTime"
          type="date"
          value-format="yyyy-MM-dd"
          :picker-options="pickerOptionsStart"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="结束日期">
        <el-date-picker
          v-model="endTime"
          type="date"
          value-format="yyyy-MM-dd"
          :picker-options="pickerOptionsEnd"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch">数据查询</el-button>
      </el-form-item>
    </el-form>
    <div class="common-table">
      <el-table header-row-class-name="table-header"  border  style="width: 100%"
        :data="tableData">
        <el-table-column type="index" label="序号" width="50" align="left" header-align="left"></el-table-column>
        <el-table-column prop="planBeginTime" label="到访日期" width="180" align="left" header-align="left">  </el-table-column>
        <el-table-column prop="visitingTime" label="拜访时间"  width="180" align="left" header-align="left">  </el-table-column>
        <el-table-column prop="beginTime" label="实际开始时间"  width="160" align="right" header-align="center">  </el-table-column>
        <el-table-column prop="endTime" label="实际结束时间"  width="160" align="right" header-align="center">  </el-table-column>
        <el-table-column prop="vistorNum" label="来访人员数" width="130" align="left" header-align="left">  </el-table-column>
        <el-table-column prop="isCar" label="是否驾车" width="120" align="left"> </el-table-column>
        <el-table-column prop="carNum" label="驾车数量" width="120" align="left" header-align="left"> </el-table-column>
        <el-table-column prop="visitorStatus" label="访问状态" width="120" align="left"> </el-table-column>
        <!--<el-table-column prop="auditingType" label="审核类型" align="center"> </el-table-column>-->
        <!--<el-table-column prop="recordType" label="记录类型" align="center"> </el-table-column>-->
        <el-table-column prop="operaterCode" label="操作人工号" align="left" header-align="left"> </el-table-column>
        <el-table-column prop="operaterName" label="操作人姓名" align="left"> </el-table-column>
        <el-table-column label="查看" align="left">
          <template slot-scope="scope">
            <el-button size="mini" type="text"
                       @click="lookInfo(scope.$index, scope.row)">查看信息</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="marginTop10 text-right">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalNum">
      </el-pagination>
    </div>
    <!-- 查看信息弹窗 -->
    <div class="common_lookInfoDialog">
      <el-dialog title="拜访历史记录"
        :visible.sync="visitorInfomation"
        :close-on-click-modal="false"
        class="edit-form"
        >
        <el-form :v-model="editForm" label-width="110px" ref="editForm" :inline="true">
          <div class="endVisitSearchDialog">
            <el-form-item label="到访日期">
              <el-input  v-model="editForm.sanyBussVisitor.planBeginTime" disabled></el-input>
            </el-form-item>
            <el-form-item label="拜访时间">
              <el-input v-model="editForm.sanyBussVisitor.visitingTime" disabled></el-input>
            </el-form-item>
            <el-form-item label="来访人员数量">
              <el-input v-model="editForm.sanyBussVisitor.vistorNum" disabled></el-input>
            </el-form-item>
            <el-form-item label="实际开始时间">
              <el-input  v-model="editForm.sanyBussVisitor.beginTime" disabled></el-input>
            </el-form-item>
            <el-form-item label="实际结束时间">
              <el-input v-model="editForm.sanyBussVisitor.endTime" disabled></el-input>
            </el-form-item>
            <el-form-item label="是否驾车">
              <el-input v-model="editForm.sanyBussVisitor.isCar" disabled></el-input>
            </el-form-item>
            <el-form-item label="驾车数量">
              <el-input  v-model="editForm.sanyBussVisitor.carNum" disabled></el-input>
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
            <el-table-column prop="visitorName" label="拜访人姓名">  </el-table-column>
            <el-table-column prop="phone" label="电话号码">  </el-table-column>
            <el-table-column prop="visitorId" label="身份证号" >  </el-table-column>
            <el-table-column prop="carNo" label="车牌号码"></el-table-column>
            <el-table-column prop="beginTime" label="实际开始时间"  >  </el-table-column>
            <el-table-column prop="endTime" label="实际结束时间" >  </el-table-column>
            <el-table-column prop="imgUrl" label="图片名称">
              <template slot-scope="scope">
                <el-button size="mini" type="text"
                            @click="checkPicture(scope.$index, scope.row)">查看图片</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div><br/>
       <!-- <div class="common-table">
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
    <!-- 查看信息弹窗end -->
    <!-- 查看照片 -->
    <div class="checkPictureInformation">
      <el-dialog title="图片信息"
                 :visible.sync="checkPictureInformationVisible"
                 :close-on-click-modal="false"
                 class="edit-form">
        <div style="display: flex;justify-content: center;align-items: center;overflow: hidden;">
            <img :src="currentImg" alt="" style="max-width:100%;">
        </div>
      </el-dialog>
    </div>
    <!-- 查看照片end -->
  </div>
</template>

<script>
  import {
    getVisitorHistoryRequest,
    getVisitorDetailsRequest
  } from '../../api/businessManageApi'
  export default {
    name: "VisitorHistoryRecord",
    data() {
      return {
        startTime: '', // 开始时间
        endTime: '', // 结束时间
        pickerOptionsStart: {
          disabledDate(time) {
            return time.getTime() < Date.now()- 3600*1000*24;
          }
        },
        pickerOptionsEnd:{
          disabledDate:(time) =>{
            return time.getTime() < new Date(this.startTime).getTime();/*|| time.getTime() > new Date(this.startTime).getTime() + 3600*1000*24*/
          }
        },
        tableData: [],
        currentPage: 1, // 当前页码
        pageSize: 10, // 每页多少条
        totalNum: 0, // 总条数
        editForm: { // 查看信息的弹窗信息
          sanyBussVisitor: {},
          sanyBussVisitorDetailsList: [],
          sanyBussVisitorCarList: [],
        },
        visitorInfomation: false, // 弹窗是否显示
        checkPictureInformationVisible: false, // 查看照片
        currentImg: ''
      }
    },
    mounted () {
      this.getVisitorHistoryData(this.currentPage,this.pageSize,this.startTime,this.endTime)
    },
    methods: {
      async getVisitorHistoryData(pageNum, pageSize, beginTime, endTime) {
        const res = await getVisitorHistoryRequest(pageNum, pageSize, beginTime, endTime);
        console.log('获取的所有列表：',res)
        // debugger;
        if (!res || !res.data || res.data.code !== 200) {
          this.$message({
            type: 'success',
            message: "请重新登录！"//res.data.msg,该信息后期从后端获取2019.4.2yangbao
          });
          return;
        }
        const {list, total} = res.data.data

        this.totalNum = total
        this.tableData = list.map((item) => {
          var visitorStatus = item.sanyBussVisitor.visitorStatus // 访问状态
          if (visitorStatus === '01') {
            visitorStatus = '待访问'
          } else if (visitorStatus === '02') {
            visitorStatus = '访问中'
          } else if (visitorStatus === '03') {
            visitorStatus = '访问结束'
          }
          var auditingType = item.sanyBussVisitor.auditingType // 审核通过类型
          if (auditingType === '01') {
            auditingType = '个人审核通过'
          } else if (auditingType === '02') {
            auditingType = '门岗审核通过'
          }
          var recordType = item.sanyBussVisitor.recordType // 录入类型
          if (recordType === '01') {
            recordType = '被访人录入'
          } else if (recordType === '02') {
            recordType = '访客机录入'
          } else if (recordType === '03') {
            recordType = '门岗录入'
          }
          var visitingTime = item.sanyBussVisitor.visitingTime // 拜访时间
          if (visitingTime === '01') {
            visitingTime = '上午'
          } else if (visitingTime === '02') {
            visitingTime = '下午'
          } else if (visitingTime === '03') {
            visitingTime = '全天'
          }
          return {
            id: item.sanyBussVisitor.id, // id
            planBeginTime: item.sanyBussVisitor.planBeginTime, // 计划拜访开始时间（到访日期0312）
            // planEndTime: item.sanyBussVisitor.planEndTime, // 计划拜访结束时间
            visitingTime: visitingTime, // 拜访时间
            beginTime: item.sanyBussVisitor.beginTime, // 实际拜访开始时间
            endTime: item.sanyBussVisitor.endTime, // 实际拜访结束时间
            vistorNum: item.sanyBussVisitor.vistorNum, // 来访人员数
            isCar: item.sanyBussVisitor.isCar, // 是否驾车（1.是，0.否）
            carNum: item.sanyBussVisitor.carNum, // 来访车数量
            visitorStatus: visitorStatus, // 访问状态（01:待访问02：访问中03：访问结束'）
            auditingType: auditingType, // 审核通过类型（01：个人审核通过02：门岗审核通过'）
            recordType: recordType, // 录入类型（01：被访人录入02：访客机录入03：门岗录入'）
            operaterCode: item.sanyBussVisitor.operaterCode, // 操作人工号
            operaterName: item.operaterName, // 操作人姓名
          }
        })
      },
      handleSizeChange(val) {
        // console.log(`yy: ${val}`);
        this.pageSize = val
        this.currentPage = 1;
        this.getVisitorHistoryData(this.currentPage, this.pageSize, this.startTime, this.endTime)
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
        this.currentPage = val
        this.getAllVisitorData(this.currentPage, this.pageSize, this.startTime, this.endTime)
      },
      onSearch() {
        this.currentPage = 1;
        this.getVisitorHistoryData(this.currentPage, this.pageSize, this.startTime, this.endTime)
      },
      // 查看信息
      lookInfo(index, row) {
        // console.log(index, row);
        this.visitorInfomation = true
        // 查看信息接口
        this.getVisitorDetailsData(row.id)
      },
      async getVisitorDetailsData (visitorId) {
        const res = await getVisitorDetailsRequest(visitorId);
        // console.log('查看信息接口：', res)
        if (!res || res.data.code!==200) {
          this.$message({
            type: 'error',
            message: res.data.msg
          });
          return
        }
        this.editForm = res.data.data
        this.editForm.sanyBussVisitor.isCar = this.editForm.sanyBussVisitor.isCar==='1'? '是':'否'

        if (this.editForm.sanyBussVisitor.visitingTime === '01') {
          this.editForm.sanyBussVisitor.visitingTime = '上午'
        } else if (this.editForm.sanyBussVisitor.visitingTime === '02') {
          this.editForm.sanyBussVisitor.visitingTime = '下午'
        } else if (this.editForm.sanyBussVisitor.visitingTime === '03') {
          this.editForm.sanyBussVisitor.visitingTime = '全天'
        }
      },
      // 查看图片
      checkPicture(index, row){
        this.checkPictureInformationVisible = true
        this.currentImg = row.imgUrl
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
  /deep/.el-form-item__content{
    margin-left: 0px;
  }
</style>

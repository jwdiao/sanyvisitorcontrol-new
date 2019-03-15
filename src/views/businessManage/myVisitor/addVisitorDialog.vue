<template>
<div>
<el-dialog
  title="我的访客信息"
  :close-on-click-modal="false"
  :visible.sync="dialogVisibles"
  @close="handleDialogClose"
  width="1200px">
    <div class="addVisitorDialog">
      <!-- 表单 -->
      <el-form :model="formInline.sanyBussVisitor" ref="editDateForm" :rules="rules"
        :inline="true"
        size="medium"
        label-width="100px"
        class="marginTop20 common-form-inline addVisitorDialog_form"
        >
          <el-form-item label="到访日期" prop="planBeginTime">
            <el-date-picker
              v-model="formInline.sanyBussVisitor.planBeginTime"
              type="date"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              :default-value="new Date()"
              :picker-options="pickerOptionsStart"
              placeholder="选择到访日期">
            </el-date-picker>
          </el-form-item>
         <!-- <el-form-item label="结束时间" prop="planEndTime">
            <el-date-picker
              v-model="formInline.sanyBussVisitor.planEndTime"
              type="datetime"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
              :default-valsue="new Date()"
              :picker-options="pickerOptionsEnd"
              placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>-->
        <el-form-item label="拜访时间" prop="visitingTime">
          <el-select v-model="formInline.sanyBussVisitor.visitingTime" placeholder="请选择">
            <el-option
              v-for="item in visitingTimeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
          <el-form-item label="来访人数量">
            <el-input-number :controls="false" disabled v-model="formInline.sanyBussVisitor.vistorNum" @change="handleInputPersonNum" :min="formInline.sanyBussVisitor.vistorNum" @blur="blurVisitorNum()"></el-input-number>
          </el-form-item>
          <el-form-item label="是否驾车">
            <el-select v-model="formInline.sanyBussVisitor.isCar" placeholder="请选择">
              <el-option
                v-for="item in isDriveCarOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="驾车数量" v-show="formInline.sanyBussVisitor.isCar==='1'">
            <el-input-number :controls="true" v-model="formInline.sanyBussVisitor.carNum" :min="1" @change="handleInputCarNum"></el-input-number><!--@change="handleInputCarNum"-->
          </el-form-item>
          <el-form-item label="拜访原因">
            <el-input
              style="width:930px;"
              type="textarea"
              :rows="4"
              placeholder="请输入原因"
              v-model="formInline.sanyBussVisitor.reason">
            </el-input>
          </el-form-item>
        <div>
          <el-form-item>
            <el-button type="primary" @click="handleInputPersonNum" >新增</el-button> &nbsp;&nbsp;
            <el-tooltip content="点击新增，增加来访人员列表数量" placement="top">
              <img src="../../../../src/assets/images/imageSize.png" style="vertical-align: middle" alt="">
            </el-tooltip>
          </el-form-item>
        </div>
      </el-form>
      <!-- 表单 end -->
      <!-- 来访人表格 start -->
      <!-- v-if="formInline.sanyBussVisitorDetailsList.length>0" -->
      <div
        class="addVisitorDialog_table addVisitorDialog_personTable">
        <table>
          <thead>
          <tr>
            <th>序号</th>
            <th>拜访人姓名</th>
            <th>电话号码</th>
            <th>身份证号</th>
            <th>车牌号</th>
            <!--<th>下发状态</th>-->
            <th> 上传&nbsp;&nbsp;&nbsp;

            </th>
            <th>查看图片</th>
            <th>操作</th>
          </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in formInline.sanyBussVisitorDetailsList" :key="index" >

              <td v-text="index+1">1</td>
              <td style="position: relative">
                <el-input v-model="item.visitorName" :class="{regIsNull:regIsName}"  placeholder="请输入姓名" @blur="blurUserName(item.visitorName)" @change="inputChangeName(item.visitorName)"></el-input>
                <span style="position:absolute;top: 22px;left: 0px;color: #f56c6c;">*</span>
                <div v-show="isShowUserName" style="color: #F56C6C;text-align: left;position: absolute;top: 52px;left: 8px;" >请输入姓名</div>
              </td>
              <td style="position: relative">
                <el-input v-model="item.phone" :class="{regIsNull:regIsNull}" placeholder="请输入电话" @blur="blurPhone(item.phone)" @change="regTel(item.phone)"></el-input>
                <span style="position:absolute;top: 22px;left: 0px;color: #f56c6c;">*</span>
                <div v-show="isShowPhone" style="color: #F56C6C;text-align: left;position: absolute;top: 52px;left: 8px;" >请输入电话</div>
              </td>
              <td style="position: relative">
                <el-input v-model="item.visitorId" :class="{regIsNull:regIsIDCard}" placeholder="请输入身份证号" @blur="blurIdCard(item.visitorId)" @change="regID(item.visitorId)"></el-input>
                <span style="position:absolute;top: 22px;left: 0px;color: #f56c6c;">*</span>
                <div v-show="isShowIDCard" style="color: #F56C6C;text-align: left;position: absolute;top: 52px;left: 8px;" >请输入身份证号</div>
              </td>
              <td>
                <el-input v-model="item.carNo" placeholder="请输入车牌号"></el-input>
              </td>
              <!--<td>-->
                <!--<el-input v-model="item.downStatus" placeholder="下发状态"></el-input>-->
              <!--</td>-->
              <td>
                <div @click="handleClickUpload(index)">
                  <el-upload
                    class="upload-demo"
                    :ref="getUpload(index)"
                    :id="getUpload(index)"
                    action="string"
                    accept="image/jpeg,image/png,image/jpg"
                    list-type="picture"
                    :show-file-list="false"
                    :before-upload="onBeforeUploadImage"
                    :http-request="UploadImage"
                    :file-list="item.fileList"
                    >
                      <div  v-show="!item.imgUrl"><el-button size="small" type="primary">点击上传</el-button>&nbsp;&nbsp;
                        <el-tooltip content="只能上传jpg/png文件，且大小不超过2M" placement="top">
                          <img src="./images/imageSize.png" style="vertical-align: middle" alt="">
                        </el-tooltip>
                      </div>
                      <div v-show="item.imgUrl"><el-button size="small" type="primary" >重新上传</el-button>&nbsp;&nbsp;
                        <el-tooltip content="只能上传jpg/png文件，且大小不超过2M" placement="top">
                          <img src="./images/imageSize.png" style="vertical-align: middle" alt="">
                        </el-tooltip></div>
                  </el-upload>
                </div>
              </td>
              <td>
                <el-button
                  size="mini"
                  type="text"
                  v-show="item.imgUrl"
                  @click="handleLookImg(item, index)">查看图片</el-button>
              </td>
              <td>
                <el-button type="danger" size="mini" :disabled="deleteDisabled" @click="deleteSingleLine(item,index)">删除</el-button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- 来访人表格 end -->
      <!-- 车辆 start -->
      <!--<div class="addVisitorDialog_table addVisitorDialog_carTable" v-if="formInline.sanyBussVisitorCarList.length>0 && formInline.sanyBussVisitor.isCar==='1'">
        <table>
          <thead>
            <tr>
              <th>序号</th>
              <th>车牌号码</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in formInline.sanyBussVisitorCarList" :key="index">
              <td v-text="index+1"></td>
              <td>
                <el-input v-model="item.carNo" placeholder="请输入车牌号"></el-input>
              </td>
            </tr>
          </tbody>
        </table>
      </div>-->
      <!-- 车辆 end -->
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleDialogCancle">取 消</el-button>
      <el-button type="primary" @click="handleDialogConfirm">确 定</el-button>
    </span>
</el-dialog>
<!-- 查看图片 -->
      <el-dialog title="图片信息"
                 :visible.sync="dialogVisibleImg"
                 :close-on-click-modal="false"
                 class="edit-form">
          <div class="inputText" style="display: flex;justify-content: center;align-items: center;overflow: hidden;">
              <img :src="lookCurrentImgUrl" alt="" style="max-width:100%;">
          </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="dialogVisibleImg=false">取消</el-button>
        </div>
      </el-dialog>
      <!-- 查看图片end -->
</div>
</template>
<script>
import {
  addApplyRequest,
  fileUploadRequest
} from '../../../api/businessManageApi'

import {checkPhone,checkIDCard} from "../../../util/regExp";

export default {
  name: 'AddVisitorDialog',
  props: ['visible'],
  watch: {
    visible (val) {
      this.dialogVisibles = val
    }
  },
  data () {
    return {
      deleteDisabled:false,//删除按钮是否可点击
      regIsNull:false,//动态添加Class
      regIsIDCard:false,//动态添加Class
      regIsName:false,//动态添加Class
      isShowUserName:false,////是否显示提示姓名
      isShowPhone:false,////是否显示提示手机号
      isShowIDCard:false,////是否显示提示身份证
      currentUploadIndex: 0, // 上传图片的index
      dialogVisibleImg: false, // 查看图片弹窗是否显示
      dialogVisibles: this.visible, // 弹窗显示
      isCar: '0', // 是否驾车
      isDriveCarOptions: [{ // 是否驾车下拉
        value: '1',
        label: '是'
      }, {
        value: '0',
        label: '否'
      }],
      visitingTimeOptions:[{
        label: '上午',
        value: '01',
      },{label: '下午',
        value: '02',},
        {label: '全天',
          value: '03',}],
      pickerOptionsStart: { // 拜访开始时间
        disabledDate(time) {
          return time.getTime() < Date.now()- 3600*1000*24;
        }
      },
      pickerOptionsEnd:{ // 拜访结束时间
        disabledDate:(time) =>{
          return time.getTime() < new Date(this.formInline.sanyBussVisitor.planBeginTime).getTime() || time.getTime() > new Date(this.formInline.sanyBussVisitor.planBeginTime).getTime()
        }
      },
      rules: {
          planBeginTime: [
            { required: true, message: '请选择开始时间', trigger: 'blur' },
          ],
          /*planEndTime: [
            { required: true, message: '请选择结束时间', trigger: 'blur' }
          ]
*/
      },
      formInline: {
        sanyBussVisitor: {
          planBeginTime: '', // 拜访开始时间
          // planEndTime: '', // 拜访结束时间
          visitingTime: '', // 拜访时间
          vistorNum: 1, // 来访人数量
          isCar: '0', // 是否驾车
          carNum: '', // 驾车数量
          reason: '', // 拜访原因
        },
        sanyBussVisitorDetailsList: [
          {
            visitorName: '', // 访客姓名
            phone: '', // 手机号码
            visitorId: '', // 访客身份证号
            imgUrl: '', // 照片路径
            carNo:'',//车牌号
          }
        ], // 来访人对象
        sanyBussVisitorCarList: [], // 车辆信息
      },
      lookCurrentImgUrl: '' // 查看图片的地址
    }
  },
  mounted () {

  },
  methods: {
    handleClickUpload (index) {
      this.currentUploadIndex = index
    },
    getUpload (index) {
      return `uploadPerson${index}`
    },
    onBeforeUploadImage(file) {
      const isIMAGE = file.type === 'image/jpeg' || 'image/jpg' || 'image/png'
      const isLt1M = file.size / 1024 / 1024 < 2
      if (!isIMAGE) {
        this.$message.error('上传文件只能是图片格式!')
      }
      if (!isLt1M) {
        this.$message.error('上传文件大小不能超过 2MB!')
      }
      return isIMAGE && isLt1M
    },
    async UploadImage(param){
      var uploadObj = `uploadPerson${this.currentUploadIndex}`
      var formData = new FormData(document.getElementById(`${uploadObj}`));
      formData.append('file', param.file)
      const res = await fileUploadRequest(formData)
      if(res&&res.status===200){
        this.$message({
          type:'success',
          message:'上传成功'
        })
        let {code,data,msg} = res.data;
        this.formInline.sanyBussVisitorDetailsList[this.currentUploadIndex].imgUrl = data
      }
    },
    // 查看
    handleLookImg (item, index) {
      this.dialogVisibleImg = true;
      this.currentUploadIndex = index;
      this.lookCurrentImgUrl = this.formInline.sanyBussVisitorDetailsList[this.currentUploadIndex].imgUrl
    },
    // 输入来访人数,动态增加来访人员表格
    handleInputPersonNum() {
      var detailListLength = this.formInline.sanyBussVisitorDetailsList.length
      this.formInline.sanyBussVisitor.vistorNum = detailListLength+1
      var detailListObj =
        {visitorName: '', // 访客姓名
          phone: '', // 手机号码
          visitorId: '', // 访客身份证号
          imgUrl: '' ,// 照片路径
          carId: ''} // 车牌号
      this.formInline.sanyBussVisitorDetailsList.splice(detailListLength,0,detailListObj)
      this.formInline.sanyBussVisitorDetailsList.length<=1 ? this.deleteDisabled = true : this.deleteDisabled = false
    },
    blurVisitorNum(){
      this.formInline.sanyBussVisitor.vistorNum = this.formInline.sanyBussVisitorDetailsList.length
    },
    //输入车辆数,必须小于人数
     handleInputCarNum(){
      let {carNum,vistorNum} = this.formInline.sanyBussVisitor
       if(carNum > vistorNum){
         this.formInline.sanyBussVisitor.carNum = this.formInline.sanyBussVisitor.vistorNum-1
        this.$message({
          type:'error',
          message:'输入车辆必须小于人员数量'
        })
         return
       }
     },
    // 输入车辆数,动态增加车辆表格
   /* handleInputCarNum() {
      let carNum = this.formInline.sanyBussVisitor.carNum
      this.formInline.sanyBussVisitorCarList = []
      if (carNum <= 0) {
        return;
      }
      for (var i = 0; i< carNum; i++) {
        this.formInline.sanyBussVisitorCarList.push(
          {
            carNo: '', // 车牌号
          }
        )
      }
    },*/
    // 新增确定按钮
    handleDialogConfirm() {
      this.$refs.editDateForm.validate(async (valid) => {
        if (!valid) return;
          const {sanyBussVisitorDetailsList} = this.formInline
        for (var i = 0; i <  sanyBussVisitorDetailsList.length; i++) {
            if(sanyBussVisitorDetailsList[i].visitorName === ''){
              this.regIsName= true
              this.isShowUserName= true
            }else if(sanyBussVisitorDetailsList[i].phone === ''){
              this.regIsNull= true
              this.isShowPhone= true
            }else if(sanyBussVisitorDetailsList[i].visitorId === ''){
              this.regIsIDCard= true
              this.isShowIDCard= true
            }
          if(sanyBussVisitorDetailsList[i].visitorName === '' ||sanyBussVisitorDetailsList[i].visitorId === ''||sanyBussVisitorDetailsList[i].phone === ''){
            return
          }
        }
        this.dialogVisibles = false
        this.$emit('dialogvisible', this.dialogVisibles)
        // Source：1表示从我的访客信息[全部员工]页面过来的添加信息
        this.formInline.source = 1
        this.addApplyRequestData(this.formInline)
      });

    },
    // 新增请求数据接口
    async addApplyRequestData(param) {
      const res = await addApplyRequest(param);
      // console.log('请求添加接口：',res)
      if (!res || res.data.code!==200) {
        this.$message({
          type: 'error',
          message: res.data.msg
        });
        return;
      }
      this.$message({
        type: 'success',
        message: res.data.data
      });
      // 新增完之后清空
      this.formInline.sanyBussVisitor = {
        vistorNum: 1, // 来访人数量
        isCar: '0', // 是否驾车
        carNum: '', // 驾车数量
        reason: '', // 拜访原因
        planBeginTime: '', // 拜访开始时间
        // planEndTime: '', // 拜访结束时间
        visitingTime: '', // 拜访时间
      }
      this.formInline.sanyBussVisitorDetailsList = [{visitorName: '', // 访客姓名
        phone: '', // 手机号码
        visitorId: '', // 访客身份证号
        imgUrl: '' ,// 照片路径
        carId: ''}]
      this.formInline.sanyBussVisitorCarList = []
      this.dialogVisibles = false
      this.$emit('confirmadddialog', this.dialogVisibles)
    },
    // 取消
    handleDialogCancle() {
      this.dialogVisibles = false
      // 新增完之后清空
      this.formInline.sanyBussVisitor = {
        vistorNum: 1, // 来访人数量
        isCar: '0', // 是否驾车
        carNum: '', // 驾车数量
        reason: '', // 拜访原因
        planBeginTime: '', // 拜访开始时间
        // planEndTime: '', // 拜访结束时间
        visitingTime: '', // 拜访时间
      }
      this.formInline.sanyBussVisitorDetailsList = [{visitorName: '', // 访客姓名
        phone: '', // 手机号码
        visitorId: '', // 访客身份证号
        imgUrl: '' ,// 照片路径
        carId: ''}]
      this.formInline.sanyBussVisitorCarList = []
      this.dialogVisibles = false
      this.$emit('cancleadddialog', this.dialogVisibles)
    },
    // 弹窗关闭的回调
    handleDialogClose() {
      this.dialogVisibles = false
      // 新增完之后清空
      this.formInline.sanyBussVisitor = {
        vistorNum: 1, // 来访人数量
        isCar: '0', // 是否驾车
        carNum: '', // 驾车数量
        reason: '', // 拜访原因
        planBeginTime: '', // 拜访开始时间
        // planEndTime: '', // 拜访结束时间
        visitingTime: '', // 拜访时间
      }
      this.formInline.sanyBussVisitorDetailsList = [{visitorName: '', // 访客姓名
        phone: '', // 手机号码
        visitorId: '', // 访客身份证号
        imgUrl: '' ,// 照片路径
        carId: ''}]
      this.formInline.sanyBussVisitorCarList = []
      this.dialogVisibles = false
      this.$emit('confirmadddialog', this.dialogVisibles)
    },
    regTel(val){
      checkPhone(val,this)
      console.log('tel:',val)
      val===''? this.regIsNull= true: this.regIsNull= false
    },
    regID(val){
      checkIDCard(val,this)
      val===''? this.regIsIDCard= true: this.regIsIDCard= false
    },
    inputChangeName(visitorName){
       visitorName===''? this.regIsName= true: this.regIsName= false
    },
    blurUserName(val){
      val===''? this.regIsName= true: this.regIsName= false
      val===''? this.isShowUserName= true: this.isShowUserName= false
    },
    blurPhone(val){
      val===''? this.regIsNull= true: this.regIsNull= false
      val===''? this.isShowPhone= true: this.isShowPhone= false
    },
    blurIdCard(val){
      val===''? this.regIsIDCard= true: this.regIsIDCard= false
      val===''? this.isShowIDCard= true: this.isShowIDCard= false
    },
    //单独删除每一行，，
    deleteSingleLine(item,index){
      if(this.formInline.sanyBussVisitorDetailsList.length<=1){
        this.deleteDisabled = true   //删除按钮不可点击
        this.$message({message:'删除失败,默认保留一行'})
        return
      }
      this.formInline.sanyBussVisitorDetailsList.splice(index,1)
      this.formInline.sanyBussVisitor.vistorNum = this.formInline.sanyBussVisitorDetailsList.length
      this.formInline.sanyBussVisitor.carNum = this.formInline.sanyBussVisitor.vistorNum
    }
  }
}
</script>
<style lang="scss" scoped>
.addVisitorDialog{
  &_form{
    // width:1100px;
    .el-input-number{
      width: 100%;
    }
    /deep/ .el-select{
      display:block;width:216px;
    }
    /deep/ .el-input{
      width: 216px;
    }
  }
  &_table{
    table{
      width: 100%;
      font-size: 14px;
      text-align: left;
      th{
        background-color: #dee3e9;
        color: #33475d;font-weight: bold;
      }
      tbody{
        background-color: #fff;
      }
      tr{
        border-bottom: 1px solid #ebeef5;
      }
      td,th{
        padding: 12px 10px;

      }
    }
  }
  &_personTable{
    th,td{
      text-align: center;
    }
    th:nth-child(1) {
      width: 50px;
    }
    th:nth-child(2) {
      width: 150px;
    }
    th:nth-child(3) {
      width: 150px;
    }
    th:nth-child(4) {
      width: 200px;
    }
    th:nth-child(5) {
      width: 150px;
    }
    th:nth-child(6) {
      width: 150px;
    }
  }
  &_carTable{
    margin-top:50px;
    th,td{
      text-align: center;
    }
    th:nth-child(1) {
      width: 80px;
    }
    th:nth-child(2) {
      // width: 200px;
    }
  }
  &_cameraArea{
    width:400px;height:400px;
  }
  .tableForm {
    .tableInput{
      width:130px ;
    }
  }
  .regIsNull{
    /deep/ .el-input__inner{
      border: 1px solid #F56C6C;
      border-radius: 5px;
    }
  }
}


</style>


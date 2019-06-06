<template>
<div>
<el-dialog
  title="新增我的访客信息" v-dialogDrag
  :close-on-click-modal="false"
  :visible.sync="dialogVisibles"
  @close="handleDialogClose"
  width="1120px">
    <div class="addVisitorDialog"
         v-loading="loadingDialog"
        element-loading-text="数据提交中"
         element-loading-spinner = 'el-icon-loading'
         element-loading-background="rgba(255,255,255,0.8)"
    >
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
              @change="selectDateValueControl"
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
          <el-select v-model="formInline.sanyBussVisitor.visitingTime" :disabled="isSelected" placeholder="请选择">
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
            <el-select v-model="formInline.sanyBussVisitor.isCar"  placeholder="请选择" @change="isCarNum">
              <el-option
                v-for="item in isDriveCarOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        <el-form-item label="访客类型">
          <el-select v-model="isVip" placeholder="请选择" @change="isVipChange">
            <el-option
              v-for="item in isVipOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <!--20190515-->
        <el-form-item label="访客园区">
          <el-select v-model="visitorPark" placeholder="请选择" @change="visitorParkChange">
            <el-option
              v-for="item in visitorParkOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
          <!--<el-form-item label="驾车数量" v-show="formInline.sanyBussVisitor.isCar==='1'">
            <el-input-number :controls="true" v-model="formInline.sanyBussVisitor.carNum" :min="1" @change="handleInputCarNum"></el-input-number>&lt;!&ndash;@change="handleInputCarNum"&ndash;&gt;
          </el-form-item>-->
          <el-form-item label="拜访原因">
            <el-input
              style="width:905px;"
              type="textarea"
              :rows="4"
              placeholder="请输入原因"
              v-model="formInline.sanyBussVisitor.reason">
            </el-input>
          </el-form-item>
        <div>
          <el-form-item>
            <el-button class="btnIsBlue" type="primary" style="width: 100px" @click="handleInputPersonNum" >新增</el-button> &nbsp;&nbsp;
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
            <th>性别</th>
            <th>电话号码</th>
            <th>身份证号</th>
            <th>车牌号</th>
            <!--<th>二维码次数</th>-->
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
                <!--regIsName-->
                <el-input v-model="item.visitorName" :class="{regIsNull:item.visitorName===''　&& isShowUserName ?true:false}" @focus="focusUserName(item.visitorName,index)"  placeholder="请输入姓名" @blur="blurUserName(item.visitorName,index)" @change="inputChangeName(item.visitorName)"></el-input>
                <span style="position:absolute;top: 22px;left: 0px;color: #f56c6c;">*</span>
                <!--isShowUserName-->
                <div v-if="isShowUserName" v-show="item.visitorName===''?true:false" style="color: #F56C6C;text-align: left;position: absolute;top: 60px;left: 8px;" >请输入姓名</div>
              </td>
              <td style="position: relative">
                <el-radio v-model="item.gender" label='1'>男</el-radio>
                <el-radio v-model="item.gender" label='2'>女</el-radio>
                <span style="position:absolute;top: 22px;left: 0px;color: #f56c6c;">*</span>
                <div v-if="isShowGender" v-show="item.gender===''?true:false" style="color: #F56C6C;text-align: left;position: absolute;top: 60px;left: 8px;" >请选择性别</div>
              </td>
              <td style="position: relative">
                <!--regIsNull-->
                <el-input v-model="item.phone" :class="{regIsNull:item.phone==='' && isShowPhone ?true:false}" placeholder="请输入电话" @blur="blurPhone(item.phone)" @change="regTel(item.phone,index)"></el-input>
                <span style="position:absolute;top: 22px;left: 0px;color: #f56c6c;">*</span>
                <!--isShowPhone-->
                <div v-if="isShowPhone" v-show="item.phone===''? true : false" style="color: #F56C6C;text-align: left;position: absolute;top: 60px;left: 8px;" >请输入电话</div>
              </td>
              <td style="position: relative">
                <!--regIsIDCard-->
                <!--<el-input v-model="item.visitorId" :class="{regIsNull:item.visitorId==='' && isShowIDCard?true:false}" placeholder="请输入身份证号" @blur="blurIdCard(item.visitorId)" @change="regID(item.visitorId,index)"></el-input>-->
                <el-input v-model="item.visitorId" placeholder="请输入身份证号" @blur="blurIdCard(item.visitorId)" @change="regID(item.visitorId,index)"></el-input>
                <!--<span style="position:absolute;top: 22px;left: 0px;color: #f56c6c;">*</span>-->
                <!--isShowIDCard-->
                <!--<div v-if="isShowIDCard" v-show="item.visitorId===''?true:false" style="color: #F56C6C;text-align: left;position: absolute;top: 60px;left: 8px;" >请输入身份证号</div>-->
              </td>
              <td style="position: relative">
                <!-- regIsNull:item.carNo===''　&&　isShowCarNo　?true:false -->
                <!--<el-input v-model="item.carNo" :disabled="formInline.sanyBussVisitor.isCar === '0' ? true : false"  :class="{regIsNull:item.carNo==='' && formInline.sanyBussVisitor.isCar === '1'?true:false}"  placeholder="请输入车牌号" @blur="blurCarNo" @change="regCarNo(item.carNo,index)"></el-input>
                <div v-show="item.carNo==='' && formInline.sanyBussVisitor.isCar === '1' ? true : false" style="color: #F56C6C;text-align: left;position: absolute;top: 60px;left: 8px;" >请输入车牌号</div>-->
                <el-input v-model="item.carNo" :disabled="formInline.sanyBussVisitor.isCar === '0' ? true : false"  :class="{regIsNull:isHavecarNo}"  placeholder="请输入车牌号" @blur="blurCarNo" @change="regCarNo(item.carNo,index)"></el-input>
                <div v-show="isHavecarNo" style="color: #F56C6C;text-align: left;position: absolute;top: 60px;left: 8px;" >请输入车牌号</div>
              </td>
              <!--<td>
                <el-input v-model="item.countCard" placeholder="二维码次数"></el-input>
              </td>-->
              <!--<td>-->
                <!--<el-input v-model="item.downStatus" placeholder="下发状态"></el-input>-->
              <!--</td>-->
              <td style="display: flex; align-items: center; justify-content: center; margin-top: 7px">
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
                      <div  v-show="!item.imgUrl">
                        <el-button size="small" type="primary" class="btnIsBlue">点击上传</el-button>&nbsp;&nbsp;

                      </div>
                      <div v-show="item.imgUrl">
                        <el-button size="small" type="primary" class="btnIsBlue" >重新上传</el-button>&nbsp;&nbsp;
                        <!--<el-tooltip content="只能上传jpg/png文件，且大小不超过2M" placement="top">
                          <img src="./images/imageSize.png" style="vertical-align: middle" alt="">
                        </el-tooltip>-->
                      </div>
                  </el-upload>
                </div>
                <el-tooltip content="只能上传jpg/png文件，且大小不超过2M" placement="top">
                  <img src="./images/imageSize.png" style="vertical-align: middle" alt="">
                </el-tooltip>
              </td>
              <td>
                <el-button
                  size="mini"
                  type="text"
                  v-show="item.imgUrl"
                  @click="handleLookImg(item, index)">查看图片</el-button>
              </td>
              <td>
                <el-button type="danger" style="width: 80px;height:32px;" size="mini" :disabled="deleteDisabled" @click="deleteSingleLine(item,index)">删除</el-button>
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
      <el-button class="btnIsBlue" type="primary" @click="handleDialogConfirm">确 定</el-button>
    </span>
</el-dialog>
<!-- 查看图片 -->
<el-dialog title="图片信息" v-dialogDrag
           :visible.sync="dialogVisibleImg"
           :close-on-click-modal="false"
           class="edit-form">
    <div class="inputText" style="display: flex;justify-content: center;align-items: center;overflow: hidden;">
        <img :src="lookCurrentImgUrl" alt="" style="width:100%;">
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
import {reqBookParkArr} from '../../../api/loginApi'
import {reqAddVisitorSuccessReq,reqrRegIDCard,reqCarsNumber} from '../../../api'
import {checkPhone,checkIDCard,checkCarCard} from "../../../util/regExp";
import {isInnerIPFn} from '../../../util/isInnerIP'
export default {
  name: 'AddVisitorDialog',
  props: ['visible'],
  watch: {
    visible (val) {
      this.dialogVisibles = val
      this.visitorPark = '回龙观园区'
      this.visitorParkCode = '01'
      this.isVip = '一般访客'
    }
  },
  data () {
    return {
      loadingDialog:false,//20190606弹窗加载中
      isSelected:false,//0401选择当天时，只能选择下午
      deleteDisabled:false,//删除按钮是否可点击
      regIsNull:false,//动态添加Class
      regIsIDCard:false,//动态添加Class
      regIsName:false,//动态添加Class
      isShowUserName:false,////是否显示提示姓名
      isShowPhone:false,////是否显示提示手机号
      isShowIDCard:false,////是否显示提示身份证
      isShowGender:false,////是否显示提示性别
      isHavecarNo:false,//当选择驾车时，多个人员同时访问时，车牌号必须至少包含有一个车牌20190508
      currentUploadIndex: 0, // 上传图片的index
      dialogVisibleImg: false, // 查看图片弹窗是否显示
      dialogVisibles: this.visible, // 弹窗显示
      isTelephonetrue:false,//验证手机号是否可以点击确定
      isIDCardtrue:false,//验证身份证是否可以点击确定
      isCar: '0', // 是否驾车
      isDriveCarOptions: [{ // 是否驾车下拉
        value: '1',
        label: '是'
      }, {
        value: '0',
        label: '否'
      }],
      isVip:'一般访客',
      isVipOptions: [{ // 访客是否VIP
        label: 'Vip',
        value: '1',
      }, {
        label: '一般访客',
        value: '0',
      }],
      visitorPark:'回龙观园区',
      visitorParkCode:'01',
      visitorParkOptions:[],
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
          visitingTime: '03', // 拜访时间
          vistorNum: 1, // 来访人数量
          isCar: '0', // 是否驾车
          isVip:0,//是否VIP
          carNum: 0, // 驾车数量
          reason: '', // 拜访原因
        },
        sanyBussVisitorDetailsList: [
          {
            visitorName: '', // 访客姓名
            gender:'1',//性别 1男  2女
            phone: '', // 手机号码
            visitorId: '', // 访客身份证号
            imgUrl: '', // 照片路径
            carNo:'',//车牌号
            countCard:'',//二维码次数
          }
        ], // 来访人对象
        sanyBussVisitorCarList: [], // 车辆信息
      },
      lookCurrentImgUrl: '' // 查看图片的地址
    }
  },
  mounted () {
    //获取访客访客园区
    this.getVisitorPark()
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
      //根据内外网访问图片  isInnerIp:true为内网 false：外网
      const isInnerIp = isInnerIPFn().isInnerIp
      console.log('isInnerIp:',isInnerIp)
      if(isInnerIp){
        this.lookCurrentImgUrl = `http://10.19.8.21:8181${this.formInline.sanyBussVisitorDetailsList[this.currentUploadIndex].imgUrl.slice(22)}`
      }else{
        this.lookCurrentImgUrl = `http://222.240.233.67:8181${this.formInline.sanyBussVisitorDetailsList[this.currentUploadIndex].imgUrl.slice(22)}`
      }
    },
    // 输入来访人数,动态增加来访人员表格
    handleInputPersonNum() {
      var detailListLength = this.formInline.sanyBussVisitorDetailsList.length
      this.formInline.sanyBussVisitor.vistorNum = detailListLength+1
      var detailListObj =
        {visitorName: '', // 访客姓名
          phone: '', // 手机号码
          gender:'1',//性别
          visitorId: '', // 访客身份证号
          imgUrl: '' ,// 照片路径
          carNo: ''} // 车牌号
      this.formInline.sanyBussVisitorDetailsList.splice(detailListLength,0,detailListObj)
      this.formInline.sanyBussVisitorDetailsList.length<=1 ? this.deleteDisabled = true : this.deleteDisabled = false
    },
    blurVisitorNum(){
      this.formInline.sanyBussVisitor.vistorNum = this.formInline.sanyBussVisitorDetailsList.length
    },
    //是否VIP
    isVipChange(val){
      let obj = {};
      obj = this.isVipOptions.find((item)=>{
        return item.value === val;
      });
      this.isVip = obj.label
      this.formInline.sanyBussVisitor.isVip =Number(obj.value)
      console.log('this.formInline.sanyBussVisitor.isVip:',this.formInline.sanyBussVisitor.isVip)
    },
    //园区选择20190515
    visitorParkChange(val){
      let obj = {};
      obj = this.visitorParkOptions.find((item)=>{
        return item.value === val;
      });
      this.visitorPark = obj.label
      this.visitorParkCode = obj.value
      this.formInline.sanyBussVisitorDetailsList.forEach((item,index)=>{
        if(item.carNo!==''){
          this.regCarNo(item.carNo,index)
        }
        if(item.visitorId!==''){
          this.regID(item.visitorId,index)
        }
      })
    },
    //车辆数量   是：1 否：0
    isCarNum(){
      if(this.formInline.sanyBussVisitor.isCar === '0'){
        this.formInline.sanyBussVisitor.carNum = 0
        //清空车牌号码
        this.formInline.sanyBussVisitorDetailsList.forEach(item=>{
          item.carNo = ''
        })
      }else if(this.formInline.sanyBussVisitor.isCar === '1'){
        this.formInline.sanyBussVisitor.carNum = 1
      }
      console.log(this.formInline.sanyBussVisitor.carNum)
    },

    //输入车辆数,必须小于人数
     handleInputCarNum(){
      let {carNum,vistorNum} = this.formInline.sanyBussVisitor
       /*if(carNum > vistorNum){
         this.formInline.sanyBussVisitor.carNum = this.formInline.sanyBussVisitor.vistorNum-1
        this.$message({
          type:'error',
          message:'输入车辆必须小于人员数量'
        })
         return
       }*/
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
        //添加多个时，判断车牌号是否包含有至少一个 //20190508
        var carNoArr = []
        sanyBussVisitorDetailsList.forEach(item=>{
          if(item.carNo!==''){
            carNoArr.push(item.carNo)
          }
        })
        for (var i = 0; i <  sanyBussVisitorDetailsList.length; i++) {
          if(sanyBussVisitorDetailsList[i].visitorName === ''){
            this.regIsName= true
            this.isShowUserName= true
            return
          }else if(sanyBussVisitorDetailsList[i].gender === ''){
            this.isShowGender= true
            return
          }else if(sanyBussVisitorDetailsList[i].phone === ''){
            this.regIsNull= true
            this.isShowPhone= true
            return
          }
          //20190515注释
         /* else if(sanyBussVisitorDetailsList[i].visitorId === ''){
            this.regIsIDCard= true
            this.isShowIDCard= true
            return
          }*/
          else if(carNoArr.length===0 && this.formInline.sanyBussVisitor.isCar === '1'){     //20190508
            this.isHavecarNo = true
            this.$message({type:'error',message:'请输入车牌号'})//当是驾车时，不输入车牌号就返回
            return
          }else{
            this.isHavecarNo = false
          }
        }
        if(this.isTelephonetrue){
            this.$message({type:'error',message:'手机号码输入不正确'})
            return
        }
      /*  if(this.isIDCardtrue){   //20190524注释
            this.$message({type:'error',message:'身份证号码输入不正确'})
            return
        }*/
        if(this.checkCarCardBoolean){
          this.$message({type:'error',message:'车牌号码输入不正确'})
          return
        }

        if(this.formInline.sanyBussVisitor.visitingTime === '下午'){
          this.formInline.sanyBussVisitor.visitingTime = '02'
        }else if(this.formInline.sanyBussVisitor.visitingTime === '全天'){
          this.formInline.sanyBussVisitor.visitingTime = '03'
        }
        // this.dialogVisibles = false
        // this.$emit('dialogvisible', this.dialogVisibles)
        // Source：1表示从我的访客信息[全部员工]页面过来的添加信息
        const {planBeginTime,visitingTime,vistorNum,isCar,isVip,carNum,reason} = this.formInline.sanyBussVisitor
        // const [{visitorName,gender,phone,visitorId,imgUrl,carNo,countCard}] = this.formInline.sanyBussVisitorDetailsList
          var params =   this.formInline.sanyBussVisitorDetailsList
        console.log('this.sanyBussVisitor:',this.formInline.sanyBussVisitor)
        console.log('this.sanyBussVisitorDetailsList:',this.formInline.sanyBussVisitorDetailsList)

        this.loadingDialog = true
        this.formInline.source = 1
        this.addApplyRequestData(
          planBeginTime,visitingTime,vistorNum,isCar,isVip,carNum,reason,this.visitorParkCode,
          params,
          this.formInline.source
        )
      });


    },
    // 新增请求数据接口
    async addApplyRequestData(
      planBeginTime,visitingTime,vistorNum,isCar,isVip,carNum,reason,visitorParkCode,
      // visitorName,gender,phone,visitorId,imgUrl,carNo,countCard,
      params,
      source
    ) {
      const res = await addApplyRequest(
        planBeginTime,visitingTime,vistorNum,isCar,isVip,carNum,reason,visitorParkCode,
        // visitorName,gender,phone,visitorId,imgUrl,carNo,countCard,
        params,
        source
      );
      // console.log('请求添加接口：',res)
      if (!res || res.data.code!==200) {
        this.$message({
          type: 'error',
          message: res.data.msg
        });
        return;
      }
      this.loadingDialog = false
      /*this.$message({
        type: 'success',
        message: '新增成功'
      });*/
      //添加成功后调用的接口
      let messageInfo = res.data.data.messageDto
      let messageArr = []
      messageInfo.forEach(item=>{
        let messageObj = {}
        messageObj.qrCode= item.qrCode
        messageObj.telephone= item.telephone
        messageObj.uid= item.uid
        messageObj.verifCode= item.verifCode
        messageObj.carNo= item.carNo    //20190528发短信时内容增加车牌号信息
        messageArr.push(messageObj)
      })
      this.addVisitorSuccess(messageArr) //20190529访客有无车都发送短信
     /* if(carNum === 0){ //20190516当访客有车辆时不发送短信，没有开车时发送短信，  carNum === 0：没有车
        this.addVisitorSuccess(messageArr)
      }*/
      // 新增完之后清空
      this.formInline.sanyBussVisitor = {
        vistorNum: 1, // 来访人数量
        isCar: '0', // 是否驾车
        carNum: 0, // 驾车数量
        isVip:0,//是否VIP
        reason: '', // 拜访原因
        planBeginTime: '', // 拜访开始时间
        // planEndTime: '', // 拜访结束时间
        visitingTime: '03', // 拜访时间
      }
      this.formInline.sanyBussVisitorDetailsList = [{visitorName: '', // 访客姓名
        phone: '', // 手机号码
        visitorId: '', // 访客身份证号
        gender:'1',//性别
        imgUrl: '' ,// 照片路径
        carNo: ''}]
      this.formInline.sanyBussVisitorCarList = []
      this.dialogVisibles = false
      // this.$emit('confirmadddialog', this.dialogVisibles)
    },
    //添加成功后调用的函数
    async addVisitorSuccess(messageArr){
        const res = await reqAddVisitorSuccessReq(messageArr)
        if(res&&res.data.code===200){
          // this.$message({type:'success',message:'成功'})
        }
    },
    // 取消
    handleDialogCancle() {
      this.dialogVisibles = false
      // 新增完之后清空
      this.formInline.sanyBussVisitor = {
        vistorNum: 1, // 来访人数量
        isCar: '0', // 是否驾车
        carNum: 0, // 驾车数量
        isVip:0,//是否VIP
        reason: '', // 拜访原因
        planBeginTime: '', // 拜访开始时间
        // planEndTime: '', // 拜访结束时间
        visitingTime: '03', // 拜访时间
      }
      this.formInline.sanyBussVisitorDetailsList = [{visitorName: '', // 访客姓名
        phone: '', // 手机号码
        visitorId: '', // 访客身份证号
        gender:'1',//性别
        imgUrl: '' ,// 照片路径
        carNo: ''}]
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
        carNum: 0, // 驾车数量
        isVip:0,//是否VIP
        reason: '', // 拜访原因
        planBeginTime: '', // 拜访开始时间
        // planEndTime: '', // 拜访结束时间
        visitingTime: '03', // 拜访时间
      }
      this.formInline.sanyBussVisitorDetailsList = [{
        visitorName: '', // 访客姓名
        phone: '', // 手机号码
        visitorId: '', // 访客身份证号
        gender:'1',//性别
        imgUrl: '' ,// 照片路径
        carNo: ''}]
      this.formInline.sanyBussVisitorCarList = []
      this.dialogVisibles = false
      this.$emit('confirmadddialog', this.dialogVisibles)
    },
    regTel(val,index){
      this.isTelephonetrue = checkPhone(val,this)
      console.log('isTelephone:',this.isTelephonetrue)
      val===''? this.regIsNull= true: this.regIsNull= false
      //0401增加多个时不能有重复的cardID
      let telArr = []
      this.formInline.sanyBussVisitorDetailsList.forEach(item=>{
        telArr.push(item.phone)
      })
      telArr.splice(index,1)
      let indexNum = telArr.includes(val)
      console.log(val)
      if(indexNum===true){
        this.formInline.sanyBussVisitorDetailsList[index].phone = ''
        this.$message({type:'error',message:'您输入的手机号重复，请重新输入'})
      }
    },
    async regID(val,index){
      this.isIDCardtrue = checkIDCard(val,this)
      //0401增加多个时不能有重复的cardID
      let cardIdArr = []
      this.formInline.sanyBussVisitorDetailsList.forEach(item=>{
        cardIdArr.push(item.visitorId)
      })
      cardIdArr.splice(index,1)
      let indexNum = cardIdArr.includes(val)
      // console.log('indexNum:',indexNum)
      // console.log('cardIdArr:',cardIdArr)
      if(indexNum===true){
        this.formInline.sanyBussVisitorDetailsList[index].visitorId = ''
        this.$message({type:'error',message:'输入的身份证重复，请重新输入'})
      }

      const res = await reqrRegIDCard(val,this.visitorParkCode)
      if(res&&res.data.code!==200){
        if(val==='') return
        this.$message({
          type:'error',
          message:res.data.msg
        })
        this.formInline.sanyBussVisitorDetailsList[index].visitorId = ''
      }
      // val===''? this.regIsIDCard= true: this.regIsIDCard= false   //20190524
    },
    inputChangeName(visitorName){
       visitorName===''? this.regIsName= true: this.regIsName= false
    },
    blurUserName(val,index){
      console.log('val:',val)
      console.log('index:',index)
      val===''? this.regIsName= true: this.regIsName= false
      val===''? this.isShowUserName= true: this.isShowUserName= false
    },
    blurPhone(val){
      val===''? this.regIsNull= true: this.regIsNull= false
      val===''? this.isShowPhone= true: this.isShowPhone= false
    },
    blurIdCard(val){
      // val===''? this.regIsIDCard= true: this.regIsIDCard= false  //201905024
      // val===''? this.isShowIDCard= true: this.isShowIDCard= false  //201905024
    },
    blurCarNo(val){
      // val = val.replace(/\s*/g,"")
      val===''? this.isShowCarNo= true: this.isShowCarNo= false
    },
    //车牌号验证
    async regCarNo(val,index){
      this.checkCarCardBoolean = checkCarCard(val,this)
      //20190508
      let carIdArr = []
      this.formInline.sanyBussVisitorDetailsList.forEach(item=>{
        carIdArr.push(item.carNo)
      })
      carIdArr.splice(index,1)
      let indexNum = carIdArr.includes(val)
      // console.log('indexNum:',indexNum)
      // console.log('cardIdArr:',cardIdArr)
      if(indexNum===true){
        this.formInline.sanyBussVisitorDetailsList[index].carNo = ''
        this.$message({type:'error',message:'输入的身份证重复，请重新输入'})
      }
      //20190508增加车牌号后台验证
      const res = await reqCarsNumber(val,this.visitorParkCode)
      if(res.data.code!==200){
        this.formInline.sanyBussVisitorDetailsList[index].carNo = ''
        this.$message({type:'error',message:res.data.msg})
        return
      }
      //当输入车牌号后，警示框消失
      if(val!==''){
        this.isHavecarNo = false
      }
    },
    ///input聚焦
    focusUserName(val,index){
      // val = ''
      console.log('val0000000000000:',val)
    },
    //单独删除每一行，，
    deleteSingleLine(item,index){
      if(this.formInline.sanyBussVisitorDetailsList.length<=1){
        this.deleteDisabled = true   //删除按钮不可点击
        this.$message({message:'删除失败,默认保留一行'})
        return
      }
      this.$confirm('删除该条数据文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
        this.formInline.sanyBussVisitorDetailsList.splice(index,1)
        this.formInline.sanyBussVisitor.vistorNum = this.formInline.sanyBussVisitorDetailsList.length
        // this.formInline.sanyBussVisitor.carNum = this.formInline.sanyBussVisitor.vistorNum
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });

    },
    //选择日期控制上午显示
    selectDateValueControl(val){
      let dateone = new Date(new Date(new Date().toDateString()).getTime()+12*60*60*1000).getTime() //当天12点
      let datezear = new Date(new Date(new Date().toDateString()).getTime()+8*60*60*1000).getTime()    //当天8点
      let selectTime = new Date(val).getTime()
      let nowDate = Date.now()
      if(nowDate>dateone){
        if(selectTime === datezear){
          this.formInline.sanyBussVisitor.visitingTime = '下午'
          this.isSelected = true
        }else{
          this.formInline.sanyBussVisitor.visitingTime = '全天'
          this.isSelected = false
        }
      }
    },
    //20190520访客园区后台请求
    async getVisitorPark(){
      const res = await reqBookParkArr()
      if(!res && !res.data.code===200){
        return
      }
      let visitorArr = res.data.data
      visitorArr.forEach(item => {
        let visitorObj = {}
        visitorObj.value = item.parkCode
        visitorObj.label = item.parkName
        this.visitorParkOptions.push(visitorObj)
      })
    },
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
      display:block;width:235px;
    }
    /deep/ .el-input{
      width: 235px;
    }
  }
  /deep/ .el-form-item{
    margin-left: 0px!important;
    margin-right: 0px!important;
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
        padding: 15px 10px;

      }
    }
  }
  &_personTable{
    th,td{
      text-align: center;
    }
    th:nth-child(1) {
      width: 30px;
    }
    th:nth-child(2) {
      width: 120px;
    }
    th:nth-child(3) {
      width: 60px;
    }
    th:nth-child(4) {
      width: 130px;
    }
    th:nth-child(5) {
      width: 180px;
    }
    th:nth-child(6) {
      width: 115px;
    }
    th:nth-child(7) {
      width: 120px;
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
  /deep/ .el-radio{
    display: flex;
    margin-top: 10px;
    margin-left: 0px;
  }
}
/deep/ .el-loading-text{
  font-size: 20px;
}
/deep/ .el-loading-spinner i{
  font-size: 20px;
}

</style>


<template>
<div>
<el-dialog
  title="编辑我的访客信息" v-dialogDrag
  :close-on-click-modal="false"
  :visible.sync="dialogVisibles"
  @close="handleDialogClose"
  width="1120px">
    <div class="addVisitorDialog" v-if="editFormData.length !== 0">
      <!-- 表单 -->
      <el-form :model="editFormData.sanyBussVisitor" ref="editDateForm" :rules="rules"
        :inline="true"
        size="medium"
        label-width="100px"
        class="marginTop20 common-form-inline addVisitorDialog_form"
        >
          <el-form-item label="到访日期" prop="planBeginTime">
            <el-date-picker
              v-model="editFormData.sanyBussVisitor.planBeginTime" disabled
              type="date"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              :default-value="new Date()"
              :picker-options="pickerOptionsStart"
              @change="selectDateValueControl"
              placeholder="选择到访日期">
            </el-date-picker><!-- v-model="formInline.sanyBussVisitor.planBeginTime"-->
          </el-form-item>
        <el-form-item label="拜访时间" prop="visitingTime">
          <el-select v-model="editFormData.sanyBussVisitor.visitingTime" disabled placeholder="请选择">
            <el-option
              v-for="item in visitingTimeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
          <el-form-item label="来访人数量">
            <el-input-number :controls="false" disabled v-model="editFormData.sanyBussVisitor.vistorNum" @change="handleInputPersonNum" :min="formInline.sanyBussVisitor.vistorNum" @blur="blurVisitorNum()"></el-input-number>
          </el-form-item>
          <el-form-item label="是否驾车">
            <el-select v-model="editFormData.sanyBussVisitor.isCar"  placeholder="请选择" @change="isCarNum">
              <el-option
                v-for="item in isDriveCarOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        <el-form-item label="访客类型">
          <el-select disabled v-model="editFormData.sanyBussVisitorDetailsList[0].isVip === 1 ? 'Vip' : '一般访客'" placeholder="请选择" @change="isVipChange">
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
          <el-select disabled v-model="visitorPark" placeholder="请选择" @change="visitorParkChange">
            <el-option
              v-for="item in visitorParkOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
          <el-form-item label="拜访原因">
            <el-input
              style="width:905px;" disabled
              type="textarea"
              :rows="4"
              placeholder="请输入原因"
              v-model="editFormData.sanyBussVisitor.reason">
            </el-input>
          </el-form-item>

      </el-form>
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
            <tr v-for="(item, index) in editFormData.sanyBussVisitorDetailsList" :key="index" >
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
                <el-input v-model="item.phone" :class="{regIsNull:item.phone==='' && isShowPhone ?true:false}" placeholder="请输入电话" @blur="blurPhone(item.phone)" @change="regTel(item.phone)"></el-input>
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
                <el-input v-model="item.carNo" :disabled="editFormData.sanyBussVisitor.isCar === '0' || editFormData.sanyBussVisitor.isCar === '否'? true : false" :class="{regIsNull:isHavecarNo}"  placeholder="请输入车牌号" @blur="blurCarNo" @change="regCarNo(item.carNo,index)"></el-input>
                <div v-show="isHavecarNo" style="color: #F56C6C;text-align: left;position: absolute;top: 60px;left: 8px;" >请输入车牌号</div>
              </td>
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
                        <el-button size="small" type="primary" class="btnIsBlue">上传照片</el-button>&nbsp;&nbsp;

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
                <el-button
                  size="mini"
                  type="text"
                  @click="handleSendMessagesInformation(item, index)">发送信息</el-button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- 来访人表格 end -->
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleDialogCancle">取 消</el-button>
      <el-button v-show="rowList.downStatus === '已登记' " class="btnIsBlue" type="primary" @click="handleDialogConfirm">确 定</el-button>
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
  fileUploadRequest
} from '../../../api/businessManageApi'
import {reqBookParkArr} from '../../../api/loginApi'
import {reqAddVisitorSuccessReq,reqrRegIDCard,reqCarsNumber,reqSendMessageSingle,reqModifyVisitorInfo} from '../../../api'
import {checkPhone,checkIDCard,checkCarCard} from "../../../util/regExp";
import {isInnerIPFn} from '../../../util/isInnerIP'
export default {
  name: 'editVisitorDialog',
  props: ['editVisible','editFormData','rowList'],
  watch: {
    deep:true,
    editVisible (val) {
      this.dialogVisibles = val
    },
    editFormData(val) {
      if(val.sanyBussVisitorDetailsList[0].visitorParkCode === '02'){
        this.visitorPark = '南口园区'
      }else if(val.sanyBussVisitorDetailsList[0].visitorParkCode === '01'){
        this.visitorPark = '回龙观园区'
      }
      val.sanyBussVisitorDetailsList.forEach(item=>{
        if(item.gender===1){
          item.gender = '1'
        }else{
          item.gender = '2'
        }
      })
      console.log('val:',val)
    }
  },
  data () {
    return {
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
      dialogVisibles: this.editVisible, // 弹窗显示
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
          return time.getTime() < new Date(this.editFormData.sanyBussVisitor.planBeginTime).getTime() || time.getTime() > new Date(this.editFormData.sanyBussVisitor.planBeginTime).getTime()
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
    console.log('editFormObj:',this.editFormObj)
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
        this.editFormData.sanyBussVisitorDetailsList[this.currentUploadIndex].imgUrl = data
      }
    },
    // 查看
    handleLookImg (item, index) {
      this.dialogVisibleImg = true;
      this.lookCurrentImgUrl = item.imgUrl
      this.currentUploadIndex = index;
      //根据内外网访问图片  isInnerIp:true为内网 false：外网
      const isInnerIp = isInnerIPFn().isInnerIp
      if(isInnerIp){
        this.lookCurrentImgUrl = `http://10.19.8.21:8181${this.editFormData.sanyBussVisitorDetailsList[this.currentUploadIndex].imgUrl.slice(22)}`
      }else{
        this.lookCurrentImgUrl = `http://222.240.233.67:8181${this.editFormData.sanyBussVisitorDetailsList[this.currentUploadIndex].imgUrl.slice(22)}`
      }

      console.log('lookCurrentImgUrl:',item.imgUrl)
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
      this.editFormData.sanyBussVisitor.vistorNum = this.editFormData.sanyBussVisitorDetailsList.length
    },
    //是否VIP
    isVipChange(val){
      let obj = {};
      obj = this.isVipOptions.find((item)=>{
        return item.value === val;
      });
      this.editFormData.sanyBussVisitorDetailsList[0].isVip = obj.label
      this.editFormData.sanyBussVisitorDetailsList[0].isVip =Number(obj.value)//20190528
    },
    //园区选择20190515
    visitorParkChange(val){
      let obj = {};
      obj = this.visitorParkOptions.find((item)=>{
        return item.value === val;
      });
      this.visitorPark = obj.label
      this.visitorParkCode = obj.value
      this.editFormData.sanyBussVisitorDetailsList.forEach((item,index)=>{
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
      if(this.editFormData.sanyBussVisitor.isCar === '0'){
        // this.editFormData.sanyBussVisitor.isCar = 0
        //清空车牌号码
        this.editFormData.sanyBussVisitorDetailsList.forEach(item=>{
          item.carNo = ''
        })
      }else if(this.editFormData.sanyBussVisitor.isCar === '1'){
        // this.editFormData.sanyBussVisitor.isCar = 1
      }
    },

    //输入车辆数,必须小于人数
     handleInputCarNum(){
      let {carNum,vistorNum} = this.formInline.sanyBussVisitor
     },
    // 修改确定按钮
    handleDialogConfirm() {
      this.$refs.editDateForm.validate(async (valid) => {
        if (!valid) return;
          const {sanyBussVisitorDetailsList} = this.editFormData
        //添加多个时，判断车牌号是否包含有至少一个 //20190508
        var carNoArr = []
        sanyBussVisitorDetailsList.forEach(item=>{
          if(item.carNo!==''){
            carNoArr.push(item.carNo)
          }
          //访客园区
          item.visitorParkCode = this.visitorParkCode
        })

        for (var i = 0; i <  sanyBussVisitorDetailsList.length; i++) {

          if(sanyBussVisitorDetailsList[i].visitorName === ''){
            this.regIsName= true
            this.isShowUserName= true
            return
          }else if(sanyBussVisitorDetailsList[i].gender === ''){
            this.isShowGender= true
            return
          }else if(sanyBussVisitorDetailsList[i].isSub === '已登记'){//20190530增加
            sanyBussVisitorDetailsList[i].isSub = '1'
          }else if(sanyBussVisitorDetailsList[i].isSub === '未登记'){
            this.$message({message:'请登记后再编辑'})
            return
          }else if(sanyBussVisitorDetailsList[i].phone === ''){
            this.regIsNull= true
            this.isShowPhone= true
            return
          }else if(carNoArr.length===0 && this.editFormData.sanyBussVisitor.isCar === '1'){     //20190508
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
        if(this.checkCarCardBoolean){
          this.$message({type:'error',message:'车牌号码输入不正确'})
          return
        }
        if(this.editFormData.sanyBussVisitor.visitingTime === '下午'){
          this.editFormData.sanyBussVisitor.visitingTime = '02'
        }else if(this.editFormData.sanyBussVisitor.visitingTime === '全天'){
          this.editFormData.sanyBussVisitor.visitingTime = '03'
        } else if(this.editFormData.sanyBussVisitor.visitingTime === '上午'){
          this.editFormData.sanyBussVisitor.visitingTime = '01'
        }
        this.dialogVisibles = false
        this.$emit('cancleadddialog', this.dialogVisibles)
        // Source：1表示从我的访客信息[全部员工]页面过来的添加信息
        let {planBeginTime,visitingTime,vistorNum,isCar,isVip,carNum,reason} = this.editFormData.sanyBussVisitor
        this.editFormData.sanyBussVisitor.visitorParkCode = this.visitorParkCode
        var params =   this.editFormData.sanyBussVisitorDetailsList
        this.formInline.source = 1
        //调用修改接口
        this.ModifyRequestData(this.editFormData.sanyBussVisitor,params,this.formInline.source)
      });
    },
    // 新增请求数据接口
    async ModifyRequestData(mdata,params,source) {
      const res = await reqModifyVisitorInfo(mdata,params,source);
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
        message: '修改成功'
      });
      this.dialogVisibles = false
      //刷新界面
      this.$emit('confirmadddialog', this.dialogVisibles)
    },
    // 取消
    handleDialogCancle() {
      this.dialogVisibles = false
      this.$emit('cancleadddialog', this.dialogVisibles)
    },
    // 弹窗关闭的回调
    handleDialogClose() {
      this.dialogVisibles = false
      this.$emit('cancleadddialog', this.dialogVisibles)
    },
    regTel(val){
      this.isTelephonetrue = checkPhone(val,this)
      console.log('isTelephone:',this.isTelephonetrue)
      val===''? this.regIsNull= true: this.regIsNull= false
    },
    async regID(val,index){
      this.isIDCardtrue = checkIDCard(val,this)
      //0401增加多个时不能有重复的cardID
      let cardIdArr = []
      this.editFormData.sanyBussVisitorDetailsList.forEach(item=>{
        cardIdArr.push(item.visitorId)
      })
      cardIdArr.splice(index,1)
      let indexNum = cardIdArr.includes(val)
      // console.log('indexNum:',indexNum)
      // console.log('cardIdArr:',cardIdArr)
      if(indexNum===true){
        this.editFormData.sanyBussVisitorDetailsList[index].visitorId = ''
        this.$message({type:'error',message:'输入的身份证重复，请重新输入'})
      }

      const res = await reqrRegIDCard(val,this.visitorParkCode)
      if(res&&res.data.code!==200){
        if(val==='') return
        this.$message({
          type:'error',
          message:res.data.msg
        })
        this.editFormData.sanyBussVisitorDetailsList[index].visitorId = ''
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
      this.editFormData.sanyBussVisitorDetailsList.forEach(item=>{
        carIdArr.push(item.carNo)
      })
      carIdArr.splice(index,1)
      let indexNum = carIdArr.includes(val)
      // console.log('indexNum:',indexNum)
      // console.log('cardIdArr:',cardIdArr)
      if(indexNum===true){
        this.editFormData.sanyBussVisitorDetailsList[index].carNo = ''
        this.$message({type:'error',message:'输入的身份证重复，请重新输入'})
      }
      //20190508增加车牌号后台验证
      const res = await reqCarsNumber(val,this.visitorParkCode)
      if(res.data.code!==200){
        this.editFormData.sanyBussVisitorDetailsList[index].carNo = ''
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
    //选择日期控制上午显示
    selectDateValueControl(val){
      let dateone = new Date(new Date(new Date().toDateString()).getTime()+12*60*60*1000).getTime() //当天12点
      let datezear = new Date(new Date(new Date().toDateString()).getTime()+8*60*60*1000).getTime()    //当天8点
      let selectTime = new Date(val).getTime()
      let nowDate = Date.now()
      if(nowDate>dateone){
        if(selectTime === datezear){
          this.editFormData.sanyBussVisitor.visitingTime = '下午'
          this.isSelected = true
        }else{
          this.editFormData.sanyBussVisitor.visitingTime = '全天'
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
    //发送短信按钮---信息维护
    handleSendMessagesInformation(item,index){
      console.log('item:',item)
      this.$confirm('确定发送?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var messageDto = []
        var ItemObj = {}
        ItemObj.uid = item.id
        ItemObj.qrCode = item.qrCode
        ItemObj.verifCode = item.verifCode
        ItemObj.carNo = item.carNo
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
      }else {
        this.$message({
          type:'error',
          message:res.data.msg
        })
      }

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


</style>


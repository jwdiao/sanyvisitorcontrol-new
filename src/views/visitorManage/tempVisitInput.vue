<template>
     <div style="width:100%" @click="handleAllChange">
       <!-- <p class="common-breadcrumb">临时拜访录入</p> -->
       <el-form
         :inline="true"
         :model="formInline.sanyBussVisitor"
         :rules="rules"
         ref="tempVisitInputID"
         size="medium"
         label-width="100px"
         style="position:relative"
         class="marginTop20 common-form-inline tempVisitInput_form"
       >
           <el-form-item label="被拜访人" >
             <el-input
               @keyup.native="querySearch" @blur="blurVisitor"
               v-model="formInline.sanyBussVisitor.employerName">
             </el-input>
             <div class="tempVisitInput_employerName"  id="userNameClick" ref="userNameClick" v-show="employerNameSelectShow" >
               <el-scrollbar style="height:100%">
                 <ul v-show="restaurantsArr.length>0">
                   <li style="cursor: pointer;" v-for="(item,index) in restaurantsArr" :key="index" @click="handleSelect(item)">
                     {{item.name}}
                   </li>
                 </ul>
                 <div v-show="restaurantsArr.length<=0">暂无数据</div>
               </el-scrollbar>
             </div>
           </el-form-item>
           <!--<span style="position:absolute;top: 10px;left: 40px;color: #f56c6c;">*</span>-->
           <el-form-item label="到访日期" prop="planBeginTime">
             <el-date-picker
               v-model="formInline.sanyBussVisitor.planBeginTime"
               type="date"
               format="yyyy-MM-dd"
               value-format="yyyy-MM-dd"
               :default-value="new Date()"
               :picker-options="pickerOptionsStart"
               @change="selectDateValueControl"
               placeholder="选择到访日期 ">
             </el-date-picker>
           </el-form-item>
           <!--<el-form-item label="结束时间" prop="planEndTime">
             <el-date-picker
               v-model="formInline.sanyBussVisitor.planEndTime"
               type="datetime"
               format="yyyy-MM-dd HH:mm:ss"
               value-format="yyyy-MM-dd HH:mm:ss"
               :picker-options="pickerOptionsEnd"
               placeholder="选择日期时间">
             </el-date-picker>
           </el-form-item>-->
           <el-form-item label="拜访时间" prop="visitingTime" >
             <el-select v-model="formInline.sanyBussVisitor.visitingTime" :disabled="isSelected" placeholder="请选择">
               <el-option
                 v-for="item in visitingTimeOptions"
                 :key="item.value"
                 :label="item.label"
                 :disabled="item.disabled"
                 :value="item.value">
               </el-option>
             </el-select>
           </el-form-item>
           <el-form-item label="来访人数量" >
             <el-input-number :controls="false" disabled v-model="formInline.sanyBussVisitor.vistorNum" @change="handleInputPersonNum" :min="formInline.sanyBussVisitor.vistorNum" @blur="blurVisitorNum()"></el-input-number>
           </el-form-item>
           <el-form-item label="是否驾车" >
             <el-select v-model="formInline.sanyBussVisitor.isCar" placeholder="请选择" @change="isCarNum">
               <el-option
                 v-for="item in isDriveCarOptions"
                 :key="item.value"
                 :label="item.label"
                 :value="item.value">
               </el-option>
             </el-select>
           </el-form-item>
           <el-form-item label="访客类型" >
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
         <div class="tempVisitInputClass" >

           <!--<span style="position:absolute;top: 65px;left: 410px;color: #f56c6c;">*</span>-->

           <!--<el-form-item label="驾车数量" v-show="formInline.sanyBussVisitor.isCar==='1'">
             <el-input-number :controls="true" v-model="formInline.sanyBussVisitor.carNum" @change="handleInputCarNum" :min="1"></el-input-number>
           </el-form-item>-->
         </div>
         <div class="tempVisitInputClass" >
           <el-form-item label="拜访原因" >
             <el-input
               style="width: 475%;"
               type="textarea"
               :rows="4"
               placeholder="请输入原因"
               v-model="formInline.sanyBussVisitor.reason">
             </el-input>
           </el-form-item>
         </div>
         <div>
           <el-form-item>
             <el-button class="btnIsBlue" type="primary" @click="handleInputPersonNum" style="width: 100px">新增</el-button> &nbsp;&nbsp;
             <el-tooltip content="点击新增，增加来访人员列表数量" placement="top">
               <img src="../../../src/assets/images/imageSize.png" style="vertical-align: middle" alt="">
             </el-tooltip>
           </el-form-item>
         </div>
       </el-form>


       <!-- 来访人表格 start -->
       <!-- v-if="formInline.sanyBussVisitorDetailsList.length>0" -->
       <div class="tempVisitInput_table tempVisitInput_personTable">
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
             <th>拍照</th>
             <th>查看图片</th>
             <th>操作</th>
           </tr>
           </thead>
           <tbody>
           <tr v-for="(item, index) in formInline.sanyBussVisitorDetailsList" :key="index">
             <td v-text="index+1">1</td>
             <td style="position: relative">
               <!--regIsName-->
               <el-input v-model="item.visitorName" :class="{regIsNull:item.visitorName==='' && isShowUserName ?true:false}" placeholder="请输入姓名" @blur="blurUserName(item.visitorName)"  @change="inputChangeName(item.visitorName)"></el-input>
               <span style="position:absolute;top: 22px;left: 0px;color: #f56c6c;">*</span>
               <!--isShowUserName-->
               <div v-if="isShowUserName" v-show="item.visitorName===''?true:false" style="color: #F56C6C;text-align: left;position: absolute;top:60px;left: 8px;" >请输入姓名</div>
             </td>
             <td style="position: relative;">
               <el-radio v-model="item.gender" label='1'>男</el-radio>
               <el-radio v-model="item.gender" label='2'>女</el-radio>
               <span style="position:absolute;top: 22px;left: 0px;color: #f56c6c;">*</span>
               <div v-if="isShowGender"  v-show="item.gender===''?true:false" style="color: #F56C6C;text-align: left;position: absolute;top:60px;left: 8px;" >请选择性别</div>
             </td>
             <td style="position: relative">
               <!--regIsNull-->
               <el-input v-model="item.phone" :class="{regIsNull:item.phone==='' &&　isShowPhone　?true:false}" placeholder="请输入电话" @blur="blurPhone(item.phone)"  @change="regTel(item.phone)"></el-input>
               <span style="position:absolute;top: 22px;left: 0px;color: #f56c6c;">*</span>
               <!--isShowPhone-->
               <div v-if="isShowPhone" v-show="item.phone===''?true:false" style="color: #F56C6C;text-align: left;position: absolute;top: 60px;left: 8px;" >请输入电话</div>
             </td>
             <td style="position: relative">
               <!--regIsIDCard-->
               <!--<el-input v-model="item.visitorId" :class="{regIsNull:item.visitorId===''　&&　isShowIDCard　?true:false}" placeholder="请输入身份证号" @keyup.native="isRepeatCardID" @blur="blurIdCard(item.visitorId)" @change="regID(item.visitorId,index)"></el-input>-->
               <el-input v-model="item.visitorId" placeholder="请输入身份证号" @keyup.native="isRepeatCardID" @blur="blurIdCard(item.visitorId)" @change="regID(item.visitorId,index)"></el-input>
               <!--<span style="position:absolute;top: 22px;left: 0px;color: #f56c6c;">*</span>-->
               <!--isShowIDCard-->
               <!--<div v-if="isShowIDCard" v-show="item.visitorId===''?true:false" style="color: #F56C6C;text-align: left;position: absolute;top: 60px;left: 8px;" >请输入身份证号</div>-->
             </td>
             <td style="position: relative">
               <!--<el-input v-model="item.carNo" :disabled="formInline.sanyBussVisitor.isCar === '0' ? true : false"  :class="{regIsNull:item.carNo==='' && formInline.sanyBussVisitor.isCar === '1'?true:false}"  placeholder="请输入车牌号" @blur="blurCarNo" @change="regCarNo(item.carNo,index)"></el-input>
               <div v-show="item.carNo==='' && formInline.sanyBussVisitor.isCar === '1' ? true : false" style="color: #F56C6C;text-align: left;position: absolute;top: 60px;left: 8px;" >请输入车牌号</div>
               -->
               <el-input v-model="item.carNo" :disabled="formInline.sanyBussVisitor.isCar === '0' ? true : false"  :class="{regIsNull:isHavecarNo}"  placeholder="请输入车牌号" @blur="blurCarNo" @change="regCarNo(item.carNo,index)"></el-input>
               <div v-show="isHavecarNo" style="color: #F56C6C;text-align: left;position: absolute;top: 60px;left: 8px;" >请输入车牌号</div>

             </td>
             <!-- <td>
                <el-input v-model="item.countCard" placeholder="二维码次数"></el-input>
              </td>-->
             <td>
               <div>
                 <el-button class="btnIsBlue"
                   v-show="!item.imgUrl"
                   size="mini" type="primary"
                   @click="handlePhotoUploadStart(index)">开始拍照</el-button>
               </div>
               <div>
                 <el-button class="btnIsBlue"
                   v-show="item.imgUrl"
                   size="mini" type="primary"
                   @click="handlePhotoUpload(index)">重新拍照</el-button>
               </div>
             </td>
             <td>
               <el-button
                 v-show="item.imgUrl"
                 size="mini"
                 type="text"
                 @click="handleLookImg(index)">查看图片</el-button>
             </td>
             <td>
               <el-button type="danger"  style="width: 80px;" size="mini" :disabled="deleteDisabled" @click="deleteSingleLine(item,index)">删除</el-button>
             </td>
           </tr>
           </tbody>
         </table>
       </div>
       <!-- 来访人表格 end -->
       <!-- 拍照上传 start -->
       <div class="tempVisitInput_camera">
         <el-dialog
           title="临时拜访录入"
           :visible.sync="dialogVisible"
           width="1100px"
           height="600px"
           :close-on-click-modal="false"
           :before-close="handleClose">
           <div class="fatheramalltitle">
             <input type="hidden" value="" id="photoUrl" />
             <!--<iframe width="100%" height="470" frameborder="0" src="http://10.19.8.21:8181/sanyvisitorcontrol/photo/photo.html" id="myframe" name="myframe" />-->
             <iframe width="100%" height="470" frameborder="0" :src=imgUrlIP id="myframe" name="myframe" />
             <!--<iframe width="100%" height="400" frameborder="0" src="http://localhost/sanyvisitorcontrol/photo/photo.html" id="myframe" name="myframe" />-->
             <el-tooltip content="必须点击拍照后再确定，否则将保存默认图片显示区内图片" placement="top" class="small-title">
               <img src="../../../src/assets/images/imageSize.png" style="vertical-align: middle" alt="">
             </el-tooltip>
           </div>
           <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button class="btnIsBlue" type="primary" @click="handleConfirmCamera">确 定</el-button>
        </span>
         </el-dialog>
       </div>
       <!-- 拍照上传 end -->
       <!-- 车辆 start -->
       <!-- <div class="tempVisitInput_table tempVisitInput_carTable" v-if="formInline.sanyBussVisitorCarList.length>0">
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

       <!-- 查看照片 -->
       <el-dialog title="图片信息"
                  :visible.sync="dialogVisibleImg"
                  :close-on-click-modal="false"
                  class="edit-form">
         <div class="inputText" style="display: flex;justify-content: center;align-items: center;overflow: hidden;">
           <img :src="lookCurrentImgUrl" alt="" style="width:100%;">
         </div>
       </el-dialog>
       <!-- 查看照片end -->
       <div class="marginTop20" style="text-align: center">
         <el-button class="btnIsBlue" type="primary" @click="handleSave" :disabled="saveDelay" style="width: 200px;">保存</el-button>
       </div>
     </div>
</template>

<script>
 import {
  addApplyRequest,addApplyRequest1,
  getNamesByLikeRequest,
  fileUploadForOutEmployersPhotoRequest
} from '../../api/businessManageApi'
 import {reqAddVisitorSuccessReq,reqrRegIDCard,reqCarsNumber} from '../../api'
 import {checkPhone,checkIDCard,checkCarCard} from '../../util/regExp'
 import {isInnerIPFn} from '../../util/isInnerIP'
// import http from '../../../../sanyreport/src/api/http';
  export default {
    name: "tempVisitInput",
    data() {
      return {
        saveDelay:false, // 初始化保存按钮可以点击，当点击一次后需要等待1s再次点击，20190507
        isTelephonetrue:false,//验证手机号是否可以点击确定
        isIDCardtrue:false,//验证身份证是否可以点击确定
        deleteDisabled:false,//删除按钮是否可以点击
        restaurantsArr: [], // 被拜访人下拉数组
        employerNameSelectShow: false, // 拜访人下拉数组是否显示
        isDriveCarOptions: [{ // 是否驾车下拉
          label: '是',
          value: '1',
        }, {
          label: '否',
          value: '0',
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
        visitorParkOptions:[{
          label: '回龙观园区',
          value: '1',
        }],
        visitingTimeOptions:[{
          label: '上午',
          value: '01',
        },{label: '下午',
          value: '02',},
          {label: '全天',
          value: '03',}],
        isSelected:false,//选择当天12点后，只能有下午
        pickerOptionsStart: { // 拜访开始时间
          disabledDate(time) {
            return time.getTime() < Date.now()- 3600*1000*24;
          }
        },
       /* pickerOptionsEnd:{ // 拜访结束时间
          disabledDate:(time) =>{
            return  time.getTime() < new Date(this.formInline.sanyBussVisitor.planBeginTime).getTime();
          }
        },*/
        regIsNull:false,//动态添加Class
        regIsIDCard:false,//动态添加Class
        regIsName:false,//动态添加Class
        isShowUserName:false,////是否显示提示姓名
        isShowPhone:false,////是否显示提示手机号
        isShowIDCard:false,////是否显示提示身份证
        isShowCarNo:false,////是否显示车牌号
        isShowGender:false,//是否显示性别
        isHavecarNo:false,//当选择驾车时，多个人员同时访问时，车牌号必须至少包含有一个车牌
        rules: {
          planBeginTime: [
            { required: true, message: '请选择开始时间', trigger: 'blur' },
          ],
          // planEndTime: [
          //   { required: true, message: '请选择结束时间', trigger: 'blur' }
          // ]
        },
        formInline: {
          sanyBussVisitor: {
            planBeginTime: '', // 拜访开始时间
            // planEndTime: '', // 拜访结束时间
            visitingTime:'03',//拜访时间     0311修改
            vistorNum: 1, // 来访人数量
            isCar: '0', // 是否驾车
            isVip:0,//是否VIP
            carNum: 0, // 驾车数量
            reason: '', // 拜访原因
          },
          sanyBussVisitorDetailsList: [
            {
              visitorName: '', // 访客姓名
              gender:'1',///性别
              phone: '', // 手机号码
              visitorId: '', // 访客身份证号
              imgUrl: '' ,// 照片路径
              carNo: '', // 车牌号
              countCard:'',//二维码次数
            }
          ], // 来访人对象
          sanyBussVisitorCarList: [], // 车辆信息
        },
        dialogVisible: false, // 拍照上传弹窗
        dialogVisibleImg: false, // 查看照片
        currentUploadIndex: 0,
        lookCurrentImgUrl: '',
        imgUrlIP:'http://10.19.8.21:8181/sanyvisitorcontrol/photo/photo.html',//初始化为内网ip
        timer: null,      //保存时函数规定时间内只允许点击一次
      }
    },
    mounted() {
      //根据内外网访问拍照路径  isInnerIp:true为内网 false：外网
      const isInnerIp = isInnerIPFn().isInnerIp
      // console.log('isInnerIp:',isInnerIp)
      if(isInnerIp){
        this.imgUrlIP = 'http://10.19.8.21:8181/sanyvisitorcontrol/photo/photo.html'
      }else{
        this.imgUrlIP = 'http://222.240.233.67:8181/sanyvisitorcontrol/photo/photo.html'
      }
    },
    methods: {
      // 获取被拜访人列表 start
      async getNamesByLikeData (queryStr,queryNo) {

        const res = await getNamesByLikeRequest(queryStr,queryNo)
        if (res && res.data.code === 200) {
          var restaurants = res.data.data
          // debugger;
          this.restaurantsArr = restaurants
          console.log('restaurants',restaurants)
          // this.restaurantsArr = queryStr ? restaurants.filter(this.createFilter(queryStr)) : restaurants;
          this.employerNameSelectShow = true
        }
        // console.log('获取的被拜访人信息：', res)
      },
      querySearch(queryString) {
        // debugger;
        const employerName = this.formInline.sanyBussVisitor.employerName
        if (!employerName) return;
        //只有纯数字才生效
        var regNum = /^[0-9]\d*$|^0$/
        if(regNum.test(employerName) == true){//数字字段
          var queryStr = ''
          this.getNamesByLikeData(queryStr,employerName)
        }else{                               //非数字字段
          var queryNo = ''
          this.getNamesByLikeData( employerName,queryNo )
        }
      },
      /* createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      }, */
      handleSelect(item) {
        // console.log(item);
        this.formInline.sanyBussVisitor.employerName = item.name
        this.formInline.sanyBussVisitor.employerCode = item.userNo
        this.employerNameSelectShow = false;
      },
      //点击被拜访人时下拉框消失
      handleAllChange(e){
        var userNameClick = this.$refs.userNameClick
        // var userNameClick = document.getElementById('userNameClick')
        if(userNameClick){
          if(!userNameClick.contains(e.target)){
            this.employerNameSelectShow = false;
          }
        }
      },
      // 获取被拜访人列表 end
      // 输入来访人数,动态增加来访人员表格
      handleInputPersonNum() {
        let vistorNum = this.formInline.sanyBussVisitor.vistorNum
        // this.formInline.sanyBussVisitorDetailsList = []
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
      // 点击开始拍照按钮，打开拍照弹窗
      handlePhotoUploadStart(index) {
        this.dialogVisible = true;
        this.currentUploadIndex = index
        myframe.window.Webcam.attach('#my_camera');
        //点击开始拍照时不回显图片
         var urls = myframe.window.getTakePhotoUrl()
         urls = ''
      },
      // 点击重新拍照按钮，打开拍照弹窗
      handlePhotoUpload(index) {
        this.dialogVisible = true;
        this.currentUploadIndex = index
        myframe.window.Webcam.attach('#my_camera');
      },
      // 点击拍照上传弹窗确定按钮
      async handleConfirmCamera () {
        this.dialogVisible = false;
        const url = myframe.window.getTakePhotoUrl()
        console.log('获取的拍照图片路径是：',url)
        if (url) {
          const resPhoto = await fileUploadForOutEmployersPhotoRequest(url)
          if (resPhoto && resPhoto.data.code===200) {
            this.formInline.sanyBussVisitorDetailsList[this.currentUploadIndex].imgUrl = resPhoto.data.data.photoUrl
            console.log('resPhoto:',resPhoto.data)
            console.log('sanyBussVisitorDetailsList[this.currentUploadIndex].imgUrl:',this.formInline.sanyBussVisitorDetailsList[this.currentUploadIndex].imgUrl)
          } else {
            this.$message({
              type: 'error',
              message: '图片上传服务器失败！'
            });
          }
        }

        // this.formInline.sanyBussVisitorDetailsList[this.currentUploadIndex].imgUrl = url
        myframe.window.Webcam.reset()
      },
      // 查看图片
      handleLookImg(index) {
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
        console.log('lookCurrentImgUrl:',this.lookCurrentImgUrl)
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
      },
      // 输入车辆数,小于人员数
      handleInputCarNum() {
        let {carNum,vistorNum} = this.formInline.sanyBussVisitor
       /* if(carNum > vistorNum){
          this.formInline.sanyBussVisitor.carNum = this.formInline.sanyBussVisitor.vistorNum-1
          this.$message({
            type:'error',
            message:'输入车辆必须小于人员数量'
          })
          return
        }*/
        // 输入车辆数,动态增加车辆表格
       /* let carNum = this.formInline.sanyBussVisitor.carNum
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
        }*/
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
            Webcam.reset();
          })
          .catch(_ => {});
      },
      // 保存
      handleSave() {
        // 初始化保存按钮可以点击，当点击一次后需要等待3s再次点击，20190507
        this.saveDelay = true
        clearTimeout(timer)
        var timer = setTimeout(()=>{
          this.saveDelay = false
        },3000)
        console.log(' this.isTelephonetrue:', this.isTelephonetrue)
        const {employerName} = this.formInline.sanyBussVisitor
        //0330修改includes，注释下面遍历方法
        var restaurantNameArr = []
        this.restaurantsArr.forEach(item=>{
         var restaurantsNameItem = item.name
          restaurantNameArr.push(restaurantsNameItem)
        })
        // console.log('restaurantNameArr:',restaurantNameArr)
        if(restaurantNameArr.includes(employerName)){
          this.$refs.tempVisitInputID.validate(async (valid) => {
            if (!valid) return;
            const {sanyBussVisitorDetailsList} = this.formInline
            //添加多个时，判断车牌号是否包含有至少一个 //20190508
            var carNoArr = []
            sanyBussVisitorDetailsList.forEach(item=>{
              if(item.carNo!==''){
                carNoArr.push(item.carNo)
              }
            })
            console.log('carNo:',carNoArr)
            for (var i = 0; i <  sanyBussVisitorDetailsList.length; i++) {
              console.log('sanyBussVisitorDetailsList:',sanyBussVisitorDetailsList[i].gender)
              if(sanyBussVisitorDetailsList[i].visitorName === ''){
                this.regIsName= true
                this.isShowUserName= true
                return
              }else if(sanyBussVisitorDetailsList[i].gender === ''){
                this.isShowGender = true
                return
              }else if(sanyBussVisitorDetailsList[i].phone === ''){
                this.regIsNull= true
                this.isShowPhone= true
                return
              }
              //20190515注释
              /*else if(sanyBussVisitorDetailsList[i].visitorId === ''){
                this.regIsIDCard= true
                this.isShowIDCard= true
                return
              // }else if(sanyBussVisitorDetailsList[i].carNo === '' && this.formInline.sanyBussVisitor.isCar === '1'){
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
            if(this.isIDCardtrue){
              this.$message({type:'error',message:'身份证号码输入不正确'})
              return
            }
            if(this.checkCarCardBoolean){
              this.$message({type:'error',message:'车牌号码输入不正确'})
              return
            }
            if(this.formInline.sanyBussVisitor.visitingTime === '下午'){
              this.formInline.sanyBussVisitor.visitingTime = '02'
            }else if(this.formInline.sanyBussVisitor.visitingTime === '全天'){
              this.formInline.sanyBussVisitor.visitingTime = '03'
            }

            //时间校验
            var startTime = new Date(this.formInline.sanyBussVisitor.planBeginTime).getTime()
            // source = 2表示从临时拜访录入[门岗]页面过来的添加信息
            this.formInline.source = 2
            this.addApplyRequestData(this.formInline)
          })
        }else{
          this.$message({message:'保存失败，输入的拜访人信息未找到'})
        }
       /* this.restaurantsArr.forEach((item,index)=>{
          console.log('employerName',employerName)
          console.log('item.name',item.name)
          console.log('item.userNo',item.userNo)
          if(item.name === employerName || item.userNo === employerName){
            this.$refs.tempVisitInputID.validate(async (valid) => {
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
                if(sanyBussVisitorDetailsList[i].visitorName === '' ||sanyBussVisitorDetailsList[i].visitorId === ''||sanyBussVisitorDetailsList[i].phone === ''||sanyBussVisitorDetailsList[i].gender === ''){
                  return
                }
              }
              //时间校验
              var startTime = new Date(this.formInline.sanyBussVisitor.planBeginTime).getTime()
              // var endTime = new Date(this.formInline.sanyBussVisitor.planEndTime).getTime()
              /!*  if(startTime>endTime){
                  this.$message({
                    type:'error',
                    message:'结束时间不得小于开始时间，请重新输入'
                  })
                  return
                }*!/
              // source = 2表示从临时拜访录入[门岗]页面过来的添加信息
              this.formInline.source = 2
              this.addApplyRequestData(this.formInline)
            })
          }else{
            this.$message({message:'保存失败，输入的拜访人信息未找到'})
          }
        })*/
      },
     //函数防抖---几秒内只生效最后一次点击
      /*handleSave(){
        let that = this
        clearTimeout(that.timer)
         that.timer = setTimeout(()=>{
           console.log('0000000000000000000:') //业务逻辑
        },1000)
      },*/
      // 新增请求数据接口
      async addApplyRequestData(param) {
        const res = await addApplyRequest1(param);
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
          message: '新增成功'
        });
        //添加成功后调用发送短信的接口
        console.log('res:',res.data.data)
        let messageInfo = res.data.data.messageDto
        let messageArr = []
        messageInfo.forEach(item=>{
          let messageObj = {}
          messageObj.qrCode= item.qrCode
          messageObj.telephone= item.telephone
          messageObj.uid= item.uid
          messageObj.verifCode= item.verifCode
          messageArr.push(messageObj)
        })
        console.log('messageArr:',messageArr)
        console.log('this.formInline.sanyBussVisitor.isCar:',this.formInline.sanyBussVisitor.isCar)
        if(this.formInline.sanyBussVisitor.isCar === '0'){
          this.addVisitorSuccess(messageArr)
        }



        // 上传完之后清空
        this.formInline.sanyBussVisitor = {
          planBeginTime: '', // 拜访开始时间
          // planEndTime: '', // 拜访结束时间
          visitingTime:'',//拜访时间
          vistorNum: 1, // 来访人数量
          isCar: '', // 是否驾车
          isVip:0,//一般访客
          carNum: 0, // 驾车数量
          reason: '', // 拜访原因
        }
        this.formInline.sanyBussVisitorDetailsList = [] // 来访人员数组
        this.formInline.sanyBussVisitorCarList = [] // 来访车辆数组
      },
      //保存成功后调用的函数
      async addVisitorSuccess(messageArr){
        const res = await reqAddVisitorSuccessReq(messageArr)
        if(res&&res.data.code===200){
          this.$message({type:'success',message:'成功'})
        }
      },
      //前台验证-------start---------
      regTel(val){
        this.isTelephonetrue = checkPhone(val,this)
        console.log('tel:',this.isTelephonetrue)
        val===''? this.regIsNull= true: this.regIsNull= false
      },
      isRepeatCardID(){

      },
      //车牌号验证
      async regCarNo(val,index){

        this.checkCarCardBoolean = checkCarCard(val,this)
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
        const res = await reqCarsNumber(val)
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
        const res = await reqrRegIDCard(val)
        if(res&&res.data.code!==200){
          this.$message({
            type:'error',
            message:res.data.msg
          })
          this.formInline.sanyBussVisitorDetailsList[index].visitorId = ''
        }
        val===''? this.regIsIDCard= true: this.regIsIDCard= false
      },
      inputChangeName(visitorName){
        visitorName===''? this.regIsName= true: this.regIsName= false
      },
      blurUserName(val){
        // val = val.replace(/\s*/g,"")
        val===''? this.regIsName= true: this.regIsName= false
        val===''? this.isShowUserName= true: this.isShowUserName= false
      },
      blurPhone(val){
        // val = val.replace(/\s*/g,"")
        val===''? this.regIsNull= true: this.regIsNull= false
        val===''? this.isShowPhone= true: this.isShowPhone= false
      },
      blurIdCard(val){
        // val = val.replace(/\s*/g,"")
        val===''? this.regIsIDCard= true: this.regIsIDCard= false
        val===''? this.isShowIDCard= true: this.isShowIDCard= false
      },
      blurCarNo(val){
        // val = val.replace(/\s*/g,"")
        val===''? this.isShowCarNo= true: this.isShowCarNo= false
      },
      //前台验证-------end----------------
      //单独删除每一行，，
      deleteSingleLine(item,index){
        if(this.formInline.sanyBussVisitorDetailsList.length<=1){
          this.deleteDisabled = true   //删除按钮不可点击
          this.$message({message:'删除失败,默认保留一行'})
          return
        }
        this.$confirm('删除该条数据, 是否继续?', '提示', {
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
      //拜访人弹窗不缩回问题
      blurVisitor(){
        // this.employerNameSelectShow = false
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
    }
  }
</script>

<style lang="scss" scoped>
.tempVisitInput{
  &_form{
    width:100%;
    .el-input-number{
      width: 100%;
    }
    /deep/ .el-select{
      display:block;width:216px;
    }
    /deep/ .el-input{
      width: 216px;
    }
    /deep/ .el-scrollbar__wrap{
      overflow-x: hidden;
    }
    .tempVisitInput_employerName{
      height:200px;position:absolute;top:40px;z-index:20;border:1px solid #c0c4cc;width:216px;color:#606266;padding:0 10px;
      background-color:#fff;
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
        padding: 14px 10px;

      }
    }
  }
  &_personTable{
    th,td{text-align: center;}
    th:nth-child(1) {
      width:5%;
    }
    th:nth-child(2) {
      width: 12%;
    }
    th:nth-child(3) {
      width: 5%;
    }
    th:nth-child(4) {
      width: 15%;
    }
    th:nth-child(5) {
      width: 20%;
    }
    th:nth-child(6) {
      width: 13.5%;
    }
    th:nth-child(7) {
      width: 10%;
    }
  }
  &_carTable{
    margin-top:50px;
    th,td{text-align: center;}
    th:nth-child(1) {
      width: 80px;
    }

  }
  &_cameraArea{
    width:400px;height:400px;
  }
}




/deep/.tempVisitInputClass .el-form-item__label{
  width: 100px;
}
.regIsNull{
  /deep/ .el-input__inner{
    border: 1px solid #F56C6C;
    border-radius: 5px;
  }
}
 /ddep/.el-button--text {
   display: none;
 }
 .fatheramalltitle{
   position: relative;
 }
.small-title{
  position: absolute;
  top: 435px;
  left:650px;
}
/deep/ .el-radio{
  display: flex;
  margin-top: 10px;
  margin-left: 0px;
}
  .tempVisitInput_form {
    /deep/ .el-form-item{
      margin-left: 15px;
      margin-right: 0;
    }
  }

</style>

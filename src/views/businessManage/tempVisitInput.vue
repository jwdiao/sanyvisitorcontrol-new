<template>
   <div class="" @click="handleAllChange">
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
        <el-form-item label="被拜访人">
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
        <el-form-item label="到访日期" prop="planBeginTime">
          <el-date-picker
            v-model="formInline.sanyBussVisitor.planBeginTime"
            type="date"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            :default-value="new Date()"
            :picker-options="pickerOptionsStart"
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
          <el-input-number :controls="true" v-model="formInline.sanyBussVisitor.carNum" @change="handleInputCarNum" :min="1"></el-input-number>
        </el-form-item>
        <el-form-item label="拜访原因">
          <el-input
            style="width:1285px;"
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
              <img src="../../../src/assets/images/imageSize.png" style="vertical-align: middle" alt="">
            </el-tooltip>
          </el-form-item>
        </div>
    </el-form>
    <!-- 来访人表格 start -->
    <!-- v-if="formInline.sanyBussVisitorDetailsList.length>0" -->
    <div
      class="tempVisitInput_table tempVisitInput_personTable"
    >
      <table>
        <thead>
          <tr>
            <th>序号</th>
            <th>拜访人姓名</th>
            <th>电话号码</th>
            <th>身份证号</th>
            <th>车牌号</th>
            <th>拍照</th>
            <th>查看图片</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in formInline.sanyBussVisitorDetailsList" :key="index">
            <td v-text="index+1">1</td>
            <td style="position: relative">
              <el-input v-model="item.visitorName" :class="{regIsNull:regIsName}" placeholder="请输入姓名" @blur="blurUserName(item.visitorName)"  @change="inputChangeName(item.visitorName)"></el-input>
              <span style="position:absolute;top: 22px;left: 0px;color: #f56c6c;">*</span>
              <div v-show="isShowUserName" style="color: #F56C6C;text-align: left;position: absolute;top: 50px;left: 8px;" >请输入姓名</div>
            </td>
            <td style="position: relative">
              <el-input v-model="item.phone" :class="{regIsNull:regIsNull}" placeholder="请输入电话" @blur="blurPhone(item.phone)"  @change="regTel(item.phone)"></el-input>
              <span style="position:absolute;top: 22px;left: 0px;color: #f56c6c;">*</span>
              <div v-show="isShowPhone" style="color: #F56C6C;text-align: left;position: absolute;top: 50px;left: 8px;" >请输入电话</div>
            </td>
            <td style="position: relative">
              <el-input v-model="item.visitorId" :class="{regIsNull:regIsIDCard}" placeholder="请输入身份证号" @blur="blurIdCard(item.visitorId)" @change="regID(item.visitorId)"></el-input>
              <span style="position:absolute;top: 22px;left: 0px;color: #f56c6c;">*</span>
              <div v-show="isShowIDCard" style="color: #F56C6C;text-align: left;position: absolute;top: 50px;left: 8px;" >请输入身份证号</div>
            </td>
            <td>
              <el-input v-model="item.carId" placeholder="请输入车牌号"></el-input>
            </td>
            <td>
              <div>
                <el-button
                  v-show="!item.imgUrl"
                  size="mini" type="primary"
                  @click="handlePhotoUploadStart(index)">开始拍照</el-button>
                </div>
                <div>
                  <el-button
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
              <el-button type="danger" size="mini" :disabled="deleteDisabled" @click="deleteSingleLine(item,index)">删除</el-button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- 来访人表格 end -->
    <!-- 拍照上传 start -->
    <div class="tempVisitInput_camera">
      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="1100px"
        height="600px"
        :close-on-click-modal="false"
        :before-close="handleClose">
        <div class="fatheramalltitle">
          <input type="hidden" value="" id="photoUrl" />
          <iframe width="100%" height="470" frameborder="0" src="http://10.19.8.22:8081/sanyvisitorcontrol/photo/photo.html" id="myframe" name="myframe" />
           <!--<iframe width="100%" height="400" frameborder="0" src="http://localhost/sanyvisitorcontrol/photo/photo.html" id="myframe" name="myframe" />-->
          <el-tooltip content="必须点击拍照后再确定，否则将保存默认图片显示区内图片" placement="top" class="small-title">
            <img src="../../../src/assets/images/imageSize.png" style="vertical-align: middle" alt="">
          </el-tooltip>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleConfirmCamera">确 定</el-button>
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
            <img :src="lookCurrentImgUrl" alt="" style="max-width:100%;">
        </div>
    </el-dialog>
    <!-- 查看照片end -->
    <div class="marginTop20" style="text-align: center">
      <el-button type="primary" @click="handleSave" style="width: 120px;">保存</el-button>
    </div>
   </div>
</template>

<script>
 import {
  addApplyRequest,
  getNamesByLikeRequest,
  fileUploadForOutEmployersPhotoRequest
} from '../../api/businessManageApi'
 import {checkPhone,checkIDCard} from '../../util/regExp'
// import http from '../../../../sanyreport/src/api/http';
  export default {
    name: "tempVisitInput",
    data() {
      return {
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
            visitingTime:'',//拜访时间     0311修改
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
              imgUrl: '' ,// 照片路径
              carId: '' // 车牌号
            }
          ], // 来访人对象
          sanyBussVisitorCarList: [], // 车辆信息
        },
        dialogVisible: false, // 拍照上传弹窗
        dialogVisibleImg: false, // 查看照片
        currentUploadIndex: 0,
        lookCurrentImgUrl: 0
      }
    },
    mounted() {
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
        // let vistorNum = this.formInline.sanyBussVisitor.vistorNum
        // this.formInline.sanyBussVisitorDetailsList = []
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
        /*for (var i = 0; i< vistorNum; i++) {
          this.formInline.sanyBussVisitorDetailsList.push(
            {
              visitorName: '', // 访客姓名
              phone: '', // 手机号码
              visitorId: '', // 访客身份证号
              imgUrl: '' ,// 照片路径
              carId: '' // 车牌号
            }
          )
        }*/
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
        // console.log('获取的拍照图片路径是：',url)
        if (url) {
          const resPhoto = await fileUploadForOutEmployersPhotoRequest(url)
          if (resPhoto && resPhoto.data.code===200) {
            this.formInline.sanyBussVisitorDetailsList[this.currentUploadIndex].imgUrl = resPhoto.data.data
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
        this.lookCurrentImgUrl = this.formInline.sanyBussVisitorDetailsList[this.currentUploadIndex].imgUrl
      },
      // 输入车辆数,小于人员数
      handleInputCarNum() {
        let {carNum,vistorNum} = this.formInline.sanyBussVisitor
        if(carNum > vistorNum){
          this.formInline.sanyBussVisitor.carNum = this.formInline.sanyBussVisitor.vistorNum-1
          this.$message({
            type:'error',
            message:'输入车辆必须小于人员数量'
          })
          return
        }
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
        const {employerName} = this.formInline.sanyBussVisitor
        this.restaurantsArr.forEach((item,index)=>{
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
                if(sanyBussVisitorDetailsList[i].visitorName === '' ||sanyBussVisitorDetailsList[i].visitorId === ''||sanyBussVisitorDetailsList[i].phone === ''){
                  return
                }
              }
              //时间校验
              var startTime = new Date(this.formInline.sanyBussVisitor.planBeginTime).getTime()
              // var endTime = new Date(this.formInline.sanyBussVisitor.planEndTime).getTime()
              /*  if(startTime>endTime){
                  this.$message({
                    type:'error',
                    message:'结束时间不得小于开始时间，请重新输入'
                  })
                  return
                }*/
              // source = 2表示从临时拜访录入[门岗]页面过来的添加信息
              this.formInline.source = 2
              this.addApplyRequestData(this.formInline)
            })

          }else{
            this.$message({message:'保存失败，输入的拜访人信息未找到'})
          }

        })



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
        // 上传完之后清空
        this.formInline.sanyBussVisitor = {
          planBeginTime: '', // 拜访开始时间
          // planEndTime: '', // 拜访结束时间
          visitingTime:'',//拜访时间
          vistorNum: '', // 来访人数量
          isCar: '', // 是否驾车
          carNum: '', // 驾车数量
          reason: '', // 拜访原因
        }
        this.formInline.sanyBussVisitorDetailsList = [] // 来访人员数组
        this.formInline.sanyBussVisitorCarList = [] // 来访车辆数组
      },
      //前台验证-------start---------
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
      //前台验证-------end----------------
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
        console.log('删除行index:',index)
        console.log('删除行:',this.formInline.sanyBussVisitorDetailsList)
      },
      //拜访人弹窗不缩回问题
      blurVisitor(){
        // this.employerNameSelectShow = false
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
      width: 80px;
    }
    th:nth-child(2) {
      width: 250px;
    }
    th:nth-child(3) {
      width: 250px;
    }
    th:nth-child(4) {
      width: 250px;
    }
    th:nth-child(5) {
      width: 250px;
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

</style>

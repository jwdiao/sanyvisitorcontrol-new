<template>
<div>
<el-dialog
  title="提示"
  :close-on-click-modal="false"
  :visible.sync="dialogVisibles"
  @close="handleDialogClose"
  width="1200px">
    <div class="addVisitorDialog">
      <!-- 表单 -->
      <el-form
        :inline="true"
        :model="formDataAdd"
        size="medium"
        label-width="100px"
        class="marginTop20 common-form-inline addVisitorDialog_form"
        >
          <el-form-item label="归属部门">
            <!--<el-select v-model="formDataAdd.department" placeholder="请选择">-->
              <!--<el-option label="三一重工" value="三一重工"></el-option>-->
              <!--<el-option label="三一重能" value="三一重能"></el-option>-->
              <!--<el-option label="三一筑工" value="三一筑工"></el-option>-->
            <!--</el-select>-->

              <el-tree
                :data="dataTree"
                :props="defaultProps"
                @node-click="handleNodeClick"></el-tree>

          </el-form-item>
          <el-form-item label="姓名">
            <el-input v-model="formDataAdd.username"></el-input>
          </el-form-item>
          <el-form-item label="电话号码">
            <el-input v-model="formDataAdd.tel"></el-input>
          </el-form-item>
          <el-form-item label="身份证号">
            <el-input v-model="formDataAdd.card"></el-input>
          </el-form-item>
          <el-form-item label="上传照片" style="width:700px">
            <div>
              <el-select v-model="formDataAdd.photo" placeholder="请选择">
                <el-option label="本地上传" value="本地上传"></el-option>
                <el-option label="拍照上传" value="拍照上传"></el-option>
              </el-select>
              <el-button type="text" >点击本地上传</el-button>
              <el-button type="text">点击拍照上传</el-button>
            </div>


          </el-form-item>
      </el-form>
      <!-- 表单 end -->
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
import http from '../../../api/http'
import {
  addApplyRequest,
  fileUploadRequest
} from '../../../api/businessManageApi'
export default {
  name: 'AddExternalStaffManage',
  props: ['visible'],
  watch: {
    visible (val) {
      this.dialogVisibles = val
    }
  },
  data () {
    return {
      dataTree: [], //树
      defaultProps: {
        children: 'nodes',
        label: 'orgText'
      },
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
      formDataAdd: {
        department: '',
        username: '',
        tel: '',
        card: '',
        photo: ''
      },
      lookCurrentImgUrl: '' // 查看图片的地址
    }
  },
  mounted () {

  },
  methods: {
    //弹窗选择树
    handleNodeClick(){

    },
    handleClickUpload (index) {
      this.currentUploadIndex = index
    },
    getUpload (index) {
      return `uploadPerson${index}`
    },
    onBeforeUploadImage(file) {
      const isIMAGE = file.type === 'image/jpeg' || 'image/jpg' || 'image/png'
      const isLt1M = file.size / 1024 / 1024 < 1
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
      let vistorNum = this.formInline.sanyBussVisitor.vistorNum
      this.formInline.sanyBussVisitorDetailsList = []
      if (vistorNum <= 0) {
        return;
      }
      for (var i = 0; i< vistorNum; i++) {
        this.formInline.sanyBussVisitorDetailsList.push(
          {
            visitorName: '', // 访客姓名
            phone: '', // 手机号码
            visitorId: '', // 访客身份证号
            imgUrl: '' // 照片路径
          }
        )
      }
    },
    // 输入车辆数,动态增加车辆表格
    handleInputCarNum() {
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
    },
    // 新增确定按钮
    handleDialogConfirm() {
      this.dialogVisibles = false
      this.$emit('dialogvisible', this.dialogVisibles)
      // Source：1表示从我的访客信息[全部员工]页面过来的添加信息
      this.formInline.source = 1
      this.addApplyRequestData(this.formInline)
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
        planBeginTime: '', // 拜访开始时间
        planEndTime: '', // 拜访结束时间
        vistorNum: '', // 来访人数量
        isCar: '0', // 是否驾车
        carNum: '', // 驾车数量
        reason: '', // 拜访原因
      }
      this.formInline.sanyBussVisitorDetailsList = []
      this.formInline.sanyBussVisitorCarList = []
    },
    // 取消
    handleDialogCancle() {
      this.dialogVisibles = false
      this.$emit('cancleadddialog', this.dialogVisibles)
    },
    // 弹窗关闭的回调
    handleDialogClose() {
      this.dialogVisibles = false
      this.$emit('confirmadddialog', this.dialogVisibles)
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
    th:nth-child(1) {
      width: 80px;
    }
    th:nth-child(2) {
      width: 200px;
    }
    th:nth-child(3) {
      width: 200px;
    }
    th:nth-child(4) {
      width: 200px;
    }
  }
  &_carTable{
    margin-top:50px;
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
}
</style>

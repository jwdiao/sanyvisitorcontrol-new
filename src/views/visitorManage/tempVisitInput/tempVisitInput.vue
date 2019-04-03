<template>
   <div class="">
     <p class="common-breadcrumb">临时拜访录入</p>
    <el-form
      :inline="true"
      :model="formInline"
      size="medium"
      label-width="100px"
      class="marginTop20 common-form-inline tempVisitInput_form"
      >
        <el-form-item label="拜访人">
          <el-autocomplete
            class="inline-input"
            v-model="formInline.user"
            :fetch-suggestions="querySearch"
            placeholder="输入工号或姓名"
            :trigger-on-focus="false"
            @select="handleSelect"
          ></el-autocomplete>
        </el-form-item>
        <el-form-item label="拜访开始时间">
          <el-date-picker
            v-model="formInline.startTime"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="拜访结束时间">
          <el-date-picker
            v-model="formInline.endTime"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="来访人数量">
          <el-input-number :controls="false" v-model="formInline.personNum" @change="handleInputPersonNum" :min="0"></el-input-number>
          <!-- <el-input v-model="formInline.personNum" placeholder="请输入" @change="handleInputPersonNum"></el-input> -->
        </el-form-item>
        <el-form-item label="是否驾车">
          <el-select v-model="formInline.isDriveCar" placeholder="请选择">
            <el-option
              v-for="item in formInline.isDriveCarOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="驾车数量">
          <!-- <el-input v-model="formInline.carNum" placeholder=""></el-input> -->
          <el-input-number :controls="false" v-model="formInline.carNum" @change="handleInputCarNum" :min="0"></el-input-number>
        </el-form-item>
        <el-form-item label="拜访原因">
          <el-input
            style="width:930px;"
            type="textarea"
            :rows="4"
            placeholder="请输入原因"
            v-model="formInline.reason">
          </el-input>
        </el-form-item>
    </el-form>
    <!-- 来访人表格 start -->
    <div class="tempVisitInput_table tempVisitInput_personTable"
      v-if="formInline.personNumArr.length>0">
      <table>
        <thead>
          <tr>
            <th>序号</th>
            <th>拜访人姓名</th>
            <th>电话号码</th>
            <th>身份证号</th>
            <th>上传</th>
            <th>图片名称</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in formInline.personNumArr" :key="index">
            <td v-text="index+1">1</td>
            <td>
              <el-input v-model="item.name" placeholder="请输入姓名"></el-input>
            </td>
            <td>
              <el-input v-model="item.tel" placeholder="请输入电话"></el-input>
            </td>
            <td>
              <el-input v-model="item.card" placeholder="请输入身份证号"></el-input>
            </td>
            <td>
              <el-button
                size="mini"
                type="text"
                @click="handlePhotoUpload">拍照上传</el-button>
            </td>
            <td>
              <el-button
                size="mini"
                type="text"
                @click="handleLookImg">查看图片</el-button>
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
        width="30%"
        :before-close="handleClose">
        <div>
          <el-row>
            <el-col :span="12">
              <div class="tempVisitInput_cameraArea" id="my_camera">
                <video id="video" width="220" height="120" controls></video>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="tempVisitInput_cameraArea" id="results">2</div>
              <canvas id="canvas" width="220" height="120"></canvas>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <!-- <a href="javascript:void(this.take_snapshot">照片</a> -->
              <div @click="takePhotoOpen" style="width:100px;height:50px;background-color:blue;cursor:pointer;">打开摄像头</div>
              <div @click="takePhoto" id="capture" style="width:100px;height:50px;background-color:blue;cursor:pointer;">拍照</div>
              <div @click="closePhoto" id="capture" style="width:100px;height:50px;background-color:blue;cursor:pointer;">关闭</div>
            </el-col>
          </el-row>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- 拍照上传 end -->

    <!-- 车辆 start -->
    <div class="tempVisitInput_table tempVisitInput_carTable" v-if="formInline.carNumArr.length>0">
      <table>
        <thead>
          <tr>
            <th>序号</th>
            <th>车牌号码</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in formInline.carNumArr" :key="index">
            <td v-text="index+1"></td>
            <td>
              <el-input v-model="item.carNum" placeholder="请输入车牌号"></el-input>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- 车辆 end -->

    <div class="marginTop20">
      <el-button type="primary" @click="handleSave">保存</el-button>
    </div>
   </div>
</template>

<script>
  import './webcam.min.js'
  export default {
    name: "tempVisitInput",
    data() {
      return {
        formInline: {
          user: '', // 拜访人
          startTime: '', // 拜访开始时间
          endTime: '', // 拜访结束时间
          personNum: '', // 来访人数量
          personNumArr: [], // 来访人对象
          mediaStreamTrack:"",  //
          isDriveCar: '', // 是否驾车
          isDriveCarOptions: [{
            value: '是',
            label: '是'
          }, {
            value: '否',
            label: '否'
          }],
          carNum: '', // 驾车数量
          carNumArr: [], // 车辆信息
          reason: '', // 拜访原因
        },
        dialogVisible: false

      }
    },
    mounted() {
      this.restaurants = this.loadAll();
      /* this.$nextTick(function(){
        Webcam.attach('#my_camera');
      }) */
    },
    methods: {
      loadAll() {
        return [
          { "value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号" },
          { "value": "Hot honey 首尔炸鸡（仙霞路）", "address": "上海市长宁区淞虹路661号" },
          { "value": "新旺角茶餐厅", "address": "上海市普陀区真北路988号创邑金沙谷6号楼113" },
          { "value": "泷千家(天山西路店)", "address": "天山西路438号" },
          { "value": "胖仙女纸杯蛋糕（上海凌空店）", "address": "上海市长宁区金钟路968号1幢18号楼一层商铺18-101" },
          { "value": "贡茶", "address": "上海市长宁区金钟路633号" },
          { "value": "豪大大香鸡排超级奶爸", "address": "上海市嘉定区曹安公路曹安路1685号" },
          { "value": "茶芝兰（奶茶，手抓饼）", "address": "上海市普陀区同普路1435号" },
          { "value": "十二泷町", "address": "上海市北翟路1444弄81号B幢-107" },
          { "value": "星移浓缩咖啡", "address": "上海市嘉定区新郁路817号" },
          { "value": "阿姨奶茶/豪大大", "address": "嘉定区曹安路1611号" },
          { "value": "新麦甜四季甜品炸鸡", "address": "嘉定区曹安公路2383弄55号" },
          { "value": "Monica摩托主题咖啡店", "address": "嘉定区江桥镇曹安公路2409号1F，2383弄62号1F" },
          { "value": "浮生若茶（凌空soho店）", "address": "上海长宁区金钟路968号9号楼地下一层" },
          { "value": "NONO JUICE  鲜榨果汁", "address": "上海市长宁区天山西路119号" },
          { "value": "CoCo都可(北新泾店）", "address": "上海市长宁区仙霞西路" },
          { "value": "快乐柠檬（神州智慧店）", "address": "上海市长宁区天山西路567号1层R117号店铺" },
          { "value": "Merci Paul cafe", "address": "上海市普陀区光复西路丹巴路28弄6号楼819" },
          { "value": "猫山王（西郊百联店）", "address": "上海市长宁区仙霞西路88号第一层G05-F01-1-306" },
          { "value": "枪会山", "address": "上海市普陀区棕榈路" },
          { "value": "纵食", "address": "元丰天山花园(东门) 双流路267号" },
          { "value": "钱记", "address": "上海市长宁区天山西路" },
          { "value": "壹杯加", "address": "上海市长宁区通协路" },
          { "value": "唦哇嘀咖", "address": "上海市长宁区新泾镇金钟路999号2幢（B幢）第01层第1-02A单元" },
          { "value": "爱茜茜里(西郊百联)", "address": "长宁区仙霞西路88号1305室" },
          { "value": "爱茜茜里(近铁广场)", "address": "上海市普陀区真北路818号近铁城市广场北区地下二楼N-B2-O2-C商铺" },
          { "value": "鲜果榨汁（金沙江路和美广店）", "address": "普陀区金沙江路2239号金沙和美广场B1-10-6" },
          { "value": "开心丽果（缤谷店）", "address": "上海市长宁区威宁路天山路341号" },
          { "value": "超级鸡车（丰庄路店）", "address": "上海市嘉定区丰庄路240号" },
          { "value": "妙生活果园（北新泾店）", "address": "长宁区新渔路144号" },
          { "value": "香宜度麻辣香锅", "address": "长宁区淞虹路148号" },
          { "value": "凡仔汉堡（老真北路店）", "address": "上海市普陀区老真北路160号" },
          { "value": "港式小铺", "address": "上海市长宁区金钟路968号15楼15-105室" },
          { "value": "蜀香源麻辣香锅（剑河路店）", "address": "剑河路443-1" },
          { "value": "北京饺子馆", "address": "长宁区北新泾街道天山西路490-1号" },
          { "value": "饭典*新简餐（凌空SOHO店）", "address": "上海市长宁区金钟路968号9号楼地下一层9-83室" },
          { "value": "焦耳·川式快餐（金钟路店）", "address": "上海市金钟路633号地下一层甲部" },
          { "value": "动力鸡车", "address": "长宁区仙霞西路299弄3号101B" },
          { "value": "浏阳蒸菜", "address": "天山西路430号" },
          { "value": "四海游龙（天山西路店）", "address": "上海市长宁区天山西路" },
          { "value": "樱花食堂（凌空店）", "address": "上海市长宁区金钟路968号15楼15-105室" },
          { "value": "壹分米客家传统调制米粉(天山店)", "address": "天山西路428号" },
          { "value": "福荣祥烧腊（平溪路店）", "address": "上海市长宁区协和路福泉路255弄57-73号" },
          { "value": "速记黄焖鸡米饭", "address": "上海市长宁区北新泾街道金钟路180号1层01号摊位" },
          { "value": "红辣椒麻辣烫", "address": "上海市长宁区天山西路492号" },
          { "value": "(小杨生煎)西郊百联餐厅", "address": "长宁区仙霞西路88号百联2楼" },
          { "value": "阳阳麻辣烫", "address": "天山西路389号" },
          { "value": "南拳妈妈龙虾盖浇饭", "address": "普陀区金沙江路1699号鑫乐惠美食广场A13" }
        ];
      },
      querySearch(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleSelect(item) {
        console.log(item);
      },
      // 输入来访人数,动态增加来访人员表格
      handleInputPersonNum() {
        let personNum = this.formInline.personNum
        this.formInline.personNumArr = []
        if (personNum <= 0) {
          return;
        }
        for (var i = 0; i< personNum; i++) {
          this.formInline.personNumArr.push(
            {
              name: '',
              tel: '',
              card: ''
            }
          )
        }
      },
      // 拍照上传
      handlePhotoUpload() {
        this.dialogVisible = true
       /* setTimeout(function(){
           Webcam.set({
            width: 320,
            height: 240,
            image_format: 'jpeg',
            jpeg_quality: 90
          });
         Webcam.setSWFLocation('./webcam.swf');
         Webcam.attach('#my_camera');
        }, 4000)*/
      },
      takePhoto() {
        // debugger;
         /*this.$nextTick(() =>{
          Webcam.snap((data_uri) =>{
            // display results in pages
            document.getElementById('results').innerHTML =
              '<h2>Here is your image:</h2>'+
              '<img src='+data_uri+'/>';
          });
           console.log('data_uri:',data_uri)
        })*/

        // take snapshot and get image data
       this.photoTokenFun()
      },
      closePhoto(){
        mediaStreamTrack.getTracks().forEach(function (track) {

          track.stop();
        });

      },
      takePhotoOpen(){ this.openCameraFun()},
      //启动摄像头
      openCameraFun(){
        //访问用户媒体设备的兼容方法
        function getUserMedia(constraints, success, error) {
          if (navigator.mediaDevices.getUserMedia) {
            //最新的标准API
            navigator.mediaDevices.getUserMedia(constraints).then(success).catch(error);
          } else if (navigator.webkitGetUserMedia) {
            //webkit核心浏览器
            navigator.webkitGetUserMedia(constraints,success, error)
          } else if (navigator.mozGetUserMedia) {
            //firfox浏览器
            navigator.mozGetUserMedia(constraints, success, error);
          } else if (navigator.getUserMedia) {
            //旧版API
            navigator.getUserMedia(constraints, success, error);
          }
        }
        let video = document.getElementById('video');
        function success(stream) {
          //兼容webkit核心浏览器
          let CompatibleURL = window.URL || window.webkitURL;
          //将视频流设置为video元素的源
          console.log(stream);

          video.src = CompatibleURL.createObjectURL(stream);
          video.srcObject = stream;
          video.play();
        }

        function error(error) {
          console.log(`访问用户媒体设备失败${error.name}, ${error.message}`);
        }

        if (navigator.mediaDevices.getUserMedia || navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia) {
          //调用用户媒体设备, 访问摄像头
          getUserMedia({video : {width: 220, height: 120}}, success, error);
        } else {
          alert('不支持访问用户媒体');
        }
      },

      //点击拍照触发事件
      photoTokenFun(){
        let video = document.getElementById('video');
        let canvas = document.getElementById('canvas');
        let context = canvas.getContext('2d');
        document.getElementById('capture').addEventListener('click', function () {
          context.drawImage(video, 0, 0, 220, 120);
        })
        var imgData = canvas.toDataURL()
      console.log('imgData:',imgData)
      },


      // 输入车辆数,动态增加车辆表格
      handleInputCarNum() {
        let carNum = this.formInline.carNum
        this.formInline.carNumArr = []
        if (carNum <= 0) {
          return;
        }
        for (var i = 0; i< carNum; i++) {
          this.formInline.carNumArr.push(
            {
              carNum: '',
            }
          )
        }
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
           Webcam.reset();
          })
          .catch(_ => {});
      },
      // 查看图片
      handleLookImg() {

      },
      // 保存
      handleSave() {

      }

    }
  }
</script>

<style lang="scss" scoped>
.tempVisitInput{
  &_form{
    width:1100px;
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
      width: 300px;
    }
    th:nth-child(3) {
      width: 300px;
    }
    th:nth-child(4) {
      width: 300px;
    }
  }
  &_carTable{
    margin-top:50px;
    th:nth-child(1) {
      width: 80px;
    }
    th:nth-child(2) {
    }
  }
  &_cameraArea{
    width:400px;height:400px;
  }
}
</style>

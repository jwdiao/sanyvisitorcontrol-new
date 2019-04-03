<template>
  <div>
   <!-- <p class="common-breadcrumb">外部员工管理</p> -->
    <el-row class="marginTop20" :gutter="20">
      <el-col :span="4">

        <div class="">
          <el-tree
            :data="dataTree"
            :props="defaultProps"
            node-key="id"
            ref="tree"
            :default-expanded-keys="[defaultData]"
            highlight-current
            show-checkbox
            @node-click="handleNodeClick">
					</el-tree>
        </div>
      </el-col>
      <el-col :span="20">
        <div class="">
          <el-form
            :inline="true"
            :model="formInline"
            size="medium"
            class="marginTop20 common-form-inline dataPhoto"
            >
              <el-form-item label="员工姓名">
                <el-input class="dataPhoto" v-model="formInline.username" placeholder="员工姓名"></el-input>
              </el-form-item>
              <el-form-item label="是否录入照片">
                <el-select class="dataPhoto" v-model="formInline.enterPhoto" placeholder="请选择">
                  <el-option label="全部" value="0"></el-option>
                  <el-option label="未录入" value="2"></el-option>
                  <el-option label="已录入" value="1"></el-option>
                </el-select>
              </el-form-item>
            <!--0325将是否满足要求更改为是否授权-->
              <el-form-item label="是否授权">
                <el-select class="dataPhoto" v-model="formInline.meetDemand" placeholder="请选择">
                  <el-option label="全部" value=""></el-option>
                  <el-option label="是" value="1"></el-option>
                  <el-option label="否" value="2"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="uploadTemplate">下载模板</el-button>
              </el-form-item>
              <el-form-item>
                <!--<el-button type="primary">数据导入</el-button>-->
                <el-upload id="formBiao" style="display:inline-block;background:none" :limit="1"
                           class="upload-demo" ref="upload" accept=".xls,.xlsx"  action="/userPushRecord/find/all"
                           :on-change="beforeUpload" :on-exceed="handleExceed"
                           :on-remove="removeDoc"
                           :http-request="uploadSectionFile" :auto-upload="false">
                  <el-button id="upload-document" slot="trigger" type="primary" v-show="isShow">数据导入</el-button>
                  <el-button style="width: 100px;" type="primary" @click="submitUpload" v-show="!isShow">确定</el-button>
                </el-upload>

              </el-form-item>
              <el-form-item>
                <!--<el-button type="primary">照片导入</el-button>-->
                <el-upload id="formImage" style="display:inline-block;background:none" :limit="1"
                           class="upload-demo" ref="uploadImage" accept=".zip"  action="/userPushRecord/find/all"
                           :on-change="beforeUploadImages" :on-exceed="handleExceedImages"
                           :on-remove="removeImages"
                           :before-upload="onBeforeUploadImage"
                           :http-request="uploadSectionImageFile" :auto-upload="false">
                  <el-button id="upload-images" slot="trigger" type="primary" v-show="isShowImage">照片导入</el-button>
                  <el-button style="width: 100px;" type="primary" @click="submitUploadImages" v-show="!isShowImage">确定</el-button>
                </el-upload>

              </el-form-item>
              <br />
              <el-form-item>
                <el-button type="primary" @click="handleAdd">新增</el-button>
              </el-form-item>
              <el-form-item>
                <el-button type="danger" style="background: #ff404a;" @click="deleteContentItemSubmit">删除</el-button>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="batchAuthoriaztion">批量授权</el-button>
              </el-form-item>
          </el-form>
          <div class="common-table">
            <el-table stripe height="590px"
              :data="tableData"
              header-row-class-name="table-header" @selection-change="handleSelectionChangeDelete"
              style="width: 100%">
              <el-table-column type="selection" label="选择" width="80"></el-table-column>
              <el-table-column
                type="index"
                label="序号"
                width="80">
              </el-table-column>
              <el-table-column
                prop="sanyBasicShrOrg.orgText"
                label="归属部门">
              </el-table-column>
              <el-table-column
                prop="userName"
                label="姓名">
              </el-table-column>
              <el-table-column
                prop="telephone"
                label="电话号码">
              </el-table-column>
              <el-table-column
                prop="idCard" width="200"
                label="身份证号">
              </el-table-column>
              <!--0325将下发状态更改为是否授权-->
              <el-table-column prop="isFa" label="是否授权">
                <template slot-scope="scope">
                  <div v-show="scope.row.isSub==='1'" size="mini" type="text">已授权</div>
                  <div v-show="scope.row.isSub==='2'" size="mini" type="text">未授权</div>
                </template>
              </el-table-column>
             <!-- <el-table-column label="照片合规性">
                <template slot-scope="scope">
                  <div v-show="scope.row.imgVerify==='1'" size="mini" type="text">合规</div>
                  <div v-show="scope.row.imgVerify==='2'" size="mini" type="text">不合规</div>
                </template>
              </el-table-column>-->
              <el-table-column label="照片上传">
                <template slot-scope="scope">
                  <el-button v-if="scope.row.imgVerify!=='0'"
                    size="mini"
                    type="text"
                    @click="handleLookPhoto(scope.$index, scope.row)">查看照片</el-button>
                  <div v-else>未上传</div>
                </template>
              </el-table-column>
              <!--<el-table-column label="身份证照片">
                <template slot-scope="scope">
                  &lt;!&ndash;身份证目前功能没开发出来，&ndash;&gt;
                  <el-button disabled
                    size="mini"
                    type="text"
                    @click="handleLookCardPhoto(scope.$index, scope.row)">查看照片</el-button>
                </template>
              </el-table-column>-->
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="text" @click="handleEditOuterWorkerManage(scope.$index, scope.row)">编辑</el-button>
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
              :page-sizes="[20,30, 50, 100]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
            </el-pagination>
          </div>
        </div>
      </el-col>
    </el-row>
    <!--操作---编辑-->
    <div class="addVisitorDialog">
      <el-dialog title="员工管理信息" width="1200px"
                 :visible.sync="editOuterWorkerManageList"
                 :close-on-click-modal="false"
                 :before-close="editOuterWorkerManageDialogClose">
        <el-form :model="outWorkerEditForm"
                 :rules="editRules"
                 size="medium"
                 label-width="100px"
                 class="marginTop20 common-form-inline addVisitorDialog_form editWorkerMaganage"
                 ref="workerManageList">

            <el-form-item label="姓名" prop="userName">
              <el-input v-model="outWorkerEditForm.userName" placeholder="请输入姓名"></el-input>
            </el-form-item>
            <el-form-item label="电话号码" prop="telephone">
              <el-input v-model="outWorkerEditForm.telephone" placeholder="请输入电话号码" @change="editChangeTelephoto"></el-input>
            </el-form-item>
            <el-form-item label="身份证号" prop="idCard">
              <el-input v-model="outWorkerEditForm.idCard" placeholder="请输入身份证号" @change="editInputIDCard"></el-input>
            </el-form-item>
          <el-form-item label="性别">
            <!--<el-select v-model="formDataAdd.selecetSex" placeholder="请选择性别">
              <el-option label="男" value="男"></el-option>
              <el-option label="女" value="女"></el-option>
            </el-select>-->
            <el-radio v-model="editSexRadio" label="1" class="maleStyle">男</el-radio>
            <el-radio v-model="editSexRadio" label="2" class="femaleStyle">女</el-radio>
          </el-form-item>
          <el-form-item label="员工类别" prop="personType">
            <el-select v-model="outWorkerEditForm.editPersonType" @change="editSelectPersonType" placeholder="请选择员工类别">
              <el-option label="内部员工" value="内部员工"></el-option>
              <el-option label="外部员工" value="外部员工"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="员工工号">
            <el-input v-model="outWorkerEditForm.userNo" placeholder="请输入工号" :disabled="isShowAddListTree" @change="editInputUserNo"></el-input>
          </el-form-item>
            <el-form-item label="出生日期">
              <el-date-picker disabled
                v-model="editDateValue"
                type="date" placeholder="请选择出生年月"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>
            <el-form-item label="员工类型">
              <el-select v-model="editRoleName" @change="editSelectAddRole" placeholder="请选择">
                <el-option
                  v-for="(item,index) in editSelectRoleOptions"
                  :key="index"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="所属园区">
              <el-select v-model="editParkName" @change="editSelectAddGuishuPark" placeholder="请选择"  :disabled="isDisabledParkSelect">
                <el-option
                  v-for="(item,index) in editSelectParkOptions"
                  :key="index"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          <el-form-item label="上传照片" style="width:500px;">
            <div>
              <el-select v-model="formDataAdd.photo" placeholder="请选择"><!-- :disabled="isUndisabeld"-->
                <el-option label="本地上传" value="本地上传"></el-option>
                <el-option label="拍照上传" value="拍照上传"></el-option>
              </el-select>
              <el-upload
                class="upload-demo"
                ref="uploadPerson0"
                  id="uploadPerson0"
                action="string"
                accept="image/jpeg,image/png,image/jpg"
                list-type="picture"
                :auto-upload="true"
                :file-list="fileList"
                :before-upload="onBeforeUploadImage"
                :http-request="UploadImage"
                :on-remove="handlePictureCardRemove"
                :before-remove="onBeforeRemoveImage"
                :on-exceed="handleExceedUpload" :limit="1"
              >
                <div><el-button size="small" type="primary" v-show="formDataAdd.photo==='本地上传'" >点击本地上传</el-button></div>
              </el-upload>
              <div><el-button style="position: absolute;top: 38px; left: 0px;"
                              size="small" type="primary" v-show="formDataAdd.photo==='拍照上传'"
                              @click="handlePhotoUpload()">点击拍照上传</el-button></div>
             <!-- <el-dialog :visible.sync="dialogVisibleBendiUpload">
                <img width="100%" :src="uploadImageUrl" alt="">
              </el-dialog>-->
            </div>
            <div style="position: absolute;top: 10px;left: 420px;z-index: 100" v-show="imageGoBackShow">
              <img style="width: 400px;height: 225px;" :src="uploadImageUrlDiv" alt="">
            </div>
          </el-form-item>
          <el-form-item style="width: 700px;" class="currentOrg"  label="当前归属组织">{{formDataAdd.orgText}}
            <!--<div style="margin-left: -100px"></div>-->
          </el-form-item>
          <el-form-item label="归属组织" style="width: 500px;" prop="org">
            <el-tree
              :data="dataTanchuangTree"
              :props="defaultPropsTan"
              v-model="formDataAdd.org"
              @node-click="tanchuangClick">
            </el-tree>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="editOuterWorkerManageCancel()">取消</el-button>
          <el-button type="primary" @click.native="editOuterWorkerManageDialogAddFn(outWorkerEditForm)">提交</el-button>
        </div>
      </el-dialog>
    </div>
    <!-- 新增弹窗 -->
    <!--<AddDialog :visible="isShowAddDialog" />-->
    <el-dialog
      title="园区员工管理"
      :close-on-click-modal="false"
      :visible.sync="dialogVisibles"
      @close="handleDialogClose"
      width="1200px">
      <div class="addVisitorDialog">
        <!-- 表单 -->
        <el-form
          :inline="true"
          ref="addOuterWorkerInfo"
          :model="formDataAdd"
          :rules="rules"
          size="medium"
          label-width="100px"
          class="marginTop20 common-form-inline addVisitorDialog_form">
          <el-form-item label="姓名" prop="username">
            <el-input v-model="formDataAdd.username" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item label="电话号码" prop="tel">
            <el-input v-model="formDataAdd.tel" placeholder="请输入电话号码" @change="changeTelephoto"></el-input>
          </el-form-item>
          <el-form-item label="身份证号" prop="card">
            <el-input v-model="formDataAdd.card" placeholder="请输入身份证号" @change="handleInputIDCard"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <!--<el-select v-model="formDataAdd.selecetSex" placeholder="请选择性别">
              <el-option label="男" value="男"></el-option>
              <el-option label="女" value="女"></el-option>
            </el-select>-->
            <el-radio v-model="sexRadio" label="1" class="maleStyle">男</el-radio>
            <el-radio v-model="sexRadio" label="2" class="femaleStyle">女</el-radio>
          </el-form-item>
          <el-form-item label="员工类别" prop="personType">
            <el-select v-model="formDataAdd.personType" @change="selectPersonType" placeholder="请选择员工类别">
              <el-option label="内部员工" value="内部员工"></el-option>
              <el-option label="外部员工" value="外部员工"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="员工工号" prop="userno">
            <el-input v-model="formDataAdd.userno" placeholder="请输入员工工号" :disabled="isShowAddListTree" @blur="blurUserNoChangeFun" @change="changeUserNumber" ></el-input><!--:disabled="isShowAddListTree"-->
          </el-form-item>
          <el-form-item label="出生日期">
            <el-date-picker
              v-model="selectDateValue" disabled
              type="date" placeholder="请选择出生年月"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"></el-date-picker>
          </el-form-item>
          <el-form-item label="员工类型">
            <el-select v-model="selectRoleName" @change="selectAddRole" placeholder="请选择">
              <el-option
                v-for="(item,index) in selectRoleOptions"
                :key="index"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属园区">
            <el-select v-model="selectGuishuParkName" @change="selectAddGuishuPark" :disabled="isDisabledParkSelect" placeholder="请选择">
              <el-option
                v-for="(item,index) in selectParkOptions"
                :key="index"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="上传照片" style="width:700px" prop="photo">
            <div>
              <el-select v-model="formDataAdd.photo" placeholder="请选择"><!-- :disabled="isUndisabeld"-->
                <el-option label="本地上传" value="本地上传"></el-option>
                <el-option label="拍照上传" value="拍照上传"></el-option>
              </el-select>
              <el-upload
                class="upload-demo"
                ref="uploadPerson0"
                id="uploadPerson0"
                action="string"
                accept="image/jpeg,image/png,image/jpg"
                list-type="picture"
                :show-file-list="true"
                :before-upload="onBeforeUploadImage"
                :before-remove="onBeforeRemoveImage"
                :http-request="UploadImage"
                :on-preview="handlePictureCardPreview"
                :on-remove="handlePictureCardRemove"
                :on-exceed="handleExceedUpload" :limit="1"
              >
                <div><el-button size="small" type="primary" v-show="formDataAdd.photo==='本地上传'" >点击本地上传</el-button></div>
              </el-upload>
              <div><el-button style="position: absolute;top: 38px; left: 0px;"
                size="small" type="primary" v-show="formDataAdd.photo==='拍照上传'"
                @click="handlePhotoUpload()">点击拍照上传</el-button></div>
            </div>
            <div style="position: absolute;top: 10px;left: 420px;z-index: 100" v-show="imageGoBackShow">
              <img style="width: 400px;height: 225px;" :src="uploadImageUrlDiv" alt="">
            </div>
          </el-form-item>
          <el-form-item style="width: 700px;" label="当前归属组织">{{formDataAdd.orgText}}</el-form-item>
          <el-form-item label="归属组织" style="width: 700px;" prop="org">
            <!--<el-select v-model="formDataAdd.department" placeholder="请选择">-->
            <!--<el-option label="三一重工" value="三一重工"></el-option>-->
            <!--<el-option label="三一重能" value="三一重能"></el-option>-->
            <!--<el-option label="三一筑工" value="三一筑工"></el-option>-->
            <!--</el-select>-->
            <el-tree
                     :data="dataTanchuangTree"
                     :props="defaultPropsTan"
                     v-model="formDataAdd.org"
                     @node-click="tanchuangClick"><!--isShowAddListTree-->

            </el-tree>
            <!--<el-tree :data="dataTanchuangInnerTree" :props="defaultPropsTanInner"   @node-click="tanchuangInnerClick"> </el-tree>-->

          </el-form-item>
        </el-form>
        <!-- 表单 end -->
      </div>
      <span slot="footer" class="dialog-footer">
      <el-button @click="handleDialogCancle">取 消</el-button>
      <el-button type="primary" @click="handleDialogConfirm">确 定</el-button>
    </span>
    </el-dialog>
    <!--拍照上传弹窗start-->
    <div class="tempVisitInput_camera">
      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="1100px"
        :close-on-click-modal="false"
        :before-close="handleClose">
        <div class="fatheramalltitle">
          <input type="hidden" value="" id="photoUrl" />
          <!--<iframe width="100%" height="500" frameborder="0" src="http://10.19.8.22:8081/sanyvisitorcontrol/photo/photo.html" id="myframe" name="myframe" />-->
          <iframe width="100%" height="500" frameborder="0" src="http://10.19.8.21:8181/sanyvisitorcontrol/photo/photo.html" id="myframe" name="myframe" />
          <!--<iframe width="100%" height="400" frameborder="0" src="http://localhost/sanyvisitorcontrol/photo/photo.html" id="myframe" name="myframe" />-->
          <el-tooltip content="必须点击拍照后再确定，否则将保存默认图片显示区内图片" placement="top" class="small-title">
            <img src="../../../../src/assets/images/imageSize.png" style="vertical-align: middle" alt="">
          </el-tooltip>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleConfirmCamera">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <!--拍照上传弹窗end-->
    <!-- 查看图片 -->
    <el-dialog title="图片信息"
               :visible.sync="dialogVisibleImg"
               :close-on-click-modal="false"
               class="edit-form">
      <div class="inputText" style="display: flex;justify-content: center;align-items: center;overflow: hidden;">
        <img :src="photoImageUrl" alt="" style="max-width:100%;">
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
import BASE_URL from '../../../api/global'
import {
  fileUploadRequest,
} from '../../../api/businessManageApi'
import {
  reqUploadImages,
  reqUploadPhotos,
  reqRolelist,
  reqOuterTrees,
  reqSearchList,
  reqUploadData,
  reqUploadImagesFile,
  reqAddDepartment,
  reqParkServiceList,
  reqOuterManageAddList,
  reqEmpowermentTree,//内部员工tree
  reqEditWorkerManage,//编辑
  reqEmpowermentOutTree,//
  regExpUserNumber,
  regDeleteData,
  regRoleCodeIsMengang,
  regOrgMengangTree,
  regManyAuthoriaztion,
  regIDCard,
  regTelephone,
}from '../../../api'
import {checkPhone,checkIDCard} from '../../../util/regExp.js'
export default {
  name: 'ExternalStaffManage',
    data() {
      return {
        isRegexg:false,//验证信息
        EditFormUserNo:'',
        editFormUserTelephone:'',
        fileList:[],
        //新增弹窗start
        dataTree: [], //树
        defaultData:0,//默认tree展开的id
        orgId:[],//选择左侧tree
        defaultProps: {
          children: 'nodes',
          label: 'orgText',
          disabled:this.disabledFn
        },
        sexRadio:'1',//默认
        editSexRadio:'1',//默认
        multipleSelectionDel:[],//主列表选择删除项
        editOuterWorkerManageList:false,//编辑弹窗
        editRules:{
          userName: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
          ],
          telephone: [
            { required: true, message: '请输入电话号码', trigger: 'blur' }
          ],
          idCard: [
            { required: true, message: '请输入身份证', trigger: 'blur' }
          ],
        },
        outWorkerEditForm:{
          userName:'',
          telephone:'',
          idCard:'',
          editId:'',//主键ID
          userNo:'',
          editPersonType:'',//员工类型
        },//编辑
        editPersonTypeToHoutai:'',//编辑时传值
        editRoleName:'',
        editRoleCode:'',
        editDateValue:'',
        editParkName:'',
        editParkCode:'',
        editSelectParkOptions:[],//编辑园区Arr
        editSelectRoleOptions:[
          {
            value:'1',
            label:'员工'
          },{
            value:'2',
            label:'门岗'
          }
        ],//编辑角色
        dialogVisibleBendiUpload:false,//本地上传图片点击图片放大弹窗
        dialogVisibleImg: false, // 查看图片弹窗是否显示
        dialogVisibles: false, // 弹窗显示
        dialogVisible: false, // 弹窗显示
        formDataAdd: {
          username: '',
          userno:'',
          tel: '',
          card: '',
          photo: '',
          selecetSex:'',
          personType:'',//选择内外部员工
          org:'',
          orgText:'',
        },
        rules: {
          username: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
          ],
          tel: [
            { required: true, message: '请输入电话号码', trigger: 'blur' }
          ],
          card: [
            { required: true, message: '请输入身份证', trigger: 'blur' }
          ],
          personType: [
            { required: true, message: '请输入员工类型', trigger: 'blur' }
          ],
          photo: [
            { required: true, message: '请上传图片', trigger: 'blur' }
          ],
          org: [
            { required: true, message: '请选择组织', trigger: 'blur' }
          ]
        },
        selectRoleOptions:[
          {
            value:'1',
            label:'员工'
          },{
            value:'2',
            label:'门岗'
          }
        ], //新增---角色list
        roleCode: '', // '1'：员工， '2':门岗，'3':管理, '4':系统管理员
        isRepeat:false,//工号是否重复
        selectParkOptions:[], //新增---所属园区lsit
        selectRoleName:'',//新增弹窗选择角色name
        selectRoleCode:'',//新增弹窗选择角色code
        selectGuishuParkName:'',//新增弹窗选择归属园区name
        selectGuishuParkCode:'',//新增弹窗选择归属园区code
        selectDateValue:'',//新增弹窗选择出生年月日期
        org:'',//新增弹窗---选择tree
        uploadImageUrl:'',//新增弹窗---上传本地图片后返回的url
        photoPicture:'',//点击新增确定，给后台传递的base64加密图片（上传图片时候后台返回的值）
        uploadImageUrlDiv:'',//编辑弹窗---上传本地图片后返回的url
        imageGoBackShow:true,//编辑时回写照片true:显示，，false：隐藏
        dialogImageUrl:"",//新增弹窗---拍照src
        isUndisabeld:true, //是否取消禁止选择下拉
        isDisabledParkSelect:false,//新增所属园区是否可选
        //新增弹窗end
        isUploadImage:false,//是否自动上传图片
        isShow:true,//数据导入按钮显示与隐藏
        isShowImage:true,//照片导入按钮显示与隐藏
        isShowAddListTree:true,//根据内外部员工来切换对应归属部门的tree
        photoImageUrl:'',//查看---是否已上传照片（图片地址）
        dataTanchuangTree: [], //树---外部员工
        dataTanchuangInnerTree: [], //树---内部员工
        orgID:'', //编辑---选择组织ID
        uploadphotoPicture:'',//编辑时的向后台传的base64
        defaultPropsTan: {
          children: 'nodes',
          label: 'orgText'
        },
        defaultPropsTanInner: {
          children: 'nodes',
          label: 'orgText'
        },
        formInline: {
          username: '', // 员工姓名
          enterPhoto: '', // 录入照片
          meetDemand: '' // 满足要求
        },
        tableData: [], //主页数据列表数组
        currentPage: 1,
        pageSize:20,
        total:0,
        isShowAddDialog: false
      };
    },

    mounted(){
    // var orgId = ''
    this.getOuterTrees()
      //初始化渲染主列表
      const{enterPhoto,meetDemand,username} = this.formInline
      const{currentPage,pageSize} = this
      const {orgId} = this
      this.getSearchListFun(enterPhoto,meetDemand,username,orgId,currentPage,pageSize)
      //新增请求---角色
     // this.getRoleList()   0226修改为不请求后台返回数据，应该写死
      //新增请求---归属园区
      var dataname = ''
      this.getSelectParkItem(dataname)
      this.roleCode = sessionStorage.getItem('roleCode')
    },

    methods: {

      // flag不是1的树状菜单被禁用
      disabledFn(data,node){
        if(data.flag===2){
          return true;
        }else{
          return false;
        }
      },

      /*函数名：reqOuterTrees
        参数：
        描述：初始化请求树状结构
      * */
      async getOuterTrees(){
				var step = 0
        const res = await reqOuterTrees()
          if(res.data.code === 200){
          var dataTreeNew = JSON.parse(res.data.data)
				  console.log(dataTreeNew[0]);
          this.dataTree.push(dataTreeNew[0])

          console.log('resTree:',this.dataTree)
          }
          this.defaultData = this.dataTree[0].id  //默认tree状结构展开
      },
      /*函数名：getSearchListFun
      参数：
      描述：主列表被渲染的函数
    * */
      async getSearchListFun(isImgUrl,imgVerify,userName,orgId,pageNum,pageSize){
        const res = await reqSearchList(isImgUrl,imgVerify,userName,orgId,pageNum,pageSize)
        if(res.data.code === 200){
          this.tableData = res.data.data.list
          this.total = res.data.data.total
          console.log('主列表返回的list:',this.tableData)
        }
      },
      /*函数名：beforeUpload
      参数：
      描述：文件状态改变时的钩子，添加文件时都会被调用
    * */
      beforeUpload(file, fileList){
        this.isShow = false
      },
      beforeUploadImages(file, fileList){ //照片导入
        this.isShowImage = false
      },
      /*函数名：removeDoc
      参数：
      描述：文件列表移除文件时的钩子
    * */
      removeDoc(file, fileList){
        this.isShow = true
      },
      removeImages(file, fileList){
        this.isShowImage = true
      },
      /*函数名：handleExceed
      参数：
      描述：文件超出个数限制时的钩子
    * */
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      /*函数名：handleExceedImages
      参数：
      描述：文件超出个数限制时的钩子
    * */
      handleExceedImages(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      /*函数名：handleInputIDCard
       参数：
       描述：只有输入身份证后才可以选择拍照或上传图片
     * */
      async handleInputIDCard(){
        // this.formDataAdd.card !== ''?this.isUndisabeld = false:this.isUndisabeld = true
        checkIDCard(this.formDataAdd.card,this)  //前台验证
        if(this.formDataAdd.card.length >=14){
          this.getStartTime()
        }
        const res = await regIDCard(this.formDataAdd.card)
        if(res&&res.data.code!==200){
          this.$message({type:'error',message:res.data.msg})
          this.formDataAdd.card = ''
          return
        }
      },
      //主列表选择删除
      handleSelectionChangeDelete(val) {
        this.multipleSelectionDel = val;
        console.log('multipleSelection:',this.multipleSelectionDel)
      },
      /**
       * 方法名：deleteContentItemSubmit
       * 参数：
       * 描述：点击删除按钮--列表内容项
       */
      deleteContentItemSubmit(){
        if(this.multipleSelectionDel.length === 0){
          this.$message({
            type:'error',
            message:'请选择要删除的对象'
          })
          return
        }
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const {multipleSelectionDel} = this
          // console.log('multipleSelectionDel:',multipleSelectionDel)
          var parkIdArr = []
          for (var i = 0; i < multipleSelectionDel.length; i++) {
            //向后台发送删除请求
            // var userObj = {}
            var userId = multipleSelectionDel[i].id
            var userNo = multipleSelectionDel[i].userNo
            // userObj.id = userId
            // userObj.userNo = userNo
            // parkIdArr.push(userObj)
            this.delItemData(userNo,userId)
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      //删除后台请求---主列表项内容
      async delItemData(userNo,id){
        const res = await regDeleteData(userNo,id)
        if(res&&res.data.code===200){
          ///删除后刷新主列表
          const{enterPhoto,meetDemand,username} = this.formInline
          const{currentPage,pageSize} = this
          const {orgId} = this
          this.getSearchListFun(enterPhoto,meetDemand,username,orgId,currentPage,pageSize)
        }
      },
      /**
       * 方法名：batchAuthoriaztion
       * 参数：
       * 描述：点击批量授权按钮
       */
      batchAuthoriaztion(){
        if(this.multipleSelectionDel.length === 0){
          this.$message({
            type:'error',
            message:'请选择要授权的对象'
          })
          return
        }
        this.$confirm('确定授权?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const {multipleSelectionDel} = this
          console.log('multipleSelectionDel:',multipleSelectionDel)
          var parkIdArr = []
          for (var i = 0; i < multipleSelectionDel.length; i++) {
            //向后台发送授权请求
            var personId = multipleSelectionDel[i].personId
            parkIdArr.push(personId)
          }
          this.getManyAuthoriaztion(parkIdArr)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消授权'
          });
        });
      },
      //批量授权与后台请求
      async getManyAuthoriaztion(personId){
        const res = await regManyAuthoriaztion(personId)
        if(res&&res.data.code===200){
          this.$message({type:'success',message:'授权成功'})
          ///刷新界面
          const{enterPhoto,meetDemand,username} = this.formInline
          const{currentPage,pageSize} = this
          const {orgId} = this
          this.getSearchListFun(enterPhoto,meetDemand,username,orgId,currentPage,pageSize)
        }
      },
      //编辑出生日期变化
      async editInputIDCard(){
        checkIDCard(this.outWorkerEditForm.idCard,this)  //前台验证
        if(this.outWorkerEditForm.idCard.length >=14){
          const {idCard} = this.outWorkerEditForm
          let startYear = idCard.toString().substr(6,4)
          let startMouth = idCard.substr(10,2)
          let startDay = idCard.substr(12,2)
          this.editDateValue = startYear +'-'+ startMouth +'-'+ startDay

          const res = await regIDCard(this.outWorkerEditForm.idCard)
          if(res&&res.data.code!==200){
            this.$message({type:'error',message:res.data.msg})
            this.outWorkerEditForm.idCard = ''
            return
          }
        }
      },
      //编辑输入手机号前台验证
      async editChangeTelephoto(){
        checkPhone(this.outWorkerEditForm.telephone,this)
          const res = await regTelephone(this.outWorkerEditForm.telephone)
          if(res&&res.data.code!==200){
            this.$message({type:'error',message:res.data.msg})
            this.outWorkerEditForm.telephone = ''
          }else{
            if( this.outWorkerEditForm.editPersonType==='外部员工'){
              this.outWorkerEditForm.userNo = this.outWorkerEditForm.telephone
              this.regExpUserNumberFun(this.outWorkerEditForm.telephone)
            }
          }
      },
      //编辑--外部员工时验证工号是否重复
      changeUserNumber(){
        if( this.formDataAdd.personType==='外部员工'){
          this.formDataAdd.userno = this.formDataAdd.tel
          // this.regExpUserNumberFun( this.formDataAdd.userno)
          this.addregExpUserNumberFun( this.formDataAdd.userno)
        }
        if( this.outWorkerEditForm.editPersonType==='外部员工'){
          this.outWorkerEditForm.userNo = this.outWorkerEditForm.telephone
          this.regExpUserNumberFun(this.outWorkerEditForm.userNo)
        }
      },
      getStartTime(){
        const {card} = this.formDataAdd
        let startYear = card.toString().substr(6,4)
        let startMouth = card.substr(10,2)
        let startDay = card.substr(12,2)
        this.selectDateValue = startYear +'-'+ startMouth +'-'+ startDay
      },
      /*函数名：submitUpload
       参数：
       描述：确定数据导入
     * */
      submitUpload() {
        let list = document.getElementsByClassName('el-upload-list__item is-ready')
        if(list.length == 0){
          this.$message({
            type:'warning',
            message:"请选择需要导入的模板！"
          })
          return;
        }
        this.$refs.upload.submit();
      },
      uploadSectionFile(param){
        var fileObj = param.file;
        // var form = new FormData($('#formBiao')[0]);
        var form = new FormData( this.$refs.upload);
        form.append("file", fileObj);
        //与后台交互
         this.uploadDataFun(form)
      },
      async uploadDataFun(formData){
        const res = await reqUploadData(formData)
        if(res.data.code === 200){
          this.$message({
            type:'success',
            message:res.data.data
          })
          console.log('res:',res)
          //照片上传成功后清除按钮下的文件
          this.$refs.upload.clearFiles();
          this.isShow = true
        }
      },
      /*函数名：submitUploadImages
       参数：
       描述：确定数据导入
     * */
      submitUploadImages() {
        let list = document.getElementsByClassName('el-upload-list__item is-ready')
        if(list.length == 0){
          this.$message({
            type:'warning',
            message:"请选择需要导入的模板！"
          })
          return;
        }
        this.$refs.uploadImage.submit();
      },
      uploadSectionImageFile(param){
        var fileObj = param.file;
        // var form = new FormData($('#formImage')[0]);
        var form = new FormData(this.$refs.uploadImage);
        form.append("file", fileObj);
        //与后台交互
         this.uploadImageDataFun(form)
      },
      async uploadImageDataFun(formData){
        const res = await reqUploadImagesFile(formData)
        if(res.data.code === 200){
          this.$message({
            type:'success',
            message:res.data.data
          })

          // console.log('res:',res)
          //照片上传成功后再次渲染主列表
          const{enterPhoto,meetDemand,username} = this.formInline
          const{currentPage,pageSize} = this
          const {orgId} = this
          this.getSearchListFun(enterPhoto,meetDemand,username,orgId,currentPage,pageSize)
          //照片上传成功后清除按钮下的文件
          this.$refs.uploadImage.clearFiles();
          this.isShowImage = true
        }
      },

      handleNodeClick(data,node,aa) {
        console.log('data:',data);
        console.log('node:',node);
        console.log('aa:',aa);
        // var orgId = data.orgId
        //this.getOuterTrees()
      },
      //
      onSubmit() {
        const{enterPhoto,meetDemand,username} = this.formInline
        const{currentPage,pageSize} = this
        this.orgId = this.$refs.tree.getCheckedNodes().map(function(item){
            return item.orgId
          })
        this.getSearchListFun(enterPhoto,meetDemand,username,this.orgId,currentPage,pageSize)

      },
      handleSizeChange(val) {
        const{enterPhoto,meetDemand,username} = this.formInline
        this.pageSize = val
        const{currentPage} = this
        this.orgId = this.$refs.tree.getCheckedNodes().map(function(item){
          return item.orgId
        })
        this.getSearchListFun(enterPhoto,meetDemand,username,this.orgId,currentPage,this.pageSize)

      },
      handleCurrentChange(val) {
        const{enterPhoto,meetDemand,username} = this.formInline
        this.currentPage = val
        const{pageSize} = this
        this.orgId = this.$refs.tree.getCheckedNodes().map(function(item){
          return item.orgId
        })
        this.getSearchListFun(enterPhoto,meetDemand,username,this.orgId,this.currentPage,this.pageSize)


      },
      handleLookPhoto(index, row) {
        this.dialogVisibleImg = true
        this.photoImageUrl = row.imgUrlUpload
        console.log('imageUrl:',this.photoImageUrl);

      },
      handleLookCardPhoto(index, row) {
        console.log(index, row);
      },
      //新增按钮
      handleAdd () {
        this.dialogVisibles = true
        //this.addDepatmentInner()   //内部员工tree
        console.log('coleCode:',this.roleCode)
        if(this.roleCode==='2'){
          //禁止选择所属园区--根据返回值回显
          this.isDisabledParkSelect = true
          //门岗调用
          this.IsRoleCodeMengang()
          //tree
          this.addDepartmentMengangTree()
        }else{
          this.isDisabledParkSelect = false
          this.addDepatment()       //外部员工tree
        }
        //清空文本框
        this.formDataAdd.username = ''
        this.formDataAdd.userno = ''
        this.formDataAdd.tel = ''
        this.formDataAdd.card = ''
        this.formDataAdd.personType = ''
        this.formDataAdd.org = ''
        this.selectDateValue = ''
        this.sexRadio = '1'
        this.selectRoleName = ''
        this.selectGuishuParkName = ''
        this.uploadImageUrl = ''
        this.selectRoleCode = ''
        this.selectGuishuParkCode = ''
        this.formDataAdd.orgText = ''
        this.$refs.uploadPerson0.clearFiles();
        this.imageGoBackShow = false  //回显照片隐藏

      },
      //点击新增、编辑时，判断roleCode是不是门岗，如果是门岗，就调用以下的接口
      async IsRoleCodeMengang(){
        const res = await regRoleCodeIsMengang()
        //如果成功回显
        if(res&&res.data.code===200){
          this.selectGuishuParkName = res.data.data.parkName
          this.selectGuishuParkCode = res.data.data.parkCode
        }
      },
      //新增输入手机号前台验证
      async changeTelephoto(){
        checkPhone(this.formDataAdd.tel,this)
        const res = await regTelephone(this.formDataAdd.tel)
        if(res&&res.data.code!==200){
          this.$message({type:'error',message:res.data.msg})
          this.formDataAdd.tel = ''
        }else{
          if( this.formDataAdd.personType==='外部员工'){
            this.formDataAdd.userno = this.formDataAdd.tel
            // this.regExpUserNumberFun(this.formDataAdd.tel)
            this.addregExpUserNumberFun(this.formDataAdd.tel)
          }
        }
      },
      //新增---归属部门请求接口函数---外部员工
      async addDepatment(){
        const res = await reqEmpowermentOutTree()
        if(res.data.code === 200){
          this.dataTanchuangTree = JSON.parse(res.data.data)
        }
      },
      //新增---归属部门请求接口函数---门岗
      async addDepartmentMengangTree(){
        const res = await regOrgMengangTree()
        if(res.data.code === 200){
          this.dataTanchuangTree = JSON.parse(res.data.data)
        }
      },
      //新增---归属部门请求接口函数---内部员工
      async addDepatmentInner(){
        const res = await reqEmpowermentTree()
        if(res.data.code === 200){
          this.dataTanchuangInnerTree = JSON.parse(res.data.data)
        }
      },
      //弹窗选择树---选择外部
      tanchuangClick(data){
				console.log('园区员工管理',data);
				if(data.orgId!="50020020"){
					this.formDataAdd.org = data.orgId
					this.orgID = data.orgId
					this.formDataAdd.orgText = data.orgText
				}
      },
      //弹窗选择树---选择内部
      tanchuangInnerClick(data){
        this.formDataAdd.org = data.orgId
        this.formDataAdd.orgText = data.orgText
      },
      /*函数名：handleExceedUpload
       参数：
       描述：文件超出个数限制时的钩子
     * */
      handleExceedUpload(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      // getUpload () {
      //   return `uploadPerson0`
      // },
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
        /*&&this.isUploadImage*/
      },
      async UploadImage(param){
        // var uploadObj = `uploadPerson0`
        var IDCard = this.formDataAdd.card
        // debugger
        var formData = new FormData(document.getElementById(`uploadPerson0`));
        formData.append('file', param.file)
        // formData.append('idCard', IDCard)
        const res = await reqUploadImages(formData)
        if(res.data.code === 200){
          this.$message({
            type:'success',
            message:'上传成功'
          })
          this.uploadImageUrl = res.data.data.photoUrl
          this.photoPicture = res.data.data.photoPicture
          this.imageGoBackShow = false  //回显照片隐藏
          console.log('上传图片后返回的路径data：',this.uploadImageUrl)
        }
      },
      //拍照与后台交互
      async getTakePhoto(imgStr){
        const res = await reqUploadPhotos(imgStr)
        if(res.data.code === 200){
          this.$message({
            type:'success',
            message:'上传成功'
          })
          this.uploadImageUrl = res.data.data.photoUrl
          this.uploadImageUrlDiv = res.data.data.photoUrl
          this.photoPicture = res.data.data.photoPicture
          console.log('拍照返回的路径data：',this.uploadImageUrl)
          this.imageGoBackShow = true  //回显照片显示
        }
      },
      //关闭X新增弹窗
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
            Webcam.reset();
          })
          .catch(_ => {});
      },
      // 点击拍照按钮，打开拍照弹窗
      handlePhotoUpload() {
        this.dialogVisible = true;
        myframe.window.Webcam.attach('#my_camera');
      },
      // 点击拍照上传弹窗确定按钮
      handleConfirmCamera () {
        this.dialogVisible = false;
        const url = myframe.window.getTakePhotoUrl()
        console.log('图片地址:',url)
         this.getTakePhoto(url)
        myframe.window.Webcam.reset()
        //查询列表---渲染主列表
        const{enterPhoto,meetDemand,username} = this.formInline
        const{currentPage,pageSize} = this
        const {orgId} = this
        this.getSearchListFun(enterPhoto,meetDemand,username,orgId,currentPage,pageSize)
      },

      // 新增确定按钮---与后台交互逻辑
     async handleDialogConfirm() {
        //this.$emit('dialogvisible', this.dialogVisibles)
        // Source：1表示从我的访客信息[全部员工]页面过来的添加信息
        //this.formInline.source = 1
        this.$refs.addOuterWorkerInfo.validate(async (valid) => {
          if (!valid) return;
          const{username,userno,tel,card,personType,org} = this.formDataAdd
          //验证工号是否重复
         if(this.isRepeat){
           this.$message({
             type:'error',
             message:'保存失败，此工号已存在'
           })
            return
         }
          const{selectDateValue,sexRadio,selectRoleName,selectRoleCode,selectGuishuParkName,selectGuishuParkCode,uploadImageUrl,photoPicture} = this
            if(sexRadio === '男'){this.sexRadio = '1'
            }else if(sexRadio === '女'){this.sexRadio = '2'}
            if(personType === '内部员工'){this.personType = '01'
            }else if(personType === '外部员工'){this.personType = '02'}
            this.addApplyRequestData(username,userno,tel,card,this.sexRadio,selectDateValue,org,uploadImageUrl,selectRoleCode,selectRoleName,selectGuishuParkCode,selectGuishuParkName,this.personType,photoPicture)

        });
      },
      //新增请求---角色与归属园区选择对应的name，code
      selectAddRole(val){
        let obj = {};
        obj = this.selectRoleOptions.find((item)=>{
          return item.value === val;
        });
        this.selectRoleName = obj.label
        this.selectRoleCode = obj.value
      },
      selectAddGuishuPark(val){
        let obj = {};
        obj = this.selectParkOptions.find((item)=>{
          return item.value === val;
        });
        this.selectGuishuParkName = obj.label
        this.selectGuishuParkCode = obj.value
      },
      //新增请求---根据选择员工类型渲染对应的归属部门
      selectPersonType(){
        if(this.formDataAdd.personType==='内部员工'){
          this.isShowAddListTree = false
          this.formDataAdd.userno=''
          // console.log('内部员工')
        }else if(this.formDataAdd.personType==='外部员工'){
          this.isShowAddListTree = true
          this.formDataAdd.userno = this.formDataAdd.tel
          //后台验证是否重复
          // this.regExpUserNumberFun(this.formDataAdd.tel)
          this.addregExpUserNumberFun(this.formDataAdd.tel)
          // console.log('外部员工')
        }
      },
      //新增请求---角色接口
      async getRoleList(){
        const res = await reqRolelist()
        if(res.data.code === 200){
          // this.selectRoleOptions = res.data.data
          var newRoleList = res.data.data
          for (var i = 0; i < newRoleList.length; i++) {
            var newRoleObj = {}
            newRoleObj.value = newRoleList[i].roleCode
            newRoleObj.label = newRoleList[i].roleName
            this.selectRoleOptions.push(newRoleObj)
          }
        }
      },
      //新增请求---归属园区接口
      async getSelectParkItem(username){
        const res = await reqParkServiceList(username)
        if(res.data.code === 200){
          var newResultArr = res.data.data
          for (var i = 0; i < newResultArr.length; i++) {
            var porterObj = {}
            porterObj.value = newResultArr[i].parkCode
            porterObj.label = newResultArr[i].parkName
            this.selectParkOptions.push(porterObj)
            this.editSelectParkOptions.push(porterObj)
          }
        }
      },
      // 新增请求数据接口
      async addApplyRequestData(username,userno,telephone,idCard,userSex,brithday,org,imgUrlUpload,roleCode,roleName,parkCode,parkName,employerType,photoPicture) {
        const res = await reqOuterManageAddList(username,userno,telephone,idCard,userSex,brithday,org,imgUrlUpload,roleCode,roleName,parkCode,parkName,employerType,photoPicture);
        // console.log('请求添加接口：',res)
        if (!res || res.data.code!==200) {
          this.$message({
            type: 'error',
            message: res.data.msg
          });
          return;
        }
        this.dialogVisibles = false
        this.$message({
          type: 'success',
          message: res.data.data
        });
        //刷新主列表
        const{enterPhoto,meetDemand} = this.formInline
        const{currentPage,pageSize} = this
        this.orgId = this.$refs.tree.getCheckedNodes().map(function(item){
          return item.orgId
        })
        this.getSearchListFun(enterPhoto,meetDemand,this.formInline.username,this.orgId,currentPage,pageSize)
        // 新增完之后清空
        this.formDataAdd.username = ''
        this.formDataAdd.tel = ''
        this.formDataAdd.card = ''
        this.formDataAdd.personType = ''
        this.selectDateValue = ''
        this.sexRadio = '1'
        this.selectRoleName = ''
        this.selectRoleCode = ''
        this.selectGuishuParkName = ''
        this.selectGuishuParkCode = ''
        this.formDataAdd.org = ''
        this.uploadImageUrl = ''
        this.photoImageUrl = ''//把照片路径清空
        this.formDataAdd.orgText = ''
        this.uploadImageUrlDiv = '' //回显照片清空
        this.$refs.uploadPerson0.clearFiles();
      },
      // 取消
      handleDialogCancle() {
        this.dialogVisibles = false
        this.isRepeat = false
        this.$emit('cancleadddialog', this.dialogVisibles)
      },
      // 弹窗关闭的回调
      handleDialogClose() {
        this.dialogVisibles = false
        this.isRepeat = false
        this.$emit('confirmadddialog', this.dialogVisibles)

      },
      //编辑内容---------------start------------------------------------------------------------------------------------------------>
      //编辑---根据选择员工类型渲染对应的归属部门
      editSelectPersonType(){
        if(this.outWorkerEditForm.editPersonType==='内部员工'){
          this.isShowAddListTree = false
          this.outWorkerEditForm.userNo=''
          // console.log('内部员工')
        }else if(this.outWorkerEditForm.editPersonType==='外部员工'){
          this.isShowAddListTree = true
          this.outWorkerEditForm.userNo = this.outWorkerEditForm.telephone
          //后台验证是否重复
          this.regExpUserNumberFun(this.outWorkerEditForm.userNo)
          // console.log('外部员工')
        }
      },
        //关闭弹窗
      editOuterWorkerManageDialogClose(){
        this.editOuterWorkerManageList = false
        this.isRepeat = false
        this.imageGoBackShow = true  //回显照片
        this.$refs.uploadPerson0.clearFiles();
      },
      editOuterWorkerManageCancel(){
        this.editOuterWorkerManageList = false
        this.isRepeat = false
        this.imageGoBackShow = true  //回显照片
        this.$refs.uploadPerson0.clearFiles();
      },
      //弹窗园区选择
      editSelectAddGuishuPark(val){
        let obj = {};
        obj = this.editSelectParkOptions.find((item)=>{
          return item.value === val;
        });
        this.editParkName = obj.label
        this.editParkCode = obj.value
      },
      //弹窗工号验证
      async editInputUserNo(){
        const {userNo} = this.outWorkerEditForm
        console.log('userNo:',userNo)
        const res = await regExpUserNumber(userNo)
          if(res&&res.data.code!==200){
            this.isRepeat = true
            this.$message({
              type:'error',
              message:'员工工号不可用'
            })
          }else{
            this.isRepeat = false
          }
      },
      //弹窗角色选择
      editSelectAddRole(val){
        let obj = {};
        obj = this.editSelectRoleOptions.find((item)=>{
          return item.value === val;
        });
        this.editRoleName = obj.label
        this.editRoleCode = obj.value
      },
        //点击编辑按钮
      handleEditOuterWorkerManage(index, row){


        this.editOuterWorkerManageList = true
        if(this.roleCode==='2'){
          //禁止选择所属园区--根据返回值回显
          this.isDisabledParkSelect = true
          //门岗调用
          this.IsRoleCodeMengang()
          //tree
          this.addDepartmentMengangTree()
        }else{
          this.isDisabledParkSelect = false
          this.addDepatment()       //外部员工tree
        }
        this.imageGoBackShow = true  //回显照片
        this.outWorkerEditForm = Object.assign({}, row);
        console.log('row:',row)
        this.outWorkerEditForm.userName = row.userName
        this.outWorkerEditForm.telephone = row.telephone
        this.editFormUserTelephone = row.telephone
        this.outWorkerEditForm.idCard = row.idCard
        this.outWorkerEditForm.userNo = row.userNo
        this.EditFormUserNo = row.userNo
        this.editDateValue = row.brithday
        this.editRoleName = row.roleName
        this.editRoleName = row.roleName
        this.editRoleCode = row.roleCode
        this.editParkName = row.parkName
        this.editParkCode = row.parkCode
        this.outWorkerEditForm.editId = row.id
        this.uploadImageUrlDiv = row.imgUrlUpload
        this.uploadphotoPicture = row.photoPicture
        this.orgID = row.org
        this.formDataAdd.orgText = row.sanyBasicShrOrg.orgText
        // this.outWorkerEditForm.editPersonType = row.employerType //02外  01内
        if(row.employerType==='01'){
          this.isShowAddListTree = false
          this.outWorkerEditForm.editPersonType = '内部员工'
        }else if(row.employerType==='02'){
          this.isShowAddListTree = true
          this.outWorkerEditForm.editPersonType = '外部员工'
        }
         this.editSexRadio = row.userSex   //1男  2女
        this.$refs.uploadPerson0.clearFiles()


      },
        // 提交编辑信息
      editOuterWorkerManageDialogAddFn(val){
        //验证工号是否重复
        if(this.isRepeat){
          this.$message({
            type:'error',
            message:'保存失败，此工号已存在'
          })
          return
        }
       /* if(this.isRegexg){
          this.$message({
            type:'error',
            message:'保存失败，手机号或身份号输入格式不正确'
          })
          return
        }*/
        this.$refs.workerManageList.validate(async (valid) => {
          if (!valid) return;
          this.editOuterWorkerManageList = false
          console.log('val:',val)
          //编辑与后台交互--》根据需要参数在val中找
          const{userName,telephone,idCard,editId,userNo}= this.outWorkerEditForm
          let {editDateValue,editRoleName,editRoleCode,editParkName,editParkCode,orgID,editSexRadio,photoPicture} = this
          console.log('提交uploadImageUrl:',this.uploadImageUrl)
          if(this.uploadImageUrl==='' && this.imageGoBackShow === true){
             this.uploadImageUrl=this.uploadImageUrlDiv
          }
          console.log('editPersonType:',this.outWorkerEditForm.editPersonType)
          if(this.outWorkerEditForm.editPersonType === '外部员工'){
             this.editPersonTypeToHoutai = '02'
          }else if(this.outWorkerEditForm.editPersonType === '内部员工'){
             this.editPersonTypeToHoutai = '01'
          }
          //如果编辑时不换图片，则默认取上一个图片
          if(photoPicture===''){
            photoPicture = this.uploadphotoPicture
          }
          this.getEditWorkerManage(editId,userName,telephone,idCard,editRoleCode,editRoleName,editParkCode,editParkName,editDateValue,this.uploadImageUrl,orgID,userNo,this.editPersonTypeToHoutai,editSexRadio,photoPicture)
        })
      },
        //提交编辑与后台交互
        async getEditWorkerManage(id,username,telephone,idCard,roleCode,roleName,parkCode,parkName,brithday,imgUrlUpload,org,userNo,employerType,userSex,photoPicture){
           const res = await reqEditWorkerManage(id,username,telephone,idCard,roleCode,roleName,parkCode,parkName,brithday,imgUrlUpload,org,userNo,employerType,userSex,photoPicture)
            if(res&&res.data&&res.data.code===200){
             this.$message({
               type:'success',
               message:res.data.data
             })
              //刷新列表
              const{enterPhoto,meetDemand,username} = this.formInline
              const{currentPage,pageSize} = this
              const {orgId} = this
              this.getSearchListFun(enterPhoto,meetDemand,username,orgId,currentPage,pageSize)
              this.$refs.uploadPerson0.clearFiles();
              //编辑完后清空
              this.outWorkerEditForm.userName = ''
              this.outWorkerEditForm.telephone = ''
              this.outWorkerEditForm.idCard = ''
              this.outWorkerEditForm.userNo = ''
              this.editDateValue = ''
              this.editRoleName = ''
              this.editRoleCode = ''
              this.editParkName = ''
              this.editParkCode = ''
              this.uploadImageUrl = ''
              this.orgID = ''

            }else{
              this.$message({
                type:'error',
                message:res.data.data
              })
            }
        },
      //本地上传图片后点击+放大
        handlePictureCardPreview(file){
          this.uploadImageUrl = file.url
          this.dialogVisibleBendiUpload = true
        },
        handlePictureCardRemove(file,fileList){
        },
        onBeforeRemoveImage(file,fileList){
          this.imgUrlUpload = ''
          console.log('清除imgUrlUpload',this.imgUrlUpload)
          this.$refs.uploadPerson0.clearFiles();
          // return this.$confirm(`确定移除${file.name}?`)
        },
      //验证员工工号是否有重复的
      blurUserNoChangeFun(){
        const {userno} =this.formDataAdd
        // this.regExpUserNumberFun(userno)
        this.addregExpUserNumberFun(userno)
      },
      //编辑后台交互验证
      async regExpUserNumberFun(loginAccount){
        //判断工号是否修改

        const res = await regExpUserNumber(loginAccount)
        if(res&&res.data&&res.data.code!==200){
          // debugger
          console.log('EditFormUserNo:',this.EditFormUserNo)
          console.log('outWorkerEditForm.userNo:',this.outWorkerEditForm.userNo)
          if(this.EditFormUserNo===this.outWorkerEditForm.userNo || this.editFormUserTelephone === this.outWorkerEditForm.telephone) {
            this.isRepeat = false
          }else{
            this.isRepeat = true
            this.$message({
              type:'error',
              message:'此工号已存在!'
            })
          }

        }else{
          this.isRepeat = false
        }
        console.log('isRepeat:',this.isRepeat)
      },
      //新增后台交互验证
      async addregExpUserNumberFun(loginAccount){
        const res = await regExpUserNumber(loginAccount)
        if(res&&res.data&&res.data.code!==200){
          this.isRepeat = true
          this.$message({
            type:'error',
            message:'此工号已存在!'
          })
        }else{
          this.isRepeat = false
        }
      },
      //下载模板
      uploadTemplate(){
        let url = `${BASE_URL}/user/SanyBasicShrUser/exportParkEmployer`
        url = encodeURI(encodeURI(url));
        location.href = url
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
        display:block;width:216px;
      }
      /deep/ .el-input{
        width: 216px;
      }
    }
    .tanchuangshu {
      /deep/.el-form-item__content{
        width: 300px;
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
    .maleStyle{
      margin-left: 43px;
    }
    .femaleStyle{
      margin-right: 66px;
    }
  }
  #formBiao{
    position: relative;
    /deep/ .el-upload-list{
      position: absolute;
      top: 30px;
      left: 0px;
      /deep/ .el-upload-list__item{
        width: 120px;
        /deep/ .el-upload-list__item-name{
          margin-right:20px;
        }
      }
    }
  }
  #formImage{
    position: relative;
    /deep/ .el-upload-list{
      position: absolute;
      top: 30px;
      left: 0px;
      /deep/ .el-upload-list__item{
        width: 120px;
        /deep/ .el-upload-list__item-name{
          margin-right:20px;
        }
      }
    }
  }
  .dataPhoto{
    /deep/ .el-input__inner{
      width: 150px;
    }
  }
  .dataPhoto /deep/.el-form-item{
    margin-right: 0px;
  }
  /deep/.el-dialog__footer{
    border-top: 1px solid #DCDFE6;/*#DCDFE6*/
  }
  /deep/ .el-dialog__header{
    border-bottom: 1px solid #DCDFE6;
  }
  .editWorkerMaganage{
  /deep/.el-form-item {
    display: inline-block;
  }
  }
  /deep/.el-upload-list--picture{
    position: absolute;
    top:0;
    left: 420px;
  }
   /deep/.el-upload-list__item{
    height:225px;
    width: 400px;
  }
  /deep/.el-upload-list__item-thumbnail{
    width: 120%;
    height: 100%;
  }

  /deep/ .el-upload-list__item-name{
    display: none;
  }
  .currentOrg{
    &>div{
      margin-left: 0px;
    }
    /deep/ .el-form-item__content{
      margin-left: 0px;
    }
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


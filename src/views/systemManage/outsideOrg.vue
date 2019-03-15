<template>
  <div>
   <!-- <p class="common-breadcrumb">外部组织机构</p> -->
    <el-row class="marginTop20" :gutter="20">
      <el-col :span="4">
        <div class="">
          <el-tree
            :data="outTreeData"
                        node-key="id"
            :default-expanded-keys="[14445]"
            highlight-current
            :props="defaultProps"
            @node-click="handleNodeClick"></el-tree>
        </div>
      </el-col>
      <el-col :span="20">
        <div class="">
          <el-form
            :inline="true"
            :model="formInline"
            size="medium"
            class="marginTop20 common-form-inline"
            >
              <el-form-item label="上级机构编码">
                <el-input v-model="formInline.fatherId" disabled></el-input>
              </el-form-item>
              <el-form-item label="上级机构名称">
                <el-input v-model="formInline.fatherTitle" disabled></el-input>
              </el-form-item>
              <!-- <el-form-item label="本级机构编码">
                <el-input v-model="formInline.orgId" disabled></el-input>
              </el-form-item><br/> -->
              <el-form-item label="本级机构名称">
                <el-input v-model="formInline.orgText"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">保存</el-button>
              </el-form-item>
          </el-form>
          <div class="common-table">
            <el-table
              :data="tableData"
              header-row-class-name="table-header"
              style="width: 100%">
              <el-table-column
                type="index"
                label="序号"
                width="120">
              </el-table-column>
              <el-table-column
                prop="orgId"
                label="机构编码">
              </el-table-column>
              <el-table-column
                prop="orgText"
                label="机构名称">
              </el-table-column>
              <el-table-column label="操作" width="200">
                <template slot-scope="scope">
                  <el-button size="mini" type="text"
                             @click="handleDel(scope.row)">删除</el-button>
                  <el-button size="mini" type="text"
                             @click="handleEdit(scope.index,scope.row)">编辑</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="marginTop10 text-right">
            <el-pagination
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="pagination.currentPage"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="pagination.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="pagination.total">
            </el-pagination>
          </div>
        </div>
      </el-col>
    </el-row>

    <!--编辑-->
    <div class="editParkDialog">
      <el-dialog title="机构信息"
                 :visible.sync="editOrgInformationDialogVisible"
                 :close-on-click-modal="false"
                 class="edit-form"
                 :before-close="editOrgInformationDialogClose">
        <el-form :v-model="editOrgInformationForm" label-width="80px">
          <div class="parkServiceDialog" style="display: flex">
            <el-form-item label="机构编码" prop="informationOrgCode" style="width: 48%">
              <el-input v-model="editOrgInformationForm.informationOrgCode" auto-complete="off" disabled clearable @clear="clearOrgCode"></el-input>
            </el-form-item>
            <el-form-item label="机构名称" prop="informationOrgName" style="width: 48%">
              <el-input v-model="editOrgInformationForm.informationOrgName" auto-complete="off" clearable @clear="clearOrgName"></el-input>
            </el-form-item>

          </div>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="editOrgInformationDialogCancel('editForm')">取消</el-button>
          <el-button type="primary" @click.native="editOrgInformationDialogAddFn(editOrgInformationForm)">提交</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import {
  reqtreeFastOutAndOutTrees,
  reqinsertSanyBasicShrOrg,
  reqselectSanyBasicShrOrgByOrgText,
  reqdeleteSanyBasicShrOrg,
  reqEditParkOrg
} from '../../api'
export default {
  name: 'ExternalStaffAccount',
    data() {
      return {
        editOrgInformationDialogVisible:false,//编辑弹窗
        editOrgInformationForm:{
          informationOrgCode:"",//机构编码
          informationOrgName:"",//机构名称
        },
        orgTextID:'',//主键ID
        data: [],
        defaultProps: {
          children: 'nodes',
          label: 'orgText'
        },
        outTreeData: [],
        formInline: {
          fatherId: '', // 上级机构编码
          fatherTitle: '', // 上级机构名称
          orgLevel: '', // 本页面展示不显示但是后台需要
          // orgId: '', // 本级机构编码
          orgText: '' // 本级机构名称
        },
        tableData: [],
        pagination: {
          pageNum: 1,
          pageSize: 10,
          total: 0
        }
      };
    },
    mounted() {
      this.getTreeFastOutAndOutTrees()
    },
    methods: {
      async getTreeFastOutAndOutTrees () {
        const res = await reqtreeFastOutAndOutTrees(this.pagination.pageNum, this.pagination.pageSize)
        if (res && res.status===200 && res.data.code===200) {
          this.outTreeData = JSON.parse(res.data.data.outTreeJson)
          let listObj = res.data.data.outTrees
          this.tableData = listObj.list
          console.log('aaaa:',this.listObj)
          this.pagination = {
            pageNum: listObj.pageNum,
            pageSize: listObj.pageSize,
            total: listObj.total
          }
        }
        // console.log('yyyyy:', res)
      },
      handleNodeClick(data) {
        // console.log('当前点击的节点是：',data);
        this.formInline.fatherId = data.orgId // 父级id
        this.formInline.fatherTitle = data.orgText // 父级组织名称
        let numOrgLevel = parseInt(data.orgLevel)+1
        this.formInline.orgLevel = numOrgLevel.toString() // 父级组织级别
      },
      async onSubmit() {
        /* if (!this.formInline.orgId) {
          this.$message({
            type: 'error',
            message: '请选择组织机构'
          })
          return;
        } */
        if (!this.formInline.fatherId || !this.formInline.fatherTitle) {
          this.$message({
            type: 'error',
            message: '请选择组织机构'
          })
          return;
        }
        if (!this.formInline.orgText) {
          this.$message({
            type: 'error',
            message: '请填写本级机构名称'
          })
          return;
        }
        const resOrgText = await reqselectSanyBasicShrOrgByOrgText(this.formInline.orgText)
        if (resOrgText && resOrgText.status && resOrgText.data.code === 200) {
       /*   if (resOrgText.data.data === '重复了') {
            this.$message({
              type: 'error',
              message: resOrgText.data.data
            })
            return;
          }*/
        }

        let objData = {
          fatherId: this.formInline.fatherId,
          orgText: this.formInline.orgText,
          orgLevel: this.formInline.orgLevel
        }
        const resAdd = await reqinsertSanyBasicShrOrg(objData)
        // console.log('保存返回的数据：',resAdd)
        if (resAdd && resAdd.status===200 && resAdd.data.code===200) {
          this.pagination.pageNum = 1
          this.getTreeFastOutAndOutTrees()
          this.$message({
            type: 'success',
            message: resAdd.data.data || '保存成功'
          })
          this.formInline = {
            fatherId: '', // 上级机构编码
            fatherTitle: '', // 上级机构名称
            orgLevel: '', // 本页面展示不显示但是后台需要
            // orgId: '', // 本级机构编码
            orgText: '' // 本级机构名称
          }
        } else {
          this.$message({
            type: 'error',
            message: resAdd.data.data || '保存失败'
          })
        }
      },
      async handleDelReq (orgId) {
        const res = await reqdeleteSanyBasicShrOrg(orgId)
        // console.log('删除数据',resDel)
        if (res && res.status===200 && res.data.code===200) {
          this.getTreeFastOutAndOutTrees()
          this.$message({
            type: 'success',
            message: res.data.data || '删除成功'
          })
        } else {
          this.$message({
            type: 'error',
            message: res.data.data || '删除失败'
          })
        }
      },
      async handleDel (row) {
        // console.log('row:', row.orgId)
        this.$confirm('确认删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.handleDelReq(row.orgId)
        }).catch(() => {

        });
      },
      handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
        this.pagination.pageSize = val
        this.getTreeFastOutAndOutTrees()
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
        this.pagination.pageNum = val
        this.getTreeFastOutAndOutTrees()
      },
      //编辑---------------start
        //点击编辑按钮
      handleEdit(index,row){
        this.editOrgInformationDialogVisible = true
        this.editOrgInformationForm.informationOrgCode = row.orgId
        this.editOrgInformationForm.informationOrgName = row.orgText
        this.orgTextID = row.id


        console.log('index:',index)
        console.log('row:',row)
      },
        //编辑--清空input
      clearOrgCode(){this.editOrgInformationForm.informationOrgCode=''},
      clearOrgName(){this.editOrgInformationForm.informationOrgName=''},
      editOrgInformationDialogClose(){
        this.editOrgInformationDialogVisible = false
      },
      editOrgInformationDialogCancel(){
        this.editOrgInformationDialogVisible = false
      },
      //提交编辑信息
      editOrgInformationDialogAddFn(val){
        this.editOrgInformationDialogVisible = false
        //向后台发送编辑请求
        const{informationOrgName}= this.editOrgInformationForm
        const{orgTextID} = this
        this.getEditParkOrg(orgTextID,informationOrgName)
      },
      async getEditParkOrg(id,orgText){
        const res = await reqEditParkOrg(id,orgText)
        if(res&&res.data&&res.data.code==200){
          this.$message({
            type:'success',
            message:res.data.data
          })
          //刷新页面
          this.getTreeFastOutAndOutTrees()
        }
      },
      //编辑---------------end
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

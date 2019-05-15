<template>
  <div>
    <el-row class="marginTop20" :gutter="20">
      <el-col :span="4">
        <div class="">
          <el-tree
            :data="treeData"
            :props="defaultProps"
            node-key="flag"
            ref="tree"
            :default-expanded-keys="[defaultData]"
            highlight-current
            show-checkbox
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
              <el-form-item label="员工姓名">
                <el-input v-model="formInline.username" placeholder="员工姓名"></el-input>
              </el-form-item>

              <el-form-item>
                <el-button class="btnIsBlue" type="primary" style="width: 100px" @click="onSubmit">查询</el-button>
              </el-form-item>
          </el-form>
          <div class="common-table">
            <div v-if="loadingStatus" class="lazyImg"><span class="lazyText">数据加载中</span></div>
            <div v-if="noDataStatus" class="lazyImg"><span class="lazyText">暂无数据</span></div>
            <el-table v-if="!loadingStatus" v-show="!noDataStatus"
              :data="tableData"
                      v-loading="loadingSwitch"
              header-row-class-name="table-header"
							height="580"
              style="width: 100%">
              <el-table-column prop="number"  label="序号" width="80"></el-table-column>
              <el-table-column prop="name" label="姓名"></el-table-column>
							<el-table-column prop="department" label="归属部门"></el-table-column>
              <el-table-column prop="tel" label="电话号码"></el-table-column>
              <el-table-column prop="account" label="员工账号"></el-table-column>
              <el-table-column label="恢复原始密码">
                <template slot-scope="scope">
                  <el-button size="mini" type="text" @click="handleEdit(scope.$index, scope.row)">恢复密码</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="marginTop10 text-right">
            <el-pagination
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="pageNum"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="pageTotal">
            </el-pagination>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import {reqOuterTrees,selectAllByUserName,resetLoginPwd} from '../../../api'
  export default {
  name: 'ExternalStaffAccount',
    data() {
      return {
        loadingSwitch:false,//数据加载中
        loadingStatus:true,//初始化显示数据加载中
        noDataStatus:false,//显示暂无数据,初始化不显示
        treeData: [],
        defaultData:0,//默认tree展开的id
        defaultProps: {
          children: 'nodes',
          label: 'orgText',
          disabled:this.disabledFn
        },
        formInline: {
          username: '', // 员工姓名
          enterPhoto: '', // 录入照片
          meetDemand: '' // 满足要求
        },
        tableData: [],
				orgIds:[],
				resetUserName:'',
				resetTel:'',
				pageTotal:0,
				orgs:'',
				pageNum:1,
				pageSize:10
      };
    },
		mounted(){
			this.getOutTreeHasPrivillege();
			this.getSelectAllByUserName();
			setTimeout(function(){
				//console.log(document.querySelectorAll('.el-checkbox__original'))

			},1)

		},
    watch:{
      tableData(){   // 数据改变时loading要发生改变
        this.loadingSwitch = false
      }
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
      handleNodeClick(data) {
        console.log(data);
      },
      onSubmit() {
        this.getSelectAllByUserName();
        this.loadingSwitch = true
      },
      handleSizeChange(val) {
				this.pageNum = 1;
				this.pageSize = val;
        this.getSelectAllByUserName();
        this.loadingSwitch = true
      },
      handleCurrentChange(val) {
				this.pageNum= val
        this.getSelectAllByUserName();
        this.loadingSwitch = true
      },
      handleEdit(index, row) {
				this.resetUserName = row.account;
				this.resetTel = row.tel;
				this.getResetLoginPwd();
      },
			async getOutTreeHasPrivillege(){
				const res = await reqOuterTrees('');
				if(res && res.data.code==200 && JSON.parse(res.data.data) instanceof Array){
					this.treeData = JSON.parse(res.data.data);
					/* setTimeout(()=>{
						document.querySelectorAll('.el-checkbox__original').forEach(function(ele,index){
									  if(ele.disabled&&index>0){
											ele.parentNode.parentNode.parentNode.style.display = 'none'
										}
						})
					},100) */
					 /* setTimeout(()=>{
						document.querySelectorAll('.el-tree-node__children').forEach(function(ele,index){
										console.log(ele)
						})
					},100) */

          this.defaultData = this.treeData[0].id  //默认tree状结构展开
				}else{

				}
			},
			async getSelectAllByUserName(){
				const myParams = {
					orgIds:this.$refs.tree.getCheckedNodes().map(function(item){
            return item.orgId
          }),
					userName:this.formInline.username,
					pageNum:this.pageNum,
					pageSize:this.pageSize
				}
				const res = await selectAllByUserName(myParams);
				if(res && res.data.code === 200 && res.data.data.list instanceof Array){
					 this.tableData = res.data.data.list.map((item,index)=>{
					 			return {
					 					department: item.sanyBasicShrOrg.orgText,
					 					name: item.userName,
					 					tel: item.telephone,
					 					account: item.userNo,
					 					number:(this.pageNum-1)*this.pageSize+(index+1)
					 			}
					 })
          //数据懒加载显示
          this.loadingStatus = false
          if(this.tableData.length === 0){
            this.noDataStatus = true
            return
          }
					 this.pageTotal = res.data.data.total
				}else{
					this.tableData = [];
					this.pageTotal = 0;
				}

			},
			async getResetLoginPwd(){
				const res = await resetLoginPwd(this.resetTel);
				if(res && res.data.code === 200){
					 if(res.data.code === 200){
					 		this.$message({
					 			type: 'success',
					 			message: res.data.data
					 		});
					 }
				}else{
					this.$message({
						type: 'warning',
						message: '服务器异常'
					});
				}
			}
    }
}
</script>
<style lang="scss" scoped>

</style>

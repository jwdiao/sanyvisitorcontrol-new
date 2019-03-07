<template>
	<div style="height:90%;overflow: hidden;">
		<div class="messageBox">
			<el-form :inline="true" :model="formInline" size="medium" class="common-form-inline">
				<el-form-item label="用户编号">
					<el-input v-model="formInline.user" placeholder="审批人"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="onSubmit">查询</el-button>
				</el-form-item>
			</el-form>
			<div class="common-table">
				<el-table
				:data="tableData"
				header-row-class-name="table-header"
				style="width: 100%" height="600">
					<el-table-column prop="num" label="序号" width="80">
					</el-table-column>
					<el-table-column prop="userNo" label="员工编号">
					</el-table-column>
					<el-table-column prop="userName" label="员工姓名">
					</el-table-column>
					<el-table-column prop="address" label="点击授权">
						<template slot-scope="scope">
							<el-button size="mini" type="text" @click="handleEdit(scope.$index, scope.row)">点击授权</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<div class="marginTop10 text-right">
				<el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
				 :page-sizes="[10, 40, 80, 400]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pageTotal">
				</el-pagination>
			</div>
			<el-dialog title="授权信息" :visible.sync="dialogFormVisible">
				<el-form :model="form" :inline="true">
					<el-form-item label="员工工号">
						<el-input v-model="form.workno" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="员工名称">
						<el-input v-model="form.name" autocomplete="off"></el-input>
					</el-form-item>
				</el-form>
				<div class="selectGroup clear">
					<div class="left">
						选择组织
					</div>
					<div class="left" style="width:500px;">
						<!-- <el-tree
						:data="data"
						:props="defaultProps"
						@node-click="handleNodeClick"
						ref = "tree"
						node-key="flag"
						:default-expanded-keys="expandedArr"
						highlight-current
						show-checkbox></el-tree> -->
						 <el-tree
						  :data="data"
						  show-checkbox
						  :props="defaultProps"
						  :default-expanded-keys="expandedArr"
						  ref="tree"
						  node-key="flag"
						  >
						</el-tree>
					</div>
				</div>
				<div slot="footer" class="dialog-footer">
					<el-button @click="dialogFormVisible = false">取 消</el-button>
					<el-button type="primary" @click="toImpower">确 定</el-button>
				</div>
			</el-dialog>
		</div>
	</div>
</template>

<script>
	import http from '../../api/http.js'
	export default {
		name: 'photoInputSearch',
		data() {
			return {
				formInline: {
					user: '',
					region: '',
				},
				form: {
					workno: '',
					name: ''
				},
				dialogFormVisible: false,
				formLabelWidth: '120px',
				tableData: [],
				expandedArr:[],
				currentPage: 1,
				pageSize:10,
				pageTotal:10,
				data: [],
				defaultProps: {
					children: 'nodes',
					label: 'orgText'
				}
			}
		},
		mounted(){
			this.selectUserNoAndUserNameByUserNo();
			/* this.tree(); */
		},
		methods: {
			handleNodeClick(data) {
				console.log(data);
			},
			onSubmit() {
               this.selectUserNoAndUserNameByUserNo();
			},
			handleSizeChange(val) {
				this.pageSize = val;
				this.currentPage = 1;
				this.selectUserNoAndUserNameByUserNo();
			},
			handleCurrentChange(val) {
				this.currentPage = val;
				this.selectUserNoAndUserNameByUserNo();
			},
			/*
			 点击展示授权模态框
			*/
			handleEdit(index,row) {
				this.form.workno = row.userNo;
				this.form.name = row.userName;
				this.dialogFormVisible = true;
				this.tree(row.userNo);
			},
			toImpower(){

				this.AddPrivillegeByUserNo();
			},
			/*
			 管理授权表格查询
			*/
      async selectUserNoAndUserNameByUserNo(){
			  const res = await http.post('/user/SanyBasicShrUser/selectUserNoAndUserNameByUserNo',
			  {query:{loginAccount:this.formInline.user},pageNum:this.currentPage,pageSize:this.pageSize});
			  console.log(res.data);
			  if(res && res.data.code===200){
				  res.data.data.list.forEach((ele,index)=>{
				  	 ele.num = (this.currentPage-1)*this.pageSize+index+1;
				  })
				  this.tableData = res.data.data.list;
				  this.pageTotal = res.data.data.total;
			  }
			},
			/*
			 获取树形菜单组织结构
			*/
			async tree(userNo){
				const res = await http.post('/user/SanyBasicShrUser/treeHasPrivillegePersonBack',{userNo})
				if(res && res.data.code===200){
				   this.data = JSON.parse(res.data.data);
				   console.log(this.data);
					const arr = [];
					for(var i = 10000;i<20000;i++){
						  arr.push(i)
					}
					 this.$refs.tree.setCheckedKeys(arr);
					 this.expandedArr = arr
				}
			},
			/*
			  点击授权
			*/
			async AddPrivillegeByUserNo(){
				const orgsArr = this.$refs.tree.getCheckedNodes().map((item)=>{
					return item.orgId
				})
				const res = await http.post('/user/SanyBasicShrUser/AddPrivillegeByUserNo',{
					loginAccount:this.form.workno,
					userName:this.form.name,
					orgs:orgsArr
				})
				if(res && res.data.code === 200){
				    this.dialogFormVisible = false;
					this.$message({
            type:'success',
            message:'授权成功'
          });
				}else{
          this.$message({
            type:'error',
            message:'授权失败'
          });
				}
				//console.log(res);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.messageBox {
		margin-top: 20px;
		width: 100%;
		overflow: hidden;
		.left {
			float: left;
			width: 200px;
		}
		.right {
			float: left;
			width: calc(100% - 200px);
			.common-table {
				padding-left: 30px;
			}
		}
	}
  /deep/.el-dialog__footer{
    border-top: 1px solid #DCDFE6;/*#DCDFE6*/
  }
  /deep/ .el-dialog__header{
    border-bottom: 1px solid #DCDFE6;
  }
</style>

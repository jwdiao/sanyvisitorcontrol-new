<template>
	<div style="overflow: hidden;">
		<div class="messageBox">
			<div class="left">
				<el-tree
				:data="treeData"
				:props="defaultProps"
				 ref="tree"
				 node-key="flag"
				@node-click="handleNodeClick"
				show-checkbox>
				</el-tree>
			</div>
			<div class="right">
				<el-form
				:inline="true"
				:model="formInline"
				size="medium"
				class="common-form-inline"
				>
					<el-form-item label="员工姓名">
						<el-input v-model="formInline.userName" placeholder="审批人"></el-input>
					</el-form-item>

					<el-form-item label="员工编号">
						<el-input v-model="formInline.userNo" placeholder="审批人"></el-input>
					</el-form-item>

					<el-form-item>
						<el-button type="primary" @click="onSubmit">查询</el-button>
						<el-button type="primary" @click="onReset">重置</el-button>
					</el-form-item>
				</el-form>
				<div class="common-table">
				        <el-table
				          :data="tableData"
				          header-row-class-name="table-header"
				          height="600"
				          style="width: 100%">
				          <el-table-column
				            prop="num"
				            label="序号"
				            width="80">
				          </el-table-column>
				          <el-table-column
				            prop="userNo"
				            label="员工工号">
				          </el-table-column>
				          <el-table-column
				            prop="userName"
				            label="员工姓名">
				          </el-table-column>
				          <el-table-column
				            prop="userNo"
				            label="登录账号">
				          </el-table-column>
						  <el-table-column
						  prop="org"
						  label="机构编号">
						  </el-table-column>
						  <el-table-column
						  prop="orgText"
						  label="机构名称">
						  </el-table-column>
						  <el-table-column
						  prop="address"
						  label="恢复默认密码">
						    <template slot-scope="scope">
						    	<el-button size="mini" type="text" @click="handleRecovery(scope.$index, scope.row)">恢复</el-button>
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
						:page-sizes="[10, 20, 40, 60,80]"
						:page-size="pageSize"
						layout="total, sizes, prev, pager, next, jumper"
						:total="pageTotal">
					</el-pagination>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import http from '../../api/http.js'
	export default {
		name: 'photoInputSearch',
		data() {
			return {
				treeData: [],
				defaultProps: {
					children: 'nodes',
					label: 'orgText'
				},
				formInline:{
					userName:'',
					userNo:'',
				},
				tableData: [],
				orgId:[],
				currentPage: 1,
				pageSize:10,
				pageTotal:0
			};
		},
		mounted(){
		    this.tree();
		    this.selectByNameCodeOrg();
		},
		methods: {
			handleNodeClick(data) {
				this.orgId = data.orgId
				//console.log(data);
				/* this.selectByNameCodeOrg(); */
			},
			onReset(){
				 /* console.log(this.data)
                 this.data.push({});
				 this.data.splice(this.data.length-1,1); */
			},
			onSubmit(){
				 this.pageSize = 10;
				 this.currentPage = 1;
				 this.orgId = this.$refs.tree.getCheckedNodes().map(function(item){
				 	return item.orgId
				 })
				 this.selectByNameCodeOrg();
			},
			handleRecovery(index,row){
				 this.resetLoginPwd(row.userNo)
			},
			handleSizeChange(val) {
                 this.pageSize = val;
				 this.currentPage = 1;
				 this.selectByNameCodeOrg();
			},
			handleCurrentChange(val) {
				 this.currentPage = val;
				 this.selectByNameCodeOrg();
			},
			/*
			获取树形菜单组织结构
			*/
			async tree(){
				const res = await http.get('/user/SanyBasicShrUser/treeFast')
				if(res && res.data.code===200){
				this.treeData = JSON.parse(res.data.data)
				}
			},
			/*
			 用户管理查询
			 参数：logonAccount:工号；userName:用户名；orgID:组织机构ID
			*/
			async selectByNameCodeOrg(){
				const res = await http.post('/user/SanyBasicShrUser/selectByNameCodeOrg',{
					query:{
					  loginAccount:this.formInline.userNo,
					  userName:this.formInline.userName,
					  orgIds:this.orgId
					},
					pageNum:this.currentPage,
					pageSize:this.pageSize
				});
				//console.log(res);
				if(res &&res.data.code === 200){
					if(res.data.data.list!==null){
						res.data.data.list.forEach((ele,index)=>{
						ele.num = (this.currentPage-1)*this.pageSize+index+1;
						ele.orgText = ele.sanyBasicShrOrg.orgText;
						})
						this.tableData = res.data.data.list;
						this.pageTotal = res.data.data.total;
						this.orgId = [];
					}else{
						this.tableData = [];
						this.pageTotal = 0;
						this.orgId = [];
					}

				}
			},
			/*
			  恢复密码
			*/
			async resetLoginPwd(loginAccount){
				const res = await http.post('/user/SanyBasicShrUser/resetLoginPwd',{
					loginAccount
				});
				if(res && res.data.code === 200){
					this.$message({
            type:'success',
						message:'恢复成功'
					})
				}
			}

		}
	}
</script>

<style lang="scss" scoped>
    .messageBox{
		margin-top:20px;
		width:100%;
		overflow: hidden;
		.left{
			float:left;
			width:400px;
			max-height:750px;
			overflow-y: auto;
			/deep/ .expanded.el-tree-node__expand-icon.el-icon-caret-right{
				color:blue;
			}
			/deep/ .el-tree-node__content:hover{
				background-color: #5A8CFF;
				color:#FFFFFF;
			}
		}
		.right{
			float:left;
			width:calc(100% - 400px);
			.common-table{
				padding-left: 30px;
			}
		}
	}
</style>

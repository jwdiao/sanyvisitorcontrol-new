<template>
	<div style="overflow: hidden;">
		<div class="messageBox">
			<div class="left">
				<el-tree
				:data="treeData"
				:props="defaultProps"
				@node-click="handleNodeClick"
				ref="tree"
				node-key="flag"
				:default-expanded-keys="[1]"
				highlight-current
				show-checkbox></el-tree>
			</div>
			<div class="right">
				<el-form
				:inline="true"
				:model="formInline"
				size="medium"
				class="common-form-inline"
				>
					<el-form-item label="员工姓名">
						<el-input v-model="formInline.user" placeholder="审批人"></el-input>
					</el-form-item>
					<el-form-item label="是否录入照片">
						<el-select v-model="formInline.isImgUrl" placeholder="活动区域">
							<el-option label="全部" value="0"></el-option>
							<el-option label="已录入" value="1"></el-option>
							<el-option label="未录入" value="2"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="照片是否合格">
						<el-select v-model="formInline.region" placeholder="活动区域">
							<el-option label="全部" value="shanghai"></el-option>
							<el-option label="合格" value="beijing"></el-option>
							<el-option label="不合格" value="beijing"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="onSubmit">数据查询</el-button>
					</el-form-item>
				</el-form>
				<div class="common-table">
				        <el-table
				          :data="tableData"
				          header-row-class-name="table-header"
				          height = "600"
				          style="width: 100%">
				          <el-table-column
				            prop="num"
				            label="序号"
				            width="80">
				          </el-table-column>
				          <el-table-column
				            prop="orgText"
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
						  prop="address"
						  label="是否以上传照片">
						    <template slot-scope="scope">
						    	<el-button
						    		size="mini"
						    		type="text"
									v-show="scope.row.imgUrlUpload"
						    		@click="handleEdit(scope.$index, scope.row)">
								查看照片</el-button>
								<el-button
									size="mini"
									type="text"
									v-show="!scope.row.imgUrlUpload"
									>否</el-button>
						    </template>
						  </el-table-column>
						  <el-table-column
						  prop="address"
						  label="照片是否合格">
						  </el-table-column>
						  <el-table-column
						  prop="createTime"
						  label="录入时间">
						  </el-table-column>
				        </el-table>
				</div>
				<div class="marginTop10 text-right">
					<el-pagination
						background
						@size-change="handleSizeChange"
						@current-change="handleCurrentChange"
						:current-page="currentPage"
						:page-sizes="[10, 20, 40, 60,100]"
						:page-size="pageSize"
						layout="total, sizes, prev, pager, next, jumper"
						:total="pageTotal">
					</el-pagination>
				</div>
				<el-dialog :visible.sync = "dialogVisible">
						<img :src="dialogImageUrl" alt="" width="auto" height="auto" class="dialog_img">
				</el-dialog>
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
					label: 'orgText',
					disabled:this.disabledFn
				},
				formInline:{
					user:'',
					region:'',
					isImgUrl:'0'
				},
				tableData: [],
				currentPage: 1,
				pageSize:10,
				pageTotal:0,
				orgId:[],
				dialogVisible:false,
				dialogImageUrl:''
			};
		},
		mounted(){
			 this.tree1(sessionStorage.userNumber);
			 this.selectByNameAndCode();
		},
		methods: {
			/*
			  flag不是1的树状菜单被禁用
			*/
			disabledFn(data,node){
				if(data.flag<10000){
					return true;
				}else{
					return false;
				}
			},
			/*
			   树状菜单每一行点击事件
			*/
			handleNodeClick(data) {
                  console.log(data)
			},
			onSubmit(){
				this.orgId = this.$refs.tree.getCheckedNodes().map(function(item){
					   return item.orgId
				})
				this.selectByNameAndCode();
			},
			handleSizeChange(val) {
				this.pageSize = val;
				this.currentPage = 1;
				this.selectByNameAndCode();
			},
			handleCurrentChange(val) {
				this.currentPage = val;
				this.selectByNameAndCode();
			},
			handleEdit(index,row){
				this.dialogVisible = true;
				this.dialogImageUrl = row.imgUrlUpload?row.imgUrlUpload:row.imgUrl
			},
			async selectByNameAndCode(){
				
				const res = await http.post('/user/SanyBasicShrUser/selectByNameAndCode',{
					query:{userName:this.formInline.user,
					       isImgUrl:this.formInline.isImgUrl,
					       orgIds:this.orgId},
					       pageNum:this.currentPage,
					       pageSize:this.pageSize
				});
			    if(res && res.data.code === 200){
					if(res.data.data.list){
						res.data.data.list.forEach((ele,index)=>{
							ele.orgText = ele.sanyBasicShrOrg.orgText;
							ele.createTime = ele.sanyBasicShrOrg.createTime;
							ele.num = (this.currentPage-1)*this.pageSize+index+1;
							ele.imgUrl !=''?this.isPicture = true:this.noPicture=true;
						})
							this.tableData = res.data.data.list;
							this.pageTotal = res.data.data.total;
					}else{
						    this.tableData = [];
						    this.pageTotal = 0;
					}

				}
			},
			async tree1(userNo){
				const res = await http.post('/user/SanyBasicShrUser/treeHasPrivillegePersonBack',{userNo})
				if(res && res.data.code === 200){
					this.treeData = JSON.parse(res.data.data)
					console.log(JSON.parse(res.data.data));
					//this.treeData = JSON.parse(res.data.data).nodes;
					//console.log(JSON.parse(res.data.data).nodes);
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
		/deep/ .el-dialog__body{
			text-align: center;
		}
		/deep/	.dialog_img{
				max-height:600px;
				max-width:600px;
		}
	}
</style>

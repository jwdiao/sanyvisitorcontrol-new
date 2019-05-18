<template>
	<div style="overflow: hidden;">
		<p class="common-breadcrumb">用户角色</p>
		<div class="messageBox">
			<div class="left">
				 <el-tree :data="treeData" show-checkbox node-key="id" default-expand-all
          @check-change="handleClick" ref="treeForm" @node-click="nodeClick">
         </el-tree>
			</div>
			<div class="right">
				<el-form
				:inline="true"
				:model="formInline"
				 size="medium"
				ref = "userForm"
				class="common-form-inline"
				><!--	:rules="rules"-->
					<el-form-item label="员工姓名" prop="userName">
						<el-input v-model="formInline.userName"
						placeholder="员工姓名"
						></el-input>
					</el-form-item>

					<el-form-item label="员工编号" prop="userNo">
						<el-input
						v-model="formInline.userNo"
						placeholder="工号"
						ref="userNo"
						></el-input>
					</el-form-item>

					<el-form-item>
						<el-button class="btnIsBlue" type="primary" style="width: 100px" @click="onSubmit">查询</el-button>
					</el-form-item>
				</el-form>
				<div class="common-table">
          <div v-if="loadingStatus" class="lazyImg"><span class="lazyText">数据加载中</span></div>
          <div v-if="noDataStatus" class="lazyImg"><span class="lazyText">暂无数据</span></div>
				        <el-table v-if="!loadingStatus" v-show="!noDataStatus"
				          :data="tableData" v-loading="loadingSwitch"
				          header-row-class-name="table-header"
				          height="600"
				          style="width: 100%">
				          <el-table-column prop="num" label="序号" width="80"> </el-table-column>
				          <el-table-column prop="userNo" label="员工工号"></el-table-column>
				          <el-table-column prop="userName" label="员工姓名"></el-table-column>
				          <el-table-column prop="roleName" label="功能角色"></el-table-column>
						  <el-table-column
						  prop="address"
						  label="修改角色">
						    <template slot-scope="scope">
						    	<el-button
						    		size="mini"
						    		type="text"
						    		@click="handleAmend(scope.$index, scope.row)">修改角色</el-button>
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
						:page-sizes="[10,20,50,100]"
						:page-size="pageSize"
						layout="total, sizes, prev, pager, next, jumper"
						:total="pageTotal">
					</el-pagination>
				</div>
        <!--修改角色-->
				<el-dialog title="用户角色" v-dialogDrag :visible.sync="dialogFormVisible" width="1000px">
					<el-form :model="form" style="display: flex;">
						<el-form-item label="姓名" :label-width="formLabelWidth" >
							<el-input v-model="form.name" autocomplete="off" :disabled="true"></el-input>
						</el-form-item>
						<el-form-item label="工号" :label-width="formLabelWidth" >
							<el-input v-model="form.workno" autocomplete="off" :disabled="true"></el-input>
						</el-form-item>
						<el-form-item label="用户角色" :label-width="formLabelWidth" :disabled="true" >
							<el-select v-model="roleValue" placeholder="请选择角色" @change="selectRole">
								<el-option
								v-for="item in roleOptions"
								:key="item.value"
								:label="item.label"
								:value="item.value">
								</el-option>
							</el-select>
						</el-form-item>
					</el-form>
					<div slot="footer" class="dialog-footer">
						<el-button @click="dialogFormVisible = false">取 消</el-button>
						<el-button class="btnIsBlue" type="primary" @click="confirmRevision">确 定</el-button>
					</div>
				</el-dialog>
			</div>
		</div>

	</div>
</template>

<script>
	import http from"../../api/http.js"
	/* import $ from 'jquery' */
	export default {
		name: 'photoInputSearch',
		data() {
			return {
        loadingSwitch:false,//加载中
				treeData: [],
				defaultProps: {
					children: 'children',
					label: 'label'
				},
				formInline:{
					userName:'',
					userNo:'',
				},
				roleOptions:[

				],
				/* rules: {
					userName: [
						{ required: true, message: '请输入员工姓名', trigger: ['change']},
					],
					userNo: [
						{ required: true, message: '请输入员工姓名', trigger: ['change']},
					]
				}, */
				dialogFormVisible:false,
				formLabelWidth: '120px',
				roleCode:'',
				form: {
					name: '',
					workno:'',
					userRole:''
				},
				roleValue:'', //选择角色code
        selectedRoleName:'',//选择角色名称
				editCheckId:'',
				tableData: [],
        loadingStatus:true,//初始化显示数据加载中
        noDataStatus:false,//显示暂无数据,初始化不显示
				currentPage: 1,
				pageSize:10,
				pageTotal:0
			};
		},
		mounted(){
      this.roleCode = ''
			this.selectRolue();
			this.selectEmployerRole();
		},
    watch:{
      tableData(){
        this.loadingSwitch = false
      }
    },
		methods: {
			/*树形控件节点被点击时的回调*/
			nodeClick(data, checked, node) {
				this.checkedId = data.id
        this.$refs.treeForm.setCheckedNodes([data]);
				console.log(checked)
			},
			/*树形控件节点选中状态发生变化时的回调*/
			handleClick(data, checked, node){
				console.log(checked)
				console.log(data)
				 if(checked == true){
					   this.roleCode = data.value;
						 this.checkedId = data.id;
						 this.$refs.treeForm.setCheckedNodes([data]);
				 }
      },

			/*查询*/
			onSubmit(){
				const that = this;
				let flag = 1;
				Array.from(document.querySelectorAll('.el-checkbox__original')).forEach(function(ele,index){
					   if(ele.checked){
							flag = 2
						 }
				})
				if(flag === 1){
					this.roleCode = ''
				}
				this.selectEmployerRole();
        this.loadingSwitch = true
			},
			handleSizeChange(val) {
				this.pageSize = val;
				this.currentPage = 1;
				this.selectEmployerRole();
        this.loadingSwitch = true
			},
			handleCurrentChange(val) {
				this.currentPage = val;
				this.selectEmployerRole();
        this.loadingSwitch = true
			},
      //选择角色
      selectRole(val){
        let obj = {};
        obj = this.roleOptions.find((item)=>{
          return item.value === val;
        });
        this.selectedRoleName = obj.label
      },
			/*修改角色*/
			handleAmend(index,row){
				this.form.workno = row.userNo
				this.form.name = row.userName
				this.roleValue = row.roleName
        console.log('row:',row)
        console.log('this.roleValue:',this.roleValue)
				this.dialogFormVisible = true;
			},
			confirmRevision(){
				this.dialogFormVisible = false;
				this.updateRole();
				setTimeout(()=>{
					this.selectEmployerRole();
				},1000)
			},
			/*
			  表格部分请求三个参数分别为用户名，工号和用户角色1代表管理
			*/
			async selectEmployerRole(){
				const res = await http.post('/user/SanyBasicShrUser/selectEmployerRoleByUserNoAndUserName',
				{
				query:{
					userName:this.formInline.userName,
					loginAccount:this.formInline.userNo,
					roleCode:this.roleCode,
				},
				pageNum:this.currentPage,
				pageSize:this.pageSize});
				// console.log(res);
				// console.log(res.data.data.list);
				if(!res || !res.data.code===200) return
					res.data.data.list.forEach((ele,index)=>{
					 ele.num = (this.currentPage-1)*this.pageSize+index+1;
					})
					this.tableData = res.data.data.list;
					this.pageTotal = res.data.data.total;
          //数据懒加载显示
          this.loadingStatus = false
          if(this.tableData.length === 0){
            this.noDataStatus = true
            return
          }else{
            this.noDataStatus = false
          }
			},
			/*
			  左侧用户角色 员工、门岗、管理、系统管理员
			*/
			async selectRolue(){
				const res = await http.post('/user/SanyBasicShrUser/selectRolesNoPage');
				if(res.data && res.data.code===200){
					// console.log(res.data.data)
					//将数据映射到树形菜单
					this.treeData = res.data.data.map((item)=>{
						return {label:item.roleName,value:item.roleCode,id:item.id}
					})
					//将数据映射到角色选择器
					this.roleOptions = res.data.data.map((item)=>{
						return {label:item.roleName,value:item.roleCode}
					})
				}
			},
			/*
			   用户角色修改角色
			*/
			async updateRole(){
				const res = await http.post('/user/SanyBasicShrUser/updateRole',{
					loginAccount:this.form.workno,
					roleCode:this.roleValue,
          roleName:this.selectedRoleName
				})
        console.log('roleValue:::',this.roleValue)
        if(res.data.code === 200){
          //提示信息
          this.$message({
            type:'success',
            message:res.data.data
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
		/deep/ .el-dialog{
			width:25%;
			/deep/ .el-input{
				width:200px;
			}
			/deep/ .el-input:nth-of-type(3){
				width:100%;
			}
		}
		.left{
			float:left;
			width:200px;
		}
		.right{
			float:left;
			width:calc(100% - 200px);
			.common-table{
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

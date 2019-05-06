<template>
	<div>
		<div class="common-table marginTop20">
      <div v-if="tableData.length===0" class="lazyImg"><span class="lazyText">暂无数据</span></div>
				<el-table v-else
				:data="tableData"
				header-row-class-name="table-header"
				style="width: 100%">
				<el-table-column	prop="id"	label="序号"	width="80"></el-table-column>
				<el-table-column	prop="roleCode"	label="角色编号"></el-table-column>
        <el-table-column	prop="roleName"	label="角色名称"></el-table-column>
				</el-table>
		</div>
		<div class="marginTop10 text-right">
			<el-pagination
				background
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page="currentPage"
				:page-sizes="[10,50,100, 200, 300, 400]"
				:page-size="pageSize"
				layout="total, sizes, prev, pager, next, jumper"
				:total="pageTotal">
			</el-pagination>
		</div>
	</div>
</template>

<script>
	import http from '../../api/http.js'
	export default {
		name:'roleManage',
		data() {
			return {
				tableData:[],
				pageSize:10,
				pageTotal:0,
				currentPage:0
			};
		},
		mounted(){
			 this.selectRoles();
		},
		methods:{
			handleSizeChange(val){

			},
			handleCurrentChange(val){

			},
			async selectRoles(){
				const res = await http.post('/user/SanyBasicShrUser/selectRoles',{
					pageSize:this.pageSize,
					pageNum:this.currentPage
				})
				if(res && res.data.code === 200){
					this.tableData = res.data.data.list;
					this.pageTotal = res.data.data.total;
				}
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>

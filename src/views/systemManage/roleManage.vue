<template>
	<div>
		<div class="common-table marginTop20">
      <div v-if="loadingStatus" class="lazyImg"><span class="lazyText">数据加载中</span></div>
      <div v-if="noDataStatus" class="lazyImg"><span class="lazyText">暂无数据</span></div>
				<el-table v-if="!loadingStatus" v-show="!noDataStatus"
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
        loadingStatus:true,//初始化显示数据加载中
        noDataStatus:false,//显示暂无数据,初始化不显示
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
				if(!res || !res.data.code === 200) return
					this.tableData = res.data.data.list;
					this.pageTotal = res.data.data.total;
          //数据懒加载显示
          this.loadingStatus = false
          if(this.tableData.length === 0){
            this.noDataStatus = true
            return
          }
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>

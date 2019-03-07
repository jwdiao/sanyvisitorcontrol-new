<template>
   <div class="">
     <!-- <p class="common-breadcrumb">员工车辆</p> -->
      <el-form
      :inline="true"
      :model="formInline"
      size="medium"
      class="marginTop20 common-form-inline"
      >
        <el-form-item label="车辆号码">
          <el-input v-model="formInline.carNum" placeholder="车辆号码"></el-input>
        </el-form-item>
        <el-form-item label="员工工号">
          <el-input v-model="formInline.staffNum" placeholder="员工工号"></el-input>
        </el-form-item>
        <el-form-item label="员工姓名">
          <el-input v-model="formInline.username" placeholder="员工姓名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">导入excel</el-button>
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
            width="80">
          </el-table-column>
          <el-table-column
            prop="staffType"
            label="员工类型">
          </el-table-column>
          <el-table-column
            prop="staffNum"
            label="员工编号">
          </el-table-column>
          <el-table-column
            prop="staffName"
            label="员工姓名">
          </el-table-column>
          <el-table-column
            prop="carNum"
            label="车辆号码">
          </el-table-column>
          <el-table-column
            prop="belongPark"
            label="归属园区">
          </el-table-column>
        </el-table>
      </div>
      <div class="marginTop10 text-right">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400">
        </el-pagination>
      </div>
   </div>
</template>
<script>
export default {
  name: 'StaffCar',
    data() {
      return {
        formInline: {
          carNum: '',
          staffNum: '',
          username: ''
        },
        tableData: [{
          staffType: '外部员工',
          staffNum: 'a455211',
          staffName: '张宝',
          carNum: '京A789654',
          belongPark: '回龙观'
        }, {
          staffType: '外部员工',
          staffNum: 'a455211',
          staffName: '张宝',
          carNum: '京A789654',
          belongPark: '回龙观'
        }, {
          staffType: '外部员工',
          staffNum: 'a455211',
          staffName: '张宝',
          carNum: '京A789654',
          belongPark: '回龙观'
        }],
        currentPage: 1
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    }
}
</script>
<style lang="scss" scoped>

</style>


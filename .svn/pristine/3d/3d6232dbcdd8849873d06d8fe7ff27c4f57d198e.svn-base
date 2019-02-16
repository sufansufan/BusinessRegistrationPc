<template>
  <div class="app-account-management-box">
    <div class="select-tools">
      <div>
        <div>
          <el-date-picker
            v-model="select.value7"
            :picker-options="quickOptions"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </div>
        <div>
          <el-input placeholder="学员姓名/手机号"/>
        </div>
        <div>
          <el-select v-model="select.value" placeholder="校区">
            <el-option
              v-for="item in []"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
      </div>
      <div class="btn">
        <div>
          <el-button type="primary" icon="el-icon-search">搜索</el-button>
        </div>
        <div>
          <el-button icon="el-icon-refresh">重置搜索条件</el-button>
        </div>
        <div>
          <el-button type="primary" icon="el-icon-download">导出</el-button>
        </div>
      </div>
    </div>
    <el-table :data="dataList" stripe border style="width: 100%">
      <el-table-column prop="date" label="时间"/>
      <el-table-column prop="date" label="校区"/>
      <el-table-column prop="date" label="姓名"/>
      <el-table-column prop="date" label="操作页面"/>
      <el-table-column prop="date" label="操作按钮"/>
      <el-table-column prop="date" label="相关参数"/>
    </el-table>
    <el-pagination
      v-show="count"
      :page-sizes="pageSizes"
      :page-size="limit"
      :total="count"
      :current-page="page"
      :layout="pageLayout"
      class="campus-pagination"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    />
  </div>
</template>

<script>
import tables from '@/mixin/tables'
export default {
  mixins: [tables],
  data() {
    return {
      select: {},
      dataList: []
    }
  }
}
</script>

<style>
</style>

<template>
  <div class="pos-history-box">
    <div class="select-tools">
      <div>
        <div>
          <el-input placeholder="编号"/>
        </div>
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
      </div>
      <div class="btn">
        <div>
          <el-button type="primary" icon="el-icon-search">搜索</el-button>
        </div>
      </div>
    </div>
    <el-table :data="dataList" stripe border style="width: 100%">
      <el-table-column prop="date" label="日期" width="150"/>
      <el-table-column prop="date" label="POS机编号" width="200"/>
      <el-table-column prop="date" label="事件"/>
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
      dataList: [],
      posManagementForm: {}
    }
  }
}
</script>

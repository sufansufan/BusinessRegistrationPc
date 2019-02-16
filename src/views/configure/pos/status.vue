<template>
  <div class="pos-status-box">
    <div class="select-tools">
      <div>
        <div>
          <el-input placeholder="编号"/>
        </div>
        <div>
          <el-select v-model="select.value" placeholder="状态">
            <el-option
              v-for="item in []"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
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
          <el-button type="primary" icon="el-icon-sort">更新状态</el-button>
        </div>
      </div>
    </div>
    <el-table :data="dataList" stripe border style="width: 100%">
      <el-table-column prop="date" label="POS机编号"/>
      <el-table-column prop="date" label="所属校区" width="250"/>
      <el-table-column prop="date" label="当前状态"/>
      <el-table-column prop="date" label="更新日期"/>
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

<style scoped>
</style>

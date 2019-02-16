<template>
  <div class="app-account-management-box">
    <div class="select-tools">
      <div>
        <div>
          <el-input placeholder="学员姓名/手机号"/>
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
      </div>
      <div class="btn">
        <div>
          <el-button type="primary" icon="el-icon-search">搜索</el-button>
        </div>
        <div>
          <el-button icon="el-icon-refresh">重置搜索条件</el-button>
        </div>
      </div>
    </div>
    <el-table :data="dataList" stripe border style="width: 100%">
      <el-table-column prop="date" label="姓名"/>
      <el-table-column prop="date" label="手机号" width="150"/>
      <el-table-column prop="date" label="UniteID"/>
      <el-table-column prop="date" label="最后登录时间" width="150"/>
      <el-table-column prop="date" label="状态" width="150"/>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary">停用</el-button>
        </template>
      </el-table-column>
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

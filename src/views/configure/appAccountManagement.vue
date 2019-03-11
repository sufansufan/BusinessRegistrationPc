<template>
  <div class="app-account-management-box">
    <div class="select-tools">
      <div>
        <div>
          <el-input v-model="select.studentName" placeholder="学员姓名/手机号"/>
        </div>
        <div>
          <el-select v-model="select.status" placeholder="状态">
            <el-option :value="true" label="启用"/>
            <el-option :value="false" label="停用"/>
          </el-select>
        </div>
      </div>
      <div class="btn">
        <div>
          <el-button type="primary" icon="el-icon-search" @click="fetchData('search')">搜索</el-button>
        </div>
        <div>
          <el-button icon="el-icon-refresh" @click="resetSearch">重置搜索条件</el-button>
        </div>
      </div>
    </div>
    <el-table :data="dataList" stripe border style="width: 100%">
      <el-table-column prop="studentName" label="姓名"/>
      <el-table-column prop="mobile" label="手机号" width="150"/>
      <el-table-column prop="uniteId" label="UniteID"/>
      <el-table-column prop="lastLoginDate" label="最后登录时间" width="150"/>
      <el-table-column label="状态">
        <template slot-scope="{row}">
          <span v-html="row.statusHtm"/>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="{row}">
          <el-button
            type="text"
            @click="switchStatus(row.id, row.status)"
          >{{ row.status ? '停用' : '启用' }}</el-button>
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
import { getAppAccList, editStudentExpandStatus } from '@/api/configure'
import { parseTime } from '@/utils'
export default {
  mixins: [tables],
  data() {
    return {
      select: {
        studentName: '',
        status: ''
      },
      dataList: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData(type) {
      if (type === 'search') this.page = 1
      this.BFD(getAppAccList({
        page: this.page,
        limit: this.limit,
        ...this.select
      }).then(res => {
        this.dataList = res.data.list.map(item => {
          item.lastLoginDate = parseTime(item.lastLoginDate)
          item.statusHtm = this.renderStateTag(item.status ? '启用' : '停用')
          return item
        })
      }))
    },
    switchStatus(id, status) {
      editStudentExpandStatus({
        Loading: true,
        id,
        status: !status
      }).then(() => {
        this.$message.success('修改状态成功~')
        this.fetchData()
      })
    }
  }
}
</script>

<style>
</style>

<template>
  <div class="app-account-management-box">
    <div class="select-tools">
      <div>
        <div>
          <el-date-picker
            v-model="times"
            :picker-options="quickOptions"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="timestamp"
            @change="val => parseDate(val, 'startDate', 'endDate')"
          />
        </div>
        <div>
          <el-input v-model="select.userName" placeholder="学员姓名/手机号"/>
        </div>
        <div>
          <el-cascader
            :options="constant.campus"
            v-model="campus"
            :props="{value: 'id', label: 'name'}"
            placeholder="行政区划"
            change-on-select
            clearable
            style="width: 200px;"
            @change="val => getLastVal(val, 'campusId')"
          />
        </div>
      </div>
      <div class="btn">
        <div>
          <el-button type="primary" icon="el-icon-search" @click="fetchData('search')">搜索</el-button>
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
      <el-table-column prop="createDate" label="时间"/>
      <el-table-column prop="campusName" label="校区"/>
      <el-table-column prop="operationUserName" label="姓名"/>
      <el-table-column prop="operationView" label="操作页面"/>
      <el-table-column prop="operationButton" label="操作按钮"/>
      <el-table-column prop="requestParam" label="相关参数"/>
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
import { mapGetters } from 'vuex'
import tables from '@/mixin/tables'
import { getSysOperationInfoList } from '@/api/configure'
import { parseTime } from '@/utils'
export default {
  mixins: [tables],
  data() {
    return {
      campus: [],
      times: [],
      select: {
        campusId: '',
        startDate: '',
        endDate: '',
        userName: ''
      },
      dataList: []
    }
  },
  computed: {
    ...mapGetters(['constant'])
  },
  created() {
    this.$store.dispatch('getConstant', 'campus')
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.BFD(getSysOperationInfoList({
        page: this.page,
        limit: this.limit,
        ...this.select
      }).then(res => {
        const { count, list } = res.data
        this.count = count
        this.dataList = list.map(item => {
          item.createDate = parseTime(item.createDate)
          return item
        })
      }))
    }
  }
}
</script>

<style>
</style>

<template>
  <div class="pos-history-box">
    <div class="select-tools">
      <div>
        <div>
          <el-input v-model="select.posNumber" placeholder="编号"/>
        </div>
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
      </div>
      <div class="btn">
        <div>
          <el-button type="primary" icon="el-icon-search" @click="fetchData('search')">搜索</el-button>
        </div>
      </div>
    </div>
    <el-table :data="dataList" stripe border style="width: 100%">
      <el-table-column prop="createDate" label="日期" width="150"/>
      <el-table-column prop="posNumber" label="POS机编号" width="200"/>
      <el-table-column prop="remarks" label="事件"/>
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
import { getPosHistoryList } from '@/api/configure'
import { parseTime } from '@/utils'
export default {
  mixins: [tables],
  data() {
    return {
      times: [],
      select: {
        posNumber: '',
        startDate: '',
        endDate: ''
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
      this.BFD(getPosHistoryList({
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

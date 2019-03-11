<template>
  <div class="finance-confirm-table">
    <div class="select-tools">
      <div>
        <div>
          <el-date-picker
            v-model="select.date"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"/>
        </div>
        <div>
          <el-cascader
            :options="constant.campus"
            v-model="select.campus"
            :props="{label: 'name', value:'id'}"
            placeholder="校区"
            change-on-select
            @change="val => getLastVal(val, 'campusId')"
          />
        </div>
      </div>
      <div class="btn">
        <div>
          <el-button type="primary" icon="el-icon-search" @click="fetchData('search')">搜索</el-button>
        </div>
        <div>
          <el-button icon="el-icon-refresh" @click="resetSearch">重置搜索条件</el-button>
        </div>
        <div>
          <el-button type="primary" icon="el-icon-download">导出</el-button>
        </div>
      </div>
    </div>
    <comm-table :data="dataList" :columns="columns" :count="count"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import tables from '@/mixin/tables'
import { getAttendList } from '@/api/finance/signQuery'
export default {
  mixins: [tables],
  data() {
    return {
      select: {
        campus: [],
        date: []
      },
      dataList: [],
      columns: [
        { label: '校区', prop: 'campusName', width: '200' },
        { label: '班级ID', prop: 'classId', width: '300' },
        { label: '班级名称', prop: 'className', width: '300' },
        { label: '期别', prop: 'periods' },
        { label: '请假未签到', prop: 'leave' },
        { label: '旷课未签到', prop: 'late' },
        { label: '未签到', prop: 'noAttend' }
      ]
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
    fetchData(type) {
      if (type === 'search') this.page = 1
      const { campus, date } = this.select
      const params = {
        Loading: true,
        campusId: campus[campus.length - 1 ] || '',
        startDate: date && date[0] || '',
        endDate: date && date[1] || '',
        page: this.page,
        limit: this.limit
      }
      this.BFD(getAttendList(params).then(({ data: { list, count }}) => {
        this.dataList = list
        this.count = count
      }))
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

<template>
  <div class="tabs-student-list-box">
    <div class="btn">
      <el-button type="primary" icon="el-icon-download">导出</el-button>
    </div>
    <comm-table v-loading="loading" :data="dataList" :columns="columns"/>
  </div>
</template>

<script>
import tables from '@/mixin/tables'
import { getStudentList } from '@/api/foreground/queryClass'
import { parseTime } from '@/utils'
export default {
  mixins: [tables],
  data() {
    return {
      dataList: [],
      columns: [
        { label: '学员姓名', prop: 'studentName' },
        { label: '学员编码', prop: 'studentNo' },
        { label: '联系电话', prop: 'studentMobile' },
        { label: '校区', prop: 'adminOrganName' },
        { label: '缴费状态', prop: 'paystatusName' },
        { label: '报名时间', prop: 'signupTime', width: 145 },
        { label: '报名操作人', prop: 'singUpName' },
        { label: '缴费时间', prop: 'payTime', width: 145 },
        { label: '缴费操作人', prop: 'payUserName' },
        { label: '备注', prop: 'studentRemarks' }
      ]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.BFD(getStudentList({ classId: this.$route.params.id }).then(res => {
        this.dataList = res.data.list.map(item => {
          item.signupTime = parseTime(item.signupTime)
          item.payTime = parseTime(item.payTime)
          return item
        })
      }))
    }
  }
}
</script>

<style scoped>
.tabs-student-list-box .btn {
  text-align: right;
  margin-bottom: 15px;
}
</style>

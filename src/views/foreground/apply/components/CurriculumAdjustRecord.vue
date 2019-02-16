<template>
  <div class="curriculum-adjust-record-box">
    <comm-table v-loading="loading" :data="dataList" :columns="columns" :count="count">
      <div slot-scope="scope">
        <el-button type="text">取消调课</el-button>
      </div>
    </comm-table>
  </div>
</template>

<script>
import tables from '@/mixin/tables'
import CommTable from '@/views/components/CommTable'
import { getClassSwitching } from '@/api/foreground/apply'
export default {
  name: 'CurriculumAdjustRecord',
  components: {
    CommTable
  },
  mixins: [tables],
  inject: ['sid'],
  data() {
    return {
      dataList: [],
      columns: [
        { label: '订单ID', prop: 'orderId', width: 200 },
        { label: '原校区', prop: 'oldCampusName' },
        { label: '原班级名称', prop: 'oldClassName', width: 200 },
        { label: '期别', prop: 'oldPeriods' },
        { label: '老师', prop: 'oldTeacherName' },
        { label: '重复周期', prop: 'oldClassWeekDay' },
        { label: '时段', prop: 'oldTimeslotName' },
        { label: '开课日期', prop: 'oldStartDate' },
        { label: '原课次', prop: 'oldAttendClass' },
        { label: '目标校区', prop: 'campusName' },
        { label: '目标班级名称', prop: 'className', width: 200 },
        { label: '期别', prop: 'periods' },
        { label: '老师', prop: 'teacherName' },
        { label: '重复周期', prop: 'classWeekDay' },
        { label: '时段', prop: 'timeslotName' },
        { label: '开课日期', prop: 'startDate' },
        { label: '目标课次', prop: 'attendClass' },
        { label: '操作时间', prop: 'updateDate' },
        { label: '操作人', prop: 'updateByName' },
        { label: '操作', prop: 'operation', fixed: 'right' }
      ]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.BFD(getClassSwitching({ id: this.sid }).then(res => {
        const { count, list } = res.data
        this.count = count
        this.dataList = list
      }))
    }
  }
}
</script>

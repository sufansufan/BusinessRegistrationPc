<template>
  <div class="change-class-record">
    <comm-table v-loading="loading" :data="dataList" :columns="columns" :count="count"/>
  </div>
</template>

<script>
import tables from '@/mixin/tables'
import CommTable from '@/views/components/CommTable'
import { getChangeOfClassList } from '@/api/foreground/apply'
export default {
  name: 'ChangeClassRecord',
  inject: ['sid'],
  components: {
    CommTable
  },
  mixins: [tables],
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
        { label: '转班课次', prop: 'changeOfClassSequence' },
        { label: '目标校区', prop: 'campusName' },
        { label: '目标班级名称', prop: 'className', width: 200 },
        { label: '期别', prop: 'periods' },
        { label: '老师', prop: 'teacherName' },
        { label: '重复周期', prop: 'classWeekDay' },
        { label: '时段', prop: 'timeslotName' },
        { label: '开课日期', prop: 'startDate' },
        { label: '操作时间', prop: 'updateDate' },
        { label: '操作人', prop: 'updateByName' }
      ]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.BFD(getChangeOfClassList({ id: this.sid }).then(res => {
        const { count, list } = res.data
        this.count = count
        this.dataList = list
      }))
    }
  }
}
</script>

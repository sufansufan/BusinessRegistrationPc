<template>
  <div class="repair-management-box">
    <turn-class-select ref="selectOptions" @fetchData="fetchData"/>
    <comm-table :data="dataList" :columns="columns" :count="count"/>
  </div>
</template>

<script>
import tables from '@/mixin/tables'
import CommTable from '@/views/components/CommTable'
import TurnClassSelect from './components/TurnClassSelect'
import { getTurnClassList } from '@/api/foreground/queryTurnClass'
import { parseTime } from '@/utils'
export default {
  name: 'QueryTurnClass',
  components: {
    CommTable,
    TurnClassSelect
  },
  mixins: [tables],
  data() {
    return {
      select: {},
      columns: [
        { label: '学员姓名', prop: 'studentName', width: '100' },
        { label: '学员编号', prop: 'studentNo', width: '100' },
        { label: '联系电话', prop: 'studentMobile', width: '120' },
        { label: '校区', prop: 'oldAdminOrganName' },
        { label: '班级名称', prop: 'oldClassName', width: '300' },
        { label: '老师', prop: 'oldTeacherName' },
        { label: '重复周期', prop: 'oldClassWeekDayName' },
        { label: '时段', prop: 'oldTimeslotName', width: '120' },
        { label: '教室', prop: 'oldClassroomName' },
        { label: '转出金额', prop: 'turnOutAmount' },
        { label: '目标校区', prop: 'newAdminOrganName' },
        { label: '老师', prop: 'newTeacherName' },
        { label: '重复周期', prop: 'newClassWeekDayName' },
        { label: '时段', prop: 'newTimeslotName', width: '120' },
        { label: '教室', prop: 'newClassroomName' },
        { label: '操作人', prop: 'updateUserName' },
        { label: '操作时间', prop: 'turnClassTime', width: '150' }
      ],
      dataList: []
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      const { date, oldAdminOrganIds, newAdminOrganIds } = this.$refs.selectOptions.select
      const params = {
        ...this.$refs.selectOptions.select,
        startDate: date && date[0],
        endDate: date && date[1],
        oldAdminOrganIds: oldAdminOrganIds[oldAdminOrganIds.length - 1],
        newAdminOrganIds: newAdminOrganIds[newAdminOrganIds.length - 1]
      }
      delete params.date
      this.BFD(getTurnClassList(params).then(({ data }) => {
        const { count, list } = data
        this.count = count
        this.dataList = list
        this.dataList.map(item => {
          item.turnClassTime = parseTime(item.turnClassTime, 'y-m-d')
          return item
        })
      }))
    }
  }
}
</script>

<style scoped>

</style>

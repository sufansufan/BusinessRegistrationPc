<template>
  <div class="repair-management-box">
    <turn-class-select/>
    <comm-table :data="dataList" :columns="columns" :count="count"/>
  </div>
</template>

<script>
import tables from '@/mixin/tables'
import CommTable from '@/views/components/CommTable'
import TurnClassSelect from './components/TurnClassSelect'
export default {
  name: 'QueryTurnClass',
  components: {
    CommTable,
    TurnClassSelect
  },
  mixins: [tables],
  data() {
    return {
      select: {

      },
      columns: [
        { label: '学员姓名', prop: 'studentName' },
        { label: '学员编号', prop: 'studentNo', width: '100' },
        { label: '联系电话', prop: 'studentMobile' },
        { label: '校区', prop: 'classSequence' },
        { label: '班级名称', prop: 'className', width: '300' },
        { label: '老师', prop: 'classSequence' },
        { label: '重复周期', prop: 'classSequence' },
        { label: '时段', prop: 'classSequence' },
        { label: '教室', prop: 'classSequence' },
        { label: '转出金额', prop: 'classSequence' },
        { label: '目标校区', prop: 'classSequence' },
        { label: '老师', prop: 'classSequence' },
        { label: '重复周期', prop: 'currentStatusName' },
        { label: '时段', prop: 'mendRegisterTime' },
        { label: '教室', prop: 'aciUpdateByName' },
        { label: '操作人', prop: 'aciUpdateByName' },
        { label: '操作时间', prop: 'aciUpdateDate' }
      ],

      dataList: []
    }
  },
  methods: {
    fetchData() {

    }
  }
}
</script>

<style scoped>

</style>

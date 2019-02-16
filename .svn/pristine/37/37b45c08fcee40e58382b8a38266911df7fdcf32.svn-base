<template>
  <div class="attend-class-box">
    <comm-table v-loading="loading" :data="dataList" :columns="columns" :count="count">
      <div slot-scope="{row}">
        <el-button
          type="text"
          @click="$router.push({path: `/foreground/apply/changeClass/${sid}?cid=${row.classId}&oid=${row.id}`})"
        >转班</el-button>
        <el-button
          type="text"
          @click="$router.push({path: `/foreground/apply/curriculumAdjust/${sid}?cid=${row.classId}`})"
        >调课</el-button>
        <el-button type="text">打印听课证</el-button>
      </div>
    </comm-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import tables from '@/mixin/tables'
import CommTable from '@/views/components/CommTable'
import { getStudentClassList } from '@/api/foreground/apply'
import { parseTime } from '@/utils'
export default {
  name: 'AttendClass',
  inject: ['sid'],
  components: {
    CommTable
  },
  mixins: [tables],
  props: {
    fetchType: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      dataList: [],
      columns: [
        { label: '校区', prop: 'campusName' },
        { label: '班级名称', prop: 'className', width: '150' },
        { label: '听课证编号', prop: 'no', width: '150' },
        { label: '科目', prop: 'subjectLabel' },
        { label: '老师', prop: 'teacherName' },
        { label: '重复周期', prop: 'classWeekDay' },
        { label: '时段', prop: 'timeslotName', width: '90' },
        { label: '教室', prop: 'classroomName' },
        { label: '开课日期', prop: 'startTime', width: '90' },
        { label: '结课日期', prop: 'endTime', width: '90' },
        { label: '价格', prop: 'totalPrice', type: 'num', pre: '￥' },
        { label: '实付金额', prop: 'realPayment', type: 'num', pre: '￥' },
        { label: '支付方式', prop: 'paymentTypeLabel' },
        { label: 'POS流水号', prop: 'posNumber', width: '150' },
        { label: '状态', prop: 'paymentstatus' },
        { label: '操作时间', prop: 'updateDate', width: '90' },
        { label: '操作人', prop: 'updateByName' },
        { label: '操作', prop: 'operation', width: '175', fixed: 'right' }
      ]
    }
  },
  computed: {
    ...mapGetters(['constant'])
  },
  created() {
    this.$store.dispatch('getConstant', 'week_day_type').then(() => {
      this.fetchData()
    })
  },
  methods: {
    fetchData() {
      this.BFD(getStudentClassList({
        id: this.sid,
        page: this.page,
        limit: this.limit,
        operationType: this.fetchType
      }).then(res => {
        const { count, list } = res.data
        this.count = count
        this.dataList = list.map(item => {
          item.startTime = parseTime(item.startTime, 'y-m-d')
          item.endTime = parseTime(item.endTime, 'y-m-d')
          item.updateDate = parseTime(item.updateDate, 'y-m-d')
          item.classWeekDay =
            item.classWeekDay.split(',')
              .reduce((s, n) => s + this.constant.week_day_type.find(item => item.value === n).label + ',', '')
          return item
        })
      }))
    }
  }
}
</script>

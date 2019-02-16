<template>
  <div>
    <comm-table v-loading="loading" :data="dataList" :columns="columns" :count="count"/>
  </div>
</template>

<script>
import tables from '@/mixin/tables'
import { getSignUpRefundOrderList } from '@/api/foreground/apply'
import { parseTime } from '@/utils'
export default {
  mixins: [tables],
  inject: ['sid'],
  data() {
    return {
      dataList: [],
      columns: [
        { label: '发起时间', prop: 'createDate', width: 150 },
        { label: '退费单ID', prop: 'refundRecordNo' },
        { label: '校区', prop: 'campusName' },
        { label: '财务主体', prop: 'financeName' },
        { label: '班级名称', prop: 'className', width: 150 },
        { label: '学员姓名', prop: 'studentName' },
        { label: '联系电话', prop: 'studentPhone', width: 100 },
        { label: '购课/总课次', prop: ['payAttendCount', 'refundAttendNumber'], width: 100, type: 'num' },
        { label: '退费总课次', prop: 'refundAttendNumber', width: 100, type: 'num' },
        { label: '应付价格', prop: 'price', type: 'num', pre: '￥' },
        { label: '实付金额', prop: 'realPayment', type: 'num', pre: '￥' },
        { label: '课次退费', prop: 'classRefundAmount', type: 'num', pre: '￥' },
        { label: '额外退费', prop: 'otherRefundAmount', type: 'num', pre: '￥' },
        { label: '退费总额', prop: 'realRefundAmount', type: 'num', pre: '￥' },
        { label: '状态', prop: 'statusLabel' },
        { label: '打款流水号', prop: 'remitNo', width: 100 },
        { label: '操作人', prop: 'updateByName' }
      ]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.BFD(getSignUpRefundOrderList({
        studentId: this.sid,
        limit: this.limit,
        page: this.page
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

<style scoped>
</style>

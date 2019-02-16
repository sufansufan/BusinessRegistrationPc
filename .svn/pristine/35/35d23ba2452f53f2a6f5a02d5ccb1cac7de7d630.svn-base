<template>
  <div class="apply-other-payment-box">
    <comm-table v-loading="loading" :data="dataList" :columns="columns" :count="count"/>
  </div>
</template>

<script>
import tables from '@/mixin/tables'
import CommTable from '@/views/components/CommTable'
import { getOtherOrderList } from '@/api/foreground/apply'
export default {
  name: 'ApplyOtherPayment',
  components: {
    CommTable
  },
  mixins: [tables],
  inject: ['sid'],
  data() {
    return {
      dataList: [],
      columns: [
        { label: '收费内容', prop: 'name', width: 150 },
        { label: '数量', prop: 'number', type: 'num' },
        { label: '单价', prop: 'singlePrice', pre: '￥', type: 'num' },
        { label: '应付金额', prop: 'price', pre: '￥', type: 'num' },
        { label: '实付金额', prop: 'realPayment', pre: '￥', type: 'num' },
        { label: '支付方式', prop: 'paymentTypeLable' },
        { label: 'POS流水号', prop: 'posNumber' },
        { label: '状态', prop: 'status' },
        { label: '操作时间', prop: 'udpateDate' },
        { label: '操作人', prop: 'updateByName' }
      ]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.BFD(getOtherOrderList({ id: this.sid }).then(({ data: { count, otherOrder }}) => {
        this.count = count
        this.dataList = otherOrder
      }))
    }
  }
}
</script>

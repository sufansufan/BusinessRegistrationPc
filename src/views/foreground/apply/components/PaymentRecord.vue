<template>
  <div class="payment-record-box">
    <span v-show="!count" class="is-empty">暂无记录</span>
    <div v-for="(list, index) in dataList" :key="index" class="payment-record-box-list">
      <div class="payment-record-box-list-head">
        <div class="tit">
          <span>财务主体</span>
          <span>{{ list.financeName }}</span>
        </div>
        <div class="tit">
          <span>支付方式</span>
          <span>{{ list.paymentTypeLable }}</span>
        </div>
        <div class="tit">
          <span>POS流水号</span>
          <span>{{ list.posNumber }}</span>
        </div>
        <div class="tit">
          <span>支付总金额</span>
          <count-num :num="list._totalPrice" prefix="￥"/>
        </div>
        <div class="tit">
          <span>操作人</span>
          <span>{{ list.updateByName }}</span>
        </div>
      </div>
      <comm-table :data="[list]" :columns="columns"/>
    </div>
    <el-pagination
      v-show="count"
      :page-sizes="pageSizes"
      :page-size="limit"
      :total="count"
      :current-page="page"
      :layout="pageLayout"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    />
  </div>
</template>

<script>
import tables from '@/mixin/tables'
import { getPaymentList } from '@/api/foreground/apply'
import CommTable from '@/views/components/CommTable'
import { parseTime } from '@/utils'
export default {
  inject: ['sid'],
  components: {
    CommTable
  },
  mixins: [tables],
  data() {
    return {
      dataList: [],
      columns: [
        { label: '时间', prop: 'updateDate', width: 100 },
        { label: '支付ID', prop: 'paymentNo' },
        { label: '分期', prop: 'byStageNumber', suf: '期' },
        { label: '订单ID', prop: 'orderno' },
        { label: '校区', prop: 'campusName' },
        [
          { label: '班级名称', prop: 'className', width: 250 },
          { label: '收费内容', prop: '_otherName', width: 250 },
          { label: '支付/购课/总课次', prop: ['paymentAttandClass', 'buyAttandClass', 'attandClassCount'], width: 130 },
          { label: '折扣', prop: 'discount', type: 'num' },
          { label: '立减', prop: 'subtractAmount', type: 'num', pre: '￥' },
          { label: '优惠券', prop: '' },
          { label: '单价', prop: 'singlePrice', type: 'num', pre: '￥' },
          { label: '数量', prop: 'number', type: 'num' },
          { label: '应付金额', prop: 'price', type: 'num', pre: '￥', width: 130 },
          { label: '订单金额', prop: 'realPayment', type: 'num', pre: '￥', width: 130 },
          { label: '实付金额', prop: 'paidPayment', type: 'num', pre: '￥', width: 130 }
        ]
      ]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.BFD(getPaymentList({
        id: this.sid,
        page: this.page,
        limit: this.limit
      }).then(res => {
        const { count, paymentInfoList } = res.data
        this.count = count
        this.dataList = paymentInfoList.map(item => {
          const name = item.className
          item.updateDate = parseTime(item.updateDate, 'y-m-d')
          if (item.paymentAttandClass === '1') {
            item._otherName = ''
          } else {
            item._otherName = name
            item.className = ''
          }
          item._totalPrice = item.order
            .reduce((s, n) => ({ realPayment: +s.realPayment + +n.realPayment }), { realPayment: 0 }).realPayment
          return item
        })
      }))
    }
  }
}
</script>

<style lang="scss" scoped>
.payment-record-box {
  &-list {
    margin-bottom: 22px;
    &-head {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      .tit {
        flex: 1;
        margin: 0 10px 10px 0;
        padding: 0 10px;
        line-height: 33px;
        background: #eaeaea;
        border-radius: 3px;
        display: flex;
        align-items: center;
        flex-grow: 1;
        &:nth-child(2) {
          max-width: 250px;
        }
        &:nth-child(3) {
          flex-grow: 1.3;
        }
        &:last-child {
          max-width: 250px;
          margin-right: 0;
        }
        > span:first-child {
          color: #707070;
          &:not(:only-of-type) {
            padding-right: 10px;
          }
        }
      }
    }
  }
}
</style>

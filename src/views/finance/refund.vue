<template>
  <div class="refund-management-box">
    <div class="arrow-list-box">
      <div>
        <h5>打款总金额</h5>
        <count-num :num="allAmount.remitAmountCount" class="act-color" prefix="￥"/>
      </div>
      <div>
        <h5>课程打款</h5>
        <count-num :num="allAmount.courseAmountCount" class="act-color" prefix="￥"/>
      </div>
      <div>
        <h5>其他打款</h5>
        <count-num :num="allAmount.otherAmountCount" class="act-color" prefix="￥"/>
      </div>
      <div>
        <h5>额外退费打款</h5>
        <count-num :num="allAmount.extraAmountCount" class="act-color" prefix="￥"/>
      </div>
      <div>
        <h5>退费总人数</h5>
        <count-num :num="allAmount.refundPersonCountAll" :to-fixed="0" class="act-color"/>
      </div>
      <div>
        <h5>退费总人次</h5>
        <count-num :num="allAmount.refundPersonCount" :to-fixed="0" class="act-color"/>
      </div>
    </div>
    <refund-query :is-audit="true" @allAmount="val => allAmount = val">
      <template slot-scope="{row}">
        <el-button
          type="text"
          @click="$router.push({path: `/finance/refundAudit/${row.studentId}?id=${row.id}`})"
        >审核</el-button>
      </template>
    </refund-query>
  </div>
</template>

<script>
import RefundQuery from '../foreground/businessQuery/refundQuery'
export default {
  components: {
    RefundQuery
  },
  data() {
    return {
      allAmount: {}
    }
  }
}
</script>

<template>
  <div class="income-situation-box">
    <div class="arrow-list-box">
      <div>
        <h5>总收入</h5>
        <count-num :num="allAmount.totalIncomeTotal" class="act-color" prefix="￥"/>
      </div>
      <div>
        <h5>课程收入</h5>
        <count-num :num="allAmount.courseIncomeTotal" class="act-color" prefix="￥"/>
      </div>
      <div>
        <h5>其他收费</h5>
        <count-num :num="allAmount.otherIncomeTotal" class="act-color" prefix="￥"/>
      </div>
      <div>
        <h5>转入金额</h5>
        <count-num :num="allAmount.courseRefundTotal" class="act-color" prefix="￥"/>
      </div>
      <div>
        <h5>转出金额</h5>
        <count-num :num="allAmount.otherRefundTotal" class="act-color" prefix="￥"/>
      </div>
      <div>
        <h5>课程退费</h5>
        <count-num :num="allAmount.enrollPersonTotal" :to-fixed="0" class="act-color"/>
      </div>
      <div>
        <h5>其他退费</h5>
        <count-num :num="allAmount.enrollPersonTimeTotal" :to-fixed="0" class="act-color"/>
      </div>
      <div>
        <h5>确认收入</h5>
        <count-num :num="allAmount.returnsPersonTotal" :to-fixed="0" class="act-color"/>
      </div>
      <div>
        <h5>未确认收入</h5>
        <count-num :num="allAmount.returnsPersonTimTotale" :to-fixed="0" class="act-color"/>
      </div>
    </div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="按市区" name="city">
        <FinanceConfirmTable @getAllAmount="getAllAmount"/>
      </el-tab-pane>
      <el-tab-pane label="按校区" name="campus">
        <FinanceConfirmTable :is-campus="true" @getAllAmount="getAllAmount"/>
      </el-tab-pane>
      <el-tab-pane label="预估确认收入" name="estimateIncome">
        1231
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import FinanceConfirmTable from './components/FinanceConfirmTable'
export default {
  name: 'IncomeSituation',
  components: {
    FinanceConfirmTable
  },
  data() {
    return {
      allAmount: {
        enrollPersonTimeTotal: 0,
        returnsPersonTotal: 0,
        enrollPersonTotal: 0,
        returnsPersonTimTotale: 0,
        otherIncomeTotal: 0,
        totalIncomeTotal: 0,
        courseIncomeTotal: 0,
        courseRefundTotal: 0,
        otherRefundTotal: 0
      },
      activeName: 'city'
    }
  },
  methods: {
    handleClick() {

    },
    getAllAmount(value) {
      this.allAmount = value
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

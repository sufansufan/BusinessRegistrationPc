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
        <count-num :num="allAmount.inMoneyTotal" class="act-color" prefix="￥"/>
      </div>
      <div>
        <h5>转出金额</h5>
        <count-num :num="allAmount.outMoneyTotal" class="act-color" prefix="￥"/>
      </div>
      <div>
        <h5>课程退费</h5>
        <count-num :num="allAmount.courseRefundTotal" :to-fixed="0" class="act-color"/>
      </div>
      <div>
        <h5>其他退费</h5>
        <count-num :num="allAmount.otherRefundTotal" :to-fixed="0" class="act-color"/>
      </div>
      <div>
        <h5>确认收入</h5>
        <count-num :num="allAmount.confirmIncomeTotal" :to-fixed="0" class="act-color"/>
      </div>
      <div>
        <h5>未确认收入</h5>
        <count-num :num="allAmount.noconfirmIncomeTotal" :to-fixed="0" class="act-color"/>
      </div>
    </div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="按市区" name="city">
        <finance-confirm-table @getAllAmount="getAllAmount"/>
      </el-tab-pane>
      <el-tab-pane label="按校区" name="campus">
        <finance-confirm-table :is-campus="true" @getAllAmount="getAllAmount"/>
      </el-tab-pane>
      <el-tab-pane label="预估确认收入" name="estimateIncome">
        <estimate-comfirm/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import FinanceConfirmTable from './components/FinanceConfirmTable'
import EstimateComfirm from './components/EstimateComfirm'
export default {
  name: 'IncomeSituation',
  components: {
    FinanceConfirmTable,
    EstimateComfirm
  },
  data() {
    return {
      allAmount: {
        totalIncomeTotal: 0,
        courseIncomeTotal: 0,
        otherIncomeTotal: 0,
        inMoneyTotal: 0,
        outMoneyTotal: 0,
        courseRefundTotal: 0,
        otherRefundTotal: 0,
        confirmIncomeTotal: 0,
        noconfirmIncomeTotal: 0
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

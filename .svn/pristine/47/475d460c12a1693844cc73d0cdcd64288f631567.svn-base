<template>
  <div class="refundRecord">
    <el-tabs v-model="tabsName">
      <el-tab-pane label="退费单" name="refundOrder">
        <refund-order/>
      </el-tab-pane>
      <el-tab-pane label="报名退费" name="applyRefund" lazy>
        <apply-refund/>
      </el-tab-pane>
      <el-tab-pane label="其他退费" name="otherRefund" lazy>
        <other-refund/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import RefundOrder from './RefundOrder'
import ApplyRefund from './ApplyRefund'
import OtherRefund from './OtherRefund'
export default {
  components: {
    RefundOrder,
    ApplyRefund,
    OtherRefund
  },
  data() {
    return {
      tabsName: 'refundOrder'
    }
  }
}
</script>

<style scoped>
</style>

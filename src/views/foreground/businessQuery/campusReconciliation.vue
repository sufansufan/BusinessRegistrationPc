<template>
  <div class="campus-reconciliation">
    <el-tabs v-model="tabsName">
      <el-tab-pane label="支付记录" name="record">
        <payment-record :finance-list="financeList"/>
      </el-tab-pane>
      <el-tab-pane label="课程报名" name="apply" lazy>
        <course-enrolment :finance-list="financeList"/>
      </el-tab-pane>
      <el-tab-pane label="其他收费" name="other" lazy>
        <other-payment/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import PaymentRecord from './components/PaymentRecord'
import CourseEnrolment from './components/CourseEnrolment'
import OtherPayment from './components/OtherPayment'
import { getFinanceBodyList } from '@/api/backstage/campusManagement'
export default {
  name: 'CampusReconciliation',
  components: {
    PaymentRecord,
    CourseEnrolment,
    OtherPayment
  },
  data() {
    return {
      tabsName: 'record',
      financeList: []
    }
  },
  created() {
    this.fetchFinanceBody()
  },
  methods: {
    fetchFinanceBody() {
      getFinanceBodyList({ adminOrganParentIds: 1, adminOrganStatus: true }).then(({ data }) => {
        const { list } = data
        this.financeList = list.filter(item => item.status)
      })
    }
  }
}
</script>

<style scoped>
</style>

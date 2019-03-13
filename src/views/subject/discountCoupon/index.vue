/**
* Author: DanSmile
* Date: 2019/3/8
* Time: 16:30
*/
<template>
  <div>
    <router-view v-if="$route.matched.length > 2"/>
    <template v-else>
      <el-tabs v-model="tabsName">
        <el-tab-pane label="发放管理" name="issue">
          <issue-management/>
        </el-tab-pane>
        <el-tab-pane label="优惠券模板" name="coupon" lazy>
          <coupon-template/>
        </el-tab-pane>
      </el-tabs>
    </template>
  </div>
</template>

<script>
import IssueManagement from './components/IssueManagement'
import CouponTemplate from './components/CouponTemplate'
export default {
  name: 'DiscountCoupon',
  components: {
    IssueManagement,
    CouponTemplate
  },
  data() {
    return {
      tabsName: 'issue'
    }
  }
}
</script>

<style scoped>

</style>

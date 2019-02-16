<template>
  <div class="pay-confirm-box">
    <student :sid="sid"/>
    <div class="pay-confirm-box-content">
      <el-button type="goback" @click="$router.go(-1)">返回</el-button>
      <h2>支付确认</h2>
      <pay-content :is-edit="false" :data-list="dataList" :by-stages="byStages"/>
    </div>
  </div>
</template>

<script>
import Student from '../student'
import PayContent from './PayContent'
import { getOrderInfo } from '@/api/foreground/apply'
export default {
  name: 'PayConfirm',
  inject: ['sid'],
  components: {
    Student,
    PayContent
  },
  data() {
    return {
      dataList: [],
      byStages: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      const id = this.$route.query.oid
      getOrderInfo({ id }).then(res => {
        const { bayStages, order } = res.data.bigOrderInfo
        this.dataList = order
        this.byStages = bayStages
      })
    }
  }
}
</script>

<style lang="scss">
.pay-confirm-box {
  position: relative;
  &::before {
    content: "";
    position: absolute;
    left: -22px;
    top: 114px;
    width: calc(100% + 44px);
    height: 22px;
    background: linear-gradient(to bottom, #f1f1f1, #f3f5f7, #f1f1f1);
  }
  &-content {
    padding-top: 66px;
    .el-button--goback {
      position: absolute;
    }
    > h2 {
      margin: 0 0 22px 0;
      text-align: center;
    }
  }
}
</style>

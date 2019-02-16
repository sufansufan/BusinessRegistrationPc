<template>
  <div class="pay-box">
    <student :sid="sid"/>
    <div class="pay-box-content">
      <el-button type="goback" @click="$router.go(-1)">返回</el-button>
      <h2>{{ isEdit ? '结算内容' : '支付确认' }}</h2>
      <pay-content :is-edit.sync="isEdit" :data-list="dataList" @update="fetchData"/>
    </div>
  </div>
</template>

<script>
import Student from './student'
import PayContent from './components/PayContent'
import { getSettlementList } from '@/api/foreground/apply'
export default {
  inject: ['sid'],
  components: {
    Student,
    PayContent
  },
  data() {
    return {
      isEdit: true,
      dataList: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      getSettlementList({ Loading: true, id: this.sid }).then(res => {
        this.dataList = res.data.classInfo
      })
    }
  }
}
</script>

<style lang="scss">
.pay-box {
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

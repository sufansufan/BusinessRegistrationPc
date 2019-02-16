<template>
  <div class="signinfo-box">
    <div class="info-head student-info-box">
      <div>
        <h1>{{ classInfo.className }}</h1>
        <div>
          <div>
            <span>总课次</span>
            {{ classInfo.totalTimes }}
          </div>
          <div>{{ classInfo.classWeekDayName }}</div>
          <div>{{ classInfo.turnClassConditionName }}</div>
          <div v-if="classInfo.whetherAdmissionTest">入学考试</div>
          <div>分数线 {{ classInfo.minEntryScore }}</div>
        </div>
      </div>
      <count-num :num="classInfo.totalPrice" :size="32" prefix="￥" class="act-color"/>
    </div>
    <div class="signinfo-box-content">
      <el-button type="goback" @click="$router.go(-1)">返回</el-button>
      <div>
        <signList/>
      </div>
    </div>
  </div>
</template>

<script>
import { getClassInfo } from '@/api/foreground/queryClass'
import SignList from './components/SignList'
export default {
  name: 'SignInfo',
  components: {
    SignList
  },
  data() {
    return {
      classInfo: {}
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      getClassInfo({ id: this.$route.params.id }).then(res => {
        this.classInfo = res.data.pxxclass
      })
    }
  }
}
</script>

<style lang="scss">
.signinfo-box {
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
  .info-head {
    height: 92px;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &::before {
      content: "";
      position: absolute;
      top: -11px;
      left: -22px;
      width: 3px;
      height: calc(100% + 22px);
    }
    h1 {
      margin-top: 0px;
    }
    > div > div {
      display: flex;
      > div {
        padding: 0 10px;
        color: #7d7d7d;
        &:first-child {
          padding-left: 0;
        }
        &:not(:last-child) {
          border-right: 1px solid #ccc;
        }
        span {
          padding-right: 5px;
        }
      }
    }
  }
  &-content {
    padding-top: 66px;
    .el-button--goback {
      margin-bottom: 10px;
    }
    > h2 {
      margin: 0 0 22px 0;
      text-align: center;
    }
  }
}
</style>

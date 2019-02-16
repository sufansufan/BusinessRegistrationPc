<template>
  <div class="info-box">
    <student :sid="sid" :is-edit="true"/>
    <div class="info-box-content">
      <el-button type="goback" icon="el-icon-arrow-left" @click="$router.push({name: 'Apply'})">返回</el-button>
      <div class="info-box-content-link">
        <el-tabs v-model="linkActived" :before-leave="tabClickBefore">
          <el-tab-pane
            v-for="link in linkList"
            :key="link.name"
            :name="link.name"
            :label="link.label"
          />
        </el-tabs>
      </div>
      <div class="info-box-content-view">
        <keep-alive include="ClassQuery">
          <router-view/>
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script>
import Student from './student'

const LINK = [
  {
    label: '班级查询',
    name: 'classQuery'
  },
  {
    label: '在读班级',
    name: 'attendClass'
  },
  {
    label: '已结课班级',
    name: 'finishedClass'
  },
  {
    label: '支付完成',
    name: 'payFinish'
  },
  {
    label: '转班记录',
    name: 'changeClassRecord'
  },
  {
    label: '调课记录',
    name: 'curriculumAdjustRecord'
  },
  {
    label: '退费记录',
    name: 'refundRecord'
  },
  {
    label: '候补记录',
    name: 'repairRecord'
  },
  {
    label: '其他收费',
    name: 'applyOtherPayment'
  },
  {
    label: '订单',
    name: 'order'
  },
  {
    label: '未完成订单',
    name: 'unfinishedOrder'
  },
  {
    label: '支付记录',
    name: 'paymentRecord'
  }
]

export default {
  name: 'StudentInfo',
  components: {
    Student
  },
  provide() {
    return {
      sid: this.$route.params.id
    }
  },
  data() {
    return {
      linkList: [],
      linkActived: 'classQuery'
    }
  },
  computed: {
    sid() {
      return this.$route.params.id
    }
  },
  watch: {
    $route() {
      this.routeWatch()
    }
  },
  created() {
    this.linkList = LINK.map(item => {
      item.url = `/foreground/apply/student/${item.name}/${this.sid}`
      return item
    })
    this.routeWatch()
  },
  methods: {
    routeWatch() {
      const { name } = this.$route
      this.linkActived = name.replace(/( |^)[A-Z]/g, first => first.toLowerCase())
    },
    tabClickBefore(name) {
      const { url } = this.linkList.find(item => item.name === name)
      this.$router.push({ path: url })
    }
  }
}
</script>

<style lang="scss">
.info-box {
  .el-tabs__header {
    margin-bottom: 5px;
  }
}
</style>

<style lang="scss" scoped>
.info-box {
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
    &-link {
      padding-top: 10px;
      border-bottom: 1px solid #f0f0f0;
      a {
        padding: 0 11px;
        color: #7d7d7d;
      }
    }
    &-view {
      padding: 14px 0;
    }
  }
}
</style>

<template>
  <div class="dashboard-editor-container">
    <panel-group/>
    <el-row :gutter="22" class="middle-box">
      <el-col :xs="24" :sm="24" :lg="16">
        <div class="middle-box-left">
          <line-chart :chart-data="lineChartData"/>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="middle-box-right">
          <el-tabs v-model="selectedNotice">
            <el-tab-pane label="转班通知" name="changeClass">
              <el-scrollbar>
                <div v-for="item in messages.turnClassList" :key="item.key" class="change-class">
                  <div class="change-class-item">
                    <p class="change-class-item-time">2018年7月26日 16:59:10</p>
                    <div class="change-class-item-content">
                      <b>张柳</b> [凯旋门]2018秋季数学同步巩固A2班 @4
                      <span class="act-color">调至</span> [本校区] 2018秋季数学同步巩固A2班 @4
                    </div>
                  </div>
                </div>
              </el-scrollbar>
              <div v-if="!messages.turnClassList.length" class="is-empty">暂无通知</div>
            </el-tab-pane>
            <el-tab-pane label="调课通知" name="changeCourse">
              <el-scrollbar>
                <div
                  v-for="item in messages.changeClassScheduleList"
                  :key="item.key"
                  class="change-class"
                >
                  <div class="change-class-item">
                    <p class="change-class-item-time">{{ item.dateString }}</p>
                    <div class="change-class-item-content">{{ item.content }}</div>
                  </div>
                </div>
              </el-scrollbar>
              <div v-if="!messages.changeClassScheduleList.length" class="is-empty">暂无通知</div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="22">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <pie-chart :chart-data="pieChart.studentGradeList" title="学员年级"/>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <pie-chart :chart-data="pieChart.studentSourceList" title="学员来源"/>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <pie-chart :chart-data="pieChart.consultationTransformationList" title="近30天咨询转化"/>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
import PieChart from './components/PieChart'
import { getSecondStatistics, getThreeStatistics, getFourStatistics } from '@/api'

export default {
  name: 'Home',
  components: {
    PanelGroup,
    LineChart,
    PieChart
  },
  data() {
    return {
      selectedNotice: 'changeClass',
      lineChartData: {},
      pieChart: {
        studentGradeList: [],
        studentSourceList: [],
        consultationTransformationList: []
      },
      messages: {
        changeClassScheduleList: [],
        turnClassList: []
      }
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      const adminOrganIds = this.userInfo.currentRoleId
      getSecondStatistics({ adminOrganIds }).then(res => {
        this.lineChartData = res.data
      })
      getThreeStatistics({ adminOrganIds }).then(res => {
        this.messages = res.data
      })
      getFourStatistics({ adminOrganIds }).then(res => {
        this.pieChart = res.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  .is-empty {
    padding-left: 20px;
    font-size: 12px;
  }
  .middle-box {
    &-left,
    &-right {
      height: 366px;
      padding: 16px 16px 0;
      background: #fff;
      margin-bottom: 22px;
      border-radius: 6px;
    }
    &-right {
      padding-bottom: 12px;
      .change-class {
        height: 300px;
        &-item {
          padding: 0 0 15px;
          margin-bottom: 15px;
          &:not(:last-child) {
            border-bottom: 1px solid #ededed;
          }
          &-time {
            font-size: 12px;
            color: #b8b8b8;
            margin: 0 0 10px;
          }
          &-content {
            font-size: 16px;
            line-height: 24px;
          }
        }
      }
    }
  }
  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 22px;
    border-radius: 6px;
  }
}
</style>
<style lang="scss">
.dashboard-container {
  .el-tabs__nav-wrap {
    .el-tabs__item {
      color: #7d7d7d;
    }
    .el-tabs__active-bar {
      width: 26px !important;
      left: 12px !important;
      height: 4px !important;
    }
    .el-tabs__item.is-active {
      color: #000;
      font-size: 16px;
    }
    &::after {
      display: none;
    }
  }
}
</style>

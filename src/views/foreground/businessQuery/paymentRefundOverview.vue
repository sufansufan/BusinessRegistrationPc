<template>
  <div class="payment-refund-overview">
    <div class="select-tools">
      <div>
        <div>
          <el-date-picker
            v-model="times"
            :picker-options="quickOptions"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="timestamp"
            @change="val => parseDate(val, 'startDate', 'endDate')"
          />
        </div>
        <div>
          <el-cascader
            :options="constant.campus"
            v-model="campus"
            :props="{label: 'name', value:'id'}"
            placeholder="校区"
            change-on-select
            @change="val => getLastVal(val, 'campusId')"
          />
        </div>
        <div>
          <el-button type="primary" icon="el-icon-search" @click="fetchData">搜索</el-button>
        </div>
        <div>
          <el-button icon="el-icon-refresh" @click="resetSearch">重置搜索条件</el-button>
        </div>
      </div>
    </div>
    <div class="payment-refund-overview-charts">
      <el-row v-loading="loading" :gutter="22">
        <el-col :xs="24" :sm="24" :lg="8">
          <div class="chart-wrapper">
            <pie-chart :chart-data="pieChart.pay" title="缴费额"/>
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="8">
          <div class="chart-wrapper">
            <pie-chart :chart-data="pieChart.refund" title="退费额"/>
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="8">
          <div class="chart-wrapper">
            <pie-chart :chart-data="pieChart.consult" title="咨询转化"/>
          </div>
        </el-col>
      </el-row>
      <line-chart :chart-data="lineChartData"/>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import tables from '@/mixin/tables'
import PieChart from '@/views/dashboard/components/PieChart'
import LineChart from '@/views/dashboard/components/LineChart'
import { getRefundOrPayForECharts } from '@/api/foreground'
export default {
  name: 'PaymentRefundOverview',
  components: {
    PieChart,
    LineChart
  },
  mixins: [tables],
  data() {
    return {
      times: [],
      campus: [],
      select: {
        startDate: '',
        endDate: '',
        adminOrganIds: ''
      },
      pieChart: {
        pay: [],
        refund: [],
        consult: []
      },
      lineChartData: {}
    }
  },
  computed: {
    ...mapGetters(['constant'])
  },
  created() {
    this.$store.dispatch('getConstant', 'campus')
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.BFD(getRefundOrPayForECharts({
        ...this.select
      }).then(res => {
        const { dates, listPaied, listRefund, listConsultationTransformation, registerAndOrderNumlist } = res.data
        this.pieChart.pay = listPaied
        this.pieChart.refund = listRefund
        this.pieChart.consult = listConsultationTransformation
        this.lineChartData = {
          dates,
          list: registerAndOrderNumlist
        }
      }))
    }
  }
}
</script>

<style lang="scss" scoped>
.payment-refund-overview {
  &-charts {
    padding: 20px 0;
  }
}
</style>

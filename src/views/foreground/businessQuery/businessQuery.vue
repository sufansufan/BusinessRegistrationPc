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
          <el-select v-model="select.grade" clearable placeholder="年级">
            <el-option
              v-for="item in constant.grade"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div>
          <el-select v-model="select.subject" clearable placeholder="科目">
            <el-option
              v-for="item in constant.subject"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
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
      <line-chart :chart-data="lineChartData"/>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import tables from '@/mixin/tables'
import LineChart from '@/views/dashboard/components/LineChart'
import { getStudentBusinessForECharts } from '@/api/foreground'
export default {
  name: 'PaymentRefundOverview',
  components: {
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
        adminOrganIds: '',
        grade: '',
        subject: ''
      },
      lineChartData: {}
    }
  },
  computed: {
    ...mapGetters(['constant'])
  },
  created() {
    this.$store.dispatch('getConstant', ['campus', 'grade', 'subject'])
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.BFD(getStudentBusinessForECharts({
        ...this.select
      }).then(res => {
        const { dates, list } = res.data
        this.lineChartData = {
          dates,
          list
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

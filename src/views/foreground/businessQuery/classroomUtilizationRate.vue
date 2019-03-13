<template>
  <div class="payment-refund-overview">
    <div class="select-tools">
      <div>
        <div>
          <Calendar :is-week="false" size="small" @fetchData="val => times = val"/>
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
          <el-select v-model="select.denominatorType">
            <el-option label="春季/秋季" value="1"/>
            <el-option label="暑期/寒假" value="2"/>
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
      <el-row v-loading="loading" :gutter="22">
        <el-col :xs="24" :sm="24" :lg="8">
          <div class="chart-wrapper">
            <pie-chart :chart-data="pieChart.classRoom" title="教室利用率"/>
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="8">
          <div class="chart-wrapper">
            <pie-chart :chart-data="pieChart.class" title="班级利用率"/>
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="8">
          <div class="chart-wrapper">
            <pie-chart :chart-data="pieChart.count" title="教室数"/>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import tables from '@/mixin/tables'
import PieChart from '@/views/dashboard/components/PieChart'
import Calendar from '@/views/foreground/signManagement/components/Calendar'
import { getClassroomUtilizationRatio } from '@/api/foreground'
export default {
  name: 'PaymentRefundOverview',
  components: {
    PieChart,
    Calendar
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
        denominatorType: '1'
      },
      pieChart: {
        classRoom: [],
        class: [],
        count: []
      }
    }
  },
  computed: {
    ...mapGetters(['constant'])
  },
  watch: {
    times: {
      deep: true,
      handler() {
        const [startDate = '', endDate = ''] = this.times
        this.select.startDate = new Date(startDate)
        this.select.endDate = new Date(endDate)
      }
    }
  },
  created() {
    this.$store.dispatch('getConstant', 'campus')
    this.$nextTick(() => {
      this.fetchData()
    })
  },
  methods: {
    fetchData() {
      this.BFD(getClassroomUtilizationRatio({
        ...this.select
      }).then(res => {
        const { listClassroomUtilizationRatio, listClassUtilizationRatio, listClassroomNum } = res.data
        this.pieChart.classRoom = listClassroomUtilizationRatio
        this.pieChart.class = listClassUtilizationRatio
        this.pieChart.count = listClassroomNum
      }))
    }
  }
}
</script>

<style lang="scss" scoped>
.payment-refund-overview {
  &-charts {
    padding: 100px 0;
  }
}
</style>

<template>
  <div class="estimate-comfirm-box">
    <div class="select-tools">
      <div>
        <div>
          <el-cascader
            :options="constant.campus"
            v-model="select.campus"
            :props="{label: 'name', value:'id'}"
            placeholder="校区"
            change-on-select
            @change="val => getLastVal(val, 'campusId')"
          />
        </div>
        <div>
          <el-select v-model="select.particularYear" clearable placeholder="年度">
            <el-option
              v-for="item in constant.particular_year"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div>
          <el-select v-model="select.season" clearable placeholder="季节">
            <el-option
              v-for="item in constant.season"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
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
      </div>
      <div class="btn">
        <div>
          <el-button type="primary" icon="el-icon-search" @click="fetchData('search')">搜索</el-button>
        </div>
        <div>
          <el-button icon="el-icon-refresh" @click="resetSearch">重置搜索条件</el-button>
        </div>
        <div>
          <el-button type="primary" icon="el-icon-download">导出</el-button>
        </div>
      </div>
    </div>
    <div class="estimate-chart">
      <EstimateChart :chart-data="dataList"/>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import tables from '@/mixin/tables'
import EstimateChart from './EstimateChart'
import { getPredictIncomeConfirmList } from '@/api/finance/financeConfirm'
export default {
  components: {
    EstimateChart
  },
  mixins: [tables],
  data() {
    return {
      select: {
        campus: [],
        particularYear: '',
        season: '',
        grade: '',
        subject: ''
      },
      dataList: {}
    }
  },
  computed: {
    ...mapGetters(['constant'])
  },
  created() {
    this.$store.dispatch('getConstant', ['particular_year', 'campus', 'season', 'grade', 'subject', 'project_type', 'class_type'])
    this.fetchData()
  },
  methods: {
    fetchData() {
      const { campus } = this.select
      const params = {
        ...this.select,
        campusId: campus[campus.length - 1] || ''
      }
      delete params.campus
      getPredictIncomeConfirmList(params).then(({ data }) => {
        this.dataList = data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.estimate-comfirm-box{
  .estimate-chart{
    width: 100%;
  }
}
</style>

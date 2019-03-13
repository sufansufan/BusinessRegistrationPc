<template>
  <div>
    <div class="select-tools">
      <div>
        <div>
          <el-select v-model="select.particularYearForIdentity" placeholder="年份" clearable>
            <el-option
              v-for="item in constant.particular_year"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div>
          <el-select v-model="select.seasonForIdentity" placeholder="季节" clearable>
            <el-option
              v-for="item in constant.season"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div>
          <el-cascader
            :options="constant.campus"
            v-model="select.adminOrganIds"
            :props="campusProps"
            placeholder="校区"
            change-on-select
            clearable/>
        </div>
      </div>
      <div class="btn">
        <div>
          <el-button type="primary" icon="el-icon-search" @click="fetchData">搜索</el-button>
        </div>
        <div>
          <el-button icon="el-icon-refresh" @click="resetSearch">重置搜索条件</el-button>
        </div>
        <div>
          <el-button type="primary" icon="el-icon-download">导出</el-button>
        </div>
      </div>
    </div>
    <comm-table v-loading="loading" :data="dataList" :columns="columns" :count="count">
      <template slot-scope="{row}">
        <div>
          <el-button type="text" @click="exportData(row.id)">导出</el-button>
        </div>
      </template>
    </comm-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import tables from '@/mixin/tables'
import { findThreeRateAnalysisForAdminOrgan } from '@/api/subject/tcgAnalysis'
export default {
  name: 'Campus',
  mixins: [tables],
  data() {
    return {
      select: {
        adminOrganIds: [],
        particularYearForIdentity: '',
        seasonForIdentity: ''
      },
      dataList: [],
      campusProps: {
        value: 'id',
        label: 'name'
      },
      columns: [
        { label: '大区', prop: 'name' },
        { label: '城市', prop: 'no' },
        { label: '校区', prop: 'mobile' },
        { label: '年份', prop: 'particularYearName' },
        { label: '季节', prop: 'seasonName' },
        { label: '续班率', prop: 'continuedClassRate' },
        { label: '满班率', prop: 'fullRate' },
        { label: '退费率', prop: 'refundRate' },
        { label: '操作', prop: 'operation', fixed: 'right' }
      ]
    }
  },
  computed: {
    ...mapGetters(['constant'])
  },
  created() {
    this.$store.dispatch('getConstant', ['campus', 'season', 'particular_year']).then(() => {
      this.fetchData()
    })
  },
  methods: {
    fetchData() {
      const { adminOrganIds } = this.select
      const params = {
        page: this.page,
        limit: this.limit,
        ...this.select
      }
      params.adminOrganIds = adminOrganIds[adminOrganIds.length - 1]
      this.BFD(findThreeRateAnalysisForAdminOrgan(params).then(({ data }) => {
        const { count, list } = data
        this.count = count
        this.dataList = list
      }))
    }

  },
  // 导出单行数据
  exportData(id) {
    return
  }
}
</script>

<style scoped>

</style>

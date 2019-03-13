<template>
  <div>
    <div class="select-tools">
      <div>
        <div>
        <el-input v-model="select.nameAndMobile" placeholder="姓名/手机号" clearable /></div>
        <div>
          <el-cascader
            :options="constant.campus"
            v-model="select.adminOrganIds"
            :props="campusProps"
            placeholder="校区"
            change-on-select
            clearable/>
        </div>
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
import { findThreeRateAnalysisForTeacher } from '@/api/subject/tcgAnalysis'
import { validateNumber } from '@/utils/validate'
export default {
  name: 'Teacher',
  mixins: [tables],
  data() {
    return {
      select: {
        adminOrganIds: [],
        teacherName: '',
        teacherMobile: '',
        particularYearForIdentity: '',
        seasonForIdentity: '',
        nameAndMobile: ''
      },
      dataList: [],
      campusProps: {
        value: 'id',
        label: 'name'
      },
      columns: [
        { label: '教师姓名', prop: 'name' },
        { label: '工号', prop: 'no' },
        { label: '手机号', prop: 'mobile' },
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
    ...mapGetters(['constant']),
    lastRoute() {
      return this.$route.matched.length > 3
    }
  },
  created() {
    this.$store.dispatch('getConstant', ['campus', 'season', 'particular_year']).then(() => {
      this.fetchData()
    })
  },
  methods: {
    fetchData() {
      const { adminOrganIds, nameAndMobile } = this.select
      const params = {
        page: this.page,
        limit: this.limit,
        ...this.select
      }
      validateNumber(nameAndMobile) ? params.teacherMobile = nameAndMobile : params.teacherName = nameAndMobile
      params.adminOrganIds = adminOrganIds[adminOrganIds.length - 1]
      delete params.nameAndMobile
      this.BFD(findThreeRateAnalysisForTeacher(params).then(({ data }) => {
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

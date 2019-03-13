<template>
  <div class="finance-analysis">
    <div class="select-tools">
      <div>
        <div>
          <el-select v-model="select.year" clearable placeholder="年度">
            <el-option
              v-for="item in constant.particular_year"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
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

      </div>
      <div class="select-btn">
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
    <comm-table :data="dataList" :columns="columns" :count="count"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import tables from '@/mixin/tables'
import { getFinanceAnalysisList } from '@/api/finance/financeAnalysis'
export default {
  name: 'FinanceAnalysis',
  mixins: [tables],
  data() {
    return {
      select: {
        year: '',
        campus: []
      },
      dataList: [{
        type: '最大预收'
      },
      {
        type: '订单预收'
      },
      {
        type: '实际到帐'
      },
      {
        type: '折扣折让'
      },
      {
        type: '欠费金额'
      },
      {
        type: '确认收入'
      },
      {
        type: '未确认收入'
      },
      {
        type: '退费金额'
      },
      {
        type: '预收余额'
      }],
      columns: [
        { label: '', prop: 'type', fixed: 'left', width: '150' }
      ]
    }
  },
  computed: {
    ...mapGetters(['constant'])
  },
  created() {
    this.$store.dispatch('getConstant', ['particular_year', 'campus'])
    this.fetchData()
  },
  methods: {
    fetchData() {
      const { campus } = this.select
      const params = {
        ...this.select,
        campusId: campus[campus.length - 1]
      }
      this.BFD(getFinanceAnalysisList({ ...params }).then(({ data: { list, count }}) => {
        const monthList = list
        monthList.map((item, index) => {
          this.columns.push({ label: item.date, render(h) {
            return h('div', item.maxPrice)
          } })
        })
      }))
    }
  }
}
</script>

<style scoped>

</style>

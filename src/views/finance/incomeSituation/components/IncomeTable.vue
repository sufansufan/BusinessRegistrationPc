<template>
  <div class="income-table-box">
    <div class="select-tools">
      <div>
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
          <el-select v-model="select.periods" clearable placeholder="期别">
            <el-option
              v-for="item in constant.periods"
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
        <div>
          <el-select v-model="select.projectType" clearable placeholder="类别">
            <el-option
              v-for="item in constant.project_type"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div>
          <el-select v-model="select.classType" clearable placeholder="班型">
            <el-option
              v-for="item in constant.class_type"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div>
          <el-select v-model="select.department" clearable placeholder="学部">
            <el-option
              v-for="item in constant.department_type"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div>
          <el-date-picker
            v-model="select.times"
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
            v-model="select.campus"
            :props="{label: 'name', value:'id'}"
            placeholder="校区"
            change-on-select
            @change="val => getLastVal(val, 'campusId')"
          />
        </div>
        <div>
          <el-input v-model="select.className" placeholder="班级名称" style="width: 350px"/>
        </div>
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
    <comm-table :data="dataList" :columns="columns" :count="count">
      <template slot-scope="{row}">
        <div>
          <el-button type="text" @click="openDialog(row.id, row.updateDate)">导出</el-button>
        </div>
      </template>
    </comm-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import tables from '@/mixin/tables'
import { getIncomeListByCity, getIncomeListByCampus } from '@/api/finance/incomeSituation'
export default {
  mixins: [tables],
  props: {
    isCampus: {
      default: false,
      type: Boolean
    }
  },
  data() {
    return {
      select: {
        campus: [],
        className: '',
        particularYear: '',
        season: '',
        periods: '',
        grade: '',
        subject: '',
        projectType: '',
        classType: '',
        department: '',
        startDate: '',
        endDate: '',
        times: []
      },

      dataList: [],
      columns: [
        { label: '大区', prop: 'region', width: 95 },
        { label: '市', prop: 'city' },
        { label: '总收入', prop: 'totalIncome', type: 'num', pre: '￥', width: '130' },
        { label: '课程收入', prop: 'courseIncome', type: 'num', pre: '￥', width: '130' },
        { label: '其他收费', prop: 'otherIncome', type: 'num', pre: '￥', width: '130' },
        { label: '课程退费', prop: 'courseRefund', type: 'num', pre: '￥', width: '130' },
        { label: '其他退费', prop: 'otherRefund', type: 'num', pre: '￥', width: '130' },
        { label: '报名总人数', prop: 'enrollPerson', type: 'num', width: '130' },
        { label: '报名总人次', prop: 'enrollPersonTime', type: 'num', width: '130' },
        { label: '退费总人数', prop: 'returnsPerson', type: 'num', width: 130 },
        { label: '退费总人次', prop: 'returnsPersonTime', type: 'num', width: '130' },
        { label: '手续费', prop: 'serviceCharge', type: 'num', pre: '￥' },
        { label: '财务收入', prop: 'financeIncome', type: 'num', pre: '￥' },
        { label: '操作', prop: 'operation', fixed: 'right' }
      ]
    }
  },
  computed: {
    ...mapGetters(['constant'])
  },
  created() {
    this.$store.dispatch('getConstant', ['particular_year', 'campus', 'season', 'periods', 'grade', 'subject', 'timeslot_type', 'project_type', 'class_type', 'week_day_type', 'department_type'])
    if (this.isCampus) {
      this.columns.splice(2, 0, { label: '校区', prop: 'campusName' })
    }
    this.fetchData()
  },
  methods: {
    fetchData(type) {
      if (type === 'search') this.page = 1
      const { campus, times } = this.select
      const params = {
        Loading: true,
        ...this.select,
        campusId: campus[campus.length - 1 ],
        startDate: times[0],
        endDate: times[1],
        page: this.page,
        limit: this.limit
      }
      delete params.campus
      delete params.times
      this.BFD(this.isCampus ? getIncomeListByCampus({ ...params }).then(({ data: { list, count, findTotalMap }}) => {
        this.dataList = list
        this.count = count
        this.$emit('getAllAmount', findTotalMap)
      }) : getIncomeListByCity({
        ...params
      }).then(({ data: { list, count, findTotalMap }}) => {
        this.dataList = list
        this.count = count
        this.$emit('getAllAmount', findTotalMap)
      }))
    }
  }
}
</script>

<style scoped>

</style>

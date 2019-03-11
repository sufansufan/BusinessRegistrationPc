<template>
  <div class="finance-confirm-table">
    <div class="select-tools">
      <div>
        <div>
          <el-date-picker
            v-model="select.month"
            type="month"
            placeholder="选择月"/>
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
import { getIncomeConfirmListByCity, getIncomeConfirmListByCampus } from '@/api/finance/financeConfirm'
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
        particularYear: '',
        date: '',
        season: '',
        grade: '',
        subject: '',
        projectType: '',
        classType: ''
      },
      dataList: [],
      columns: [
        { label: '大区', prop: 'region', width: 95 },
        { label: '市', prop: 'city' },
        { label: '总收入', prop: 'totalIncome', type: 'num', pre: '￥', width: '130' },
        { label: '课程收入', prop: 'courseIncome', type: 'num', pre: '￥', width: '130' },
        { label: '其他收费', prop: 'otherIncome', type: 'num', pre: '￥', width: '130' },
        { label: '转入金额', prop: 'courseRefund', type: 'num', pre: '￥', width: '130' },
        { label: '转出金额', prop: 'otherRefund', type: 'num', pre: '￥', width: '130' },
        { label: '课程确认收入', prop: 'enrollPerson', type: 'num', pre: '￥', width: '130' },
        { label: '其他确认收入', prop: 'enrollPersonTime', type: 'num', pre: '￥', width: '130' },
        { label: '课程退费', prop: 'returnsPerson', type: 'num', pre: '￥', width: 130 },
        { label: '其他退费', prop: 'returnsPersonTime', type: 'num', pre: '￥', width: '130' },
        { label: '未确认收入', prop: 'serviceCharge', type: 'num', pre: '￥', width: '130' },
        { label: '班级数', prop: 'financeIncome', type: 'num' },
        { label: '授课人次', prop: 'financeIncome', type: 'num' },
        { label: '签到', prop: 'financeIncome', type: 'num' },
        { label: '迟到', prop: 'financeIncome', type: 'num' },
        { label: '补签', prop: 'financeIncome', type: 'num' },
        { label: '操作', prop: 'operation', fixed: 'right' }
      ]
    }
  },
  computed: {
    ...mapGetters(['constant'])
  },
  created() {
    this.$store.dispatch('getConstant', ['particular_year', 'campus', 'season', 'grade', 'subject', 'project_type', 'class_type'])
    if (this.isCampus) {
      this.columns.splice(2, 0, { label: '校区', prop: 'campusName' })
    }
    this.fetchData()
  },
  methods: {
    fetchData(type) {
      if (type === 'search') this.page = 1
      const { campus } = this.select
      const params = {
        Loading: true,
        ...this.select,
        campusId: campus[campus.length - 1 ],
        page: this.page,
        limit: this.limit
      }
      delete params.campus
      delete params.times
      this.BFD(this.isCampus ? getIncomeConfirmListByCampus({ ...params }).then(({ data: { list, count, findTotalMap }}) => {
        this.dataList = list
        this.count = count
        this.$emit('getAllAmount', findTotalMap)
      }) : getIncomeConfirmListByCity({
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

<style lang="scss" scoped>
</style>

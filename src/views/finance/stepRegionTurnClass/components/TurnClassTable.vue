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
            v-model="select.oldCampus"
            :props="{label: 'name', value:'id'}"
            placeholder="原班校区"
            change-on-select
            @change="val => getLastVal(val, 'campusId')"
          />
        </div>
        <div>
          <el-cascader
            :options="constant.campus"
            v-model="select.newCampus"
            :props="{label: 'name', value:'id'}"
            placeholder="目标校区"
            change-on-select
            @change="val => getLastVal(val, 'campusId')"
          />
        </div>
        <div>
          <el-input v-model="select.oldClassName" placeholder="原班班级名称" style="width: 395px"/>
        </div>
        <div>
          <el-input v-model="select.newClassName" placeholder="目标班级名称" style="width: 395px"/>
        </div>
        <div>
          <el-select v-model="select.oldFinanceBody" clearable placeholder="原班财务主体">
            <el-option
              v-for="item in constant.class_type"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div>
          <el-select v-model="select.newFinanceBody" clearable placeholder="目标财务主体">
            <el-option
              v-for="item in constant.class_type"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div>
          <el-input v-model="select.student" placeholder="学员姓名/联系电话" style="width: 350px"/>
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
    <comm-table :data="dataList" :columns="columns" :count="count"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import tables from '@/mixin/tables'
import { getTurnList } from '@/api/finance/stepRegionTurnClass'
import { parseTime } from '@/utils'
export default {
  mixins: [tables],
  props: {
    isStep: {
      default: false,
      type: Boolean
    }
  },
  data() {
    return {
      select: {
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
        oldCampusId: '',
        newCampusId: '',
        oldClassName: '',
        newClassName: '',
        oldFinanceBody: '',
        newFinanceBody: '',
        student: '',
        times: [],
        oldCampus: [],
        newCampus: []
      },

      dataList: [],
      columns: [
        { label: '发起时间',
          prop: 'createDate',
          width: '150',
          render: (h, row) => {
            return h('div', parseTime(row.createDate, 'y-m-d'))
          }
        },
        { label: '校区', prop: 'oldCampus', width: '180' },
        { label: '财务主体', prop: 'oldFinanceBody', width: '150' },
        { label: '班级名称', prop: 'oldClassName', width: '300' },
        { label: '期别', prop: 'oldPeriods' },
        { label: '学员姓名', prop: 'studentName' },
        { label: '联系电话', prop: 'mobile', width: '100' },
        { label: '转出课次数', prop: 'classSequence', type: 'num', width: '130' },
        { label: '转出金额', prop: 'price', width: '130' },
        { label: '目标校区', prop: 'newCampus', width: '150' },
        { label: '目标财务主体', prop: 'newFinanceBody', width: '150' },
        { label: '目标班级', prop: 'newClassName', width: '300' },
        { label: '目标期别', prop: 'newPeriods' }
      ]
    }
  },
  computed: {
    ...mapGetters(['constant'])
  },
  created() {
    this.$store.dispatch('getConstant', ['particular_year', 'campus', 'season', 'periods', 'grade', 'subject', 'timeslot_type', 'project_type', 'class_type', 'week_day_type', 'department_type'])
    this.fetchData()
  },
  methods: {
    fetchData(type) {
      if (type === 'search') this.page = 1
      const { oldCampus, newCampus, times } = this.select
      const params = {
        Loading: true,
        ...this.select,
        oldCampusId: oldCampus[oldCampus.length - 1 ],
        newCampusId: newCampus[newCampus.length - 1],
        startDate: times[0],
        endDate: times[1],
        flag: this.isStep ? 2 : 1,
        page: this.page,
        limit: this.limit
      }
      delete params.oldCampus
      delete params.newCampus
      delete params.times
      this.BFD(getTurnList({ ...params }).then(({ data: { list, count }}) => {
        this.dataList = list
        this.count = count
      }))
    }
  }
}
</script>

<style scoped>

</style>

<template>
  <div class="tabs-course-enrolment">
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
          <el-input v-model="select.className" placeholder="班级名称"/>
        </div>
        <div>
          <el-input v-model="select.posNumber" placeholder="POS流水号"/>
        </div>
        <div>
          <el-input v-model="select.orderno" placeholder="订单ID"/>
        </div>
        <div>
          <el-input v-model="select.studentNameAndPhone" placeholder="学员姓名/手机号"/>
        </div>
        <div>
          <el-input v-model="select.teacherName" placeholder="老师姓名"/>
        </div>
        <div>
          <el-input v-model="select.chargeItemName" placeholder="收费内容"/>
        </div>
        <div>
          <el-select v-model="select.financeId" clearable placeholder="财务主体">
            <el-option
              v-for="item in financeList"
              :key="item.id"
              :label="item.financeName"
              :value="item.id"
            />
          </el-select>
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
    <comm-table
      :data="dataList"
      :columns="columns"
      :count="count"
      :page-slot="'合计金额 ￥' + allAmount"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import tables from '@/mixin/tables'
import { findOrderList } from '@/api/foreground/businessQuery'
import { parseTime } from '@/utils'
export default {
  mixins: [tables],
  props: {
    financeList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      times: [],
      campus: [],
      select: {
        operationType: 1,
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
        campusId: '',
        className: '',
        posNumber: '',
        orderno: '',
        financeId: '',
        studentNameAndPhone: '',
        teacherName: '',
        chargeItemName: ''
      },
      dataList: [],
      columns: [
        { label: '时间', prop: 'updateDate', width: 95 },
        { label: '支付ID', prop: 'paymentNo' },
        { label: '校区', prop: 'campusName' },
        { label: '财务主体', prop: 'financeName' },
        { label: '学员姓名', prop: 'studentName' },
        { label: '联系电话', prop: 'mobile', width: 100 },
        { label: '老师姓名', prop: 'teacherName' },
        { label: '期别', prop: 'periods', suf: '期' },
        { label: '支付/购课/总课次', prop: ['paymentAttandClass', 'buyAttandClass', 'attandClassCount'], type: 'num', width: 130 },
        { label: '当前校区/班级', prop: ['currentCampusName', 'currentClassName'], width: 250 },
        { label: '折扣', prop: 'discount', type: 'num' },
        { label: '立减', prop: 'subtractAmount', type: 'num' },
        { label: '应付金额', prop: 'price', type: 'num', pre: '￥', width: 130 },
        { label: '实付金额', prop: 'realPayment', type: 'num', pre: '￥', width: 130 },
        { label: 'POS流水号', prop: 'posNumber', width: 130 },
        { label: '操作人', prop: 'updateByName' }
      ],
      allAmount: 0
    }
  },
  computed: {
    ...mapGetters(['constant'])
  },
  created() {
    this.$store.dispatch('getConstant', ['particular_year', 'campus', 'season', 'periods', 'grade', 'subject', 'timeslot_type', 'project_type', 'class_type', 'week_day_type', 'department_type']).then(() => {
      this.fetchData()
    })
  },
  methods: {
    fetchData(type) {
      if (type === 'search') this.page = 1
      this.BFD(findOrderList({
        page: this.page,
        limit: this.limit,
        ...this.select
      }).then(res => {
        const { count, allAmount, list } = res.data
        this.count = count
        this.allAmount = allAmount
        this.dataList = list.map(item => {
          item.updateDate = parseTime(item.updateDate)
          return item
        })
      }))
    }
  }
}
</script>

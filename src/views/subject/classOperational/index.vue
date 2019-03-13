/**
* Author: DanSmile
* Date: 2019/3/8
* Time: 16:12
*/
<template>
  <div class="class-operational-box">
    <div class="arrow-list-box">
      <div v-for="item in allAmount" :key="item.id">
        <h5>{{ item.name }}</h5>
        <span class="price-font act-color" style="font-size: 18px">{{ item.value }}</span>
      </div>
    </div>
    <div class="select-tools">
      <div>
        <div>
          <el-select v-model="select.particularYearForIdentity" placeholder="年度">
            <el-option
              v-for="item in constant.particular_year"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div>
          <el-select v-model="select.seasonForIdentity" placeholder="季节">
            <el-option
              v-for="item in constant.season"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div>
          <el-select v-model="select.periodsForIdentity" placeholder="期别">
            <el-option
              v-for="item in constant.periods"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div>
          <el-select v-model="select.gradeForIdentity" placeholder="年级">
            <el-option
              v-for="item in constant.grade"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div>
          <el-select v-model="select.subjectForIdentity" placeholder="科目">
            <el-option
              v-for="item in constant.subject"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div>
          <el-select v-model="select.projectTypeForIdentity" placeholder="类别">
            <el-option
              v-for="item in constant.project_type"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div>
          <el-select v-model="select.classTypeForIdentity" placeholder="班型">
            <el-option
              v-for="item in constant.class_type"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div>
          <el-select v-model="select.department" placeholder="学部">
            <el-option
              v-for="item in constant.department_type"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div>
          <el-input
            v-model="select.teacherName"
            placeholder="老师姓名"
            @keyup.enter.native="fetchData('search')"
          />
        </div>
        <div>
          <el-input
            v-model="select.className"
            placeholder="班级名称"
            @keyup.enter.native="fetchData('search')"
          />
        </div>
        <div>
          <el-cascader
            :options="constant.campus"
            v-model="select.parentId"
            :props="{label: 'name', value:'id'}"
            placeholder="校区"
            change-on-select
          />
        </div>
        <div class="checkbox-list">
          <el-checkbox-group v-model="select.classWeekDay" class="week-list">
            <el-checkbox
              v-for="week in constant.week_day_type"
              :key="week.id"
              :label="week.value"
            >{{ week.label }}</el-checkbox>
          </el-checkbox-group>
          <el-checkbox-group v-model="select.timeslotType" class="time-list">
            <el-checkbox
              v-for="time in constant.timeslot_type"
              :key="time.id"
              :label="time.value"
            >{{ time.label }}</el-checkbox>
          </el-checkbox-group>
        </div>
        <div class="inline">
          <el-button type="primary" icon="el-icon-search" @click="fetchData('search')">搜索</el-button>
          <el-button icon="el-icon-refresh" @click="resetSearch">重置搜索条件</el-button>
          <el-button type="primary" icon="el-icon-download">导出</el-button>
        </div>
      </div>
    </div>
    <comm-table v-loading="loading" :data="dataList" :columns="columns" :count="count"/>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import tables from '@/mixin/tables'
import CommTable from '@/views/components/CommTable'
import { getClassOperationalList } from '@/api/subject/classOperational'
export default {
  name: 'StudentOperational',
  components: {
    CommTable
  },
  mixins: [tables],
  data() {
    return {
      select: {
        particularYearForIdentity: '',
        adminOrganIds: [],
        seasonForIdentity: '',
        teacherName: '',
        periodsForIdentity: '',
        className: '',
        department: '',
        gradeForIdentity: '',
        subjectForIdentity: '',
        timeslotType: [],
        projectTypeForIdentity: '',
        classTypeForIdentity: '',
        classWeekDay: []
      },
      columns: [
        { label: '年份', prop: 'particularYearName', type: 'num' },
        { label: '季节', prop: 'seasonName' },
        { label: '城市', prop: 'cityName', width: '200' },
        { label: '校区', prop: 'adminOrganName' },
        { label: '类别', prop: 'projectTypeName' },
        { label: '学部', prop: 'departmentName' },
        { label: '年级', prop: 'gradeName' },
        { label: '科目', prop: 'subjectName' },
        { label: '班型', prop: 'classTypeName', width: '100' },
        { label: '班级补充名称', prop: 'classSupplementName', width: '110' },
        { label: '班级名称', prop: 'className', width: '250' },
        { label: '教室', prop: 'classroomNo' },
        { label: '老师', prop: 'teacherName' },
        { label: '时间安排规律', prop: 'dateslotName', width: '110' },
        { label: '重复周期', prop: 'classWeekDayName', width: '250' },
        { label: '上课时间', prop: 'startTime' },
        { label: '下课时间', prop: 'endTime' },
        { label: '课时', prop: 'hours', type: 'num' },
        { label: '总课次', prop: 'className', width: '250' },
        { label: '价格', prop: 'totalTimes', type: 'num' },
        { label: '限额', prop: 'maxStudentsNum', type: 'num' },
        { label: '报名人数', prop: 'signupNum', type: 'num' },
        { label: '缴费人数', prop: 'payNum', type: 'num' },
        { label: '转入人数', prop: 'turnInNum', type: 'num' },
        { label: '转出人数', prop: 'turnOutNum', type: 'num' },
        { label: '剩余名额', prop: 'leftNum', type: 'num' },
        { label: '满班率', prop: 'fullRate' },
        { label: '续下期人数', prop: 'continuedClassCount', width: '100', type: 'num' },
        { label: '续报率', prop: 'continuedClassRate' },
        { label: '课前退费人数', prop: 'beforeClassRefundNumber', width: '110', type: 'num' },
        { label: '课中退费人数', prop: 'inClassRefundNumber', width: '110', type: 'num' },
        { label: '课中退费率', prop: 'inClassRefundRate', width: '100' },
        { label: '总退费率', prop: 'refundRate' }
      ],
      allAmount: {},
      campusProps: {
        value: 'id',
        label: 'name'
      },
      dataList: [
        { classSequence: '3213' }
      ]
    }
  },
  computed: {
    ...mapGetters(['constant'])
  },
  created() {
    this.$store.dispatch('getConstant', ['particular_year', 'campus', 'season', 'periods', 'grade', 'subject', 'timeslot_type', 'project_type', 'class_type', 'week_day_type', 'department_type']).then(() => { })
    this.fetchData()
  },
  methods: {
    fetchData(type) {
      if (type === 'search') this.page = 1
      const { adminOrganIds, timeslotType, classWeekDay } = JSON.parse(JSON.stringify(this.select))
      const params = {
        page: this.page,
        limit: this.limit,
        ...this.select,
        adminOrganIds: adminOrganIds.length ? adminOrganIds.pop() : '',
        timeslotType: timeslotType.length ? timeslotType.join(',') : '',
        classWeekDay: classWeekDay.length ? classWeekDay.join(',') : ''
      }
      this.BFD(getClassOperationalList(params).then(res => {
        const { count, list, totalCount } = res.data
        this.count = count
        this.allAmount = totalCount
        this.dataList = list
      }))
    }
  }
}
</script>

<style lang="scss" scoped>
.class-operational-box {
  .arrow-list-box {
    margin-bottom: 10px;
  }
}
</style>

<template>
  <div class="class-query-box">
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
          <el-select v-model="select.value" placeholder="学部">
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
            placeholder="班级姓名"
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
          <div class="class-list">
            <el-checkbox v-model="select.whetherShowHadEndClass" label="已结课班级"/>
            <el-checkbox v-model="select.whetherOnlyShowNotFullClass" label="仅未满班级"/>
          </div>
        </div>
        <div class="inline">
          <el-button type="primary" icon="el-icon-search" @click="fetchData('search')">搜索</el-button>
          <el-button @click="resetSearch">重置搜索条件</el-button>
          <el-button v-if="isExport" type="primary" icon="el-icon-download">导出</el-button>
        </div>
      </div>
    </div>
    <comm-table v-loading="loading" :data="dataList" :columns="columns" :count="count">
      <div slot-scope="{row}">
        <el-button
          :disabled="whetherInSelectedClass(row.id)"
          type="text"
          @click="e => apply(e, row)"
        >报名</el-button>
      </div>
    </comm-table>
    <template v-if="isApply">
      <course-cart :list="courseCart"/>
      <car-ball ref="carBall"/>
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import tables from '@/mixin/tables'
import CommTable from '@/views/components/CommTable'
import CourseCart from './CourseCart'
import CarBall from '@/views/components/CarBall'
import { getClassList } from '@/api/backstage/courseManagement'
export default {
  name: 'ClassQuery',
  inject: ['sid'],
  components: {
    CommTable,
    CourseCart,
    CarBall
  },
  mixins: [tables],
  props: {
    isApply: {
      type: Boolean,
      default: true
    },
    isExport: {
      type: Boolean,
      default: false
    },
    columns: {
      type: Array,
      default: () => [
        { label: '校区', prop: 'adminOrganName' },
        { label: '班级名称', prop: 'className', width: 250 },
        { label: '期别', prop: 'periodsName' },
        { label: '校区', prop: 'teacherName' },
        { label: '老师', prop: 'adminOrganName' },
        { label: '重复周期', prop: 'classWeekDayName', width: 80 },
        { label: '教室', prop: 'classroomName' },
        { label: '价格', prop: 'totalPrice', type: 'num', pre: '￥', width: 100 },
        { label: '课次剩余', prop: 'leftTimes' },
        { label: '招生情况', prop: ['signupNum', 'maxStudentsNum'] },
        { label: '时段', prop: 'timeslotName', width: 120 },
        { label: '上课日期', prop: 'startClassDate', width: 90 },
        { label: '报名人数', prop: 'signupNum', type: 'num' },
        { label: '缴费人数', prop: 'payNum', type: 'num' },
        { label: '剩余名额', prop: 'leftNum', type: 'num' },
        { label: '候补人数', prop: 'waitNum', type: 'num' },
        { label: '操作', prop: 'operation', fixed: 'right', width: 50 }
      ]
    }
  },
  data() {
    return {
      select: {
        particularYearForIdentity: '',
        adminOrganIds: [],
        seasonForIdentity: '',
        teacherName: '',
        periodsForIdentity: '',
        className: '',
        gradeForIdentity: '',
        subjectForIdentity: '',
        timeslotType: [],
        projectTypeForIdentity: '',
        classTypeForIdentity: '',
        classWeekDay: [],
        whetherShowHadEndClass: false,
        whetherOnlyShowNotFullClass: false
      },
      dataList: [],
      selectedClass: []
    }
  },
  computed: {
    ...mapGetters(['constant', 'courseCart'])
  },
  created() {
    this.$store.dispatch('getConstant', [
      'particular_year',
      'season',
      'periods',
      'grade',
      'subject',
      'project_type',
      'class_type',
      'timeslot_type',
      'department_type',
      'campus',
      'week_day_type'
    ])
    this.fetchData()
    this.$store.dispatch('getCourseCart', { studentId: this.sid })
  },
  methods: {
    apply(e, row) {
      this.$refs.carBall.drop(e.target)
      this.$store.dispatch('addCourseCart', { studentId: this.sid, classId: row.id })
    },
    whetherInSelectedClass(id) {
      return this.courseCart.some(item => item.classId === id)
    },
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
      this.BFD(getClassList(params).then(res => {
        const { count, list } = res.data
        this.count = count
        this.dataList = list
      }))
    }
  }
}
</script>

<style lang="scss">
.class-query-box {
  padding-bottom: 90px;
  .select-tools {
    > div > div {
      margin: 0 10px 10px 0 !important;
      &.checkbox-list {
        display: flex;
        flex-wrap: wrap;
      }
      &.inline {
        padding-left: 5px;
        align-items: center;
      }
      .el-select,
      .el-input {
        width: 184px;
        input {
          &:not(:focus) {
            border: 1px solid #ebebeb;
            background: #f8f8f8 !important;
          }
        }
      }
      .time-list,
      .class-list {
        padding-left: 15px;
        border-right: 1px solid #ebebeb;
        > label:last-child {
          margin: 0;
        }
      }
      .week-list {
        width: 315px;
        border-right: 1px solid #ebebeb;
        > label:nth-child(5) {
          margin: 0;
        }
      }
      .time-list {
        width: 165px;
      }
      .class-list {
        width: 125px;
      }
    }
  }
}
</style>

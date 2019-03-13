/**
* Author: DanSmile
* Date: 2019/3/8
* Time: 16:24
*/
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
import { getStudentOperationalList } from '@/api/subject/studentOperational'
import { strFirstUpper } from '@/utils'
import { sexImg } from '../../../utils'

export default {
  name: 'StudentOperational',
  components: {
    CommTable
  },
  mixins: [tables],
  data() {
    return {
      select: {
        particularYearForIdentity: '', // 年份
        adminOrganIds: [], // 校区
        seasonForIdentity: '', // 季节
        teacherName: '', // 教师名称
        periodsForIdentity: '', // 期别
        className: '', // 班级名称
        gradeForIdentity: '', // 年级
        subjectForIdentity: '', // 科目
        timeslotType: [], // 时间段
        projectTypeForIdentity: '', // 类别
        classTypeForIdentity: '', // 班型
        classWeekDay: [], // 周期
        department: '' // 学部
      },
      columns: [
        { label: '学员编号', prop: 'studentNo' },
        { label: '姓名', prop: 'studentName' },
        { label: '性别', prop: 'sexName',
          render: (h, row, index) => {
            return h('img', {
              domProps: {
                src: sexImg(row.sexName === '男')
              }
            })
          }
        },
        { label: '联系方式', prop: 'studentMobile', width: '100' },
        { label: '父亲电话', prop: 'fatherMobile' },
        { label: '母亲电话', prop: 'motherMobile' },
        { label: '就读学校', prop: 'studentSchoolName' },
        { label: '城市', prop: 'cityName', width: '200' },
        { label: '校区', prop: 'studentName' },
        { label: '年份', prop: 'particularYearName' },
        { label: '季节', prop: 'seasonName' },
        { label: '类型', prop: 'studentName' },
        { label: '学部', prop: 'departmentName', width: '100' },
        { label: '年级', prop: 'grade' },
        { label: '科目', prop: 'subjectName' },
        { label: '班型', prop: 'classTypeName', width: '100' },
        { label: '班级补充名称', prop: 'classSupplementName', width: '110' },
        { label: '班级名称', prop: 'className', width: '250' },
        { label: '支付状态', prop: 'paystatusName' },
        { label: '老师', prop: 'teacherName' },
        { label: '时间安排规律', prop: 'dateslotName', width: '110' },
        { label: '重复周期', prop: 'classWeekDayName', width: '250' },
        { label: '上课时间', prop: 'startTime' },
        { label: '下课时间', prop: 'endTime' },
        { label: '课时', prop: 'hours', type: 'num' },
        { label: '新/老生', prop: 'newOrOldStudent' }
      ],
      campusProps: {
        value: 'id',
        label: 'name'
      },
      dataList: []
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
      const { adminOrganIds, timeslotType, classWeekDay } = JSON.parse(JSON.stringify(this.select))
      const params = {
        page: this.page,
        limit: this.limit,
        ...this.select,
        adminOrganIds: adminOrganIds.length ? adminOrganIds.pop() : '',
        timeslotType: timeslotType.length ? timeslotType.join(',') : '',
        classWeekDay: classWeekDay.length ? classWeekDay.join(',') : ''
      }
      this.BFD(getStudentOperationalList(params).then(res => {
        const { particularYearSeason = {}, count, list } = res.data
        if (this.columns.length === 26) {
          this.columns = [...this.columns, ...Object.keys(particularYearSeason).map(key => {
            return {
              width: 100,
              renderHeader: h => {
                return h('div', { class: 'income-title' }, [
                  h('span', particularYearSeason[key])
                ])
              },
              render: (h, row, index) => {
                const column = row
                return column && h('div', { class: 'sequence-box' }, [
                  this.renderStateTag(column['is' + strFirstUpper(key)], true)
                ])
              }
            }
          })]
        }
        this.count = count
        this.dataList = list
      }))
    }
  }
}
</script>

<style scoped>

</style>

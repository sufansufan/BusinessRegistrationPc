<template>
  <div class="sign-record">
    <div class="select-tools">
      <div>
        <div>
          <el-select v-model="select.particularYearForIdentity" clearable placeholder="年度">
            <el-option
              v-for="item in constant.particular_year"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div>
          <el-select v-model="select.seasonForIdentity" clearable placeholder="季节">
            <el-option
              v-for="item in constant.season"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div>
          <el-select v-model="select.periodsForIdentity" clearable placeholder="期别">
            <el-option
              v-for="item in constant.periods"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div>
          <el-select v-model="select.gradeForIdentity" clearable placeholder="年级">
            <el-option
              v-for="item in constant.grade"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div>
          <el-select v-model="select.subjectForIdentity" clearable placeholder="科目">
            <el-option
              v-for="item in constant.subject"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div>
          <el-select v-model="select.projectTypeForIdentity" clearable placeholder="类别">
            <el-option
              v-for="item in constant.project_type"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div>
          <el-select v-model="select.classTypeForIdentity" clearable placeholder="班型">
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
          <el-input
            v-model.trim="select.teacherName"
            clearable
            placeholder="老师姓名"
            style="width: 185px"
          />
        </div>
        <div>
          <el-input
            v-model.trim="select.className"
            clearable
            placeholder="班级名称"
            style="width: 375px"
          />
        </div>
        <div>
          <el-input
            v-model.trim="select.studentNameAndMobile"
            clearable
            placeholder="学员姓名/手机号"
            style="width: 185px"
          />
        </div>
        <div>
          <el-select v-model="select.signUpRecordShowWay" clearable placeholder="查看方式">
            <el-option
              v-for="item in constant.sign_up_record_show_way"
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
            clearable
            placeholder="校区"
            change-on-select
          />
        </div>
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
    <comm-table :data="dataList" :columns="columns" :count="count"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import tables from '@/mixin/tables'
import CommTable from '@/views/components/CommTable'
import { getAttendChangeInfoList } from '@/api/foreground/signManagement'
import { parseTime } from '@/utils'
export default {
  name: 'SignRecord',
  components: {
    CommTable
  },
  mixins: [tables],
  data() {
    return {
      columns: [
        { label: '学员姓名', prop: 'studentName' },
        { label: '学员编号', prop: 'studentNo', width: '100' },
        { label: '联系电话', prop: 'studentMobile' },
        { label: '班级名称', prop: 'className', width: '300' },
        { label: '课次', prop: 'classSequence' },
        { label: '签到状态', prop: 'currentStatusName' },
        // { label: '补签状态', prop: 'gradelable' },
        { label: '补签时间', prop: 'mendRegisterTime' },
        { label: '备注', prop: 'mendRegisterRemark' },
        { label: '操作人', prop: 'aciUpdateByName' },
        { label: '操作时间', prop: 'aciUpdateDate' }
      ],
      select: {
        adminOrganIds: [],
        signUpRecordShowWay: '1',
        teacherName: '',
        studentName: '',
        studentMobile: '',
        particularYearForIdentity: '',
        seasonForIdentity: '',
        periodsForIdentity: '',
        className: '',
        gradeForIdentity: '',
        subjectForIdentity: '',
        projectTypeForIdentity: '',
        classTypeForIdentity: '',
        department: '',
        startTime: '',
        endTime: '',
        studentNameAndMobile: ''
      },
      dataList: [],
      campusProps: {
        value: 'id',
        label: 'name'
      }
    }
  },
  computed: {
    ...mapGetters(['constant'])
  },
  created() {
    this.$store.dispatch('getConstant', ['particular_year', 'campus', 'season', 'periods', 'grade', 'subject', 'timeslot_type', 'project_type', 'class_type', 'week_day_type', 'department_type', 'sign_up_record_show_way']).then(() => {
      this.fetchData()
    })
  },
  methods: {
    fetchData() {
      const { adminOrganIds, studentNameAndMobile } = this.select
      if (!studentNameAndMobile) {
        this.select.studentMobile = ''
        this.select.studentName = ''
      }
      if (/^\d+$/.test(studentNameAndMobile)) {
        this.select.studentMobile = studentNameAndMobile
      } else {
        this.select.studentName = studentNameAndMobile
      }
      const params = {
        limit: this.limit,
        page: this.page,
        ...this.select
      }
      delete params.studentNameAndMobile
      params.adminOrganIds = adminOrganIds[adminOrganIds.length - 1]
      this.BFD(getAttendChangeInfoList(params).then(({ data }) => {
        const { count, list } = data
        this.dataList = list
        this.dataList.map(item => {
          item.mendRegisterTime = parseTime(item.mendRegisterTime, 'y-m-d')
          item.aciUpdateDate = parseTime(item.aciUpdateDate, 'y-m-d')
          return item
        })
        this.count = count
      }))
    }
  }
}
</script>

<style scoped>

</style>

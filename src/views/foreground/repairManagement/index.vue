<template>
  <div class="repair-management-box">
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
          <el-input
            v-model.trim="select.studentNameAndMobile"
            clearable
            placeholder="学员编号"
            style="width: 185px"
          />
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
      v-loading="loading"
      :data="dataList"
      :columns="columns"
      :count="count"
      @multipleSelection="val => multipleSelection = val"
    >
      <div slot-scope="{row}">
        <el-button type="text" @click="delSignupCandidate(row.id)">删除</el-button>
        <el-button
          type="text"
          @click="$router.push({ path: '/foreground/apply/pay/' + row.studentId})"
        >报名</el-button>
      </div>
    </comm-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import tables from '@/mixin/tables'
import { getSignupCandidateList, delSignupCandidate } from '@/api/foreground/repairManagement'
import { parseTime } from '@/utils'
export default {
  name: 'RepairManagement',
  mixins: [tables],
  data() {
    return {
      multipleSelection: [],
      select: {
        studentId: '',
        particularYear: '',
        season: '',
        periods: '',
        grade: '',
        subject: '',
        projectType: '',
        classType: '',
        department: '',
        teacherName: '',
        className: '',
        studentNameAndPhone: '',
        studentNo: ''
      },
      columns: [
        { type: 'selection', fixed: 'left' },
        { label: '学员姓名', prop: 'name' },
        { label: '学员编号', prop: 'no', width: 100 },
        { label: '联系电话', prop: 'mobile', width: 100 },
        { label: '班级名称', prop: 'className', width: 300 },
        { label: '校区', prop: 'campusName' },
        { label: '老师', prop: 'teacherName' },
        { label: '重复周期', prop: 'classWeekDay' },
        { label: '时段', prop: 'timeslotName', width: 100 },
        { label: '教室', prop: 'classRoomName' },
        { label: '价格', prop: 'totalPrice', type: 'num', pre: '￥' },
        { label: '剩余/总课次', prop: ['leftTimes', 'totalTimes'], type: 'num', width: 130 },
        { label: '招生情况', prop: 'signupNum', type: 'num' },
        { label: '缴费人数', prop: 'payNum', type: 'num' },
        { label: '剩余名额', prop: 'leftNum', type: 'num' },
        { label: '候补人数', prop: 'candidateNum', type: 'num' },
        { label: '候补序号', prop: 'candidateNo', type: 'num' },
        { label: '操作人', prop: 'updateName' },
        { label: '操作时间', prop: 'updateDate', width: 150 },
        { label: '操作', prop: 'operation', width: 100, fixed: 'right' }
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
    this.$store.dispatch('getConstant', ['particular_year', 'campus', 'season', 'periods', 'grade', 'subject', 'timeslot_type', 'project_type', 'class_type', 'week_day_type', 'department_type'])
    this.fetchData()
  },
  methods: {
    fetchData(type) {
      if (type === 'search') this.page = 1
      this.BFD(getSignupCandidateList({
        page: this.page,
        limit: this.limit,
        ...this.select
      }).then(res => {
        const { count, list } = res.data
        this.count = count
        this.dataList = list.map(item => {
          item.updateDate = parseTime(item.updateDate)
          return item
        })
      }))
    },
    delSignupCandidate(ids) {
      this.$confirm('此操作将删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delSignupCandidate({
          Loading: true,
          ids
        }).then(() => {
          this.$message.success('删除成功~')
          this.fetchData()
        })
      }).catch(() => { })
    }
  }
}
</script>

<style scoped>
</style>

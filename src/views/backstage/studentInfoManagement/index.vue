<template>
  <div class="student-info-manage">
    <el-tabs v-model="activeName">
      <el-tab-pane label="按所在班级" name="first">
        <student-table ref="class" @uploadData="uploadData">
          <div slot="select">
            <class-select ref="uploadSelect" @selectChange = "selectChange"/>
          </div>
        </student-table>
      </el-tab-pane>
      <el-tab-pane label="按个人属性" name="second">
        <student-table ref="people" @uploadData="uploadData">
          <div slot="select">
            <student-select ref="uploadSelect" @selectChange = "selectChange"/>
          </div>
        </student-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import StudentTable from './components/StudentTable'
import ClassSelect from './components/ClassSelect'
import StudentSelect from './components/StudentSelect'
export default {
  components: {
    StudentTable,
    ClassSelect,
    StudentSelect
  },
  data() {
    return {
      activeName: 'first',
      select: {}
    }
  },

  methods: {
    selectChange(type, select) {
      if (type === 'people') {
        const { date, campusId } = select
        const params = {
          ...select
        }
        params.birthdayStartDate = date[0] || ''
        params.birthdayEndDate = date[0] || ''
        params.campusId = campusId[campusId.length - 1]
        delete params.date
        this.$refs.people.fetchData(params)
      } else {
        const { classWeekDay, dateDivide, campusId } = select
        const params = {
          ...select
        }
        params.classWeekDay = classWeekDay.join(',')
        params.dateDivide = dateDivide.join(',')
        params.campusId = campusId[campusId.length - 1]
        this.$refs.class.fetchData(params)
      }
    },
    uploadData() {
      this.$refs.uploadSelect.fetchData()
    }
  }
}
</script>

<style lang="scss">
.student-info-manage{
  .el-tabs__nav-scroll{
    display: block;
  }
}
</style>

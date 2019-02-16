<template>
  <div class="class-select">
    <div class="select-tools">
      <div>
        <div>
          <el-select v-model="select.particularYear" placeholder="年份">
            <el-option
              v-for="item in constant.particular_year"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div>
          <el-select v-model="select.season" placeholder="季节">
            <el-option
              v-for="item in constant.season"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div>
          <el-select v-model="select.periods" placeholder="期别">
            <el-option
              v-for="item in constant.periods"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div>
          <el-select v-model="select.grade" placeholder="年级">
            <el-option
              v-for="item in constant.grade"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div>
          <el-select v-model="select.subject" placeholder="科目">
            <el-option
              v-for="item in constant.subject"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div>
          <el-select v-model="select.projectType" placeholder="类别">
            <el-option
              v-for="item in constant.project_type"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div>
          <el-select v-model="select.classType" placeholder="班型">
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
          <el-input v-model.trim="select.teacherName" placeholder="老师姓名" style="width: 185px"/>
        </div>
        <div>
          <el-input v-model.trim="select.className" placeholder="班级名称" style="width: 400px"/>
        </div>
        <div class="checkbox-list">
          <el-checkbox-group v-model="select.classWeekDay" class="week-list">
            <el-checkbox label="周一"/>
            <el-checkbox label="周二"/>
            <el-checkbox label="周三"/>
            <el-checkbox label="周四"/>
            <el-checkbox label="周五"/>
            <el-checkbox label="周六"/>
            <el-checkbox label="周日"/>
          </el-checkbox-group>
          <el-checkbox-group v-model="select.dateDivide" class="time-list">
            <el-checkbox label="上午"/>
            <el-checkbox label="下午"/>
            <el-checkbox label="晚上"/>
          </el-checkbox-group>
        </div>
        <div>
          <el-select v-model="select.status" placeholder="状态">
            <el-option :value="true" label="上架"/>
            <el-option :value="false" label="下架"/>
          </el-select>
        </div>
        <div>
          <el-cascader
            :options="constant.campus"
            v-model="select.campusId"
            :props="campusProps"
            placeholder="校区"
            change-on-select
            clearable/>
        </div>
        <div>
          <el-button type="primary" icon="el-icon-search" @click="fetchData">搜索</el-button>
        </div>
        <div>
          <el-button icon="el-icon-refresh">重置搜索条件</el-button>
        </div>
        <div>
          <el-button type="primary" icon="el-icon-download">导出</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      select: {
        userCampusIds: '',
        operationType: 2,
        campusId: [],
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
        classWeekDay: [],
        dateDivide: [],
        status: ''
      },
      campusProps: {
        value: 'id',
        label: 'name'
      }
    }
  },
  computed: {
    ...mapGetters(['userInfo', 'constant'])
  },
  created() {
    this.$store.dispatch('getConstant', ['particular_year', 'campus', 'season', 'periods', 'grade', 'subject', 'project_type', 'class_type', 'department_type'])
    this.select.userCampusIds = this.userInfo.role[0].campusIds
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.$emit('selectChange', 'class', this.select)
    }
  }
}
</script>

<style lang="scss" scoped>
.class-select{
  .select-tools {
    > div > div {
      &.checkbox-list {
        display: flex;
        flex-wrap: wrap;
        margin-top: -2px;
      }
      .time-list, {
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
    }
  }
}

</style>

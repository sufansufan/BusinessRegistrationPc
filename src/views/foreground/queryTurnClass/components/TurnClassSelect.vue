<template>
  <div class="query-turnclass-box">
    <div class="select-tools">
      <div>
        <div class="class-type"/>
        <div>
          <el-date-picker
            v-model="select.date"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"/>
        </div>
      </div>
      <div class="select-btn">
        <div>
          <el-button type="primary" icon="el-icon-search" @click="$emit('fetchData')">搜索</el-button>
        </div>
        <div>
          <el-button icon="el-icon-refresh" @click="resetSearch">重置搜索条件</el-button>
        </div>
        <div>
          <el-button type="primary" icon="el-icon-download">导出</el-button>
        </div>
      </div>
    </div>
    <div class="select-tools">
      <div>
        <div class="class-type">
          <strong>原班</strong>
        </div>
        <div>
          <el-select v-model="select.oldParticularYearForIdentity" clearable placeholder="年度">
            <el-option
              v-for="item in constant.particular_year"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div>
          <el-select v-model="select.oldSeasonForIdentity" clearable placeholder="季节">
            <el-option
              v-for="item in constant.season"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div>
          <el-select v-model="select.oldPeriodsForIdentity" clearable placeholder="期别">
            <el-option
              v-for="item in constant.periods"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div>
          <el-select v-model="select.oldGradeForIdentity" clearable placeholder="年级">
            <el-option
              v-for="item in constant.grade"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div>
          <el-select v-model="select.oldSubjectForIdentity" clearable placeholder="科目">
            <el-option
              v-for="item in constant.subject"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div>
          <el-select v-model="select.oldProjectTypeForIdentity" clearable placeholder="类别">
            <el-option
              v-for="item in constant.project_type"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div>
          <el-select v-model="select.oldClassTypeForIdentity" clearable placeholder="班型">
            <el-option
              v-for="item in constant.class_type"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div>
          <el-input
            v-model.trim="select.oldTeacherName"
            clearable
            placeholder="老师姓名"
            style="width: 170px"
          />
        </div>
        <div class="class-type"/>
        <div>
          <el-input
            v-model.trim="select.oldClassName"
            clearable
            placeholder="班级名称"
            style="width: 375px"
          />
        </div>
        <div>
          <el-cascader
            :options="constant.campus"
            v-model="select.oldAdminOrganIds"
            :props="campusProps"
            clearable
            placeholder="校区"
            change-on-select
          />
        </div>
      </div>
    </div>
    <div class="select-tools">
      <div>
        <div class="class-type">
          <strong>转入班</strong>
        </div>
        <div>
          <el-select v-model="select.newParticularYearForIdentity" clearable placeholder="年度">
            <el-option
              v-for="item in constant.particular_year"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div>
          <el-select v-model="select.newSeasonForIdentity" clearable placeholder="季节">
            <el-option
              v-for="item in constant.season"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div>
          <el-select v-model="select.newPeriodsForIdentity" clearable placeholder="期别">
            <el-option
              v-for="item in constant.periods"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div>
          <el-select v-model="select.newGradeForIdentity" clearable placeholder="年级">
            <el-option
              v-for="item in constant.grade"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div>
          <el-select v-model="select.newSubjectForIdentity" clearable placeholder="科目">
            <el-option
              v-for="item in constant.subject"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div>
          <el-select v-model="select.newProjectTypeForIdentity" clearable placeholder="类别">
            <el-option
              v-for="item in constant.project_type"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div>
          <el-select v-model="select.newClassTypeForIdentity" clearable placeholder="班型">
            <el-option
              v-for="item in constant.class_type"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div>
          <el-input
            v-model.trim="select.newTeacherName"
            clearable
            placeholder="老师姓名"
            style="width: 170px"
          />
        </div>
        <div class="class-type"/>
        <div>
          <el-input
            v-model.trim="select.newClassName"
            clearable
            placeholder="班级名称"
            style="width: 375px"
          />
        </div>
        <div>
          <el-cascader
            :options="constant.campus"
            v-model="select.newAdminOrganIds"
            :props="campusProps"
            clearable
            placeholder="校区"
            change-on-select
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import tables from '@/mixin/tables'
export default {
  mixins: [tables],
  data() {
    return {
      select: {
        date: '',
        startDate: '',
        endDate: '',
        oldParticularYearForIdentity: '',
        oldSeasonForIdentity: '',
        oldPeriodsForIdentity: '',
        oldGradeForIdentity: '',
        oldSubjectForIdentity: '',
        oldProjectTypeForIdentity: '',
        oldClassTypeForIdentity: '',
        oldTeacherName: '',
        oldClassName: '',
        oldAdminOrganIds: [],
        newParticularYearForIdentity: '',
        newSeasonForIdentity: '',
        newPeriodsForIdentity: '',
        newGradeForIdentity: '',
        newSubjectForIdentity: '',
        newProjectTypeForIdentity: '',
        newClassTypeForIdentity: '',
        newTeacherName: '',
        newClassName: '',
        newAdminOrganIds: []
      },
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
    this.$store.dispatch('getConstant', ['particular_year', 'campus', 'season', 'periods', 'grade', 'subject', 'timeslot_type', 'project_type', 'class_type', 'week_day_type', 'department_type'])
  }
}
</script>

<style lang="scss" scoped>
.query-turnclass-box{
  .class-type{
    line-height: 32px;
    width: 50px;
  }
}
</style>
<style lang="scss" >
.query-turnclass-box{
  .el-select{
    width: 180px !important;
  }
}
</style>

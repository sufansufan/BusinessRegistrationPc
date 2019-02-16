<template>
  <div class="class-manage-box">
    <router-view v-if="lastRoute"/>
    <template v-else>
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
              style="width: 385px"
            />
          </div>
          <div class="checkbox-list">
            <el-checkbox-group v-model="select.classWeekDay" class="week-list">
              <el-checkbox
                v-for="item in constant.week_day_type"
                :label="item.value"
                :key="item.id"
              >{{ item.label }}</el-checkbox>
            </el-checkbox-group>
            <el-checkbox-group v-model="select.timeslotType" class="time-list">
              <el-checkbox
                v-for="item in constant.timeslot_type"
                :label="item.value"
                :key="item.value"
              >{{ item.label }}</el-checkbox>
            </el-checkbox-group>
          </div>
          <div>
            <el-select v-model="select.classStatus" clearable placeholder="状态">
              <el-option :value="1" label="上架"/>
              <el-option :value="2" label="下架"/>
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
            <el-button icon="el-icon-refresh">重置搜索条件</el-button>
          </div>
          <div>
            <el-button
              :disabled="isDisabled"
              type="primary"
              icon="el-icon-setting"
              @click="$router.push({name: 'BatchSetting', params: {id: multipleSelection[0].id, data: multipleSelection }})"
            >批量设置</el-button>
          </div>
          <div>
            <el-button
              type="primary"
              icon="el-icon-plus"
              @click="$router.push({name: 'AddClass'})"
            >新增</el-button>
          </div>
          <div>
            <el-button type="primary" icon="el-icon-upload2" @click="batchImport">批量导入</el-button>
          </div>
          <div>
            <el-button type="primary" icon="el-icon-download">导出</el-button>
          </div>
        </div>
      </div>
      <el-table
        :data="dataList"
        loading="loading"
        stripe
        border
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"/>
        <el-table-column prop="adminOrganName" label="校区"/>
        <el-table-column prop="className" label="班级名称" width="250"/>
        <el-table-column prop="periodsName" label="期别"/>
        <el-table-column prop="teacherName" label="老师"/>
        <el-table-column prop="classWeekDayName" label="重复周期" width="200"/>
        <el-table-column prop="classroomName" label="教室" width="90"/>
        <el-table-column prop="timeslotName" label="时段" width="100"/>
        <el-table-column prop="startClassDate" label="上课日期" width="100"/>
        <el-table-column prop="dateslotName" label="时间安排规律" width="150"/>
        <el-table-column prop="totalPrice" label="价格"/>
        <el-table-column label="剩余/总课次" width="120">
          <template slot-scope="scope">
            <div>{{ scope.row.leftTimes }} / {{ scope.row.totalTimes }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="endDate" label="招生情况">
          <template slot-scope="scope">
            <div>{{ scope.row.signupNum }} / {{ scope.row.maxStudentsNum }}</div>
          </template>
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <div v-html="scope.row.statusHtm"/>
          </template>
        </el-table-column>
        <el-table-column prop="updateByName" label="操作人"/>
        <el-table-column label="操作" width="150px" fixed="right">
          <template slot-scope="scope">
            <el-button
              :disabled="!scope.row.whetherEdit"
              type="text"
              @click="$router.push({path: '/backstage/courseManagement/classManagement/edit/' + scope.row.id})"
            >编辑</el-button>
            <el-button
              :disabled="!scope.row.whetherDelete"
              type="text"
              @click="deleteClass(scope.row.id)"
            >删除</el-button>
            <el-button
              type="text"
              @click="modifyStatus(scope.row)"
            >{{ scope.row.status === '1' ? '下架' : '上架' }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-show="count"
        :page-sizes="pageSizes"
        :page-size="limit"
        :total="count"
        :current-page="page"
        :layout="pageLayout"
        class="campus-pagination"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      />
      <Dialog ref="dialog" title="批量导班预览" width="80%">
        <export-class ref="exportClass" @closeDialog="closeDialog"/>
      </Dialog>
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import tables from '@/mixin/tables'
import Dialog from '@/components/Dialog'
import ExportClass from './components/ExportClass'
import { getPxxclassList, editPxxclassStatus, deletePxxclass } from '@/api/backstage/courseManagement'
export default {
  name: 'CourseManagement',
  components: {
    Dialog,
    ExportClass
  },
  mixins: [tables],
  data() {
    return {
      key: 1,
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
        classStatus: '',
        department: '',
        whetherShowHadEndClass: true
      },
      dataList: [],
      isDisabled: true,
      multipleSelection: [],
      campusProps: {
        value: 'id',
        label: 'name'
      }
    }
  },
  computed: {
    ...mapGetters(['constant']),
    lastRoute() {
      return this.$route.matched.length > 3
    }
  },
  created() {
    this.$store.dispatch('getConstant', ['particular_year', 'campus', 'season', 'periods', 'grade', 'subject', 'timeslot_type', 'project_type', 'class_type', 'week_day_type', 'department_type']).then(() => {
      this.fetchData()
    })
  },
  methods: {
    fetchData() {
      const { adminOrganIds, classWeekDay, timeslotType } = this.select
      const params = {
        ...this.select,
        adminOrganIds: adminOrganIds && adminOrganIds[adminOrganIds.length - 1],
        classWeekDay: classWeekDay.join(','),
        timeslotType: timeslotType.join(','),
        limit: this.limit,
        page: this.page
      }
      this.BFD(getPxxclassList(params).then(({ data }) => {
        const { count, list } = data
        this.count = count
        this.dataList = list
        this.dataList.map(item => {
          item.statusHtm = this.renderStateTag(item.status ? '上架' : '下架', false)
          return item
        })
      }))
    },
    modifyStatus(row) {
      this.$confirm('是否进行状态修改?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const params = {
          id: row.id,
          status: !row.status
        }
        editPxxclassStatus({ pxxclass: params }).then(res => {
          this.$message.success('修改成功')
          this.fetchData()
        })
      })
    },
    deleteClass(ids) {
      this.$confirm('是否删除改数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deletePxxclass({ ids }).then(res => {
          this.$message.success('删除成功')
          this.fetchData()
        })
      })
    },
    handleSelectionChange(val) {
      const { totalTimes } = val.length && val[0]
      this.multipleSelection = val
      if (this.multipleSelection.filter(item => item.totalTimes !== totalTimes).length) {
        this.$message.error('请选择相同课次的班级')
        this.isDisabled = true
      } else {
        this.isDisabled = false
      }
    },
    batchImport() {
      this.$refs.dialog.show = true
      if (this.$refs.exportClass !== undefined) {
        this.$refs.exportClass.dataList = []
        this.$refs.exportClass.fileList = []
        this.$refs.exportClass.exportList = []
        this.$refs.exportClass.stepInfo = {
          stepFirst: '文件数据总数：',
          StepTwo: '解析正确总数：',
          stepthree: '解析错误总数：'
        }
      }
    },
    closeDialog() {
      this.$refs.dialog.show = false
    }
  }
}
</script>

<style lang="scss">
.class-manage-box{
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

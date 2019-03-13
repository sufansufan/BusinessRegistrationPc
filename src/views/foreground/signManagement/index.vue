<template>
  <div class="sign-management-box">
    <router-view v-if="isRecord || lastRoute"/>
    <template v-else>
      <div class="select-tools">
        <div>
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
            <el-select v-model="select.timeslotName" clearable placeholder="时段">
              <el-option
                v-for="item in timeslotList"
                :key="item.id"
                :label="item.name"
                :value="item.name"
              />
            </el-select>
          </div>
        </div>
        <div class="select-btn">
          <calendar ref="calendar" @weekSelected="fetchData"/>
        </div>
      </div>
      <div class="select-tools select-campus">
        <div>
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
          <div class="checkbox-list">
            <el-checkbox-group v-model="select.timeslotType" class="time-list">
              <el-checkbox
                v-for="item in constant.timeslot_type"
                :label="item.value"
                :key="item.value"
              >{{ item.label }}</el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
      </div>
      <comm-table :data="dataList" :columns="columns" :count="count"/>
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import tables from '@/mixin/tables'
import CommTable from '@/views/components/CommTable'
import { findAttendClassList } from '@/api/foreground/signManagement'
import { getTimeslotList } from '@/api/backstage/courseManagement'
import Calendar from './components/Calendar'
import { parseTime } from '@/utils'
export default {
  name: 'SignManagement',
  components: {
    CommTable,
    Calendar
  },
  mixins: [tables],
  data() {
    return {
      columns: [
        {
          label: '班级名称',
          prop: 'className',
          width: 250,
          render: (h, row) => {
            return h('el-button', {
              attrs: {
                type: 'text'
              },
              on: {
                click: () => {
                  this.$router.push({ name: 'SignInfo', params: { id: row.classId, attendId: row.id }})
                }
              }
            }, row.className)
          }
        },
        { label: '期别', prop: 'periodsName', width: '100' },
        { label: '课次', prop: 'classSequence' },
        { label: '校区', prop: 'adminOrganName' },
        { label: '时段', prop: 'dateSlotName' },
        { label: '教室', prop: 'classroomName' },
        { label: '老师', prop: 'teacherName' },
        { label: '签到/应签总数', prop: ['realSignUpNum', 'shouldSignUpNum'] }
      ],
      select: {
        adminOrganIds: [],
        gradeForIdentity: '',
        subjectForIdentity: '',
        timeslotName: '',
        startDateString: '',
        endDateString: '',
        workDateString: '',
        timeslotType: []
      },
      dataList: [],
      timeslotList: [],
      campusProps: {
        value: 'id',
        label: 'name'
      }
    }
  },
  computed: {
    ...mapGetters(['constant']),
    isRecord() {
      return this.$route.path.includes('/record')
    },
    lastRoute() {
      return this.$route.matched.length > 3
    }
  },
  watch: {
    select: {
      handler() {
        this.fetchData()
      },
      deep: true
    }
  },
  created() {
    this.$store.dispatch('getConstant', ['particular_year', 'campus', 'season', 'periods', 'grade', 'subject', 'timeslot_type', 'project_type', 'class_type', 'week_day_type', 'department_type']).then(() => {
      this.getTimeslot()
      this.fetchData()
    })
  },
  methods: {
    fetchData(workDateString) {
      const { adminOrganIds, timeslotType } = this.select
      const params = {
        ...this.select,
        adminOrganIds: adminOrganIds && adminOrganIds[adminOrganIds.length - 1],
        startDateString: this.$refs.calendar && parseTime(this.$refs.calendar.startDay, 'y-m-d'),
        endDateString: this.$refs.calendar && parseTime(this.$refs.calendar.endDay, 'y-m-d'),
        timeslotType: timeslotType.join(','),
        workDateString,
        limit: this.limit,
        page: this.page
      }
      this.BFD(findAttendClassList(params).then(({ data }) => {
        const { count, list } = data
        this.count = count
        this.dataList = list
        this.dataList.map(item => {
          item.dateSlotName = item.startTime + '-' + item.endTime
        })
      }))
    },
    getTimeslot() {
      getTimeslotList({ timeslotStatus: true }).then(({ data }) => {
        this.timeslotList = data.list
        this.timeslotList.map(item => {
          item.name = item.startTime + '-' + item.endTime
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.sign-management-box {
  .select-campus {
    margin-top: -60px;
  }
  .checkbox-list {
    margin-top: 5px;
  }
}
</style>

<template>
  <div class="class-arrangement">
    <h3>课节安排(当前共{{ classTimeList.length }}节 总课次额定 {{ totalTimes }}节)</h3>
    <div class="class-list-box">
      <div v-for="(item ,index) in classTimeList" :key="index" class="class-list-container">
        <el-row :gutter="20">
          <el-col :span="1">
            <div class="class-icon act-color">
              {{ item.classSequence }}
            </div>
          </el-col>
          <el-col :span="5">
            <el-date-picker
              v-model="item.workdate"
              style="width: 100%"
              type="date"
              placeholder="选择日期"/>
          </el-col>
          <el-col :span="5">
            <el-select v-model="item.arrange.dateSlotTime" placeholder="时段" style="width: 100%">
              <el-option
                v-for="item in timeslotList"
                :key="item.id"
                :label="item.name"
                :value="item.name"
              />
            </el-select>
          </el-col>
          <el-col :span="6">
            <el-autocomplete
              v-model="item.arrange.teacherName"
              :fetch-suggestions="queryTeacher"
              clearable
              popper-class="my-autocomplete"
              placeholder="请输入老师"
              style="width: 100%"
              @select="teacherSelect(index, $event)">
              <template slot-scope="{ item }">
                <div class="name">{{ item.name }}</div>
              </template>
            </el-autocomplete>
          </el-col>
          <el-col :span="6">
            <el-autocomplete
              v-model="item.arrange.classroomName"
              :fetch-suggestions="queryClassRoom"
              clearable
              popper-class="my-autocomplete"
              placeholder="请输入教室"
              style="width: 100%"
              @select="classRoomSelect(index, $event)">
              <template slot-scope="{ item }">
                <div class="name">{{ item.classroomName }}</div>
              </template>
            </el-autocomplete>
          </el-col>
          <el-col :span="1">
            <div v-if="whetherAdd" class="class-icon" @click="classTime('delete', index)">
              <i class="el-icon-delete act-color"/>
            </div>
          </el-col>
        </el-row>
      </div>
      <div v-if="whetherAdd" class="class-time-add act-color" @click="classTime('add')">
        <div class="class-icon">
          <i class="el-icon-plus"/>
        </div>
        <div>
          添加课节
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { getTimeslotList } from '@/api/backstage/courseManagement'
import { getTeacherList } from '@/api/backstage/teacherManagement'
import { getClassroomList } from '@/api/backstage/classroomManagement'
export default {
  props: {
    attendClassesData: {
      type: Object,
      default: () => { }
    }
  },
  data() {
    return {
      classTimeList: [{
        id: '',
        classSequence: '',
        classId: '',
        teacherId: '',
        classroomId: '',
        startTime: '',
        endTime: '',
        workdate: '',
        arrange: {
          dateSlotTime: '',
          classroomName: '',
          teacherName: ''
        }
      }],
      totalTimes: '',
      whetherAdd: '',
      timeslotList: [],
      classRoomList: [],
      teacherList: []
    }
  },
  watch: {
    classTimeList: {
      handler() {
        console.log(this.classTimeList)
      },
      deep: true
    }
  },
  created() {
    this.getClassAttendInfo()
    this.getTimeslot()
    this.getTeacter()
    this.getClassRoom()
  },
  methods: {
    classTime(type, index) {
      if (type === 'add') {
        this.classTimeList.push({
          teacher: '',
          classRoom: '',
          date: ''
        })
      } else if (type === 'delete') {
        this.classTimeList.splice(index, 1)
      }
    },
    getTimeslot() {
      getTimeslotList({ timeslotStatus: true }).then(({ data }) => {
        this.timeslotList = data.list
        this.timeslotList.map(item => {
          item.name = item.startTime + '-' + item.endTime
        })
      })
    },
    getTeacter() {
      getTeacherList({ teacherStatus: true }).then(({ data }) => {
        this.teacherList = data.list
      })
    },
    getClassRoom() {
      const params = {
        classroomStatus: true
      }
      getClassroomList(params).then(({ data }) => {
        this.classRoomList = data.list
      })
    },
    queryTeacher(queryString, cb) {
      var results = queryString ? this.teacherList.filter(item => (item.name.includes(queryString))) : this.teacherList
      cb(results)
    },
    queryClassRoom(queryString, cb) {
      var results = queryString ? this.classRoomList.filter(item => (item.name.includes(queryString))) : this.classRoomList
      cb(results)
    },
    teacherSelect(index, val) {
      this.classTimeList[index].teacherId = val.id
      this.classTimeList[index].arrange.teacherName = val.name
    },
    classRoomSelect(index, val) {
      this.classTimeList[index].classroomId = val.id
      this.classTimeList[index].arrange.classroomName = val.classroomName
    },
    getClassAttendInfo() {
      const { attendClasses, totalTimes, whetherAdd } = this.attendClassesData
      this.whetherAdd = whetherAdd
      this.totalTimes = totalTimes
      this.classTimeList = JSON.parse(JSON.stringify(attendClasses))
      this.classTimeList = JSON.parse(JSON.stringify(this.classTimeList)).map(item => {
        const { startTime, endTime, classroomName, teacherName } = item
        item.arrange = {
          dateSlotTime: startTime + '-' + endTime,
          classroomName,
          teacherName
        }
        return item
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.class-arrangement{
  .class-list-box{
    min-height: 500px;
    .class-list-container{
      margin-bottom: 10px;
    }
    .class-icon{
      width: 32px;
      height: 32px;
      background: #f2f2f2;
      border-radius: 50%;
      line-height: 32px;
      text-align: center;
      cursor: pointer;
    }
    .class-time-add{
      width: 120px;
      margin-top: 20px;
      display: flex;
      line-height: 32px;
      cursor: pointer;
      & > div:last-child{
        margin-left: 10px;
      }
    }
  }
}
</style>

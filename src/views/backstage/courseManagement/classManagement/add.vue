<template>
  <div class="class-add-box">
    <class-datail :class-tilte="classTilte">
      <div slot="classList" class="class-list-box-hander">
        <el-button type="goback" icon="el-icon-arrow-left" @click="$router.go(-1)">返回</el-button>
        <step-bar :step-status="stepStatus"/>
      </div>
      <div slot="classList" class="class-list">
        <div>
          <div v-show="!stepStatus">
            <class-list ref="classList" @getClassName = "getClassName"/>
          </div>
        </div>
        <div>
          <div v-if="stepStatus">
            <class-arrangement ref="classArrange" :attend-classes-data ="attendClassesData"/>
          </div>
        </div>
        <div class="class-list-btn">
          <div v-if="stepStatus === 0">
            <el-button type="primary" size="big" @click="stepClick('next')">下一步</el-button>
          </div>
          <div v-if="stepStatus === 1">
            <el-button type="primary" size="big" @click="stepClick('goback')">上一步</el-button>
            <el-button type="primary" size="big" @click="stepClick('submit')">提交</el-button>
          </div>
        </div>
      </div>
    </class-datail>
  </div>

</template>

<script>
import StepBar from './components/StepBar'
import ClassList from './components/ClassList'
import ClassArrangement from './components/ClassArrangement'
import ClassDatail from './components/ClassDatail'
import { editPxxclass, editAttendClassForEditPxxcalss } from '@/api/backstage/courseManagement'
export default {
  name: 'AddClass',
  components: {
    StepBar,
    ClassList,
    ClassArrangement,
    ClassDatail
  },
  data() {
    return {
      classTilte: {
        className: '',
        classInfo: ''
      },
      attendClasses: [],
      stepStatus: 0
    }
  },
  methods: {
    stepClick(type) {
      if (type === 'next') {
        this.saveClassList()
      } else if (type === 'goback') {
        this.stepStatus = 0
      } else {
        this.saveClassArrange()
      }
    },
    saveClassList() {
      const { classForm: { adminOrganId, classWeekDay, id }, classTitleInfo: { className }, $refs: { classForm }} = this.$refs.classList
      classForm.validate(valid => {
        if (valid) {
          const params = {
            ...this.$refs.classList.classForm,
            adminOrganId: adminOrganId[adminOrganId.length - 1],
            classWeekDay: classWeekDay.join(','),
            className
          }
          delete params.searchList
          editPxxclass({ pxxclass: params }).then(({ data }) => {
            this.attendClassesData = data
            id ? this.$message.success('编辑成功') : this.$message.success('新增成功')
            this.stepStatus = 1
          })
        } else {
          return false
        }
      })
    },
    saveClassArrange() {
      const { classTimeList, whetherAdd } = this.$refs.classArrange
      const params = JSON.parse(JSON.stringify(classTimeList))
      params.map(item => {
        const { arrange: { dateSlotTime }} = item
        item.startTime = dateSlotTime.split('-')[0]
        item.endTime = dateSlotTime.split('-')[1]
        delete item.arrange
        delete item.classroomName
        delete item.teacherName
        delete item.teacherNo
        delete item.classroomNo
        return item
      })

      editAttendClassForEditPxxcalss({ whetherAdd, attendClasses: params }).then(res => {
        this.$message.success('编辑成功')
        this.stepStatus = 2
        this.$nextTick(() => {
          this.$router.push({ name: 'ClassManagement' })
        })
      })
    },
    getClassName(classTitleInfo) {
      this.classTilte = {
        ...classTitleInfo
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

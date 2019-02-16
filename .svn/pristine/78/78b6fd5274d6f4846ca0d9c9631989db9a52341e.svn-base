<template>
  <div class="curriculum-adjust-box">
    <student :sid="sid"/>
    <div class="curriculum-adjust-box-content">
      <el-button type="goback" @click="$router.go(-1)">返回</el-button>
      <h2>调课</h2>
      <h3 class="bor-tit">
        <span>原班信息</span>
        <i class="act-bg"/>
      </h3>
      <div class="title">
        <span>{{ oldClassInfo.campusName }}</span>
        <span>{{ oldClassInfo.className }}</span>
        <span>{{ oldClassInfo.periods }}期</span>
      </div>
      <div class="course-list">
        <div
          v-for="(item, index) in oldAttendList"
          :key="item.id"
          :class="{'course-list-item': true, actived: item._actived}"
          @click="selectedClassId(item, index, 'old')"
        >
          <span class="time">{{ item.workdate }}</span>
          <h1 class="act-color">{{ item.classSequence }}</h1>
          <span
            :class="{bottom: true, 'el-alert--success': item.whetherClassSwitchingAndChangeOfClass}"
          >{{ item.rollCallStatusLabel }}</span>
        </div>
      </div>
      <h3 class="bor-tit">
        <span>目标班级</span>
        <i class="act-bg"/>
      </h3>
      <template v-if="selected">
        <div class="old-to-new">
          <div class="arrow">
            <i class="el-icon-d-arrow-right"/>
            <i class="el-icon-d-arrow-right"/>
          </div>
          <div class="course-item">
            <span class="time">{{ oldClass.workdate }}</span>
            <h1 class="act-color">{{ oldClass.classSequence }}</h1>
            <span class="bottom el-alert--success">{{ oldClass.rollCallStatusLabel }}</span>
          </div>
          <div class="course-item">
            <span class="time">{{ newClass ? newClass.workdate : '' }}</span>
            <h1 class="act-color">{{ newClass ? newClass.classSequence : '?' }}</h1>
            <span
              class="bottom el-alert--success"
            >{{ newClass ? newClass.rollCallStatusLabel : '请选择' }}</span>
          </div>
        </div>
        <div class="btn">
          <el-button type="primary" @click="classSwitching">确认调课</el-button>
          <el-button @click="selected = false">重新选择</el-button>
        </div>
        <div class="title">
          <span>{{ newClassInfo.campusName }}</span>
          <span>{{ newClassInfo.className }}</span>
          <span>{{ newClassInfo.periods }}期</span>
        </div>
        <div class="course-list">
          <div
            v-for="(item, index) in newAttendList"
            :key="item.id"
            :class="{'course-list-item': true, actived: item._actived}"
            @click="selectedClassId(item, index, 'new')"
          >
            <span class="time">{{ item.workdate }}</span>
            <h1 class="act-color">{{ item.classSequence }}</h1>
            <span
              :class="{bottom: true, 'el-alert--success': item.whetherClassSwitchingAndChangeOfClass }"
            >{{ item.rollCallStatusLabel }}</span>
          </div>
        </div>
      </template>
      <template v-else>
        <class-query :key="key" :is-apply="false">
          <template slot-scope="{row}">
            <el-button type="text" @click="selectedClass(row.id)">选择</el-button>
          </template>
        </class-query>
      </template>
    </div>
  </div>
</template>

<script>
import Student from '../student'
import ClassQuery from './ClassQuery'
import { getClassAttendList, classSwitching, findAllowedClasses } from '@/api/foreground/apply'
import { parseTime } from '@/utils'
export default {
  inject: ['sid'],
  components: {
    Student,
    ClassQuery
  },
  data() {
    return {
      selected: false,
      oldAttendList: [],
      oldClassInfo: {},
      newAttendList: [],
      newClassInfo: {},
      oldClass: null,
      newClass: null,
      key: 1
    }
  },
  computed: {
    cid() {
      return this.$route.query.cid || ''
    }
  },
  created() {
    this.getAttendList(this.cid, 'old')
  },
  methods: {
    getAttendList(id, prefix) {
      getClassAttendList({
        classId: id,
        studentId: this.sid
      }).then(res => {
        const { attendList, classInfo } = res.data
        this[prefix + 'AttendList'] = attendList.map(item => {
          item.workdate = parseTime(item.workdate, 'm-d')
          return item
        })
        this[prefix + 'ClassInfo'] = classInfo
      })
    },
    selectedClassId(row, index, prefix) {
      if (!row.whetherClassSwitchingAndChangeOfClass) return
      this[prefix + 'AttendList'].forEach(item => (this.$set(item, '_actived', false)))
      this[prefix + 'AttendList'][index]._actived = true
      this[prefix + 'Class'] = row
    },
    selectedClass(id) {
      if (!this.oldClass) {
        this.$message.error('请选择原班课次')
        return
      }
      findAllowedClasses({
        Loading: true,
        oldClassId: this.cid,
        currentClassId: id,
        operationType: 1
      }).then(() => {
        this.selected = true
        this.getAttendList(id, 'new')
      })
    },
    classSwitching() {
      if (!this.newClass) {
        this.$message.error('请选择目标课次')
        return
      }
      classSwitching({
        Loading: true,
        oldSequenceId: this.oldClass.studentAttendClassId,
        newSequenceId: this.newClass.id,
        studentId: this.sid
      }).then(() => {
        this.$message.success('调课成功')
        this.selected = false
        this.oldClass = null
        this.newClass = null
        this.key = this.key + 1
        this.getAttendList(this.$route.query.cid, 'old')
      })
    }
  }
}
</script>

<style lang="scss">
.curriculum-adjust-box {
  position: relative;
  &::before {
    content: "";
    position: absolute;
    left: -22px;
    top: 114px;
    width: calc(100% + 44px);
    height: 22px;
    background: linear-gradient(to bottom, #f1f1f1, #f3f5f7, #f1f1f1);
  }
  &-content {
    padding-top: 66px;
    .el-button--goback {
      position: absolute;
    }
    > h2 {
      margin: 0 0 22px 0;
      text-align: center;
    }
    .title {
      span {
        padding-right: 10px;
        color: #7d7d7d;
      }
    }
    .course-list,
    .old-to-new {
      display: flex;
      flex-wrap: wrap;
      padding: 24px 0 0 0;
      &-item,
      .course-item {
        &.actived {
          background: rgba(#ecf4f0, 0.3);
          h1,
          span:first-child {
            color: #409167 !important;
          }
        }
        width: 87px;
        height: 100px;
        border: 1px solid #f5f5f5 {
          radius: 6px;
        }
        text-align: center;
        margin: 0 18px 18px 0;
        background: #fff;
        box-shadow: 0 0 20px #eee;
        position: relative;
        overflow: hidden;
        cursor: pointer;
        .time {
          position: absolute;
          top: 10px;
          left: 10px;
          font-size: 12px;
          color: #b8b8b8;
        }
        h1 {
          font-size: 2.5em;
          margin-top: 20px;
        }
        .bottom {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          padding: 5px 0;
          font-weight: bold;
          font-size: 14px;
          &:not(.el-alert--success) {
            background-color: #eee;
            color: #bbb;
            cursor: default;
          }
        }
      }
    }
    .old-to-new {
      min-width: 525px;
      justify-content: center;
      padding-bottom: 20px;
      position: relative;
      .course-item {
        width: 160px;
        height: 173px;
        cursor: default;
        margin-right: 0;
        border-radius: 8px;
        &:not(:last-child) {
          margin-right: 250px;
        }
        h1 {
          font-size: 6em;
          margin-top: 25px;
        }
      }
      .arrow {
        position: absolute;
        top: 65px;
        left: 50%;
        display: flex;
        transform: translateX(-50%);
        animation: arrow 1.3s infinite;
        animation-fill-mode: both;
        i {
          font-size: 5em;
          font-weight: bold;
          color: #cecece;
          &:last-child {
            margin-left: -100px;
          }
        }
      }
    }
    .btn {
      padding: 30px 0;
      text-align: center;
      > button {
        width: 40%;
        max-width: 180px;
      }
    }
  }
}
@keyframes arrow {
  from {
    left: 45%;
    opacity: 0;
  }
  to {
    left: 53%;
    opacity: 1;
  }
}
</style>

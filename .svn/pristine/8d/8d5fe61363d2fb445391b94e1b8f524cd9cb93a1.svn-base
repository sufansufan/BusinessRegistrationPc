<template>
  <div class="change-class-box">
    <student :sid="sid"/>
    <div class="change-class-box-content">
      <el-button type="goback" @click="$router.go(-1)">返回</el-button>
      <h2>转班</h2>
      <h3 class="bor-tit">
        <span>原班信息</span>
        <i class="act-bg"/>
      </h3>
      <div class="title">
        <span>{{ classInfo.campusName }}</span>
        <span>{{ classInfo.className }}</span>
        <span>{{ classInfo.periods }}期</span>
      </div>
      <div class="course-list">
        <div
          v-for="item in attendList"
          :key="item.id"
          :class="{'course-list-item': true, actived: item._actived}"
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
      <class-query :is-apply="false">
        <template slot-scope="{row}">
          <el-button type="text" @click="selectedClass(row.id)">转班</el-button>
        </template>
      </class-query>
    </div>
  </div>
</template>

<script>
import Student from '../student'
import ClassQuery from './ClassQuery'
import { getClassAttendList, changeOfClass, findAllowedClasses } from '@/api/foreground/apply'
import { parseTime } from '@/utils'
export default {
  inject: ['sid'],
  components: {
    Student,
    ClassQuery
  },
  data() {
    return {
      classInfo: [],
      attendList: []
    }
  },
  computed: {
    paramsIds() {
      return this.$route.query || {}
    }
  },
  created() {
    this.getAttendList(this.paramsIds.cid)
  },
  methods: {
    getAttendList(id) {
      getClassAttendList({
        classId: id,
        studentId: this.sid
      }).then(res => {
        const { attendList, classInfo } = res.data
        this.attendList = attendList.map(item => {
          item.workdate = parseTime(item.workdate, 'm-d')
          return item
        })
        this.classInfo = classInfo
      })
    },
    selectedClass(id) {
      findAllowedClasses({
        Loading: true,
        oldClassId: this.paramsIds.cid,
        currentClassId: id,
        operationType: 2
      }).then(() => {
        this.$confirm('确定转入该班级吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          changeOfClass({
            Loading: true,
            oldOrderId: this.paramsIds.oid,
            currentClassId: id,
            studentId: this.sid
          }).then(() => {
            this.$message.success('转班成功')
            this.getAttendList(this.paramsIds.cid)
          })
        }).catch(() => { })
      })
    }
  }
}
</script>

<style lang="scss">
.change-class-box {
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
    .course-list {
      display: flex;
      flex-wrap: wrap;
      padding: 24px 0 0 0;
      &-item {
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
        &.actived {
          background: rgba(#ecf4f0, 0.3);
          h1,
          span:first-child {
            color: #409167 !important;
          }
        }
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
  }
}
</style>

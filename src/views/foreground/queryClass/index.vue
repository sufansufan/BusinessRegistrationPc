<template>
  <div class="query-class-box">
    <router-view/>
    <template v-if="show">
      <class-query :is-apply="false" :columns="columns" :is-export="true"/>
    </template>
  </div>
</template>

<script>
import ClassQuery from '../apply/components/ClassQuery'
export default {
  provide() {
    return {
      sid: ''
    }
  },
  components: {
    ClassQuery
  },
  data() {
    return {
      columns: [
        { label: '校区', prop: 'adminOrganName' },
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
                  this.$router.push({ path: '/foreground/queryClass/classInfo/' + row.id })
                }
              }
            }, row.className)
          }
        },
        { label: '期别', prop: 'periodsName' },
        {
          label: '老师',
          render: (h, row) => {
            return h('el-button', {
              attrs: {
                type: 'text'
              },
              on: {
                click: () => {
                  this.$router.push({ path: '/foreground/queryClass/teacherInfo/' + row.teacherId })
                }
              }
            }, row.teacherName)
          }
        },
        { label: '重复周期', prop: 'classWeekDayName', width: 80 },
        { label: '教室', prop: 'classroomName' },
        { label: '价格', prop: 'totalPrice', type: 'num', pre: '￥', width: 100 },
        { label: '课次剩余', prop: 'leftTimes', type: 'num' },
        { label: '招生情况', prop: ['signupNum', 'maxStudentsNum'] },
        { label: '时段', prop: 'timeslotName', width: 120 },
        { label: '上课日期', prop: 'startClassDate', width: 90 },
        { label: '报名人数', prop: 'signupNum', type: 'num' },
        { label: '缴费人数', prop: 'payNum', type: 'num' },
        { label: '剩余名额', prop: 'leftNum', type: 'num' },
        { label: '候补人数', prop: 'waitNum', type: 'num' }
      ],
      show: true
    }
  },
  created() {
    this.$nextTick(() => {
      if (this.$children.length > 1) {
        this.show = false
      }
    })
  }
}
</script>

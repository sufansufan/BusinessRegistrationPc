<template>
  <div class="calendar-box">
    <div>
      <div class="up-week">
        <el-button size="big" icon="el-icon-arrow-left" @click="weekBtn('up')">上一周</el-button>
      </div>
      <div class="select-week">
        <el-date-picker
          ref="selectWeek"
          v-model="date"
          type="date"
          size="big"
          placeholder="选择日期"
          style="width: 340px;"
          @change="weekChange"/>
        <div class="select-week-mask" @click="weekMask">
          {{ rangeDate && rangeDate[0] }} 至 {{ rangeDate && rangeDate[1] }}
        </div>
      </div>
      <div class="down-week">
        <el-button size="big" @click="weekBtn('down')">下一周 <i class="el-icon-arrow-right el-icon--right"/></el-button>
      </div>
    </div>
    <div class="calendar-list">
      <ul>
        <li v-for="(item,index) in weekDate" :key="item.date" :ref="'week'+index" @click="weekClick(item,index)">
          <strong>{{ item.week }}</strong>
          <span>{{ item.date }}</span>
          <div class="correct">
            <div />
            <i class="el-icon-check"/>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { parseTime } from '@/utils'
export default {
  data() {
    return {
      date: new Date(),
      rangeDate: [],
      weekDate: [],
      week: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      startDay: '',
      endDay: ''
    }
  },
  created() {
    this.weekChange(new Date())
  },
  methods: {
    weekMask() {
      this.$refs.selectWeek.focus()
    },
    weekChange(val) {
      this.rangeDate = []
      this.weekDate = []
      const day = new Date(val).getDay()
      this.startDay = new Date(val).getTime() - 3600000 * (day - 1) * 24
      this.endDay = new Date(val).getTime() + 3600000 * (7 - day) * 24
      this.rangeDate[0] = parseTime(this.startDay, 'y-m-d')
      this.rangeDate[1] = parseTime(this.endDay, 'y-m-d')
      for (let i = 0; i < 7; i++) {
        this.weekDate.push({
          week: this.week[i],
          date: parseTime(this.startDay + 3600000 * i * 24, 'm-d'),
          yearDate: parseTime(this.startDay + 3600000 * i * 24, 'y-m-d')
        })
      }
      this.$emit('fetchData')
    },
    weekBtn(type) {
      this.date = type === 'up' ? new Date(this.date).getTime() - 3600000 * 24 * 6 : new Date(this.date).getTime() + 3600000 * 24 * 6
      this.weekChange(this.date)
    },
    weekClick(item, index) {
      for (let i = 0; i < 7; i++) {
        this.$refs['week' + i][0].classList.remove('act-border')
        this.$refs['week' + i][0].children[2].style.display = 'none'
      }
      this.$refs['week' + index][0].classList.add('act-border')
      this.$refs['week' + index][0].children[2].style.display = 'block'
      this.$emit('fetchData', item.yearDate)
    }
  }
}
</script>

<style lang="scss" scoped>
.calendar-box{
  .calendar-list{
    & > ul > .act-border{
      color: #030303;
    }
  }
}
</style>
<style lang="scss">
.calendar-box{
  .el-date-editor:not(.is-active){
    border: none !important;
  }
  & > div:first-child{
    display: flex;
    .el-input__inner{
      border-radius: 0px;
      border-right: none !important;
      border-left: none !important;
      text-align: center;
    }
    .up-week{
      .el-button{
        border-top-right-radius: 0px !important;
        border-bottom-right-radius: 0px !important;
      }
    }
    .down-week{
      .el-button{
        border-top-left-radius: 0px !important;
        border-bottom-left-radius: 0px !important;
      }
    }
    .select-week{
      position: relative;
      .el-date-editor {
        .el-range-input{
          color: #929292;
        }
      }
      .el-range-separator{
        color: #929292;
      }
      &-mask{
        position:absolute;
        top: 1px;
        left: 0px;
        right: 0px;
        bottom: 1px;
        background: #f8f8f8;
        text-align: center;
        line-height: 38px;
        height: 38px;
        color: #5a5e66;
      }
    }
  }
  .calendar-list{
    & > ul{
      list-style: none;
      margin-top: 10px;
      padding: 0px;
      display: flex;
      position: relative;
      & > li {
        width: 70px;
        height: 45px;
        border: 1px solid #d8dce5;
        padding: 5px 10px;
        margin-right: 10px;
        text-align: center;
        color: #929292;
        border-radius: 4px;
        cursor: pointer;
        & > span {
          font-size: 12px;
        }
        .correct{
          position: absolute;
          top: 26px;
          margin-left: 43px;
          display: none;
          & > .el-icon-check{
            position: absolute;
            top: 5px;
            left: 0px;
            color: #fff;
          }
          & > div{
            position: absolute;
            top: 4px;
            left: 1px;
            transform: rotate(225deg);
            content: '';
            border-top: 14px transparent solid;
            border-left: 14px transparent solid;
            border-bottom: 14px transparent solid;
            border-right: 14px #c19b62 solid;
          }
        }
      }
    }
  }
}

</style>

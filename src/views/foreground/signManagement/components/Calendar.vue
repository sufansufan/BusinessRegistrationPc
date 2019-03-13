<template>
  <div class="calendar-box">
    <div>
      <div class="up-week">
        <el-button :size="size" icon="el-icon-arrow-left" @click="weekBtn('up')">上一周</el-button>
      </div>
      <div class="select-week">
        <el-date-picker
          ref="selectWeek"
          v-model="date"
          :size="size"
          type="date"
          placeholder="选择日期"
          style="width: 340px;"
          @change="weekChange"
        />
        <div
          :class="{ 'select-week-mask': true, small: size !== 'big'}"
          @click="weekMask"
        >{{ rangeDate && rangeDate[0] }} 至 {{ rangeDate && rangeDate[1] }}</div>
      </div>
      <div class="down-week">
        <el-button :size="size" @click="weekBtn('down')">
          下一周
          <i class="el-icon-arrow-right el-icon--right"/>
        </el-button>
      </div>
    </div>
    <div v-if="isWeek" class="calendar-list">
      <ul>
        <li
          v-for="(item,index) in weekDate"
          :key="item.date"
          :ref="'week'+index"
          @click="weekClick(item,index)"
        >
          <strong>{{ item.week }}</strong>
          <span>{{ item.date }}</span>
          <div class="correct">
            <div/>
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
  props: {
    size: {
      type: String,
      default: 'big'
    },
    isWeek: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      date: new Date(),
      rangeDate: [],
      weekDate: [],
      week: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
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
    addDate(date, n) {
      date.setDate(date.getDate() + n)
      return date
    },
    getDate(date) {
      return { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() }
    },
    formatDate(date) {
      const dateObj = this.getDate(date)
      const { year, month, day } = dateObj
      const week = this.week[date.getDay()]
      return {
        date: year + '-' + month + '-' + day,
        week
      }
    },
    weekChange(date, num) {
      this.rangeDate = []
      this.weekDate = []
      const weekList = []
      const day = date.getDay() - 1
      const sunday = this.addDate(date, day * -1)
      for (var i = 0; i < 7; i++) {
        weekList.push(this.formatDate(i === 0 ? sunday : this.addDate(sunday, 1)))
      }
      this.startDay = weekList[0].date
      this.endDay = weekList[6].date
      this.rangeDate[0] = this.startDay
      this.rangeDate[1] = this.endDay
      this.weekDate = weekList.map(item => {
        const { week, date } = item
        return {
          week,
          date: parseTime(date, 'm-d'),
          yearDate: new Date(date)
        }
      })
      this.$emit('fetchData', this.rangeDate)
    },
    weekBtn(type) {
      this.weekChange(this.addDate(this.weekDate[0].yearDate, type === 'up' ? -7 : 7))
    },
    weekClick(item, index) {
      for (let i = 0; i < 7; i++) {
        this.$refs['week' + i][0].classList.remove('act-border')
        this.$refs['week' + i][0].children[2].style.display = 'none'
      }
      this.$refs['week' + index][0].classList.add('act-border')
      this.$refs['week' + index][0].children[2].style.display = 'block'
      this.$emit('weekSelected', item.yearDate)
    }
  }
}
</script>

<style lang="scss" scoped>
.calendar-box {
  .calendar-list {
    & > ul > .act-border {
      color: #030303;
    }
  }
}
</style>
<style lang="scss">
.calendar-box {
  .el-date-editor:not(.is-active) {
    border: none !important;
  }
  & > div:first-child {
    display: flex;
    .el-input__inner {
      border-radius: 0px;
      border-right: none !important;
      border-left: none !important;
      text-align: center;
    }
    .up-week {
      .el-button {
        border-top-right-radius: 0px !important;
        border-bottom-right-radius: 0px !important;
      }
    }
    .down-week {
      .el-button {
        border-top-left-radius: 0px !important;
        border-bottom-left-radius: 0px !important;
      }
    }
    .select-week {
      position: relative;
      .el-date-editor {
        .el-range-input {
          color: #929292;
        }
      }
      .el-range-separator {
        color: #929292;
      }
      &-mask {
        position: absolute;
        top: 1px;
        left: 0px;
        right: 0px;
        bottom: 1px;
        background: #f8f8f8;
        text-align: center;
        line-height: 38px;
        height: 38px;
        color: #5a5e66;
        &.small {
          height: 31px;
          line-height: 31px;
        }
      }
    }
  }
  .calendar-list {
    & > ul {
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
        .correct {
          position: absolute;
          top: 26px;
          margin-left: 43px;
          display: none;
          & > .el-icon-check {
            position: absolute;
            top: 5px;
            left: 0px;
            color: #fff;
          }
          & > div {
            position: absolute;
            top: 4px;
            left: 1px;
            transform: rotate(225deg);
            content: "";
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

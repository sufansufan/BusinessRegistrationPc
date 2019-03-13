/**
* Author: DanSmile
* Date: 2019/3/8
* Time: 16:28
*/
<template>
  <div class="routine-analysis-box">
    <div class="routine-analysis-box-left">
      <div class="select-tools">
        <div>
          <div>
            <el-cascader
              :options="constant.campus"
              v-model="selectA.campusId"
              :props="{label: 'name', value:'id'}"
              placeholder="校区"
              change-on-select
            />
          </div>
          <div>
            <el-date-picker
              v-model="selectA.date"
              type="daterange"
              value-format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"/>
          </div>
          <div class="inline">
            <el-button type="primary" icon="el-icon-search" @click="fetchData('searchA')">搜索</el-button>
            <el-button icon="el-icon-refresh" @click="resetSearchA">重置搜索条件</el-button>
            <el-button type="primary" icon="el-icon-download">导出</el-button>
          </div>
        </div>
      </div>
      <div class="arrow-list-box">
        <div>
          <h5>学员人数总计</h5>
          <span class="price-font act-color" style="font-size: 18px">{{ allAmountA.totalPerson }}</span>
        </div>
        <div>
          <h5>新注册学员人数总计</h5>
          <span class="price-font act-color" style="font-size: 18px">{{ allAmountA.registerPerson }}</span>
        </div>
      </div>
    </div>
    <div class="routine-analysis-box-right">
      <div class="select-tools">
        <div>
          <div>
            <el-select v-model="selectB.particularYear" placeholder="年度">
              <el-option
                v-for="item in constant.particular_year"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
          <div>
            <el-select v-model="selectB.season" placeholder="季节">
              <el-option
                v-for="item in constant.season"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
          <div>
            <el-select v-model="selectB.periods" placeholder="期别">
              <el-option
                v-for="item in constant.periods"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
          <div>
            <el-select v-model="selectB.grade" placeholder="年级">
              <el-option
                v-for="item in constant.grade"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
          <div>
            <el-select v-model="selectB.subject" placeholder="科目">
              <el-option
                v-for="item in constant.subject"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
          <div>
            <el-select v-model="selectB.projectType" placeholder="类别">
              <el-option
                v-for="item in constant.project_type"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
          <div>
            <el-select v-model="selectB.classType" placeholder="班型">
              <el-option
                v-for="item in constant.class_type"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
          <div>
            <el-select v-model="selectB.department" placeholder="学部">
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
              v-model="selectB.teacherName"
              placeholder="老师姓名"
              @keyup.enter.native="fetchData('searchB')"
            />
          </div>
          <div>
            <el-input
              v-model="selectB.className"
              placeholder="班级名称"
              @keyup.enter.native="fetchData('searchB')"
            />
          </div>
          <div>
            <el-cascader
              :options="constant.campus"
              v-model="selectB.campusId"
              :props="{label: 'name', value:'id'}"
              placeholder="校区"
              change-on-select
            />
          </div>
          <div>
            <el-date-picker
              v-model="selectB.date"
              type="daterange"
              value-format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"/>
          </div>
          <div class="inline">
            <el-button type="primary" icon="el-icon-search" @click="fetchData('searchB')">搜索</el-button>
            <el-button icon="el-icon-refresh" @click="resetSearch">重置搜索条件</el-button>
            <el-button type="primary" icon="el-icon-download">导出</el-button>
          </div>
        </div>
      </div>
      <div class="arrow-list-box">
        <div>
          <h5>报名人数总计</h5>
          <span class="price-font act-color" style="font-size: 18px">{{ allAmountB.enrollPerson }}</span>
        </div>
        <div>
          <h5>报名人次总计</h5>
          <span class="price-font act-color" style="font-size: 18px">{{ allAmountB.enrollPersonTimes }}</span>
        </div>
        <div>
          <h5>缴费人数总计</h5>
          <span class="price-font act-color" style="font-size: 18px">{{ allAmountB.paymentPerson }}</span>
        </div>
        <div>
          <h5>缴费人次总计</h5>
          <span class="price-font act-color" style="font-size: 18px">{{ allAmountB.paymentPersonTimes }}</span>
        </div>
        <div>
          <h5>退费人数总计</h5>
          <span class="price-font act-color" style="font-size: 18px">{{ allAmountB.returnsPerson }}</span>
        </div>
        <div>
          <h5>退费人次总计</h5>
          <span class="price-font act-color" style="font-size: 18px">{{ allAmountB.returnsPersonTimes }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getFindPerson, getFindRegisterPerson } from '@/api/subject/routineAnalysis'
export default {
  name: 'RoutineAnalysis',
  data() {
    return {
      selectA: {
        date: [],
        campusId: []
      },
      selectB: {
        date: [],
        campusId: [],
        className: '',
        particularYear: '',
        season: '',
        periods: '',
        grade: '',
        subject: '',
        projectType: '',
        classType: '',
        department: '',
        teacherName: ''
      },
      allAmountA: {
        totalPerson: '',
        registerPerson: ''
      },
      allAmountB: {
        enrollPerson: '',
        enrollPersonTimes: '',
        paymentPerson: '',
        paymentPersonTimes: '',
        returnsPerson: '',
        returnsPersonTimes: ''
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
    this.$store.dispatch('getConstant', ['particular_year', 'campus', 'season', 'periods', 'grade', 'subject', 'project_type', 'class_type', 'department_type'])
    this.fetchData()
  },
  methods: {
    resetSearchA() {
      this.selectA = {
        date: [],
        campusId: []
      }
    },
    resetSearch() {
      this.selectB = {
        date: [],
        campusId: [],
        className: '',
        particularYear: '',
        season: '',
        periods: '',
        grade: '',
        subject: '',
        projectType: '',
        classType: '',
        department: '',
        teacherName: ''
      }
    },
    fetchData(type) {
      if (type === 'searchA') {
        const { campusId, date } = JSON.parse(JSON.stringify(this.selectA))
        const paramsA = {
          startDate: date.length ? date[0] : '',
          endDate: date.length === 2 ? date[1] : '',
          campusId: campusId.length ? campusId.pop() : ''
        }
        delete paramsA.date
        getFindRegisterPerson(paramsA).then(res => {
          this.allAmountA = res.data
        })
      } else if (type === 'searchB') {
        const { campusId, date } = JSON.parse(JSON.stringify(this.selectB))
        const paramsB = {
          ...this.selectB,
          startDate: date.length ? date[0] : '',
          endDate: date.length === 2 ? date[1] : '',
          campusId: campusId.length ? campusId.pop() : ''
        }
        delete paramsB.date
        getFindPerson(paramsB).then(res => {
          console.log(res.data)
          this.allAmountB = res.data
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .routine-analysis-box {
    display: flex;
    justify-content: space-between;
    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 50%;
      width: 22px;
      height: calc(100% + 22px);
      background: linear-gradient(to right, #f1f1f1, #f3f5f7, #f1f1f1);
      margin-left: -11px;
    }
    &-left,
    &-right {
      width: calc(50% - 33px);
    }
  }
</style>

<template>
  <div class="batch-setting-box">
    <class-datail :class-tilte= "classTilte">
      <div slot="batchSetting" class="setting">
        <div class="setting-left">
          <div class="go-back">
            <el-button type="goback" icon="el-icon-arrow-left" @click="$router.go(-1)">返回</el-button>
          </div>
          <h2 class="title">课次信息</h2>
          <div class="times-arrange-info">
            <h3>课节安排（总课次额定 {{ attendClasses.length }} 节）</h3>
            <div v-for="(item, index) in attendClasses" :key="index">
              <el-row :gutter="20">
                <el-col :span="2">
                  <div class="num act-color">
                    {{ item.classSequence }}
                  </div>
                </el-col>
                <el-col :span="11">
                  <el-date-picker
                    v-model="item.workdate"
                    :clearable="false"
                    style="width: 100%"
                    type="date"
                    placeholder="选择日期"/>
                </el-col>
                <el-col :span="11">
                  <el-select v-model="item.dateSlotName" placeholder="时段" style="width: 100%">
                    <el-option
                      v-for="item in timeslotList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.name"
                    />
                  </el-select>
                </el-col>
              </el-row>
            </div>
          </div>
          <div class="submit-btn">
            <el-button type="primary" style="width: 300px;" size="big" @click="saveAttendClasses">保存</el-button>
          </div>
        </div>
        <div class="setting-right">
          <h2 class="title">班级属性</h2>
          <div>
            <el-form ref="classAttribute" :model="classAttribute" label-position="top" label-width="80px" size="midium" class="class-attribute">
              <el-form-item label="期别">
                <el-select v-model="classAttribute.season" placeholder="请选择期别">
                  <el-option
                    v-for="item in constant.periods"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="课程安排规律">
                <div class="class-search">
                  <el-cascader
                    :options="constant.campus"
                    v-model="classAttribute.dataSlotCampusId"
                    :props="campusProps"
                    clearable
                    placeholder="请选择校区"
                    change-on-select
                    style="width: 50%"
                    @change="getDateSlot"/>
                  <el-autocomplete
                    v-model="classAttribute.dateslotName"
                    :fetch-suggestions="queryDateSlot"
                    clearable
                    class="input-with-select"
                    popper-class="my-autocomplete"
                    placeholder="请输入课程安排规律"
                    style="width: 100%"
                    @select="dateSlotSelect">
                    <template slot-scope="{ item }">
                      <div class="name">{{ item.name }}</div>
                    </template>
                  </el-autocomplete>
                </div>
              </el-form-item>
              <el-form-item label="重复周期">
                <el-select v-model="classAttribute.classWeekDay" multiple placeholder="请选择重复周期">
                  <el-option
                    v-for="item in constant.week_day_type"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="分数线">
                <el-input v-model="classAttribute.minEntryScore" placeholder="请输入分数线" class="input-with-select"/>
              </el-form-item>
              <el-form-item label="转班条件">
                <el-select v-model="classAttribute.turnClassCondition" placeholder="请选择转班条件">
                  <el-option
                    v-for="item in constant.turn_class_condition"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="班型">
                <el-select v-model="classAttribute.classType" placeholder="请选择班型">
                  <el-option
                    v-for="item in constant.class_type"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="其他选项">
                <div class="class-checkbox">
                  <div>
                    <el-checkbox-button v-model="classAttribute.whetherShowApp" :label="true" style="width: 100%">APP显示</el-checkbox-button>
                  </div>
                  <div>
                    <el-checkbox-button v-model="classAttribute.whetherGenerationCharges" :label="true" style="width: 100%">代收费</el-checkbox-button>
                  </div>
                  <div>
                    <el-checkbox-button v-model="classAttribute.whetherAdmissionTest" :label="true" style="width: 100%">入学测试</el-checkbox-button>
                  </div>
                  <div>
                    <el-checkbox-button v-model="classAttribute.whetherHotClass" :label="true" style="width: 100%">热门班级</el-checkbox-button>
                  </div>
                  <div>
                    <el-checkbox-button v-model="classAttribute.whetherToAttend" :label="true" style="width: 100%">允许旁听</el-checkbox-button>
                  </div>
                  <div>
                    <el-checkbox-button v-model="classAttribute.whetherShowOnlyBackstage" :label="true" style="width: 100%">仅后台可见</el-checkbox-button>
                  </div>
                </div>
              </el-form-item>
              <el-form-item>
                <div class="submit-btn">
                  <el-button type="primary" style="width: 300px;" size="big" @click="saveBaseInfo">保存</el-button>
                </div>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </class-datail>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ClassDatail from './components/ClassDatail'
import { getPxxClassBatchSetup } from '@/api/backstage/courseManagement'
import { getTimeslotList, savePxxClassBatchSetupAttendClass, getDateslotList, savePxxClassBatchSetupInfo } from '@/api/backstage/courseManagement'
export default {
  name: 'BatchSetting',
  components: {
    ClassDatail
  },
  data() {
    return {
      classTilte: {
        className: '',
        classInfo: '',
        classMoney: ''
      },
      classAttribute: {
        classWeekDay: [],
        season: '',
        dateslotName: '',
        minEntryScore: '',
        turnClassCondition: '',
        classType: '',
        whetherShowApp: '',
        whetherAdmissionTest: '',
        whetherToAttend: '',
        whetherGenerationCharges: '',
        whetherHotClass: '',
        whetherShowOnlyBackstage: '',
        dataSlotCampusId: []
      },
      attendClasses: [],
      timeslotList: [],
      classList: [],
      dateSlotList: [],
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
    this.$store.dispatch('getConstant', ['campus', 'periods', 'class_type', 'week_day_type', 'turn_class_condition']).then(() => {
      this.getBatchInfo()
      this.getTimeslot()
      this.getDateSlot()
      const { data } = this.$route.params
      this.classList = data && JSON.parse(JSON.stringify(data))
      const { className, totalTimes, classWeekDayName } = this.classList[0]
      const week = classWeekDayName.split(',')[0]
      this.classTilte = {
        className,
        classInfo: '总课次 ' + totalTimes + ' ' + week
      }
    })
  },
  methods: {
    getBatchInfo() {
      const { id } = this.$route.params
      getPxxClassBatchSetup({ id }).then(({ data }) => {
        const { pxxclass, attendClasses } = data
        this.attendClasses = JSON.parse(JSON.stringify(attendClasses)).map(item => {
          item.dateSlotName = item.startTime + '-' + item.endTime
          return item
        })
        this.classAttribute = JSON.parse(JSON.stringify(pxxclass))
        const { classWeekDay } = this.classAttribute
        this.classAttribute.classWeekDay = classWeekDay.split(',')
      })
    },
    getTimeslot() {
      getTimeslotList({ timeslotStatus: true }).then(({ data }) => {
        this.timeslotList = data.list
        this.timeslotList.map(item => {
          item.name = item.startTime + '-' + item.endTime
        })
      })
    },
    saveAttendClasses() {
      var ids = ''
      this.classList.forEach(item => {
        ids += item.id + ','
      })
      this.attendClasses.map(item => {
        const { dateSlotName } = item
        item.startTime = dateSlotName.split('-')[0]
        item.endTime = dateSlotName.split('-')[1]
      })
      const params = {
        pxxclassIds: ids,
        attendClasses: this.attendClasses
      }
      params.attendClasses.map(item => delete item.dateSlotName)
      savePxxClassBatchSetupAttendClass({ ...params }).then(res => {
        this.$message.success('保存成功')
      })
    },
    getDateSlot() {
      const { dataSlotCampusId } = this.classAttribute
      getDateslotList({ adminOrganIds: dataSlotCampusId[dataSlotCampusId.length - 1] }).then(({ data }) => {
        this.dateSlotList = data.list
      })
    },
    queryDateSlot(queryString, cb) {
      var results = queryString ? this.dateSlotList.filter(item => (item.name === queryString)) : this.dateSlotList
      cb(results)
    },
    dateSlotSelect(val) {
      const { name, classWeekDay } = val
      this.classAttribute.classWeekDay = classWeekDay.split(',')
      this.classAttribute.dateslotName = name
    },
    saveBaseInfo() {
      var ids = ''
      this.classList.forEach(item => {
        ids += item.id + ','
      })
      const params = {
        pxxclassIds: ids,
        pxxclass: JSON.parse(JSON.stringify(this.classAttribute))
      }
      const { classWeekDay } = params.pxxclass
      const week = JSON.parse(JSON.stringify(classWeekDay))
      params.pxxclass.classWeekDay = JSON.parse(JSON.stringify(week)).join(',')
      delete params.pxxclass.dataSlotCampusId
      savePxxClassBatchSetupInfo({ ...params }).then(res => {
        this.$message.success('保存成功')
      })
    }
  }

}
</script>

<style lang="scss" scoped>
.batch-setting-box{
  .setting{
    display: flex;
    justify-content: space-between;
    position: relative;
    min-height: 626px;
      &::after {
      content: "";
      position: absolute;
      top: -22px;
      left: 60%;
      width: 22px;
      height: calc(100% + 45px);
      background: linear-gradient(to right, #f1f1f1, #f3f5f7, #f1f1f1);
      margin-left: -11px;
    }
    &-right{
      width: calc(40% - 33px);
      .class-attribute{
        .el-form-item{
          .el-select{
            width: 100%;
          }
          .class-checkbox{
             width: 100%;
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            & > div{
              width: calc(50% - 11px);
              margin-bottom: 20px;
            }
          }
        }
      }
    }
    &-left{
      width: calc(60% - 33px);
      .times-arrange-info{
        min-height: 845px;
        & > div{
          margin-bottom: 20px;
        }
        .num{
          width: 32px;
          height: 32px;
          border-radius: 50%;
          text-align: center;
          line-height: 32px;
          background: #f2f2f2;
          margin: 0 auto;
        }
      }
    }
    .go-back {
      position: absolute;
    }
    .title {
      text-align: center;
      margin-top: 5px;
    }
    .submit-btn {
      text-align: center;
      padding-top: 30px;
    }
  }
}
</style>
<style lang="scss">
.batch-setting-box{
  .el-checkbox-button:last-child .el-checkbox-button__inner{
    border-radius: 4px;
    width: 100%;
  }
  .class-search{
    display: flex;
    width: 100%;
    .input-with-select {
      .el-input-group__prepend {
        width: 33%;
      }
      .el-input__inner{
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }
    }
    .el-cascade .el-input, .el-cascader .el-input__inner{
      border-right: none;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
     }
  }
}

</style>

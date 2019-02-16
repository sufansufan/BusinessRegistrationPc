<template>
  <div class="course-arrange-law-box">
    <div class="select-tools">
      <div>
        <div>
          <el-input v-model="select.dateslotName" placeholder="课程安排规律" style="width: 300px"/>
        </div>
        <div>
          <el-cascader
            :options="constant.campus"
            v-model="select.adminOrganIds"
            :props="campusProps"
            placeholder="校区"
            change-on-select/>
        </div>
      </div>
      <div class="btn">
        <div>
          <el-button type="primary" icon="el-icon-search" @click="fetchData">搜索</el-button>
        </div>
        <div>
          <el-button icon="el-icon-refresh" @click="resetSearch">重置搜索条件</el-button>
        </div>
        <div>
          <el-button type="primary" icon="el-icon-plus" @click="modify('add')">新增</el-button>
        </div>
      </div>
    </div>
    <el-table :data="dataList" stripe border style="width: 100%">
      <el-table-column prop="adminOrganName" label="校区"/>
      <el-table-column prop="name" label="安排规律名称" width="150"/>
      <el-table-column prop="courseTimes" label="课次数"/>
      <el-table-column prop="startDate" label="开课日期"/>
      <el-table-column prop="endDate" label="结课日期"/>
      <el-table-column prop="classWeekDayName" label="重复周期"/>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <div v-html="scope.row.statusHtm"/>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150px" fixed="right">
        <template slot-scope="scope">
          <el-button type="text" @click="modify('edit', scope.row.id)">编辑</el-button>
          <el-button type="text" @click="deleteStep(scope.row.id)">删除</el-button>
          <el-button type="text" @click="modifyStatus(scope.row)">{{ scope.row.status === true ? '停用' : '启用' }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-show="count"
      :page-sizes="pageSizes"
      :page-size="limit"
      :total="count"
      :current-page="page"
      :layout="pageLayout"
      class="campus-pagination"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    />
    <Dialog ref="dialog" width="50%">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form ref="arrangeLawForm" :model="arrangeLawForm" :rules="arrangeLawRules" :key="key" label-position="top" class="arrange-law-form">
            <el-form-item label="规律名称" prop="name">
              <el-input v-model.trim="arrangeLawForm.name" placeholder="请输入规律名称"/>
            </el-form-item>
            <el-form-item label="课次数" prop="courseTimes">
              <el-input v-model.trim="arrangeLawForm.courseTimes" placeholder="请输入课次数"/>
            </el-form-item>
            <el-form-item label="开课日期" prop="startDate">
              <el-date-picker
                v-model="arrangeLawForm.startDate"
                style="width: 100%"
                type="date"
                placeholder="选择日期"/>
            </el-form-item>
            <el-form-item label="结课日期">
              <span>{{ conclusionDate }}</span>
            </el-form-item>
            <el-form-item label="选择组织架构" prop="adminOrganId">
              <el-cascader
                :options="constant.campus"
                v-model="arrangeLawForm.adminOrganId"
                :props="campusProps"
                placeholder="请选择组织架构"
                change-on-select
                style="width: 100%"/>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="16" class="line">
          <el-form ref="arrangeLawForm" :model="arrangeLawForm" :rules="arrangeLawRules" :key="key" label-position="top" class="arrange-law-form">
            <el-form-item label="重复周期" prop="classWeekDay">
              <div>
                <el-checkbox-group v-model="arrangeLawForm.classWeekDay">
                  <el-checkbox-button v-for="item in constant.week_day_type" :label="item.value" :key="item.value">{{ item.label }}</el-checkbox-button>
                </el-checkbox-group>
              </div>
            </el-form-item>
            <el-form-item label="间隔">
              <div class="interval-list">
                <div>
                  <el-radio-group v-model="arrangeLawForm.type">
                    <el-radio-button v-for="item in intervalList" :label="item.value" :key="item.value">{{ item.label }}</el-radio-button>
                  </el-radio-group>
                </div>
                <!-- <div>
                  <el-checkbox-button label="生成日期安排规律" @click="getDateslot">生成日期安排规律</el-checkbox-button>
                </div> -->
                <div>
                  <el-button label="生成日期安排规律" @click="getDateslot">生成日期安排规律</el-button>
                </div>
              </div>
            </el-form-item>
            <el-form-item label="日期列表">
              <div v-for="(item, index) in arrangeLawForm.dateslotSequences" :key="index" class="date-box">
                <span class="act-color">{{ index + 1 }}</span>
                <el-date-picker
                  v-model="item.workdate"
                  style="width: 95%"
                  type="date"
                  placeholder="选择日期"
                  @change="changeDate(index,$event)"/>
                <i class="el-icon-delete act-color" @click="delteData(index)"/>
              </div>
              <div class="date-add" >
                <span @click="addDate">
                  <i class="el-icon-plus act-color"/>
                  <span class="act-color">添加日期</span>
                </span>
              </div>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button type="warning" size="big">全部清空</el-button>
        <el-button :disabled="!arrangeLawForm.dateslotSequences.length" type="primary" size="big" @click="saveArrangeLaw">确 定</el-button>
        <el-button size="big" @click="$refs.dialog.show = false">取 消</el-button>
      </span>
    </Dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import tables from '@/mixin/tables'
import Dialog from '@/components/Dialog'
import { getDateslotList, editDateslotStatus, deleteDateslot, editDateslot, getDateslotById } from '@/api/backstage/courseManagement'
import { parseTime, id2Level } from '@/utils'
import { validateNumber } from '@/utils/validate'
export default {
  components: {
    Dialog
  },
  mixins: [tables],
  data() {
    const number = (rule, value, callback) => {
      if (!validateNumber(value)) {
        callback(new Error('请输入数字'))
      } else {
        callback()
      }
    }
    return {
      key: 1,
      select: {
        dateslotName: '',
        adminOrganIds: []
      },
      intervalList: [
        { label: '一周', value: '1' },
        { label: '两周', value: '2' },
        { label: '三周', value: '3' },
        { label: '四周', value: '4' }],
      arrangeLawForm: {
        id: '',
        name: '',
        courseTimes: '',
        type: '',
        adminOrganId: [],
        startDate: '',
        endDate: '',
        classWeekDay: [],
        dateslotSequences: []
      },
      dataList: [],
      campusProps: {
        value: 'id',
        label: 'name'
      },
      arrangeLawRules: {
        name: [
          { required: true, message: '名称不能为空', trigger: 'blur' },
          { min: 1, max: 100, message: '最长为100个字符', trigger: 'blur' }
        ],
        courseTimes: [
          { required: true, validator: number, trigger: 'blur' }
        ],
        startDate: [
          { required: true, message: '请选择开课日期', trigger: 'change' }
        ],
        adminOrganId: [
          { required: true, message: '请选择组织架构', trigger: 'change' }
        ],
        classWeekDay: [
          { required: true, message: '请选择重复周期', trigger: 'change' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['constant']),
    conclusionDate() {
      const { dateslotSequences } = this.arrangeLawForm
      return parseTime(dateslotSequences.length && dateslotSequences[dateslotSequences.length - 1].workdate, 'y-m-d')
    }
  },
  created() {
    this.$store.dispatch('getConstant', ['campus', 'week_day_type']).then(() => {
      this.fetchData()
      this.shallowArrangeForm = {
        ...this.arrangeLawForm
      }
    })
  },
  methods: {
    fetchData() {
      const { dateslotName, adminOrganIds } = this.select
      const params = {
        dateslotName,
        adminOrganIds: adminOrganIds && adminOrganIds[adminOrganIds.length - 1]
      }
      this.BFD(getDateslotList(params).then(({ data }) => {
        const { count, list } = data
        this.count = count
        this.dataList = list
        this.dataList.map(item => {
          item.statusHtm = this.renderStateTag(item.status ? '启用' : '停用')
          item.startDate = parseTime(item.startDate, 'y-m-d')
          item.endDate = parseTime(item.endDate, 'y-m-d')
          return item
        })
      }))
    },
    modify(type, id) {
      if (type === 'edit') {
        this.getDateSlotInfo(id)
        this.$refs.dialog.setTitle('编辑规律')
      } else {
        this.arrangeLawForm = {
          ...this.shallowArrangeForm
        }
        this.$refs.dialog.setTitle('新增规律')
      }
      this.key = this.key + 1
      this.$refs.dialog.show = true
    },
    addDate() {
      this.arrangeLawForm.dateslotSequences.push({
        date: ''
      })
    },
    delteData(index) {
      this.arrangeLawForm.dateslotSequences.splice(index, 1)
    },
    deleteStep(ids) {
      this.$confirm('是否删除改数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteDateslot({ ids }).then(res => {
          this.$message.success('删除成功')
          this.fetchData()
        })
      })
    },
    modifyStatus(row) {
      this.$confirm('是否进行状态修改?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const params = {
          id: row.id,
          status: !row.status
        }
        editDateslotStatus({ dateslot: params }).then(res => {
          this.$message.success('修改成功')
          this.fetchData()
        })
      })
    },
    saveArrangeLaw() {
      this.$refs.arrangeLawForm.validate(valid => {
        if (valid) {
          const { adminOrganId, dateslotSequences } = this.arrangeLawForm
          const params = {
            ...this.arrangeLawForm
          }
          params.adminOrganId = adminOrganId && adminOrganId[adminOrganId.length - 1]
          params.classWeekDay = params.classWeekDay.join(',')
          params.endDate = dateslotSequences && dateslotSequences[dateslotSequences.length - 1].workdate
          editDateslot({ dateslot: params }).then(res => {
            this.$refs.dialog.show = false
            this.fetchData()
            params.id ? this.$message.success('编辑成功') : this.$message.success('新增成功')
          })
        } else {
          return false
        }
      })
    },
    getDateSlotInfo(id) {
      getDateslotById({ id }).then(({ data }) => {
        const { id, name, adminOrganId, classWeekDay, courseTimes, startDate, dateslotSequences, type } = data.dateslot
        this.arrangeLawForm = {
          id,
          name,
          courseTimes,
          type,
          adminOrganId: id2Level(this.constant.campus, adminOrganId),
          startDate: new Date(startDate),
          endDate: '',
          classWeekDay: classWeekDay.split(','),
          dateslotSequences
        }
      })
    },
    changeDate(val, e) {
      if (val === 0) {
        this.arrangeLawForm.startDate = e
      }
    },
    getDateslot() {
      this.arrangeLawForm.dateslotSequences = []
      const dateList = []
      const { startDate, classWeekDay, courseTimes, type } = this.arrangeLawForm
      if (!courseTimes) {
        this.$message.warning('请输入课次')
        return
      }
      if (!startDate) {
        this.$message.warning('选择开课日期')
        return
      }
      if (!classWeekDay) {
        this.$message.warning('选择重复周期')
        return
      }
      const week = startDate.getDay()
      const startStamp = new Date(startDate).getTime()
      const num = 7 - Math.max(...classWeekDay) + Math.min(...classWeekDay)
      const loopTimes = Math.floor(courseTimes / classWeekDay.length)
      const intervalWeek = 3600000 * 24 * 7 * parseInt(type) || 0
      const weeklaege = classWeekDay.sort().filter(item => item >= week)
      weeklaege.forEach(item => {
        const dateStamp = startStamp + 3600000 * 24 * (parseInt(item) - week)
        dateList.push(dateStamp)
      })
      for (let i = 0; i < loopTimes; i++) {
        var lastStamp = ''
        lastStamp = dateList[classWeekDay.length * Math.floor(dateList.length / classWeekDay.length) - 1] + (3600000 * 24 * num) + intervalWeek
        if (isNaN(lastStamp) || lastStamp) {
          lastStamp = dateList[classWeekDay.length * Math.floor(dateList.length / classWeekDay.length) + weeklaege.length - 1] + (3600000 * 24 * num) + intervalWeek
          if (isNaN(lastStamp)) {
            lastStamp = dateList[classWeekDay.length * (Math.floor(dateList.length / classWeekDay.length) - 1) + weeklaege.length - 1] + (3600000 * 24 * num) + intervalWeek
          }
        }
        if (!dateList.length) {
          lastStamp = startStamp + 3600000 * 24 * (7 - week + Math.min(...classWeekDay))
        }
        classWeekDay.sort().forEach((item, index) => {
          if (courseTimes > dateList.length) {
            const dateStamp = lastStamp + 3600000 * 24 * parseInt(item - classWeekDay.sort()[0])
            dateList.push(dateStamp)
          }
        })
      }
      dateList.forEach((item, index) => {
        this.arrangeLawForm.dateslotSequences.push({
          dateslotIndex: index + 1,
          workdate: item
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.course-arrange-law-box{
  .arrange-law-form{
    .interval-list{
      display: flex;
      justify-content: space-between;
    }
    .date-box{
      display: flex;
      margin-bottom: 10px;
      & > span{
        margin-right: 20px;
      }
      & > i, & > span {
        width: 38px;
        height: 32px;
        text-align: center;
        border-radius: 48%;
        font-size: 16px;
        line-height: 32px;
        background: #f2f2f2;
      }
      & > i {
        margin-left: 20px;
        cursor: pointer;
      }
    }
    .date-add{
      margin-top: 20px;
      font-size: 16px;
      & > span {
        cursor: pointer;
        & > i {
          width: 32px;
          height: 32px;
          text-align: center;
          border-radius: 50%;
          font-size: 16px;
          line-height: 32px;
          background: #f2f2f2;
        }
      }
    }
  }
  .line{
    border-left: 1px solid #d8dce5;
    min-height: 415px
  }
}
</style>

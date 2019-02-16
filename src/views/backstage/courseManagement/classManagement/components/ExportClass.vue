<template>
  <div class="export-class">
    <div>
      <div class="export-class-btn">
        <div>
          <el-button type="primary" icon="el-icon-upload2" @click="exportTemplate">导出模板</el-button>
        </div>
        <div>
          <el-upload
            :limit="1"
            :show-file-list="false"
            :on-success="uploadSuccess"
            :file-list="fileList"
            icon="el-icon-upload2"
            action="http://192.168.1.111:9000/a/class/classAbout/viewClassExclFile">
            <el-button type="primary">导入文件</el-button>
          </el-upload>
        </div>
      </div>
      <div class="export-class-step">
        <step-bar :step-status="stepStatus" :step-info="stepInfo" :is-click="true" @stepBarStatus="stepBarStatus"/>
      </div>
    </div>
    <div class="export-class-table">
      <comm-table :data="dataList" :columns="columns" :count="count"/>
    </div>
    <div class="submit-btn">
      <div>
        <el-button type="primary" style="width: 200px" size="big" @click="importClass" >导入</el-button>
      </div>
      <div>
        <el-button style="width: 200px" size="big" @click="cancelDialog">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import StepBar from './StepBar'
import CommTable from '@/views/components/CommTable'
import tables from '@/mixin/tables'
import { getClassImportTemplate, savePxxClassBatchSetup } from '@/api/backstage/courseManagement'
import { exportExcel } from '@/utils'
export default {
  components: {
    StepBar,
    CommTable
  },
  mixins: [tables],
  data() {
    return {
      stepStatus: 0,
      stepInfo: {
        stepFirst: '文件数据总数：',
        StepTwo: '解析正确总数：',
        stepthree: '解析错误总数：'
      },
      columns: [
        { label: '解析结果', prop: 'resultName' },
        { label: '年份', prop: 'particularYearName' },
        { label: '季节', prop: 'seasonName', width: '100' },
        { label: '年级', prop: 'gradeName' },
        { label: '科目', prop: 'subjectName' },
        { label: '类别', prop: 'projectTypeName' },
        { label: '班型', prop: 'classTypeName', width: '100' },
        { label: '转班条件', prop: 'turnClassConditionName' },
        { label: '校区', prop: 'adminOrganName', width: '100' },
        { label: '老师', prop: 'teacherName' },
        { label: '工号', prop: 'teacherNo' },
        { label: '班级补充名称', prop: 'classSupplementName', width: '120' },
        { label: '分数线', prop: 'minEntryScore' },
        { label: '价格', prop: 'totalPrice' },
        { label: '招生人数', prop: 'maxStudentsNum' },
        { label: '允许超额人数', prop: 'excessNum', width: '120' },
        { label: '大班标准人数', prop: 'mobile', width: '120' },
        { label: '课程安排规律', prop: 'dateslotName', width: '150' },
        { label: '总课次', prop: 'totalPrice' },
        { label: '周期', prop: 'mobile' },
        { label: '上课时段', prop: 'timeslotName' },
        { label: 'APP显示', prop: 'mobile' },
        { label: '入学测试', prop: 'whetherAdmissionTestName' },
        { label: '允许旁听', prop: 'whetherToAttendName' },
        { label: '代收费', prop: 'whetherGenerationChargesName' },
        { label: '热门班级', prop: 'whetherHotClassName' },
        { label: '仅后台显示', prop: 'whetherShowOnlyBackstageName', width: '100' }
      ],
      dataList: [],
      exportList: [],
      fileList: []
    }
  },
  methods: {
    uploadSuccess(response, file, fileList) {
      const { list, count, errorNum, rightNum } = response.data
      this.exportList = list
      this.exportList.map(item => {
        item.resultName = item.result ? '正确' : '错误'
      })
      this.dataList = JSON.parse(JSON.stringify(this.exportList))
      this.stepInfo = {
        stepFirst: '文件数据总数：' + count,
        StepTwo: '解析正确总数：' + rightNum,
        stepthree: '解析错误总数：' + errorNum
      }
    },
    exportTemplate() {
      getClassImportTemplate({}).then(res => {
        exportExcel(res, '导班模板')
      })
    },
    stepBarStatus(val) {
      this.stepStatus = val
      if (val === 0) {
        this.dataList = this.exportList
      } else if (val === 1) {
        this.dataList = this.exportList.filter(item => item.result === true)
      } else if (val === 2) {
        this.dataList = this.exportList.filter(item => item.result === false)
      }
    },
    importClass() {
      const list = JSON.parse(JSON.stringify(this.exportList.filter(item => item.result === true)))
      if (!list.length) {
        this.$message.error('没有正确的班级')
        return
      }
      list.map(item => {
        delete item.resultName
      })
      savePxxClassBatchSetup({ pxxclasses: list }).then(({ data }) => {
        this.$message.success(data.result)
      })
    },
    cancelDialog() {
      this.$emit('closeDialog')
    }
  }
}
</script>

<style lang="scss" scoped>
.export-class{
  & > div:first-child{
    display: flex;
    position: relative;
  }
  &-btn {
    display: flex;
    & > div{
      margin-right: 20px;
    }
  }
  &-step {
    position: absolute;
    width: 100%;
  }
  &-table {
    margin-top: 20px;
  }
  .submit-btn{
    display:flex;
    justify-content: center;
    margin-top: 30px;
    & > div{
      margin-right: 20px;
    }
  }
}
</style>

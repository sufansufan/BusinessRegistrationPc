<template>
  <div class="pay-management-box">
    <div class="arrow-list-box">
      <div>
        <h5>总收入</h5>
        <count-num :num="allAmount.allPrice" class="act-color" prefix="￥"/>
      </div>
      <div>
        <h5>课程收入</h5>
        <count-num :num="allAmount.courseAmount" class="act-color" prefix="￥"/>
      </div>
      <div>
        <h5>其他收费</h5>
        <count-num :num="allAmount.otherAmount" class="act-color" prefix="￥"/>
      </div>
      <div>
        <h5>报名总人数</h5>
        <count-num :num="allAmount.signupNumberAll" :to-fixed="0" class="act-color" prefix="￥"/>
      </div>
      <div>
        <h5>报名总人次</h5>
        <count-num :num="allAmount.signupNumber" :to-fixed="0" class="act-color"/>
      </div>
      <div>
        <h5>订单总数</h5>
        <count-num :num="allAmount.orderNum" :to-fixed="0" class="act-color"/>
      </div>
    </div>
    <div class="select-tools">
      <div>
        <div>
          <el-select v-model="select.particularYear" clearable placeholder="年度">
            <el-option
              v-for="item in constant.particular_year"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div>
          <el-select v-model="select.season" clearable placeholder="季节">
            <el-option
              v-for="item in constant.season"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div>
          <el-select v-model="select.periods" clearable placeholder="期别">
            <el-option
              v-for="item in constant.periods"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div>
          <el-select v-model="select.grade" clearable placeholder="年级">
            <el-option
              v-for="item in constant.grade"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div>
          <el-select v-model="select.subject" clearable placeholder="科目">
            <el-option
              v-for="item in constant.subject"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div>
          <el-select v-model="select.projectType" clearable placeholder="类别">
            <el-option
              v-for="item in constant.project_type"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div>
          <el-select v-model="select.classType" clearable placeholder="班型">
            <el-option
              v-for="item in constant.class_type"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div>
          <el-select v-model="select.department" clearable placeholder="学部">
            <el-option
              v-for="item in constant.department_type"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div>
          <el-date-picker
            v-model="times"
            :picker-options="quickOptions"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="timestamp"
            @change="val => parseDate(val, 'startDate', 'endDate')"
          />
        </div>
        <div>
          <el-cascader
            :options="constant.campus"
            v-model="campus"
            :props="{label: 'name', value:'id'}"
            placeholder="校区"
            change-on-select
            @change="val => getLastVal(val, 'campusId')"
          />
        </div>
        <div>
          <el-input v-model="select.className" placeholder="班级名称"/>
        </div>
        <div>
          <el-input v-model="select.posNumber" placeholder="POS流水号"/>
        </div>
        <div>
          <el-input v-model="select.orderno" placeholder="订单ID"/>
        </div>
        <div>
          <el-input v-model="select.studentNameAndPhone" placeholder="学员姓名/手机号"/>
        </div>
        <div>
          <el-input v-model="select.chargeItemName" placeholder="收费内容"/>
        </div>
        <div>
          <el-select v-model="select.financeId" clearable placeholder="财务主体">
            <el-option
              v-for="item in financeList"
              :key="item.id"
              :label="item.financeName"
              :value="item.id"
            />
          </el-select>
        </div>
        <div>
          <el-button type="primary" icon="el-icon-search" @click="fetchData('search')">搜索</el-button>
        </div>
        <div>
          <el-button icon="el-icon-refresh" @click="resetSearch">重置搜索条件</el-button>
        </div>
        <div>
          <el-button type="primary" icon="el-icon-download">导出</el-button>
        </div>
      </div>
    </div>
    <comm-table :data="dataList" :columns="columns" :count="count">
      <template slot-scope="{row}">
        <div>
          <el-button type="text" @click="openDialog(row.id, row.updateDate)">修改日期</el-button>
        </div>
        <div>
          <el-button type="text" @click="modifyPrice(row.bigOrderId)">修改对应订单金额</el-button>
        </div>
      </template>
    </comm-table>
    <Dialog ref="dialog" width="400px" top="200px" title="编辑日期">
      <div>
        <div style="margin-bottom: 10px;">
          <b>订单时间</b>
        </div>
        <el-date-picker
          :clearable="false"
          :editable="false"
          v-model="selectedOrder.newDate"
          type="date"
          placeholder="选择日期"
        />
        <el-button
          :disabled="selectedOrder.oldDate === selectedOrder.newDate || !selectedOrder.newDate"
          type="primary"
          @click="editDate"
        >修改</el-button>
      </div>
    </Dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import tables from '@/mixin/tables'
import { getFinanceBodyList } from '@/api/backstage/campusManagement'
import { getAmountPaymentInfoList } from '@/api/foreground/businessQuery'
import { editPaymentRecordDate, editPaymentRecordAmount } from '@/api/finance'
import { parseTime } from '@/utils'
import Dialog from '@/components/Dialog'
export default {
  components: {
    Dialog
  },
  mixins: [tables],
  data() {
    return {
      times: [],
      campus: [],
      select: {
        operationType: 2,
        particularYear: '',
        season: '',
        periods: '',
        grade: '',
        subject: '',
        projectType: '',
        classType: '',
        department: '',
        startDate: '',
        endDate: '',
        campusId: '',
        className: '',
        posNumber: '',
        orderno: '',
        financeId: '',
        studentNameAndPhone: '',
        chargeItemName: ''
      },
      financeList: [],
      dataList: [],
      columns: [
        { label: '时间', prop: 'updateDate', width: 95 },
        { label: '支付ID', prop: 'paymentNo' },
        { label: '分期', prop: 'byStageNumber', suf: '期' },
        { label: '订单ID', prop: 'bigOrderId' },
        { label: '推荐码', prop: 'referralCode' },
        { label: '校区', prop: 'campusName' },
        { label: '财务主体', prop: 'financeName' },
        { label: '学员姓名', prop: 'studentName' },
        { label: '联系电话', prop: 'mobile', width: 100 },
        [
          { label: '班级名称', prop: 'className', width: 250 },
          { label: '收费内容', prop: 'chargeName' },
          { label: '支付/购课/总课次', prop: ['paymentAttandClass', 'buyAttandClass', 'attandClassCount'], type: 'num', width: 130 },
          { label: '当前校区/班级', prop: ['currentCampusName', 'currentClassName'], width: 200 },
          { label: '折扣', prop: 'discount', type: 'num' },
          { label: '立减', prop: 'subtractAmount', type: 'num', pre: '￥' },
          { label: '优惠券', prop: 'couponName', type: 'num', pre: '￥' },
          { label: '单价', prop: 'singlePrice', type: 'num', pre: '￥' },
          { label: '数量', prop: 'number', type: 'num' },
          { label: '应付金额', prop: 'price', type: 'num', pre: '￥', width: 100 },
          { label: '订单金额', prop: 'realPayment', type: 'num', pre: '￥', width: 100 },
          { label: '实付金额', prop: 'paidPayment', type: 'num', pre: '￥', width: 100 }
        ],
        { label: '实付总金额', prop: 'paidPaymentCount', type: 'num', pre: '￥', width: 130 },
        { label: 'POS流水号', prop: 'posNumber' },
        { label: '操作人', prop: 'updateByName' },
        { label: '操作', prop: 'operation', fixed: 'right', width: 125 }
      ],
      allAmount: {},
      selectedOrder: {
        id: null,
        oldDate: null,
        newDate: null
      }
    }
  },
  computed: {
    ...mapGetters(['constant'])
  },
  created() {
    this.$store.dispatch('getConstant', ['particular_year', 'campus', 'season', 'periods', 'grade', 'subject', 'timeslot_type', 'project_type', 'class_type', 'week_day_type', 'department_type'])
    this.fetchFinanceBody()
    this.fetchData()
  },
  methods: {
    fetchFinanceBody() {
      getFinanceBodyList({ adminOrganParentIds: 1, adminOrganStatus: true }).then(({ data }) => {
        const { list } = data
        this.financeList = list.filter(item => item.status)
      })
    },
    fetchData(type) {
      if (type === 'search') this.page = 1
      this.BFD(getAmountPaymentInfoList({
        page: this.page,
        limit: this.limit,
        ...this.select
      }).then(res => {
        const {
          count,
          result: {
            allAmount: allPrice,
            courseAmount,
            otherAmount,
            signupNumberAll,
            signupNumber,
            orderNum,
            paymentInfoList
          }
        } = res.data
        this.count = count
        this.allAmount = {
          allPrice,
          courseAmount,
          otherAmount,
          signupNumberAll,
          signupNumber,
          orderNum
        }
        this.dataList = paymentInfoList.map(item => {
          item.updateDate = parseTime(item.updateDate)
          return item
        })
      }))
    },
    openDialog(id, date) {
      const dateTime = new Date(date).getTime()
      this.selectedOrder.id = id
      this.selectedOrder.oldDate = dateTime
      this.selectedOrder.newDate = dateTime
      this.$refs.dialog.show = true
    },
    editDate() {
      editPaymentRecordDate({
        Loading: true,
        id: this.selectedOrder.id,
        currentDate: this.selectedOrder.newDate.getTime()
      }).then(() => {
        this.$message.success('修改成功~')
        this.$refs.dialog.show = false
        this.fetchData()
      })
    },
    modifyPrice(id) {
      this.$confirm('此操作将修改该订单金额, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        editPaymentRecordAmount({
          Loading: true,
          id
        }).then(() => {
          this.$message.success('修改成功~')
          this.fetchData()
        })
      }).catch(() => { })
    }
  }
}
</script>

<style lang="scss" scoped>
.pay-management-box {
  .arrow-list-box {
    margin-bottom: 10px;
  }
}
</style>

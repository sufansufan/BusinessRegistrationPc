<template>
  <div>
    <div class="select-tools">
      <div>
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
            @change="val => parseDate(val, 'operationStartDate', 'operationEndDate')"
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
          <el-select v-model="select.refundStatus" placeholder="退费状态">
            <el-option
              v-for="item in constant.refund_status"
              :key="item.id"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div>
          <el-input v-model="select.refundRecordNo" placeholder="退费单ID"/>
        </div>
        <div>
          <el-input v-model="select.studentNameAndPhone" placeholder="学员姓名/手机号"/>
        </div>
        <div>
          <el-button type="primary" @click="fetchData('search')">搜索</el-button>
        </div>
      </div>
    </div>
    <comm-table v-loading="loading" :data="dataList" :columns="columns" :count="count">
      <template slot-scope="{row}">
        <el-button
          type="text"
          @click="$router.push(`/foreground/apply/refundView/${sid}?id=${row.id}`)"
        >查看</el-button>
      </template>
    </comm-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import tables from '@/mixin/tables'
import { getBigRefundOrderList } from '@/api/foreground/apply'
import { parseTime } from '@/utils'
export default {
  mixins: [tables],
  inject: ['sid'],
  data() {
    return {
      times: '',
      campus: [],
      select: {
        operationStartDate: '',
        operationEndDate: '',
        campusId: '',
        className: '',
        refundStatus: '',
        refundRecordNo: '',
        studentNameAndPhone: ''
      },
      dataList: [],
      columns: [
        { label: '发起时间', prop: 'createDate', width: 150, fixed: 'left' },
        { label: '退费单ID', prop: 'refundRecordNo', fixed: 'left' },
        { label: '校区', prop: 'campusName', fixed: 'left' },
        { label: '财务主体', prop: 'financeName', fixed: 'left' },
        { label: '学员姓名', prop: 'studentName', fixed: 'left' },
        { label: '联系电话', prop: 'studentPhone', width: 100, fixed: 'left' },
        [
          { label: '班级名称', prop: 'className', width: 250 },
          { label: '收费内容', prop: 'chargeName', width: 150 },
          { label: '购课/总课次', prop: ['payAttendCount', 'classttendCount'], width: 150 },
          { label: '退费课次数', prop: 'refundAttendNumber', width: 150 },
          { label: '应付价格', prop: 'price', width: 150, type: 'num', pre: '￥' },
          { label: '实付价格', prop: 'realPayment', width: 150, type: 'num', pre: '￥' },
          { label: '课次退费', prop: 'classRefundAmount', width: 150, type: 'num', pre: '￥' },
          { label: '额外退费', prop: 'otherRefundAmount', width: 150, type: 'num', pre: '￥' },
          { label: '其他退费', prop: 'otherOrderRefundAmount', width: 150, type: 'num', pre: '￥' },
          { label: '退费总额', prop: 'realRefundAmount', width: 150, type: 'num', pre: '￥' }
        ],
        { label: '打款金额', prop: 'realRefundAmount' },
        { label: '状态', prop: 'statusLabel' },
        { label: '打款流水号', prop: 'remitNo', width: 100 },
        { label: '操作人', prop: 'updateByName' },
        { label: '操作', prop: 'operation', fixed: 'right' }
      ]
    }
  },
  computed: {
    ...mapGetters(['constant'])
  },
  created() {
    this.fetchData()
    this.$store.dispatch('getConstant', ['campus', 'refund_status'])
  },
  methods: {
    fetchData(type) {
      if (type === 'search') this.page = 1
      this.BFD(getBigRefundOrderList({
        studentId: this.sid,
        ...this.select,
        limit: this.limit,
        page: this.page
      }).then(res => {
        const { count, list } = res.data
        this.count = count
        this.dataList = list.map(item => {
          item.createDate = parseTime(item.createDate)
          return item
        })
      }))
    }
  }
}
</script>

<style scoped>
</style>

<template>
  <div>
    <refund-content
      :is-audit="isAudit"
      :is-edit="false"
      :order="order"
      :other-order="otherOrder"
      :attend-list="attendList"
    >
      <template slot="refundInfo">
        <div class="refund-info">
          <div>
            <div>
              <span>退费方式</span>
              <span>{{ refundInfo.refundPayTypeLabel }}</span>
            </div>
            <div>
              <span>姓名</span>
              <span>{{ refundInfo.bankCardPayee }}</span>
            </div>
            <div>
              <span>银行名称</span>
              <span>{{ refundInfo.bankName }}</span>
            </div>
            <div>
              <span>银行卡号</span>
              <span>{{ refundInfo.bankcardNo }}</span>
            </div>
            <div>银行LOGO</div>
          </div>
          <div>
            <div class="tips">
              <span>退费原因</span>
              <div>
                <span>发起人</span>
                <b>{{ refundInfo.createName }}</b>
                <b>{{ refundInfo.createDate }}</b>
              </div>
            </div>
            <p>{{ refundInfo.refundReason }}</p>
          </div>
          <div>
            <div class="tips">
              <span>备注</span>
              <div v-show="refundInfo.refundRemarkTime">
                <span>备注人</span>
                <b>{{ refundInfo.refundRemarkUserName }}</b>
                <b>{{ refundInfo.refundRemarkTime }}</b>
              </div>
            </div>
            <span v-show="!refundInfo.refundRemark" class="is-empty">暂无备注</span>
            <template v-if="!isAudit">
              <p v-if="remarkEdit">
                <el-input v-model="remark" placeholder="请输入意见"/>
                <el-button type="primary" @click="audit(0, true)">确定</el-button>
                <el-button @click="remarkEdit = false">取消</el-button>
              </p>
              <i v-else class="el-icon-edit" @click="remarkEdit = true"/>
            </template>
            <p v-show="!remarkEdit">{{ refundInfo.refundRemark }}</p>
          </div>
          <div v-if="refundInfo.createDate">
            <div v-show="refundInfo.auditTime || isAudit" class="tips">
              <span>
                审核
                <b>{{ refundInfo.auditResult === false ? '不通过' : '' }}</b>
              </span>
              <div v-show="refundInfo.auditTime">
                <span>审核人</span>
                <b>{{ refundInfo.auditUserName }}</b>
                <b>{{ refundInfo.auditTime }}</b>
              </div>
            </div>
            <span v-show="!isAudit && !refundInfo.auditTime" class="is-empty">待审核...</span>
            <p v-if="refundInfo.whetherAudit && isAudit">
              <el-input v-model="remark" placeholder="请输入意见"/>
              <el-button type="primary" @click="audit(1, true)">通过</el-button>
              <el-button @click="audit(1, false)">不通过</el-button>
            </p>
            <p v-else>{{ refundInfo.auditRemark }}</p>
          </div>
          <div v-if="refundInfo.auditTime">
            <div v-show="refundInfo.payTime || isAudit" class="tips">
              <span>
                打款
                <b>{{ refundInfo.payResult === false ? '不通过' : '' }}</b>
              </span>
              <div v-show="refundInfo.payTime">
                <span>打款人</span>
                <b>{{ refundInfo.payUserName }}</b>
                <b>{{ refundInfo.payTime }}</b>
              </div>
            </div>
            <span v-show="!isAudit && !refundInfo.payTime" class="is-empty">待打款...</span>
            <p v-if="refundInfo.whetherRemit && isAudit">
              <el-input v-model="remark" placeholder="请输入意见"/>
              <el-button type="primary" @click="audit(2, true)">通过</el-button>
              <el-button @click="audit(2, false)">不通过</el-button>
            </p>
            <p v-else>{{ refundInfo.payRemark }}</p>
          </div>
        </div>
      </template>
    </refund-content>
  </div>
</template>

<script>
import RefundContent from './RefundContent'
import { getBigRefundInfo } from '@/api/foreground/apply'
import { editBigOrder } from '@/api/finance/refundManagement'
import { parseTime, deepClone } from '@/utils'
export default {
  components: {
    RefundContent
  },
  props: {
    isAudit: {
      type: Boolean,
      default: false
    }
  },
  provide() {
    return {
      sid: this.$route.params.id
    }
  },
  data() {
    return {
      refundInfo: {},
      order: [],
      otherOrder: [],
      attendList: [],
      remark: '',
      remarkEdit: false
    }
  },
  watch: {
    'refundInfo.refundRemark'() {
      this.remark = this.refundInfo.refundRemark
      this.remarkEdit = false
    }
  },
  created() {
    this.$store.dispatch('getConstant', ['refund_pay_type', 'refund_reaon_type', 'refund_reson'])
    this.fetchData()
  },
  methods: {
    fetchData() {
      getBigRefundInfo({ Loading: true, id: this.$route.query.id }).then(res => {
        this.refundInfo = res.data.bigRefundInfo
        const { createDate, refundRemarkTime, auditTime, payTime } = this.refundInfo
        this.refundInfo.createDate = parseTime(createDate)
        this.refundInfo.refundRemarkTime = parseTime(refundRemarkTime)
        this.refundInfo.auditTime = parseTime(auditTime)
        this.refundInfo.payTime = parseTime(payTime)
        this.order = this.refundInfo.order.filter(item => {
          item.id = item.classId
          if (item.otherName) {
            this.otherOrder.push(item)
            return false
          } else {
            item.payAttend.map(item => (item.workdate = parseTime(item.workdate, 'm-d')))
            this.$set(item, '_refundNum', item.payAttend
              .filter(item => item.whetherRefund).length)
            this.$set(item, '_refundPrice', item.payAttend
              .filter(item => item.whetherRefund)
              .map(item => item.amount)
              .reduce((s, n) => +s + +n, 0))
            this.$set(item, '_otherRefundAmount', 0)
            this.$set(item, '_otherRefundRemark', '')
            this.$set(item, '_totalAmountPrice', item._refundPrice + item._otherRefundAmount)
            this.$set(item, '_refundAttendClassIds', item.payAttend.filter(item => item.whetherRefund).map(item => item.id).join(','))
          }
          return true
        })
        this.attendList = this.order.map(item => ({ [item.classId]: deepClone(item.payAttend) }))
      })
    },
    audit(type, result) {
      if (!this.remark && type !== 0) {
        this.$message.error('请输入意见后再进行操作~')
        return
      }
      editBigOrder({
        Loading: true,
        id: this.$route.query.id,
        operationType: type,
        remark: this.remark,
        result
      }).then(() => {
        this.$message.success('操作成功~')
        this.fetchData()
      })
    }
  }
}
</script>

<style lang="scss">
.refund-info {
  input {
    width: 400px !important;
  }
}
</style>
<style lang="scss" scoped>
.refund-info {
  > div {
    position: relative;
    font-size: 15px;
    &:first-child {
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
      margin-bottom: 10px;
    }
    > p {
      margin-top: 6px;
      display: flex;
      justify-content: flex-start;
    }
    i {
      position: absolute;
      right: 35px;
      font-size: 24px;
    }
    > div {
      &:last-child:not(:first-child) {
        position: absolute;
        right: -100px;
      }
      &.tips {
        width: 100%;
        display: flex;
        justify-content: space-between;
        div {
          display: flex;
          justify-content: space-between;
          b {
            padding-left: 10px;
            &:last-child {
              font-weight: 400;
            }
          }
        }
      }
      span {
        display: block;
        padding-bottom: 10px;
        &:first-child {
          color: #999;
        }
        b {
          font-weight: 400;
          color: #e01313;
          font-size: 15px;
        }
      }
    }
  }
}
</style>

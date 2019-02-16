<template>
  <div class="pay-content-box">
    <el-table
      v-if="!isOther"
      :data="dataList"
      :expand-row-keys="openAttendList"
      :row-key="row => row.id"
      stripe
      border
      style="width: 100%"
    >
      <el-table-column prop="className" label="班级名称"/>
      <el-table-column prop="date" label="剩余/总课节" width="95">
        <template slot-scope="scope">
          <span class="price-font">{{ scope.row.attendSurplus }} / {{ scope.row.totalTimes }}</span>
        </template>
      </el-table-column>
      <el-table-column label="选取课节">
        <template slot-scope="scope">
          <span
            class="act-color price-font pointer"
            @click="openAttend(scope.row.id)"
          >{{ scope.row.payAttendCount ? scope.row.payAttendCount : select.order[scope.$index].payAttend.length }}</span>
          <div v-if="isEdit">
            <el-button type="text" @click="selectedAttend(select.order[scope.$index])">一键选择</el-button>
          </div>
        </template>
      </el-table-column>
      <el-table-column type="expand" class-name="hidden" width="1">
        <template slot-scope="{row, $index}">
          <select-course
            ref="courseList"
            :scope="{row, $index, classId: row.id}"
            :is-edit="isEdit"
            :attend-list="attendList"
            :key="key"
            :order="select.order"
          />
        </template>
      </el-table-column>
      <el-table-column label="应付金额" widt="200">
        <template slot-scope="scope">
          <template v-if="isEdit">
            <count-num :num="select.order[scope.$index].price" prefix="￥"/>
          </template>
          <template v-else>
            <div class="price-font">￥{{ select.order[scope.$index].price }}</div>
          </template>
        </template>
      </el-table-column>
      <el-table-column label="折扣" width="180">
        <template slot-scope="scope">
          <div class="two-line">
            <template v-if="isEdit">
              <el-input-number
                v-model="select.order[scope.$index].discount"
                :precision="1"
                :min="1"
                :max="10"
                controls-position="right"
              />
              <el-input v-model="select.order[scope.$index].discountReason" placeholder="备注"/>
            </template>
            <template v-else>
              <div class="price-font">{{ select.order[scope.$index].discount }}</div>
              <div>{{ select.order[scope.$index].discountReason || '无' }}</div>
            </template>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="立减" width="180">
        <template slot-scope="scope">
          <div class="two-line">
            <template v-if="isEdit">
              <el-input-number
                v-model="select.order[scope.$index].subtractAmount"
                :precision="2"
                :min="0"
                :max="select.order[scope.$index].price * (select.order[scope.$index].discount / 10)"
                controls-position="right"
              />
              <el-input v-model="select.order[scope.$index].subtractReason" placeholder="备注"/>
            </template>
            <template v-else>
              <div class="price-font">￥{{ select.order[scope.$index].subtractAmount }}</div>
              <div>{{ select.order[scope.$index].subtractReason || '无' }}</div>
            </template>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="优惠卷" width="150">
        <template slot-scope="scope">
          <template v-if="isEdit">
            <el-select :disabled="true" v-model="scope.$index" placeholder="请选择">
              <el-option
                v-for="item in []"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </template>
          <template v-else>
            <div class="price-font">￥0.00</div>
          </template>
        </template>
      </el-table-column>
      <el-table-column label="实付金额" widt="200">
        <template slot-scope="scope">
          <template v-if="isEdit">
            <count-num :num="select.order[scope.$index].realPayment" prefix="￥"/>
          </template>
          <template v-else>
            <div class="price-font">￥{{ select.order[scope.$index].realPayment }}</div>
          </template>
        </template>
      </el-table-column>
      <el-table-column v-if="isEdit" label="操作" width="100">
        <template slot-scope="scope">
          <el-button type="text" @click="delOrder(scope.row.carId)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <other-pay-item :other-order="select.otherOrder" :is-edit="isEdit"/>
    <div class="pay-content-box-bottom">
      <div>
        <template v-if="!isOther">
          <h3>推荐码</h3>
          <template v-if="isEdit">
            <el-input v-model="select.referralCode" style="width: 300px;" placeholder="请输入"/>
          </template>
          <template v-else>
            <div class="price-font">{{ select.referralCode }}</div>
            <span v-show="!select.referralCode" class="is-empty">未填写</span>
          </template>
        </template>
        <!-- <h3>优惠卷列表</h3>
        <el-scrollbar style="width: 580px;">
          <div class="coupon-list">
            <div class="act-color act-border">
              <h1>
                <span>￥</span>
                <span class="price-font">300</span>
              </h1>
              <h5>2018暑期二年级数学</h5>
              <div class="bottom">
                <span>全国</span>
                <span>可叠加</span>
              </div>
              <i class="act-bg el-icon-check"/>
            </div>
            <div class="act-color">
              <h1>
                <span>￥</span>
                <span class="price-font">300</span>
              </h1>
              <h5>2018暑期二年级数学</h5>
              <div class="bottom">
                <span>全国</span>
                <span>可叠加</span>
              </div>
            </div>
            <div>
              <h1>
                <span>￥</span>
                <span class="price-font">300</span>
              </h1>
              <h5>2018暑期二年级数学</h5>
              <div class="bottom">
                <span>全国</span>
                <span>可叠加</span>
              </div>
            </div>
          </div>
        </el-scrollbar>-->
        <template v-if="!isEdit">
          <div :style="{opacity: !isOther ? '1' : '0'}">
            <h3>分期支付</h3>
            <by-stages :by-stages="byStagesList"/>
          </div>
          <el-tabs v-model="paymentMode" class="payment-mode">
            <el-tab-pane label="普通收款" name="ordinary">
              <el-form
                ref="payType"
                :inline="true"
                :model="payParams"
                :rules="rules"
                label-position="top"
              >
                <el-form-item label="收费方式" prop="paymentType">
                  <el-select v-model="payParams.paymentType" placeholder="请选择">
                    <el-option
                      v-for="item in constant.payment_type"
                      :key="item.id"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="POS流水号" prop="posNumber">
                  <el-input v-model="payParams.posNumber" placeholder="请输入"/>
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane :disabled="true" label="智能POS机" name="intelligent">
              <el-form :inline="true" :model="select" label-position="top">
                <el-form-item label="选择POS机">
                  <el-select v-model="select.region" placeholder="请选择">
                    <el-option label="微信" value="shanghai"/>
                    <el-option label="刷卡" value="beijing"/>
                  </el-select>
                </el-form-item>
                <el-form-item label="收费方式" prop="paymentType">
                  <el-select v-model="payParams.paymentType" placeholder="请选择">
                    <el-option
                      v-for="item in constant.payment_type"
                      :key="item.id"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="POS流水号">
                  <el-input v-model="select.user" placeholder="请输入"/>
                </el-form-item>
              </el-form>
            </el-tab-pane>
          </el-tabs>
        </template>
      </div>
      <div class="pay-total-box">
        <template v-if="!isOther">
          <h3>购课项合计</h3>
          <p>
            <span>应付金额</span>
            <count-num :num="amountPayable" prefix="￥"/>
          </p>
          <p>
            <span>优惠金额</span>
            <count-num :num="discountTotalPrice" prefix="￥"/>
          </p>
        </template>
        <h3>收费项合计</h3>
        <p>
          <span>实付金额</span>
          <count-num :num="otherTotalPrice" prefix="￥"/>
        </p>
        <div class="total">
          <h2>共计</h2>
          <count-num :num="totalAmount" :size="24" prefix="￥"/>
        </div>
        <div v-if="!isEdit && !isOther" class="total">
          <h2>本期支付</h2>
          <count-num :num="currentPayment" :size="24" prefix="￥"/>
        </div>
        <div class="btn">
          <template v-if="isEdit">
            <el-button v-if="!isOther" size="medium" @click="signUp('goback')">稍后在缴</el-button>
            <el-button type="primary" size="medium" @click="signUp">立即支付</el-button>
          </template>
          <template v-else>
            <el-button size="medium" @click="$emit('update:isEdit', true)">上一步</el-button>
            <el-button type="primary" size="medium" @click="goPayment">去支付</el-button>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import {
  signUp,
  getClassAttendList,
  paymentComplete
} from '@/api/foreground/apply'
import { parseTime } from '@/utils'
import OtherPayItem from './OtherPayItem'
import ByStages from './ByStages'
import SelectCourse from './SelectCourse'
export default {
  inject: ['sid'],
  components: {
    OtherPayItem,
    ByStages,
    SelectCourse
  },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    isOther: {
      type: Boolean,
      default: false
    },
    dataList: {
      type: Array,
      default: () => []
    },
    byStages: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      key: 1,
      attendList: {},
      openAttendList: [],
      select: {
        referralCode: '',
        studentId: '',
        bigOrderId: '',
        order: [],
        otherOrder: []
      },
      payParams: {
        bigOrderId: '',
        orderIds: '',
        otherOrderIds: '',
        byStages: '',
        posNumber: '',
        paymentType: ''
      },
      rules: {
        paymentType: [{ required: true, message: '请选择收费方式', trigger: 'change' }],
        posNumber: [{ required: true, message: '请输入POS流水号', trigger: 'blur' }]
      },
      paymentMode: 'ordinary',
      byStagesList: [],
      currentPayment: 0
    }
  },
  computed: {
    ...mapGetters(['constant']),
    amountPayable() {
      return this.select.order.map(item => item.price)
        .reduce((s, n) => +s + +n, 0)
    },
    discountTotalPrice() {
      return this.amountPayable - this.select.order.map(item => item.realPayment)
        .reduce((s, n) => +s + +n, 0)
    },
    otherTotalPrice() {
      return this.select.otherOrder.map(item => item.realPayment)
        .reduce((s, n) => +s + +n, 0)
    },
    totalAmount() {
      return this.amountPayable - this.discountTotalPrice + this.otherTotalPrice
    },
    oid() {
      return this.$route.query.oid || ''
    }
  },
  watch: {
    dataList: {
      handler() {
        this.select.order = this.dataList.map(item => {
          const { id, classId = '' } = item
          return {
            id: classId && id,
            classId: classId || id,
            payAttend: [],
            price: 0,
            realPayment: 0,
            discount: 10,
            discountReason: '',
            subtractAmount: 0,
            subtractReason: ''
          }
        })
      },
      deep: true,
      immediate: true
    },
    'select.order': {
      handler() {
        this.select.order.forEach(item => {
          item.realPayment = item.price * (item.discount / 10) - item.subtractAmount
        })
      },
      deep: true
    },
    byStages: {
      handler() {
        this.byStagesList = JSON.parse(JSON.stringify(this.byStages))
        this.byStagesList.some(item => {
          if (item.paymentStatus !== '2') {
            item._selected = true
            return true
          }
          return false
        })
      },
      deep: true
    },
    byStagesList: {
      handler() {
        this.$nextTick(() => {
          this.currentPayment = this.byStagesList
            .filter(item => item._selected)
            .map(item => item._price)
            .reduce((s, n) => +s + +n, 0)
        })
      },
      deep: true
    }
  },
  created() {
    this.$store.dispatch('getConstant', 'payment_type')
    this.select.studentId = this.sid
  },
  methods: {
    async selectedAttend(row) {
      if (!this.attendList[row.classId]) {
        await this.openAttend(row.classId, true)
      }
      this.$nextTick(() => {
        this.$refs.courseList && this.$refs.courseList.selectedAttend('all', row)
      })
    },
    openAttend(classId, isExpand = true) {
      if (isExpand) {
        const list = this.openAttendList
        const index = list.findIndex(item => item === classId)
        if (index > -1) {
          list.splice(index, 1)
          return
        }
        list.push(classId)
      }
      if (!this.attendList[classId] || !this.attendList[classId].length) {
        return getClassAttendList({ classId, studentId: this.sid }).then(res => {
          this.attendList[classId] = res.data.attendList.map((item, index) => {
            item.workdate = parseTime(item.workdate, 'm-d')
            item.statusName = item.status === '1' ? '已付' : item.status === '2' ? '未付' : '未买'
            return item
          })
          this.key = this.key + 1
        })
      }
    },
    delOrder(id) {
      this.$confirm('此操作将删除该报名, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('delCourseCart', { id, studentId: this.sid }).then(() => {
          this.$emit('update')
          this.$message.success('删除成功!')
        })
      }).catch(() => { })
    },
    signUp(type) {
      if (!this.isOther && !this.select.order.length && !this.select.otherOrder.length) {
        this.$message.error('没有结算内容！请返回报名或增加收费项')
        return
      } else if (this.isOther && !this.select.otherOrder.length) {
        this.$message.error('没有结算内容！请增加收费项')
        return
      } else if (this.select.order.some(item => !item.payAttend.length)) {
        this.$message.error('有班级未选择课次！')
        return
      } else if (this.select.otherOrder.some(item => !item.chargeId)) {
        this.$message.error('有收费项未选择收费内容！')
        return
      }
      signUp({
        Loading: true,
        ...this.select
      }).then(res => {
        if (type === 'goback') {
          this.$router.go(-1)
          return
        }
        const { bigOrderId, byStages, order, otherOrder } = res.data.signUpInfo
        this.select.bigOrderId = bigOrderId
        this.payParams.bigOrderId = bigOrderId
        this.byStagesList = byStages.map((item, index) => {
          if (index === 0) this.$set(item, '_selected', true)
          item._price = item.otherRealPayment + item.realPayment
          item._time = parseTime(item.startDate, 'm') + '-' + parseTime(item.endDate, 'm')
          return item
        })
        this.select.order.forEach((item, index) => {
          item.id = order[index]
        })
        this.select.otherOrder.forEach((item, index) => {
          item.id = otherOrder[index]
        })
        this.$emit('update:isEdit', false)
      })
    },
    goPayment() {
      this.$refs.payType.validate().then(() => {
        const orderIds = this.select.order.map(item => item.id).join(',')
        const otherOrderIds = this.select.otherOrder.map(item => item.id).join(',')
        const byStagesIds = this.byStagesList.filter(item => item._selected).map(item => item.id).join(',')
        const pay = this.payParams
        pay.orderIds = orderIds
        pay.otherOrderIds = otherOrderIds
        pay.byStages = byStagesIds
        if (this.oid) pay.bigOrderId = this.oid
        console.log(pay)

        paymentComplete({
          Loading: true,
          ...pay
        }).then(() => {
          this.$message.success('支付完成')
          this.$router.push({ path: '/foreground/apply/student/order/' + this.sid })
        })
      }).catch(() => { })
    }
  }
}
</script>

<style lang="scss">
.coupon-list {
  i.act-bg {
    width: 0;
    height: 0;
    border-top: 25px solid #fff;
    border-right: 25px solid transparent;
    position: absolute;
    right: 0;
    bottom: 0;
    color: #fff !important;
    &::before {
      position: absolute;
      top: -16px;
      right: -25px;
    }
  }
}
.pay-content-box {
  .payment-mode {
    .el-tabs__header {
      margin-bottom: 0px;
    }
    .el-form-item {
      margin-bottom: 10px;
    }
    .el-tabs__content {
      padding-left: 10px;
      > div {
        padding-bottom: 20px;
      }
    }
    label {
      padding-bottom: 0 !important;
    }
  }
  .hidden i {
    display: none;
  }
}
</style>
<style lang="scss" scoped>
.pay-content-box {
  &-bottom {
    padding-top: 20px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    > div:first-child {
      align-self: flex-start;
    }
  }
  > h3 {
    padding-top: 20px;
  }
  .price-font {
    font-size: 18px;
  }
  .two-line {
    display: flex;
    flex-wrap: wrap;
    > div {
      &:first-child {
        width: 100px;
        &.price-font {
          &,
          & + div {
            width: 100%;
          }
        }
        margin-bottom: 9px;
      }
    }
  }
  .coupon-list {
    display: flex;
    flex-wrap: wrap;
    width: 580px;
    max-height: 230px;
    padding: 10px 0 0 10px;
    > div {
      width: 180px;
      height: 100px;
      border: 1px solid #f3f3f3;
      box-shadow: 0 0 10px #eee;
      overflow: hidden;
      border-radius: 6px;
      position: relative;
      margin: 0 10px 10px 0;
      color: #bbb;
      background: #fff;
      &:not(.act-color) {
        background: #e5e5e5;
      }
      h1 {
        margin: 10px 0 5px 0;
        text-align: center;
        span {
          &:first-child {
            font-size: 20px;
          }
          &:last-child {
            margin-left: -10px;
            font-size: 1em;
          }
        }
      }
      h5 {
        margin: 0;
        padding: 0 7px;
      }
      .bottom {
        position: absolute;
        bottom: 3px;
        left: 5px;
        font-size: 12px;
        span {
          padding-right: 10px;
        }
      }
    }
  }
  .pay-total-box {
    width: 400px;
    > p {
      padding-left: 20px;
    }
    > p,
    .total {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .total {
      border-top: 1px solid #ddd;
    }
    .btn {
      text-align: center;
      > button {
        width: 40%;
      }
    }
  }
}
</style>

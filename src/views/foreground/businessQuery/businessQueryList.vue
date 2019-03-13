<template>
  <div class="payment-refund-overview">
    <div class="select-tools">
      <div>
        <div>
          <el-autocomplete
            v-model="userSearchVal"
            :fetch-suggestions="querySearch"
            placeholder="操作人"
            clearable
            @select="item => select.opeId = item.id"
          />
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
          <el-radio-group v-model="radioIndex" size="big">
            <el-radio-button label="0">订单数</el-radio-button>
            <el-radio-button label="1">长期班报名人数</el-radio-button>
            <el-radio-button label="2">短期班等报名人数</el-radio-button>
            <el-radio-button label="3">转班人数 出/入</el-radio-button>
            <el-radio-button label="4">调课人数 出/入</el-radio-button>
            <el-radio-button label="5">退费人数</el-radio-button>
            <el-radio-button label="6" class="grade">
              <el-select
                v-model="select.grade"
                size="mini"
                placeholder="年级"
                @change="val => radioIndex = 6"
              >
                <el-option
                  v-for="item in constant.grade"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <span>年级缴费人数</span>
            </el-radio-button>
            <el-radio-button label="7">年级总人数</el-radio-button>
          </el-radio-group>
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
    <comm-table :data="dataList" :columns="columns" :count="count"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import tables from '@/mixin/tables'
import { getStudentBusinessList } from '@/api/foreground'
import { getSysUserList } from '@/api/configure/userManagement'
import { parseTime } from '@/utils'
export default {
  name: 'PaymentRefundOverview',
  mixins: [tables],
  data() {
    return {
      times: [],
      campus: [],
      radioIndex: null,
      radioArr: [
        'whetherChangeClass',
        'whetherLongTermCourse',
        'whetherShortTermCourse',
        'whetherRefund',
        'whetherRefundTimes',
        'whetherTurnClass',
        'whetherAllGrade'
      ],
      select: {
        opeId: '',
        startDate: '',
        endDate: '',
        adminOrganIds: '',
        grade: '1'
      },
      dataList: [],
      columns: [
        { label: '学员姓名', prop: 'studentName' },
        { label: '学员编号', prop: 'studentNo' },
        { label: '性别', prop: 'studentSexName' },
        { label: '年级', prop: 'studentGradeName' },
        { label: '出生日期', prop: 'studentBirthday' },
        { label: '就读学校', prop: 'oldAttendClassName' },
        { label: '所属校区', prop: 'adminOrganName' },
        { label: '联系电话', prop: 'studentMobile' },
        { label: '父亲电话', prop: 'studentFatherMobile' },
        { label: '母亲电话', prop: 'studentMotherMobile' },
        { label: '已结课/在读/已支付', prop: ['classEndNum', 'classInNum', 'classPayNum'], width: 150, type: 'num' }
      ],
      userSearchVal: '',
      users: []
    }
  },
  computed: {
    ...mapGetters(['constant'])
  },
  created() {
    this.$store.dispatch('getConstant', ['campus', 'grade'])
    this.fetchData()
    this.getUserList()
  },
  methods: {
    getUserList() {
      getSysUserList({
        status: true
      }).then(res => {
        this.users = res.data.list.map(item => {
          item.value = item.userName
          return item
        })
      })
    },
    fetchData(type) {
      this.select = Object.assign({}, this.select,
        ...this.radioArr.map((item, index) => ({ [item]: String(index) === this.radioIndex })))
      if (type === 'search') this.page = 1
      this.BFD(getStudentBusinessList({
        page: this.page,
        limit: this.limit,
        ...this.select
      }).then(res => {
        const { count, list } = res.data
        this.count = count
        this.dataList = list.map(item => {
          item.studentBirthday = parseTime(item.studentBirthday, 'y-m-d')
          return item
        })
      }))
    },
    querySearch(queryString, cb) {
      var users = this.users
      var results = queryString ? users.filter(item => item.userName.includes(queryString)) : users
      cb(results)
    }
  }
}
</script>

<style lang="scss">
.payment-refund-overview {
  .grade {
    .el-radio-button__inner {
      padding: 3px 5px 2px 3px;
    }
    .el-select,
    .el-input {
      width: 85px;
    }
  }
}
</style>
<style lang="scss" scoped>
.payment-refund-overview {
  &-charts {
    padding: 20px 0;
  }
  .grade {
    .el-radio-button__inner {
      padding: 0;
    }
  }
}
</style>

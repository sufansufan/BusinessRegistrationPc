/**
* Author: DanSmile
* Date: 2019/3/12
* Time: 11:12
*/
<template>
  <div>
    <div class="select-tools">
      <div>
        <div>
          <el-select v-model="select.particularYear" placeholder="年度">
            <el-option
              v-for="item in constant.particular_year"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div>
          <el-select v-model="select.season" placeholder="季节">
            <el-option
              v-for="item in constant.season"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div>
          <el-select v-model="select.periods" placeholder="期别">
            <el-option
              v-for="item in constant.periods"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div>
          <el-select v-model="select.grade" placeholder="年级">
            <el-option
              v-for="item in constant.grade"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div>
          <el-select v-model="select.subject" placeholder="科目">
            <el-option
              v-for="item in constant.subject"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div>
          <el-select v-model="select.projectType" placeholder="类别">
            <el-option
              v-for="item in constant.project_type"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div>
          <el-select v-model="select.classType" placeholder="班型">
            <el-option
              v-for="item in constant.class_type"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div>
          <el-select v-model="select.department" placeholder="学部">
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
            v-model="select.name"
            placeholder="名称"
            @keyup.enter.native="fetchData('search')"
          />
        </div>
        <div>
          <el-date-picker
            v-model="select.openDate"
            type="daterange"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="启用开始日期"
            end-placeholder="结束日期"/>
        </div>
        <div>
          <el-date-picker
            v-model="select.closeDate"
            type="daterange"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="截止开始日期"
            end-placeholder="结束日期"/>
        </div>
        <div>
          <el-select v-model="select.couponStatus" placeholder="状态">
            <el-option :value="1" label="未用"/>
            <el-option :value="2" label="已用"/>
            <el-option :value="3" label="停用"/>
          </el-select>
        </div>
        <div>
          <el-cascader
            :options="constant.campus"
            v-model="select.campusId"
            :props="{label: 'name', value:'id'}"
            placeholder="校区"
            change-on-select
          />
        </div>
        <div class="inline">
          <el-button type="primary" icon="el-icon-plus" @click="modify('', 'add')">新增</el-button>
          <el-button type="primary" icon="el-icon-search" @click="fetchData('search')">搜索</el-button>
          <el-button icon="el-icon-refresh" @click="resetSearch">重置搜索条件</el-button>
        </div>
      </div>
    </div>
    <comm-table v-loading="loading" :data="dataList" :columns="columns" :count="count">
      <div slot-scope="scope">
        <el-button type="text" @click="modify(scope.row, 'edit')">编辑</el-button>
        <el-button type="text" @click="deleteProject(scope.row.id)">删除</el-button>
        <el-button type="text" @click="modifyStatus(scope.row)">{{ scope.row.status == true ? '停用' : '启用' }}</el-button>
      </div>
    </comm-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import tables from '@/mixin/tables'
import CommTable from '@/views/components/CommTable'
import { getCouponTemplateList } from '@/api/subject/discountCoupon'
import { parseTime } from '@/utils'
export default {
  name: 'CouponTemplate',
  components: {
    CommTable
  },
  mixins: [tables],
  data() {
    return {
      select: {
        particularYearForIdentity: '',
        adminOrganIds: [],
        seasonForIdentity: '',
        periodsForIdentity: '',
        name: '',
        gradeForIdentity: '',
        subjectForIdentity: '',
        projectTypeForIdentity: '',
        classTypeForIdentity: '',
        openDate: [],
        closeDate: [],
        couponStatus: '',
        campusId: []
      },
      columns: [
        { label: '模板名称', prop: 'couponName', width: '100' },
        { label: '校区', prop: 'campusName' },
        { label: '年度', prop: 'particularYear', type: 'num' },
        { label: '季节', prop: 'season' },
        { label: '期别', prop: 'periods' },
        { label: '年级', prop: 'grade' },
        { label: '科目', prop: 'subject' },
        { label: '类别', prop: 'projectType' },
        { label: '班型', prop: 'classType' },
        { label: '学部', prop: 'department' },
        { label: '启用日期', prop: 'startDate', width: '150',
          render: (h, row, index) => {
            return h('span', { }, parseTime(row.startDate, 'y-m-d h:i:s'))
          } },
        { label: '截止日期', prop: 'endDate', width: '150',
          render: (h, row, index) => {
            return h('span', { }, parseTime(row.endDate, 'y-m-d h:i:s'))
          } },
        { label: '优惠金额', prop: 'amount' },
        { label: '是否可叠加', prop: 'whetherSuperposition', width: '100', render: (h, row, index) => {
          return h('div', { class: 'sequence-box' }, [
            this.renderStateTag(row.whetherSuperposition ? '是' : '否', true)
          ])
        } },
        { label: '操作人', prop: 'createBy' },
        { label: '操作日期', prop: 'createDate', width: '150',
          render: (h, row, index) => {
            return h('span', { }, parseTime(row.createDate, 'y-m-d h:i:s'))
          } },
        { label: '状态', prop: 'status' },
        { label: '操作', prop: 'operation', fixed: 'right', width: '160' }
      ],
      campusProps: {
        value: 'id',
        label: 'name'
      },
      dataList: []
    }
  },
  computed: {
    ...mapGetters(['constant'])
  },
  created() {
    this.$store.dispatch('getConstant', ['particular_year', 'campus', 'season', 'periods', 'grade', 'subject', 'project_type', 'class_type', 'department_type']).then(() => { })
    this.fetchData()
  },
  methods: {
    fetchData(type) {
      if (type === 'search') this.page = 1
      const { adminOrganIds, campusId, openDate, closeDate } = JSON.parse(JSON.stringify(this.select))
      const params = {
        page: this.page,
        limit: this.limit,
        ...this.select,
        openStartDate: openDate.length ? openDate[0] : '',
        openEndDate: openDate.length === 2 ? openDate[1] : '',
        closeStartDate: closeDate.length ? closeDate[0] : '',
        closeEndDate: closeDate.length === 2 ? closeDate[1] : '',
        adminOrganIds: adminOrganIds.length ? adminOrganIds.pop() : '',
        campusId: campusId.length ? campusId.pop() : ''
      }
      delete params.openDate
      delete params.closeDate
      this.BFD(getCouponTemplateList(params).then(res => {
        const { count, list } = res.data
        this.count = count
        this.dataList = list
      }))
    }
  }
}
</script>

<style scoped>

</style>

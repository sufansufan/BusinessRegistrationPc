<template>
  <div class="pos-status-box">
    <div class="select-tools">
      <div>
        <div>
          <el-input v-model="select.posNumber" placeholder="编号"/>
        </div>
        <div>
          <el-select v-model="select.status" placeholder="状态">
            <el-option :value="true" label="启用"/>
            <el-option :value="false" label="停用"/>
          </el-select>
        </div>
        <div>
          <el-cascader
            :options="constant.campus"
            v-model="campus"
            :props="{value: 'id', label: 'name'}"
            placeholder="行政区划"
            change-on-select
            clearable
            @change="val => getLastVal(val, 'campusId')"
          />
        </div>
      </div>
      <div class="btn">
        <div>
          <el-button type="primary" icon="el-icon-search" @click="fetchData('search')">搜索</el-button>
        </div>
        <div>
          <el-button icon="el-icon-refresh" @click="resetSearch">重置搜索条件</el-button>
        </div>
        <div>
          <el-button type="primary" icon="el-icon-sort">更新状态</el-button>
        </div>
      </div>
    </div>
    <el-table :data="dataList" stripe border style="width: 100%">
      <el-table-column prop="posNumber" label="POS机编号"/>
      <el-table-column prop="campusName" label="所属校区" width="250"/>
      <el-table-column label="当前状态">
        <template slot-scope="{row}">
          <span v-html="row.statusHtm"/>
        </template>
      </el-table-column>
      <el-table-column prop="updateDate" label="更新日期"/>
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
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import tables from '@/mixin/tables'
import { getPosList } from '@/api/configure'
import { parseTime } from '@/utils'
export default {
  mixins: [tables],
  data() {
    return {
      campus: [],
      select: {
        posNumber: '',
        campusId: '',
        status: ''
      },
      dataList: []
    }
  },
  computed: {
    ...mapGetters(['constant'])
  },
  created() {
    this.$store.dispatch('getConstant', 'campus')
    this.fetchData()
  },
  methods: {
    fetchData(type) {
      if (type === 'search') this.page = 1
      this.BFD(getPosList({
        page: this.page,
        limit: this.limit,
        ...this.select
      }).then(res => {
        const { count, list } = res.data
        this.count = count
        this.dataList = list.map(item => {
          item.statusHtm = this.renderStateTag(item.status ? '启用' : '停用')
          item.updateDate = parseTime(item.updateDate)
          return item
        })
      }))
    }
  }
}
</script>

<style scoped>
</style>

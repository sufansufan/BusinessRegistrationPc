<template>
  <div class="pos-management-box">
    <div class="select-tools">
      <div class="btn">
        <div>
          <el-button type="primary" icon="el-icon-plus" @click="posSetting">新增</el-button>
        </div>
      </div>
    </div>
    <el-table
      :data="dataList"
      stripe
      border
      style="width: 100%"
      @selection-change="val => multipleSelection = val"
    >
      <el-table-column type="selection" width="55"/>
      <el-table-column prop="posNumber" label="POS机编号"/>
      <el-table-column prop="remarks" label="备注" width="250"/>
      <el-table-column prop="campusName" label="所属校区"/>
      <el-table-column label="状态">
        <template slot-scope="{row}">
          <span v-html="row.statusHtm"/>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="130" fixed="right">
        <template slot-scope="{row}">
          <el-button type="text" @click="posSetting('edit', row)">编辑</el-button>
          <el-button type="text" @click="delPos(row.id)">删除</el-button>
          <el-button
            type="text"
            @click="switchStatus(row.id, row.status)"
          >{{ row.status ? '停用' : '启用' }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="all-del">
      <el-button :disabled="!multipleSelection.length" type="primary" @click="delPos('all')">批量删除</el-button>
    </div>
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
    <Dialog ref="dialog" width="478px">
      <el-form :inline="true" :model="posManagementForm" label-position="top">
        <el-form-item label="POS机编号">
          <el-input v-model="posManagementForm.posNumber" placeholder="POS机编号"/>
        </el-form-item>
        <el-form-item label="所属校区">
          <el-cascader
            :options="constant.campus"
            v-model="campus"
            :props="{value: 'id', label: 'name'}"
            placeholder="行政区划"
            change-on-select
            clearable
            style="width: 200px;"
            @change="val => getLastVal(val, 'campusId', 'posManagementForm')"
          />
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="posManagementForm.remarks" placeholder="备注" style="width: 410px;"/>
        </el-form-item>
        <el-form-item class="btn">
          <el-button type="primary" @click="editPos">确定</el-button>
          <el-button @click="$refs.dialog.show = false">取消</el-button>
        </el-form-item>
      </el-form>
    </Dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import tables from '@/mixin/tables'
import Dialog from '@/components/Dialog'
import { getPosList, editPosStatus, addAndEditPos, delPos } from '@/api/configure'
import { parseTime, id2Level } from '@/utils'
export default {
  components: {
    Dialog
  },
  mixins: [tables],
  data() {
    return {
      multipleSelection: [],
      dataList: [],
      campus: [],
      posManagementForm: {
        id: '',
        posNumber: '',
        campusId: '',
        remarks: ''
      }
    }
  },
  computed: {
    ...mapGetters(['constant'])
  },
  created() {
    this.fetchData()
  },
  methods: {
    posSetting(type, row) {
      const dialog = this.$refs.dialog
      dialog.setTitle('新增POS机')
      this.campus = []
      this.posManagementForm = {
        id: '',
        posNumber: '',
        campusId: '',
        remarks: ''
      }
      if (type === 'edit') {
        dialog.setTitle('编辑POS机')
        for (const i in this.posManagementForm) {
          this.posManagementForm[i] = row[i]
        }
        this.campus = id2Level(this.constant.campus, this.posManagementForm.campusId)
      }
      dialog.show = true
    },
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
    },
    switchStatus(id, status) {
      editPosStatus({
        Loading: true,
        id,
        status: !status
      }).then(() => {
        this.$message.success('修改状态成功~')
        this.fetchData()
      })
    },
    editPos() {
      addAndEditPos({
        Loading: true,
        ...this.posManagementForm
      }).then(() => {
        this.$message.success('操作成功~')
        this.$refs.dialog.show = false
        this.fetchData()
      })
    },
    delPos(ids) {
      if (ids === 'all') ids = this.multipleSelection.map(item => item.id).join(',')
      this.$confirm('是否删除该POS机?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delPos({
          Loading: true,
          ids
        }).then(() => {
          this.$message.success('操作成功~')
          this.fetchData()
        })
      }).catch(() => { })
    }
  }
}
</script>

<style lang="scss" scoped>
.pos-management-box {
  .all-del {
    margin: 22px 0;
  }
}
</style>

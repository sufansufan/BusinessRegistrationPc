<template>
  <div class="rate-setting">
    <div class="select-tools">
      <div/>
      <div class="btn">
        <div>
          <el-button type="primary" icon="el-icon-plus" @click="openDialog('add')">新增</el-button>
        </div>
      </div>
    </div>
    <comm-table :data="dataList" :columns="columns" :count="count">
      <template slot-scope="{row}">
        <div>
          <el-button type="text" @click="openDialog('edit', row)">编辑</el-button>
          <el-button type="text" @click="deleteRow(row.id)">删除</el-button>
          <el-button type="text" @click="handStatus(row)">{{ row.status === true ? '停用' : '启用' }}</el-button>
        </div>
      </template>
    </comm-table>
    <Dialog ref="dialog" width="30%" top="200px">
      <el-form ref="rateForm" :model="rateForm" label-position="top">
        <el-form-item label="支付方式">
          <el-select v-model="rateForm.payTypeName" clearable placeholder="选择支付方式" style="width: 100%">
            <el-option
              v-for="item in constant.payment_type"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="手续费率">
          <el-input v-model="rateForm.procedureCost" style="width: 97.5%"/>%
        </el-form-item>
        <el-form-item label="封顶金额">
          <el-input v-model="rateForm.capAmount"/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" size="big" @click="saveRate">确 定</el-button>
        <el-button size="big" @click="$refs.dialog.show = false">取 消</el-button>
      </span>
    </Dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import tables from '@/mixin/tables'
import { getRateList, addAndEditRate, editRateStatus, deleteRate } from '@/api/finance/rateSetting'
import Dialog from '@/components/Dialog'
export default {
  name: 'RateSetting',
  components: {
    Dialog
  },
  mixins: [tables],
  data() {
    return {
      dataList: [],
      columns: [
        { label: '支付方式', prop: 'payTypeNameLabel' },
        { label: '手续费率', prop: 'procedureCost' },
        { label: '封顶金额', prop: 'capAmount' },
        { label: '状态', prop: 'statusLabel' },
        { label: '操作', prop: 'operation', fixed: 'right' }
      ],
      rateForm: {
        id: '',
        payTypeName: '',
        procedureCost: '',
        capAmount: ''
      },
      rateFormDeep: {}
    }
  },
  computed: {
    ...mapGetters(['constant'])
  },
  created() {
    this.$store.dispatch('getConstant', 'payment_type')
    this.rateFormDeep = JSON.parse(JSON.stringify(this.rateForm))
    this.fetchData()
  },
  methods: {
    fetchData() {
      const params = {
        Loading: true,
        page: this.page,
        limit: this.limit
      }
      this.BFD(getRateList({ ...params }).then(({ data: { list, count }}) => {
        this.dataList = list
        this.dataList.map(item => {
          item.payTypeNameLabel = this.constant.payment_type.filter(val => val.value === item.payTypeName)[0].label
          item.statusLabel = this.renderStateTag(item.status ? '启用' : '停用', true)
          return item
        })
        this.count = count
      }))
    },
    openDialog(type, row) {
      if (type === 'add') {
        this.$refs.dialog.setTitle = '新增费率'
        this.rateForm = JSON.parse(JSON.stringify(this.rateFormDeep))
      } else {
        this.$refs.dialog.setTitle = '编辑费率'
        const { id, capAmount, procedureCost, payTypeName } = row
        this.rateForm = {
          id,
          capAmount,
          procedureCost,
          payTypeName
        }
      }
      this.$refs.dialog.show = true
    },
    saveRate() {
      this.$refs.rateForm.validate(valid => {
        if (valid) {
          const { id } = this.rateForm
          addAndEditRate(this.rateForm).then(res => {
            id ? this.$message.success('编辑成功') : this.$message.success('新增成功')
            this.$refs.dialog.show = false
            this.fetchData()
          })
        } else {
          return false
        }
      })
    },
    deleteRow(id) {
      this.$confirm('是否删除该数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteRate({ id }).then(res => {
          this.$message.success('删除成功')
          this.fetchData()
        })
      }).catch(() => {
        return false
      })
    },
    handStatus(row) {
      this.$confirm('是否进行状态修改?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        editRateStatus({
          id: row.id,
          status: row.status !== true
        }).then(res => {
          this.$message.success('修改成功')
          this.fetchData()
        })
      }).catch(() => {
        return false
      })
    }
  }
}
</script>

<style scoped>

</style>

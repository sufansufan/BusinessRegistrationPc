<template>
  <div class="pay-project-box">
    <div class="select-tools">
      <div>
        <div>
          <el-select v-model="select.category" multiple clearable placeholder="类别">
            <el-option
              v-for="item in constant.charge_type"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div>
          <el-select v-model="select.classBy" clearable placeholder="年级">
            <el-option
              v-for="item in constant.grade"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div>
          <el-input
            v-model.trim="select.name"
            clearable
            placeholder="名称"
            style="width: 375px"
          />
        </div>
        <div>
          <el-select v-model="select.status" placeholder="状态" clearable>
            <el-option :value="true" label="启用"/>
            <el-option :value="false" label="停用"/>
          </el-select>
        </div>
      </div>
      <div class="select-btn">
        <div>
          <el-button type="primary" icon="el-icon-search" @click="fetchData">搜索</el-button>
        </div>
        <div>
          <el-button icon="el-icon-refresh" @click="resetSearch">重置搜索条件</el-button>
        </div>
        <div>
          <el-button type="primary" icon="el-icon-plus" @click="modify('', 'add')">新增</el-button>
        </div>
      </div>
    </div>
    <comm-table :data="dataList" :columns="columns" :count="count" :single-selected="true">
      <div slot-scope="scope">
        <el-button type="text" @click="modify(scope.row, 'edit')">编辑</el-button>
        <el-button type="text" @click="deleteProject(scope.row.id)">删除</el-button>
        <el-button type="text" @click="modifyStatus(scope.row)">{{ scope.row.status == true ? '停用' : '启用' }}</el-button>
      </div>
    </comm-table>
    <Dialog ref="dialog" width="40%" top="230px">
      <el-form
        ref="projectForm"
        :model="projectForm"
        :rules="projectRules"
        :key="key"
        label-position="top"
        class="project-form"
      >
        <el-form-item label="名称" prop="name">
          <el-input v-model.trim="projectForm.name" placeholder="请输入名称"/>
        </el-form-item>
        <el-form-item label="年级" prop="classBy">
          <el-select v-model="projectForm.classBy" placeholder="请选择年级">
            <el-option
              v-for="item in constant.grade"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="单价" prop="price">
          <el-input v-model.trim="projectForm.price" placeholder="请输入单价"/>
        </el-form-item>
        <el-form-item label="类别" prop="category">
          <el-select v-model="projectForm.category" placeholder="请选择类别">
            <el-option
              v-for="item in constant.charge_type"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="big" @click="$refs.dialog.show = false">取 消</el-button>
        <el-button type="primary" size="big" @click="submitProject">确 定</el-button>
      </span>
    </Dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import tables from '@/mixin/tables'
import CommTable from '@/views/components/CommTable'
import Dialog from '@/components/Dialog'
import { getChargeItemList, deleteChargeItem, addAndEditChargeItem, editChargeItemStatus } from '@/api/finance/payService'
import { validateJustFloat } from '@/utils/validate'
export default {
  name: 'PayService',
  components: {
    CommTable,
    Dialog
  },
  mixins: [tables],
  data() {
    const justFloat = (rule, value, callback) => {
      if (!validateJustFloat(value)) {
        callback(new Error('请输入正确的数字'))
      } else {
        callback()
      }
    }
    return {
      key: 1,
      select: {
        category: [],
        classBy: '',
        name: '',
        status: ''
      },
      projectForm: {
        id: '',
        name: '',
        price: '',
        category: '2',
        classBy: ''
      },
      projectFormCopy: {},
      projectRules: {
        name: [
          { required: true, message: '名称不能为空', trigger: 'blur' },
          { min: 1, max: 100, message: '最长为100个字符', trigger: 'blur' }
        ],
        category: [{ required: true, message: '请选择类别', trigger: 'change' }],
        classBy: [{ required: true, message: '请选择年级', trigger: 'change' }],
        price: [{ required: true, validator: justFloat, trigger: 'blur' }]
      },
      columns: [
        { label: '类别', prop: 'category' },
        { label: '名称', prop: 'name', width: '300' },
        { label: '年级', prop: 'classBy' },
        { label: '单价', prop: 'price' },
        { label: '状态', prop: 'statusLabel' },
        { label: '操作', prop: 'operation', width: '175', fixed: 'right' }
      ],
      dataList: [
        { classSequence: '3213' }
      ],
      campusProps: {
        value: 'id',
        label: 'name'
      }
    }
  },
  computed: {
    ...mapGetters(['constant'])
  },
  created() {
    this.$store.dispatch('getConstant', ['charge_type', 'grade']).then(() => {
      this.projectFormCopy = JSON.parse(JSON.stringify(this.projectForm))
      this.fetchData()
    })
  },
  methods: {
    fetchData() {
      const { category } = this.select
      const params = {
        chargeItem: {
          ...this.select,
          category: category.join(',')
        },
        page: this.page,
        limit: this.limit
      }
      this.BFD(getChargeItemList(params).then(({ data }) => {
        const { count, list } = data
        this.count = count
        this.dataList = list
        this.dataList.map(item => {
          item.statusLabel = this.renderStateTag(item.status ? '启用' : '停用', true)
          return item
        })
      }))
    },
    modify(row, type) {
      if (type === 'edit') {
        const { id, name, categoryCode, classByCode, price } = row
        this.projectForm = {
          id,
          name,
          price,
          category: categoryCode,
          classBy: classByCode
        }
        this.$refs.dialog.setTitle('编辑收费项目')
      } else if (type === 'add') {
        this.projectForm = {
          ...this.projectFormCopy
        }
        this.$refs.dialog.setTitle('新增收费项目')
      }
      this.key = this.key + 1
      this.$refs.dialog.show = true
    },
    submitProject() {
      this.$refs.projectForm.validate(valid => {
        if (valid) {
          const { id } = this.projectForm
          const params = {
            ...this.projectForm
          }
          delete params.id
          addAndEditChargeItem({ id, chargeItem: params }).then(res => {
            this.$refs.dialog.show = false
            id ? this.$message.success('编辑成功') : this.$message.success('新增成功')
            this.fetchData()
          })
        } else {
          return false
        }
      })
    },
    deleteProject(id) {
      this.$confirm('是否删除该数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteChargeItem({ id }).then(res => {
          this.$message.success('删除成功')
          this.fetchData()
        })
      }).catch(() => { })
    },
    modifyStatus(row) {
      this.$confirm('是否进行状态修改?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const params = {
          status: !row.status
        }
        editChargeItemStatus({ id: row.id, chargeItem: params }).then(res => {
          this.$message.success('修改成功')
          this.fetchData()
        })
      }).catch(() => { })
    }
  }
}
</script>

<style lang="scss" scoped>
.pay-project-box{
  .project-form{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .el-form-item{
      width: calc(50% - 10px);
      .el-select{
        width: 100%;
      }
    }
  }
}
</style>

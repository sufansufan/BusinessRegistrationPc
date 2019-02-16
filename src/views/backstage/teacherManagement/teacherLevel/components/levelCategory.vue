<template>
  <div class="level-category-box">
    <div class="select-tools">
      <div/>
      <div class="btn">
        <div>
          <el-button type="primary" icon="el-icon-plus" @click="modify('add')">新增</el-button>
        </div>
      </div>
    </div>
    <el-table :data="dataList" stripe border style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"/>
      <el-table-column prop="name" label="级别名称"/>
      <el-table-column prop="basicLevel" label="基本级别" width="150"/>
      <el-table-column prop="additionSalary" label="级别附加"/>
      <el-table-column prop="salary" label="课酬"/>
      <el-table-column prop="compulsoryHour" label="义务课时"/>
      <el-table-column prop="teacherNum" label="关联教师数"/>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <div v-html="scope.row.statusHtm"/>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150" fixed="right">
        <template slot-scope="scope">
          <el-button type="text" @click="modify('edit', scope.row)">编辑</el-button>
          <el-button type="text" @click="deleteLevel('self', scope.row.id)">删除</el-button>
          <el-button type="text" @click="modifyStatus(scope.row)">{{ scope.row.status === true ? '停用' : '启用' }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="batch-delete">
      <el-button :disabled="!multipleSelection.length" type="primary" @click="deleteLevel('all')">批量删除</el-button>
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
    <Dialog ref="dialog" width="40%" top="200px">
      <el-form ref="levelCategoryForm" :model="levelCategoryForm" :rules="levelCategoryRules" class="level-category-form">
        <el-form-item label="级别名称">
          <br>
          <strong class="level-name">{{ levelName }}</strong>
        </el-form-item>
        <el-form-item label="基本级别" prop="basicLevel">
          <el-input v-model.trim="levelCategoryForm.basicLevel"/>
        </el-form-item>
        <el-form-item label="附加级别" prop="additionSalary">
          <el-input v-model.trim="levelCategoryForm.additionSalary"/>
        </el-form-item>
        <el-form-item label="课时费" prop="salary">
          <el-input v-model.trim="levelCategoryForm.salary"/>
        </el-form-item>
        <el-form-item label="义务课时" prop="compulsoryHour">
          <el-input v-model.trim="levelCategoryForm.compulsoryHour"/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" size="big" @click="saveLevelCategory">确 定</el-button>
        <el-button size="big" @click="$refs.dialog.show = false">取 消</el-button>
      </span>
    </Dialog>
  </div>
</template>

<script>

import tables from '@/mixin/tables'
import Dialog from '@/components/Dialog'
import { getTeacherLevelList, editTeacherLevel, deleteTeacherLevel, editTeacherLevelStatus } from '@/api/backstage/teacherManagement'
import { validateNumber } from '@/utils/validate'
export default {
  components: {
    Dialog
  },
  mixins: [tables],
  data() {
    const number = (rule, value, callback) => {
      if (!validateNumber(value)) {
        callback(new Error('请输入数字'))
      } else {
        callback()
      }
    }
    return {
      dataList: [],
      multipleSelection: [],
      levelCategoryForm: {
        id: '',
        basicLevel: '',
        name: '',
        salary: '',
        compulsoryHour: '',
        additionSalary: ''
      },
      levelCategoryRules: {
        basicLevel: [
          { required: true, message: '基本不能为空', trigger: 'blur' },
          { min: 1, max: 50, message: '最长为50个字符', trigger: 'blur' }
        ],
        additionSalary: [
          { required: true, message: '基本不能为空', trigger: 'blur' },
          { min: 1, max: 50, message: '最长为50个字符', trigger: 'blur' }
        ],
        salary: [
          { required: true, validator: number, trigger: 'blur' }
        ],
        compulsoryHour: [
          { required: true, validator: number, trigger: 'blur' }
        ]
      }

    }
  },
  computed: {
    levelName() {
      const { basicLevel, additionSalary } = this.levelCategoryForm
      const attachName = additionSalary ? '+' + additionSalary : ''
      const name = basicLevel + attachName
      return name
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      const params = {
        page: this.page,
        limit: this.limit,
        teacherLevelStatus: ''
      }
      this.BFD(getTeacherLevelList(params).then(({ data }) => {
        const { count, list } = data
        this.count = count
        this.dataList = list
        this.dataList.map(item => {
          item.statusHtm = this.renderStateTag(item.status ? '启用' : '停用')
          return item
        })
      }))
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    modify(type, row) {
      if (type === 'edit') {
        const { id, basicLevel, name, salary, compulsoryHour, additionSalary } = row
        this.levelCategoryForm = {
          id,
          basicLevel,
          name,
          salary,
          compulsoryHour,
          additionSalary
        }
        this.$refs.dialog.setTitle('编辑级别')
      } else {
        this.$refs.dialog.setTitle('新增级别')
      }
      this.$refs.dialog.show = true
    },
    saveLevelCategory() {
      this.$refs.levelCategoryForm.validate(valid => {
        if (valid) {
          const params = {
            ...this.levelCategoryForm
          }
          params.name = this.levelName
          editTeacherLevel({ teacherLevel: params }).then(res => {
            this.$refs.dialog.show = false
            this.fetchData()
            params.id ? this.$message.success('编辑成功') : this.$message.success('新增成功')
          })
        } else {
          return false
        }
      })
    },
    deleteLevel(type, id) {
      this.$confirm('是否删除改数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var ids = ''
        if (type === 'self') {
          ids = id
        } else {
          this.multipleSelection.forEach(item => {
            ids += item.id + ','
          })
        }
        deleteTeacherLevel({ ids }).then(res => {
          this.$message.success('删除成功')
          this.fetchData()
        })
      })
    },
    modifyStatus(row) {
      this.$confirm('是否进行状态修改?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const params = {
          id: row.id,
          status: !row.status
        }
        editTeacherLevelStatus({ teacherLevel: params }).then(res => {
          this.$message.success('修改成功')
          this.fetchData()
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.level-category-box{
  .batch-delete{
    margin-top: 20px;
  }
  .level-category-form{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .el-form-item{
      width: calc(50% - 10px);
      .level-name{
        font-size: 32px;
        margin-left: 15%;
      }
    }
  }
}
</style>
<style>
.level-category-box .select-tools .btn{
  margin-right: 0px !important;
}
</style>

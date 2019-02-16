<template>
  <div class="user-group-management-box">
    <div class="select-tools">
      <div class="btn">
        <div>
          <el-button type="primary" icon="el-icon-plus" @click="userGroupSetting">新增</el-button>
        </div>
      </div>
    </div>
    <el-table v-loading="loading" :data="dataList" stripe border style="width: 100%">
      <el-table-column prop="roleName" label="用户组名称"/>
      <el-table-column prop="personNumber" label="关联人数"/>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="userGroupSetting('edit', scope.row)">编辑</el-button>
          <el-button
            :disabled="scope.row.personNumber > 0"
            type="text"
            @click="delUserGroup(scope.row.id)"
          >删除</el-button>
        </template>
      </el-table-column>
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
    <Dialog ref="dialog" width="600px">
      <el-form
        ref="userGroupManagementForm"
        :key="key"
        :inline="true"
        :model="userGroupManagementForm"
        :rules="rules"
        label-position="top"
      >
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="userGroupManagementForm.roleName" placeholder="角色名称"/>
        </el-form-item>
        <el-form-item label="用户权限" prop="menuList">
          <el-tree
            ref="userGroupTree"
            v-model="userGroupManagementForm.menuList"
            :data="menuList"
            :props="{label: 'menuName'}"
            node-key="id"
            style="width: 200px;"
            show-checkbox
            default-expand-all
            highlight-current
          />
        </el-form-item>
        <el-form-item class="btn">
          <el-button type="primary" @click="saveUserGroup">确定</el-button>
          <el-button @click="$refs.dialog.show = false">取消</el-button>
        </el-form-item>
      </el-form>
    </Dialog>
  </div>
</template>

<script>
import tables from '@/mixin/tables'
import Dialog from '@/components/Dialog'
import { getRoleList, delRoleById, getMenuList, addAndEditRole } from '@/api/configure/userGroupManagement'
export default {
  components: {
    Dialog
  },
  mixins: [tables],
  data() {
    return {
      dataList: [],
      userGroupManagementForm: {
        id: '',
        roleName: '',
        menuList: []
      },
      rules: {
        roleName: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
        menuList: [{
          required: true,
          validator(rule, value, callback) {
            if (!value.length) {
              callback(new Error('请选择用户权限'))
            } else {
              callback()
            }
          },
          trigger: 'blur'
        }]

      },
      menuList: [],
      key: 1
    }
  },
  created() {
    this.getMenuList()
    this.fetchData()
  },
  methods: {
    getMenuList() {
      getMenuList({}).then(res => {
        this.menuList = res.data.list
      })
    },
    userGroupSetting(type, row) {
      const dialog = this.$refs.dialog
      dialog.setTitle('新增用户组')
      this.userGroupManagementForm = {
        id: '',
        roleName: '',
        menuList: []
      }
      if (type === 'edit') {
        dialog.setTitle('编辑用户组')
        const menuList = JSON.parse(JSON.stringify(this.menuList))
        this.userGroupManagementForm = row
        const initKeys = tree => {
          tree.forEach(item => {
            if (row.menuList.some(id => id === item.id)) {
              item.checked = true
            }
            if (item.children.length) initKeys(item.children)
          })
        }
        initKeys(menuList)
        const ids = []
        const checkedKeys = tree => {
          tree.forEach(item => {
            if (!item.children.length) {
              if (item.checked) {
                ids.push(item.id)
              }
            } else {
              checkedKeys(item.children)
            }
          })
        }
        checkedKeys(menuList)
        this.$nextTick(() => {
          this.$refs.userGroupTree.setCheckedKeys(ids)
        })
      }
      this.key = this.key + 1
      dialog.show = true
    },
    saveUserGroup() {
      const selectedTree = this.$refs.userGroupTree
      const keys = [...selectedTree.getHalfCheckedKeys(), ...selectedTree.getCheckedKeys()]
      const hasEdit = this.userGroupManagementForm.id ? '编辑' : '添加'
      this.userGroupManagementForm.menuList = keys
      this.$refs.userGroupManagementForm.validate().then(() => {
        addAndEditRole({
          Loading: true,
          ...this.userGroupManagementForm
        }).then(() => {
          this.$message.success(hasEdit + '用户组成功')
          this.fetchData()
          this.$refs.dialog.show = false
        })
      }).catch(() => { })
    },
    delUserGroup(id) {
      this.$confirm('此操作将删除该用户组，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delRoleById({
          Loading: true,
          id
        }).then(() => {
          this.$message.success('删除用户组成功')
          this.fetchData()
        })
      }).catch(() => { })
    },
    fetchData() {
      const params = {
        page: this.page,
        limit: this.limit
      }
      this.BFD(getRoleList(params).then(res => {
        const { count, list } = res.data
        this.count = count
        this.dataList = list
      }))
    }
  }
}
</script>

<template>
  <div class="school-settings-box">
    <div class="select-tools">
      <div>
        <div>
          <el-select v-model="select.departmentType" placeholder="学部">
            <el-option
              v-for="item in constant.department_type"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div>
          <el-input v-model="select.schoolName" placeholder="学校名称"/>
        </div>
        <div>
          <el-cascader
            :options="cityTree"
            v-model="city"
            :props="{value: 'id', label: 'name'}"
            placeholder="行政区划"
            change-on-select
            clearable
            @change="val => getLastVal(val, 'cityId')"
          />
        </div>
      </div>
      <div class="btn">
        <div>
          <el-button type="primary" icon="el-icon-search" @click="fetchData('search')">搜索</el-button>
        </div>
        <div>
          <el-button icon="el-icon-refresh">重置搜索条件</el-button>
        </div>
        <div>
          <el-button type="primary" icon="el-icon-plus" @click="schoolSetting('add')">新增</el-button>
        </div>
        <div>
          <el-button type="primary" icon="el-icon-document">导入模板</el-button>
        </div>
        <div>
          <el-button type="primary" icon="el-icon-upload2">导入</el-button>
        </div>
        <div>
          <el-button type="primary" icon="el-icon-download">导出</el-button>
        </div>
      </div>
    </div>
    <el-table :data="dataList" stripe border style="width: 100%">
      <el-table-column label="行政区划">
        <template slot-scope="{row}">{{ row.prName }}{{ row.ciName }}{{ row.diName }}</template>
      </el-table-column>
      <el-table-column prop="schoolName" label="学校名称" width="250"/>
      <el-table-column prop="departmentTypeName" label="学部"/>
      <el-table-column prop="schoolAddress" label="地址" width="250"/>
      <el-table-column label="操作">
        <template slot-scope="{row}">
          <el-button type="text" @click="schoolSetting('edit', row)">编辑</el-button>
          <el-button type="text" @click="delSchool(row.id)">删除</el-button>
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
    <Dialog ref="dialog" width="478px">
      <el-form
        ref="schoolSettingForm"
        :key="key"
        :inline="true"
        :model="schoolSettingForm"
        :rules="rules"
        label-position="top"
      >
        <el-form-item label="行政区划" prop="cityId">
          <el-cascader
            :options="cityTree"
            v-model="dialogCity"
            :props="{value: 'id', label: 'name'}"
            placeholder="行政区划"
            style="width: 200px;"
            @change="val => getLastVal(val, 'cityId', 'schoolSettingForm')"
          />
        </el-form-item>
        <el-form-item label="学校名称" prop="schoolName">
          <el-input v-model="schoolSettingForm.schoolName" placeholder="学校名称"/>
        </el-form-item>
        <el-form-item label="学部" prop="departmentType">
          <el-select
            v-model="dialogDepartmentType"
            multiple
            placeholder="请选择"
            style="width: 200px;"
            @change="getDepartmentType"
          >
            <el-option
              v-for="item in constant.department_type"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="schoolSettingForm.schoolAddress" placeholder="地址"/>
        </el-form-item>
        <el-form-item class="btn">
          <el-button type="primary" @click="editSchool">确定</el-button>
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
import { getSchoolList, addAndEditSchool, delSchool } from '@/api/configure'
import { getCityTree } from '@/api/backstage/campusManagement'
import { id2Level, treeChildrenEmpty } from '@/utils'
export default {
  components: {
    Dialog
  },
  mixins: [tables],
  data() {
    return {
      key: 1,
      cityTree: [],
      city: [],
      select: {
        departmentType: '',
        cityId: '',
        schoolName: ''
      },
      dataList: [],
      dialogCity: [],
      dialogDepartmentType: [],
      rowId: '',
      schoolSettingForm: {
        cityId: '',
        schoolName: '',
        departmentType: '',
        schoolAddress: ''
      },
      rules: {
        cityId: [{ required: true, message: '请选择行政区划', trigger: 'change' }],
        schoolName: [{ required: true, message: '请填写学校名称' }],
        departmentType: [{ required: true, message: '请选择学部', trigger: 'change' }]
      }
    }
  },
  computed: {
    ...mapGetters(['constant'])
  },
  created() {
    this.$store.dispatch('getConstant', 'department_type')
    this.getCityTree()
    this.fetchData()
  },
  methods: {
    getCityTree() {
      getCityTree({}).then(res => {
        this.cityTree = treeChildrenEmpty(res.data.list)
      })
    },
    initOptions() {
      this.rowId = ''
      this.dialogCity = []
      this.dialogDepartmentType = []
      this.schoolSettingForm = {
        cityId: '',
        schoolName: '',
        departmentType: '',
        schoolAddress: ''
      }
    },
    schoolSetting(type, row) {
      const dialog = this.$refs.dialog
      this.key = this.key + 1
      dialog.setTitle('新增学校')
      this.initOptions()
      if (type === 'edit') {
        dialog.setTitle('编辑学校')
        for (const i in this.schoolSettingForm) {
          this.schoolSettingForm[i] = row[i] || ''
        }
        this.rowId = row.id
        this.dialogCity = id2Level(this.cityTree, this.schoolSettingForm.cityId)
        this.dialogDepartmentType = this.schoolSettingForm.departmentType.split(',')
      }
      dialog.show = true
    },
    fetchData(type) {
      if (type === 'search') this.page = 1
      this.BFD(getSchoolList({
        publicSchool: {
          ...this.select,
          page: this.page,
          limit: this.limit
        }
      }).then(res => {
        const { count, list } = res.data
        this.count = count
        this.dataList = list
      }))
    },
    getDepartmentType(val) {
      this.schoolSettingForm.departmentType = val.join(',')
    },
    editSchool() {
      this.$refs.schoolSettingForm.validate().then(() => {
        addAndEditSchool({
          Loading: true,
          id: this.rowId,
          publicSchool: {
            ...this.schoolSettingForm
          }
        }).then(() => {
          this.$message.success(`${this.rowId ? '编辑' : '添加'}成功~`)
          this.$refs.dialog.show = false
          this.initOptions()
          this.fetchData()
        })
      }).catch(() => { })
    },
    delSchool(id) {
      this.$confirm('此操作将删除该设置, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delSchool({
          Loading: true,
          id
        }).then(() => {
          this.$message.success('删除成功~')
          this.fetchData()
        })
      }).catch(() => { })
    }
  }
}
</script>

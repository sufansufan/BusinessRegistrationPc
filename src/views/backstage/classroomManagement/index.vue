<template>
  <div class="class-room-manage-box">
    <div class="select-tools">
      <div>
        <div>
          <el-select v-model="select.classroomStatus" placeholder="状态" clearable>
            <el-option :value="true" label="启用"/>
            <el-option :value="false" label="停用"/>
          </el-select>
        </div>
        <div>
          <el-select v-model="select.equipment" multiple placeholder="设备">
            <el-option
              v-for="item in constant.classroom_equipment"
              :key="item.id"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div>
          <el-cascader
            :options="constant.campus"
            v-model="select.adminOrganIds"
            :props="campusProps"
            placeholder="校区"
            change-on-select/>
        </div>
      </div>
      <div class="btn">
        <div>
          <el-button type="primary" icon="el-icon-search" @click="fetchData">搜索</el-button>
        </div>
        <div>
          <el-button icon="el-icon-refresh" @click="resetSearch">重置搜索条件</el-button>
        </div>
        <div>
          <el-button type="primary" icon="el-icon-plus" @click="modify('add')">新增</el-button>
        </div>
        <div>
          <el-button type="primary" icon="el-icon-download">导出</el-button>
        </div>
      </div>
    </div>
    <el-table :data="dataList" stripe border style="width: 100%">
      <el-table-column prop="no" label="教室编号"/>
      <el-table-column prop="classroomName" label="教室名称"/>
      <el-table-column prop="adminOrganName" label="校区"/>
      <el-table-column prop="maxStudentNumber" label="容纳人数"/>
      <el-table-column prop="equipmentName" label="教学设备"/>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <div v-html="scope.row.statusHtm"/>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="150px">
        <template slot-scope="scope">
          <el-button :disabled="!scope.row.whetherEdit" type="text" @click="modify('edit', scope.row)">编辑</el-button>
          <el-button :disabled="!scope.row.whetherDelete" type="text" @click="deleteClassroom(scope.row.id)">删除</el-button>
          <el-button type="text" @click="modifyStatus(scope.row)">{{ scope.row.status === true ? '停用' : '启用' }}</el-button>
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
    <Dialog ref="dialog" width="46%" top="100px">
      <el-form ref="classRoomForm" :model="classRoomForm" :key="key" :rules="classRoomRules" class="class-room-form">
        <el-form-item label="所属校区" prop="adminOrganId">
          <el-cascader
            :options="constant.campus"
            v-model="classRoomForm.adminOrganId"
            :props="campusProps"
            placeholder="校区"
            change-on-select/>
        </el-form-item>
        <el-form-item label="教室名称" prop="name">
          <el-input v-model.trim="classRoomForm.name"/>
        </el-form-item>
        <el-form-item label="容纳人数" prop="maxStudentNumber">
          <el-input v-model.trim="classRoomForm.maxStudentNumber"/>
        </el-form-item>
        <el-form-item label="教室编号" prop="no">
          <el-input v-model="classRoomForm.no"/>
        </el-form-item>
        <el-form-item>
          <div><strong>设备</strong> </div>
          <el-checkbox-group v-model="classRoomForm.equipment">
            <el-checkbox-button v-for="item in constant.classroom_equipment" :label="item.value" :key="item.id">{{ item.label }}</el-checkbox-button>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model.trim="classRoomForm.remarks"/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" size="big" @click="saveClassRooom">确 定</el-button>
        <el-button size="big" @click="$refs.dialog.show = false">取 消</el-button>
      </span>
    </Dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getClassroomList, editClassroom, deleteClassroom, editClassroomStatus } from '@/api/backstage/classroomManagement'
import { id2Level } from '@/utils'
import tables from '@/mixin/tables'
import Dialog from '@/components/Dialog'
import { validateNumber } from '@/utils/validate'
export default {
  name: 'ClassroomManagement',
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
      key: 1,
      select: {
        classroomStatus: '',
        equipment: [],
        adminOrganIds: []
      },
      dataList: [],
      classRoomForm: {
        id: '',
        adminOrganId: [],
        maxStudentNumber: '',
        name: '',
        no: '',
        equipment: [],
        remarks: ''
      },
      shallowclassRoomForm: {},
      campusProps: {
        value: 'id',
        label: 'name'
      },
      classRoomRules: {
        adminOrganId: [{ required: true, message: '请选择校区', trigger: 'change' }],
        name: [
          { required: true, message: '教室不能为空', trigger: 'blur' },
          { min: 1, max: 100, message: '最长为100个字符', trigger: 'blur' }
        ],
        maxStudentNumber: [
          { required: true, validator: number, trigger: 'blur' }
        ],
        no: [
          { required: true, message: '名称不能为空', trigger: 'blur' },
          { min: 1, max: 50, message: '最长为50个字符', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['constant'])
  },
  created() {
    this.$store.dispatch('getConstant', ['campus', 'classroom_equipment']).then(() => {
      this.fetchData()
      this.shallowclassRoomForm = {
        ...this.classRoomForm
      }
    })
  },
  methods: {
    fetchData() {
      const { classroomStatus, equipment, adminOrganIds } = this.select
      const params = {
        page: this.page,
        limit: this.limit,
        equipment: equipment.join(','),
        classroomStatus,
        adminOrganIds: adminOrganIds && adminOrganIds[adminOrganIds.length - 1]
      }
      this.BFD(getClassroomList(params).then(({ data }) => {
        const { count, list } = data
        this.count = count
        this.dataList = list
        this.dataList.map(item => {
          item.statusHtm = this.renderStateTag(item.status ? '启用' : '停用')
          return item
        })
      }))
    },
    modify(type, row) {
      if (type === 'edit') {
        const { id, adminOrganId, classroomName: name, maxStudentNumber, no, equipment, remarks } = row
        this.classRoomForm = {
          id,
          adminOrganId: id2Level(this.constant.campus, adminOrganId),
          maxStudentNumber,
          name,
          no,
          equipment: equipment.split(','),
          remarks
        }
        this.$refs.dialog.setTitle('编辑教室')
      } else {
        this.classRoomForm = {
          ...this.shallowclassRoomForm
        }
        this.$refs.dialog.setTitle('新增教室')
      }
      this.$refs.dialog.show = true
      this.key = this.key + 1
    },
    saveClassRooom() {
      this.$refs.classRoomForm.validate(valid => {
        if (valid) {
          const { adminOrganId, equipment } = this.classRoomForm
          const classroom = {
            ...this.classRoomForm
          }
          classroom.adminOrganId = adminOrganId && adminOrganId[adminOrganId.length - 1]
          classroom.equipment = equipment.join(',')
          editClassroom({ classroom }).then(res => {
            this.$refs.dialog.show = false
            classroom.id ? this.$message.success('编辑成功') : this.$message.success('新增成功')
            this.fetchData()
          })
        } else {
          return false
        }
      })
    },
    deleteClassroom(id) {
      this.$confirm('是否删除该数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteClassroom({ ids: id }).then(res => {
          this.$message.success('删除成功')
          this.fetchData()
        })
      }).catch(() => {
        return false
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
        editClassroomStatus({ classroom: params }).then(res => {
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

<style lang="scss" scoped>
.class-room-manage-box{
  .class-room-form{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .el-form-item{
      width: calc(50% - 10px);
      .el-cascader{
        width: 100%;
      }
      & > div {
        color: #5a5e66;
      }
      .el-checkbox-group{
        width: 100%;
        display:flex;
        flex-wrap: wrap;
        .el-checkbox-button{
          margin-right: 10px;
        }
      }
    }
  }
}

</style>
<style lang="scss">
.class-room-manage-box{
  .class-room-form{
    .el-checkbox-button.is-checked {
      & > .el-checkbox-button__inner {
        position: relative;
        &:after{
          content: '\2714';
          position: absolute;
          top: 1%;
          right: 0;
          color: #fff;
        }
      }
    }
    .el-checkbox-button{
      .el-checkbox-button__inner{
        min-width: 60px;
        min-height: 60px;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 5px;
        margin-bottom: 10px;
      }
    }
    .el-checkbox-button__inner{
      border-left: 1px solid #d8dce5
    }

  }
}
</style>

<template>
  <div class="pos-management-box">
    <div class="select-tools">
      <div class="btn">
        <div>
          <el-button type="primary" icon="el-icon-plus" @click="posSetting">新增</el-button>
        </div>
      </div>
    </div>
    <el-table :data="dataList" stripe border style="width: 100%">
      <el-table-column type="selection" width="55"/>
      <el-table-column prop="date" label="POS机编号"/>
      <el-table-column prop="date" label="备注" width="250"/>
      <el-table-column prop="date" label="所属校区"/>
      <el-table-column prop="date" label="状态"/>
      <el-table-column label="操作" width="130" fixed="right">
        <template slot-scope="scope">
          <el-button type="text">编辑</el-button>
          <el-button type="text">删除</el-button>
          <el-button type="text">停用</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="all-del">
      <el-button type="primary">批量删除</el-button>
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
          <el-input v-model="posManagementForm.user" placeholder="POS机编号"/>
        </el-form-item>
        <el-form-item label="所属校区">
          <el-select v-model="posManagementForm.region" placeholder="学部" style="width: 200px;">
            <el-option label="区域一" value="shanghai"/>
            <el-option label="区域二" value="beijing"/>
          </el-select>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="posManagementForm.user" placeholder="备注" style="width: 410px;"/>
        </el-form-item>
        <el-form-item class="btn">
          <el-button type="primary">确定</el-button>
          <el-button @click="$refs.dialog.show = false">取消</el-button>
        </el-form-item>
      </el-form>
    </Dialog>
  </div>
</template>

<script>
import tables from '@/mixin/tables'
import Dialog from '@/components/Dialog'
export default {
  components: {
    Dialog
  },
  mixins: [tables],
  data() {
    return {
      dataList: [{}],
      posManagementForm: {}
    }
  },
  methods: {
    posSetting(type, row) {
      const dialog = this.$refs.dialog
      dialog.setTitle('新增POS机')
      if (type === 'edit') {
        dialog.setTitle('编辑POS机')
      }
      dialog.show = true
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

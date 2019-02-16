<template>
  <div class="school-settings-box">
    <div class="select-tools">
      <div>
        <div>
          <el-select v-model="select.value" placeholder="学部">
            <el-option
              v-for="item in []"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div>
          <el-select v-model="select.value" placeholder="学校名称">
            <el-option
              v-for="item in []"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div>
          <el-select v-model="select.value" placeholder="行政区划">
            <el-option
              v-for="item in []"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
      </div>
      <div class="btn">
        <div>
          <el-button type="primary" icon="el-icon-search">搜索</el-button>
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
      <el-table-column prop="date" label="行政区划"/>
      <el-table-column prop="date" label="学校名称" width="250"/>
      <el-table-column prop="date" label="学部"/>
      <el-table-column prop="date" label="地址" width="250"/>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="schoolSetting('edit', scope.row)">编辑</el-button>
          <el-button type="primary">删除</el-button>
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
      <el-form :inline="true" :model="schoolSettingForm" label-position="top">
        <el-form-item label="行政区域">
          <el-input v-model="schoolSettingForm.user" placeholder="行政区域"/>
        </el-form-item>
        <el-form-item label="学校名称">
          <el-input v-model="schoolSettingForm.user" placeholder="学校名称"/>
        </el-form-item>
        <el-form-item label="学部">
          <el-select v-model="schoolSettingForm.region" placeholder="学部" style="width: 200px;">
            <el-option label="区域一" value="shanghai"/>
            <el-option label="区域二" value="beijing"/>
          </el-select>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="schoolSettingForm.user" placeholder="地址"/>
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
      select: {},
      dataList: [],
      schoolSettingForm: {}
    }
  },
  methods: {
    schoolSetting(type, row) {
      const dialog = this.$refs.dialog
      dialog.setTitle('新增学校')
      if (type === 'edit') {
        dialog.setTitle('编辑学校')
      }
      dialog.show = true
    }
  }
}
</script>

<style>
</style>

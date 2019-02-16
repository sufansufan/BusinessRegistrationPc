<template>
  <div class="network-time-maintain-box">
    <div class="select-tools">
      <div>
        <div>
          <el-select v-model="select.sex" placeholder="年份">
            <el-option
              v-for="item in []"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div>
          <el-select v-model="select.sex" placeholder="季节">
            <el-option
              v-for="item in []"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div>
          <el-select v-model="select.sex" placeholder="期别">
            <el-option
              v-for="item in []"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div>
          <el-select v-model="select.sex" placeholder="年级">
            <el-option
              v-for="item in []"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div>
          <el-select v-model="select.sex" placeholder="科目">
            <el-option
              v-for="item in []"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div>
          <el-select v-model="select.sex" placeholder="类别">
            <el-option
              v-for="item in []"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div>
          <el-select v-model="select.sex" placeholder="班型">
            <el-option
              v-for="item in []"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div>
          <el-select v-model="select.sex" placeholder="学部">
            <el-option
              v-for="item in []"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div>
          <el-input v-model="select.name" placeholder="老师姓名"/>
        </div>
        <div>
          <el-input v-model="select.name" placeholder="班级名称" style="width: 400px"/>
        </div>
        <div>
          <el-select v-model="select.sex" placeholder="校区">
            <el-option
              v-for="item in []"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div class="network-checkbox">
          <el-checkbox-group v-model="select.week">
            <el-checkbox label="周一"/>
            <el-checkbox label="周二"/>
            <el-checkbox label="周三"/>
            <el-checkbox label="周四"/>
            <el-checkbox label="周五"/>
            <el-checkbox label="周六"/>
            <el-checkbox label="周日"/>
          </el-checkbox-group>
        </div>
        <div class="network-checkbox">
          <el-checkbox-group v-model="select.day">
            <el-checkbox label="上午"/>
            <el-checkbox label="下午"/>
            <el-checkbox label="晚上"/>
          </el-checkbox-group>
        </div>
        <div class="network-checkbox">
          <el-checkbox-group v-model="select.day">
            <el-checkbox label="仅未满班"/>
          </el-checkbox-group>
        </div>
        <div class="network-checkbox">
          <el-checkbox-group v-model="select.day">
            <el-checkbox label="已结课"/>
          </el-checkbox-group>
        </div>
      </div>
      <div class="btn">
        <div>
          <el-button type="primary" icon="el-icon-setting">批量设置</el-button>
        </div>
        <div>
          <el-button type="primary" icon="el-icon-search">搜索</el-button>
        </div>
        <div>
          <el-button type="primary" icon="el-icon-refresh">重置搜索条件</el-button>
        </div>
      </div>
    </div>
    <el-table :data="dataList" stripe border style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55"/>
      <el-table-column prop="date" label="校区"/>
      <el-table-column prop="name" label="班级名称" width="150"/>
      <el-table-column prop="address" label="期别"/>
      <el-table-column prop="address" label="老师"/>
      <el-table-column prop="address" label="重复周期"/>
      <el-table-column prop="address" label="教室"/>
      <el-table-column prop="address" label="时段"/>
      <el-table-column prop="address" label="上课日期"/>
      <el-table-column prop="address" label="前台报名日期"/>
      <el-table-column prop="address" label="APP报名日期"/>
      <el-table-column label="操作" width="250">
        <template slot-scope="scope">
          <el-button type="primary" @click="modify('edit',scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      select: {
        week: []
      },
      dataList: [{
        address: '234234'
      }],
      multipleSelection: []
    }
  },
  methods: {
    modify() {

    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    }
  }
}
</script>

<style lang="scss" scoped>
.network-time-maintain-box{
  .network-checkbox{
    line-height: 32px;
  }
}
</style>

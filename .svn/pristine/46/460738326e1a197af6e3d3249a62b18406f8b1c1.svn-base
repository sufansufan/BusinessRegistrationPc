<template>
  <div class="pos-management-box">
    <el-tabs v-model="activeName">
      <el-tab-pane label="POS机状态" name="status">
        <status/>
      </el-tab-pane>
      <el-tab-pane label="POS机管理" name="management">
        <management/>
      </el-tab-pane>
      <el-tab-pane label="历史记录" name="history">
        <history/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import status from './status'
import management from './management'
import history from './history'
export default {
  components: {
    status,
    management,
    history
  },
  data() {
    return {
      activeName: 'status'
    }
  }
}
</script>

<style scoped>
</style>

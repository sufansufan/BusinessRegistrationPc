<template>
  <div class="step-region-turn-class">
    <el-tabs v-model="activeName">
      <el-tab-pane label="跨财务主体转班" name="first">
        <turn-class-table/>
      </el-tab-pane>
      <el-tab-pane label="跨校区转班" name="second">
        <turn-class-table :is-step="true"/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import TurnClassTable from './components/TurnClassTable'
export default {
  name: 'StepRegionTurnClass',
  components: {
    TurnClassTable
  },
  data() {
    return {
      activeName: 'first'
    }
  }
}
</script>

<style scoped>

</style>

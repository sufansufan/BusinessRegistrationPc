<template>
  <div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="教师级别" name="teacherLevel">
        <teacher-level/>
      </el-tab-pane>
      <el-tab-pane label="级别分类" name="levelCategory">
        <level-category/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import TeacherLevel from './components/TeacherLevel'
import LevelCategory from './components/levelCategory'
export default {
  components: {
    TeacherLevel,
    LevelCategory
  },
  data() {
    return {
      activeName: 'teacherLevel'
    }
  }
}
</script>

<style scoped>

</style>

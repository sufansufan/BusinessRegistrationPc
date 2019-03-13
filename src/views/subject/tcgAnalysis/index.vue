/**
* Author: DanSmile
* Date: 2019/3/8
* Time: 16:26
*/
<template>
  <div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="按老师" name="teacher">
        <Teacher ref="teacher"/>
      </el-tab-pane>
      <el-tab-pane label="按校区" name="campus" lazy>
        <Campus ref="campus"/>
      </el-tab-pane>
      <el-tab-pane label="按年级" name="grade" lazy>
        <Grade ref="grade"/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Teacher from './components/Teacher'
import Campus from './components/Campus'
import Grade from './components/Grade'
export default {
  name: 'TcgAnalysis',
  components: {
    Teacher,
    Campus,
    Grade
  },
  data() {
    return {
      activeName: 'teacher'
    }
  }
}
</script>

<style scoped>

</style>

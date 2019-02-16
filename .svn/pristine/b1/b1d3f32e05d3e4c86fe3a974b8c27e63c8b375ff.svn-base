<template>
  <div class="sign-list">
    <div class="sign-btn">
      <el-button type="primary" @click="saveSign('all')">全部签到</el-button>
      <el-button type="primary" @click="saveSign('self')">保存</el-button>
    </div>
    <sign-in ref="signIn" :is-edit="true"/>
  </div>
</template>

<script>
import SignIn from '../../queryClass/components/SignIn'
import { saveCheckin } from '@/api/foreground/signManagement'
export default {
  components: {
    SignIn
  },
  methods: {
    saveSign(type) {
      const { attendId } = this.$route.params
      const signList = []
      this.$refs.signIn.signinList.forEach((item, index) => {
        const { rollCallStatus, mendRegisterRemark, mendRegisterTime, id, _repairSignin } = item
        signList.push({
          id,
          rollCallStatus,
          mendRegisterRemark,
          mendRegisterTime
        })
        if (_repairSignin) {
          signList[index].rollCallStatus = rollCallStatus === '4' ? 7 : 6
        }
      })
      const params = {
        Loading: true,
        whetherAllCheckin: type === 'all',
        attendClassId: attendId
      }
      type === 'self' ? params.studentAttendClasses = signList : ''
      saveCheckin(params).then(res => {
        this.$message.success('保存成功')
        this.$router.go(-1)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.sign-list{
  position: relative;
  .sign-btn{
    position: absolute;
    top: -40px;
    right: 0px;
  }
}
</style>

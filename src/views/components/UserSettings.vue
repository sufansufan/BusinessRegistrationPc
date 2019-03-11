<template>
  <div class="user-settings">
    <h3>个人设置</h3>
    <p v-if="!firstEnter">
      <el-alert :closable="false" title="请修改您的默认密码再进行其他操作！" type="error"/>
    </p>
    <div class="fast-nav">
      <h5>快捷导航</h5>
      <el-switch v-model="fastNavState" @change="toggleFastNav"/>
    </div>
    <el-collapse v-model="collapseNames" accordion>
      <el-collapse-item title="切换身份" name="roles">
        <div class="change-roles">
          <el-radio-group v-model="role" size="medium" @change="roleChange">
            <el-radio-button v-for="item in userInfo.role" :key="item.id" :label="item.campusIds">
              <div>
                <p>{{ item.campusNames[0] }}</p>
                <p>{{ item.roleName }}</p>
              </div>
            </el-radio-button>
          </el-radio-group>
        </div>
      </el-collapse-item>
      <el-collapse-item title="修改密码" name="pwd">
        <div class="change-pwd">
          <change-pwd/>
        </div>
      </el-collapse-item>
      <el-collapse-item title="界面皮肤" name="theme">
        <div class="change-theme">
          <el-scrollbar>
            <theme/>
          </el-scrollbar>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ChangePwd from './ChangePwd'
import Theme from './Theme'
import { editUserStatus } from '@/api/configure/userManagement'
import { deepClone } from '@/utils'
export default {
  components: {
    ChangePwd,
    Theme
  },
  data() {
    return {
      role: '',
      collapseNames: 'roles',
      fastNavState: true
    }
  },
  computed: {
    ...mapGetters(['fastNav', 'userInfo']),
    firstEnter() {
      return this.userInfo.whetherEditPassword
    }
  },
  created() {
    this.fastNavState = this.fastNav
    this.role = this.userInfo.currentRoleId
  },
  methods: {
    toggleFastNav() {
      this.$store.dispatch('toggleFastNav')
    },
    roleChange(role) {
      if (this.role !== this.userInfo.currentRoleId) {
        this.$confirm('是否确认切换身份?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          closeOnClickModal: false,
          type: 'warning'
        }).then(() => {
          editUserStatus({
            Loading: true,
            id: this.userInfo.id,
            operationType: 5,
            roleId: role
          }).then(() => {
            this.$router.replace({
              path: '/redirect/index'
            })
            const newRole = deepClone(this.userInfo)
            newRole.currentRoleId = role
            this.$store.commit('SET_USERINFO', newRole)
          })
        }).catch(() => {
          this.role = this.userInfo.currentRoleId
        })
      }
    }
  }
}
</script>

<style lang="scss">
.user-settings {
  padding: 22px;
  h5 {
    font-size: 14px;
    margin-bottom: 10px;
  }
  .fast-nav {
    display: flex;
    height: 30px;
    justify-content: space-between;
    align-items: center;
    margin-top: 23px;
    h5 {
      margin: 0;
    }
  }
  .el-collapse {
    border: 0 !important;
    .el-collapse-item__header {
      font-weight: bold;
      font-size: 14px;
      color: #000;
      height: 30px;
      line-height: 30px;
      border: 0;
      i {
        line-height: 30px;
      }
    }
    .el-collapse-item__wrap {
      border: 0;
    }
    .el-collapse-item__content {
      padding: 10px 0;
    }
  }
  .change-theme {
    .el-scrollbar {
      height: calc(100vh - 215px);
    }
  }
  .el-radio-group {
    display: block !important;
    .el-radio-button {
      display: block;
      margin-bottom: 5px;
      &:focus:not(.is-focus):not(:active) {
        box-shadow: none;
      }
      .el-radio-button__inner {
        display: block;
        border: 1px solid #ddd;
        border-radius: 5px !important;
        padding: 5px;
        p {
          margin: 0;
          line-height: 16px;
          text-align: left;
        }
      }
      &.is-active {
        .el-radio-button__inner {
          border-color: transparent;
          box-shadow: none;
        }
      }
    }
  }
}
</style>

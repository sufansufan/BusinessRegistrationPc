<template>
  <div class="navbar">
    <hamburger
      :toggle-click="toggleSideBar"
      :is-active="sidebar.opened"
      class="hamburger-container"
    />
    <breadcrumb class="breadcrumb-container"/>
    <div class="right-avatar">
      <div>
        <div>太阳</div>
        <div>
          <p>
            27
            <sup>°</sup>
          </p>
          <p>郑州</p>
        </div>
      </div>
      <el-dropdown class="avatar-container" trigger="click" size="small" @command="handleCommand">
        <div class="avatar-wrapper">
          <p>
            {{ userInfo.loginName }}
            <el-tag size="mini" class="act-color">{{ userInfo.userName }}</el-tag>
          </p>
          <p>{{ userInfo.role[0].campusNames[0] }}</p>
          <i class="el-icon-caret-bottom"/>
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <el-dropdown-item command="userSettings">
            <svg-icon icon-class="setting" style="margin-right: 5px;"/>个人设置
          </el-dropdown-item>
          <el-dropdown-item divided command="logout">
            <svg-icon icon-class="logout" style="margin-right: 5px;"/>退出登录
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'userInfo'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('toggleSideBar')
    },
    handleCommand(command) {
      switch (command) {
        case 'userSettings':
          this.$store.dispatch('toggleDrawer')
          break
        case 'logout':
          this.$store.dispatch('fedLogOut').then(() => {
            location.reload() // 为了重新实例化vue-router对象 避免bug
          })
          break
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 84px;
  line-height: 84px;
  border-radius: 0px !important;
  border: 0 !important;
  .hamburger-container {
    height: 84px;
    float: left;
    padding: 5px 10px;
  }
  .breadcrumb-container {
    float: left;
  }

  .right-avatar {
    position: absolute;
    top: 19px;
    right: 34px;
    display: flex;
    height: 46px;
    align-items: center;
    p {
      margin: 0;
      line-height: 16px;
      font-size: 14px;
    }
    & > div {
      background: #ebeef1;
      height: 46px;
      margin-left: 10px;
      line-height: 46px;
      padding: 0 20px;
      border-radius: 25px;
      &:first-child {
        display: flex;
        align-items: center;
        div:last-child {
          padding-left: 10px;
        }
      }
      &:last-child {
        p {
          &:first-child {
            padding-top: 6px;
            color: #000;
            span {
              color: #848585;
              font-size: 12px;
              padding-left: 8px;
            }
          }
          &:last-of-type {
            font-size: 12px;
            color: #848585;
            transform: scale(0.9);
            margin-left: -10px;
          }
        }
      }
    }
  }
  .avatar-container {
    height: 50px;
    display: inline-block;
    .avatar-wrapper {
      cursor: pointer;
      position: relative;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -10px;
        top: 17px;
        font-size: 12px;
      }
    }
  }
}
</style>

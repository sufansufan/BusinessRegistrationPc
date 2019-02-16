<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <h3 class="title">登 录</h3>
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" color="#d9b77c"/>
        </span>
        <el-input
          v-model="loginForm.username"
          name="username"
          type="text"
          auto-complete="on"
          placeholder="请输入用户名"
        />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" color="#d9b77c"/>
        </span>
        <el-input
          v-model="loginForm.password"
          :type="passwordType"
          name="password"
          auto-complete="on"
          placeholder="请输入密码"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon icon-class="eye" color="#d9b77c"/>
        </span>
      </el-form-item>
      <el-form-item class="forget-pwd">
        <el-button type="text">忘记密码？</el-button>
      </el-form-item>
      <el-form-item>
        <el-button
          :loading="loading"
          type="primary"
          class="login-btn"
          @click.native.prevent="handleLogin"
        >登 录</el-button>
      </el-form-item>
    </el-form>
    <div class="copyright">Copyright © 2018 平行线教育.版权所有</div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    const validateUser = (rule, value, callback) => {
      if (!value.trim().length) {
        callback(new Error('请输入用户名'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value.length < 5 || value.length > 20) {
        callback(new Error('请输入5-20位密码'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUser }],
        password: [{ required: true, trigger: 'blur', validator: validatePass }]
      },
      passwordType: 'password',
      loading: false,
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  created() {
    // window.addEventListener('hashchange', this.afterQRScan)
  },
  destroyed() {
    // window.removeEventListener('hashchange', this.afterQRScan)
  },
  methods: {
    showPwd() {
      this.passwordType = this.passwordType === 'password' ? '' : 'password'
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('login', this.loginForm).then(() => {
            this.loading = false
            this.$router.push({ path: this.redirect || '/' })
          }).catch(() => {
            this.loading = false
          })
        } else {
          return false
        }
      })
    },
    afterQRScan() {
      // const hash = window.location.hash.slice(1)
      // const hashObj = getQueryObject(hash)
      // const originUrl = window.location.origin
      // history.replaceState({}, '', originUrl)
      // const codeMap = {
      //   wechat: 'code',
      //   tencent: 'code'
      // }
      // const codeName = hashObj[codeMap[this.auth_type]]
      // if (!codeName) {
      //   alert('第三方登录失败')
      // } else {
      //   this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
      //     this.$router.push({ path: '/' })
      //   })
      // }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #fff;
$light_color: #d9b77c;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
    &::first-line {
      color: $light_color;
    }
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0;
      padding: 13px;
      color: $light_color;
      height: 47px !important;
      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $light_color !important;
      }
    }
  }
  .el-form-item {
    button {
      background: linear-gradient(to bottom right, #e4c384, #be9966);
    }
  }
  .el-form-item__error {
    top: 50px;
    left: 48px;
  }
  .copyright {
    position: absolute;
    bottom: 20px;
    right: 0;
    width: 584px;
    line-height: 24px;
    font-size: 12px;
    text-align: center;
    color: #999;
  }
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg: #fff;
$dark_gray: #889aa4;
$light_color: #d9b77c;

.login-container {
  position: relative;
  height: 100%;
  width: 100%;
  &::after {
    content: "";
    position: absolute;
    z-index: 1;
    height: 100%;
    width: calc(100% - 584px);
    background: $bg url(../../assets/images/bg.png) no-repeat;
    background-size: cover;
  }
  .login-form {
    position: absolute;
    z-index: 2;
    top: 40%;
    right: 89px;
    transform: translateY(-50%);
    width: 405px;
    max-width: 100%;
    .el-form-item {
      border: 1px solid #b3450e;
      &:not(.is-error) {
        border: 1px solid $light_color;
      }
      background: $bg;
      border-radius: 30px;
      color: $light_color;
      margin-bottom: 32px;
      button {
        font-size: 16px;
        border-radius: 30px;
        border: 0px;
        height: 52px;
      }
      &:nth-child(3) {
        margin-bottom: 0;
      }
      &.forget-pwd {
        border: 0;
        text-align: right;
        margin-bottom: 50px;
        background: transparent;
        button {
          background: transparent;
          color: $light_color;
        }
      }
    }
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding-left: 15px;
    color: $dark_gray;
    width: 30px;
    display: inline-block;
  }
  .title {
    font-size: 42px;
    font-weight: 400;
    color: $light_color;
    margin: 0px auto 40px auto;
    text-align: center;
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 6px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .login-btn {
    width: 100%;
    background: linear-gradient(to bottom right, #e4c384, #be9966);
    box-shadow: 0 0 10px #ccc;
    &:hover {
      background: linear-gradient(to top, #be9966, #e4c384);
    }
    &:active {
      background: linear-gradient(#be9966, #be9966);
    }
  }
}
</style>

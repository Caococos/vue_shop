<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Zhihaot1
 * @Date: 2021-04-24 09:40:22
 * @LastEditors: Zhihaot1
 * @LastEditTime: 2021-05-05 09:57:51
-->
<template>
  <div class="login-container">
    <div class="login-box">
      <div class="avatar-box">
        <img
          src="~@/assets/logo.png"
          alt=""
        />
      </div>
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginFormRules"
        label-width="0px"
        class="login_form"
      >
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            prefix-icon="iconfont icon-user"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="loginForm.password"
            prefix-icon="iconfont icon-3702mima"
          ></el-input>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item class="btns">
          <el-button
            type="primary"
            @click="login"
          >登录</el-button>
          <el-button
            type="info"
            @click="resetLoginForm"
          >重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { usernameLogin } from '@/network/login'
export default {
  name: 'Login',
  data() {
    return {
      //登录表单的数据绑定对象
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      // 表单的验证规则对象
      loginFormRules: {
        username: [
          //  trigger: blur  当鼠标移动焦点触发动作
          { required: true, message: '请输入登录名称', trigger: 'blur' },
          {
            min: 3,
            max: 10,
            message: '长度在 3 到 10 个字符',
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          {
            min: 6,
            max: 15,
            message: '长度在 6 到 15 个字符',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    // 点击重置按钮
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields()
    },
    login() {
      this.$refs.loginFormRef.validate(valid => {
        if (!valid) {
          return
        }
        // const result = await usernameLogin(this.loginForm);
        usernameLogin(this.loginForm).then(res => {
          /* 1.将登录成功之后的token，保存到客户端的sessionStorage中
            1.1 项目中出了登录之外的其他API接口，必须在登录之后才能访问
            1.2 token只应在当前网站打开期间生效，所以将token保存在sessionStorage中
          */
          if (res) {
            this.$message.success('登录成功')
            window.sessionStorage.setItem('token', res.data.token)
            this.$router.push('/home')
          }
        })
      })
    }
  }
}
</script>

<style scoped lang="scss">
.login-container {
  position: relative;
  background-color: #2b4b6b;
  height: 100%;

  .login-box {
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 450px;
    height: 300px;
    background-color: #356493;
    border-radius: 3px;
    .avatar-box {
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 130px;
      height: 130px;
      border-radius: 50%;
      padding: 10px;
      box-shadow: 0 0 10px #302247;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
  }

  .login_form {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    .btns {
      display: flex;
      justify-content: center;
    }
  }
}
</style>
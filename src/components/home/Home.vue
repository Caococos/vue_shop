<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Zhihaot1
 * @Date: 2021-05-04 15:33:31
 * @LastEditors: Zhihaot1
 * @LastEditTime: 2021-05-04 16:59:45
-->
<template>
  <div class="home">
    <el-button
      type="info"
      @click="logout"
    >退出</el-button>
  </div>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {}
  },
  methods: {
    logout() {
      // 清空token
      window.sessionStorage.clear()
      // 跳转到登录页
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
}
</style>

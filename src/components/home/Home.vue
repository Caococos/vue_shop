<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Zhihaot1
 * @Date: 2021-05-04 15:33:31
 * @LastEditors: Zhihaot1
 * @LastEditTime: 2021-05-06 14:36:03
-->
<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <img
          src="~assets/hero_nobg.png"
          alt=""
        >
        <span>电商后台管理系统</span>
      </div>
      <el-button
        type="info"
        @click="logout"
      >退出</el-button>
    </el-header>
    <!-- 页面主体 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="collapseWidth">
        <!-- 隐藏侧边栏 -->
        <div
          class="toggle-button"
          @click="toggleCollapse"
        >
          <i class="el-icon-more-outline"></i>
        </div>
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409BFF"
          unique-opened
          :collapse="isCollapse"
          :collapse-transition="false"
          router
          :default-active="saveNavState"
        >
          <!-- 一级菜单 -->
          <el-submenu
            :index="item.id + ''"
            v-for="item in menuList"
            :key="item.id"
          >
            <template slot="title">
              <i :class="iconObj[item.id]"></i>
              <span>{{item.authName}}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item
              :index="subItem.path"
              v-for="subItem in item.children"
              :key="subItem.id"
            >
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{subItem.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view />
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { getMenuList } from 'network/home'
export default {
  name: 'home',
  data() {
    return {
      // 左侧菜单数据
      menuList: [],
      iconObj: {
        '125': 'iconfont icon-users',
        '103': 'iconfont icon-tijikongjian',
        '101': 'iconfont icon-shangpin',
        '102': 'iconfont icon-danju',
        '145': 'iconfont icon-baobiao'
      },
      isCollapse: false
    }
  },
  created() {
    this.getMenuList()
  },
  computed: {
    collapseWidth() {
      return this.isCollapse ? '64px' : '200px'
    },
    // 通过路由对象属性返回导航高亮路径
    saveNavState() {
      //去掉根路径
      let path = this.$route.path.replace('/home/', '')
      return path
    }
  },
  methods: {
    logout() {
      // 清空token
      window.sessionStorage.clear()
      // 跳转到登录页
      this.$router.push('/login')
    },
    // 菜单的折叠与展开
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    },

    // 网络请求相关方法
    getMenuList() {
      getMenuList().then(res => {
        if (res) {
          this.menuList = res.data
          // console.dir(this.menuList)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.home-container {
  height: 100%;
  .el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #373d41;
    color: #fff;
    font-size: 22px;
    div {
      display: flex;
      align-items: center;
      img {
        margin-right: 15px;
        height: 50px;
        border-radius: 50%;
      }
    }
  }

  .el-container {
    .el-aside {
      background-color: #333744;
      transition: all 0.4s;
      .el-menu {
        border-right: 0;
      }
    }
    .el-main {
      background-color: #eaedf1;
    }
  }
}

.iconfont {
  margin-right: 10px;
}

.toggle-button {
  background-color: #4a5064;
  text-align: center;
  line-height: 24px;
  cursor: pointer;
  .el-icon-more-outline {
    font-size: 10px;
    color: #fff;
  }
}
</style>

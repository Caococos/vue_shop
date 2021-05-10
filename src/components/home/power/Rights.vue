<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Zhihaot1
 * @Date: 2021-05-07 14:49:55
 * @LastEditors: Zhihaot1
 * @LastEditTime: 2021-05-07 15:53:23
-->
<template>
  <div class="rights">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图 -->
    <el-card>
      <el-table
        :data="rightsList"
        border
        stripe
      >
        <el-table-column type="index"></el-table-column>
        <el-table-column
          label="权限名称"
          prop="authName"
        ></el-table-column>
        <el-table-column
          label="路径"
          prop="path"
        ></el-table-column>
        <el-table-column
          label="权限等级"
          prop="level"
        >
          <template v-slot="slotProps">
            <el-tag v-if="slotProps.row.level === '0'">一级</el-tag>
            <el-tag
              type="success"
              v-else-if="slotProps.row.level === '1'"
            >二级</el-tag>
            <el-tag
              type="warning"
              v-else
            >三级</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script>
import { getRightsList } from 'network/home'
export default {
  name: 'rights',
  data() {
    return {
      rightsList: []
    }
  },
  created() {
    this.getRightsList()
  },
  methods: {
    getRightsList() {
      getRightsList().then(res => {
        if (res) {
          // console.log(res)
          this.rightsList = res.data
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
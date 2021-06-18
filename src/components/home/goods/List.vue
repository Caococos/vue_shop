<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Zhihaot1
 * @Date: 2021-05-21 12:13:23
 * @LastEditors: Zhihaot1
 * @LastEditTime: 2021-05-24 15:17:50
-->
<template>
  <div class='list'>
    <!-- 面包屑区域 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容" v-model="queryInfo.query" @keyup.enter.native="getGoodsList" clearable @clear="getGoodsList">
            <el-button slot="append" icon="el-icon-search" @click="getGoodsList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="goAddPage">添加商品</el-button>
        </el-col>
      </el-row>

      <!-- table表格区域 -->
      <el-table :data="goodsList" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="商品名称" prop="goods_name"></el-table-column>
        <el-table-column width="95px" label="商品价格(元)" prop="goods_price"></el-table-column>
        <el-table-column width="70px" label="商品重量" prop="goods_weight"></el-table-column>
        <el-table-column width="140px" label="创建时间" prop="add_time">
          <template v-slot="slotProps">
            {{slotProps.row.add_time | dateFormat}}
          </template>
        </el-table-column>
        <el-table-column width="130px" label="操作">
          <template v-slot="slotProps">
            <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeById(slotProps.row.goods_id)"></el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" background :current-page="queryInfo.pagenum" :page-sizes="[5, 10, 15, 20]" :page-size="queryInfo.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { getGoodsListRequest, deleteGodosRequest } from 'network/list';
export default {
  name: 'list',
  data() {
    return {
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 10
      },
      goodsList: [],
      total: 0
    }
  },
  created() {
    this.getGoodsList()
  },
  methods: {
    // 网络请求方法
    getGoodsList() {
      getGoodsListRequest(this.queryInfo).then(res => {
        if (res) {
          this.goodsList = res.data.goods
          this.total = res.data.total
        }
      })
    },
    deleteGodos(id) {
      deleteGodosRequest(id).then(res => {
        if (res) {
          this.$message.success(res.meta.msg)
          this.getGoodsList()
        }
      })
    },

    // 普通方法
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
      this.getGoodsList()
    },
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage
      this.getGoodsList()
    },
    removeById(id) {
      this.$MessageBox
        .confirm('此操作将永久删除该参数, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
          this.deleteGodos(id)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    goAddPage() {
      this.$router.push('add')
    }
  }
}
</script>

<style scoped>
</style>
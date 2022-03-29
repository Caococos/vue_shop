<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Zhihaot1
 * @Date: 2021-05-21 12:13:23
 * @LastEditors: Zhihaot1
 * @LastEditTime: 2021-05-24 11:23:44
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
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditVisible(slotProps.row)"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeById(slotProps.row.goods_id)"></el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" background :current-page="queryInfo.pagenum" :page-sizes="[5, 10, 15, 20]" :page-size="queryInfo.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </el-card>

    <!-- 编辑dialog区域 -->
    <el-dialog title="编辑商品" :visible.sync="editDialogVisible" @close="editListDialogClose" width="50%">

      <!-- 表单区域 -->
      <el-form :model="editForm" ref="editListFormRules" :rules="editFormRules" label-width="100px">
        <el-form-item label="商品名称" prop="goods_name">
          <el-input v-model="editForm.goods_name" clearable></el-input>
        </el-form-item>
        <el-form-item label="价格" prop="goods_price">
          <el-input v-model="editForm.goods_price" clearable></el-input>
        </el-form-item>
        <el-form-item label="数量" prop="goods_number">
          <el-input v-model="editForm.goods_number" clearable></el-input>
        </el-form-item>
        <el-form-item label="重量" prop="goods_weight">
          <el-input v-model="editForm.goods_weight" clearable></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editFormRequest">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getGoodsListRequest, deleteGodosRequest, editGoodsRequest } from 'network/list';
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
      total: 0,
      editDialogVisible: false,
      editForm: {
        goods_name: '',
        goods_number: 0,
        goods_price: 0,
        goods_weight: 0
      },
      editGoodsId: 0,
      editFormRules: {
        goods_name: [
          {
            required: true,
            message: '请输入商品名称',
            trigger: 'blur',
          },
        ],
        goods_price: [
          {
            required: true,
            message: '请输入商品价格',
            trigger: 'blur',
          },
        ],
        goods_weight: [
          {
            required: true,
            message: '请输入商品重量',
            trigger: 'blur',
          },
        ],
        goods_number: [
          {
            required: true,
            message: '请输入商品数量',
            trigger: 'blur',
          },
        ]
      }
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
    editGoods(id) {
      editGoodsRequest(id, this.editForm).then(res => {
        if (res) {
          this.$message.success(res.meta.msg)
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
    showEditVisible(row) {
      console.log(row);
      this.editDialogVisible = true
      this.editGoodsId = row.goods_id
      this.editForm.goods_name = row.goods_name
      this.editForm.goods_number = row.goods_number
      this.editForm.goods_price = row.goods_price
      this.editForm.goods_weight = row.goods_weight
    },
    editListDialogClose() {
      this.$refs.editListFormRules.resetFields()
    },
    editFormRequest() {
      this.$refs.editListFormRules.validate(valid => {
        if (!valid) {
          return this.$message.error('请填写必要的表单项！')
        }
        this.editGoods(this.editGoodsId)
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
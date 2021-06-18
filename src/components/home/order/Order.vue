<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Zhihaot1
 * @Date: 2021-05-24 14:38:04
 * @LastEditors: Zhihaot1
 * @LastEditTime: 2021-05-27 18:14:30
-->
<template>
  <div class='order'>
    <!-- 面包屑区域 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容" v-model="queryInfo.query" @keyup.enter.native="getOdersList" clearable @clear="getOdersList">
            <el-button slot="append" icon="el-icon-search" @click="getOdersList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary">添加商品</el-button>
        </el-col>
      </el-row>

      <!-- 订单列表数据表格 -->
      <el-table :data="ordersList" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="订单标号" prop="order_number"></el-table-column>
        <el-table-column label="订单价格" prop="order_price"></el-table-column>
        <el-table-column label="是否付款" prop="pay_status">
          <template v-slot="slotProps">
            <el-tag type="success" v-if="slotProps.row.pay_status === '1'">已付款</el-tag>
            <el-tag type="danger" v-else>未付款</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="是否发货" prop="is_send"></el-table-column>
        <el-table-column label="下单时间" prop="create_time">
          <template v-slot="slotProps">
            {{slotProps.row.create_time | dateFormat}}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template v-slot="slotProps">
            <el-tooltip :enterable="false" content="修改地址" placement="top">
              <el-button @click="showBox" size="mini" type="primary" icon="el-icon-edit"></el-button>
            </el-tooltip>
            <el-tooltip :enterable="false" content="物流信息" placement="top">
              <el-button size="mini" type="success" icon="el-icon-location" @click="showProgressBox"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" background :current-page="queryInfo.pagenum" :page-sizes="[5, 10, 15, 20]" :page-size="queryInfo.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </el-card>

    <!-- 修改地址的对话框区域 -->
    <el-dialog @close="addressDialogClosed" title="修改地址" :visible.sync="addressVisible" width="50%">
      <!-- 表单区域 -->
      <el-form :model="addressForm" :rules="addressFormRules" ref="addressFormRef" label-width="100px">
        <el-form-item label="省市区/县" prop="address1">
          <el-cascader :options="cityData" v-model="addressForm.address1"></el-cascader>
        </el-form-item>
        <el-form-item label="详细地址" prop="address2">
          <el-input v-model="addressForm.address2"></el-input>
        </el-form-item>
      </el-form>
      <!-- 按钮 -->
      <span slot="footer">
        <el-button @click="addressVisible = false">取 消</el-button>
        <el-button type="primary" @click="putAddress">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 展示物流进度的对话框 -->
    <el-dialog title="物流进度" :visible.sync="progressVisible" width="50%">
      <span>该功能还未开发呢！</span>
    </el-dialog>
  </div>
</template>

<script>
import cityData from 'common/citydata';
import { getOrderListRequest, queryProgressInfoRequest } from 'network/orders';
export default {
  name: 'order',
  data() {
    return {
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 10,
        user_id: '',
        pay_status: '',
        is_send: '',
        order_fapiao_title: '',
        order_fapiao_company: '',
        order_fapiao_content: '',
        consignee_addr: ''
      },
      ordersList: [],
      total: 0,
      addressVisible: false,
      addressForm: {
        address1: [],
        address2: ''
      },
      addressFormRules: {
        address1: [
          {
            required: true, message: '请选择省市区县', trigger: 'blur'
          }
        ],
        address2: [
          {
            required: true, message: '请填写详细地址', trigger: 'blur'
          }
        ]
      },
      // 属性名和属性值同名可以简写
      cityData,
      progressVisible: false,
      progressInfo: []
    }
  },
  created() {
    this.getOdersList()
  },
  methods: {
    // 网络请求方法
    getOdersList() {
      getOrderListRequest(this.queryInfo).then(res => {
        if (res) {
          this.ordersList = res.data.goods
          this.total = res.data.total
        }
      })
    },
    getProgressInfo() {
      // 供测试的订单号
      queryProgressInfoRequest(804909574412544580).then(res => {
        if (res) {
          this.progressInfo = res.data
          console.log(this.progressInfo);
        }
      })
    },

    // 普通方法
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
      this.getOdersList()
    },
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage
      this.getOdersList()
    },
    // 展示修改地址的对话框
    showBox() {
      this.addressVisible = true
    },
    addressDialogClosed() {
      this.$refs.addressFormRef.resetFields()
    },
    putAddress() {
      this.$message.error('该功能还未开发呢！')
    },
    showProgressBox() {
      this.progressVisible = true
      // 物流接口崩掉了
      // this.getProgressInfo()
    }
  }
}
</script>

<style scoped>
.el-cascader {
  width: 100%;
}
</style>
<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Zhihaot1
 * @Date: 2021-05-11 11:04:43
 * @LastEditors: Zhihaot1
 * @LastEditTime: 2021-05-24 11:07:26
-->
<template>
  <div class="categories">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card>
      <el-row>
        <el-col>
          <el-button type="primary" @click="showAddCateDialog">添加分类</el-button>
        </el-col>
      </el-row>

      <!-- 表格 -->
      <tree-table class="treeTable" :data="cateList" :columns="columns" :selection-type="false" :expand-type="false" show-index index-text="" border :show-row-hover="false">
        <!-- 是否有效 -->
        <template v-slot:isOk="slotProps">
          <i class="el-icon-success" v-if="slotProps.row.cat_deleted === false" style="color: rgb(46, 180, 46); font-size: 20px"></i>
          <i class="el-icon-error; font-size: 20px" v-else style="color: red"></i>
        </template>
        <!-- 排序 -->
        <template v-slot:order="slotProps">
          <el-tag size="mini" v-if="slotProps.row.cat_level === 0">一级</el-tag>
          <el-tag size="mini" type="success" v-else-if="slotProps.row.cat_level === 1">二级</el-tag>
          <el-tag size="mini" type="warning" v-else>三级</el-tag>
        </template>
        <!-- 操作 -->
        <template v-slot:options="slotProps">
          <el-button size="mini" type="primary" class="el-icon-edit" @click="showEditDialog(slotProps.row.cat_id)">编辑</el-button>
          <el-button size="mini" type="danger" class="el-icon-delete" @click="removeCate(slotProps.row.cat_id)">删除</el-button>
        </template>
      </tree-table>

      <!-- 分页 -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pagenum" :page-sizes="[3, 5, 10, 15]" :page-size="queryInfo.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </el-card>

    <!-- 添加分类的对话框 -->
    <el-dialog title="添加分类" :visible.sync="addCateDialogVisible" width="50%" @close="addCateDialogClose">
      <!-- 表单 -->
      <el-form :model="addCateForm" :rules="addCateFormRules" ref="addCateFormRef" label-width="100px">
        <el-form-item label="分类名称" prop="cat_name">
          <el-input v-model="addCateForm.cat_name" clearable></el-input>
        </el-form-item>
        <!-- options 用来指定数据源 -->
        <!-- props 用来指定配置对象 -->
        <el-form-item label="父级分类:">
          <el-cascader v-model="selectedKeys" :options="cateParentList" :props="cascaderProps" @change="parentCateChanged" clearable></el-cascader>
        </el-form-item>
      </el-form>

      <span slot="footer">
        <el-button @click="addCateDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCate">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 编辑对话框 -->
    <el-dialog title="添加分类" :visible.sync="editCateDialogVisible" width="50%" @close="editCateDialogClose">
      <!-- 表单 -->
      <el-form :model="editForm" :rules="addCateFormRules" ref="editCateFormRef" label-width="100px">
        <el-form-item label="分类名称" prop="cat_name">
          <el-input v-model="editForm.cat_name" clearable></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer">
        <el-button @click="editCateDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editCate">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getCateList,
  addCate,
  queryInfo,
  editCateInfo,
  deleteCate
} from 'network/categories'
export default {
  name: 'categories',
  data() {
    return {
      // 查询条件
      queryInfo: {
        type: 3,
        pagenum: 1,
        pagesize: 5
      },
      // 商品分类的数据列表
      cateList: [],
      //总数据数量
      total: 0,
      // 为table指定列的定义
      columns: [
        {
          label: '分类名称',
          prop: 'cat_name'
        },
        {
          label: '是否有效',
          // 定义为模板列
          type: 'template',
          template: 'isOk'
        },
        {
          label: '排序',
          type: 'template',
          template: 'order'
        },
        {
          label: '操作',
          type: 'template',
          template: 'options'
        }
      ],
      addCateDialogVisible: false,
      addCateForm: {
        cat_name: '',
        // 父级分类的id
        cat_pid: 0,
        // 分类的等级，默认为1级
        cat_level: 0
      },
      addCateFormRules: {
        cat_name: [
          { required: true, message: '请输入分类的名称', trigger: 'blur' }
        ]
      },
      cateParentList: [],
      // 指定级联选择器的配置对象
      cascaderProps: {
        expandTrigger: 'hover',
        value: 'cat_id',
        label: 'cat_name',
        children: 'children',
        checkStrictly: true
      },
      // 选中的父级分类id数组绑定的表单
      selectedKeys: [],
      editForm: {
        cat_name: '',
        id: 0
      },
      editCateDialogVisible: false
    }
  },
  created() {
    this.getCateList()
  },
  methods: {
    // 网络请求方法
    getCateList() {
      getCateList(this.queryInfo).then(res => {
        if (res) {
          this.cateList = res.data.result
          this.total = res.data.total
        }
      })
    },
    // 请求父级分类的数据列表
    getParentCateList() {
      getCateList({ params: { type: 2 } }).then(res => {
        if (res) {
          this.cateParentList = res.data
        }
      })
    },
    addCate() {
      this.$refs.addCateFormRef.validate(valid => {
        if (!valid) {
          return
        }
        addCate(this.addCateForm).then(res => {
          if (res) {
            this.$message.success('添加分类成功！')
            this.getCateList()
            this.addCateDialogVisible = false
          }
        })
      })
    },
    deleteCate(id) {
      deleteCate(id).then(res => {
        if (res) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getCateList()
        }
      })
    },
    editCateInfo() {
      editCateInfo(this.editForm).then(res => {
        if (res) {
          this.$message.success(res.meta.msg)
          this.getCateList()
        }
      })
    },

    // 普通方法
    // 监听pagesize改变
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
      this.getCateList()
    },
    // 监听pagenum改变
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage
      this.getCateList()
    },
    showAddCateDialog() {
      this.getParentCateList()
      this.addCateDialogVisible = true
    },
    //选择项发生变化触发的函数
    parentCateChanged() {
      // 如果selectedKeys数组中的length大于0，证明选中的是父级分类。
      // 反之，就说明没有选中任何父级分类
      const length = this.selectedKeys.length
      if (length > 0) {
        // 为当前分类的id和level赋值
        this.addCateForm.cat_pid = this.selectedKeys[length - 1]
        this.addCateForm.cat_level = length
        return
      } else {
        this.addCateForm.cat_pid = 0
        this.addCateForm.cat_level = 0
      }
    },
    // 重置表单
    addCateDialogClose() {
      this.$refs.addCateFormRef.resetFields()
      this.selectedKeys = []
      this.addCateForm.cat_pid = 0
      this.addCateForm.cat_level = 0
    },
    showEditDialog(id) {
      queryInfo(id).then(res => {
        if (res) {
          this.editForm.cat_name = res.data.cat_name
          this.editForm.id = id
        }
      })
      this.editCateDialogVisible = true
    },
    editCate() {
      this.editCateInfo()
      this.editCateDialogVisible = false
    },
    editCateDialogClose() {
      this.$refs.editCateFormRef.resetFields()
    },
    removeCate(id) {
      this.$MessageBox
        .confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
          this.deleteCate(id)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.treeTable {
  margin-top: 15px;
}

.el-cascader {
  width: 100%;
}
</style>
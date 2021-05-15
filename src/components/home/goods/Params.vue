<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Zhihaot1
 * @Date: 2021-05-13 21:16:21
 * @LastEditors: Zhihaot1
 * @LastEditTime: 2021-05-15 21:59:52
-->
<template>
  <div class="params">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>参数列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片区域 -->
    <el-card>
      <!-- 警告区域 -->
      <el-alert title="注意：只允许为第三级分类设置相关参数！" type="warning" show-icon center :closable="false">
      </el-alert>

      <!-- 选择商品分类区域 -->
      <el-row class="cat_opt">
        <el-col>
          <span>选择商品分类：</span>
          <!-- 选择商品分类的级联 -->
          <el-cascader v-model="selectedCateKeys" :options="cateList" :props="cateProps" @change="handleChanged"></el-cascader>
        </el-col>
      </el-row>

      <!-- tab 页签区域 -->
      <el-tabs v-model="activeName" @tab-click="handleTabClick">
        <!-- 添加动态参数的面板 -->
        <el-tab-pane label="动态参数" name="many">
          <el-button type="primary" size="mini" :disabled="isBtnDisabled" @click="addDialogVisible = true">添加参数</el-button>
          <!-- 动态参数表格 -->
          <el-table :data="manyTableData" border stripe>
            <!-- 展开行 -->
            <el-table-column type="expand">
              <template v-slot="slotProps">
                <!-- v-for渲染现有标签 -->
                <el-tag v-for="(item, index) in slotProps.row.attr_vals" :key="index" closable @close="handleClose(index, slotProps.row)">{{item}}</el-tag>
                <!-- 添加标签 -->
                <el-input class="input-new-tag" v-if="slotProps.row.inputVisible" v-model="slotProps.row.inputValue" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm(slotProps.row)" @blur="handleInputConfirm(slotProps.row)">
                </el-input>
                <el-button v-else class="button-new-tag" size="small" @click="showInput(slotProps.row)">+ New Tag</el-button>
              </template>
            </el-table-column>
            <!-- 索引列 -->
            <el-table-column type="index"></el-table-column>
            <el-table-column label="参数名称" prop="attr_name"></el-table-column>
            <el-table-column label="操作">
              <template v-slot="slotProps">
                <el-button size="mini" type="primary" icon="el-icon-edit" @click="showEditDialog(slotProps.row.attr_id)">编辑</el-button>
                <el-button size="mini" type="danger" icon="el-icon-delete" @click="removeParams(slotProps.row.attr_id)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <!-- 添加静态属性的面板 -->
        <el-tab-pane label="静态属性" name="only">
          <el-button type="primary" size="mini" :disabled="isBtnDisabled" @click="addDialogVisible = true">添加属性</el-button>
          <!-- 静态属性表格 -->
          <el-table :data="onlyTableData" border stripe>
            <!-- 展开行 -->
            <el-table-column type="expand">
              <template v-slot="slotProps">
                <!-- v-for渲染现有标签 -->
                <el-tag v-for="(item, index) in slotProps.row.attr_vals" :key="index" closable @close="handleClose(index, slotProps.row)">{{item}}</el-tag>
                <!-- 添加标签 -->
                <el-input class="input-new-tag" v-if="slotProps.row.inputVisible" v-model="slotProps.row.inputValue" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm(slotProps.row)" @blur="handleInputConfirm(slotProps.row)">
                </el-input>
                <el-button v-else class="button-new-tag" size="small" @click="showInput(slotProps.row)">+ New Tag</el-button>
              </template>
            </el-table-column>
            <!-- 索引列 -->
            <el-table-column type="index"></el-table-column>
            <el-table-column label="属性名称" prop="attr_name"></el-table-column>
            <el-table-column label="操作">
              <template v-slot="slotProps">
                <el-button size="mini" type="primary" icon="el-icon-edit" @click="showEditDialog(slotProps.row.attr_id)">编辑</el-button>
                <el-button size="mini" type="danger" icon="el-icon-delete" @click="removeParams(slotProps.row.attr_id)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>

    <!-- 添加参数的对话框 -->
    <el-dialog :title="'添加' + titleText" :visible.sync="addDialogVisible" width="50%" @close="addDialogClose">
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="100px">
        <el-form-item :label="titleText" prop="attr_name">
          <el-input v-model="addForm.attr_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addParams">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改参数对话框 -->
    <el-dialog :title="'修改' + titleText" :visible.sync="editDialogVisible" width="50%" @close="editDialogClose">
      <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="100px">
        <el-form-item :label="titleText" prop="attr_name">
          <el-input v-model="editForm.attr_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editParams">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getCateList } from 'network/categories'
import { getParamsList, addParamsRequest, queryInfo, editParamsRequest, deleteParamsRequest } from 'network/params';
export default {
  name: 'params',
  data() {
    return {
      cateList: [],
      cateProps: {
        expandTrigger: 'hover',
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'
      },
      selectedCateKeys: [],
      // 被激活页签的名称
      activeName: 'many',
      manyTableData: [],
      onlyTableData: [],
      addDialogVisible: false,
      addForm: {
        attr_name: ''
      },
      addFormRules: {
        attr_name: [
          { required: true, message: '请输入参数名称', trigger: 'blur' }
        ]
      },
      editDialogVisible: false,
      editForm: {},
      editFormRules: {
        attr_name: [
          { required: true, message: '请输入参数名称', trigger: 'blur' }
        ]
      },
      // inputVisible: false,
      // inputValue: ''
    }
  },
  created() {
    this.getCateList()
  },
  methods: {
    // 网络请求函数
    getCateList() {
      getCateList().then(res => {
        if (res) {
          this.cateList = res.data
        }
      })
    },
    getParamsList() {
      getParamsList(this.cateId, this.activeName).then(res => {
        if (res) {
          res.data.forEach(item => {
            item.attr_vals = item.attr_vals ? item.attr_vals.split(' ') : []
            // 控制文本框的显示与隐藏
            item.inputVisible = false
            // 文本框中输入的值
            item.inputValue = ''
          })
          if (this.activeName === 'many') {
            this.manyTableData = res.data
          } else {
            this.onlyTableData = res.data
          }
        }
      })
    },
    addParamsRequest() {
      addParamsRequest(this.cateId, this.addForm.attr_name, this.activeName).then(res => {
        if (res) {
          // 成功创建参数时才请求参数列表
          this.$message.success(res.meta.msg)
          this.getParamsList()
        }
      })
    },
    queryInfo(id) {
      queryInfo(this.cateId, id, this.activeName).then(res => {
        if (res) {
          this.editForm = res.data
          console.log(this.editForm);
        }
      })
    },
    editParamsRequest(attrObj, vals) {
      editParamsRequest(this.cateId, attrObj, vals).then(res => {
        if (res) {
          if (!vals) {
            this.getParamsList()
            this.$message.success('修改成功！')
          }
        }
      })
    },
    deleteParamsRequest(id) {
      deleteParamsRequest(this.cateId, id).then(res => {
        if (res) {
          this.$message.success(res.meta.msg)
          this.getParamsList()
        }
      })
    },

    // 普通方法
    handleChanged() {
      if (this.selectedCateKeys.length !== 3) {
        this.selectedCateKeys = []
        this.manyTableData = []
        this.onlyTableData = []
        return
      }
      this.getParamsList()
    },
    // tab页签 点击事件的处理函数
    handleTabClick() {
      if (this.selectedCateKeys.length !== 0) {
        this.getParamsList()
      }
    },
    addDialogClose() {
      this.$refs.addFormRef.resetFields()
    },
    addParams() {
      this.getParamsList()
      this.$refs.addFormRef.validate(valid => {
        if (!valid) {
          return
        }
        this.addParamsRequest()
        this.addDialogVisible = false
      })
    },
    showEditDialog(id) {
      this.queryInfo(id)
      this.editDialogVisible = true
    },
    editDialogClose() {
      this.$refs.editFormRef.resetFields()
    },
    editParams() {
      this.$refs.editFormRef.validate(valid => {
        if (!valid) {
          return
        }
        this.editParamsRequest(this.editForm)
        this.editDialogVisible = false
      })
    },
    removeParams(id) {
      this.$MessageBox
        .confirm('此操作将永久删除该参数, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
          this.deleteParamsRequest(id)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 文本框失去焦点，或摁下了Enter都会触发
    handleInputConfirm(row) {
      // 输入无效字符则重置
      if (row.inputValue.trim().length === 0) {
        row.inputValue = ''
        row.inputVisible = false
        return
      }
      row.attr_vals.push(row.inputValue.trim())
      row.inputValue = ''
      row.inputVisible = false
      const vals = row.attr_vals.join(' ')
      this.editParamsRequest(row, vals)
    },
    showInput(row) {
      row.inputVisible = true
      // 文本框自动获得焦点
      // $nextTick 方法的作用，就是当页面上元素被重新渲染之后，才会执行回调函数中的代码
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    handleClose(index, row) {
      row.attr_vals.splice(index, 1)
      const vals = row.attr_vals.join(' ')
      this.editParamsRequest(row, vals)
    }
  },
  computed: {
    isBtnDisabled() {
      if (this.selectedCateKeys.length !== 3) {
        return true
      }
      return false
    },
    cateId() {
      if (this.selectedCateKeys.length === 3) {
        return this.selectedCateKeys[2]
      }
      return null
    },
    // 动态计算对话框文本
    titleText() {
      if (this.activeName === 'many') {
        return '动态参数'
      }
      return '静态属性'
    }
  }
}
</script>

<style scoped>
.cat_opt {
  margin: 15px 0;
}

.el-tag {
  margin-right: 15px;
}

.input-new-tag {
  width: 120px;
}
</style>
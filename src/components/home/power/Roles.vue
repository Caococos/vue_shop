<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Zhihaot1
 * @Date: 2021-05-07 14:52:54
 * @LastEditors: Zhihaot1
 * @LastEditTime: 2021-05-14 22:50:35
-->
<template>
  <div class="roles">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图 -->
    <el-card>
      <el-row>
        <el-col>
          <el-button type="primary" @click="addDialogVisible = true">添加角色</el-button>
        </el-col>
      </el-row>
      <el-table :data="rolesList" border stripe>
        <!-- 展开列 -->
        <el-table-column type="expand">
          <template v-slot="slotProps">
            <el-row v-for="(item1, i1) in slotProps.row.children" :key="item1.id" :class="['bdbottom', {'bdtop': i1===0}, 'vcenter']">
              <!-- 渲染一级权限 -->
              <el-col :span="5">
                <el-tag closable @close="removeRightsById(slotProps.row, item1.id)">{{item1.authName}}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <!-- 渲染二级和三级权限 -->
              <el-col :span="19">
                <!-- 通过for循环 嵌套渲染二级权限 -->
                <el-row v-for="(item2, i2) in item1.children" :key="item2.id" :class="[{'bdtop': i2!==0}, 'vcenter']">
                  <el-col :span="6">
                    <el-tag type="success" closable @close="removeRightsById(slotProps.row, item2.id)">{{item2.authName}}</el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="18">
                    <!-- 渲染三级权限 -->
                    <el-tag v-for="item3 in item2.children" :key="item3.id" type="warning" closable @close="removeRightsById(slotProps.row, item3.id)">
                      {{item3.authName}}
                    </el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <!-- 索引列 -->
        <el-table-column type="index"></el-table-column>
        <el-table-column label="角色名称" prop="roleName"></el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
        <el-table-column label="操作" width="300px">
          <template v-slot="slotProps">
            <el-button size="mini" type="primary" icon="el-icon-edit" @click="showEditDialog(slotProps.row.id)">编辑</el-button>
            <el-button size="mini" type="danger" icon="el-icon-delete" @click="removeRoles(slotProps.row.id)">删除</el-button>
            <el-button size="mini" type="warning" icon="el-icon-setting" @click="showSetRightDialog(slotProps.row)">分配权限</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 添加用户的对话框 -->
      <el-dialog title="添加用户" :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed">
        <!-- 内容主体区域 -->
        <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px" status-icon>
          <el-form-item label="角色名称" prop="roleName" label-width="100px">
            <el-input v-model="addForm.roleName" clearable></el-input>
          </el-form-item>
          <el-form-item label="角色描述" prop="roleDesc" label-width="100px">
            <el-input v-model="addForm.roleDesc" clearable></el-input>
          </el-form-item>
        </el-form>
        <!-- 底部按钮区域 -->
        <span slot="footer">
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addRoles">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 编辑用户的对话框 -->
      <el-dialog title="编辑用户" :visible.sync="editDialogVisible" width="50%" @close="editDialogClosed">
        <!-- 内容主体区域 -->
        <el-form :model="editForm" :rules="addFormRules" ref="editFormRef" label-width="70px" status-icon>
          <el-form-item label="角色名称" prop="roleName" label-width="100px">
            <el-input v-model="editForm.roleName" clearable></el-input>
          </el-form-item>
          <el-form-item label="角色描述" prop="roleDesc" label-width="100px">
            <el-input v-model="editForm.roleDesc" clearable></el-input>
          </el-form-item>
        </el-form>
        <!-- 底部按钮区域 -->
        <span slot="footer">
          <el-button @click="editDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="editRoles">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>

    <!-- 分配权限的对话框 -->
    <el-dialog title="分配权限" :visible.sync="setRightDialogVisible" width="50%" @close="SetRightDialogClose">
      <!-- 树形控件 -->
      <el-tree :data="rightsList" :props="treeProps" show-checkbox node-key="id" default-expand-all :default-checked-keys="defKeys" ref="treeRef"></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setRightDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="allotRights">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getRolesList,
  addRoles,
  queryRolesInfo,
  editRoles,
  deleteRoles,
  deleteRolesRight,
  getSetRightTree,
  allotRights
} from 'network/roles'
export default {
  name: 'roles',
  data() {
    return {
      rolesList: [],
      addDialogVisible: false,
      addForm: {
        roleName: '',
        roleDesc: ''
      },
      addFormRules: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
          { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
        ],
        roleDesc: [
          { required: true, message: '请输入角色描述', trigger: 'blur' }
        ]
      },
      editDialogVisible: false,
      editForm: {},
      //控制分配权限对话框的显示与隐藏
      setRightDialogVisible: false,
      rightsList: [],
      //树形控件的属性绑定对象
      treeProps: {
        label: 'authName',
        children: 'children'
      },
      // 默认选中的节点ID值
      defKeys: [],
      // 保存的roleId
      roleId: ''
    }
  },
  created() {
    this.getRolesList()
  },
  methods: {
    // ------------网络请求相关方法---------
    getRolesList() {
      getRolesList().then(res => {
        if (res) {
          this.rolesList = res.data
        }
      })
    },
    addRoles() {
      this.$refs.addFormRef.validate(valid => {
        if (!valid) {
          return
        }
        // 通过校验，发起网络请求
        addRoles(this.addForm).then(res => {
          if (res) {
            this.$message.success('添加角色成功！')
            this.addDialogVisible = false
            this.getRolesList() //重新发起请求，刷新User组件内的用户信息
          }
        })
      })
    },
    editRoles() {
      this.$refs.editFormRef.validate(valid => {
        if (!valid) {
          return
        }
        // 通过校验，发起网络请求
        editRoles(this.editForm).then(res => {
          if (res) {
            this.$message.success('修改角色成功！')
            this.editDialogVisible = false
            this.getRolesList() //重新发起请求，刷新User组件内的用户信息
          }
        })
      })
    },
    deleteRoles() {
      deleteRoles(id).then(res => {
        if (res) {
          this.getRolesList()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }
      })
    },
    deleteRolesRight() {
      deleteRolesRight(role.id, rightId).then(res => {
        if (res) {
          // 不用刷新页面更改数据
          role.children = res.data
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }
      })
    },
    allotRights() {
      const keys = [
        ...this.$refs.treeRef.getCheckedKeys(),
        ...this.$refs.treeRef.getHalfCheckedKeys()
      ]
      const idStr = keys.join(',')
      allotRights(this.roleId, idStr).then(res => {
        if (res) {
          this.$message.success('更新权限成功！')
          this.getRolesList()
          this.setRightDialogVisible = false
        }
      })
    },
    showEditDialog(id) {
      queryRolesInfo(id).then(res => {
        if (res) {
          this.editForm = res.data
          this.editDialogVisible = true
        }
      })
    },
    getSetRightTree() {
      getSetRightTree().then(res => {
        //请求所有权限的树形列表
        if (res) {
          this.rightsList = res.data
        }
      })
    },

    // ------------普通方法-----------
    addDialogClosed() {
      this.$refs.addFormRef.resetFields()
    },
    editDialogClosed() {
      this.$refs.editFormRef.resetFields()
    },
    // 分配权限弹框
    showSetRightDialog(role) {
      this.roleId = role.id
      this.getSetRightTree()
      this.getnodeKeys(role, this.defKeys)
      this.setRightDialogVisible = true
    },
    // 遍历当前角色的三级权限节点
    getnodeKeys(node, arr) {
      if (!node.children) {
        return arr.push(node.id)
      }
      node.children.forEach(item => this.getnodeKeys(item, arr))
    },
    // 重置defKeys数组
    SetRightDialogClose() {
      this.defKeys = []
    },
    removeRoles(id) {
      this.$MessageBox
        .confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
          this.deleteRoles()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    removeRightsById(role, rightId) {
      this.$MessageBox
        .confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
          this.deleteRolesRight()
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
.el-tag {
  margin: 7px;
}

.bdtop {
  border-top: 1px solid #eee;
}

.bdbottom {
  border-bottom: 1px solid #eee;
}

.vcenter {
  display: flex;
  align-items: center;
}
</style>
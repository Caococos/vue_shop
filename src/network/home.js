/*
 * @Descripttion:
 * @version: 1.0
 * @Author: Zhihaot1
 * @Date: 2021-05-04 20:21:43
 * @LastEditors: Zhihaot1
 * @LastEditTime: 2021-05-10 16:14:21
 */
import { request } from 'network/request';

// 获取菜单列表
export function getMenuList() {
  return request({ url: '/menus' })
}

// ------------User----------
// 获取用户列表
export function getUserList(queryInfo) {
  return request({
    url: '/users',
    params: queryInfo
  })
}

// 修改用户状态
export function changeUserState(id, state) {
  return request({
    method: 'put',
    url: `/users/${id}/state/${state}`
  })
}

// 添加用户
export function addUser(userObj) {
  return request({
    method: 'post',
    url: '/users',
    data: userObj
  })
}

// 查询用户信息
export function queryUserInfo(id) {
  return request({
    url: '/users/' + id,
  })
}

// 修改用户信息
export function editUserInfo(editInfoObj) {
  return request({
    method: 'put',
    url: '/users/' + editInfoObj.id,
    data: {
      email: editInfoObj.email,
      mobile: editInfoObj.mobile
    }
  })
}

// 删除用户
export function deleteUser(id) {
  return request({
    method: 'delete',
    url: 'users/' + id
  })
}

// ------------Rights------------
// 用户权限列表
export function getRightsList() {
  return request({
    url: 'rights/list'
  })
}

// ------------Roles---------------
export function getRolesList() {
  return request({
    url: 'roles'
  })
}

export function addRoles(rolesObj) {
  return request({
    method: 'post',
    url: 'roles',
    data: rolesObj
  })
}

export function queryRolesInfo(id) {
  return request({
    url: 'roles/' + id
  })
}

export function editRoles(rolesObj) {
  return request({
    method: 'put',
    url: 'roles/' + rolesObj.roleId,
    data: {
      roleName: rolesObj.roleName,
      roleDesc: rolesObj.roleDesc
    }
  })
}

export function deleteRoles(id) {
  return request({
    method: 'delete',
    url: 'roles/' + id
  })
}

export function deleteRolesRight(roleId, rightId) {
  return request({
    method: 'delete',
    url: `roles/${roleId}/rights/${rightId}`
  })
}

export function getSetRightTree() {
  return request({
    url: 'rights/tree'
  })
}

export function allotRights(roleId, idStr) {
  return request({
    method: 'post',
    url: `roles/${roleId}/rights`,
    data: {
      rids: idStr
    }
  })
}

export function allotRole(userId, roleId) {
  return request({
    method: 'put',
    url: `users/${userId}/role`,
    data: {
      rid: roleId
    }
  })
}

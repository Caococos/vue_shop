/*
 * @Descripttion:
 * @version: 1.0
 * @Author: Zhihaot1
 * @Date: 2021-05-11 11:01:56
 * @LastEditors: Zhihaot1
 * @LastEditTime: 2021-05-11 11:02:07
 */
import { request } from 'network/request';


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
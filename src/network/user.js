/*
 * @Descripttion:
 * @version: 1.0
 * @Author: Zhihaot1
 * @Date: 2021-05-11 11:01:03
 * @LastEditors: Zhihaot1
 * @LastEditTime: 2021-05-11 11:01:13
 */
import { request } from 'network/request';


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

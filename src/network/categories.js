/*
 * @Descripttion:
 * @version: 1.0
 * @Author: Zhihaot1
 * @Date: 2021-05-11 11:03:18
 * @LastEditors: Zhihaot1
 * @LastEditTime: 2021-05-13 10:33:47
 */
import { request } from 'network/request'

export function getCateList(queryInfo) {
  return request({
    url: 'categories',
    params: queryInfo
  })
}

export function addCate(addCateObj) {
  return request({
    method: 'post',
    url: 'categories',
    data: addCateObj
  })
}

export function queryInfo(id) {
  return request({
    url: 'categories/' + id
  })
}

export function editCateInfo(eidtObj) {
  return request({
    method: 'put',
    url: 'categories/' + eidtObj.id,
    data: { cat_name: eidtObj.cat_name }
  })
}

export function deleteCate(id) {
  return request({
    method: 'delete',
    url: 'categories/' + id
  })
}

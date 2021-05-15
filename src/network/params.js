/*
 * @Descripttion:
 * @version: 1.0
 * @Author: Zhihaot1
 * @Date: 2021-05-13 21:33:47
 * @LastEditors: Zhihaot1
 * @LastEditTime: 2021-05-15 21:36:36
 */
import { request } from 'network/request'

export function getParamsList(id, type) {
  return request({
    url: `categories/${id}/attributes`,
    params: {
      sel: type
    }
  })
}

export function addParamsRequest(id, name, sel) {
  return request({
    method: 'post',
    url: `categories/${id}/attributes`,
    data: {
      attr_name: name,
      attr_sel: sel
    }
  })
}

export function queryInfo(id, attrId, sel) {
  return request({
    url: `categories/${id}/attributes/${attrId}`,
    data: {
      attr_sel: sel
    }
  })
}

export function editParamsRequest(id, attrObj, vals) {
  return request({
    method: 'put',
    url: `categories/${id}/attributes/${attrObj.attr_id}`,
    data: {
      attr_name: attrObj.attr_name,
      attr_sel: attrObj.attr_sel,
      attr_vals: vals
    }
  })
}

export function deleteParamsRequest(id, attr_id) {
  return request({
    method: 'delete',
    url: `categories/${id}/attributes/${attr_id}`
  })
}

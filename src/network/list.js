/*
 * @Descripttion:
 * @version: 1.0
 * @Author: Zhihaot1
 * @Date: 2021-05-21 15:15:50
 * @LastEditors: Zhihaot1
 * @LastEditTime: 2021-05-24 08:53:00
 */
import { request } from 'network/request'

export function getGoodsListRequest(queryInfo) {
  return request({
    method: 'get',
    url: 'goods',
    params: queryInfo
  })
}

export function deleteGodosRequest(id) {
  return request({
    method: 'delete',
    url: `goods/${id}`
  })
}

export function addGoodsRequest(form) {
  return request({
    method: 'post',
    url: 'goods',
    data: form
  })
}

/*
 * @Descripttion:
 * @version: 1.0
 * @Author: Zhihaot1
 * @Date: 2021-05-21 15:15:50
 * @LastEditors: Zhihaot1
 * @LastEditTime: 2021-05-21 16:05:20
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

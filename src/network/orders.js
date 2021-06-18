/*
 * @Descripttion:
 * @version: 1.0
 * @Author: Zhihaot1
 * @Date: 2021-05-24 14:50:19
 * @LastEditors: Zhihaot1
 * @LastEditTime: 2021-05-24 21:28:21
 */
import { request } from 'network/request';

export function getOrderListRequest(Obj) {
  return request({
    url: 'orders',
    params: Obj
  })
}

export function queryProgressInfoRequest(id) {
  return request({
    url: `kuaidi/${id}`
  })
}

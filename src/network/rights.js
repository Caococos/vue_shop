/*
 * @Descripttion:
 * @version: 1.0
 * @Author: Zhihaot1
 * @Date: 2021-05-11 10:59:47
 * @LastEditors: Zhihaot1
 * @LastEditTime: 2021-05-11 11:00:01
 */
import { request } from 'network/request';

// ------------Rights------------
// 用户权限列表
export function getRightsList() {
  return request({
    url: 'rights/list'
  })
}

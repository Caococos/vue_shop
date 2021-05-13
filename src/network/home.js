/*
 * @Descripttion:
 * @version: 1.0
 * @Author: Zhihaot1
 * @Date: 2021-05-04 20:21:43
 * @LastEditors: Zhihaot1
 * @LastEditTime: 2021-05-11 11:01:45
 */
import { request } from 'network/request';

// 获取菜单列表
export function getMenuList() {
  return request({ url: '/menus' })
}




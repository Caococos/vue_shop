/*
 * @Descripttion:
 * @version: 1.0
 * @Author: Zhihaot1
 * @Date: 2021-05-04 13:43:08
 * @LastEditors: Zhihaot1
 * @LastEditTime: 2021-05-04 20:22:15
 */
import { request } from 'network/request';

export function usernameLogin(dataObj) {  //传入对象，类型为对象
  return request({ method: 'post', url: '/login', data: dataObj })
}

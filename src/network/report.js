/*
 * @Descripttion:
 * @version: 1.0
 * @Author: Zhihaot1
 * @Date: 2021-06-18 10:43:31
 * @LastEditors: Zhihaot1
 * @LastEditTime: 2021-06-18 10:44:50
 */
import { request } from 'network/request'

export function requestReportData() {
  return request({
    url: 'reports/type/1'
  })
}


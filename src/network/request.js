/*
 * @Descripttion: 
 * @version: 1.0
 * @Author: Zhihaot1
 * @Date: 2021-05-04 13:36:32
 * @LastEditors: Zhihaot1
 * @LastEditTime: 2021-05-04 13:55:29
 */
import axios from "axios";
// import Vue from 'vue'
export function request(config) {
  //创建实例
  const instance = axios.create({
    // 根路径
    baseURL: 'http://127.0.0.1:8888/api/private/v1/',
    timeout: 5000
  })
  instance.interceptors.request.use(config => {
    //拦截请求之后要把请求返回去
    return config
  }, err => {
    return err
  })
  //响应拦截
  instance.interceptors.response.use(res => {
    return res.data
  }, err => {
    console.log(err);
    return err
  })

  //发送真正的网络请求
  return instance(config)
}

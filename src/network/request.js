/*
 * @Descripttion: 
 * @version: 1.0
 * @Author: Zhihaot1
 * @Date: 2021-05-04 13:36:32
 * @LastEditors: Zhihaot1
 * @LastEditTime: 2021-06-18 16:32:32
 */
// 默认请求方式为get
import axios from "axios";
import Vue from 'vue'

// 导入NProgress包对应的JS和CSS
import NProgress from 'nprogress';
import 'nprogress/nprogress.css'
// 这个进度条显示还可以考虑写在beforeEach导航守卫中

export function request(config) {
  //创建实例
  const instance = axios.create({
    // 根路径
    baseURL: 'http://127.0.0.1:8888/api/private/v1/',
    timeout: 5000
  })
  //拦截请求之后要把请求返回去
  instance.interceptors.request.use(config => {
    // 显示进度条
    NProgress.start()
    // 为请求头对象添加token验证的Authorization字段
    config.headers.Authorization = window.sessionStorage.getItem('token')
    return config
  }, err => {
    console.log(err);
    return err
  })
  //响应拦截
  instance.interceptors.response.use(res => {
    if (res.data.meta.status !== 200 && res.data.meta.status !== 201) {
      Vue.prototype.$message.error(res.data.meta.msg)
      return;
    }
    NProgress.done()
    return res.data
  }, err => {
    // 服务器请求失败
    console.log(err);
    Vue.prototype.$message.error('服务器好像开小差了呢')
    return;
  })

  //发送真正的网络请求
  return instance(config)
}

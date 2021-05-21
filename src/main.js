/*
 * @Description:
 * @version: 1.0
 * @Author: Zhihaot1
 * @Date: 2021-04-21 19:35:53
 * @LastEditors: Zhihaot1
 * @LastEditTime: 2021-05-21 15:39:53
 */

import Vue from 'vue';
import App from './App.vue';
//第三方插件
import './plugins/element.js';
import TreeTable from 'vue-table-with-tree-grid';
import router from './router';
//  字体图标
import "@/assets/fonts/iconfont.css";
//全局样式
import "@/assets/styles/index.scss";

// 将TreeTable注册为全局组件
Vue.component('tree-table', TreeTable)
// 创建全局过滤器
Vue.filter('dateFormat', function (originVal) {
  const dt = new Date(originVal)

  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')

  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')

  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

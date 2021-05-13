/*
 * @Description:
 * @version: 1.0
 * @Author: Zhihaot1
 * @Date: 2021-04-21 19:35:53
 * @LastEditors: Zhihaot1
 * @LastEditTime: 2021-05-11 21:35:04
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

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

/*
 * @Description:
 * @version: 1.0
 * @Author: Zhihaot1
 * @Date: 2021-04-21 19:35:53
 * @LastEditors: Zhihaot1
 * @LastEditTime: 2021-05-23 21:23:15
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

// 导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor';
// require styles 导入富文本编辑器对应的样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

// 将TreeTable注册为全局组件
Vue.component('tree-table', TreeTable)

// 将富文本编辑器，注册为全局可用组件
Vue.use(VueQuillEditor)

// 创建全局过滤器
Vue.filter('dateFormat', function (value) {
  //1.获取年份
  //y
  //y+ -> 1个或者多个y
  //y* -> 0个或者多个y
  //y? -> 0个或者1个y
  //上面的是正则表达式的规则
  let fmt = 'yyyy-MM-dd-hh-mm-ss'
  let date = new Date(value * 1000);
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  //2.获取其他时间字符串
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),    //h和H h表达12小时制，H表示24小时制
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
}
)
function padLeftZero(str) {
  return ('00' + str).substr(str.length);
}
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

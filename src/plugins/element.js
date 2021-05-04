/*
 * @Descripttion: 
 * @version: 1.0
 * @Author: Zhihaot1
 * @Date: 2021-04-24 10:19:08
 * @LastEditors: Zhihaot1
 * @LastEditTime: 2021-05-04 17:07:24
 */
import Vue from 'vue'
// 导入弹框提示组件
import { Message, Button, Form, FormItem, Input } from 'element-ui'

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)

// 全局挂载
Vue.prototype.$message = Message

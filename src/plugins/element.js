/*
 * @Descripttion: 
 * @version: 1.0
 * @Author: Zhihaot1
 * @Date: 2021-04-24 10:19:08
 * @LastEditors: Zhihaot1
 * @LastEditTime: 2021-05-07 10:20:01
 */
import Vue from 'vue'
// 导入弹框提示组件
import {
  Message, Button, Form, FormItem, Input,
  Aside, Main, Container, Header,
  Menu, Submenu, MenuItem,
  Breadcrumb, BreadcrumbItem, Card, Row, Col, Table, TableColumn, Switch, Tooltip, Pagination, Dialog, MessageBox
} from 'element-ui'

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Container)
Vue.use(Header)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(Row)
Vue.use(Col)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Switch)
Vue.use(Tooltip)
Vue.use(Pagination)
Vue.use(Dialog)

// 全局挂载
Vue.prototype.$message = Message
Vue.prototype.$MessageBox = MessageBox  //MessageBox里有多个方法

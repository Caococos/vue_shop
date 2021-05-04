/*
 * @Descripttion: 
 * @version: 1.0
 * @Author: Zhihaot1
 * @Date: 2021-04-21 19:35:53
 * @LastEditors: Zhihaot1
 * @LastEditTime: 2021-05-04 15:53:50
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
const Login = () => import('components/login/Login')
const Home = () => import('components/home/Home')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: Home
  }
]

const router = new VueRouter({
  routes
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  /* to 将要访问的路径
    from 从哪个路径跳转而来
    next 是一个函数，表示放行
    next() 放行  next('/login') 强制跳转到 /login
  */
  if (to.path === '/login') {
    return next()
  }
  // 从sessionStorage中获取到保存的token值
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) {
    return next('/login')
  } next()
})

export default router

import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login'
import Home from '@/views/Home'
import Welcome from '@/views/Welcome'
import Users from '@/views/Users'
import Rights from '@/views/auth/Rights'
import Roles from '@/views/auth/Roles'
import Categories from '@/views/goods/Categories'
import goodsList from '@/views/goods/goodsList'
import goodsAdd from '@/views/goods/goodsAdd'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      name: 'home',
      component: Home,
      redirect: {name: 'welcome'},
      children: [
        { path: 'welcome', name: 'welcome', component: Welcome },
        { path: 'users', name: 'users', component: Users },
        { path: 'rights', name: 'rights', component: Rights },
        { path: 'roles', name: 'roles', component: Roles },
        { path: 'categories', name: 'categories', component: Categories },
        { path: 'goods', name: 'goodsList', component: goodsList },
        { path: 'goodsadd', name: 'goodsadd', component: goodsAdd }
      ]
    }
  ]
})

import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/Home')
    },
    {
      path: '/pay',
      name: 'Pay',
      component: () => import('@/views/Pay')
    },
    {
      path: '/coupon',
      name: 'Coupon',
      component: () => import('@/views/Coupon')
    },
    {
      path: '/details',
      name: 'Details',
      component: () => import('@/views/Details')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/Login')
    },
    {
      path: '/orderInfo',
      name: 'OrderInfo',
      component: () => import('@/views/OrderInfo')
    },
    {
      path: '/shopList',
      name: 'ShopList',
      component: () => import('@/views/ShopList')
    },
    {
      path: '/tips',
      name: 'Tips',
      component: () => import('@/views/Tips')
    }
  ]
})

import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Home',
            // redirect: "/activityYiFenQian", // 活动结束
            component: () => import('@/views/Home')
        },
        { // 首页别名入口
            path: '/home',
            component: () => import('@/views/Home')
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
        {// 优惠商圈
            path: '/groom',
            name: 'Groom',
            component: () => import('@/views/Groom')
        },
        {// 优惠商圈
            path: '/groom2',
            name: 'Groom2',
            component: () => import('@/views/Groom2')
        },
        {// 详情-分类详情(非商品购买详情页)
            path: '/depictDetails',
            name: 'DepictDetails',
            component: () => import('@/views/DepictDetails')
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
        },
        { // 一分钱活动
            path: '/activityYiFenQian',
            component: () => import('../views/ActivityYiFenQian.vue'),
            meta: {
                hiddenFooterMenu: true
            }
        },
    ]
})

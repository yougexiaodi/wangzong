<template>
    <div id="app">
        <router-view/>
        <tabbar class="ecard-tabbar" style="position:fixed;">
            <tabbar-item :link="{path:'/'}" :selected="$route.path === '/'">
                <span class="ecard-font" style="font-size: 22px" slot="icon">&#xe600;</span>
                <span slot="label">首页</span>
            </tabbar-item>
            <tabbar-item :link="{path: '/coupon'}" :selected="$route.path === '/coupon'">
                <span class="ecard-font" style="font-size: 22px" slot="icon">&#xe601;</span>
                <span slot="label">我的</span>
            </tabbar-item>
        </tabbar>
    </div>
</template>

<script>
    import {Tabbar, TabbarItem} from 'vux'

    export default {
        components: {
            Tabbar,
            TabbarItem
        },
        data() {
            return {
                pid: sessionStorage.getItem('pid')
            }
        },
        mounted() {
        },
        methods: {

        }
    }
</script>

<style lang="less">
    @import './assets/css/common.css';

    @font-face {
        font-family: 'ecard-font';  /* project id 254931 */
        src: url('//at.alicdn.com/t/font_254931_k5ma1b8j9z.eot');
        src: url('//at.alicdn.com/t/font_254931_k5ma1b8j9z.eot?#iefix') format('embedded-opentype'),
        url('//at.alicdn.com/t/font_254931_k5ma1b8j9z.woff') format('woff'),
        url('//at.alicdn.com/t/font_254931_k5ma1b8j9z.ttf') format('truetype'),
        url('//at.alicdn.com/t/font_254931_k5ma1b8j9z.svg#iconfont') format('svg');
    }

    .ecard-font {
        font-family: "ecard-font";
        font-size: 14px;
        font-style: normal;
    }

    .ecard-font:before {
        content: attr(icon);
    }

    .full_img {
        width: 100%;
    }
</style>

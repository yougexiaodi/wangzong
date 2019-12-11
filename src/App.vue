<template>
    <div id="app">
        <router-view/>
        <template v-if="isShowFooterMenu">
            <div style="width: 100vw;height: 50px;"></div>
            <tabbar class="ecard-tabbar" style="position:fixed;">
                <tabbar-item :link="{path:'/'}" :selected="$route.path === '/'">
                    <span class="icon-home" slot="icon"></span>
                    <span slot="label">首页</span>
                </tabbar-item>
                <tabbar-item :link="{path: '/coupon'}" :selected="$route.path === '/coupon'">
                    <span class="icon-my" slot="icon"></span>
                    <span slot="label">我的</span>
                </tabbar-item>
            </tabbar>
        </template>
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
        computed: {
            isShowFooterMenu() {
                return !this.$route.meta.hiddenFooterMenu;
            }
        },
        mounted() {
        },
        methods: {}
    }
</script>

<style scoped lang="less">

    /deep/ .weui-tabbar__item {
        padding-top: 2vw;
    }

    /deep/ .weui-tabbar__item .weui-tabbar__icon {
        height: 5vw;
        width: 5vw;

        .icon-home {
            display: block;
            height: 100%;
            width: 100%;
            background: url("./assets/icon-home.png") no-repeat;
            background-size: contain;
        }

        .icon-my {
            display: block;
            height: 100%;
            width: 100%;
            background: url("./assets/icon-my.png") no-repeat;
            background-size: contain;
        }
    }

    /deep/ .weui-tabbar__item.weui-bar__item_on .weui-tabbar__icon {
        .icon-home {
            background: url("./assets/icon-home-check.png") no-repeat;
            background-size: contain;
        }

        .icon-my {
            background: url("./assets/icon-my-check.png") no-repeat;
            background-size: contain;
        }
    }

    /deep/ .weui-tabbar__item .weui-tabbar__label {
        color: #c0c0c0;
    }

    /deep/ .weui-tabbar__item.weui-bar__item_on .weui-tabbar__label {
        color: #d81e06;
    }

</style>

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

<template>
    <div v-if="isShowFooterMenu">
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
    </div>
</template>

<script>
    import {
        Tabbar,
        TabbarItem
    } from "vux"

    export default {
        name: "LNavFooter",
        components: {
            Tabbar,
            TabbarItem
        },
        data() {
            return {};
        },
        computed: {
            isShowFooterMenu() {
                return !this.$route.meta.hiddenFooterMenu;
            }
        },
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
            background: url("../assets/icon-home.png") no-repeat;
            background-size: contain;
        }

        .icon-my {
            display: block;
            height: 100%;
            width: 100%;
            background: url("../assets/icon-my.png") no-repeat;
            background-size: contain;
        }
    }

    /deep/ .weui-tabbar__item.weui-bar__item_on .weui-tabbar__icon {
        .icon-home {
            background: url("../assets/icon-home-check.png") no-repeat;
            background-size: contain;
        }

        .icon-my {
            background: url("../assets/icon-my-check.png") no-repeat;
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
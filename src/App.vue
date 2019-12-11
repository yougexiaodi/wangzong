<template>
    <div id="app">
        <router-view/>
        <l-nav-footer></l-nav-footer>
    </div>
</template>

<script>
    import {Tabbar, TabbarItem} from 'vux'
    import LNavFooter from "./components/LNavFooter";

    export default {
        components: {
            LNavFooter,
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
        methods: {}
    }
</script>

<style scoped lang="less">

</style>

<style lang="less">
    @import './assets/css/common.css';

    .full_img {
        width: 100%;
    }
</style>

<template>
    <div id="app" :class="{ bgc: bgc == true }">
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
                bgc: sessionStorage.getItem('bgc'),
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
    .bgc{
        background-color: #a00b0d;
    }
</style>

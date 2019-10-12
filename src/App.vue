<template>
    <div id="app">
        <router-view/>
        <div style="height: 100px;clear:both;"
             v-show="$route.path !== '/annualGoods' && $route.path !== '/year_details'"></div>
        <tabbar class="ecard-tabbar" style="position:fixed;">
            <tabbar-item :link="{path:'/'}" :selected="$route.path === '/'">
                <span class="ecard-font" style="font-size: 22px" slot="icon">&#xe600;</span>
                <span slot="label">首页</span>
            </tabbar-item>
            <tabbar-item :link="{path: '/pay'}" :selected="$route.path === '/pay'">
                <span class="ecard-font" style="font-size: 22px" slot="icon">&#xe607;</span>
                <span slot="label">精选商户</span>
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
    // import {mapState} from 'vuex'
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
        // computed: mapState({
        //   route: state => state.route,
        //   path: state => state.route.path,
        //   params: state => state.route.params,
        //   deviceready: state => state.app.deviceready,
        //   demoTop: state => state.vux.demoScrollTop,
        //   isLoading: state => state.vux.isLoading,
        //   direction: state => state.vux.direction
        // }),
        mounted() {
            // window.location.href = '//gdecard.jiahuaming.com/boc/yueshengou_app/#/'
            // const script = document.createElement('script')
            // script.src = 'https://s95.cnzz.com/z_stat.php?id=1274328724&web_id=1274328724'
            // script.language = 'JavaScript'
            // document.body.appendChild(script)
            // this.pid = sessionStorage.getItem('pid')
            // this.goLoad()
        },
        // watch: {
        //   '$route' () {
        //     if (window._czc) {
        //       let location = window.location
        //       let contentUrl = location.pathname + location.hash
        //       let refererUrl = '/'
        //       window._czc.push(['_trackPageview', contentUrl, refererUrl])
        //     }
        //   }
        // },
        methods: {
            // goBack () {
            //   if (this.$route.path === '/') {
            //     window.c_plugins.merchantBridge.goToNative(function () {
            //     }, function (err) {
            //       alert(err.message || err || '网络错误，请检查网络连接')
            //     }, {page: '0'})
            //   } else {
            //     this.$router.go(-1)
            //   }
            // },
            goReload() {
                window.location.reload()
            }
        }
    }
</script>

<style lang="less">
    @import '@/../assets/css/common.css';

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

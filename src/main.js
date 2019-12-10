// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import FastClick from 'fastclick'
import {AjaxPlugin, WechatPlugin, ConfirmPlugin, LoadingPlugin, ToastPlugin, AlertPlugin, ConfigPlugin} from 'vux'

Vue.use(ConfirmPlugin)
Vue.use(ConfigPlugin)
Vue.use(LoadingPlugin)
Vue.use(ToastPlugin)
Vue.use(AlertPlugin)
Vue.use(AjaxPlugin)
Vue.use(WechatPlugin)
Vue.use(MuseUI)

FastClick.attach(document.body)
Vue.prototype.$http = axios
Vue.config.productionTip = false
sessionStorage.setItem('pid', 94)
const wx = Vue.wechat
const http = Vue.http

if (process.env.NODE_ENV === 'production') {
    wx.ready(() => {
        wx.onMenuShareAppMessage({
            title: '惠聚中行日', // 分享标题
            desc: '中国银行信用卡客户专享',
            link: 'http://gdecard.jiahuaming.com/boc/hebei_lifecycle/#/',
            imgUrl: 'http://gdecard.jiahuaming.com/boc/hebei_lifecycle/images/area_b.png'
        })

        wx.onMenuShareTimeline({
            title: '惠聚中行日', // 分享标题
            desc: '中国银行信用卡客户专享',
            link: 'http://gdecard.jiahuaming.com/boc/hebei_lifecycle/#/',
            imgUrl: 'http://gdecard.jiahuaming.com/boc/hebei_lifecycle/images/area_b.png'
        })
    })
    // const permissions = JSON.stringify(['onMenuShareTimeline', 'onMenuShareAppMessage', 'chooseWXPay'])
    const url = document.location.href
    http.post('/api/gdekhback/phone/get_wx_sign.html', {url: encodeURIComponent(url), wx_id: 2})
        .then(res => {
            wx.config({
                debug: false,
                appId: res.data.info.appId,
                timestamp: res.data.info.timestamp,
                nonceStr: res.data.info.nonceStr,
                signature: res.data.info.signature,
                jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'chooseWXPay']
            })
        })
}

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: {App},
    template: '<App/>'
})

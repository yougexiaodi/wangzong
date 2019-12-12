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

Vue.use(ConfirmPlugin);
Vue.use(ConfigPlugin);
Vue.use(LoadingPlugin);
Vue.use(ToastPlugin);
Vue.use(AlertPlugin);
Vue.use(AjaxPlugin);
Vue.use(WechatPlugin);
Vue.use(MuseUI);

FastClick.attach(document.body);
Vue.prototype.$http = axios;
Vue.config.productionTip = false;

sessionStorage.setItem('pid', 100);

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: {App},
    template: '<App/>'
});

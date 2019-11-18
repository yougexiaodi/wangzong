<template>
    <div>
        <img src="../assets/img/area_b.png" width="100%">
        <divider>请登录</divider>
        <group>
            <x-input mask="999 9999 9999" placeholder="请输入手机号码" v-model="mobile" :max="13" is-type="china-mobile">
                <i slot="label" class="iconfont" style="padding-right:10px;display:block;">&#xe633;</i>
            </x-input>
            <x-input type="tel" placeholder="请输入图形验证码" v-model="code">
                <i slot="label" class="iconfont" style="padding-right:10px;display:block;">&#xe658;</i>
                <img slot="right-full-height" :src="verifyCode" @click="getVerify">
            </x-input>
            <x-input type="tel" class="weui-vcode" placeholder="请输入短信验证码" v-model="sms_code" :max="4">
                <i slot="label" class="iconfont" style="padding-right:10px;display:block;">&#xe628;</i>
                <x-button disabled v-if="(code && mobile) === ''" slot="right" type="warn" plain mini>发送验证码</x-button>
                <x-button v-else-if="minutesCount === 0" slot="right" type="warn" plain mini @click.native="sendMsg">
                    发送验证码
                </x-button>
                <x-button disabled v-else v-cloak slot="right" type="warn" plain mini>{{minutesCount}}秒后获取</x-button>
            </x-input>
        </group>
        <box gap="10px 10px">
            <div class="buy">
                <x-button v-if="(code && mobile && sms_code) === ''" v-cloak disabled>输入验证信息</x-button>
                <x-button type="warn" v-else v-cloak @click.native="login">立即登录</x-button>
            </div>
        </box>
    </div>
</template>

<script>
    import {Group, XInput, XButton, Cell, Divider, Box, cookie} from 'vux'

    export default {
        components: {
            Group,
            XInput,
            XButton,
            Cell,
            Divider,
            Box,
            cookie
        },
        data() {
            return {
                mobile: '',
                code: '',
                verifyCode: '',
                sms_code: '',
                getVerifyUrl: '/api/gdekhback/special/get_verify.html',
                getSmsUrl: '/api/gdekhback/special/get_sms.html',
                loginUrl: '/api/gdekhback/special/login.html',
                minutesCount: 0
            }
        },
        mounted() {
            this.$vux.loading.show({
                text: '加载中...'
            })
            this.getVerify()
            if (cookie.get('captcha')) {
                let timestamp = cookie.get('captcha')
                let now = new Date().getTime()
                this.countDown(Math.round((timestamp - now) / 1000 + 60))
            }
        },
        methods: {
            getVerify() {
                this.$http.post(this.getVerifyUrl)
                    .then((res) => {
                        this.verifyCode = this.getVerifyUrl + '?' + Math.random()
                        this.$vux.loading.hide()
                    })
            },
            sendMsg() {
                this.$http.post(this.getSmsUrl, {
                    mobile: this.mobile,
                    code: this.code,
                    pid: sessionStorage.getItem('pid')
                })
                    .then((res) => {
                        if (res.data.status === 0) {
                            this.$vux.toast.show({
                                text: res.data.info
                            })
                            this.smsCookie()
                        } else {
                            this.$vux.toast.show({
                                text: res.data.info,
                                type: 'warn'
                            })
                        }
                    })
            },
            smsCookie() {
                let now = new Date().getTime()
                cookie.set('captcha', now)
                this.countDown(60)
            },
            countDown(num) {
                if (num <= 0) {
                    this.minutesCount = 0
                    return
                }
                this.minutesCount = num;
                let self = this;
                let resend = setInterval(function () {
                    self.minutesCount--
                    if (self.minutesCount === 0) {
                        clearInterval(resend)
                    }
                }, 1000)
            },
            login() {
                this.$vux.loading.show({
                    text: '加载中...'
                })
                this.$http.post(this.loginUrl, {
                    code: this.code,
                    mobile: this.mobile,
                    sms_code: this.sms_code,
                    pid: sessionStorage.getItem('pid')
                })
                    .then((res) => {
                        if (res.data.status === 0) {
                            if (this.$route.query.path === undefined) {
                                this.$router.push({path: '/'})
                            } else {
                                this.$router.go(-1)
                            }
                        } else {
                            this.$vux.toast.show({
                                text: res.data.info,
                                type: 'warn'
                            })
                        }
                        this.$vux.loading.hide()
                    })
            }
        }
    }
</script>

<template>
    <div>
        <div class="ecard-coupon-list">
            <mu-list>
                <template v-for="vm in couponList">
                    <mu-list-item disabled>
                        <img :src="vm.food_img">
                        <div class="ecard-coupon-list-text">
                            <!-- <p v-if="vm.gid === '134'">商户名称：{{vm.merchant}}<span style="color:red;font-size: 11px;">(限蓝港店使用)</span></p> -->
                            <p>商户名称：{{vm.merchant}}</p>
                            <p class="goods_name">商品名称：{{vm.name}}</p>
                            <p class="goods_name" v-show="vm.state === '2'">使用门店：{{vm.shop}}</p>
                            <p style="color:#e32d2d" v-show="vm.pay_state === '1'">券码：{{vm.code}}</p>
                            <p style="color: green" v-show="vm.state === '1'" v-model="showCode"
                               @click="qrCode(vm.code)">
                                点击生成二维码</p>
                            <div v-transfer-dom>
                                <x-dialog v-model="showCode" class="dialog-demo">
                                    <div class="img-box">
                                        <p>向收银员出示此码</p>
                                        <qrcode :value="qrcode" type="img"></qrcode>
                                    </div>
                                    <div @click="showCode = false">
                                        <span class="vux-close"></span>
                                    </div>
                                </x-dialog>
                            </div>
                            <p v-show="vm.pay_state === '0'">下单时间：{{vm.add_time}}</p>
                            <p v-show="vm.state === '1'">购买时间：{{vm.pay_time}}</p>
                            <p v-show="vm.state === '2'">使用时间：{{vm.use_time}}</p>
                            <p v-show="vm.state === '3'">退款时间：{{vm.refund_time}}</p>
                            <div v-show="vm.pay_state === '0'" style="padding-bottom:5px;">
                                <x-button mini :gradients="['#FF5E3A', '#FF9500']"
                                          @click.native="buyCoupon(vm.gid, vm.order_id, vm.pay_type)">付款
                                </x-button>
                                <x-button style="margin-left: 30%;" mini @click.native="cancelOrder(vm.id)">取消
                                </x-button>
                            </div>
                            <x-button :disabled="onRefund" v-show="vm.state === '1'" mini
                                      :gradients="['#FF2719', '#FF61AD']"
                                      @click.native="refund(vm.order_id)">退款
                            </x-button>
                        </div>
                        <div v-show="vm.state === '0'" class="superscript-4"><i>未支付</i></div>
                        <div v-show="vm.state === '1'" class="superscript-1"><i>未使用</i></div>
                        <div v-show="vm.state === '2'" class="superscript-2"><i>已使用</i></div>
                        <div v-show="vm.state === '3'" class="superscript-3"><i>已退款</i></div>
                        <div v-show="vm.state === '4'" class="superscript-5"><i>退款中</i></div>
                    </mu-list-item>
                    <mu-divider/>
                </template>
            </mu-list>
            <div v-transfer-dom>
                <confirm
                    v-model="show4"
                    :close-on-confirm="true"
                    title="请选择支付方式"
                    @on-confirm="onConfirm4">
                    <group>
                        <radio :options="selectPay" @on-change="change" v-model="payment"></radio>
                    </group>
                </confirm>
            </div>
        </div>
    </div>
</template>
<script type="text/babel">
    import {
        Group,
        Cell,
        XButton,
        Confirm,
        Toast,
        Radio,
        Qrcode,
        XDialog,
        TransferDomDirective as TransferDom
    } from 'vux'

    export default {
        directives: {
            TransferDom
        },
        components: {
            Group,
            Cell,
            XButton,
            Confirm,
            Toast,
            Radio,
            Qrcode,
            XDialog
        },
        data() {
            return {
                selectPay: [{
                    icon: require('@/assets/img/boc_logo.png'),
                    key: '1',
                    value: '手机银行'
                }, {
                    icon: require('@/assets/img/wepay_logo.png'),
                    key: '2',
                    value: '微信支付'
                }],
                gid: '',
                order_id: '',
                loginState: '/api/gdekhback/phone/is_login',
                dataDetailsUrl: '/api/gdekhback/phone/order_list_all',
                refundUrl: '/api/gdekhback/phone/order_refund',
                loginStateWx: '/api/gdekhback/phone/is_oauth',
                payUrl: '/api/gdekhback/phone/guizhou_boc_pay',
                getWxIdUrl: '/api/gdekhback/phone/depth_wechat_pay',
                cancelUrl: '/api/gdekhback/phone/order_cancel',
                loginStateWx: '/api/gdekhback/phone/is_oauth.html',
                couponList: [],
                show4: false,
                qrcode: '',
                payment: '1',
                onRefund: false,
                showCode: false
            }
        },
        mounted() {
            this.$vux.loading.show({
                text: '加载中...'
            })
            this.getLoginState()
        },
        methods: {
            getLoginWxState() {
                this.$http.post(this.loginStateWx, {pid: sessionStorage.getItem('pid')})
                    .then((res) => {
                        if (res.data.status !== 0) {
                            let url = this.loginStateWx + '?pid=' + sessionStorage.getItem('pid') + '&wx_id=2' + '&back_url=' + encodeURIComponent('/boc/guizhouekh/#/coupon')
                            window.location.href = url
                        } else {
                            this.getDataDetails()
                            this.$vux.loading.hide()
                        }
                    })
            },
            getLoginState() {
                this.$http.post(this.loginState, {pid: sessionStorage.getItem('pid')})
                    .then((res) => {
                        if (res.data.status === 0) {
                            this.getDataDetails()
                            this.$vux.loading.hide()
                        } else {
                            this.$router.push({path: '/login', query: {path: this.$route.path}})
                        }
                    })
            },
            getDataDetails() {
                var self = this
                this.$http.post(this.dataDetailsUrl, {pid: sessionStorage.getItem('pid')})
                    .then((res) => {
                        if (res.data.status === 0) {
                            if (res.data.info.length !== 0) {
                                for (let i = 0; i < res.data.info.length; i++) {
                                    if (res.data.info[i].name.indexOf('|') !== -1) {
                                        res.data.info[i].name = res.data.info[i].name.split('|')[1]
                                        this.couponList = res.data.info
                                    } else {
                                        this.couponList = res.data.info
                                    }
                                }
                            } else {
                                this.$vux.alert.show({
                                    title: '提示',
                                    content: '没有查询到您的优惠码',
                                    onHide() {
                                        self.$router.push({path: '/'})
                                    }
                                })
                            }
                        } else {
                            this.couponList = ''
                        }
                        if (this.$route.query.err !== undefined) {
                            this.$vux.toast.show({
                                text: this.$route.query.err,
                                type: 'warn',
                                width: '12em',
                                time: '5000'
                            })
                            this.couponList = res.data.info
                        }
                    })
            },
            getLoginWxState() {
                this.$http.post(this.loginStateWx, {pid: sessionStorage.getItem('pid')})
                    .then((res) => {
                        if (res.data.status !== 0) {
                            let url = this.loginStateWx + '?pid=' + sessionStorage.getItem('pid') + '&wx_id=2' + '&back_url=' + encodeURIComponent('/coupon')
                            window.location.href = url
                        } else {
                            this.getDataDetails()
                        }
                    })
            },
            refund(orderId) {
                this.onRefund = true
                let self = this
                self.$vux.confirm.show({
                    title: '操作提示',
                    content: '退款后本日抢购名额作废',
                    onConfirm() {
                        self.$http.post(self.refundUrl, {
                            order_id: orderId,
                            pid: sessionStorage.getItem('pid'),
                            wx_id: '2'
                        })
                            .then((res) => {
                                this.onRefund = false
                                if (res.data.status === 0) {
                                    self.getDataDetails()
                                    self.$vux.toast.show({
                                        text: '退款成功',
                                        width: '10em'
                                    })
                                } else if (res.data.status === 1) {
                                    window.location.reload()
                                } else if (res.data.status === 2) {
                                    self.$vux.toast.show({
                                        text: '无此订单',
                                        type: 'warn',
                                        width: '10em'
                                    })
                                } else if (res.data.status === 6) {
                                    self.$vux.toast.show({
                                        text: '退款失败，请重试',
                                        type: 'warn',
                                        width: '12em'
                                    })
                                } else if (res.data.status === 4) {
                                    self.$vux.toast.show({
                                        text: '支付方式错误',
                                        type: 'warn',
                                        width: '10em'
                                    })
                                } else if (res.data.status === 3) {
                                    self.$vux.toast.show({
                                        text: '已退款或已使用',
                                        type: 'warn',
                                        width: '12em'
                                    })
                                } else if (res.data.status === 7) {
                                    self.$vux.toast.show({
                                        text: res.data.info,
                                        type: 'warn',
                                        width: '12em'
                                    })
                                    self.getDataDetails()
                                } else {
                                    self.$vux.toast.show({
                                        text: '退款失败，请重新处理，或联系客服',
                                        type: 'warn',
                                        width: '12em'
                                    })
                                }
                            })
                    },
                    onCancel() {
                        self.onRefund = false
                    }
                })
            },
            buyCoupon(id, orderId, pay_type) {
                this.gid = id
                this.order_id = orderId
                // this.show4 = true
                this.onConfirm4(pay_type)
            },
            onConfirm4(pay_type) {
                // this.show4 = false
                if (pay_type === '2') {
                    this.$vux.loading.show({
                        transition: '',
                        text: '请稍后'
                    })
                    this.$vux.loading.hide()
                    window.location.href = this.payUrl + '?pid=' + sessionStorage.getItem('pid') + '&order_id=' + this.order_id + '&back_url=' + encodeURIComponent('/coupon?pid=' + sessionStorage.getItem('pid'))
                } else if (pay_type === '1') {
                    this.$vux.loading.show({
                        transition: '',
                        text: '请稍后'
                    })
                    window.location.href = '/wxPay/?pid=' + sessionStorage.getItem('pid') + '&order_id=' + this.order_id + '&gid=' + this.gid + '&wx_id=2'
                    // this.getWx()
                    this.$vux.loading.hide()
                }
            },
            change(value) {
                this.payment = value
            },
            getWx() {
                let self = this
                self.$http.post(self.getWxIdUrl, {
                    pid: sessionStorage.getItem('pid'),
                    wx_id: 2,
                    order_id: self.order_id
                })
                    .then((res) => {
                        if (res.data.status === 0) {
                            self.order_id = res.data.order_id
                            self.$wechat.chooseWXPay({
                                debug: false,
                                appId: res.data.info.appId,
                                nonceStr: res.data.info.nonceStr,
                                package: res.data.info.package,
                                paySign: res.data.info.paySign,
                                signType: res.data.info.signType,
                                timestamp: res.data.info.timeStamp,
                                success() {
                                    window.location.href = '/orderInfo?order_id=' + self.order_id
                                },
                                fail(res) {
                                    self.$vux.toast.show({
                                        text: '支付失败',
                                        type: 'warn'
                                    })
                                }
                            })
                        } else {
                            alert(res.data.info)
                        }
                    })
            },
            cancelOrder(val) {
                let self = this
                self.$vux.confirm.show({
                    title: '操作提示',
                    content: '确定要取消此订单吗？',
                    onConfirm() {
                        self.$http.post(self.cancelUrl, {id: val, pid: sessionStorage.getItem('pid')})
                            .then((res) => {
                                if (res.data.status === 0) {
                                    self.$vux.toast.show({
                                        text: '取消成功',
                                        type: 'success'
                                    })
                                    self.getDataDetails()
                                } else {
                                    self.$vux.toast.show({
                                        text: '取消失败，请重新处理，或联系客服',
                                        type: 'warn',
                                        width: '10em'
                                    })
                                    self.getDataDetails()
                                }
                            })
                    }
                })
            },
            qrCode(val) {
                this.qrcode = val
                this.showCode = true
            }
        }
    }
</script>
<style lang="less" scoped>
    .mu-list {
        padding: 0 0 !important;
    }

    .ecard-coupon-list {
        position: relative;
        float: left;
        width: 100%;
        background: #fff;
        box-shadow: 0 5px 5px #d6d4d4;
        clear: both;
        overflow: hidden;
    }

    .ecard-coupon-list img {
        float: left;
        display: inline-block;
        width: 30%;
    }

    .ecard-coupon-list-text {
        float: left;
        margin-left: 10px;
        padding: 5px 0;
        font-size: 14px;
        width: 65%;
    }

    .ecard-coupon-list-text p {
        clear: both;
    }

    .superscript-1 {
        position: absolute;
        width: 0;
        top: -50px;
        right: -50px;
        height: 0;
        border: 50px solid #3ace3a;
        border-color: transparent #3ace3a transparent transparent;
        opacity: .6;
        transform: rotate(135deg);
        -ms-transform: rotate(135deg);
        -moz-transform: rotate(135deg);
        -webkit-transform: rotate(135deg);
        -o-transform: rotate(135deg);
    }

    .superscript-1 i {
        position: absolute;
        top: -30px;
        display: block;
        color: #fff;
        font-style: normal;
        left: 25px;
        font-size: 13px;
        z-index: 2;
        transform: rotate(-180deg);
        -ms-transform: rotate(-180deg);
        -moz-transform: rotate(-180deg);
        -webkit-transform: rotate(-180deg);
        -o-transform: rotate(-180deg);
    }

    .superscript-2 {
        position: absolute;
        width: 0;
        top: -50px;
        right: -50px;
        height: 0;
        border: 50px solid #d1d1d1;
        border-color: transparent #d1d1d1 transparent transparent;
        opacity: .6;
        transform: rotate(135deg);
        -ms-transform: rotate(135deg);
        -moz-transform: rotate(135deg);
        -webkit-transform: rotate(135deg);
        -o-transform: rotate(135deg);
    }

    .superscript-2 i {
        position: absolute;
        top: -30px;
        display: block;
        color: #fff;
        font-style: normal;
        left: 25px;
        font-size: 13px;
        z-index: 2;
        transform: rotate(-180deg);
        -ms-transform: rotate(-180deg);
        -moz-transform: rotate(-180deg);
        -webkit-transform: rotate(-180deg);
        -o-transform: rotate(-180deg);
    }

    .superscript-3 {
        position: absolute;
        width: 0;
        top: -50px;
        right: -50px;
        height: 0;
        border: 50px solid #b5052b;
        border-color: transparent #b5052b transparent transparent;
        opacity: .6;
        transform: rotate(135deg);
        -ms-transform: rotate(135deg);
        -moz-transform: rotate(135deg);
        -webkit-transform: rotate(135deg);
        -o-transform: rotate(135deg);
    }

    .superscript-3 i {
        position: absolute;
        top: -30px;
        display: block;
        color: #fff;
        font-style: normal;
        left: 25px;
        font-size: 13px;
        z-index: 2;
        transform: rotate(-180deg);
        -ms-transform: rotate(-180deg);
        -moz-transform: rotate(-180deg);
        -webkit-transform: rotate(-180deg);
        -o-transform: rotate(-180deg);
    }

    .superscript-4 {
        position: absolute;
        width: 0;
        top: -50px;
        right: -50px;
        height: 0;
        border: 50px solid #b5a52e;
        border-color: transparent #B5A52E transparent transparent;
        opacity: .6;
        transform: rotate(135deg);
        -ms-transform: rotate(135deg);
        -moz-transform: rotate(135deg);
        -webkit-transform: rotate(135deg);
        -o-transform: rotate(135deg);
    }

    .superscript-4 i {
        position: absolute;
        top: -30px;
        display: block;
        color: #fff;
        font-style: normal;
        left: 25px;
        font-size: 13px;
        z-index: 2;
        transform: rotate(-180deg);
        -ms-transform: rotate(-180deg);
        -moz-transform: rotate(-180deg);
        -webkit-transform: rotate(-180deg);
        -o-transform: rotate(-180deg);
    }

    .superscript-5 {
        position: absolute;
        width: 0;
        top: -50px;
        right: -50px;
        height: 0;
        border: 50px solid #ff8125;
        border-color: transparent #ff8125 transparent transparent;
        opacity: .6;
        transform: rotate(135deg);
        -ms-transform: rotate(135deg);
        -moz-transform: rotate(135deg);
        -webkit-transform: rotate(135deg);
        -o-transform: rotate(135deg);
    }

    .superscript-5 i {
        position: absolute;
        top: -30px;
        display: block;
        color: #fff;
        font-style: normal;
        left: 25px;
        font-size: 13px;
        z-index: 2;
        transform: rotate(-180deg);
        -ms-transform: rotate(-180deg);
        -moz-transform: rotate(-180deg);
        -webkit-transform: rotate(-180deg);
        -o-transform: rotate(-180deg);
    }

    .goods_name span {
        display: inline-block;
    }

    .goods_name span:last-child {
        width: 68%;
        float: right;
    }

    .dialog-demo {
        .weui-dialog {
            border-radius: 8px;
            padding-bottom: 8px;
        }

        .dialog-title {
            line-height: 30px;
            color: #666;
        }

        .img-box img {
            width: 100%
        }

        .vux-close {
            position: relative;
            display: inline-block;
            vertical-align: middle;
            color: #999;
            width: 24px;
            height: 24px;

            &:before,
            &:after {
                content: '';
                position: absolute;
                left: 0;
                top: 11px;
                width: 24px;
                height: 1px;
                background-color: currentColor;
                transform: rotate(-45deg);
            }

            &:after {
                transform: rotate(45deg);
            }
        }
    }
</style>

<template>
    <div>
        <div class="details_banner">
            <img :src="backImg" alt="">
        </div>
        <group>
            <cell title="剩余数量">{{now_num}} 张</cell>
            <cell title="支付金额">
                <p style="color:#bb012d">{{price}}元</p>
            </cell>
            <cell v-if="id === '1073'" title="兑换流程" is-link :link="'/tips?id=' + id"></cell>
            <cell v-else-if="id === '2433'" title="兑换流程" is-link :link="'/tips2433'"></cell>
            <cell v-else-if="id === '2434'" title="兑换流程" is-link :link="'/tips2434'"></cell>
            <cell v-else-if="id === '2431'" title="兑换流程" is-link :link="'/tips2431'"></cell>
            <cell v-else-if="id === '2435'" title="兑换流程" is-link :link="'/tips2435'"></cell>
            <cell v-else title="适用门店" is-link :link="'/shopList?id=' + id">
                <p>共{{shopList.length}}家</p>
            </cell>
            <cell title="支付方式">
                <x-button type="warn" mini>中国银行信用卡</x-button>
            </cell>
            <cell title="活动细则"></cell>
        </group>
        <div class="content" v-html="wareList"></div>
        <confirm
            v-model='show4'
            :close-on-confirm='true'
            title='请选择支付方式'
            @on-confirm='onConfirm4'>
            <group>
                <radio :options='selectPay' @on-change='change' v-model="payment"></radio>
            </group>
        </confirm>
        <box class="buy" gap="10px">
            <x-button v-if="can_buy === 0" :disabled="true">{{msg}}</x-button>
            <x-button v-else :show-loading="btnLoading" :disabled="disabled" v-cloak
                      @click.native='getLoginState'>每周一上午10:00开售
            </x-button>
        </box>
    </div>
</template>
<script>
    import {
        Group,
        Cell,
        XInput,
        Confirm,
        Radio,
        XButton,
        Box,
        PopupPicker,
        CellBox
    } from 'vux'

    export default {
        components: {
            Group,
            Cell,
            CellBox,
            XInput,
            Confirm,
            Radio,
            XButton,
            Box,
            PopupPicker,
        },
        data() {
            return {
                id: this.$route.query.id,
                mid: '',
                price: '',
                name: '',
                now_num: '',
                sale_num: '',
                showShopList: false,
                selectPay: [{
                    icon: '//gdecard.jiahuaming.com/boc/gd8buy/assets/images/boc_logo.png',
                    key: '1',
                    value: '手机银行'
                }, {
                    icon: '//gdecard.jiahuaming.com/boc/gd8buy/assets/images/wepay_logo.png',
                    key: '2',
                    value: '微信支付'
                }],
                payment: '1',
                msg: '',
                shopList: [],
                detailsList: [],
                backImg: '',
                pid: sessionStorage.getItem('pid'),
                show4: false,
                can_buy: '',
                btnLoading: false,
                disabled: false,
                timeSet: 0,
                dataUrl: '/api/gdekhback/special/goods_detail_sc',
                buyUrl: '/api/gdekhback/phone/guizhou_boc_pay',
                wareList: '',
                getDetailsUrl: '/api/gdekhback/phone/goods_list',
                loginState: '/api/gdekhback/phone/is_login',
                loginStateWx: '/api/gdekhback/phone/is_oauth',
                getShopListUrl: '/api/gdekhback/special/shop_list'
            }
        },
        mounted() {
            this.details()
        },
        methods: {
            details() {
                this.$vux.loading.show({
                    text: '加载中...'
                })
                this.$http.get(this.dataUrl, {params: {id: this.id, code_type: this.$route.query.code_type}})
                    .then((res) => {
                        if (res.data.status === 0) {
                            this.can_buy = res.data.can_buy
                            this.msg = res.data.msg
                            this.wareList = res.data.info.detail
                            this.name = res.data.info.name
                            this.price = res.data.info.price.split('.')[0]
                            this.now_num = res.data.info.now_num
                            this.sale_num = res.data.info.sale_num
                            this.backImg = res.data.info.list_img
                            this.mid = res.data.info.mid
                            if (this.$route.query.err !== undefined) {
                                this.$vux.toast.show({
                                    text: this.$route.query.err,
                                    type: 'warn',
                                    width: '12em',
                                    time: '5000'
                                })
                            }
                            this.$vux.loading.hide()
                        }
                    })
                this.getShopList()
            },
            getShopList() {
                this.$http.get(this.getShopListUrl, {params: {id: this.id}})
                    .then((res) => {
                        if (res.data.status === 0) {
                            this.shopList = res.data.info
                        }
                    })
            },
            getLoginWxState() {
                this.btnLoading = true
                this.disabled = true
                this.$vux.loading.show({
                    text: '加载中...'
                })
                this.$http.post(this.loginStateWx, {pid: sessionStorage.getItem('pid')})
                    .then((res) => {
                        if (res.data.status !== 0) {
                            let url = this.loginStateWx + '?pid=' + sessionStorage.getItem('pid') + '&wx_id=2' + '&back_url=' + encodeURIComponent('/boc/guizhouekh/#/details?id=' + this.id)
                            window.location.href = url
                        } else {
                            this.$vux.loading.hide()
                            this.btnLoading = false
                            this.disabled = false
                            this.onConfirm4()
                        }
                    })
            },
            getLoginState() {
                this.btnLoading = true
                this.disabled = true
                // this.$vux.loading.show({
                //   text: '加载中...'
                // })
                this.$http.post(this.loginState, {pid: this.pid})
                    .then((res) => {
                        if (res.data.status === 0) {
                            // this.$vux.loading.hide()
                            this.show4 = true
                            this.btnLoading = false
                            this.disabled = false
                            // this.onConfirm4()
                        } else {
                            this.$router.push({
                                path: '/login',
                                query: {path: this.$route.path + '?id=' + this.$route.query.id}
                            })
                        }
                    })
            },
            countDown(num) {
                if (num <= 0) {
                    this.timeSet = 0
                    return
                }
                this.timeSet = num;
                let self = this;
                let resend = setInterval(function () {
                    self.timeSet--
                    if (self.timeSet === 0) {
                        clearInterval(resend)
                    }
                }, 1000)
            },
            onConfirm4() {
                this.show4 = false
                if (this.payment === '1') {
                    const _this = this
                    this.$vux.confirm.show({
                        title: '温馨提示',
                        confirmText: '下一步',
                        content: '<p style="text-align:justify;margin-bottom:1%">识别下方二维码，下载<span style="color: #af2f23">“手机银行”APP</span>，绑定<span style="color: #af2f23">“中国银行信用卡”</span>即可参与本活动。</p><img  src="//gdecard.jiahuaming.com/boc/depth/assets/qr_code.png" width="50%"><p style="text-align:justify;">如已有<span style="color: #af2f23">“手机银行”APP</span>，且已开通<span style="color: #af2f23">“手机银行支付”</span>功能，请点击“下一步”完成支付。如需帮助，请点击查看<span style="color: #af2f23">“支付流程”</span>。</p>',
                        onConfirm() {
                            _this.$vux.loading.show({
                                transition: '',
                                text: '订单生成中'
                            })

                            let url = _this.buyUrl + '?pid=' + _this.pid + '&gid=' + _this.id + '&code_type=' + _this.$route.query.code_type + '&back_url=' + encodeURIComponent('/boc/guizhouekh/#/details?id=' + _this.id + '&code_type=' + _this.$route.query.code_type)
                            window.location.href = url
                        }
                    })
                } else if (this.payment === '2') {
                    const _this = this
                    this.$vux.confirm.show({
                        title: '温馨提示',
                        content: '<p style="color:red;text-align:justify;margin-bottom:1%">请留意选择中行信用卡支付方可享受优惠价(可通过下拉菜单更换支付方式)，确认金额后再进行支付。</p><img id="tipsImg" src="//gdecard.jiahuaming.com/boc/ynbuy/images/other_tips.png" width="100%">',
                        onConfirm() {
                            _this.$vux.loading.show({
                                transition: '',
                                text: '订单生成中'
                            })
                            let url = '/wxPay' + '?pid=' + _this.pid + '&mid=' + _this.mid + '&gid=' + _this.id + '&code_type=' + _this.$route.query.code_type + '&back_url=' + encodeURIComponent('/boc/guizhouekh/#/details?id=' + _this.id + '&code_type=' + _this.$route.query.code_type)
                            window.location.href = url
                        }
                    })
                } else {
                    this.$vux.toast.show({
                        text: '请选择支付方式',
                        type: 'warn',
                        width: '10em'
                    })
                }
            },
            change(value) {
                this.payment = value
            },
            showShop(value) {
                this.$router.push({path: 'shopList', query: {id: value}})
            }
        }
    }
</script>
<style>
    .details_banner img {
        width: 100%;
    }

    .content p {
        margin: 0 2%;
        text-align: justify;
    }

    .content img {
        margin-top: 10px;
        width: 30%;
    }

    .content p {
        margin: 0 15px;
        text-align: justify;
    }

    .content h3 {
        margin: 2% 2%;
    }

    .buy button {
        background: #bb012d;
        /*box-shadow: 5px 5px 5px rgb(9, 63, 74);*/
        color: #fff;
    }

    .now_num {
        display: inline-block;
        margin-left: 2%;
        font-size: 1rem;
    }

    .shop {
        float: right;
        display: inline-block;
        width: 30%;
        margin-right: 3%;
        margin-top: -1%;
    }

    .shop button {
        width: 100% !important;
        background: #008da6;
        box-shadow: 5px 5px 5px rgb(9, 63, 74);
        color: #fff;
    }

    .details_title, .details_logo {
        display: inline-block;
        color: #fff;
    }

    .details_logo {
        width: 22%;
        vertical-align: top;
    }

    .details_logo img {
        width: 100%;
        padding-left: 15%;
        padding-bottom: 10px;
        margin-top: 10px;
    }

    .details_logo img:last-child {
        margin-top: 10px;
        padding-bottom: 20px;
    }

    .details_title {
        width: 74%;
        line-height: 2;
        margin-top: 10px;
        margin-left: 2%
    }

    .slide {
        /*min-height: 200px;*/
        height: 200px;
        /*min-height: 200px;*/
        /*padding: 0 20px;*/
        overflow: auto;
        max-height: 0;
        transition: max-height .5s cubic-bezier(0, 1, 0, 1) -.1s;
    }

    .animate {
        max-height: 9999px;
        transition-timing-function: cubic-bezier(0.5, 0, 1, 0);
        transition-delay: 0s;
    }

    .depth_tel {
        display: block;
        padding-left: 5px;
        margin-left: 20%;
        border-left: 1px solid;
    }

    [v-cloak] {
        display: none !important;
    }
</style>

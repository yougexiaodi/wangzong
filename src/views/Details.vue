<template>
    <div>
        <div class="details_banner">
            <img :src="dataInfo.detail_img" alt="">
        </div>
        <group>
            <!-- <cell title="剩余数量">{{Math.ceil(dataInfo.now_num / 10)}} 张</cell> -->
            <cell title="剩余数量">{{dataInfo.now_num}} 张</cell>
            <cell title="支付金额">
                <p style="color:#bb012d">{{dataInfo.price}}元</p>
            </cell>
            <cell title="支付方式">
                <x-button type="warn" mini>中国银行信用卡</x-button>
            </cell>
            <cell title="活动细则">
                  <x-button type="warn" mini v-if="dataInfo.ins_id && dataInfo.ins_id!=='0'" @click.native="showRule">
                    兑换流程
                </x-button>
            </cell>
        </group>
        <div class="content" v-html="dataInfo.detail"></div>
        <confirm
            v-model='isShowPayMode'
            :close-on-confirm='true'
            title='请选择支付方式'
            @on-confirm='payModeConfirm'>
            <group>
                <radio :options='selectPay' v-model="payment"></radio>
            </group>
        </confirm>
        <box class="buy" gap="10px">
            <x-button v-if="can_buy === 0" :disabled="true">{{msg}}</x-button>
            <x-button v-else :show-loading="btnLoading" :disabled="btnDisabled" v-cloak @click.native='getLoginState'>
                立即抢购
            </x-button>
        </box>
         <l-goods-rule :show='show' @close='show=false' :contents='contents'></l-goods-rule>
    </div>
</template>
<script>
import LGoodsRule from '@/components/LGoodsRule'

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
    import {isLogin} from "../utils/login";

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
            LGoodsRule
        },
        data() {
            return {
                show:false,
                pid: sessionStorage.getItem('pid'),
                id: this.$route.query.id,
                selectPay: [{
                    icon: '//gdecard.jiahuaming.com/boc/gd8buy/assets/images/boc_logo.png',
                    key: '1',
                    value: '手机银行'
                }, {
                    icon: require('../assets/yiqing/yinlian.png'),
                    key: '2',
                    value: '银联支付'
                },
                {
                    icon: '//gdecard.jiahuaming.com/boc/gd8buy/assets/images/wepay_logo.png',
                    key: '3',
                    value: '微信支付'
                }
                ],
                payment: '1',
                msg: '',
                isShowPayMode: false,
                can_buy: '',
                btnLoading: false,
                btnDisabled: false,
                dataUrl: '/api/gdekhback/special/goods_detail_sc',
                buyUrl: '/api/gdekhback/phone/hebei_lifecycle_boc_pay',
                ylUrl:'/api/gdekhback/phone/hebei_unionpay',
                dataInfo: {},
                aid:null,
                contents:''
            }
        },
        mounted() {
            if (this.$route.query.err) {
                this.$vux.toast.show({text: this.$route.query.err, type: 'warn', width: '12em', time: '5000'});
            }
            this.getDataInfo();
        },
        destroyed() {
            this.$vux.loading.hide();
        },
        methods: {
            getDataInfo() {
                this.$vux.loading.show({text: '加载中...'});
                this.$http.get(this.dataUrl, {
                    params: {
                        id: this.id
                    }
                }).then((res) => {
                    if (res.data.status === 0) {
                        this.can_buy = res.data.can_buy;
                        this.msg = res.data.msg;
                        this.dataInfo = res.data.info;
                        this.$vux.loading.hide();
                    }
                })
            },
            getLoginState() {
                this.btnLoading = true;
                this.btnDisabled = true;
                isLogin(this.pid).then(res => {
                    if(this.dataInfo.aid == '365'){
                        this.selectPay.splice(1,1);
                    }else{
                        this.btnLoading = false;
                        this.btnDisabled = false;
                    }
                    // this.isShowPayMode = true;
                    //微信支付
                    this.payment = '3';
                    this.payModeConfirm();
                }, res => {
                    this.$router.push({
                        path: '/login',
                        query: {
                            ...this.$route.query,
                            path: this.$route.path
                        }
                    })
                })
            },
            payModeConfirm() {
                this.isShowPayMode = false;
                 if(this.payment === '2'){//银联支付
                    this.$http.post(this.ylUrl, {
                        pid: this.pid,
                        gid: this.id,
                    }).then(res => {
                        if (res.data.status == 0) {
                            window.location.href = `/unionpay/no_jump/#/?pid=${this.pid}&orderId=${res.data.info}`;
                        } else {
                            this.$vux.toast.show({
                                text: res.data.info,
                                type: "warn",
                                width: "5rem",
                                time: "3000"
                            });
                        }
                    }).catch(err=>{
                        this.$vux.toast.show({
                            text: err,
                            type: "warn",
                            width: "5rem",
                            time: "3000"
                        });
                    })
                } else if (this.payment === '1') {
                    const _this = this
                    this.$vux.confirm.show({
                        title: '温馨提示',
                        confirmText: '下一步',
                        content: '<p style="text-align:justify;margin-bottom:1%">识别下方二维码，下载<span style="color: #af2f23">“手机银行”APP</span>，绑定<span style="color: #af2f23">“中国银行信用卡”</span>即可参与本活动。</p><img  src="//gdecard.jiahuaming.com/boc/depth/assets/qr_code.png" width="50%"><p style="text-align:justify;">如已有<span style="color: #af2f23">“手机银行”APP</span>，且已开通<span style="color: #af2f23">“手机银行支付”</span>功能，请点击“下一步”完成支付。如需帮助，请点击查看<span style="color: #af2f23">“支付流程”</span>。</p>',
                        onConfirm() {
                            _this.$vux.loading.show({transition: '', text: '订单生成中'});

                            let url = _this.buyUrl + '?' +
                                'pid=' + _this.pid + '&' +
                                'gid=' + _this.id + '&' +
                                'code_type=' + _this.$route.query.code_type + '&' +
                                'back_url=' + encodeURIComponent('/boc/hebei_lifecycle/#/details?' +
                                    'id=' + _this.id + '&' +
                                    'code_type=' + _this.$route.query.code_type
                                )
                            window.location.href = url
                        }
                    })
                } else if (this.payment === '3') {
                    const _this = this
                    this.$vux.confirm.show({
                        title: '温馨提示',
                        content: `
                            <p style="text-align:justify;margin-bottom:1%;color: black;">
                                优惠立减请选择<span style="color: red;font-weight: 700;">【中国银行信用卡】</span>支付，通过<span style="color: red;font-weight: 700;">下拉菜单更换支付方式</span>，确认金额后完成支付。
                            </p>
                            <img id="tipsImg" src="http://gdecard.jiahuaming.com/boc/hebei_lifecycle/img/icon-wx.jpg" width="100%" alt="">
                        `,
                        onConfirm() {
                            _this.$vux.loading.show({
                                transition: '',
                                text: '订单生成中'
                            })
                            let url = '/wxPay/' + '?' +
                                'pid=' + _this.pid + '&' +
                                'mid=' + _this.dataInfo.mid + '&' +
                                'gid=' + _this.id + '&' +
                                'code_type=' + _this.$route.query.code_type + '&' +
                                'back_url=' + encodeURIComponent('/boc/hebei_lifecycle/#/details?' +
                                    'id=' + _this.id + '&' +
                                    'code_type=' + _this.$route.query.code_type
                                );
                            window.location.href = url
                        }
                    })
                } else {
                    this.$vux.toast.show({text: '请选择支付方式', type: 'warn', width: '10em'})
                }
            },
            showRule(){
                this.$http.get('/api/gdekhback/index/goods_instruction', {
                    params: {
                        ins_id: this.dataInfo.ins_id
                    }
                }).then((res) => {
                    console.log(res)
                    if (res.data.status === 0) {
                        this.show = true
                        this.contents = res.data.info.contents || ''
                    }
                })
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

    .content p img {
        margin-top: 10px;
        width: 100%;
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

    .shop button {
        width: 100% !important;
        background: #008da6;
        box-shadow: 5px 5px 5px rgb(9, 63, 74);
        color: #fff;
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

    [v-cloak] {
        display: none !important;
    }
</style>

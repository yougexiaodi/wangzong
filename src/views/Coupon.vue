<template>
    <div>
        <tab class="order-tab" default-color="#999999" active-color='#222222'>
            <tab-item selected @on-item-click="tabIndex='0'">全部订单</tab-item>
            <tab-item @on-item-click="tabIndex='1'">待付款</tab-item>
            <tab-item @on-item-click="tabIndex='2'">退款</tab-item>
        </tab>
        <ul>
            <li class="order-item" v-for="item in filterDataList" :key="item.id">
                <flexbox class="order-item-header" justify="space-between">
                    <div class="bold">订单号：{{item.order_id}}</div>
                    <div>
                        <span v-if="item.state === '2'" class="order-status order-status-refund">已使用</span>
                        <span v-else-if="item.state === '3'" class="order-status order-status-refund">已退款</span>
                        <span v-else-if="item.state === '4'" class="order-status">退款中</span>
                        <span v-else-if="item.state === '1'" class="order-status">未使用</span>
                        <span v-else-if="item.state === '0'" class="order-status">未支付</span>
                    </div>
                </flexbox>
                <flexbox>
                    <flexbox class="order-item-left">
                        <img :src="item.food_img" alt="">
                    </flexbox>
                    <flexbox-item>
                        <div class="bold">{{item.name}}</div>
                        <template v-if="item.pay_state === '1'">
                            <div class="order-vtime">有效期至:{{item.vtime}}</div>
                            <flexbox justify="space-between">
                                <div class="order-special-price">已经享受{{getSpecialPrice(item)}}元优惠</div>
                                <div><span class="order-price-name bold">实付:</span><span
                                    class="order-price bold">￥{{item.pay_price}}</span></div>
                            </flexbox>
                        </template>
                        <template v-else>
                            <div style="height: 10vw;"></div>
                        </template>
                        <flexbox class="order-item-btn-content" wrap="wrap" justify="flex-end">
                            <template v-if="item.pay_state === '0'">
                                <button class="order-btn" type="button" @click="cancelOrder(item)">取消</button>
                                <button class="order-btn" type="button" @click="buyCoupon(item)">付款</button>
                            </template>
                            <template v-else-if="item.pay_state === '1'">
                                <!--                                <button class="order-btn" type="button">查看券码</button>-->
                            </template>
                        </flexbox>
                    </flexbox-item>
                </flexbox>
            </li>
        </ul>
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
        TransferDomDirective as TransferDom,
        Tab,
        TabItem,
        Flexbox,
        FlexboxItem
    } from 'vux'
    import LBarCode from "../components/LBarCode";
    import {isLogin, isLoginWxAndLoginWx} from "../utils/login";

    export default {
        directives: {
            TransferDom
        },
        components: {
            LBarCode,
            Group,
            Cell,
            XButton,
            Confirm,
            Toast,
            Radio,
            Qrcode,
            XDialog,
            Tab,
            TabItem,
            Flexbox,
            FlexboxItem
        },
        data() {
            return {
                pid: sessionStorage.getItem('pid'),
                loginState: '/api/gdekhback/phone/is_login',
                dataDetailsUrl: '/api/gdekhback/phone/order_list_all',
                cancelUrl: '/api/gdekhback/phone/order_cancel',
                buyUrl: '/api/gdekhback/phone/hebei_lifecycle_boc_pay',
                couponList: [],
                tabIndex: "0",
            }
        },
        computed: {
            filterDataList() {
                return this.couponList.filter(item => {
                    if (this.tabIndex === "0") { // 全部订单
                        return true;
                    }
                    if (this.tabIndex === "1") { // 待付款
                        return item.state === '0';
                    }
                    if (this.tabIndex === "2") { // 退款
                        return item.state === '3';
                    }
                });
            }
        },
        mounted() {
            this.$vux.loading.show({text: '加载中...'});
            if (this.$route.query.err !== undefined) {
                this.$vux.toast.show({text: this.$route.query.err, type: 'warn', width: '12em', time: '5000'});
            }
            this.getLoginState()
        },
        methods: {
            getLoginState() {
                isLogin(this.pid).then(res => {
                    isLoginWxAndLoginWx(this.pid, this.$route.path, this.$route.query).then(res => {
                        this.getDataDetails();
                    })
                }, res => {
                    this.$router.push({
                        path: '/login',
                        query: {
                            ...this.$route.query,
                            path: this.$route.path
                        }
                    })
                });
            },
            getDataDetails() {
                let _this = this;
                this.$http.post(this.dataDetailsUrl, {
                    pid: sessionStorage.getItem('pid')
                }).then((res) => {
                    if (res.data.status === 0) {
                        if (res.data.info.length !== 0) {
                            this.couponList = res.data.info;
                        } else {
                            this.$vux.alert.show({
                                title: '提示',
                                content: '没有查询到您的优惠码',
                                onHide() {
                                    _this.$router.push({path: '/'})
                                }
                            })
                        }
                    } else {
                        this.couponList = []
                    }
                })
            },
            getSpecialPrice(item) {
                return item.pre_price - item.pay_price;
            },
            buyCoupon(item) {
                if (item.pay_type === '2') {
                    window.location.href = this.buyUrl + '?' +
                        'pid=' + sessionStorage.getItem('pid') + '&' +
                        'order_id=' + item.order_id + '&' +
                        'back_url=' + encodeURIComponent('/coupon?' +
                            'pid=' + sessionStorage.getItem('pid')
                        );
                } else if (item.pay_type === '1') {
                    window.location.href = '/wxPay/?' +
                        'pid=' + sessionStorage.getItem('pid') + '&' +
                        'order_id=' + item.order_id + '&' +
                        'gid=' + item.id + '&' +
                        'wx_id=2'
                }
            },
            cancelOrder(item) {
                let self = this
                self.$vux.confirm.show({
                    title: '操作提示',
                    content: '确定要取消此订单吗？',
                    onConfirm() {
                        self.$http.post(self.cancelUrl, {
                            pid: sessionStorage.getItem('pid'),
                            id: item.id,
                        }).then((res) => {
                            if (res.data.status === 0) {
                                self.$vux.toast.show({text: '取消成功', type: 'success'});
                            } else {
                                self.$vux.toast.show({text: '取消失败，请重新处理，或联系客服', type: 'warn', width: '10em'});
                            }
                            self.getDataDetails();
                        })
                    }
                })
            },
        }
    }
</script>
<style lang="less" scoped>
    .order-tab {
        /deep/ .vux-tab .vux-tab-item {
            font-weight: 700;
        }

        /deep/ .vux-tab-ink-bar {
            margin: 0 12vw;
            height: 1vw !important;
            background-color: #dd5238 !important;
            border-radius: 1vw !important;
        }
    }

    .bold {
        font-weight: 700;
    }

    .order-item {
        padding: 4vw 5vw;
        border-top: 2vw solid #f3f5f7;
        background-color: #ffffff;

        .order-item-header {
            margin-bottom: 4vw;
            padding-bottom: 4vw;
            font-size: 4vw;
            color: #222222;
            border-bottom: #aaaaaa4d 1px solid;
        }

        .order-vtime, .order-special-price {
            font-size: 3.2vw;
            line-height: 6.1vw;
            color: #999999;
        }

        .order-price-name {
            font-size: 3.5vw;
            line-height: 6.1vw;
            color: #222222;
        }

        .order-price {
            font-size: 3.5vw;
            color: #dd5238;
        }

        .order-item-left {
            width: 23.6vw;
            height: 23.6vw;
            border-radius: 1.2vw;
            border: solid 0.5px #dcdcdc;
            overflow: hidden;
            margin-right: 5.5vw;
            margin-left: 1vw;
            background-color: #ffffff;

            img {
                width: 100%;
            }
        }

        .order-item-btn-content {
            padding-top: 2.4vw;
        }

        .order-status {
            font-size: 3.7vw;
            font-weight: 700;
            line-height: 6.1vw;
            color: #dd5238;
        }

        .order-status-refund {
            color: #666666;
        }

        .order-btn {
            margin-left: 4vw;
            padding: 0 2vw;
            border: solid 1px #dd5238;
            border-radius: 2.9vw;

            font-size: 3.2vw;
            line-height: 6.1vw;
            color: #dd5238;

            background-color: #ffffff;
        }
    }
</style>

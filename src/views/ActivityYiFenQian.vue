<template>
    <div class="yifenqian">
        <div class="rel">
            <img src="../assets/yifenqian/bg.jpg" alt="">
            <div class="main">
                <div class="icon-buy">
                    <img src="../assets/yifenqian/bg-btn-buy.png" alt="" @click="goBuy">
                </div>
                <div class="icon-coupon">
                    <img src="../assets/yifenqian/bg-btn-coupon.png" alt="" @click="goCoupon">
                </div>
                <div class="activity">
                    <div>
                        <span class="title">活动对象：</span>
                        河北地区信用卡受邀客户
                    </div>
                    <div>
                        <span class="title">活动内容：</span>
                        客户在活动页面使用中行信用卡通过手机银行或者微信绑定中行信用卡支付1分钱可购买10元微信立减全场通用券，并在商户消费，微信支付时选择中行信用卡付款，可享受满20元立减10元优惠，名额有限，先到先得。
                    </div>
                    <div>
                        <span class="title">活动细则：</span>
                        每客户活动期间可参与一次，代金券7天有效期，逾期作废，所支付的1分钱不予退还。
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {};
        },
        methods: {
            goBuy() {
                this.$router.push({
                    path: "/details",
                    query: {
                        id: 3448
                    }
                });
            },
            goCoupon() {
                this.$router.push("/coupon")
            },
        }
    }
</script>

<style scoped lang="less">

    .yifenqian {
        min-height: 100vh;
        background: url("../assets/yifenqian/bg-line.jpg");

        .rel {
            position: relative;

            img {
                width: 100%;
                vertical-align: top;
            }

            .main {
                position: absolute;
                top: 43.7%;
                left: 0;
                right: 0;

                .icon-buy {
                    margin: 0 auto;
                    width: 24.7vw;
                }

                .icon-coupon {
                    margin: 7% auto 0;
                    width: 23.2vw;
                }

                .activity {
                    margin: 19% auto 0;
                    width: 91.9vw;

                    font-size: 12px;
                    color: #fffdfc;

                    @media screen and (device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) {
                        margin-top: 10%;
                    }

                    .title {
                        font-weight: 700;
                    }
                }
            }
        }
    }
</style>
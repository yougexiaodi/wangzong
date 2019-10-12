<template>
    <div style="background:#f1f1f1;">
        <!--    <div class="top_logo">-->
        <!--      &lt;!&ndash; <img src="../assets/img/banner.png" width="100%"> &ndash;&gt;-->
        <!--      <img src="../assets/img/rules.png" width="96%">-->
        <!--    </div>-->
        <div class="details">
            <div><span>活动时间:&nbsp;&nbsp;</span>即日起至-2020年6月30日</div>
            <div><span>活动对象:&nbsp;&nbsp;</span>中国银行信用卡客户</div>
            <div><span>活动内容:&nbsp;&nbsp;</span>活动期间，中国银行信用卡客户可在活动期间抢购逸天城美食优惠代金券，使用中国银行信用卡通过“中国银行贵州分行”微信公众号，选择中行信用卡付款，付款完成后持电子券到逸天城2F顾客服务中心兑换商场纸质代金券，到指定商户门店使用，每日名额有限，先到先得。券码在活动期间内有效。
            </div>
        </div>
        <div style="margin-bottom: 20px;">
            <div class="yn_list" v-for="vm in dataInfo" :key="vm.id">
                <router-link :to="{path: '/details', query: {id: vm.id, mid: vm.mid}}">
                    <img :src="vm.list_img" width="100%">
                </router-link>
            </div>
        </div>
        <!-- <router-link to="/coupon">
          <img class="icon-search" src="../assets/search.png">
        </router-link> -->
        <div>
            <img src="../assets/img/footer.png" width="100%">
        </div>
    </div>
</template>

<script>
    import {Group, Cell} from 'vux'

    export default {
        components: {
            Group,
            Cell
        },
        data() {
            return {
                pid: sessionStorage.getItem('pid'),
                id: this.$route.query.aid,
                dataInfo: [],
                showTxt: '',
                txtInfo: [
                    '每人每周每商品最多可购买2张代金券',
                    '每人每周最多可购买2张代金券'
                ],
                getDataUrl: '/api/gdekhback/special/goods_list'
            }
        },
        mounted() {
            this.getData()
            this.getTxt()
        },
        methods: {
            getTxt() {
                if (this.id === '40') {
                    this.showTxt = this.txtInfo[0]
                } else {
                    this.showTxt = this.txtInfo[1]
                }
            },
            getData() {
                this.$http.post(this.getDataUrl, {pid: this.pid, aid: this.$route.query.aid})
                    .then((res) => {
                        this.$vux.loading.show({
                            text: '加载中...'
                        })
                        if (res.data.status === 0) {
                            this.dataInfo = res.data.info
                            this.$vux.loading.hide()
                        }
                    })
            }
        }
    }
</script>

<style>

    .details {
        font-size: 13px;
        margin: 10px;
        margin-top: 0;
        background-color: #ffffff;
        padding: 14px;
        border-radius: 10px;
        border: 2px solid #cccccc;
        color: #001012;
        line-height: 1.2;
    }

    .details > div {
        font-weight: 700;
    }

    .details > div > span {
        font-weight: 700;
        color: #7d0022;
    }

    .top_logo {
        text-align: center;
    }

    .home_title {
        width: 96%;
        margin: 0 auto;
        padding: 2% 0;
    }

    .home_title h4 {
        float: left;
        width: 24%;
        padding-left: 2%;
        text-align: center;
        font-weight: bold;
        color: #605d6c;
    }

    .home_title p {
        width: 74%;
        display: inline-block;
        padding-left: 2%;
        border-left: 1px dashed #605d6c;
        color: #605d6c;
    }

    .depth_star {
        display: block;
        margin: 10px auto;
    }

    .yn_list img {
        display: block;
        width: 90%;
        margin: 10px auto;
        border-radius: 8px;
    }

    .icon-search {
        position: fixed;
        top: 50%;
        width: 20%;
        right: 0;
    }
</style>

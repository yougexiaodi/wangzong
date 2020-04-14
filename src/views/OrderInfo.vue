<template>
  <div>
    <msg :title="title" :description="description" :buttons="buttons" :icon="icon">
      <p slot="description" style="color: #1aad19;font-size: 22px">{{code}}</p>
    </msg>
    <form-preview header-label="付款金额" :header-value="price" :body-items="list" :footer-buttons="buttons2"
                  name="demo"></form-preview>
  </div>
</template>
<script>
    import {Msg, TransferDomDirective as TransferDom, XButton, FormPreview, Box} from 'vux'

    export default {
        directives: {
            TransferDom
        },
        components: {
            Msg,
            XButton,
            FormPreview,
            Box
        },
        data() {
            return {
                description: '',
                title: '',
                icon: '',
                code: '',
                buttons: [{
                    type: 'primary',
                    text: '查询我的优惠券',
                    link: '/Coupon'
                }],
                price: '',
                list: [],
                buttons2: [{
                    style: 'primary',
                    text: '继续选购',
                    link: '/'
                }],
                loginState: '/api/gdekhback/phone/is_login.html',
                getDataUrl: '/api/gdekhback/phone/order_detail.html'
            }
        },
        mounted() {
            this.getLoginState()
        },
        methods: {
            getData() {
                this.$http.post(this.getDataUrl, {
                    order_id: this.$route.query.order_id,
                    pid: sessionStorage.getItem('pid')
                }).then((res) => {
                    if (res.data.status === 0) {
                        this.title = '支付成功'
                        this.icon = 'success'
                        this.description = '凭此优惠码可前往指定门店享受优惠'
                        this.code = res.data.info.code
                        this.price = '￥' + res.data.info.pay_price
                        this.list = [
                            {label: '商户名称', value: res.data.info.merchant},
                            {label: '商品名称', value: res.data.info.name},
                            {label: '优惠码', value: res.data.info.code},
                            {label: '订单号', value: res.data.info.order_id},
                            {label: '支付方式', value: res.data.info.pay_type},
                            {label: '交易时间', value: res.data.info.pay_time}
                        ]
                        if (res.data.info.state === '4') {
                            this.$vux.alert.show({
                                title: "温馨提示",
                                content: "您选择了非中行信用卡支付，所支付金额将在24小时内原路退回。名额将自动释放，请您选择中行信用卡继续支付购买。",
                            })
                        }
                    } else {
                        this.title = '支付失败'
                        this.icon = 'warn'
                        this.description = '支付失败，请重新支付'
                    }
                })
            },
            getLoginState() {
                this.$vux.loading.show({
                    text: '加载中...'
                })
                this.btnLoading = true
                this.disabled = true
                this.$http.post(this.loginState, {pid: sessionStorage.getItem('pid')})
                    .then((res) => {
                        if (res.data.status === 0) {
                            this.getData()
                        } else {
                            this.$router.push({
                                path: '/login',
                                query: {path: this.$route.path + '?id=' + this.$route.query.id}
                            })
                        }
                        this.$vux.loading.hide()
                    })
            }
        }
    }
</script>

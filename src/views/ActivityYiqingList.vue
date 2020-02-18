<template>
    <div class="coupon">
        <ul class="list">
            <li class="item" v-for="item in list" :key="item.id" @click="toDetail(item.id)">
                <div class="img-content">
                    <img :src="item.list_img || item.food_img" alt="">
                </div>
                <div class="font-content">
                    <p class="name">{{item.name}}</p>
                    <p class="intro">{{item.intro}}</p>
                    <div class="buy-content">
                        <p class="price">￥{{item.price}}</p>
                        <button class="btn-buy" type="button">购买</button>
                    </div>
                </div>
            </li>
        </ul>
        <button class="btn-back" type="button" @click="goHome">返回</button>
    </div>
</template>
<script>
    import {XTable, Group, Cell} from 'vux'

    export default {
        components: {XTable, Group, Cell},
        data() {
            return {
                listUrl: '/api/gdekhback/special/goods_list',
                list: [],
                aid:'',
                pid:'',
            }
        },
        mounted() {
            this.aid = this.$route.query.aid;
            this.pid = sessionStorage.getItem('pid');
            this.getData()
        },
        methods: {
            goHome(){
                this.$router.push('/activityYiqing')
            },
            toDetail(id){
                this.$router.push({
                    path: '/details',
                    query: {
                        id: id
                    }
                });
            },
            getData() {
                this.$vux.loading.show({
                    text: '加载中...'
                })
                this.$http.post(this.listUrl, {
                    pid: this.pid,
                    aid: this.aid
                }).then(res => {
                    this.$vux.loading.hide();
                    if (res.data.status === 0) {
                        this.list = res.data.info;
                    } else {
                        this.$vux.toast.show({text: res.data.info, type: 'warn'})
                    }
                }).catch(err => {
                    this.$vux.loading.hide();
                    this.$vux.toast.show({text: err, type: 'warn'})
                })
            }
        }
    }
</script>
<style scoped>
.coupon{
    padding-bottom: 0.2rem;
}
    .coupon .list {
        margin-top: -1px;
        padding: 10px;

        list-style: none;
        background: #ffffff;
    }
    .list li {
        display: flex;
        margin-bottom: 4vw;
        padding: 4vw 2vw;
        border: 1px solid #8c1c1f;
        border-radius: 5px;
    }
    .list li .img-content {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-shrink: 0;
        margin-left: 1vw;
    }
    .img-content img{
        display: block;
        width: 20vw;
    }
    .font-content {
        flex: 1;
        display: flex;
        flex-direction: column;
        margin-left: 4vw;
        padding-left: 4vw;
        border-left: 1px #e2e2e2 solid;
    }
    .font-content .name {
        flex: 1;
        font-size: 16px;
        font-weight: 700;
        color: #8c1c1f;
    }

    .font-content .intro {
        font-size: 14px;
        color: #c2c2c2;
    }
    .font-content .buy-content {
        display: flex;
        justify-content: space-between;
    }
    .buy-content .price {
        font-size: 16px;
        font-weight: 700;
        color: #FF283A;
      }
    .buy-content .btn-buy {
        margin-right: 2vw;
        padding: 0.5vw 4vw;
        border: 0;
        border-radius: 4vw;
        text-align: center;
        color: #ffffff;
        background-color: #8c1c1f;
    }
  .btn-back {
    box-sizing: border-box;
    display: block;
    margin: 4vw auto 12vw;
    padding: 2vw 4vw;
    width: 80vw;
    border: 0;
    border-radius: 6vw;
    text-align: center;
    color: #ffffff;
    background-color: #8c1c1f;
  }
</style>

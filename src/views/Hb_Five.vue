<template>
    <div class="home-container">
        <div class="container">
            <div class="active-item" v-for="(item,index) in list" :key="index">
                <div class="active-con" >
                    <h4 class="title">{{item.name}}</h4>
                    <div class="goods-list">
                        <div class="goods-item" v-for="(items,index) in item.goods_list" :key="index">
                            <img :src="items.list_img" alt="">
                            <span>{{items.tags}}</span>
                            <h5>{{items.name}}</h5>
                            <i class="btn" @click="goodsId=items.id" :class="{'active':goodsId==items.id}"></i>
                        </div>
                        <div class="buy-btn"  @click="toDetail">立即抢购</div>
                    </div> 
                </div>
            </div>
        </div>
    </div>
</template>
<script>

export default {
    data(){
        return{
            dataUrl:'/api/gdekhback/special/goods_lists',
            list:[],
            goodsId:''
        }
    },
    mounted(){
        this.getgoodlist()
    },
    methods:{
        toDetail(){
            if(this.goodsId){
                this.$router.push({path:'/details',query:{
                    id:this.goodsId
                }})
            }else{
                this.$vux.toast.show({
                    text: '请选择要购买的商品',
                    type: 'warn',
                    width: '10em'
                })
            }
        },
        getgoodlist(){
            this.$http.get(this.dataUrl).then((res) => {
                if(res.data.status == 0){
                    this.list = res.data.info;
                }
            })
        }
    }
}
</script>
<style lang="less" scoped>
.home-container{
    height: 100%;
    overflow-y: scroll;
}
.container{
    padding-top: 338px;
    background:#25c082 url(./../assets/images/home-bg.png) no-repeat top center;
    background-size: 100% auto;
    padding-bottom: 30px;
}
.active-item{
    background: url(./../assets/images/item-top.png) no-repeat top center;
    background-size: 360px auto;
    padding-top: 20px;
    margin-top: 30px;
}
.active-con{
    width: calc(~"100% - 36px");
    background: #ffffff;
    margin: 0 auto ;
    border-top: 10px solid #dbf5eb;
}
.title{
    width: 140px;
    height: 30px;
    background: url(./../assets/images/title-bg.png) no-repeat top center;
    background-size: 100%;
    font-size: 28px;
    color: #0f8d6c;
    font-weight: normal;
    line-height: 30px;
    margin: 0 auto;
    text-align: center;
    margin: 12px auto 26px;
}
.goods-list{
    padding: 0 8px 20px 8px;
    display: flex;
    flex-wrap: wrap;
    // justify-content: space-between;
}
.goods-item{
    // width: 100px;
    height: 134px;
    width: 32%;
    background: url(./../assets/images/item-bg.png) no-repeat center;
    background-size: 100% 100%;
    margin: 0 4px 25px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    &:nth-child(3n){
        margin-right: 0;
    }
    img{
        height: 37px;
        max-width: 100%;
        margin-top: 8px;
    }
    span{
        font-size: 12px;
        color: #262626;
        margin-top: 4px;
        line-height: 17px;
        height: 17px;
    }
    h5{
        font-size: 15px;
        margin-top: 10px;
    }
    span,h5{
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        text-align: center;
    }
    .btn{
        display: block;
        width: 30px;
        height: 30px;
        background: url(./../assets/images/btn.png) no-repeat center;
        background-size: 100% 100%;
        &.active{
            background: url(./../assets/images/btn-s.png) no-repeat center;
        background-size: 100% 100%;
        }
    }
}
.buy-btn{
    width: 266px;
    height: 47px;
    text-align: center;
    margin: 0 auto;
    background: #25c082;
    border-radius: 40px;
    line-height: 47px;
    color: #ffffff;
    font-size: 18px;
    box-shadow: 6px 0 22px rgba(37, 192, 130, .29);
}
</style>
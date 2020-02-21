<template>
    <div class="yqlista">
        <div class="yqlista_top">
            <div class="mask"></div>
            <h3 class="title">{{item.name}}</h3>
        </div>
        <div class="yqlista_content">
            <div class="li_icon" @click="goBuy(item.id)">
                <img :src="item.pic" alt="" class="pic">
            </div>
            <!-- <ul class="li_icon">
                <li>
                    <img src="" alt="">
                    <p>京东</p>
                </li>
            </ul> -->
            <a href="javascript:;" class="buyNows" @click="goBuy(item.id)">立即购买</a>
        </div>
        <div class="yqlista_bottom"></div>
    </div>
</template>
<script>
export default {
    props:['item'],
    methods:{
        goBuy(id) {
            this.$router.push({
                path: "/activityYiqingList",
                query: {
                    aid: id
                }
            });
        },
    }
}
</script>
<style scoped>
.yqlista{
    width:6.92rem;
    margin: 0 auto;
}
.yqlista_top{
    background: url(../assets/yiqing/border-top.png) no-repeat 0 0;
    background-size: 100% 1.72rem;
    padding-top: 1.72rem;
    position: relative;
}
.yqlista_bottom{
    background: url(../assets/yiqing/border-bottom.png) no-repeat 0 100%;
    background-size: 100% 0.48rem;
    padding-bottom: 0.48rem;
}
.yqlista_content{
    background: url(../assets/yiqing/border-re.png) repeat-y 0 0;
    background-size: 100% 0.37rem;
    margin: -0.05rem 0;
}
.yqlista_top .title{
    font-size: 0.44rem;
    color: #ffffff;
    font-weight: 700;
    position: absolute;
    left: 1.6rem;
    top: 0;
    width: 3.85rem;
    height: 0.91rem;
    line-height: 0.91rem;
    text-align: center;
}
.yqlista_content .pic{
    width: 5.42rem;
    display: block;
}
.li_icon{
    width: 5.42rem;
    background-color: #ffffff;
    padding: 0.3rem 0 0.5rem 0;
    margin: 0 auto;

}
.mask{
    position: absolute;
    left: 50%;
    margin-left: -2.71rem;
    top: 1.36rem;
    width: 5.42rem;
    background-color: #ffffff;
    height: 0.38rem;
}
.buyNows{
    width: 4.48rem;
    height: 0.76rem;
    border-radius: 0.4rem;
    background-color: #fcb02a;
    font-size: 0.4rem;
    color: #710312;
    text-align: center;
    line-height: 0.76rem;
    display: block;
    margin: 0.54rem auto 0;
    font-weight: 700;
}
</style>
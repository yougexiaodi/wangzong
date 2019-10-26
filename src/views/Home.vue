<template>
    <div class="gd_home">
        <div class="gd_top">
            <div class="gd_top_1">
                <a style="color:#ffffff"
                   href="https://apply.mcard.boc.cn/apply/mobile/index?appid=wx567af860fd4db040&bankCode=0010">
                    <img src="../assets/icon/card1.png" alt="">
                    <p class="gd_top_title">申请信用卡
                        <span class="gd_top_desc">立即返现礼</span>
                    </p>
                </a>
            </div>
            <div class="gd_top_2">
                <a style="color:#ffffff" href="https://apply.mcard.boc.cn/apply/mobile/recommendCard/activityIndex">
                    <img src="../assets/icon/card2.png" alt="">
                    <p class="gd_top_title">推荐办卡
                        <span class="gd_top_desc">新客户专属活动</span>
                    </p>
                </a>
            </div>
        </div>
        <div style="margin:0 auto;width:100%;">
            <swiper :aspect-ratio="355/750" auto dots-class="custom-bottom" dots-position="right">
                <swiper-item class="swiper-demo-img" v-for="(item, index) in bannerList" :key="index">
                    <img :src="item.img_url" @click="go(item)" class="full_img" alt="">
                </swiper-item>
            </swiper>
        </div>
        <group class="gd_dist" :gutter="0" v-if="activity28.activity_list && activity28.activity_list.length>0">
            <flexbox style="flex-wrap: wrap;">
                <flexbox-item :span="1/4" class="ecard-nav" v-for="item in activity28.activity_list" :key="item.id">
                    <a @click="go(item)">
                        <div class="ecard-font">
                            <!-- <span style="visibility:hidden;">&#xe625;</span> -->
                            <img :src="item.img_url" alt="" class="full_img">
                        </div>
                        <div class="flex-demo">{{item.title}}</div>
                    </a>
                </flexbox-item>
            </flexbox>
        </group>
        <group :gutter="0" v-if="activity10.activity_list && activity10.activity_list.length>0">
            <group-title class="home_title">
                <span class="ecard-font" style="color:#3b3b3b;margin-right:.5rem">—</span>
                {{activity10.c_name}}
                <span class="ecard-font" style="color:#3b3b3b;margin-left:.5rem">—</span>
            </group-title>
            <div class="swiper-container" style="margin: 0 auto 10px;">
                <tab :scroll-threshold='activity10.activity_list.length' bar-active-color="#c81e0d"
                     active-color="#666666" v-model="getDay">
                    <tab-item v-for="(item,index) in activity10.activity_list" :selected="getDay === index"
                              :key="item.id" @on-item-click="tabDay">{{item.title}}
                    </tab-item>
                </tab>
                <div class="swiper-wrapper" style="margin: 20px 0 25px;">
                    <div class="swiper-slide" v-for="item in activity10.activity_list" :key="item.id">
                        <a @click="go(item)">
                            <img class="full_img" :src="item.img_url" alt="">
                        </a>
                    </div>
                </div>
                <div class="swiper-pagination" style="bottom:0;"></div>
            </div>
        </group>
        <group :gutter="5" v-if="activity16.activity_list && activity16.activity_list.length>0">
            <group-title class="home_title">
                <span class="ecard-font" style="color:#3b3b3b;margin-right:.5rem">—</span>
                {{activity16.c_name}}
                <span class="ecard-font" style="color:#3b3b3b;margin-left:.5rem">—</span>
            </group-title>
            <div class="areaswiper-box area" style="margin: 0 auto 10px;">
                <swiper auto class="swiper-wrapper custom-hsq" style="margin: 20px 0 25px;">
                    <swiper-item class="swiper-slide swiper-demo-img" v-for="item in activity16.activity_list"
                                 :key="item.id">
                        <a @click="go(item)">
                            <img :src="item.img_url" class="full-img" alt="">
                        </a>
                        <p class="wrap-text">{{item.title}}</p>
                    </swiper-item>
                </swiper>
            </div>
        </group>
        <group :gutter="5" v-if="activity17.activity_list && activity17.activity_list.length>0">
            <group-title class="home_title">
                <span class="ecard-font" style="color:#3b3b3b;margin-right:.5rem">—</span>
                {{activity17.c_name}}
                <span class="ecard-font" style="color:#3b3b3b;margin-left:.5rem">—</span>
            </group-title>
            <div class="gd_imgWrap">
                <div class="gd_imgLoad" v-for="item in activity17.activity_list" :key="item.id">
                    <a @click="go(item)">
                        <img :src="item.img_url" class="full_img" alt="">
                    </a>
                </div>
            </div>
        </group>
        <group :gutter="5" v-if="activity18.activity_list && activity18.activity_list.length>0">
            <group-title class="home_title">
                <span class="ecard-font" style="color:#3b3b3b;margin-right:.5rem">—</span>
                {{activity18.c_name}}
                <span class="ecard-font" style="color:#3b3b3b;margin-left:.5rem">—</span>
            </group-title>
            <div class="gd_imgWrap">
                <div class="gd_imgLoad" v-for="item in activity18.activity_list" :key="item.id">
                    <a @click="go(item)">
                        <img :src="item.img_url" class="full_img" alt="">
                    </a>
                </div>
            </div>
        </group>
    </div>
</template>

<script type="text/babel">
    import {
        Tabbar,
        TabbarItem,
        Group,
        Swiper,
        SwiperItem,
        Flexbox,
        FlexboxItem,
        Panel,
        Cell,
        Grid,
        GridItem,
        XImg,
        GroupTitle,
        Box,
        Tab, TabItem, Confirm
    } from 'vux'

    import WeekSwiper from 'swiper'
    import 'swiper/dist/css/swiper.min.css'

    export default {
        components: {
            Tabbar,
            TabbarItem,
            Flexbox,
            FlexboxItem,
            Panel,
            Swiper,
            SwiperItem,
            Group,
            Cell,
            Grid,
            GridItem,
            XImg,
            GroupTitle,
            Box,
            Tab,
            TabItem,
            Confirm
        },
        data() {
            return {
                getDataUrl: '/api/gdekhback/phone/activity_list',
                bannerList: [],
                activity10: {},
                activity16: {},
                activity17: {},
                activity18: {},
                activity28: {},
                getDay: 0,
                pid: sessionStorage.getItem('pid')
            }
        },
        created() {
            this.setSwiper()
        },
        mounted: function () {
            this.getBannerList()
        },
        methods: {
            showTips(message) {
                this.$vux.toast.show({
                    text: message,
                    type: 'warn',
                    width: '10em'
                })
            },
            setSwiper() {
                let self = this;
                let mySwiper = new WeekSwiper('.swiper-container', {
                    loop: true,
                    slidesPerView: 3,
                    spaceBetween: 20,
                    centeredSlides: true,
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true
                    },
                    on: {
                        slideChange: function () {
                            if (mySwiper) {
                                self.getDay = mySwiper.realIndex
                            }
                        }
                    }
                })
            },
            tabDay(index) {
                let mySwiper = document.querySelector('.swiper-container').swiper;
                mySwiper.slideToLoop(index)
            },
            getBannerList() {
                this.$http.get("/api/gdekhback/Redpacket/gdicardView", {
                    params: {
                        pid: this.pid
                    }
                }).then((res) => {
                    if (res.data.status === 1) {
                        this.bannerList = (res.data.data[9] || {})["activity_list"] || [];
                        this.bannerList = sort(this.bannerList);

                        this.activity16 = (res.data.data[16] || {});
                        this.activity16.activity_list = sort(this.activity16.activity_list || []);

                        this.activity17 = (res.data.data[17] || {});
                        this.activity17.activity_list = sort(this.activity17.activity_list || []);

                        this.activity18 = (res.data.data[18] || {});
                        this.activity18.activity_list = sort(this.activity18.activity_list || []);

                        this.activity28 = (res.data.data[28] || {});
                        this.activity28.activity_list = sort(this.activity28.activity_list || []);

                        this.activity10 = (res.data.data[10] || {});
                        // res.data.data[10].children 提取二级分类下的activity_list
                        this.activity10.activity_list = (this.activity10.children || []).map(function (item) {
                            return item.activity_list && item.activity_list[0] || null;
                        }).filter(function (item) {
                            return item != null;
                        });

                        this.$nextTick(() => {
                            this.setSwiper()
                        })
                    }
                });

                function sort(list) {
                    return list.sort(function (itemBefore, itemAfter) {
                        let sort1 = parseInt(itemBefore.sort);
                        let sort2 = parseInt(itemAfter.sort);
                        if (isNaN(sort1)) {
                            sort1 = Number.MAX_SAFE_INTEGER;
                        }
                        if (isNaN(sort2)) {
                            sort2 = Number.MAX_SAFE_INTEGER;
                        }
                        return sort1 - sort2;
                    })
                }
            },
            go(item) {
                let url = item.url;
                if (url != null && url !== "") {
                    if (/^(http:|https:)?\/\//g.test(url)) { // 路由外跳转
                        window.location.href = url;
                    } else if (/^\//g.test(url)) { // 路由内跳转
                        this.$router.push(url);
                    } else if (/^s:\/\//g.test(url)) { // 特殊处理
                        let message = url.replace(/^s:\/\//g, "");
                        this.showTips(message);
                    }
                }
            }
        }
    }
</script>
<style>
    .areaswiper-box {
        position: relative;
        left: 20px;
    }

    .wrap-text {
        position: absolute;
        width: 100%;
        left: 0;
        bottom: 6px;
        background: rgba(59, 59, 59, 0.8);
        color: #ffffff;
        text-align: center;
        padding: 4px 0;
        border-radius: 0 0 12px 12px;
    }

    .swiper-container .swiper-slide {
        transform: scale(0.9) !important;
    }

    .swiper-container .swiper-slide-active {
        transform: scale(1.3) !important;
        margin-right: 10px !important;
        /*transform: translateX(-5px);*/
    }

    .swiper-container .swiper-slide-prev, .swiper-container .swiper-slide-next {
        margin-right: 10px !important;
        transform: scale(1.1) !important;
    }

    .swiper-container .swiper-slide-prev {
        transform: translateX(-8px) scale(1) !important;
        /*transform: translateX(-5px) scale(1.1);*/
    }

    .swiper-container .swiper-slide-next {
        transform: translateX(8px) scale(1) !important;
        /*transform: translateX(5px) scale(1.1); */
    }

    .custom-hsq .vux-swiper {
        width: 100%;
    }

    body {
        background: #f5f4f4 !important;
    }

    .suspension {
        position: fixed;
        right: 0;
        top: 60%;
        width: 20%;
        z-index: 9;
    }

    .p-top-img {
        display: block;
        padding-bottom: 10px;
    }

    .hzms_img {
        display: block;
        margin: 0 auto;
        width: 80%;
    }

    .gd_top {
        margin-bottom: -15%;
        padding: 5% 5% 20%;
        background: linear-gradient(to right, #fd5730, #f92b3f);
        color: #ffffff;
        text-align: center;
        /* border-radius: 6px; */
    }

    .gd_top div {
        display: inline-block;
        width: 45%;
    }

    .gd_top .gd_top_1 {
        /* border-right: 1px solid #ededed; */
    }

    .gd_top img {
        width: 25%;
        vertical-align: text-bottom;
    }

    .gd_top p {
        width: 60%;
        text-align: center;
    }

    .gd_top_title {
        display: inline-block;
        font-size: 1rem;
    }

    .gd_top_desc {
        /* color: #adadad; */
        font-size: .6rem;
        display: inline-block;
    }

    .gd_dist {
        flex-wrap: wrap;

        margin-bottom: 7px;
        padding: 5%;
        background: #ffffff;
    }

    .gd_dist .weui-cells {
        color: #ffffff !important;
    }

    .gd_dist .weui-cells::after {
        border: none;
    }

    .gd_dist .weui-cells:before {
        border-top: none !important;
    }

    .ecard-nav {
        background-color: #f5797c !important;
    }

    .gd_dist .ecard-nav {
        margin-bottom: 8px;

        background-color: #f5f4f4 !important;
    }

    .ecard-nav .ecard-font {
        color: #ffffff !important;
        text-align: center;
    }

    .gd_dist .ecard-font {
        background: #ffffff;
    }

    .gd_dist .flex-demo {
        background: #ffffff;
        text-align: center;
    }

    .ecard-font .full_img {
        width: 2rem;
    }

    /* .gd_dist .ecard-font {
      color: #ffffff !important;
    } */

    .flex-demo {
        /* color: #4b4a4a; */
        color: #ffffff;
        font-size: .8rem;
    }

    .gd_dist .flex-demo {
        color: #4b4a4a;
    }

    .home_title {
        text-align: center;
        font-size: 1rem !important;
        color: #3b3b3b !important;
        font-weight: bold;
    }

    .week_list {
        margin: 0 auto;
        position: relative;
        width: 92%;
    }

    .list_icon {
        position: absolute;
        right: 5%;
        top: 50%;
        transform: translateY(-50%);
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
        overflow: hidden;
        /* background: url('../assets/list/icon.png') no-repeat center/100%; */
        animation: slideIn 1s ease-in infinite alternate;
    }

    @keyframes slideIn {
        from {
            transform: translateY(-50%);
        }
        to {
            transform: translateY(-50%) scale(1.2);
        }
    }

    .gd_grids {
        padding: 5px 10px !important;
    }

    .gd_grids:before, .gd_grids:after {
        border-top: none !important;
        border-right: none !important;
        border-bottom: none !important;
        border-left: none !important;
    }

    .gd_grids .gd_grid:before, .gd_grids .gd_grid:after {
        border-top: none !important;
        border-right: none !important;
        border-bottom: none !important;
        border-left: none !important;
    }

    .gd_grid {
        padding: 5px 0 !important;
    }

    .gd_grids img {
        display: block;
        width: 45%;
        text-align: center;
        margin: 0 auto;
    }

    .gd_grids p {
        font-size: .8rem;
        text-align: center;
        color: #000
    }

    .gd_grids p.desc {
        font-size: .6rem;
    }

    .gd_imgWrap {
        display: flex;
        flex: 0 1 auto;
        flex-wrap: wrap;
        justify-content: space-around;
    }

    .gd_imgLoad {
        width: 48%;
        margin: 0;
    }

    .gd_imgLoad:nth-last-child(1):first-child {
        width: 98%;
    }


    .gd_imgLoad img {
        width: 100%;
        border-radius: 6px;
    }

    .gd_imgYi {
        display: inline-block;
        width: 44%;
        margin-left: 4%;
        border-radius: 6px;
    }

    .gd_imgYi img {
        box-shadow: 5px 5px 5px #555;
        border-radius: 6px;
    }

    .gd_imgYi p {
        font-size: .6rem;
        text-align: center;
    }
</style>
<style lang="less" scoped>
    .gd_dist .ecard-nav {
        margin-left: 0 !important;
    }

    .area.areaswiper-box {
        position: relative;
        left: 0;
    }

    .full-img {
        width: 100%;
    }
</style>
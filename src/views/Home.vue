<template>
    <div class="gd_home">
        <div style="margin:0 auto;width:100%;">
            <swiper :aspect-ratio="355/750" auto dots-class="custom-bottom" dots-position="right">
                <swiper-item class="swiper-demo-img" v-for="(item, index) in bannerList" :key="index">
                    <img :src="item.img_url" @click="go(item)" class="full_img" alt="">
                </swiper-item>
            </swiper>
        </div>
        <div class="split-line"></div>
        <div class="activity-type activity-type-1">
            <div class="activity-type-title">精彩卡片</div>
            <div class="activity-type-content">
                <flexbox>
                    <flexbox>
                        <div>
                            <flexbox>
                                <img src="../assets/8cf27905f1eaa40f48709d672f68489.png" alt="">
                            </flexbox>
                        </div>
                        <div>
                            <div class="title">申请信用卡</div>
                            <div class="depict">立即返现礼&nbsp;></div>
                        </div>
                    </flexbox>
                    <div style="height: 16.5vw;width: 1px;background-color: #f3f5f7;"></div>
                    <flexbox>
                        <div>
                            <flexbox>
                                <img src="../assets/8cf27905f1eaa40f48709d672f68489.png" alt="">
                            </flexbox>
                        </div>
                        <div>
                            <div class="title">推荐办卡</div>
                            <div class="depict">新客户专属活动&nbsp;></div>
                        </div>
                    </flexbox>
                </flexbox>
            </div>
        </div>
        <div class="split-line"></div>
        <div class="activity-type activity-type-2">
            <div class="activity-type-title">活动专区</div>
            <flexbox :gutter="0" justify="space-between" wrap="wrap">
                <flexbox-item :span="0.97/2" v-for="item in activity17.activity_list" :key="item.id">
                    <img :src="item.img_url" alt="" style="width: 100%;border-radius: 1vw;">
                </flexbox-item>
            </flexbox>
        </div>
        <div class="split-line"></div>
        <div class="activity-type activity-type-2">
            <div class="activity-type-title">限时秒杀</div>
            <flexbox :gutter="0" justify="space-between" wrap="wrap">
                <flexbox-item :span="0.97/2" v-for="item in activity17.activity_list" :key="item.id">
                    <img :src="item.img_url" alt="" style="width: 100%;border-radius: 1vw;">
                </flexbox-item>
            </flexbox>
        </div>
        <div class="split-line"></div>
        <div class="activity-type activity-type-2">
            <div class="activity-type-title">假日专场</div>
            <flexbox :gutter="0" justify="space-between" wrap="wrap">
                <flexbox-item :span="0.97/2" v-for="item in activity17.activity_list" :key="item.id">
                    <img :src="item.img_url" alt="" style="width: 100%;border-radius: 1vw;">
                </flexbox-item>
            </flexbox>
        </div>
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
            getBannerList() {
                this.$http.get("/api/gdekhback/Redpacket/gdicardView", {
                    params: {
                        pid: this.pid
                    }
                }).then((res) => {
                    if (res.data.status === 1) {
                        this.bannerList = (res.data.data[9] || {})["activity_list"] || [];
                        this.activity17 = res.data.data[17] || {};
                    }
                });
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

<style lang="less" scoped>
    .gd_home {
        background-color: #ffffff;
    }

    .split-line {
        height: 1.6vw;
        background-color: #f3f5f7;
    }

    .activity-type {
        padding: 0 4vw 2vw;

        .activity-type-title {
            margin-top: 3vw;
            margin-bottom: 3vw;

            font-size: 4.3vw;
            line-height: 6.1vw;
            font-weight: 700;
            color: #232222;
        }

        &.activity-type-1 {
            .activity-type-content {
                .title {
                    font-size: 3.7vw;
                    line-height: 6.1vw;
                    color: #232222;
                }

                .depict {
                    font-size: 3.2vw;
                    line-height: 6.1vw;
                    color: #999999;
                }

                img {
                    margin-left: 6.1vw;
                    margin-right: 1.7vw;
                    width: 10.4vw;
                    height: 6.7vw;
                }
            }
        }

        &.activity-type-2 {

        }
    }


    .gd_top div {
        display: inline-block;
        width: 45%;
    }

    .gd_top img {
        width: 25%;
        vertical-align: text-bottom;
    }

    .gd_top p {
        width: 60%;
        text-align: center;
    }

    .gd_dist {
        flex-wrap: wrap;

        margin-bottom: 7px;
        padding: 5%;
        background: #ffffff;
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

    @keyframes slideIn {
        from {
            transform: translateY(-50%);
        }
        to {
            transform: translateY(-50%) scale(1.2);
        }
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

    .gd_imgYi img {
        box-shadow: 5px 5px 5px #555;
        border-radius: 6px;
    }

    .gd_imgYi p {
        font-size: .6rem;
        text-align: center;
    }

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
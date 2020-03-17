<template>
    <div class="gd_home">
        <div v-if="activityListBanner.activity_list && activityListBanner.activity_list.length>0">
            <l-swiper3 :list="activityListBanner.activity_list" @item-click="go"></l-swiper3>
        </div>
        <div class="activity-type activity-type-1"
             v-if="activityListJCKP.activity_list && activityListJCKP.activity_list.length>0">
            <div class="activity-type-title">{{activityListJCKP.c_name}}</div>
            <flexbox class="activity-type-content">
                <flexbox class="item" v-for="item in activityListJCKP.activity_list" :key="item.id"
                         @click="go(item)">
                    <div>
                        <flexbox>
                            <img :src="item.img_url" alt="">
                        </flexbox>
                    </div>
                    <div>
                        <div class="title">{{item.title}}</div>
                        <div class="depict">{{item.brief}}</div>
                    </div>
                </flexbox>
            </flexbox>
        </div>
        <div class="activity-type activity-type-2"
             v-if="activityListHDZQ.activity_list && activityListHDZQ.activity_list.length>0">
            <div class="activity-type-title">{{activityListHDZQ.c_name}}</div>
            <flexbox :gutter="0" justify="space-between" wrap="wrap">
                <flexbox-item :span="0.97/2" v-for="item in activityListHDZQ.activity_list" :key="item.id"
                              @click="go(item)">
                    <img :src="item.img_url" alt="" style="width: 100%;border-radius: 1vw;">
                </flexbox-item>
            </flexbox>
        </div>
        <div class="activity-type activity-type-3"
             v-if="activityListXHMS.activity_list && activityListXHMS.activity_list.length>0">
            <div class="activity-type-title">{{activityListXHMS.c_name}}</div>
            <l-swiper1 :list="activityListXHMS.activity_list" @item-click="go"></l-swiper1>
        </div>
        <div class="activity-type activity-type-4"
             v-if="activityListJRZC.activity_list && activityListJRZC.activity_list.length>0">
            <div class="activity-type-title">
                {{activityListJRZC.c_name.split("|")[0]}}
                <span class="time" v-if="activityListJRZC.c_name.split('|')[1]">{{activityListJRZC.c_name.split("|")[1]}}</span>
            </div>
            <flexbox :gutter="0" justify="space-between" wrap="wrap">
                <flexbox-item :span="0.97/2" v-for="item in activityListJRZC.activity_list" :key="item.id"
                              @click="go(item)">
                    <img :src="item.img_url" alt="" style="width: 100%;border-radius: 1vw;vertical-align: top;">
                    <div class="title">
                        {{item.title}}
                    </div>
                </flexbox-item>
            </flexbox>
        </div>
        <div class="activity-type activity-type-2 jckp"
             v-if="activityListJNCXHD.activity_list && activityListJNCXHD.activity_list.length>0">
            <div class="activity-type-title">{{activityListJNCXHD.c_name}}</div>
            <flexbox :gutter="0" justify="space-between" wrap="wrap">
                <flexbox-item :span="0.97/2" v-for="item in activityListJNCXHD.activity_list" :key="item.id">
                    <img :src="item.img_url" alt="" style="width: 100%;border-radius: 1vw;" @click="go(item)">
                </flexbox-item>
            </flexbox>
        </div>
        <div class="activity-type activity-type-2"
             v-if="activityListWLBK.activity_list && activityListWLBK.activity_list.length>0">
            <div class="activity-type-title">{{activityListWLBK.c_name}}</div>
            <flexbox :gutter="0" justify="space-between" wrap="wrap">
                <flexbox-item :span="0.97/2" v-for="item in activityListWLBK.activity_list" :key="item.id">
                    <img :src="item.img_url" alt="" style="width: 100%;border-radius: 1vw;" @click="go(item)">
                </flexbox-item>
            </flexbox>
        </div>
        <div class="activity-type activity-type-2"
             v-if="activityList109.activity_list && activityList109.activity_list.length>0">
            <div class="activity-type-title">{{activityList109.c_name}}</div>
            <flexbox :gutter="0" justify="space-between" wrap="wrap">
                <flexbox-item :span="0.97/2" v-for="item in activityList109.activity_list" :key="item.id">
                    <img :src="item.img_url" alt="" style="width: 100%;border-radius: 1vw;" @click="go(item)">
                </flexbox-item>
            </flexbox>
        </div>
        <div class="activity-type activity-type-2"
             v-if="activityList110.activity_list && activityList110.activity_list.length>0">
            <div class="activity-type-title">{{activityList110.c_name}}</div>
            <flexbox :gutter="0" justify="space-between" wrap="wrap">
                <flexbox-item :span="0.97/2" v-for="item in activityList110.activity_list" :key="item.id">
                    <img :src="item.img_url" alt="" style="width: 100%;border-radius: 1vw;" @click="go(item)">
                </flexbox-item>
            </flexbox>
        </div>
        <div class="activity-type activity-type-2"
             v-if="activityList111.activity_list && activityList111.activity_list.length>0">
            <div class="activity-type-title">{{activityList111.c_name}}</div>
            <flexbox :gutter="0" justify="space-between" wrap="wrap">
                <flexbox-item :span="0.97/2" v-for="item in activityList111.activity_list" :key="item.id">
                    <img :src="item.img_url" alt="" style="width: 100%;border-radius: 1vw;" @click="go(item)">
                </flexbox-item>
            </flexbox>
        </div>
        <div class="activity-type activity-type-2"
             v-if="activityList112.activity_list && activityList112.activity_list.length>0">
            <div class="activity-type-title">{{activityList112.c_name}}</div>
            <flexbox :gutter="0" justify="space-between" wrap="wrap">
                <flexbox-item :span="0.97/2" v-for="item in activityList112.activity_list" :key="item.id">
                    <img :src="item.img_url" alt="" style="width: 100%;border-radius: 1vw;" @click="go(item)">
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
    import LSwiper1 from "../components/LSwiper1";
    import LSwiper3 from "../components/LSwiper3";
    //TODO 限时秒杀
    export default {
        components: {
            LSwiper3,
            LSwiper1,
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
                pid: sessionStorage.getItem('pid'),
                activityListBanner: {},
                activityListJCKP: {},
                activityListHDZQ: {},
                activityListXHMS: {},
                activityListJRZC: {},
                activityListJNCXHD: {},
                activityListWLBK: {},
                activityList109: {},
                activityList110: {},
                activityList111: {},
                activityList112: {},
                getDataUrl: '/api/gdekhback/phone/activity_list',
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
                        this.activityListBanner = res.data.data[93] || {};
                        // this.activityListJCKP = res.data.data[89] || {};
                        // this.activityListHDZQ = res.data.data[90] || {};
                        // this.activityListXHMS = res.data.data[91] || {};
                        // this.activityListJRZC = res.data.data[92] || {};
                        this.activityListJNCXHD = res.data.data[107] || {};
                        this.activityListWLBK = res.data.data[108] || {};
                        this.activityList109 = res.data.data[109] || {};
                        this.activityList110 = res.data.data[110] || {};
                        this.activityList111 = res.data.data[111] || {};
                        this.activityList112 = res.data.data[112] || {};
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
                } else {
                    console.log(item);
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    .gd_home {
        background-color: #ffffff;
    }

    .activity-type {
        border-bottom: #f3f5f7 solid 1.6vw;
        padding: 0 4vw 2vw;

        .activity-type-title {
            padding: 3vw 0;

            font-size: 4.3vw;
            line-height: 6.1vw;
            font-weight: 700;
            color: #232222;
        }

        &.activity-type-1 {
            .activity-type-content {
                .item {
                    padding: 2vw 0;
                    border-right: 1px solid #f3f5f7;
                }

                .item:last-child {
                    border-right: 0;
                }

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
                }
            }
        }

        &.activity-type-4 {
            .title {
                margin-top: 2vw;
                font-size: 3.2vw;
                line-height: 1;
                color: #222222;
                text-align: center;
            }

            .time {
                margin-left: 1vw;
                padding: 0 1vw;
                border-radius: 0.7vw;
                border: solid 1px #f8434d;
                line-height: 4.3vw;
                font-size: 2.4vw;
                color: #f8434d;
            }
        }
    }

    .activity-type {
        /deep/ .vux-flexbox-item:last-child.vux-flexbox-item:nth-child(odd) {
            flex: 0 0 100% !important;
        }
    }

    .jckp {
        /deep/ .vux-flexbox .vux-flexbox-item:first-child {
            flex: 0 0 100% !important;
        }

        /deep/ .vux-flexbox-item:last-child.vux-flexbox-item:nth-child(odd) {
            flex: 0 0 48.5% !important;
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

    .gd_dist .flex-demo {
        background: #ffffff;
        text-align: center;
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

<template>
    <div class="gd_home">
        <div style="margin:0 auto;width:100%;">
            <swiper :aspect-ratio="355/750" auto dots-class="custom-bottom" dots-position="right">
                <swiper-item class="swiper-demo-img" v-for="(item, index) in bannerList" :key="index">
                    <img :src="item.img_url" @click="go(item)" class="full_img" alt="">
                </swiper-item>
            </swiper>
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

<style lang="less" scoped>
    body {
        background: #f5f4f4 !important;
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
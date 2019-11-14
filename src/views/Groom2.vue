<template>
    <div>
        <div class="yn_list" v-for="vm in dataInfo" :key="vm.id">
            <img :src="vm.img_url" width="100%" @click="goItem(vm)">
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
                getDataUrl: '/api/gdekhback/special/goods_list'
            }
        },
        mounted() {
            this.getDataList();
        },
        methods: {
            getDataList() {
                this.$vux.loading.show({
                    text: '加载中...'
                });
                this.$http.get("/api/gdekhback/Redpacket/getClassActivity", {
                    params: {
                        pid: this.pid,
                        cid: this.$route.query.id
                    }
                }).then((res) => {
                    if (res.data.status === 1) {
                        this.dataInfo = res.data.data;
                        this.$vux.loading.hide();
                    }
                });
            },
            goItem(item) {
                if (item.url != null && item.url !== "") {
                    if (/^(\/\/|http)/g.test(item.url)) {
                        window.location.href = item.url;
                    } else if (/#/g.test(item.url)) {
                        window.location.href = item.url;
                    } else {
                        this.$router.push(item.url);
                    }
                } else {
                    this.$router.push({
                        path: "/depictDetails",
                        query: {
                            id: item.id
                        }
                    });
                }
            }
        }
    }
</script>

<style scoped lang="less">
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
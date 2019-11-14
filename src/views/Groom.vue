<template>
    <div>
        <box gap="0px 10px">
            <group class="groom_2" v-for="(vm, index) in dataList" :key="index">
                <cell is-link @click.native="goItem(vm)">
                    <p slot="title" style="font-weight: bold">{{vm.title.split('|')[0]}}</p>
                    <div slot="inline-desc" style="max-width:100%;">
                        {{vm.title.split('|')[1]}}
                    </div>
                    <img style="width: 100px;vertical-align:middle;margin-right: 20px" slot="icon" :src="vm.img_url">
                </cell>
                <cell @click.native="goItem(vm)">
                    <p slot style="margin-left:10px;text-align: justify;font-size: 0.8rem;">{{vm.brief}}</p>
                    <img style="width: 20px" slot="icon" src="../assets/img/boc_logo.png">
                </cell>
            </group>
        </box>
    </div>
</template>

<script>
    import {Group, Cell, Box} from 'vux'

    export default {
        components: {
            Group,
            Cell,
            Box
        },
        data() {
            return {
                dataUrl: '/api/gdekhback/phone/activity_list',
                pid: sessionStorage.getItem('pid'),
                dataList: [],
            }
        },
        mounted() {
            this.getDataList()
        },
        methods: {
            getDataList() {
                this.$http.get("/api/gdekhback/Redpacket/getClassActivity", {
                    params: {
                        pid: this.pid,
                        cid: 29
                    }
                }).then((res) => {
                    if (res.data.status === 1) {
                        this.dataList = res.data.data;
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
    .groom_2 {
        /deep/ .vux-no-group-title {
            border-radius: 15px;
        }
    }

    .shop-fit {
        width: 100%;
    }
</style>

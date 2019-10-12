<template>
    <div>
        <group :gutter="0">
            <cell v-for="vm in dataList" :key="vm.id">
                <p slot="title">{{vm.name}}</p>
                <p slot="inline-desc">{{vm.address}}</p>
                <div class="iconfont depth_tel"><a style="color:#666;font-size: 24px"
                                                   :href="'tel:' + vm.tel">&#xe627;</a></div>
            </cell>
        </group>
    </div>
</template>
<script>
    import {XTable, Group, Cell} from 'vux'

    export default {
        components: {XTable, Group, Cell},
        data() {
            return {
                getDataUrl: '/api/gdekhback/special/shop_list',
                dataList: [],
                id: '',
                lat: '',
                lng: '',
                distance: ''
            }
        },
        mounted() {
            this.id = this.$route.query.id
            this.getData()
        },
        methods: {
            getData() {
                let id = this.$route.query.id
                this.$vux.loading.show({
                    text: '加载中...'
                })
                this.$http.get(this.getDataUrl, {params: {id: id}})
                    .then((res) => {
                        if (res.data.status === 0) {
                            this.dataList = res.data.info
                            this.$vux.loading.hide()
                        }
                    })
            }
        }
    }
</script>
<style>
    .depth_tel {
        display: block;
        padding-left: 5px;
        margin-left: 20%;
        border-left: 1px solid;
    }
</style>

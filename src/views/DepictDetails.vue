<template>
    <div class="gd_content" v-html="content"></div>
</template>

<script type="text/babel">
    import {XButton, Box, Masker} from 'vux'

    export default {
        components: {
            XButton,
            Box,
            Masker
        },
        data() {
            return {
                content: '',
                title: '',
                brief: '',
                url: '',
                data: [],
                getDataUrl: '/api/gdekhback/phone/activity_detail.html'
            }
        },
        mounted() {
            this.goDetails();
        },
        methods: {
            goDetails() {
                this.$http.post(this.getDataUrl, {
                    id: this.$route.query.id
                }).then((res) => {
                    this.content = res.data.info.content;
                    this.url = res.data.info.url;
                    this.data = res.data.info;
                    this.title = res.data.info.title.split('|')[0];
                    this.brief = res.data.info.title.split('|')[1];
                })
            }
        }
    }
</script>

<style scoped lang="less">
    .gd_content {
        /deep/ p {
            margin: 5px 15px;
        }

        /deep/ img {
            width: 100%;
        }
    }
</style>

<template>
    <div style="background: #fff">
        <div style="border-radius: 2px;position: relative;">
            <img :src="data.img_url" style="width: 100%;">
            <div class="m-title-content">
                <div class="m-title">
                    {{title}}
                    <br/>
                    <span class="m-time">{{brief}}</span>
                </div>
            </div>
        </div>
        <div class="gd_content" v-html="content"></div>
    </div>
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

    .m-title-content {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgba(0, 0, 0, 0.5);

        .m-title {
            color: #fff;
            text-shadow: 0 0 2px rgba(0, 0, 0, .5);
            font-weight: 500;
            font-size: 16px;
            position: absolute;
            left: 0;
            right: 0;
            width: 100%;
            text-align: center;
            top: 50%;
            transform: translateY(-50%);

            .m-time {
                font-size: 12px;
                padding-top: 4px;
                border-top: 1px solid #f0f0f0;
                display: inline-block;
                margin-top: 5px;
            }
        }
    }
</style>

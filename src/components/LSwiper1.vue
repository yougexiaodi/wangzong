<template>
    <div>
        <div class="swiper-container swiper-1" ref="swiper">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="item in list" :key="item.id" @click="handleClick(item)">
                    <div class="img-content">
                        <img :src="item.img_url" alt="">
                    </div>
                    <div class="title">
                        {{item.title}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import "swiper/dist/css/swiper.min.css"
    import Swiper from 'swiper';

    export default {
        name: "LSwiper1",
        components: {},
        props: {
            list: {
                type: Array,
                default: []
            }
        },
        data() {
            return {};
        },
        computed: {},
        mounted() {
            new Swiper(this.$refs.swiper, {
                slidesPerView: 4,
            })
        },
        methods: {
            handleClick(item) {
                this.$emit("item-click", item);
            }
        }
    }
</script>

<style scoped lang="less">
    .swiper-1 {
        /deep/ .swiper-slide {
            padding: 0 1.5vw;
        }
    }


    .img-content {
        border: solid 1px #dcdcdc;
        border-radius: 1vw;
        overflow: hidden;

        background-color: #ffffff;

        img {
            width: 100%;
            vertical-align: top;
            transform: scale(0.75);
            transform-origin: center center;
        }
    }

    .title {
        margin-top: 2vw;

        font-size: 3.2vw;
        line-height: 1;
        text-align: center;
        color: #222222;
    }
</style>
<template>
    <div style="padding:20px 0 30px;overflow: hidden;">
        <div class="swiper-container swiper-2" ref="swiper">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="item in list" :key="item.id" @click="handleClick(item)">
                    <div class="img-content">
                        <img :src="item.img_url" alt="">
                    </div>
                </div>
            </div>
            <div class="swiper-pagination" ref="swiper-pagination"></div>
        </div>
    </div>
</template>

<script>
    import "swiper/dist/css/swiper.min.css"
    import Swiper from 'swiper';

    export default {
        name: "LSwiper2",
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
                loop: true,
                slidesPerView: 1.2,
                autoplay: true,
                centeredSlides: true,
                pagination: {
                    el: this.$refs["swiper-pagination"],
                },
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
    .swiper-2 {
        overflow: initial;

        img {
            width: 100%;
            border-radius: 2vw;
            vertical-align: top;
        }

        /deep/ .swiper-slide.swiper-slide-prev {
            transform: scale(0.9);
        }

        /deep/ .swiper-slide.swiper-slide-active {
            /*transform: scale(1.5);*/
        }

        /deep/ .swiper-slide.swiper-slide-next {
            transform: scale(0.9);
        }

        /deep/ .swiper-pagination.swiper-pagination-bullets {
            padding: 5px;
            bottom: 0;
            transform: rotateX(180deg);
            transform-origin: bottom center;
        }

        /deep/ .swiper-pagination-bullet.swiper-pagination-bullet-active {
            background-color: #d81e06;
        }
    }

</style>
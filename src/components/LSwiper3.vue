<template>
    <div class="swiper-3">
        <div class="swiper-container" ref="swiper">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="item in list" :key="item.id">
                    <div class="img-content">
                        <img :src="item.img_url" alt="">
                    </div>
                </div>
            </div>
        </div>
        <div class="swiper-pagination" ref="swiper-pagination"></div>
    </div>
</template>

<script>
    import "swiper/dist/css/swiper.min.css"
    import Swiper from 'swiper';

    export default {
        name: "LSwiper3",
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
        mounted() {
            let _this = this;
            new Swiper(this.$refs.swiper, {
                loop: true,
                loopedSlides: 5,
                slidesPerView: 'auto',
                autoplay: {
                    delay: 3000,
                    stopOnLastSlide: false,
                    disableOnInteraction: false,
                },
                effect : 'coverflow',
                coverflowEffect: {
                    rotate: 0,
                    stretch: 0,
                    depth: 300,
                    modifier: 1,
                    slideShadows : false
                },
                centeredSlides: true,
                // initialSlide: 2,
                // watchSlidesProgress: true,
                pagination: {
                    el: this.$refs["swiper-pagination"],
                },
                on: {
                    click() {
                        let realIndex = this.realIndex;
                        _this.handleClick(_this.list[realIndex]);
                    },
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
    .swiper-3 {
        padding: 2vw 0;

        img {
            width: 100%;
            border-radius: 2vw;
            vertical-align: top;
        }

        /deep/ .swiper-slide {
            width: 90%;
        }

        /deep/ .swiper-pagination-bullet.swiper-pagination-bullet-active {
            background-color: #d81e06;
        }

        /deep/ .swiper-pagination {
            position: relative;
            padding-top: 2vw;
        }

        /deep/ .swiper-pagination-bullet {
            margin: 0 4px;
        }
    }

</style>
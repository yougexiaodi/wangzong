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
                centeredSlides: true,
                initialSlide: 2,
                watchSlidesProgress: true,
                pagination: {
                    el: this.$refs["swiper-pagination"],
                },
                on: {
                    click() {
                        let realIndex = this.realIndex;
                        _this.handleClick(_this.list[realIndex]);
                    },
                    progress() {
                        for (let i = 0; i < this.slides.length; i++) {
                            let slide = this.slides.eq(i);
                            let slideProgress = this.slides[i].progress;
                            let modify = "";
                            if (Math.abs(slideProgress) > 1) {
                                modify = (Math.abs(slideProgress) - 1) * 0.4 + 1;
                            }
                            let translate = slideProgress * modify * 318 + 'px';
                            let scale = 1 - Math.abs(slideProgress) / 5;
                            let zIndex = 999 - Math.abs(Math.round(10 * slideProgress));
                            slide.transform('translateX(' + translate + ') scale(' + scale + ')');
                            slide.css('zIndex', zIndex);
                            slide.css('opacity', 1);
                            if (Math.abs(slideProgress) > 3) {
                                slide.css('opacity', 0);
                            }
                        }
                    },
                    setTransition: function (transition) {
                        for (let i = 0; i < this.slides.length; i++) {
                            let slide = this.slides.eq(i);
                            slide.transition(transition);
                        }
                    }
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
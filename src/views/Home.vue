<template>
  <div class="gd_home">
    <div class="gd_top">
      <div class="gd_top_1">
        <a style="color:#ffffff"
           href="https://apply.mcard.boc.cn/apply/mobile/index?appid=wx567af860fd4db040&bankCode=0010">
          <img src="../assets/icon/card1.png">
          <p class="gd_top_title">申请信用卡
            <span class="gd_top_desc">立即返现礼</span>
          </p>
        </a>
      </div>
      <div class="gd_top_2">
        <a style="color:#ffffff" href="https://apply.mcard.boc.cn/apply/mobile/recommendCard/activityIndex">
          <img src="../assets/icon/card2.png">
          <p class="gd_top_title">推荐办卡
            <span class="gd_top_desc">新客户专属活动</span>
          </p>
        </a>
      </div>
    </div>
    <!-- box-shadow:2px 0 2px #a3a2a2,-2px 0 2px #a3a2a2; -->
    <div style="margin:0 auto;width:100%;">
        <!-- :aspect-ratio="355/750" -->
      <swiper  :aspect-ratio="355/750" auto dots-class="custom-bottom" dots-position="right" >
        <swiper-item class="swiper-demo-img" v-for="(item, index) in bannerList" :key="index">
          <!-- style="box-shadow:inset 5px 5px 5px #f0f0f0;" -->
          <!-- <a :href="item.url" v-if="item.id !== '51'">
            <img :src="item.img">
          </a> -->
          <img :src="item.img" @click="goBanner(item)" class="full_img">
        </swiper-item>
      </swiper>
    </div>

    <group :gutter="0" class="gd_dist">
      <flexbox>
        <flexbox-item :span="1/4" class="ecard-nav">
          <a
            href="https://mcard.boc.cn/ebank/h5page/index.do?pageId=85d69c5ada8c475cab08c59bb89e6a77">
            <div class="ecard-font">
              <!-- <span style="visibility:hidden;">&#xe625;</span> -->
              <img src="~@/assets/img/reka.png" alt="" class="full_img">
            </div>
            <div class="flex-demo">热卡推荐</div>
          </a>
        </flexbox-item>
        <flexbox-item :span="1/4" class="ecard-nav">
          <a href="javascript:;" @click="showTips('活动即将上线，敬请期待')">
            <div class="ecard-font">
              <!-- <span style="visibility:hidden;">&#xe61f;</span> -->
              <img src="~@/assets/img/jiayou.png" alt="" class="full_img">
            </div>
            <div class="flex-demo">加油优惠</div>
          </a>
        </flexbox-item>
        <flexbox-item :span="1/4" class="ecard-nav">
          <a href="https://gdecard.jiahuaming.com/details?id=450">
            <div class="ecard-font">
              <img src="~@/assets/img/fenqi.png" alt="" class="full_img">
            </div>
            <div class="flex-demo">分期活动</div>
          </a>
        </flexbox-item>
        <flexbox-item :span="1/4" class="ecard-nav">
          <a
            href="http://gdecard.jiahuaming.com/boc/guizhouekh/#/pay">
            <div class="ecard-font">
              <img src="~@/assets/img/shangquan.png" alt="" class="full_img">
            </div>
            <div class="flex-demo">优惠商圈</div>
          </a>
        </flexbox-item>
      </flexbox>
    </group>
    <group :gutter="0">
      <group-title class="home_title">
        <span class="ecard-font" style="color:#3b3b3b;margin-right:.5rem">—</span>
        惠聚中行日
        <span class="ecard-font" style="color:#3b3b3b;margin-left:.5rem">—</span>
      </group-title>
      <!-- <div class="week_list" v-for="(vm, index) in holidayList" :key="index">
        <a :href="vm.url">
          <img :src="vm.img" alt="" class="full_img">
          <div class="list_icon">
          </div>
        </a>
      </div> -->
      <div class="swiper-container" style="margin: 0 auto 10px;">
        <tab :scroll-threshold='5' bar-active-color="#c81e0d" active-color="#666666" v-model="getDay">
          <!-- <tab-item :selected="getDay === 0" @on-item-click="tabDay">周一</tab-item>
          <tab-item :selected="getDay === 1" @on-item-click="tabDay">周二</tab-item>
          <tab-item :selected="getDay === 2" @on-item-click="tabDay">周三</tab-item> -->
          <tab-item :selected="getDay === 0" @on-item-click="tabDay">美食</tab-item>
          <tab-item :selected="getDay === 1" @on-item-click="tabDay">生鲜</tab-item>
          <tab-item :selected="getDay === 2" @on-item-click="tabDay">亲子</tab-item>
          <tab-item :selected="getDay === 3" @on-item-click="tabDay">休闲</tab-item>
          <tab-item :selected="getDay === 4" @on-item-click="tabDay">购物</tab-item>
        </tab>
        <div class="swiper-wrapper" style="margin: 20px 0 25px;">
          <!-- <div class="swiper-slide">
            <router-link :to="{path: 'new_groom2', query: {type: '6'}}">
              <img class="full_img" src="../assets/list/1.png" alt="">
            </router-link>
          </div>
          <div class="swiper-slide">
            <router-link :to="{path: 'new_groom2', query: {type: '7'}}">
              <img class="full_img" src="../assets/list/2.png" alt="">
            </router-link>
          </div>
          <div class="swiper-slide">
            <router-link :to="{path: 'new_groom2', query: {type: '8'}}">
              <img class="full_img" src="../assets/list/3.png" alt="">
            </router-link>
          </div> -->
          <div class="swiper-slide">
            <a href="http://gdecard.jiahuaming.com/boc/guizhouekh/#/pay">
              <img class="full_img" src="~@/assets/img/meishi.png" alt="">
            </a>
          </div>
          <div class="swiper-slide">
            <a href="javascript::" @click="showTips('活动即将上线，敬请期待')">
              <img class="full_img" src="~@/assets/img/shengxian.png" alt="">
            </a>
          </div>
          <div class="swiper-slide">
            <a href="javascript::" @click="showTips('活动即将上线，敬请期待')">
              <img class="full_img" src="~@/assets/img/qinzi.png" alt="">
            </a>
          </div>
          <div class="swiper-slide">
            <a href="javascript::" @click="showTips('活动即将上线，敬请期待')">
              <img class="full_img" src="~@/assets/img/xiuxian.png" alt="">
            </a>
          </div>
          <div class="swiper-slide">
            <a href="http://gdecard.jiahuaming.com/boc/guizhouekh/#/pay">
              <img class="full_img" src="~@/assets/img/gouwu.png" alt="">
            </a>
          </div>
        </div>
        <div class="swiper-pagination" style="bottom:0;"></div>
      </div>
			<!-- end swiper -->
    </group>
     <group :gutter="5">
      <group-title class="home_title">
        <span class="ecard-font" style="color:#3b3b3b;margin-right:.5rem">—</span>
        惠商圈
        <span class="ecard-font" style="color:#3b3b3b;margin-left:.5rem">—</span>
      </group-title>
      <div class="areaswiper-box area" style="margin: 0 auto 10px;">
        <div class="swiper-wrapper" style="margin: 20px 0 25px;">
          <div class="swiper-slide" v-for="(item,index) in areaList" :key="index">
            <!-- <router-link :to="item.url"> -->
            <a :href="item.url">
              <img :src="item.img" class="full-img" alt="">
            </a>
            <!-- </router-link> -->
            <p class="wrap-text">{{item.title}}</p>
          </div>
        </div>
      </div>      
    </group>
    <group :gutter="5">
      <group-title class="home_title">
        <span class="ecard-font" style="color:#3b3b3b;margin-right:.5rem">—</span>
        境外消费
        <span class="ecard-font" style="color:#3b3b3b;margin-left:.5rem">—</span>
      </group-title>
      <div class="gd_imgWrap">
        <div class="gd_imgLoad" v-for="(src,index) in couponList" :key="index">
          <a :href="src.url">
            <img :src="src.img" class="full_img" alt="">
          </a>
        </div>
      </div>
    </group>
    <group :gutter="5">
      <group-title class="home_title">
        <span class="ecard-font" style="color:#3b3b3b;margin-right:.5rem">—</span>
        分期
        <span class="ecard-font" style="color:#3b3b3b;margin-left:.5rem">—</span>
      </group-title>
      <div style="margin:0 auto;width:98%;">
        <a class="" href="https://pro.m.jd.com/mall/active/Xo9vmTfvoqA2ApTCjn57KtJV7zt/index.html?from=timeline&isappinstalled=0">
          <img src="@/assets/img/fenqi.jpg" class="full_img" alt="">
        </a>
      </div>
      <!-- <cell>
        <span slot="icon" class="ecard-font" style="color:#fd6c70;">&#xe75a;</span>
        <span class="gd_cell_title">— 分期 —</span>
      </cell> -->
      <!-- <div class="gd_imgWrap">
        <div class="gd_imgLoad" v-for="(item, index) in fenList" :key="index">
          <a :href="item.url">
            <img :src="item.img" class="full_img" alt="" style="border-radius: 10px;">
          </a>
        </div>
      </div> -->
      <!-- <swiper auto :aspect-ratio="375/750" :show-dots="false">
        <swiper-item class="swiper-demo-img" v-for="(item, index) in fenList" :key="index">
          <a :href="item.url">
            <img :src="item.img">
          </a>
        </swiper-item>
      </swiper> -->
    </group>
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

  import WeekSwiper from 'swiper'
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
    data () {
      return {
        getDataUrl: '/api/gdekhback/phone/activity_list',
        descColor: [],
        bannerList: [
            {
                img: require('@/assets/img/area_b.png')
            }
        ],
        activityList: [],
        couponList: [],
        fenList: [],
        yiList: [],
        holidayList: [],
        areaList: [
          {
            url:'http://gdecard.jiahuaming.com/boc/guizhouekh/#/pay',
            title:'逸天城活动',
            img:require('@/assets/img/area.png')
          }
        ],
        showPass: true,
        oWidth: document.body.clientWidth * 0.8,
        // getDay: (new Date().getDay() + 6) % 7,
        getDay: 0,
        pid: sessionStorage.getItem('pid')
        // atFten: false,
        // atDouble: false
      }
    },
    created () {
      // this.getBannerList()
      this.setSwiper()
    },
    mounted: function () {
      // this.getFten()
      this.getBannerList()
      // this.setSwiper()
      // this.getDay = new Date().getDate()
    },
    methods: {
      showTips(message){
          this.$vux.toast.show({
            text: message,
            type: 'warn',
            width: '10em'
          })
      },
      setSwiper () {
        let self = this
        // let oIndex = (new Date().getDay() - 1 + 7) % 7
        let oIndex = this.getDay
        var mySwiper = new WeekSwiper('.swiper-container', {
          // autoplay: true,
          loop: true,
          slidesPerView: 3,
          spaceBetween: 20,
          centeredSlides: true,
          // progress: oIndex,
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          },
          on: {
            slideChange: function () {
              if (mySwiper) {
                self.getDay = mySwiper.realIndex
              }
            }
          }
        })
        // if (mySwiper) { mySwiper.slideToLoop(oIndex) }
        // var areaSwiper = new WeekSwiper('.areaswiper-box', {
        //   loop: true,
        //   // centeredSlides: true,
        //   width: self.oWidth,
        //   spaceBetween: 20,
        //   // autoplay: true,
        //   observer: true,
        //   observeParents: true,
        //   onSlideChangeEnd: function (swiper) {
        //     swiper.update()
        //     // areaSwiper.startAutoplay()
        //     swiper.reLoop()
        //   }
        // })
        // if (areaSwiper) { areaSwiper.update() }
        // this.getDay = oIndex
        // console.log(oIndex)
        // console.log(this.getDay)
        // mySwiper.allowClick = true
      },
      TipsShow () {
        this.$vux.confirm.show({
          title: '',
          content: '请在中国银行广东分行微信端中银e卡惠平台参与此活动',
          showCancelButton: false,
          confirmText: '关闭'
        })
      },
      goBanner (item) {
        if (['51', '26', '36'].includes(item.id)) {
          this.TipsShow()
        } else {
        //   window.location.href = item.url
         this.$router.push({path:'/pay'})
        }
      },
      tabDay (index) {
        var mySwiper = document.querySelector('.swiper-container').swiper
        // // console.log(`${this.getDay} and ${index}`)
        // // console.log(index)
        mySwiper.slideToLoop(index)
      },
      // goIcon (item) {
      //   if (['38', '40', '50'].includes(item.id)) {
      //     this.$vux.toast.show({
      //       text: '2019年活动即将上线，敬请期待',
      //       type: 'warn',
      //       width: '10em'
      //     })
      //   } else {
      //     window.location.href = item.url
      //   }
      // },
      getBannerList () {
        this.$http.post(this.getDataUrl, {pid: this.pid})
          .then((res) => {
            // this.bannerList = res.data.info[1]
            // for (let i = 0; i < res.data.info[1].length; i++) {
            //   if (res.data.info[1][i].url === '') {
            //     this.bannerList[i].url = '/details?id=' + res.data.info[1][i].id
            //   } else {
            //     this.bannerList[i].url = res.data.info[1][i].url
            //   }
            // }
            // this.activityList = res.data.info[2]
            // for (let i = 0; i < res.data.info[2].length; i++) {
            //   if (res.data.info[2][i].url === '') {
            //     this.activityList[i].url = '/details?id=' + res.data.info[2][i].id
            //   } else {
            //     this.activityList[i].url = res.data.info[2][i].url
            //   }
            // }
            this.couponList = res.data.info[3]
            // this.fenList = res.data.info[4]
            // this.yiList = res.data.info[5]
            // for (let i = 0; i < res.data.info[5].length; i++) {
            //   if (res.data.info[5][i].url === '') {
            //     this.yiList[i].url = '/details?id=' + res.data.info[5][i].id
            //   } else {
            //     this.yiList[i].url = res.data.info[5][i].url
            //   }
            // }
            // this.holidayList = res.data.info[13]
            // // let descColor = ['#f9757c', '#7dbb3d', '#ff0c9c', '#51abfb', '#fa2442', '#9b42ff', '#f4c01e', '#f4ac77']
            // // for (let i = 0; i < descColor.length; i++) {
            // //   this.activityList[i].descColor = descColor[i]
            // // }
            // this.areaList = res.data.info[14]
            this.$nextTick(() => {
              this.setSwiper()
            })
          })
      },
      getFten () {
        // let day = new Date().getDay()
        // let time = new Date().getHours()
        // let nowDate = new Date().getDate()
        // if (day === 5 && time >= 10) {
        //   this.atFten = true
        // }
        // if (nowDate > 9 && nowDate < 13) {
        //   this.atDouble = true
        // }
      }
    }
  }
</script>
<style>
  .areaswiper-box {
    position: relative;
    left: 20px;
  }
  .wrap-text {
    position: absolute;
    width: 100%;
    left: 0;
    bottom: 6px;
    background: rgba(59,59,59,0.8);
    color: #ffffff;
    text-align: center;
    padding: 4px 0;
    border-radius: 0 0 12px 12px;
  }
 .swiper-container .swiper-slide {
    transform: scale(0.9) !important;
  }
  .swiper-container .swiper-slide-active {
    transform: scale(1.3) !important;
    margin-right: 10px !important;
     /*transform: translateX(-5px);*/
  }
  .swiper-container .swiper-slide-prev,.swiper-container .swiper-slide-next {
    margin-right: 10px !important;
     transform: scale(1.1) !important;
  }
  .swiper-container .swiper-slide-prev {
    transform: translateX(-8px) scale(1) !important;
     /*transform: translateX(-5px) scale(1.1);*/
  }
  .swiper-container .swiper-slide-next {
    transform: translateX(8px) scale(1) !important;
     /*transform: translateX(5px) scale(1.1); */
  }
  
  body {
    background: #f5f4f4 !important;
  }

  .suspension {
    position: fixed;
    right: 0;
    top: 60%;
    width: 20%;
    z-index: 9;
  }

  .p-top-img {
    display: block;
    padding-bottom: 10px;
  }

  .hzms_img {
    display: block;
    margin: 0 auto;
    width: 80%;
  }

  .gd_top {
    margin-bottom: -15%;
    padding: 5% 5% 20%;
    background: linear-gradient(to right,#fd5730,#f92b3f);
    color: #ffffff;
    text-align: center;
    /* border-radius: 6px; */
  }

  .gd_top div {
    display: inline-block;
    width: 45%;
  }

  .gd_top .gd_top_1 {
    /* border-right: 1px solid #ededed; */
  }

  .gd_top img {
    width: 25%;
    vertical-align: text-bottom;
  }

  .gd_top p {
    width: 60%;
    text-align: center;
  }

  .gd_top_title {
    display: inline-block;
    font-size: 1rem;
  }

  .gd_top_desc {
    /* color: #adadad; */
    font-size: .6rem;
    display: inline-block;
  }

  .gd_dist {
    margin-bottom: 7px;
    padding: 5%;
    background: #ffffff;
  }

  .gd_dist .weui-cells {
    color: #ffffff !important;
  }
  .gd_dist .weui-cells::after {
    border: none;
  }

  .gd_dist .weui-cells:before {
    border-top: none !important;
  }

  .ecard-nav {
    background-color: #f5797c !important;
  }

  .gd_dist .ecard-nav {
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

  /* .gd_dist .ecard-font {
    color: #ffffff !important;
  } */

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

  .week_list {
    margin: 0 auto;
    position: relative;
    width: 92%;
  }

  .list_icon {
    position: absolute;
    right: 5%;
    top: 50%;
    transform: translateY(-50%);
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    overflow: hidden;
    /* background: url('../assets/list/icon.png') no-repeat center/100%; */
    animation: slideIn 1s ease-in infinite alternate;
  }
  @keyframes slideIn {
    from {
      transform: translateY(-50%);
    }
    to {
      transform: translateY(-50%) scale(1.2);
    }
  }

  .gd_grids {
    padding: 5px 10px !important;
  }

  .gd_grids:before, .gd_grids:after {
    border-top: none !important;
    border-right: none !important;
    border-bottom: none !important;
    border-left: none !important;
  }

  .gd_grids .gd_grid:before, .gd_grids .gd_grid:after {
    border-top: none !important;
    border-right: none !important;
    border-bottom: none !important;
    border-left: none !important;
  }

  .gd_grid {
    padding: 5px 0 !important;
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

  .gd_grids p.desc {
    font-size: .6rem;
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

  .gd_imgLoad img {
    width: 100%;
    border-radius: 6px;
  }

  .gd_imgYi {
    display: inline-block;
    width: 44%;
    margin-left: 4%;
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
</style>
<style lang="less" scoped>
.gd_dist .ecard-nav{
  margin-left: 0!important;
}
.area.areaswiper-box{
  position: relative;
  left: 0;
}
.full-img{
  width: 100%;
}
</style>

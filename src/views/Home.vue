<template>
  <div class="gd_home">
    <swiper :aspect-ratio="318 / 750" :auto="true">
      <swiper-item
        class="swiper-demo-img"
        v-for="(item, index) in activityList254.activity_list"
        :key="index"
        @click.native="go(item)"
      >
        <img style="width: 100%" :src="item.img_url" />
      </swiper-item>
    </swiper>
    <div
      class="activity_wrap"
      v-if="
        activityList255.activity_list &&
        activityList255.activity_list.length > 0
      "
    >
      <div class="c_name">{{ activityList255.c_name }}</div>
      <div
        class="item"
        v-for="item in activityList255.activity_list"
        :key="item.id"
      >
        <img :src="item.img_url" @click="go(item)" />
      </div>
    </div>
    <div
      class="activity_wrap"
      v-if="
        activityList256.activity_list &&
        activityList256.activity_list.length > 0
      "
    >
      <div class="c_name">{{ activityList256.c_name }}</div>
      <div
        class="item"
        v-for="item in activityList256.activity_list"
        :key="item.id"
      >
        <img :src="item.img_url" @click="go(item)" />
      </div>
    </div>
    <div
      class="activity_wrap"
      v-if="
        activityList257.activity_list &&
        activityList257.activity_list.length > 0
      "
    >
      <div class="c_name">{{ activityList257.c_name }}</div>
      <div
        class="item"
        v-for="item in activityList257.activity_list"
        :key="item.id"
      >
        <img :src="item.img_url" @click="go(item)" />
      </div>
    </div>
    <div
      class="activity_wrap"
      v-if="
        activityList258.activity_list &&
        activityList258.activity_list.length > 0
      "
    >
      <div class="c_name">{{ activityList258.c_name }}</div>
      <div
        class="item"
        v-for="item in activityList258.activity_list"
        :key="item.id"
      >
        <img :src="item.img_url" @click="go(item)" />
      </div>
    </div>
    <div
      class="activity_wrap"
      v-if="
        activityList259.activity_list &&
        activityList259.activity_list.length > 0
      "
    >
      <div class="c_name">{{ activityList259.c_name }}</div>
      <div class="list">
        <div
          class="item"
          v-for="item in activityList259.activity_list"
          :key="item.id"
        >
          <img :src="item.img_url" @click="go(item)" />
        </div>
      </div>
    </div>
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
  Tab,
  TabItem,
  Confirm,
} from "vux";
import LSwiper1 from "../components/LSwiper1";
import LSwiper3 from "../components/LSwiper3";
//TODO 限时秒杀
export default {
  components: {
    LSwiper3,
    LSwiper1,
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
    Confirm,
  },
  data() {
    return {
      pid: sessionStorage.getItem("pid"),
      activityList254: {},
      activityList255: {},
      activityList256: {},
      activityList257: {},
      activityList258: {},
      activityList259: {},
      getDataUrl: "/api/gdekhback/phone/activity_list",
    };
  },
  mounted: function () {
    this.getBannerList();
  },
  methods: {
    showTips(message) {
      this.$vux.toast.show({
        text: message,
        type: "warn",
        width: "10em",
      });
    },
    getBannerList() {
      this.$http
        .get("/api/gdekhback/Redpacket/gdicardView", {
          params: {
            pid: this.pid,
          },
        })
        .then((res) => {
          if (res.data.status === 1) {
            this.activityList254 = res.data.data[254] || {};
            this.activityList255 = res.data.data[255] || {};
            this.activityList256 = res.data.data[256] || {};
            this.activityList257 = res.data.data[257] || {};
            this.activityList258 = res.data.data[258] || {};
            this.activityList259 = res.data.data[259] || {};
          }
        });
    },
    go(item) {
      let url = item.url;
      if (url != null && url !== "") {
        if (/^(http:|https:)?\/\//g.test(url)) {
          // 路由外跳转
          window.location.href = url;
        } else if (/^\//g.test(url)) {
          // 路由内跳转
          this.$router.push(url);
        } else if (/^s:\/\//g.test(url)) {
          // 特殊处理
          let message = url.replace(/^s:\/\//g, "");
          this.showTips(message);
        }
      } else {
        console.log(item);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.gd_home {
  padding-bottom: 20px;
  background-color: #ffffff;

  .activity_wrap {
    padding: 0 14px;

    .c_name {
      padding: 20px 0 16px;
      line-height: 1;
      font-size: 16px;
      color: #222222;
    }

    .item {
      margin-bottom: 30px;
    }

    .item:last-child {
      margin-bottom: 0px;
    }

    img {
      width: 100%;
      border-radius: 10px;

      vertical-align: top;
      overflow: hidden;
    }

    .list {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;

      .item {
        width: 49%;
      }

      .item:first-child {
        width: 100%;
      }
    }
  }
}

.gd_top div {
  display: inline-block;
  width: 45%;
}

.gd_top img {
  width: 25%;
  vertical-align: text-bottom;
}

.gd_top p {
  width: 60%;
  text-align: center;
}

.gd_dist {
  flex-wrap: wrap;

  margin-bottom: 7px;
  padding: 5%;
  background: #ffffff;
}

.ecard-nav {
  background-color: #f5797c !important;
}

.gd_dist .ecard-nav {
  margin-bottom: 8px;

  background-color: #f5f4f4 !important;
}

.gd_dist .flex-demo {
  background: #ffffff;
  text-align: center;
}

.flex-demo {
  /* color: #4b4a4a; */
  color: #ffffff;
  font-size: 0.8rem;
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

@keyframes slideIn {
  from {
    transform: translateY(-50%);
  }
  to {
    transform: translateY(-50%) scale(1.2);
  }
}

.gd_grids img {
  display: block;
  width: 45%;
  text-align: center;
  margin: 0 auto;
}

.gd_grids p {
  font-size: 0.8rem;
  text-align: center;
  color: #000;
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

.gd_imgLoad:nth-last-child(1):first-child {
  width: 98%;
}

.gd_imgLoad img {
  width: 100%;
  border-radius: 6px;
}

.gd_imgYi img {
  box-shadow: 5px 5px 5px #555;
  border-radius: 6px;
}

.gd_imgYi p {
  font-size: 0.6rem;
  text-align: center;
}

.gd_dist .ecard-nav {
  margin-left: 0 !important;
}

.area.areaswiper-box {
  position: relative;
  left: 0;
}

.full-img {
  width: 100%;
}
</style>

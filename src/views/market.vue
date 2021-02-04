<template>
  <div class="customer-user">
    <div class="title">
      <h4>河北分行为您送上活动权益</h4>
      <p>点击即可参与活动</p>
    </div>
    <ul class="active-list">
      <li
        class="active-item"
        v-for="(item, index) in list"
        :key="index"
        @click="toActive(item)"
      >
        <div class="img-card">
          <img :src="item.share_icon" alt="" />
        </div>
        <div class="active-info">
          <h4>{{ item.name }}</h4>
          <p>{{ item.share_title }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import { isLogin } from "../utils/login";
export default {
  data() {
    return {
      listUrl: "/api/service/api/movable_info?test_tag=",
      pid: sessionStorage.getItem("pid"),
      list: [],
    };
  },
  mounted() {
    this.getLoginState();
  },
  methods: {
    toActive(item) {
      window.location.href = item.share_url;
    },
    getList() {
      this.$http.post(this.listUrl, { pid: this.pid }).then((res) => {
        if (res.data.status === 0) {
          this.list = res.data.info;
        } else {
          this.list = [];
        }
      });
    },
    getLoginState() {
      this.$vux.loading.show({ text: "加载中..." });
      isLogin(this.pid).then(
        (res) => {
          this.$vux.loading.hide();
          this.getList();
          //   this.getDataDetails();
        },
        (res) => {
          this.$router.push({
            path: "/login",
            query: {
              ...this.$route.query,
              path: this.$route.path,
            },
          });
        }
      );
    },
  },
};
</script>
<style lang="less" scoped>
.customer-user {
  padding: 16px;
}
.title {
  text-align: center;
  h4 {
    font-size: 18px;
  }
  p {
    font-size: 14px;
  }
}
.active-list {
  margin-top: 24px;
}

.active-item {
  display: flex;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 8px 4px;

  .img-card {
    width: 120px;
    min-width: 120px;
    height: 60px;
    border-radius: 8px;
  }
}

.active-info {
  margin-left: 8px;

  h4 {
    font-size: 16px;
  }

  p {
    font-size: 12px;
    margin-top: 8px;
  }
}
.img-card {
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  min-width: 120px;
  height: 60px;
  border-radius: 8px;
  img {
    object-fit: fill;
    height: 100%;
  }
}
</style>
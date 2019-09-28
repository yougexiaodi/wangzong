<template>
  <div style="background:#f1f1f1;">
    <div class="top_logo">
      <!-- <img src="../assets/img/banner.png" width="100%"> -->
      <img src="../assets/img/rules.png" width="96%">
    </div>
    <div style="margin-bottom: 20px;">
      <div class="yn_list" v-for="vm in dataInfo" :key="vm.id">
        <router-link :to="{path: '/details', query: {id: vm.id, mid: vm.mid}}">
          <img :src="vm.list_img" width="100%">
        </router-link>
      </div>
    </div>
    <!-- <router-link to="/coupon">
      <img class="icon-search" src="../assets/search.png">
    </router-link> -->
    <div>
      <img src="../assets/img/footer.png" width="100%">
    </div>
  </div>
</template>

<script>
  import {Group, Cell} from 'vux'

  export default {
    components: {
      Group,
      Cell
    },
    data() {
      return {
        pid: sessionStorage.getItem('pid'),
        id: this.$route.query.aid,
        dataInfo: [],
        showTxt: '',
        txtInfo: [
          '每人每周每商品最多可购买2张代金券',
          '每人每周最多可购买2张代金券'
        ],
        getDataUrl: '/api/gdekhback/special/goods_list'
      }
    },
    mounted() {
      this.getData()
      this.getTxt()
    },
    methods: {
      getTxt() {
        if (this.id === '40') {
          this.showTxt = this.txtInfo[0]
        } else {
          this.showTxt = this.txtInfo[1]
        }
      },
      getData() {
        this.$http.post(this.getDataUrl, {pid: this.pid, aid: this.$route.query.aid})
          .then((res) => {
            this.$vux.loading.show({
              text: '加载中...'
            })
            if (res.data.status === 0) {
              this.dataInfo = res.data.info
              this.$vux.loading.hide()
            }
          })
      }
    }
  }
</script>

<style>

  .top_logo {
    text-align: center;
  }

  .home_title {
    width: 96%;
    margin: 0 auto;
    padding: 2% 0;
  }

  .home_title h4 {
    float: left;
    width: 24%;
    padding-left: 2%;
    text-align: center;
    font-weight: bold;
    color: #605d6c;
  }

  .home_title p {
    width: 74%;
    display: inline-block;
    padding-left: 2%;
    border-left: 1px dashed #605d6c;
    color: #605d6c;
  }

  .depth_star {
    display: block;
    margin: 10px auto;
  }

  .yn_list img {
    display: block;
    width: 90%;
    margin: 10px auto;
    border-radius: 8px;
  }

  .icon-search {
    position: fixed;
    top: 50%;
    width: 20%;
    right: 0;
  }
</style>

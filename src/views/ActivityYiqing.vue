<template>
    <div class="yiqing">
        <div class="box" v-for="item in dataList.slice(0,4)" :key="item.id">
            <YQlist :item="item"></YQlist>
        </div>
    </div>
</template>
<script>
import YQlist from '../components/YQlista'
export default {
    data(){
        return {
            listUrl:'/api/gdekhback/special/get_area',
            dataList:[],
        }
    },
    mounted(){
        sessionStorage.setItem('pid', 100);
        this.$vux.loading.show({text: '加载中...'});
        this.wxshare({
            title:'共战疫情 中行5折力挺',
            desc:'中行信用卡福利送上，隔离病毒·不隔离爱，共同战疫我们能赢！',
            imgUrl: '//gdecard.jiahuaming.com/boc/hebei_lifecycle/static/img/share.jpg',
            urls:encodeURI(window.location.href),
        });
        this.getList();
    },
    methods:{
        getList(){
            this.$http.post(this.listUrl, {
                pid:  sessionStorage.getItem('pid')
            }).then((res) => {
                if (res.data.status === 0) {
                    this.dataList = res.data.info;
                    this.$vux.loading.hide();
                }
            })
        },
        wxshare(objs){//分享
            this.$http.post('/api/gdekhback/phone/get_wx_sign.html', {
                url: objs['urls'],
                wx_id: 2
            }).then(res => {
                this.wx.config({
                    debug: false, // 开启调试模式,
                    appId: res.data.info.appId, // 必填，
                    timestamp: res.data.info.timestamp, // 必填，
                    nonceStr: res.data.info.nonceStr, // 必填，
                    signature: res.data.info.signature,// 必填
                    jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage'] // 必填
                });
                this.wx.ready(() => {
                    this.wx.onMenuShareAppMessage({
                        title: objs['title'],
                        desc: objs['desc'],
                        link: objs['urls'],
                        imgUrl:'https:'+objs['imgUrl']
                    });
                    this.wx.onMenuShareTimeline({
                        title: objs['title'],
                        desc: objs['desc'],
                        link: objs['urls'],
                        imgUrl:'https:'+objs['imgUrl']
                    });
                });
            })
        },
    },
    components:{
        YQlist,
    }
}
</script>
<style scoped>
.yiqing{
    background: #a00b0d url(../assets/yiqing/bg-home.jpg) no-repeat 0 0;
    background-size: 100% 7.18rem;
    padding-top: 7.18rem;
    min-height: 100vh;
}
.box{
    padding: 0.6rem 0;
}
</style>
<template>
    <div class="l-goods-rule" @click.self="close" v-if="show">
        <div>
            <div class="content">
                <div v-html="contents"></div>
            </div>
            <div class="btn-close" @click="close">X</div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
      name: 'LGoodsRule',
      data () {
        return {
          dataInfo: {}
        }
      },
      props:['show','contents'],
      // mounted () {
      //   this.getData()
      // },
      methods: {
        close () {
          this.$emit('close')
        }
      }
    }
</script>

<style scoped lang="less">
    .l-goods-rule {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 9999;

        display: flex;
        justify-content: center;
        align-items: center;

        background-color: rgba(0, 0, 0, 0.8);


        .btn-close {
            box-sizing: border-box;
            margin: 20px auto 0;
            width: 40px;
            height: 40px;
            border: 2px solid #ffffff;
            border-radius: 40px;

            text-align: center;
            font-size: 30px;
            line-height: 35px;
            color: #ffffff;
        }

        .content {
            box-sizing: border-box;
            margin: 20px auto;
            width: 80vw;
            padding: 10px;
            border-radius: 5px;
            max-height: 70vh;

            background-color: #ffffff;
            overflow: scroll;

            /deep/ img{
                display: block;
                margin: 0 auto;
                width: 90%;
                vertical-align: top;
            }

            /deep/ p{
                margin: 4px 0;
            }

            /deep/ h1{
                margin: 4px 0;
                font-size: 24px;
            }

            /deep/ .ql-align-center{
                text-align: center;
            }
        }
    }
</style>

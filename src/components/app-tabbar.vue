<template>
<div class="tabbar" :style="{top:deviceHeight + 'px'}">
    <div class="nav">
        <div class="nav-container">
            <div class="link" @click="jump('/')">
                <image class="image" src="http://192.168.2.113:1337/dist/images/openIcon2.png" resize="contain"></image>
                <text class="title">首页</text>
            </div>
            <div class="link" @click="jump('/account')">
                <image class="image" src="http://192.168.2.113:1337/dist/images/openIcon3.png" resize="contain"></image>
                <text class="title">转让市场</text>
            </div>
            <div class="link" @click="jump('/account')">
                <image class="image" src="http://192.168.2.113:1337/dist/images/openIcon4.png" resize="contain"></image>
                <text class="title">账户</text>
            </div>
            <div class="link" @click="jump('/more')">
                <image class="image" src="http://192.168.2.113:1337/dist/images/openIcon5.png" resize="contain"></image>
                <text class="title">更多</text>
            </div>
        </div>
    </div>
    <div class="jump-app" @click="jump('/')">
        <image class="image" src="http://192.168.2.113:1337/dist/images/openIcon1.png" resize="contain"></image>
    </div>
</div>
</template>

<script>
    import config from '../util/config.js'
    export default {
      name: 'tabbar',
      data () {
        return {
          resouce: "http://192.168.2.113:1337/dist/",
          configEnv:{},
          deviceHeight:0
        }
      },
      init(){

      },
      created () {
           this.deviceHeight = config.clientHeight;
           console.log("tab============="+this.deviceHeight);
        //   this.configEnv = weex.config.env;
        //   this.configEnv.deviceHeight -= 96;
        //   console.log(weex.config.env);
        //   console.log(this.getEnv());
        // this.deviceHeight = this.getdeviceHeight() - 100;
        //   this.configEnv = this.$getConfig().env
        //   this.deviceHeight = this.$getConfig().env.deviceHeight - 96;
        //   console.log(this.deviceHeight);
      },
      computed: {

      },

      methods: {

      }

    }

</script>

<style scoped>
.tabbar {
    position: absolute;
    width:750px;
    height: 96px;
    border-top-width: 2px;
    border-top-style: solid;
    border-top-color: #ffbe23;
    background-color: #fff;
    flex-direction: row;
}

.jump-app {
    width: 120px;
    height: 96px;
    border-width: 3px;
    border-style: solid;
    border-color: #FFFFFF;
    background-color: #f3f3f3;
}

.image {
    width: 44px;
    height: 44px;
    margin-left: 55px;
    margin-top: 14px;
}

.nav {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
    flex: 1;
}
.nav-container{
    flex-direction: row;
    width: 630px;
}

.link {
    flex:1;
    justify-content: center;
}

.title {
    font-family: Verdana, Geneva, sans-serif;
    font-size: 24px;
    line-height: 36px;
    color: #888;
    text-align: center;
}
</style>

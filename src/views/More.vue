<template>
<div class="container">
    <div class="cell-access justify-space" style="padding-right:10px;">
        <div class="cell-grow mr25">
            <image src="http://192.168.2.113:1337/dist/images/more1.png" class="icon" resize="contain"></image>
        </div>
        <div class="cell">
            <text class="text">客服热线</text>
        </div>
        <div class="cell" style="text-align:right; flex:3;">
            <text style="color:#32c1d4; font-size:36px; margin-top:4px; margin-bottom:10px; text-align:right;">4008-726-799</text>
            <text style="font-size:24px;color:#888;text-align:right;">工作日09:00～21:00 节假日09:00～18:00</text>
        </div>
    </div>
    <a class="cell-access justify-space" href="">
        <div class="cell-grow mr25">
            <image src="http://192.168.2.113:1337/dist/images/more2.png" class="icon" resize="contain"></image>
        </div>
        <div class="cell">
            <text class="text">帮助中心</text>
        </div>
        <div class="text-right cell-grow">
            <image src="http://192.168.2.113:1337/dist/images/rightArrow.png" class="arrow-right" resize="contain"></image>
        </div>
    </a>
    <jump-web class="cell-access justify-space" href="" style="border-bottom-width:0;" url = 'https://www.baidu.com/'>
        <div class="cell-grow mr25">
            <image src="http://192.168.2.113:1337/dist/images/more3.png" class="icon" resize="contain"></image>
        </div>
        <div class="cell">
            <text class="text">联系我们</text>
        </div>
        <div class="text-right cell-grow">
            <image src="http://192.168.2.113:1337/dist/images/rightArrow.png" class="arrow-right" resize="contain"></image>
        </div>
    </jump-web>
    <a class="cell-access justify-space mt20" href="">
        <div class="cell-grow mr25">
            <image src="http://192.168.2.113:1337/dist/images/more4.png" class="icon" resize="contain"></image>
        </div>
        <div class="cell">
            <text class="text">平台介绍</text>
        </div>
        <div class="text-right cell-grow">
            <image src="http://192.168.2.113:1337/dist/images/rightArrow.png" class="arrow-right" resize="contain"></image>
        </div>
    </a>
    <a class="cell-access justify-space" href="">
        <div class="cell-grow mr25">
            <image src="http://192.168.2.113:1337/dist/images/more5.png" class="icon" resize="contain"></image>
        </div>
        <div class="cell">
            <text class="text">安全保障</text>
        </div>
        <div class="text-right cell-grow">
            <image src="http://192.168.2.113:1337/dist/images/rightArrow.png" class="arrow-right" resize="contain"></image>
        </div>
    </a>
    <a class="cell-access justify-space" href="" style="border-bottom-width:0;">
        <div class="cell-grow mr25">
            <image src="http://192.168.2.113:1337/dist/images/more6.png" class="icon" resize="contain"></image>
        </div>
        <div class="cell">
            <text class="text">服务协议</text>
        </div>
        <div class="text-right cell-grow">
            <image src="http://192.168.2.113:1337/dist/images/rightArrow.png" class="arrow-right" resize="contain"></image>
        </div>
    </a>
    <div class="cell-access justify-space mt20" @click="jump('/user/login')">
        <div class="cell-grow mr25">
            <image src="http://192.168.2.113:1337/dist/images/more7.png" class="icon" resize="contain"></image>
        </div>
        <div class="cell">
            <text class="text">登录</text>
        </div>
        <div class="text-right cell-grow">
            <image src="http://192.168.2.113:1337/dist/images/rightArrow.png" class="arrow-right" resize="contain"></image>
        </div>
    </div>
    <div class="cell-access justify-space" @click="jump('/user/register')">
        <div class="cell-grow mr25">
            <image src="http://192.168.2.113:1337/dist/images/more8.png" class="icon" resize="contain"></image>
        </div>
        <div class="cell">
            <text class="text">注册</text>
        </div>
        <div class="text-right cell-grow">
            <image src="http://192.168.2.113:1337/dist/images/rightArrow.png" class="arrow-right" resize="contain"></image>
        </div>
    </div>
    <AppTabBar></AppTabBar>
</div>
</template>

<script>
// var apis = require('./common/api');
import jumpWeb from '../components/jump-web.vue'
import AppTabBar from '../components/app-tabbar.vue'
module.exports = {
    components:{AppTabBar,jumpWeb},
    props: {
        lists: {
            default: function() {
                return [];
            }
        }
    },
    created: function() {
        //   var bundleUrl = this.$getConfig().bundleUrl;
        //   console.log('hit', bundleUrl);
        //   var nativeBase;
        //   var isAndroidAssets = bundleUrl.indexOf('file://assets/') >= 0;
        //   var isiOSAssets = bundleUrl.indexOf('file:///') >= 0 && bundleUrl.indexOf('WeexDemo.app') > 0;
        //   if (isAndroidAssets) {
        //     nativeBase = 'file://assets/';
        //   }
        //   else if (isiOSAssets) {
        //     // file:///var/mobile/Containers/Bundle/Application/{id}/WeexDemo.app/
        //     // file:///Users/{user}/Library/Developer/CoreSimulator/Devices/{id}/data/Containers/Bundle/Application/{id}/WeexDemo.app/
        //     nativeBase = bundleUrl.substring(0, bundleUrl.lastIndexOf('/') + 1);
        //   }
        //   else {
        //     var host = 'localhost:12580';
        //     var matches = /\/\/([^\/]+?)\//.exec(this.$getConfig().bundleUrl);
        //     if (matches && matches.length >= 2) {
        //       host = matches[1];
        //     }
        //     nativeBase = 'http://' + host + '/' + this.dir + '/build/';
        //   }
        //   var h5Base = './' + this.dir + '/build/';
        //   // in Native
        //   var base = nativeBase;
        //   if (typeof window === 'object') {
        //     // in Browser or WebView
        //     base = h5Base;
        //   }
        //
        //   for(var i = 0; i < this.tabItems.length; i++) {
        //       var tabItem = this.tabItems[i];
        //       tabItem.src = base + tabItem.src;
        //   }
        // see log in Android Logcat
        //if (this.items.length) console.log('hit', this.items[0].url);

    },
    methods: {
        ready: function(e) {
            var vm = this;
            vm.$on('tabBar.onClick', function(e) {
                var detail = e.detail;
                nativeLog('tabBar.onClick ' + detail.index);
            });
        }
    }
};
</script>

<style scoped="">
.container {
    background-color: #f5f5f5;
    position: absolute;
}

.mr25 {
    margin-right: 25px;
}

.mt20 {
    margin-top: 20px;
}

.cell-access {
    width: 750px;
    background-color: #fff;
    padding-left: 25px;
    padding-top: 12px;
    padding-bottom: 12px;
    padding-right: 25px;
    flex-direction: row;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: #ccc;
    align-items: center;
}

.cell {
    flex-direction: column;
    height: 80px;
    flex: 1;
}

.cell-grow {
    width: 40px;
}

.justify-space {
    justify-content: space-between;
}

.text-right {
    text-align: right;
}

.icon {
    width: 40px;
    height: 40px;
    margin-right: 25px;
}

.text {
    font-size: 34px;
    font-weight: 400;
    text-align: left;
    padding-top: 23px;
    padding-bottom: 23px;
    color: #000;
    height: 80px;
}

.arrow-right {
    width: 40px;
    height: 40px;
}
</style>

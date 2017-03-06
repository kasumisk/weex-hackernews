<template>
<div class="container">
    <!-- <div class="noLogin" v-if="!login">
        <text class="noLoing-tip">你尚未登录，请先登录再进行操作！</text>
        <a class="goLogin" href="../user/login">
            <text>前往登录</text>
        </a>
    </div> -->
    <div class="login">
        <scroller class="scroller" :style="{ width: '750px', height: deviceHeight }">
            <div class="cells cell-user bgc-white">
                <a class="cell-access flex flex-center" url="/pages/user/my-info">
                    <div class="cell-hd" style="margin-right:20px;">
                        <div class="cell-icon">
                            <image :src="account.headImgUrl||'http://192.168.2.113:8080/dist/images/head_img_member.png'" style="width:70px;height:70px;"></image>
                        </div>
                    </div>
                    <div class="cell-bd">
                        <text class="main-txt">{{account.realName}}</text>
                        <text class="sub-info">{{account.phone}}</text>
                    </div>
                    <div class="cell-ft">
                        <image src="http://192.168.2.113:8080/dist/images/rightArrow.png" class="arrow-right" resize="contain"></image>
                    </div>
                </a>
            </div>

            <div class="cells mt30 bgc-white">
                <image v-if="account.isDepository == 0" :src="account.headImgUrl||'http://120.25.77.23:3131/mz/images/zs-logo-3.png'" style="width:750px;height:80px;"></image>
                <div class="account-amount">
                    <div class="depository-no" v-if="account.isDepository == 0">
                        <text style="font-size:50px;font-weight:bold;">开通存管账户</text>
                        <text style="padding-top:30px;padding-bottom:40px;font-size:40px;">投资及账户资金更安全</text>
                        <a href="/pages/depositary/register" class="btn"><text style="color:#32c1d4; text-align:center;">我要开通</text></a>
                    </div>
                    <div class="depository-yes" v-if="account.isDepository != 0">
                        <div class="zs-card-num flex-row">
                            <image class="zs-logo" src="http://192.168.2.113:8080/dist/images/zsLogo.png" resize="contain"></image>
                            <text class="main-sub-info">存管帐号&nbsp;&nbsp;{{account.depositoryId}}</text>
                        </div>
                        <div class="amount-all">
                            <text class="main-sub-info text-center">存管总资产(元)</text>
                            <text class="c-orange text-center">{{account.allAmount}}</text>
                        </div>
                        <div class="amount-other flex-row">
                            <div class="flex-1">
                                <text class="main-sub-info text-center">可用余额 (元)</text>
                                <text class="amount-other-num text-center">{{account.surplusAmount}}</text>
                            </div>
                            <div class="flex-1">
                                <text class="main-sub-info text-center">待收本金 (元)</text>
                                <text class="amount-other-num text-center">{{account.reclaimPrincipal}}</text>
                            </div>
                        </div>
                        <div class="border-top flex-row flex-center">
                            <div class="flex-1" @click="jump('/recharge')">
                                <text class="btn-sub">充值</text>
                            </div>
                            <div class="line"></div>
                            <div class="flex-1" @click="jump('/cach')">
                                <text class="btn-sub">提现</text>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="cells cell-main cells-hasIcon mt30 bgc-white">
                <div class="cell-access flex flex-center" @click="jump('/invest')" style="border-bottom-width:2px; border-bottom-style:solid;border-bottom-color:#e6e6e6;">
                    <div class="cell-hd">
                        <image class="cell-icon icon-rmb" src="http://192.168.2.113:8080/dist/images/icon-rmb.png" style="width:34px;height:42px;"></image>
                    </div>
                    <div class="cell-bd">
                        <text class="main-txt">项目投资</text>
                        <text class="main-sub-info">累计已投{{account.allInvestAmount}}元，已赚{{account.hasGotInterest}}元</text>
                    </div>
                    <div class="cell-ft">
                        <image src="http://192.168.2.113:8080/dist/images/rightArrow.png" class="arrow-right" resize="contain"></image>
                    </div>
                </div>
                <div class="cell-access flex flex-center" url="/pages/my-account/recovery-list">
                    <div class="cell-hd">
                        <image class="cell-icon icon-check" src="http://192.168.2.113:8080/dist/images/icon-check.png" style="width:34px;height:42px;"></image>
                    </div>
                    <div class="cell-bd">
                        <text class="main-txt">回款计划</text>
                        <text class="main-sub-info">待收本金{{account.reclaimPrincipal}}元，利息{{account.reclaimInterest}}元</text>
                    </div>
                    <div class="cell-ft">
                        <image src="http://192.168.2.113:8080/dist/images/rightArrow.png" class="arrow-right" resize="contain"></image>
                    </div>
                </div>
            </div>

            <div class="cells cell-main cells-hasIcon mt30 bgc-white" style="border-bottom-width:2px; border-bottom-style:solid;border-bottom-color:#e6e6e6;">
                <div class="cell-access flex flex-center" url="/pages/my-account/transaction-record">
                    <div class="cell-hd">
                        <image class="cell-icon icon-list" src="http://192.168.2.113:8080/dist/images/icon-list.png" style="width:34px;height:42px;"></image>
                    </div>
                    <div class="cell-bd">
                        <text class="main-txt">交易记录</text>
                    </div>
                    <div class="cell-ft">
                        <image src="http://192.168.2.113:8080/dist/images/rightArrow.png" class="arrow-right" resize="contain"></image>
                    </div>
                </div>
            </div>
            <div class="cells cell-main cells-hasIcon bgc-white">
                <div class="cell-access flex flex-center" href="http://192.168.2.113:8080/dist/account/redpacket.js">
                    <div class="cell-hd">
                        <image class="cell-icon icon-repacket" src="http://192.168.2.113:8080/dist/images/icon-repacket.png" style="width:34px;height:42px;"></image>
                    </div>
                    <div class="cell-bd">
                        <text class="main-txt">我的红包</text>
                    </div>
                    <div class="cell-ft">
                        <image src="http://192.168.2.113:8080/dist/images/rightArrow.png" class="arrow-right" resize="contain"></image>
                    </div>
                </div>
            </div>
            <div class="cells cell-main cells-hasIcon mt30 bgc-white">
                <div class="cell-access flex flex-center" url="/pages/my-account/transaction-record">
                    <div class="cell-hd">
                        <image class="cell-icon icon-repacket" src="http://192.168.2.113:8080/dist/images/icon-repacket.png" style="width:34px;height:42px;"></image>
                    </div>
                    <div class="cell-bd">
                        <text class="main-txt">我的红包</text>
                    </div>
                    <div class="cell-ft">
                        <image src="http://192.168.2.113:8080/dist/images/rightArrow.png" class="arrow-right" resize="contain"></image>
                    </div>
                </div>
            </div>
            <div class="safety">交易与账户安全由中国人民保险公司全程担保</div>
        </scroller>
    </div>
    <AppTabBar></AppTabBar>
</div>
</template>


<script>
// var storage = require('@weex-module/storage');
// var stream = require('@weex-module/stream');
// var util = require('../utils/util.js');
import AppTabBar from '../components/app-tabbar.vue'

  export default {
    components: {
        AppTabBar
    },
    props: {
        account: {
            default: function() {
                return {
                    isDepository: '0'
                };
            }
        },
        // login: {
        //     default: false
        // },
        deviceHeight: {
            default: 500
        }
    },
    data() {
        return {
            loading: false
        }
    },
    computed: {
        account() {
            return this.$store.getters.account
        }
    },

    created() {
        // this.login = true;
        // console.log(this.$store.state.login);
        this.$getConfig(function (config) {
         this.configEnv = config.env
       }.bind(this));
        this.fetchAccount();
        // console.log(this.$getConfig().env.deviceHeight);
        // this.deviceHeight = this.$getConfig().env.deviceHeight - 120;
    },
    methods: {
        fetchAccount() {
            this.loading = true
            this.$store.dispatch('FETCH_ACCOUNT', {}).then(() => {
                this.loading = false
            })
        }
    }
};
</script>


<style lang="css" scoped="">
.container{
  background-color: #f2f3f7;
}
.bgc-white{
  background-color: #fff;
}
.flex-row{
    flex-direction: row;
}
.flex-1{
    flex: 1;
}
.border-top{
    border-top-width:1px;
    border-top-color: #ccc;
    border-top-style: solid;
}
.line{
    height: 36px;
    width: 1px;
    background-color: #ccc;
}
.flex-center{
  align-items: center;
}
.just-center{
    justify-content: center;
}
.text-center{
    text-align: center;
}
.cell-access{
  padding-top: 30px;
  padding-right: 20px;
  padding-bottom: 30px;
  padding-left: 30px;
  flex-direction: row;
}

.cell-hd{
  margin-right: 30px;
}
.cell-bd {
  flex:1;
}
.arrow-right{
  width:40px;
  height: 40px;
}
.mt30{
  margin-top: 30px;
}
.sub-info{
  font-size: 24px;
  margin-top: 10px;
}
.account-amount{
  left:0;
  top:0;
  width: 750px;
}
.amount-other{
    padding-bottom: 40px;
}
.depository-no{
  padding-top: 70px;
  padding-bottom: 70px;
  text-align: center;
  align-items: center;
  margin-top: -100px;
}
.amount-all{
    justify-content: center;
    margin-top: 30px;
    margin-bottom: 30px;
}
.c-orange{
    color: #ff871f;
    font-size: 40px;
    margin-top: 10px;
}
.zs-logo{
    width:120px;height:40px; margin-top:20px; margin-right:20px;
    margin-left: 20px;
}
.btn{
  width:400px;
  height:84px;
  border-width:2px;
  border-color: #32c1d4;
  border-style: solid;
  padding-top: 20px;
  padding-bottom: 20px;
  border-radius: 10px;
  font-size:40px;
  font-weight:700;
  color:#32c1d4;
  text-align: center;
  align-items: center;
}
.btn-sub{
    color: #32c1d4;
    padding-top: 24px;
    padding-bottom: 24px;
    font-size: 36px;
    text-align: center;
}

.main-txt{
  font-size: 32px;
}
.main-sub-info{
  margin-top:20px;
  font-size:24px;
  color: #aaa;
}


</style>

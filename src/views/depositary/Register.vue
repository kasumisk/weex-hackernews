<template>
    <div class="container">
        <scroller class="scroller" :style="{ width: '750px', height: deviceHeight }">
            <div class="banner">
                <image class="logo" src="http://192.168.2.113:8080/dist/images/zs-logo-4.png" resize="contain"></image>
            </div>
            <div class="cell">
                <image class="icon" src="http://192.168.2.113:8080/dist/images/openIcon1.png" resize="contain"></image>
                <input class="input flex-1" type="text" name="" :value="realName" placeholder="请输入真实姓名"/>
            </div>
            <div class="cell">
                <image class="icon" src="http://192.168.2.113:8080/dist/images/openIcon2.png" resize="contain"></image>
                <input class="input flex-1" type="text" name="" :value="cardId" placeholder="请输入身份证号"/>
            </div>
            <div class="cell mt30">
                <image class="icon" src="http://192.168.2.113:8080/dist/images/openIcon5.png" resize="contain"></image>
                <input class="input flex-1" type="text" name="" :value="bankCardNum" placeholder="请输入银行卡号"/>
            </div>
            <div class="cell flex-row" style="background-color:transparent;">
                <div class="flex-1 flex-row" @click="province">
                    <image class="icon" style="margin-right:20px;" src="http://192.168.2.113:8080/dist/images/openIcon3.png" resize="contain"></image>
                    <text class="text">{{userInfo.provinceValue || "银行开户省份"}}</text>
                </div>
                <div class="flex-1" @click="region">
                    <text class="text">{{userInfo.regionValue || "银行开户地区"}}</text>
                </div>
            </div>
            <div class="cell">
                <image class="icon" src="http://192.168.2.113:8080/dist/images/openIcon6.png" resize="contain"></image>
                <input class="input flex-1" type="text" name="" :value="bankPhone" placeholder="请输入银行卡预留手机号"/>
            </div>
            <div class="cell">
                <image class="icon" src="http://192.168.2.113:8080/dist/images/openIcon7.png" resize="contain"></image>
                <input class="input flex-1" type="text" name="" :value="smsCode" placeholder="请输入短信验证码"/>
                <div class="getSmsCode" @click.native="signup">
                    <text class="smsCode-text">获取验证码</text>
                </div>
            </div>
            <div class="button" @click.native="signup">
                <text class="button-text">开通存管账户</text>
            </div>
            <text style="color:#888;font-size:24px; margin-top:20px; margin-right:30px; margin-left:30px;">温馨提示：请填写您的个人真实信息，存管账户开通后将无法修改。</text>
        </scroller>
    </div>
</template>

<script>

// var util = require('./utils/util.js');
var picker = weex.requireModule('picker');
module.exports = {
    props: {
        userInfo: {
            default: function () {
                return {
                    userName: '',
                    userId: '',
                    phone: '',
                    realName: '',
                    cardId: '',
                    isRealNameAuth: '',
                    bankCardNum: '',
                    provinceValue: '',
                    regionValue: ''
                };
            }
        },
        deviceHeight: {
            default: ''
        }
    },
    init: function () {
        // 页面初始化 options为页面跳转所带来的参数
    },
    created: function () {
        this.deviceHeight = this.$getConfig().env.deviceHeight - 120;
    },
    ready: function () {},
    methods: {
        region: function () {
            var items = new Array("广西", "广东", "江西", "湖南", "湖北", "云南", "山西", "");
            var self = this;
            picker.pick({
                'items': items,
                'index': self.index
            }, function (ret) {
                var result = ret.result;
                if (result == 'success') {
                    self.userInfo.regionValue = items[ret.data];
                    self.index = ret.data;
                }
            });
        },
        province: function () {
            var items = new Array("广西", "广东", "江西", "湖南", "湖北", "云南", "山西", "");
            var self = this;
            picker.pick({
                'items': items,
                'index': self.index
            }, function (ret) {
                var result = ret.result;
                if (result == 'success') {
                    self.userInfo.provinceValue = items[ret.data];
                    self.index = ret.data;
                }
            });
        }

    }
};</script>

<style lang="css" scoped="">

.container{
    background-color: #f2f3f7;
}
.text-center{
    text-align: center;
}
.text-right{
    text-align: right;
}
.text-left{
    text-align: left;
}

.flex-row{
    flex-direction: row;
}
.flex-1{
    flex: 1;
}
.grev{
    color: #888;
}
.mt30{
    margin-top: 30px;
}
.cell{
    background-color: #fff;
    width: 750px;
    align-items: center;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: #e6e6e6;
    padding-top: 24px;
    padding-bottom: 24px;
    padding-right: 20px;
    padding-left: 20px;
    flex-direction: row;
    justify-content:space-between;
}
.banner{
    height: 200px;
    width: 750px;
    align-items: center;
    justify-content: center;
}
.logo{
    width: 240px;
    height: 90px;
}
.icon{
    width: 40px;
    height: 40px;
}
.input{
    margin-left: 10px;
    padding-left: 10px;
    font-size: 32px;
    height: 80px;
    line-height: 80px;
}
.text{
    font-size: 32px;
    color: #888;
}
.getSmsCode{
    width:200px;
    border-radius: 6px;
    background-color:#32c1d4;
    border-width: 0;
}
.smsCode-text{
    color: #fff;
    font-size: 28px;
    padding-top: 14px;
    padding-bottom: 14px;
    font-weight: bold;
    text-align: center;
}
.button{
    margin-top: 30px;
    margin-left: 30px;
    margin-bottom: 30px;
    background-color:#32c1d4;
    padding-top: 25px;
    padding-bottom: 25px;
    width: 690px;
    font-size: 40px;
    border-radius: 10px;
    border-width: 0;
}

.button-text{
    color: #fff;
    font-size: 32px;
    font-weight: bold;
    text-align: center;
}
</style>

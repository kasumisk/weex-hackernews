<template>
    <div class="container">
        <div class="bank mt30 white-bg">
            <div class="just-start">
                <image :src="bankLogo" @load="imgLoad" class="logo" :style="{ width: imgWidth }" resize="contain"></image>
            </div>
            <div class="card">
                <text class="card-text flex-1">6217</text>
                <text class="card-text flex-1">****</text>
                <text class="card-text flex-1">****</text>
                <text class="card-text flex-1">1320</text>
            </div>
        </div>
        <div class="flex-row">
            <text class="sub-text">可提现金额：</text>
            <text class="sub-text c-color">0.00</text>
            <text class="sub-text">元</text>
        </div>
        <div class="padding white-bg mt30 flex-row" style="align-items:center;">
            <text style="width:140px;">提现金额</text>
            <input class="input flex-1" type="text" name="" :value="money" placeholder="请输入提现金额"/>
        </div>
        <text class="sub-text">本次提现手续费：0.00元</text>
        <div class="button" @click.native="signup">
            <text class="button-text">确认提现</text>
        </div>
        <div class="mt30">
            <text class="main-text">温馨提示：</text>
            <text class="main-text">1、当日充值的资金不可提现，充值成功后，待T+1工作日充值清算后可提。</text>
            <text class="main-text">2、提现返回结果显示提现成功仅表示提现交易已成功受理，资金入账时间以实际处理时间为准。</text>
        </div>

        <!-- <div class="topup-pop" v-if="modal">
            <div class="mask"></div>
            <div class="dialog">
                <div class="dialog-hd">
                    <text class="h3">充值认证</text>
                    <div class="dialog-close" bindtap="colose"></div>
                </div>
                <div class="dialog-bd">
                    <div class="ps">
                        <text>本次交易需要短信确认，验证码</text>
                        <text class="SMSstatus">{{SMSstatus}}</text>
                        <text>发送至您手机</text>
                        <text class="bankPhone">{{bankPhone}}</text>
                    </div>
                    <div class="form-get-code">
                        <div class="input-code">
                            <input ref="topupSms" type="number" pattern="[0-9]*" maxlength="6" class="" bindinput="smsCodeInput" :value="smsCode"/>
                        </div>
                        <div ref="smsBtn" :class="['btn', 'btn-blue', smsClass]" bindtap="getCode">
                            {{smsCodeText}}
                        </div>
                    </div>
                </div>
                <div class="dialog-ft">
                    <div class="btn" bindtap="enterSubmit">
                        确认
                    </div>
                </div>
            </div>
        </div> -->
    </div>

</template>

<script>


module.exports = {
    components: {
        // wxcButton: require('weex-vue-components/button.vue')
    },
    data(){
        return {
            userInfo:{
                userName: '',
                userId: '',
                phone: '',
                realName: '',
                cardId: '',
                money: '',
                isRealNameAuth: '',
                bankCardNum: '',
                modal: false,
                imgWidth: '0'
            },
            money:'',
            modal:false,
            bankLogo:'http://192.168.2.113:8080/dist/images/bank/bankLogo_01.png'
        }
    },
    created: function () {

    },
    methods: {
        imgLoad: function (e) {
            // console.log(e);
            // if (e.success) {
            //     var imgWidth = e.size.naturalWidth / e.size.naturalHeight * 60;
            //     console.log(imgWidth);
            //     this.imgWidth = imgWidth;
            // }
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
.white-bg{
    background-color: #fff;
}
.mt30{
    margin-top: 30px;
}
.flex-row{
    flex-direction: row;
}
.flex-1{
    flex: 1;
}
.c-color{
    color: #ff871f;
    margin-right: 0;
    margin-left: 0;
}
.bank{
    padding-top: 30px;
    padding-bottom: 30px;
    padding-right: 30px;
    padding-left: 30px;
}
.padding{
    padding-top: 10px;
    padding-bottom: 10px;
    padding-right: 30px;
    padding-left: 30px;
}
.just-start{
    justify-content: flex-start;
}
.logo{
    height: 60px;
    width: 500px;
}
.card{
    flex-direction: row;
    justify-content: space-between;
    margin-top: 30px;
}
.card-text{
    font-size: 46px;
    color: #888;
    text-align: center;
}
.input{
    margin-left: 10px;
    padding-left: 10px;
    font-size: 28px;
    height: 80px;
    line-height: 80px;
}
.button{
    margin-top: 30px;
    margin-left: 30px;
    background-color:#32c1d4;
    padding-top: 25px;
    padding-bottom: 25px;
    width: 690px;
    font-size: 40px;
    border-radius: 10px;
    border-width: 0;
}
.button:active{
    background-color:red;
}
.button-text{
    color: #fff;
    font-size: 32px;
    font-weight: bold;
    text-align: center;
}
.sub-text{
    font-size: 24px;
    color: #888;
    margin-top: 20px;
    margin-bottom: 20px;
    margin-left: 20px;
    margin-right: 20px;
}
.main-text{
    font-size: 28px;
    color: #888;
    margin-top: 20px;
    margin-bottom: 20px;
    margin-left: 20px;
    margin-right: 20px;
}
</style>

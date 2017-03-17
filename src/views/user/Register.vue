<template>
  <div class="container">
      <!-- 图片使用变量 -->
    <image :src="url + 'images/login-bg.png'" alt="" style="width:750px; height:853px;" resize= "cover"></image>
    <!-- <image src="http://app1.mindai.com/images/login-bg.png" alt="" style="width:750px; height:853px;" resize= "cover"></image> -->
    <div class="bg-inner">
        <div class="justify-center">
          <image class="logo" src="http://app1.mindai.com/images/logo.png"></image>
        </div>
        <div class="forms-mh30 forms-gray forms-radius">
          <div class="form">
              <div class="form-hd">
                  <image src="http://192.168.2.113:1337/dist/images/icons-1_01.png" class="icon form-icon"></image>
              </div>
              <div class="form-bd">
                  <input ref="userName" class="input-text" type="text" :value="userName" placeholder="手机号/用户名" maxlength="20" @input="listenerUserName"/>
              </div>
              <div class="form-ft">
                  <image src="http://app1.mindai.com/images/x-29.png" :class="[userName==''?'':'form-clear', 'ng-hide']" @click="clearUserName"></image>
              </div>
          </div>
          <div class="form">
              <div class="form-hd">
                  <image src="http://192.168.2.113:1337/dist/images/icons-1_02.png" class="icon form-icon"></image>
              </div>
              <div class="form-bd">
                  <input class="input-text" :type="passwordType" :value="password" placeholder="请输入密码" maxlength="20" @input="listenerPassword"/>
              </div>
              <div class="form-ft">
                  <div style="flex-direction:row;">
                    <image src="http://app1.mindai.com/images/x-29.png" :class="[password==''?'':'form-clear', 'ng-hide']" @click="clearPassword"></image>
                    <div class="switch" :style="{ backgroundColor: switchOn!=false?'#32c1d4':'#ccc' }">
                        <div :class="['switch-handle', switchOn!=false?'switch-on':'switch-off']"></div>
                        <image :src="switchOn!=false?'http://192.168.2.113:1337/dist/images/switch-1_01.png':'http://192.168.2.113:1337/dist/images/switch-1_02.png'" class="switch-img"></image>
                    </div>
                  </div>
              </div>
          </div>
          <div class="form" style="border-bottom-width:0;">
              <div class="form-hd">
                  <image src="http://192.168.2.113:1337/dist/images/icons-1_03.png" class="icon form-icon"></image>
              </div>
              <div class="form-bd">
                  <input class="input-text" type="text" :value="userName" placeholder="请输入验证码" maxlength="20" @input="listenerUserName"/>
              </div>
              <div class="form-ft">
                  <text class="get-sms-code">{{getSmsText}}</text>
              </div>
          </div>
        </div>
        <div class="forms-mh30 forms-gray forms-radius" style="margin-top:30px;">
            <div class="form" style="border-bottom-width:0;">
              <div class="form-hd"><image src="http://192.168.2.113:1337/dist/images/icons-1_04.png" class="icon form-icon"></image></div>
              <div class="form-bd">
                <input class="input-text" type="text" placeholder="推荐人用户名/手机号（选填）" maxlength="20" bindinput="listenerInviter" :value="inviter" ng-enter=""/>
              </div>
              <div class="form-ft"><div ref="inviterClear" data-clear="inviter" bindtap="clear" :class="[inviter==''?'':'form-clear', 'ng-hide']"></div></div>
            </div>
        </div>

        <text class="register">注册</text>
        <text class="agreement mt15">点击上述按钮，即表示你同意《民贷天下注册协议》</text>
    </div>
  </div>

</template>


<script>
// var apis = require('./common/api');

module.exports = {
    data(){
        return {
            switchOn:false,
            passwordType:'password',
            username:'',
            password:'',
            smscode:'',
            inviter:'',
            getSmsText:'获取',
            getSmsClass:true,
            nameStauts:false,
            regStatus:false,
            url:'http://app1.mindai.com/'
        }
    },
    created: function () {


    },
    methods: {
        created: function (e) {}
    }
};


</script>




<style scoped="">

.bg-inner{
  position:absolute;
  top:0;
  left:0;
  width: 750px;
}
.justify-center{
  justify-content: center;
}
.logo {
  height:116px;
  width:112px;
  margin-left: 319px;
  margin-right: auto;
  margin-top: 100px;
  margin-bottom: 140px;
  flex-direction: column;
}
.forms-gray {
  background-color: rgba(255, 255, 255, 0.8);
}
.forms-mh30 {
  margin-left: 60px;
  margin-right: 60px;
}
.forms-radius {
  border-radius: 10px;
}
.form{
  padding-left: 30px;
  padding-right: 30px;
  height: 100px;
  flex-direction: row;
  border-bottom-width: 2px;
  border-bottom-style: solid;
  border-bottom-color: #ccc;
  align-items: center;
}
.form-hd{
  width:30px;
  height: 36px;
  margin-right: 40px;

}
.form-bd{
  flex:1;
}
.form-clear{
  width:32px;
  height:32px;
}
.form-icon {
  width: 30px;
  height: 36px;
}

.input-text{
  font-size: 28px;
  background-color:none;
  background:none;
  border:0;
  height: 100px;
  line-height: 100px;
}

.input-text:focus{
  border:0;
}
.switch {
  width: 68px;
  height: 36px;
  margin-top: 32px;
  margin-left: 20px;
  padding: 4px;
  border-radius: 20px;
}
.switch-img{
  position: absolute;
  top:0;
  left:0;
  width: 68px;
  height: 36px;
}
.switch-off {
  left: 4px;
}

.switch-on {
  left: 36px;
}
.switch-handle {
  position: absolute;
  top: 4px;
  width: 28px;
  height: 28px;
  border-radius: 14px;
  background-color: #fff;
}
.get-sms-code{
  font-size: 24px;
  border-width: 1px;
  border-style: solid;
  border-color: #32c1d4;
  color: #32c1d4;
  width: 116px;
  padding-top: 15px;
  padding-bottom: 15px;
  text-align: center;
  border-radius: 10px;
}
.register{
  font-size: 36px;
  color: #fff;
  background-color: #32c1d4;
  padding-top: 17px;
  padding-bottom: 17px;
  margin-left: 60px;
  margin-right: 60px;
  margin-top: 30px;
  text-align: center;
  margin-bottom: 30px;
  border-radius: 10px;
}
.agreement{
  padding-top:30px;
  padding-bottom:30px;
  font-size: 24px;
  color: #aaa;
  text-align: center;
}

</style>

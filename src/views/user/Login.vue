<template>
  <div class="container">
    <image src="http://app1.mindai.com/images/login-bg.png" alt="" style="width:750px;height:573px;" resize= "cover"></image>
    <div class="bg-inner">
        <div class="justify-center">
          <image class="logo" src="http://app1.mindai.com/images/logo.png"></image>
        </div>
        <div class="forms-mh30 forms-gray forms-radius">
          <div class="form" style="border-bottom-color:#ccc; border-bottom-style:solid; border-bottom-width:2px;">
              <div class="form-hd">
                  <image src="http://192.168.2.113:1337/dist/images/icons-1_01.png" class="icon form-icon"></image>
              </div>
              <div class="form-bd">
                  <input  class="input-text" type="text"  placeholder="手机号/用户名"  @input = "inputUserName"/>
              </div>
              <div class="form-ft">
                  <image src="http://app1.mindai.com/images/x-29.png" v-if="userName" @click="clear('userName')"></image>
              </div>
          </div>
          <div class="form">
              <div class="form-hd">
                  <image src="http://192.168.2.113:1337/dist/images/icons-1_02.png" class="icon form-icon"></image>
              </div>
              <div class="form-bd">
                  <input  class="input-text" :type="passwordType"  placeholder="请输入密码" @input = "inputPassWord"/>
              </div>
              <div class="form-ft">
                  <div style="flex-direction:row;">
                    <image src="http://app1.mindai.com/images/x-29.png" v-if="password" @click="clear('password')"></image>
                    <div class="switch" @click="switchTab" :style="{ backgroundColor: switchOn!=false?'#32c1d4':'#ccc' }">
                        <div :class="['switch-handle', switchOn!=false?'switch-on':'switch-off']"></div>
                        <image :src="switchOn!=false?'http://192.168.2.113:1337/dist/images/switch-1_01.png':'http://192.168.2.113:1337/dist/images/switch-1_02.png'" class="switch-img"></image>
                    </div>
                  </div>
              </div>
          </div>
        </div>
        <text class="button" @click="login">登录</text>
        <a class="reg-link mt30" href="./register.js">
          <text style="text-align:center;">没有账号？立即注册</text>
        </a>
    </div>
  </div>
</template>

<script>
import {
    mapGetters,
    mapActions
} from 'vuex'

import util from '../../util/util.js'
module.exports = {
    // props: {
    //     userName: {
    //         type: String,
    //         default: ''
    //     },
    //     password: {
    //         type: String,
    //         default: ''
    //     }
    // },
    data(){
        return{
            userName:'',
            password:'',
            passwordType:'password',
            switchOn:false
        }
    },
    computed: mapGetters({
        loading:'loading'
    }),
    created: function () {
        // 页面初始化 options为页面跳转所带来的参数

    },
    methods: {
        login: function () {
            if(!this.loading){
                this.$store.dispatch('LOGIN_ACTION',{userName:this.userName,password:this.password}).then(() => {
                    if(this.$store.getters.loginStatus){
                     this.$router.push('/account');
                    }
//                    util.getLocationStorage('sessionId').then((res)=>{
//                        console.log(res);
//
//                    })
                })
            }
        },
        clear(type){
            if(type == 'userName'){
                this.userName = ''
            }else {
                this.password = ''
            }
        },
        switchTab: function () {
            this.switchOn = !this.switchOn;
            this.passwordType = this.passwordType == 'text' ? 'password' : 'text';
        },
        inputUserName(e){
            this.userName = e.value;
            console.log(this.userName);
        },
        inputPassWord(e){
            this.password = e.value;

        }
    }
};
</script>

<style scoped="">
.bg-inner{
  position:absolute;
  top:0;
  left:0;
  width: 750px;
  min-height: 660px;
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
  overflow: hidden;
}
.form{
  padding-left: 30px;
  padding-right: 30px;
  height: 100px;
  flex-direction: row;
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
  border-radius: 20px;
  background-color: #32c1d4;
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
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
}
.button{
  font-size: 36px;
  color: #fff;
  background-color: #32c1d4;
  padding-top: 16px;
  padding-bottom: 16px;
  margin-left: 60px;
  margin-right: 60px;
  margin-top: 30px;
  margin-bottom: 30px;
  width: 630px;
  text-align: center;
  border-radius: 10px;
}

</style>

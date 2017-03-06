<template>
  <div class="container">
        <div class="banner-bar">
            <image src="http://120.25.77.23:3131/mz/images/banner.png" resize="cover" style="width:750;height:200"></image>
        </div>
        <div class="cunguan-bar">
            <image src="http://120.25.77.23:3131/mz/images/cunguan.png" resize="cover" style="width:750;height:220"></image>
        </div>
        <div class="list mt30">
            <list class="list">
                <!-- <refresh  class = "refresh-view" display="{{refresh_display}}" onrefresh="onrefresh">
                    <text if="{{(refresh_display==='hide')}}"> ↓ pull to refresh </text>
                    <loading-indicator class="indicator"></loading-indicator>
                </refresh> -->
                <!-- <cell class="cell" loadmore="getData" v-for="lists" :index="$index">
                   <a :href="'/pages/detail/detail?projectId=' + (projectId)" class="item">
                       <div class="item-hd flex flex-center">
                           <text class="type">{{projectType}}</text>
                           <text class="name">{{projectName}}</text>
                       </div>
                       <div class="item-bd flex flex-between flex-center">
                           <div class="c-orange">
                               <text class="num">{{rate}}</text>
                               <text class="percent">%</text>
                               <text class="plus" v-if="addRate">+</text>
                               <text class="num" v-if="addRate">1</text>
                               <text class="percent" v-if="addRate">%</text>
                           </div>
                           <div>
                               <text class="term">{{term}}</text>
                               <text class="term-name">{{termName}}</text>
                           </div>
                           <div>
                               <div class="progress c-blue">
                                   <div class="pro1" style="{{style1}}"></div>
                                   <div class="pro2" style="{{style2}}"></div>
                                   <div class="pro-num">{{progress}}</div>
                               </div>
                           </div>
                       </div>
                       <div class="item-ft flex flex-between">
                           <text>{{minAmount}}元起投</text>
                           <text>剩余{{surplusAmount}}/{{totalAmount}}</text>
                       </div>
                   </a>
               </cell> -->
               <!-- <loading class="loading-view" display="{{loading_display}}" onloading="onloading">
                    <text if="{{(loading_display==='hide')}}">↑ Loadmore </text>
                    <loading-indicator class="indicator"></loading-indicator>
               </loading> -->
             </list>
        </div>
        <AppTabBar></AppTabBar>
  </div>
</template>

<script>
    import AppTabBar from '../components/app-tabbar.vue'

    module.exports = {
        components: {
            AppTabBar
        },
        props: {
            userName: {
                default: ''
            }
        },
        data(){
            return {
                loadin:true
            }
        },
        created() {

        },
        methods: {

        }
    };
</script>

<style scoped="">
  .container{
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .bannar-image{
    width:200;
    height:200;
  }
  .item{
    padding-top: 30px;
    padding-left: 30px;
    padding-right: 30px;
    padding-bottom: 20px;
    width: 750px;
  }
  .item-hd,.item-bd,.item-ft{
    flex-direction: row;
  }
  .flex-center{
    align-items:center;
  }
  .type{
    height:36px;
    padding-left:10px;
    padding-right:10px;
    line-height:36px;
    margin-right:20px;
    border-top-right-radius:10px;
    border-bottom-left-radius:10px;
    font-size:24px;
    color:#fff;
    background-color:#32c1d4;

  }
  .name{
    font-size: 28px;
  }
  .flex-between{
    justify-content:space-between;
  }
  .c-orange{
    color:#ff871f !important;
  }
  .num{
    font-size: 50px;
  }
  .term{
    font-size: 50px;
  }
  .percent{
    margin-left:4px;
    font-size:24px;
  }
  .term-name{
    margin-left:4px;
    font-size:24px;
  }
  .progress {
    width:50px;
    height:50px;
    line-height:50px;
    font-size:14px;
    text-align:center;
    position:relative;
    background-color:#e2e2e2;
    border-radius:50%;
  }
</style>

<template>
<div class="container">
    <scroller class="scroller" :style="{ width: '750px', height: deviceHeight + 'px' }" @loadmore="loadMoreinvests" loadmoreoffset="80">
        <refresh class="refresh-view" :display="refresh_display" @refresh="fetchInvest">
              <text v-if="(refresh_display==='hide')">↓ pull to refresh</text>
              <loading-indicator class="indicator"></loading-indicator>
          </refresh>
        <div class="header">
            <image src="http://120.25.77.23:3131/mz/images/banner.png" resize="cover" class="banner" style="width:750px; height:200px;"></image>
            <image src="http://120.25.77.23:3131/mz/images/cunguan.png" resize="cover" class="sub-banner" style="width:750px; height:220px;"></image>
        </div>

        <div class="cell" v-for="item in projects_list.list" :key="item.id" append="tree">
            <div class="item">
                <div class="item-header flex-row">
                    <text class="title flex-1">{{item.projectId}}</text>
                    <text class="status flex-1">{{item.status}}</text>
                </div>
                <div class="item-body flex-row">
                    <div class="principal flex-1">
                        <text class="main-text">{{item.rate}}%</text>
                    </div>
                    <div class="rate flex-1">
                        <div class="flex-row align-end">
                            <text class="main-text">{{item.term}}</text>
                            <text class="main-sub-text">个月</text>
                        </div>
                    </div>
                </div>
                <div class="item-footer flex-row">
                    <div class="flex-1">
                        <text class="time">{{item.minAmount}}起投，限投{{item.maxAmount}}元</text>
                    </div>
                    <div class="flex-1">
                        <text class="time" style="text-align:right;">剩余{{item.surplusAmount}}元/{{item.totalAmount}}万</text>
                    </div>
                </div>
            </div>
        </div>
        <loading class="loading-view" :display="loading_display">
            <text v-if="(loading_display==='hide')">↑ Loadmore</text>
            <loading-indicator class="indicator"></loading-indicator>
        </loading>
    </scroller>

    <AppTabBar></AppTabBar>
</div>
</template>

<script>
import {
    mapGetters,
    mapActions
} from 'vuex'

import AppTabBar from '../components/app-tabbar.vue'

module.exports = {
    components: {
        AppTabBar
    },
    data() {
        return {
            loading: false,
            refresh_display: 'hide',
            loading_display: 'hide',
            deviceHeight:0
        }
    },
    created: function() {
        this.deviceHeight = weex.config.env.deviceHeight - 228;
        this.fetchInvest();
    },
    computed: mapGetters({
        projects_list: 'projects_list'
    }),
    methods: {
        fetchInvest() {
            this.refresh_display = 'show'
            if (!this.loading) {
                this.loading = true
                this.$store.dispatch('FETCH_PROJECTS').then(() => {
                    this.loading = false
                    this.refresh_display = 'hide'
                })
            }
        },
        loadMoreinvests() {
            console.log('loadmore');
            this.loading_display = 'show'
            if (!this.loading) {
                this.loading = true
                this.$store.dispatch('LOAD_MORE_PROJECTS').then(() => {
                    this.loading = false
                    this.loading_display = 'hide'
                })
            }
        }
    }
};
</script>

<style lang="css" scoped="">
.container{
    background-color: #f2f3f7;
}
.text-center{
    text-align: center;
}
.flex-row{
    flex-direction: row;
}
.flex-1{
    flex: 1;
}
.main-text{
    font-size: 40px;
    align-items: flex-end;
}
.align-end{
    align-items: flex-end;
}
.main-sub-text{
    font-size: 28px;
    display: flex;
    margin-bottom: 8px;
}

  .item {
      padding-top: 20px;
      padding-bottom: 20px;
      padding-left: 20px;
      padding-right: 20px;
      background-color: #fff;
      margin-top: 30px;
  }
  .item-header{
      justify-content: space-between;
  }
  .item-body{
      margin-top: 30px;
      margin-bottom: 30px;
  }
  .item-footer{
       justify-content: space-between;
  }
  .status{
      text-align: right;
  }
  .time{
      font-size: 24px;
      color: #888;
  }

  .refresh-view {
   width: 750;
   height: 100;
   display: -ms-flex;
   display: -webkit-flex;
   display: flex;
   -ms-flex-align: center;
   -webkit-align-items: center;
   -webkit-box-align: center;
   align-items: center;
 }
 .loading-view {
   width: 750;
   height: 100;
   display: -ms-flex;
   display: -webkit-flex;
   display: flex;
   -ms-flex-align: center;
   -webkit-align-items: center;
   -webkit-box-align: center;
   align-items: center;
 }

 .indicator {
   height: 60;
   width: 60;
   color: #889967;
 }

 /*.indicator {
    height: 40;
    width: 40;
    color:#45b5f0;
  }*/

  .refresh-arrow {
    font-size: 30px;
    color: #45b5f0;
  }

</style>

<template>
    <div class="container">
        <Header :backShow="back" :title="title"></Header>
        <scroller class="scroller" :style="{ width: '750px', height: (clientHeight - 120) + 'px' }" @loadmore="loadMoreinvests" loadmoreoffset="80">
            <refresh class="refresh-view" :display="refreshing ? 'show' : 'hide'" @refresh="fetchInvest">
                <text v-if="(!refreshing)">↓ pull to refresh</text>
                <loading-indicator class="indicator"></loading-indicator>
            </refresh>
            <div class="header">
                <image src="http://120.25.77.23:3131/mz/images/banner.png" resize="cover" class="banner" style="width:750px; height:200px;"></image>
                <image src="http://120.25.77.23:3131/mz/images/cunguan.png" resize="cover" class="sub-banner" style="width:750px; height:220px;"></image>
            </div>
            <div class="cell" v-for="item in projects.list" :key="item.id" append="tree">
                <div class="item" @click="jump(`/project/${item.projectId}`)">
                    <div class="item-header flex-row">
                        <text class="title flex-1">{{item.projectId}}</text>
                        <text class="status flex-1">{{item.status}}</text>
                    </div>
                    <div class="item-body flex-row">
                        <div class="principal flex-1">
                            <text class="main-text">{{item.rate}}%</text>
                        </div>
                        <div class=" flex-1">
                            <div class="flex-row align-end">
                                <text class="main-text">{{item.term}}</text>
                                <text class="main-sub-text">个月</text>
                            </div>
                        </div>
                        <div class="rate">
                            <text class="rate-text">{{Math.floor(item.progress)}}%</text>
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
import Header from '../components/app-header.vue'
import AppTabBar from '../components/app-tabbar.vue'
import config from '../util/config.js'
module.exports = {
    components: {
        AppTabBar,
        Header
    },
    data() {
        return {
            title:'首页',
            back:false,
            refreshing: false,
            loading_display: 'hide'
        }
    },
    created: function() {

        this.fetchInvest();
    },
    computed: mapGetters({
        projects: 'projects',
        clientHeight:'clientHeight',
        loading:'loading'
    }),
    methods: {
        fetchInvest() {
            this.refreshing = true
            console.log(this.projects.pageNum);
            if (!this.loading) {
                this.$store.dispatch('FETCH_PROJECTS',{ pageNum:this.projects.pageNum , pageSize:this.projects.pageSize}).then(() => {
                    this.refreshing = false
                })
            }
        },
        loadMoreinvests() {
            console.log('loadmore');
            console.log(this.loading);
            this.loading_display = 'show'
            if (!this.loading) {
                this.$store.dispatch('LOAD_MORE_PROJECTS',{ pageNum:this.projects.pageNum , pageSize:this.projects.pageSize}).then(() => {
                    this.loading_display = 'hide'
                })
            }
        }
    }
};
</script>

<style lang="css" scoped="">
    .container {
        background-color: #f2f3f7;
    }

    .text-center {
        text-align: center;
    }

    .flex-row {
        flex-direction: row;
    }

    .flex-1 {
        flex: 1;
    }

    .main-text {
        font-size: 40px;
        align-items: flex-end;
    }

    .align-end {
        align-items: flex-end;
    }

    .main-sub-text {
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

    .item-header {
        justify-content: space-between;
    }

    .item-body {
        margin-top: 20px;
        margin-bottom: 20px;
        align-items: center;
    }

    .item-footer {
        justify-content: space-between;
    }

    .rate {
        border-width: 5px;
        border-style: solid;
        border-color: #32c1d4;
        border-radius: 40px;
        width: 80px;
        height: 80px;
    }

    .rate-text {
        font-size: 24px;
        text-align: center;
        align-items: center;
        color: #32c1d4;
        padding-top: 20px;
        padding-bottom: 20px;
    }

    .status {
        text-align: right;
    }

    .time {
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

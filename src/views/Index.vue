<template>
<div class="container">
    <div class="header">
        <image src="http://120.25.77.23:3131/mz/images/banner.png" resize="cover" class="banner" style="width:750px; height:200px;"></image>
        <image src="http://120.25.77.23:3131/mz/images/cunguan.png" resize="cover" class="sub-banner" style="width:750px; height:220px;"></image>
    </div>
    <div class="body">
        <text class="text">{{deviceHeight}}</text>
    </div>
    <list class="list mt30" @loadmore="loadMoreinvests" loadmoreoffset="80">
        <!-- <refresh class="refresh-view" :display="refresh_display" @refresh="fetchInvest">
            <text v-if="(refresh_display==='hide')">↓ pull to refresh</text>
            <loading-indicator class="indicator"></loading-indicator>
        </refresh> -->
        <cell class="cell" v-for="item in projects_list.list" :key="item.id" append="tree">
            <div class="item">
                 <div class="item-header flex-row">
                    <text class="text"> row  {{item.id}}</text>
                </div>
                 <div class="item-body flex-row">

                </div>
                <div class="item-footer">
                </div>
            </div>
        </cell>
        <loading class="loading-view" :display="loading_display">
             <text v-if="(loading_display==='hide')">↑ Loadmore</text>
             <loading-indicator class="indicator"></loading-indicator>
        </loading>
        <!-- <div class="loading" v-if="loading">
          <text class="loading-text">loading ...</text>
        </div> -->
    </list>
    <AppTabBar></AppTabBar>
</div>
</template>

<script>
import AppTabBar from '../components/app-tabbar.vue'
import {mapGetters, mapActions} from 'vuex'

module.exports = {
    components: {
        AppTabBar
    },
    data() {
        return {
            loading:false,
            refresh_display:'hide',
            loading_display:'hide',
            deviceHeight:0
        }
    },
    created:function () {
        console.log(weex.config.env);
        this.deviceHeight = weex.config.env.deviceHeight;
        this.fetchprojects();
    },
    computed: mapGetters({
      projects_list: 'projects_list'
    }),
    methods: {
        fetchprojects() {
            this.refresh_display = 'show'
            if(!this.loading){
                this.loading = true
                this.$store.dispatch('FETCH_PROJECTS').then(() => {
                    this.loading = false
                    this.refresh_display = 'hide'
                })
            }
        },
        loadMoreinvests(){
            console.log('loadmore');
            this.loading_display = 'show'
            if(!this.loading){
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

<style scoped="">
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.banner {
    width: 750px;
    height: 200px;
}
.sub-banner{
    width: 750px;
    height: 220px;
}
.item {
    padding-top: 30px;
    padding-left: 30px;
    padding-right: 30px;
    padding-bottom: 20px;
    width: 750px;
}

.item-hd,
.item-bd,
.item-ft {
    flex-direction: row;
}

.text{
    font-size: 30px;
    color: #333;
}
</style>

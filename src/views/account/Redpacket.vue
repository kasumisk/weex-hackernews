<template>
    <div class="container">
        <Header :title="title"></Header>
        <div class="count flex-row">
            <div class="flex-1">
                <text class="main-sub-text text-center">未使用</text>
                <text class="color-blue text-center">{{redPacket.unavailableAmount}}</text>

            </div>
            <div class="line"></div>
            <div class="flex-1">
                <text class="main-sub-text text-center">已使用</text>
                <text class="color-blue text-center">{{redPacket.availableAmount}}</text>
            </div>
        </div>
        <div class="tab border-top flex-row">
            <div class="flex-1">
                <text class="tab-nav" @click="tabChange('0')">可使用</text>
                <div class="tab-line" v-if="redPacket_tab == '0'"></div>
            </div>
            <div class="flex-1">
                <text class="tab-nav" @click="tabChange('1')">已使用</text>
                <div class="tab-line" v-if="redPacket_tab == '1'"></div>
            </div>
            <div class="flex-1" >
                <text class="tab-nav" @click="tabChange('2')">已过期</text>
                <div class="tab-line" v-if="redPacket_tab == '2'"></div>
            </div>
        </div>
        <list class="list" @loadmore="loadMoreInvests" loadmoreoffset="80">
            <!-- <refresh class="refresh-view" :display="refresh_display" @refresh="fetchInvest">
                <text v-if="(refresh_display==='hide')">↓ pull to refresh</text>
                <loading-indicator class="indicator"></loading-indicator>
            </refresh> -->
            <cell class="cell" v-for="item in redPacket.list"  append="tree">
                <div class="item">
                    <div class="item-body flex-row">
                        <div class="cash">
                            <text class="main-sub-text">¥</text>
                            <text class="main-text">{{item.amount}}</text>
                            <text class="main-sub-text">.00</text>
                        </div>
                        <div class="flex-1">
                            <text class="main-text">{{item.title}}</text>
                            <text class="main-sub-text" v-if="item.limitAmountHide"> • 投资总额 {{item.limitAmount}}元及以上可以使用</text>
                            <text class="main-sub-text" v-if="item.trem == 3"> • 投资 {{item.minTerm}}－{{item.maxTerm}}元的可以使用</text>
                            <text class="main-sub-text" v-if="item.trem == 2"> • 投资 {{item.minTerm}}元及以上可以使用</text>
                            <text class="main-sub-text" v-if="item.trem == 1"> • 投资 {{item.maxTerm}}元及以下可以使用</text>
                            <div class="flex-row">
                                <text class="main-sub-text"> 抵扣金额＝本金 x  {{item.lever}}% </text>
                                <text class="main-sub-text" v-if="item.isAnnualize == 1"> x 天数／360 </text>
                            </div>
                            <text class="main-sub-text"> 总额 {{item.totalAmount}}，{{item.timedesc}}</text>
                        </div>
                    </div>
                    <div class="item-footer">
                        <text class="time">如投资12个月项目≥10,000元可一次性用完</text>
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
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    import Header from '../../components/app-header.vue'
    module.exports = {
        components: {
            Header
        },
        data(){
            return {
                title:'我的红包',
                refresh_display:'hide',
                loading_display:'hide',
                projectStatus: 0
            }
        },
        created: function () {
            this.fetchRedPacket();
        },

        computed: mapGetters({
            redPacket: 'redPacket',
            redPacket_tab: 'redPacket_tab',
            loading: 'loading'
        }),
        methods: {
            tabChange: function (redPacket_tab) {
                if(!this.loading){
                    this.$store.dispatch('TAB_RED_PACKET_LIST',{
                        status:redPacket_tab
                    }).then(() =>{
                        this.loading_display = 'hide'
                        console.log(this.$store.getters.redPacket_tab)
                })
                }
            },
            fetchRedPacket() {
                this.refresh_display = 'show'
                if(!this.loading){
                    this.$store.dispatch('FETCH_RED_PACKET_LIST', {
                        status:this.redPacket_tab,
                        pageNum:this.redPacket.pageNum || "1",
                        pageSize:this.redPacket.pageSize || "10"
                    }).then(() => {
                        this.refresh_display = 'hide'
                        console.log(this.$store.getters.redPacket)
                })
                }
            },
            loadMoreInvests(){
                var projectStatus;
                switch (this.invests_tab){
                    case "1":
                        projectStatus = "5";
                        break;
                    case "2":
                        projectStatus = "3";
                        break;
                    default:
                        projectStatus = "";
                        break;
                }

                console.log('loadmore');
                this.loading_display = 'show'
                console.log(this.loading);
                if(!this.loading){
                    this.$store.dispatch('LOAD_MORE_INVEST_LIST',{
                        projectStatus:projectStatus,
                        invests_tab:this.invests_tab,
                        pageNum:this.invests.pageNum || "1",
                        pageSize:this.invests.pageSize || "10"
                    }).then(() => {
                        this.loading_display = 'hide'
                })
                }
            }
        }
    };
</script>
<style src="../../style/base.css"></style>
<style lang="css" scoped="">
    .count{
        padding-top: 60px;
        padding-bottom: 60px;
        background-color: #fff;
    }
    .color-blue{
        color: #32c1d4;
        font-size: 32px;
    }
    .tab{
        background-color: #fff;
    }
    .tab-nav{
        text-align: center;
        padding-top: 25px;
        padding-bottom: 25px;
    }
    .tab-line{
        height: 5px;
        background-color: #32c1d4;
        width: 100px;
        margin-left: 75px;
    }
    .main-sub-text{
        font-size: 24px;
        color: #888;
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
        margin-top: 12px;
        margin-bottom: 12px;
    }
    .cash{
        color: red;
        width: 160px;
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

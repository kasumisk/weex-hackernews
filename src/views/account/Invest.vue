<template>
  <div class="container">
      <div class="count flex-row">
          <div class="flex-1">
              <text class="main-sub-text text-center">累计已投</text>
              <text class="color-blue text-center">{{invests.totalAmount}}</text>

          </div>
          <div class="line"></div>
          <div class="flex-1">
              <text class="main-sub-text text-center">累计已赚收益</text>
              <text class="color-blue text-center">{{invests.totalInterest}}</text>
          </div>
      </div>
      <div class="tab border-top flex-row">
          <div class="flex-1">
              <text class="tab-nav" @click="jump('/invest/0')">全部</text>
              <div class="tab-line" v-if="type == 'all'"></div>
          </div>
          <div class="flex-1">
              <text class="tab-nav" @click="jump('/invest/1')">未还完</text>
              <div class="tab-line" v-if="type == 'none'"></div>
          </div>
          <div class="flex-1" >
              <text class="tab-nav" @click="jump('/invest/2')">已还完</text>
              <div class="tab-line" v-if="type == 'done'"></div>
          </div>
      </div>
      <list class="list" @loadmore="loadMoreinvests" loadmoreoffset="80">
          <!-- <refresh class="refresh-view" :display="refresh_display" @refresh="fetchInvest">
              <text v-if="(refresh_display==='hide')">↓ pull to refresh</text>
              <loading-indicator class="indicator"></loading-indicator>
          </refresh> -->
          <cell class="cell" v-for="item in invests.list" :key="item.id" append="tree">
              <div class="item">
                   <div class="item-header flex-row">
                      <text class="title flex-1">{{item.orderId}}</text>
                      <text class="status flex-1">{{item.status}}</text>
                  </div>
                   <div class="item-body flex-row">
                      <div class="principal flex-1">
                          <text class="main-sub-text">投资本金</text>
                          <text class="main-text">{{item.amount}}元</text>
                      </div>
                      <div class="rate flex-1">
                          <text class="main-sub-text">年利率</text>
                          <text class="main-text">{{item.rate}}%</text>
                      </div>
                  </div>
                  <div class="item-footer">
                      <text class="time">{{item.startDate}}起息 ~  {{item.endDate}}到期</text>
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

module.exports = {
    props: {
      type: {
        type: String,
        required: true,
        default: 'all'
      }
    },
  data(){
      return {
          refresh_display:'hide',
          loading_display:'hide'
      }
  },
  created: function () {
    this.fetchInvest();
  },
  computed: mapGetters({
    invests: 'invests',
    tab_cur: 'invest_tab_cur',
    loading: 'loading'
  }),
  methods: {
    tabChange: function (tab_cur) {
        if(!this.loading){
            this.$store.dispatch('TAB_INVESTLIST',{
                tab_cur:tab_cur
            }).then(() =>{
                this.loading_display = 'hide'
            })
        }
    },
    fetchInvest() {
        this.refresh_display = 'show'
        if(!this.loading){
            this.$store.dispatch('FETCH_INVESTLIST', {tab_cur:this.tab_cur}).then(() => {
                this.refresh_display = 'hide'
            })
        }
    },
    loadMoreinvests(){
        console.log('loadmore');
        this.loading_display = 'show'
        console.log(this.loading);
        if(!this.loading){
            this.$store.dispatch('LOAD_MORE_INVESTLIST',{tab_cur:this.tab_cur}).then(() => {
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
  .status{
      text-align: right;
  }
  .time{
      font-size: 28px;
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

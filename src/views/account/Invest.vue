<template>
  <div class="container">
      <Header :title="title"></Header>
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
              <text class="tab-nav" @click="tabChange('0')">全部</text>
              <div class="tab-line" v-if="invests_tab == '0'"></div>
          </div>
          <div class="flex-1">
              <text class="tab-nav" @click="tabChange('1')">未还完</text>
              <div class="tab-line" v-if="invests_tab == '1'"></div>
          </div>
          <div class="flex-1" >
              <text class="tab-nav" @click="tabChange('2')">已还完</text>
              <div class="tab-line" v-if="invests_tab == '2'"></div>
          </div>
      </div>
      <list class="list" @loadmore="loadMoreInvests" loadmoreoffset="80">
          <!-- <refresh class="refresh-view" :display="refresh_display" @refresh="fetchInvest">
              <text v-if="(refresh_display==='hide')">↓ pull to refresh</text>
              <loading-indicator class="indicator"></loading-indicator>
          </refresh> -->
          <cell class="cell" v-for="item in invests.list"  append="tree">
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
import Header from '../../components/app-header.vue'

module.exports = {
  components: {
      Header
  },
  data(){
      return {
          title:'项目投资',
          refresh_display:'hide',
          loading_display:'hide',
          projectStatus: 0
      }
  },
  created: function () {
      if (this.$route && this.$route.params) {
          this.status = this.$route.params.type
      }
      this.fetchInvest();
  },
  computed: mapGetters({
    invests: 'invests',
    invests_tab: 'invests_tab',
    loading: 'loading'
  }),
  methods: {
    tabChange: function (invests_tab) {
        var projectStatus;
        if(invests_tab == '1'){
            projectStatus = "5"
        }else if(invests_tab == '2'){
            projectStatus = "3"
        }else {
            projectStatus = ""
        }
        if(!this.loading){
            this.$store.dispatch('TAB_INVEST_LIST',{
                projectStatus:projectStatus,
                invests_tab:invests_tab
            }).then(() =>{
                this.loading_display = 'hide'
                console.log(this.invests)
            })
        }
    },
    fetchInvest() {
        this.refresh_display = 'show'
        if(!this.loading){
            this.$store.dispatch('FETCH_INVEST_LIST', {
                invests_tab:this.invests_tab,
                pageNum:this.invests.pageNum || "1",
                pageSize:this.invests.pageSize || "10"
            }).then(() => {
                this.refresh_display = 'hide'
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

// import Vue from 'vue'
import Router from 'vue-router'
import StoriesView from './views/StoriesView.vue'
import ArticleView from './views/ArticleView.vue'
import CommentView from './views/CommentView.vue'
import UserView from './views/UserView.vue'

//tabbar
import IndexView from './views/Index.vue'
import AccountView from './views/Account.vue'
import MoreView from './views/More.vue'
//account
import CachView from './views/account/Cash.vue'
import RechargeView from './views/account/Recharge.vue'
import InvestView from './views/account/Invest.vue'
// import RedpacketView from './views/account/Redpacket.vue'
//user
import UserRegisterView from './views/user/Register.vue'
import UserLoginView from './views/user/Login.vue'
// import UserInfoView from './views/user/Info.vue'
// depositary
import depositaryRegView from './views/depositary/Register.vue'

import webView from './views/web.vue'

Vue.use(Router)

// Story view factory
function createStoriesView (type) {
  return {
    name: `${type}-stories-view`,
    render (createElement) {
      return createElement(StoriesView, { props: { type }})
    }
  }
}
function createInvestView (type) {
  return {
    name: `${type}-stories-view`,
    render (createElement) {
      return createElement(InvestView, { props: { type }})
    }
  }
}

export default new Router({
  // mode: 'abstract',
  routes: [
    { path: '/top', component: createStoriesView('top') },
    { path: '/new', component: createStoriesView('new') },
    { path: '/show', component: createStoriesView('show') },
    { path: '/ask', component: createStoriesView('ask') },
    { path: '/job', component: createStoriesView('job') },
    { path: '/article/:url(.*)?', component: ArticleView },
    { path: '/item/:id(\\d+)', component: CommentView },
    { path: '/users/:id', component: UserView },
    // { path: '/', redirect: '/account' },
    // tabbar
    { path: '/', component: IndexView },
    { path: '/more', component: MoreView },
    { path: '/account', component: AccountView },
    { path: '/web/:url(.*)?', component: webView },
    // account
    { path: '/cach', component: CachView },
    { path: '/recharge', component: RechargeView },
    { path: '/invest/0', component: createInvestView("all") },
    { path: '/invest/1', component: createInvestView("none") },
    { path: '/invest/2', component: createInvestView("done") },
    // { path: '/redpacket', component: RedpacketView },
    // user
    { path: '/user/register', component: UserRegisterView },
    { path: '/user/login', component: UserLoginView },
    // { path: '/user/info', component: AccountView },
    // depositary
    { path: '/depositary/register', component: depositaryRegView },
  ]
})

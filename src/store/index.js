// import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions/index.js'
import mutations from './mutations/index.js'
import getters from './getters/index.js'

// Vuex is auto installed on the web
if (WXEnvironment.platform !== 'Web') {
    Vue.use(Vuex)
}

const store = new Vuex.Store({
    actions,
    mutations,
    getters,
    state: {
        activeType: null,
        login: false,
        user:{
            account: {},
            invests:{
                lists:{},
                tab_cur:0
            },
            repackets:[]
        },
        projects: {
            lists:{
                pageNum:0,
                totalPageNum:10,
                list:[]
            }
        },
        counts: {
            top: 20,
            new: 20,
            show: 15,
            ask: 15,
            job: 15
        },
        lists: {
            projects: [],
            repackets: [],
            show: [],
            ask: [],
            job: []
        }
    }
})

console.log(store);
export default store

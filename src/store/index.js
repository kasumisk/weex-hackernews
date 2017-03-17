// import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions/index.js'
import mutations from './mutations/index.js'
import getters from './getters/index.js'
import config from '../util/config.js'
// import createLogger from '../plugins/logger'

// Vuex is auto installed on the web
if (WXEnvironment.platform !== 'Web') {
    Vue.use(Vuex)
}



const debug = process.env.NODE_ENV !== 'production'


const store = new Vuex.Store({
    actions,
    mutations,
    getters,
    // strict: debug,
    // plugins: debug ? [createLogger()] : [],
    state: {
        loading: false,
        login: false,
        sessionId:'',
        user:{
            account: {},
            invests:[{
                list:[],
                pageNum:"1",
                pageSize:"20",
                totalNum:'',
                totalAmount:'0',
                totalInterest:'0'
            }],
            invests_tab: "0",
            redPacket:[]
        },
        clientHeight:config.clientHeight,
        projects: {
            list:[],
            pageNum:1,
            pageSize:10,
            totalNum:''
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
            redPacket: [],
            show: [],
            ask: [],
            job: []
        }
    }
})

export default store

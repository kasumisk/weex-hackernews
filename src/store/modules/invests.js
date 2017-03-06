import * as types from '../mutation-types'
import { fetchInvest} from '../fetch.js'

const state = {
  lists: [],
  tab_cur: 0
}

// getters
const getters = {
    invests(state){
        return state.lists
    },
    invest_tab_cur(state){
        return state.tab_cur
    }
}

// actions
const actions = {
    FETCH_INVESTLIST({commit, dispatch, state},{tab_cur}){
        return fetchInvest(tab_cur)
            .then( invests => commit("SET_INVESTLIST",{ invests }))
    },
    TAB_INVESTLIST({commit, dispatch, state},{ tab_cur }){
         commit('SET_ACTIVE_TAB',{tab_cur})
         return fetchInvest(tab_cur)
             .then( invests => commit("SET_INVESTLIST",{ invests }))
    },
    LOAD_MORE_INVESTLIST({commit, dispatch ,getters},{ tab_cur }){
        return fetchInvest(tab_cur)
            .then( invests => commit("SET_INVESTLIST",{ invests , lists:getters.invests.list }))
    }
}

// mutations
const mutations = {
    SET_INVESTLIST(state , { invests , lists}) {
        if(lists){
            state.lists.list = state.lists.list.concat(invests.list)
        }else {
            state.lists = invests
        }
    },
    SET_ACTIVE_TAB(state,{ tab_cur }){
        state.tab_cur = tab_cur
    }

}

export default {
  state,
  getters,
  actions,
  mutations
}

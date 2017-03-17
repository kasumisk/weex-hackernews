import { fetchInvest } from '../fetch'

export function FETCH_INVEST_LIST({commit, dispatch, state},{pageNum,pageSize,invests_tab}) {
    return fetchInvest({ commit },{pageNum,pageSize})
        .then( invests => commit("SET_INVEST_LIST",{ invests , invests_tab}))
        // .then(() => dispatch(''))
}


export function TAB_INVEST_LIST({commit, dispatch, state},{pageNum,pageSize,projectStatus,invests_tab}){
     commit('SET_ACTIVE_TAB',{invests_tab})
     if(!state.user.invests[invests_tab]){
         return fetchInvest({ commit },{pageNum,pageSize,projectStatus})
             .then( invests => commit("SET_INVEST_LIST",{ invests ,invests_tab}))
             .then(() => dispatch('TAB_INVEST_LIST',{invests_tab,projectStatus}))
     }
}

export function LOAD_MORE_INVEST_LIST({commit, dispatch ,getters},{pageNum,pageSize,projectStatus}){
    return fetchInvest({ commit },{pageNum,pageSize,projectStatus})
        .then( invests => commit("SET_INVEST_LIST",{ invests ,projectStatus, lists:getters.invests.list }))
}

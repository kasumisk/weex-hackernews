import { fetchInvest } from '../fetch'

export function FETCH_INVESTLIST({commit, dispatch, state},{}) {
    return fetchInvest({ commit })
        .then( invests => commit("SET_INVESTLIST",{ invests }))
        // .then(() => dispatch(''))
}


export function TAB_INVESTLIST({commit, dispatch, state},{ tab_cur }){
     commit('SET_ACTIVE_TAB',{tab_cur})
     return fetchInvest({ commit })
         .then( invests => commit("SET_INVESTLIST",{ invests }))
}

export function LOAD_MORE_INVESTLIST({commit, dispatch ,getters},{ tab_cur }){
    return fetchInvest({ commit })
        .then( invests => commit("SET_INVESTLIST",{ invests , lists:getters.invests.list }))
}

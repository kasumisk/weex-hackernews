import { fetchInvest ,fetchAccount , fetchRedPacket} from '../fetch'


//账户信息
export function FETCH_ACCOUNT({commit, state}) {
    return fetchAccount({ commit })
        .then( account => commit("SET_ACCOUNT",{ account }))
}

//项目投资
export function FETCH_INVEST_LIST({commit, dispatch, state},{pageNum,pageSize,invests_tab}) {
    return fetchInvest({ commit },{pageNum,pageSize})
        .then( invests => commit("SET_INVEST_LIST",{ invests , invests_tab}))
}


export function TAB_INVEST_LIST({commit, state},{pageNum,pageSize,projectStatus,invests_tab}){
    if(!state.user.invests[invests_tab]){
        return fetchInvest({ commit },{pageNum,pageSize,projectStatus})
            .then( invests => commit("SET_INVEST_LIST",{ invests ,invests_tab}))
            .then(() => commit('SET_ACTIVE_INVEST_TAB',{invests_tab}))
    }else {
        commit('SET_ACTIVE_INVEST_TAB',{invests_tab})
    }
}

export function LOAD_MORE_INVEST_LIST({commit ,getters},{pageNum,pageSize,projectStatus}){
    return fetchInvest({ commit },{pageNum,pageSize,projectStatus})
        .then( invests => commit("SET_INVEST_LIST",{ invests ,projectStatus, lists:getters.invests.list }))
}

//红包
export function FETCH_RED_PACKET_LIST({commit, state},{pageNum,pageSize,status}) {
    return fetchRedPacket({ commit },{pageNum, pageSize ,status})
        .then( redPacket => commit("SET_RED_PACKET_LIST",{ redPacket , status}))
}


export function TAB_RED_PACKET_LIST({commit, state},{pageNum,pageSize,status}){
    
    if(!state.user.redPacket[status]){
        return fetchRedPacket({ commit },{pageNum,pageSize,status})
            .then( redPacket => commit("SET_RED_PACKET_LIST",{ redPacket ,status}))
            .then(() => commit('SET_ACTIVE_RED_PACKET_TAB',{status}))
    }else {
        commit('SET_ACTIVE_RED_PACKET_TAB',{status})
    }
}


//账户
export function account(state) {
    return state.login
        ? state.user.account
        : {}
}
//项目投资

export function invests(state){
    if(!state.user.invests[state.user.invests_tab]){
        state.user.invests[state.user.invests_tab] = Object.assign({},state.user.invests[0])
    }
    return state.user.invests[state.user.invests_tab]
}

export function invests_tab(state){
    return state.user.invests_tab
}


//红包

export function redPacket(state){
    if(!state.user.redPacket[state.user.redPacket_tab]){
        state.user.redPacket[state.user.redPacket_tab] = Object.assign({},state.user.redPacket[0])
    }
    return state.user.redPacket[state.user.redPacket_tab]
}

export function redPacket_tab(state){
    return state.user.redPacket_tab
}

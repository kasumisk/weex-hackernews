
//账户
export function SET_ACCOUNT(state , { account }) {
    if(account.code === '0000'){
        state.user.account = account.data
        state.login = true
    }else {
        state.login = false;
    }
}

//项目投资
export function SET_INVEST_LIST(state , { invests ,invests_tab, lists}) {
    state.user.invests_tab = invests_tab;

    if(invests.code === '0000') {
        if(!state.user.invests[state.user.invests_tab]){
            state.user.invests[state.user.invests_tab] = {};
        }
        if (lists) {
            console.log( state.user.invests[state.user.invests_tab])
            state.user.invests[state.user.invests_tab].list = lists.concat(invests.data.list)
            state.user.invests[state.user.invests_tab].pageNum += 1
        } else {
            console.log(state.user.invests_tab)
            state.user.invests[state.user.invests_tab].list = invests.data.list
            state.user.invests[state.user.invests_tab].pageNum = 1
        }
        state.user.invests[state.user.invests_tab].totalAmount = invests.data.totalAmount
        state.user.invests[state.user.invests_tab].totalInterest = invests.data.totalInterest

    }
}

export function SET_ACTIVE_INVEST_TAB(state,{ invests_tab }){
    state.user.invests_tab = invests_tab || "0"
}

//红包

export function SET_RED_PACKET_LIST(state , { redPacket ,status, lists}) {
    state.user.redPacket_tab = status;

    if(redPacket.code === '0000') {
        if(!state.user.redPacket[state.user.redPacket_tab]){
            state.user.redPacket[state.user.redPacket_tab] = {};
        }
        if (lists) {
            console.log( state.user.redPacket[state.user.redPacket_tab])
            state.user.redPacket[state.user.redPacket_tab].list = lists.concat(redPacket.data.list)
            state.user.redPacket[state.user.redPacket_tab].pageNum += 1
        } else {
            console.log(state.user.redPacket_tab)
            state.user.redPacket[state.user.redPacket_tab].list = redPacket.data.list
            state.user.redPacket[state.user.redPacket_tab].pageNum = 1
        }
        state.user.redPacket[state.user.redPacket_tab].availableAmount = redPacket.data.availableAmount
        state.user.redPacket[state.user.redPacket_tab].unavailableAmount = redPacket.data.unavailableAmount

    }
}


export function SET_ACTIVE_RED_PACKET_TAB(state,{ status }){
    state.user.redPacket_tab = status || "0"
}



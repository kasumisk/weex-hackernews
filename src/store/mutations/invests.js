export function SET_INVEST_LIST(state , { invests ,invests_tab, lists}) {
    console.log(invests)
    state.user.invests_tab = invests_tab;

    if(invests.code === '0000') {
        if(!state.user.invests[state.user.invests_tab]){
            state.user.invests[state.user.invests_tab] = new Object();
        }
        if (lists) {
            state.user.invests[state.user.invests_tab].list = state.user.invests.list.concat(invests.data.list)
        } else {
            console.log(state.user.invests_tab)
            state.user.invests[state.user.invests_tab].list = invests.data.list
        }
        state.user.invests[state.user.invests_tab].totalAmount = invests.data.totalAmount
        state.user.invests[state.user.invests_tab].totalInterest = invests.data.totalInterest

        console.log(state.user.invests)
    }
}

export function SET_ACTIVE_TAB(state,{ invests_tab }){
    state.user.invests_tab = invests_tab || "0"
    console.log(state.user.invests_tab)
}

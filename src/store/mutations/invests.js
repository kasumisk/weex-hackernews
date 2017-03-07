export function SET_INVESTLIST(state , { invests , lists}) {
    if(lists){
        console.log(state);
        state.user.invests.lists.list = state.user.invests.lists.list.concat(invests.list)
    }else {
        state.user.invests.lists = invests
    }
}

export function SET_ACTIVE_TAB(state,{ tab_cur }){
    state.user.invests.tab_cur = tab_cur
    state.user.invests.lists.list = []
}

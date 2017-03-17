export function invests(state){
    if(!state.user.invests[state.user.invests_tab]){
        state.user.invests[state.user.invests_tab] = Object.assign({},state.user.invests[0])
    }
    return state.user.invests[state.user.invests_tab]
}

export function invests_tab(state){
    return state.user.invests_tab
}

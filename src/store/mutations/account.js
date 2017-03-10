export function SET_ACCOUNT(state , { account }) {
    if(account.code === '0000'){
        state.user.account = account.data
        state.login = true
    }
}

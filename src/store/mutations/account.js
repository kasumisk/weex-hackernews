export function SET_ACCOUNT(state , { account }) {
    state.user.account = account
    state.login = true
}

export function account(state) {
    return state.login
        ? state.user.account
        : {}
}

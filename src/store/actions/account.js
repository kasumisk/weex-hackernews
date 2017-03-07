import { fetchAccount } from '../fetch'


export function FETCH_ACCOUNT({commit, dispatch, state},{}) {
    return fetchAccount()
        .then( account => commit("SET_ACCOUNT",{ account }))
        // .then(() => dispatch(''))
}

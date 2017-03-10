import { fetchAccount } from '../fetch'


export function FETCH_ACCOUNT({commit, dispatch, state},{sessionId}) {
    return fetchAccount({ commit , sessionId})
        .then( account => commit("SET_ACCOUNT",{ account }))
        // .then(() => dispatch(''))
}

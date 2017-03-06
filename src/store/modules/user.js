import * as types from '../mutation-types'
import { fetchAccount } from '../fetch.js'
// initial state
// shape: [{ id, quantity }]
const state = {
  account: {},
  login: false
}

// getters
const getters = {
    account(state) {
        return state.login
            ? state.account
            : {}
    }
}

// actions
const actions = {
    FETCH_ACCOUNT({commit, dispatch, state},{}) {
        return fetchAccount()
            .then( account => commit("SET_ACCOUNT",{ account }))
            // .then(() => dispatch(''))
    }
}

// mutations
const mutations = {
    SET_ACCOUNT(state , { account }) {
        state.account = account
        state.login = true
    }
}

export default {
  state,
  getters,
  actions,
  mutations
}

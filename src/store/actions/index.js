import * as account from './account.js'
import * as invests from './invests.js'
import * as projects from './projects.js'
import {fetch_login} from '../fetch.js'

const total = {
    LOGIN_ACTION({commit, state},{userName,password}){
        return fetch_login({ commit },{userName,password})
            .then( reslogin => commit("SET_LOGIN_STATUS",{ reslogin }))
    }
}

const actions = Object.assign({}, total, account, invests , projects);

export default actions

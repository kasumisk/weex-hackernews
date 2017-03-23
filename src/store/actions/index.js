import * as user from './user.js'
import * as projects from './projects.js'
import {login} from '../fetch.js'

const total = {
    LOGIN_ACTION({commit, state},{userName,password}){
        return login({ commit },{userName,password})
            .then( login_res => commit("SET_LOGIN_STATUS",{ login_res }))
    }
}

const actions = Object.assign({}, total, user , projects);

export default actions

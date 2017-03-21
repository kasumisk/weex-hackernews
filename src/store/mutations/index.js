import * as user from './user.js'
import * as projects from './projects.js'
import util from '../../util/util.js'
import {login_message} from '../../util/toast'


const total = {
    START_LOADING (state ) {
        state.loading = true
    },
    FINISH_LOADING(state ){
        state.loading = false
    },
    SET_LOGIN_STATUS(state,{login_res}){
        if(login_res.code === '0000'){
            state.login = true
            state.sessionId = login_res.data.sessionId
            util.setLocationStorage('sessionId',login_res.data.sessionId)
        }else {
            login_message(login_res)
        }
    }
}

const mutations = Object.assign({}, total, user ,projects);

export default mutations

import * as account from './account.js'
import * as invests from './invests.js'
import * as projects from './projects.js'
import util from '../../util/util.js'


const total = {
    START_LOADING (state ) {
        state.loading = true
    },
    FINISH_LOADING(state ){
        state.loading = false
    },
    SET_LOGIN_STATUS(state,{reslogin}){
        if(reslogin.code === '0000'){
            state.login = true
            state.sessionId = reslogin.data.sessionId
            util.setLocationStorage('sessionId',reslogin.data.sessionId)
        }
    }
}

const mutations = Object.assign({}, total, account, invests ,projects);

export default mutations

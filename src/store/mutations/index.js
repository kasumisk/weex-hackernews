import * as account from './account.js'
import * as invests from './invests.js'
import * as projects from './projects.js'


const total = {
    START_LOADING (state ) {
        state.loading = true
    },
    FINISH_LOADING(state ){
        state.loading = false
    }
}

const mutations = Object.assign({}, total, account, invests ,projects);

export default mutations

import * as account from './account.js'
import * as invests from './invests.js'
import * as projects from './projects.js'

const total = {
    clientHeight:function (state) {
        return state.clientHeight;
    }
}


const getters = Object.assign({}, total,account, invests, projects);

export default getters

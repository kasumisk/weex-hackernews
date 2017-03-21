import * as user from './user.js'
import * as projects from './projects.js'



const total = {
    clientHeight(state) {
        return state.clientHeight;
    },
    loading (state) {
        return state.loading;
    },
    loginStatus(state){
        return state.login
    }
}

const getters = Object.assign({}, total,user, projects);

export default getters

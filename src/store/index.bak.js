import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import * as mutations from './mutations'
import invests from './modules/invests.js'
import projects from './modules/projects.js'
import user from './modules/user.js'
// import createLogger from '../plugins/logger'


// Vuex is auto installed on the web
if (WXEnvironment.platform !== 'Web') {
    Vue.use(Vuex)
}

const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
  actions,
  getters,
  mutations,
  state:{
      
  },
  modules: {
    user,
    projects,
    invests
  },
  // strict: debug,
  // plugins: debug ? [createLogger()] : []
})

export default store

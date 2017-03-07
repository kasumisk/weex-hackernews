import * as account from './account.js'
import * as invests from './invests.js'
import * as projects from './projects.js'

const getters = Object.assign({}, account, invests, projects);

export default getters

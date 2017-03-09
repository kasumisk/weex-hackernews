import { fetchprojects } from '../fetch'

export function FETCH_PROJECTS({commit, dispatch, state}) {
    return fetchprojects({ commit })
        .then( projects => commit("SET_PROJECTSLIST",{ projects }))
        // .then(() => dispatch(''))
}


export function LOAD_MORE_PROJECTS({commit, dispatch ,getters}){
    return fetchprojects({ commit })
        .then( projects => commit("SET_PROJECTSLIST",{ projects , lists:getters.projects_list.list }))
}

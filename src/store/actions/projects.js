import { fetchprojects } from '../fetch'

export function FETCH_PROJECTS({commit, dispatch, state},{pageNum,pageSize}) {
    return fetchprojects({ commit },{pageNum,pageSize})
        .then( projects => commit("SET_PROJECTSLIST",{ projects }))
        // .then(() => dispatch(''))
}


export function LOAD_MORE_PROJECTS({commit, dispatch ,getters},{ pageNum , pageSize}){
    return fetchprojects({ commit },{pageNum,pageSize})
        .then( projects => commit("SET_PROJECTSLIST",{ projects , lists:getters.projects.list }))
}

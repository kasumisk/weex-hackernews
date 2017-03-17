import { fetch_projects } from '../fetch'

export function FETCH_PROJECTS({commit, dispatch, state},{pageNum,pageSize}) {
    return fetch_projects({ commit },{pageNum,pageSize})
        .then( projects => commit("SET_PROJECT_LIST",{ projects }))
        // .then(() => dispatch(''))
}


export function LOAD_MORE_PROJECTS({commit, dispatch ,getters},{ pageNum , pageSize}){
    return fetch_projects({ commit },{pageNum,pageSize})
        .then( projects => commit("SET_PROJECT_LIST",{ projects , lists:getters.projects.list }))
}

import { fetchProjects , fetchProject} from '../fetch'

export function FETCH_PROJECTS({commit},{ pageNum,pageSize}) {
    return fetchProjects({ commit },{ pageNum,pageSize})
        .then( projects => commit("SET_PROJECT_LIST",{ projects }))
}


export function LOAD_MORE_PROJECTS({commit ,getters},{ pageNum , pageSize}){
    return fetchProjects({ commit },{pageNum,pageSize})
        .then( projects => commit("SET_PROJECT_LIST",{ projects , lists:getters.projects.list }))
}


export function FETCH_PROJECT({commit},{ projectId }) {
    return fetchProject({ commit },{ projectId })
        .then( project => commit("SET_PROJECT",{ project }))
}


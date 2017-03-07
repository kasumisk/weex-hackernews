export function SET_PROJECTSLIST(state , { projects , lists}) {
    if(lists){
        state.projects.lists.list = state.projects.lists.list.concat(projects.list)
    }else {
        state.projects.lists = projects
    }
}

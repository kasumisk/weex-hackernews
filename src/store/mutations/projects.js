export function SET_PROJECTSLIST(state , { projects , lists}) {
    console.log(projects);
    if(projects.code === '0000'){
        if(lists){
            state.projects.pageNum ++
            state.projects.totalNum == projects.data.totalNum
            state.projects.totalPage == projects.data.totalPage
            state.projects.list = state.projects.list.concat(projects.data.list)
        }else {
            state.projects.pageNum = 1
            state.projects.list = projects.data.list
            console.log(state.projects.list);
        }
    }

}

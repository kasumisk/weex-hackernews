export function SET_PROJECT_LIST(state , { projects , lists}) {
    if(projects.code === '0000'){
        if(lists){
            state.projects.pageNum ++
            state.projects.totalNum == projects.data.totalNum
            state.projects.totalPage == projects.data.totalPage
            state.projects.list = state.projects.list.concat(projects.data.list)
        }else {
            state.projects.pageNum = 1
            state.projects.list = projects.data.list
        }
    }

}

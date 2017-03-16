const stream = weex.requireModule('stream')
const baseURL = 'http://192.168.2.113:1337/dist/json'

import qs from 'querystring'
import { Encrypt , config} from '../util/util.js'

const defaultParams = {
    v: '1.0',
    bizContent: {}
}

//
// export function fetch ({path , params , commit}) {
//   return new Promise((resolve, reject) => {
//           commit('START_LOADING');
//           stream.fetch({
//             method: 'get',
//             url: `${baseURL}/${path}.json`,
//             headers: {'Content-Type':'application/x-www-form-urlencoded'},
//             // headers: {'Content-Type':'application/json'},
//             // url: config.api,
//             type: 'json',
//             // body:body
//           }, (response) => {
//               console.log(response);
//               setTimeout(function () {
//                   commit('FINISH_LOADING');
//                   if (response.status == 200) {
//                       resolve(response.data)
//                   }else {
//                     reject(response)
//                   }
//               },2000)
//           }, () => {})
//   })
// }
//
export function fetch ({path , params , commit}) {
   return new Promise((resolve, reject) => {
       Encrypt(params,(res) => {
           let body = qs.stringify(res)
           commit('START_LOADING');
           stream.fetch({
             method: 'POST',
           //   url: `${baseURL}/${path}.json`,
             headers: {'Content-Type':'application/x-www-form-urlencoded'},
           //   headers: {'Content-Type':'application/json'},
             url: config.api,
             type: 'json',
             body:body
           }, (response) => {
               console.log(response);
               setTimeout(function () {
                   commit('FINISH_LOADING');
                   if (response.status == 200) {
                       resolve(response.data)
                   }else {
                     reject(response)
                   }
               },2000)
           }, () => {})
       })
   })
 }

export function fetchIdsByType (type) {
  return fetch(`${type}stories`)
}

export function fetchItem (id) {
  return fetch(`item/${id}`)
}

export function fetchItems (ids) {
  return Promise.all(ids.map(id => fetchItem(id)))
}

export function fetchUser (id) {
  return fetch(`user/${id}`)
}


//发起请求

export function fetchAccount({commit,sessionId}) {
    let params = {
            method: 'user.investorAccount',
            v: '1.0',
            bizContent: {}
        };
    return fetch({path:`investorAccount`,params,commit})
}

export function fetchInvest({commit}) {
    return fetch({path:`investList`,commit})
}

export function fetchprojects({commit},{pageNum,pageSize}){
    let params = {
            method: 'general.projectsList',
            v: '1.0',
            bizContent: {
                pageNum: pageNum,
                pageSize: pageSize,
            }
        }
    return fetch({path:`projects`,params,commit})
}


export function fetch_login({commit},{userName,password}) {
    let params = {
                method: 'user.login',
                v: '1.0',
                bizContent: {
                    'userName': userName,
                    'password': password
                }
            }
            console.log('用户名',userName);
            console.log('密码',password);
    return fetch({path:`investList`,params,commit})
}

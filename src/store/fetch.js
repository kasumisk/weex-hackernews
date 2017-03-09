const stream = weex.requireModule('stream')
const baseURL = 'http://192.168.2.113:1337/dist/json'

import { Encrypt } from '../util/util.js'
import config from '../util/config.js'


export function fetch ({path , params , commit}) {
  // let body = JSON.parse(Encrypt(params))
  // let body = Encrypt(params)
  // console.log(typeof body);
  return new Promise((resolve, reject) => {
    commit('START_LOADING');
    stream.fetch({
      method: 'get',
      url: `${baseURL}/${path}.json`,
    //   headers: {'Content-Type':'application/x-www-form-urlencoded'},
    //   headers: {'Content-Type':'application/json'},
    //   url: config.api,
      type: 'json',
    //   body:body
    }, (response) => {
        setTimeout(function () {
            commit('FINISH_LOADING');
            if (response.status == 200) {
                console.log(response);
                resolve(response.data)

            }else {
              reject(response)
            }
        },2000)
    }, () => {})
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

export function fetchAccount({commit}) {
    return fetch({path:`investorAccount`,commit})
}

export function fetchInvest({commit}) {
    return fetch({path:`investList`,commit})
}

export function fetchprojects({commit}){
    let postData = {
            method: 'general.projectsList',
            v: '1.0',
            bizContent: {
                pageNum: 1,
                pageSize: 10,
            }
        }
    return fetch({path:`projects`,params:postData,commit})
}

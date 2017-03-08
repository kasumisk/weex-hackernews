const stream = weex.requireModule('stream')
const baseURL = 'http://192.168.2.113:1337/dist/json'

import { Encrypt } from '../util/util.js'
import config from '../util/config.js'


export function fetch (path , params) {
  // let body = JSON.stringify(Encrypt(params))
  // let body = Encrypt(params)

  return new Promise((resolve, reject) => {
    stream.fetch({
      method: 'GET',
      url: `${baseURL}/${path}.json`,
    //   url: config.api,
      type: 'json',
    //   body:body
    }, (response) => {
      if (response.status == 200) {
          console.log(response);
          setTimeout(function () {
              resolve(response.data)
          },2000)
      }
      else {
        reject(response)
      }
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

export function fetchAccount() {
    return fetch(`investorAccount`)
}

export function fetchInvest() {
    return fetch(`investList`)
}

export function fetchprojects(){
    // let postData = {
    //         method: 'general.projectsList',
    //         v: '1.0',
    //         bizContent: {
    //             pageNum: 1,
    //             pageSize: 10,
    //         }
    //     }
    return fetch(`projects`)
}

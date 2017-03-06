const stream = weex.requireModule('stream')
const baseURL = 'http://192.168.2.113:1337/dist/json'

export function fetch (path) {
  return new Promise((resolve, reject) => {
    stream.fetch({
      method: 'GET',
      url: `${baseURL}/${path}.json`,
      type: 'json'
    }, (response) => {
      if (response.status == 200) {
          console.log(`${baseURL}/${path}.json`);
          console.log(response.data);
        resolve(response.data)
      }
      else {
          console.log("222");
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

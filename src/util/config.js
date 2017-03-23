


let config =  {
    env:'dev',
    resouce:'http://192.168.2.113:1337/dist/',
    clientHeight: (function () {
        const env = weex.config.env || WXEnvironment
        var clientHeight;
        // open a new window (tab) on the web
        if (env.platform === 'Web') {
              clientHeight = weex.config.env.deviceHeight - 96
          }else {
              clientHeight = weex.config.env.deviceHeight - 100
          }
          return clientHeight;

    })(),
    // api: "http://192.168.2.113:4000/testpost"
    api: "http://121.196.208.139/api"
}



export default config

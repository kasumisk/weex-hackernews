export default {
  methods: {
    jump (to) {
      if (this.$router) {
        this.$router.push(to)
      }
    },
    getEnv(){
        console.log(WXEnvironment.platform);
        if(WXEnvironment.platform === 'Web'){
            // weex.config.env.deviceHeight = document.body.clientHeight;
        }
        return weex.config.env

    }
  }
}

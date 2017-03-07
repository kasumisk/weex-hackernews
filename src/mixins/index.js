export default {
  methods: {
    jump (to) {
      if (this.$router) {
        this.$router.push(to)
      }
    },
    getdeviceHeight(){
        console.log(WXEnvironment.platform);
        if(WXEnvironment.platform === 'Web'){
            console.log(document.body.offsetHeight);
            return document.body.offsetHeight
        }
        return weex.config.env.deviceHeight

    }
  }
}

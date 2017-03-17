export default {
    methods: {
        /**
         * $goTo  $back   $goTo  为weex-vue-navigator方法 解决app页面切换问题
         * $router.push() 为vue-router方法
         */
        jump (url) {
            this.$goTo(url);
            //   if (this.$router) {
            //   this.$router.push(to)
            // }
        },
        back() {
            this.$back()
        },
        jumpOnSelf(url) {
            this.$goTo(url, true)
        },
        getdeviceHeight(){
            console.log(WXEnvironment.platform);
            if (WXEnvironment.platform === 'Web') {
                console.log(document.body.offsetHeight);
                return document.body.offsetHeight
            }
            return weex.config.env.deviceHeight

        }
    }
}

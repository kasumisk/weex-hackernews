<template>
  <div class="flex-row app-header">
    <div class="back" @click="back">
      <image class="back" src="http://192.168.2.113:1337/dist/images/leftArrow.png"  resize="contain"></image>
    </div>
    <div class="flex-1">
       <text class="title">{{title}}</text>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        default: ''
      }
    },
    created () {
      console.log(this.title)
    },
    methods: {
      back: function () {
        this.$router.back()
      }
    }
  }
</script>
<!--<style src="../style/base.css"></style>-->
<style>
  .flex-row{
    flex-direction: row;
  }
  .flex-1{
    flex: 1;
  }
  .app-header{
    padding-top: 40px;
    background-color: #32c1d4;
    height:120px;
    align-items: center;
    padding-left: 30px;
    padding-right: 30px;
  }
  .back{
    width: 40px;
    height:40px;
  }
  .title{
    color: #fff;
    font-size: 36px;
    text-align: center;
  }

</style>

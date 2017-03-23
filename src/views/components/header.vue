<template>
    <div class="flex-row header">
        <div class="go-back">
            <image class="back-icon" @click="back" src="http://192.168.2.113:1337/dist/images/leftArrow.png" class="icon" resize="contain"></image>
        </div>
        <div class="flex-1">{{title}}</div>
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
        methods: {
            back: function () {
                this.$router.back()
            }
        }
    }
</script>

<style>
    .header{
        background-color: #32c1d4;
        height:80px;
    }
    .go-back{
        width: 40px;
        height:40px;
    }

</style>

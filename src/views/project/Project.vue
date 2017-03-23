<template>
    <div class="container">
        <Header :title="title"></Header>
        <div class="bgc-white wrap">
            <div class="just-space flex-row" style="margin-top: 30px; ">
                <text class="org-color font56">{{project.rate}}%</text>
                <text class="font42">{{project.term}}个月</text>
            </div>
            <div class="progress flex-row">
                <div class="progress-bar" :style="{width: (project.progress*690/100) + 'px'}"></div>
            </div>
            <div class="just-space flex-row">
                <text class="main-sub-text">500起投</text>
                <text class="main-sub-text">剩余{{project.surplusAmount}}元/{{project.totalAmount}}</text>
            </div>
            <div class="flex-row" style="margin-bottom: 24px;">
                <image src="http://192.168.2.113:1337/dist/images/icon1.png" class="icon" resize="contain"></image>
                <text class="main-sub-text space-right gray-color">气球贷</text>
                <image src="http://192.168.2.113:1337/dist/images/icon1.png" class="icon" resize="contain"></image>
                <text class="main-sub-text space-right gray-color">支持提前还款</text>
            </div>
        </div>
        <div class="bgc-white wrap mt30">
            <div class="flex-row"  style="margin-top: 26px;">
                <text class="main-sub-text">账户余额：{{account.surplusAmount}}元</text>
                <text class="blue-color" style="margin-left: 50px;">充值</text>
            </div>
            <div class="flex-row" style="margin-bottom: 20px; margin-top: 20px;">
                <input  class="input-text" type="text"  placeholder="起投金额500元" />
                <image src="http://192.168.2.113:1337/dist/images/icon2.png" class="rmb" resize="contain"></image>
                <text class="invest-button">全投</text>
                <div class="invest">
                    <text class="invest-text">立即投资</text>
                </div>
            </div>
            <div class="flex-row">
                <text class="main-sub-text">预期收益：</text>
                <text class="main-sub-text org-color">0.0</text>
                <text class="main-sub-text">元</text>
            </div>
            <div class="flex-row just-space">
                <div class="flex-row">
                    <text class="main-sub-text">可用红包：</text>
                    <text class="main-sub-text org-color">0.0</text>
                    <text class="main-sub-text">元红包</text>
                </div>
                <div class="flex-row">
                    <text class="main-sub-text gray-color">暂无可用红包</text>
                </div>
            </div>
            <div class="flex-row" style="margin-bottom: 26px;">
                <text class="gray-color" style="font-size: 24px;">市场有风险，投资需谨慎</text>
            </div>
        </div>
        <div class="flex-row wrap" style="height: 86px;">
            <image src="http://192.168.2.113:1337/dist/images/icon3.png" class="icon" resize="contain"></image>
            <text class="main-sub-text">我同意</text>
            <text class="main-sub-text blue-color">《借款协议》</text>
        </div>
        <div class="bgc-white wrap">
            <div class="cell-item justify-space">
                <div class="cell-grow">
                    <image src="http://192.168.2.113:1337/dist/images/icons-detail_01.png" class="project-cell-icon" resize="contain"></image>
                </div>
                <div class="flex-1">
                    <text class="text">项目信息</text>
                </div>
                <div class="arrow-right">
                    <image src="http://192.168.2.113:1337/dist/images/rightArrow.png" class="arrow-right"
                           resize="contain"></image>
                </div>
            </div>
            <div class="cell-item justify-space">
                <div class="cell-grow">
                    <image src="http://192.168.2.113:1337/dist/images/icons-detail_03.png" class="project-cell-icon" resize="contain"></image>
                </div>
                <div class="flex-1">
                    <text class="text">项目投资记录</text>
                </div>
                <div class="arrow-right">
                    <image src="http://192.168.2.113:1337/dist/images/rightArrow.png" class="arrow-right"
                           resize="contain"></image>
                </div>
            </div>
            <div class="cell-item justify-space">
                <div class="cell-grow">
                    <image src="http://192.168.2.113:1337/dist/images/icons-detail_05.png" class="project-cell-icon" resize="contain"></image>
                </div>
                <div class="flex-1">
                    <text class="text">风控信息</text>
                </div>
                <div class="arrow-right">
                    <image src="http://192.168.2.113:1337/dist/images/rightArrow.png" class="arrow-right"
                           resize="contain"></image>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {
            mapGetters,
            mapActions
    } from 'vuex'

    import Header from '../../components/app-header.vue'

    export default {
        components: {
            Header
        },
         props: {
             id: {
                 type: String,
                 default: ''
             }
         },
        data() {
            return {
                title:'投资项目',
                default: 0,
                refreshing: false
            }
        },
        computed: mapGetters({
            project: 'project',
            account: 'account'
        }),
        created() {
            if(this.id){
                //获取项目详情
                console.log(this.id)
                this.fetchProject(this.id);

            }else {
                this.$router.push('/')
            }
        },
        methods: {
            fetchProject(projectId){
                if (!this.loading) {
                    this.$store.dispatch('FETCH_PROJECT',{ projectId:projectId}).then(() => {
                        console.log('done',this.project)
                        this.fetchAccount();
                    })
                }
            },
            fetchAccount() {
                if(!this.loading ){
                    this.$store.dispatch('FETCH_ACCOUNT').then(() => {
                        if(!this.$store.getters.loginStatus){
                            this.$router.push('/user/login')
                         }
                    })
                }
            }
        }
    };
</script>


<style src="../../style/base.css"></style>
<style >

    .wrap {
        padding-right: 30px;
        padding-left: 30px;
    }

    .flex-row {
        align-items: center;
        flex-direction: row;
    }

    .font42 {
        font-size: 42px;
    }
    .font56{
        font-size: 56px;
    }

    .progress {
        background-color: #ebecf0;
        height: 10px;
        border-radius: 5px;
        margin-bottom: 26px;
        margin-top: 26px;
    }

    .progress-bar {
        position: absolute;
        top: 0;
        left: 0;
        background-color: #32c1d4;
        height: 10px;
        border-radius: 5px;
    }
    .space-right{
        margin-right: 20px;
    }
    .blue-color {
        color: #32c1d4;
    }
    .gray-color{
        color:#b9b9b9;
    }
    .input-text{
        border-width:1px;
        border-style: solid;
        border-color: #cccccc;
        border-radius: 10px;
        width:490px;
        padding-left: 75px;
        padding-top: 26px;
        padding-bottom: 26px;
    }
    .invest{
        background-color: #32c1d4;
        margin-left: 20px;
        width: 180px;
        border-radius: 10px;
        padding-top: 26px;
        padding-bottom: 26px;
    }
    .invest-text{
        font-size: 28px;
        color: #fff;
        text-align: center;
    }
    .rmb{
        position: absolute;
        top:22px;
        left:20px;
        width: 40px;
        height:40px;
    }
    .invest-button{
        position: absolute;
        left:396px;
        top:24px;
        color: #32c1d4;
    }
    .main-sub-text {
        margin-top: 10px;
        margin-bottom: 10px;
        font-size: 28px;
    }
    .cell-item{
        height:98px;
        flex-direction: row;
        align-items: center;
        border-bottom-color: #ddd;
        border-bottom-width: 1px;
        border-bottom-style: solid;
    }
    .cell-grow{
        width: 60px;
    }
    .project-cell-icon{
        width: 42px;
        height:42px;
    }
    .arrow-right{
        width: 40px;
        height:40px;
    }
    .icon {
        width: 26px;
        height: 26px;
        margin-right: 10px;
    }
</style>
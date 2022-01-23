<template>
    <div class="sidebar box-shadow-dashboard" v-if="!mobileView">
        <div>
            <ul class="flex flex-col gap-y-8 pl-6 pt-12 pb-6 border-bottom">
                <li v-for="(menu,index) in menus" :key="index">
                    <Menu :showItems="showItems" :menu="menu"/>
                </li>
            </ul>
        </div>
        <div>
            <ul class="flex flex-col gap-y-8 p-6">
                <li>
                    <a href="" class="flex items-center gap-x-6">
                        <img class="icon-width" src="/dashboard/settings.svg" alt="">
                        <p class="font">Settings</p>
                    </a>
                </li>
                <li>
                    <a href="" class="flex items-center gap-x-6">
                        <img class="icon-width" src="/dashboard/logout.svg" alt="">
                        <p class="font">Logout</p>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import Arrow from '~/components/shared/Arrow'
import Menu from '~/components/shared/Menu'
export default {

    components: {
        Arrow,
        Menu
    },

    data(){
        return {
            mobileView: false,
            showItems: false,
            menus: [
                {
                    img: "/dashboard/static.svg",
                    name: "Result Statics",
                    url: "/",
                    child: [
                        {
                            name: "Subjectwise Statistics",
                            url: '/show-result/subjectwise-statistics'
                        },
                        {
                            name: "Rollwise Statistics",
                            url: '/show-result/rollwise-statistics'
                        }
                    ]
                },
                {
                    img: "/dashboard/upload.svg",
                    name: "Upload Result",
                    url: "/",
                    child: [
                        {
                            name: "Upload Result Subjectwise",
                            url: '/upload-result/upload-result-subjectwise'
                        },
                        {
                            name: "Upload Result Rollwise",
                            url: '/upload-result/upload-result-rollwise'
                        }
                    ]
                },
                {
                    img: "/dashboard/history.svg",
                    name: "File Upload History",
                    url: "/file-upload/file-upload-history",
                    child: []
                },
            ]
        }
    },
    methods: {
        handleView(){
            this.mobileView = window.innerWidth <= 640;
            // console.log(this.mobileView, window.innerWidth);
        },

        
    },

    mounted() {
        this.handleView();
        window.addEventListener('resize',this.handleView);
    }
}
</script>

<style lang="scss" scoped>
    .sidebar {
        height: calc(100vh - 96px);
    }

    .easy {
        transition: all .5s ease-in-out;
    }
    
</style>
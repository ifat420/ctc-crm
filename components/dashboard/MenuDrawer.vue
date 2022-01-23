<template>
  <div class="flex justify-between items-center box-shadow-dashboard p-6 relative">
            <div class="flex items-center gap-x-4">
                <div class="shrink-0">
                    <Logo />
                </div>
                <h1 class="text-sm font-bold">Client Name</h1>
            </div>
            <div class="flex flex-col items-center gap-y-1 cursor-pointer" @click="showNavbar = true" :class="{'hide': showNavbar}">
                <img src="/dashboard/Line.svg" alt="">
                <img src="/dashboard/Line.svg" alt="">
                <img src="/dashboard/Line.svg" alt="">
            </div>
            <div class="cursor-pointer" @click="showNavbar=false" :class="{'hide': showNavbar==false}">
                <img src="/dashboard/Fill.svg" alt="">
            </div>
            <div class="navbar absolute z-10 bg-white w-screen" :class="{'open':showNavbar}">
                    <div>
                        <ul class="flex flex-col gap-y-6 pl-6 pt-12 pb-6 border-bottom">
                            <li class="" v-for="(menu,index) in menus" :key="index">
                                <Menu :showItems="showItems" :menu="menu"/>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <ul class="flex flex-col gap-y-6 p-6">
                            <li>
                                <a href="" class="flex items-center gap-x-6">
                                    <img src="/dashboard/settings.svg" alt="">
                                    <p class="font">Settings</p>
                                </a>
                            </li>
                            <li>
                                <a href="" class="flex items-center gap-x-6">
                                    <img src="/dashboard/logout.svg" alt="">
                                    <p class="font">Logout</p>
                                </a>
                            </li>
                        </ul>
                    </div>
            </div>
        </div>
</template>

<script>
import Logo from "~/components/shared/Logo"
import Arrow from "~/components/shared/Arrow"
import Menu from "~/components/shared/Menu"
export default {
    components:{
        Logo,
        Arrow,
        Menu
    },

    props: ["showNav"],

    data() {

        return {

            showNavbar: this.showNav,
            showItems: false,
            menus: [
                {
                    img: "/dashboard/static.svg",
                    name: "Result Statics",
                    url: "/",
                    child: [
                        {
                            name: "Subjectwise Statistics",
                            url: '/show-result/show-result-subjectwise'
                        },
                        {
                            name: "Rollwise Statistics",
                            url: '/show-result/show-result-rollwise'
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
                    url: "/",
                    child: []
                },
            ]
        }
    }
}
</script>

<style lang="scss" scoped>
    .navbar {

        transform: translateX(100vw);
        top: 63px;
        left: 0px;
        margin-top: 25px;
        height: calc(100vh - 88px);
        transition: transform .5s ease-in-out;
        // z-index: -1;
    }

    .open {

        transform: translateX(0px) !important;
    }

    .hide {

        display: none;
    }
</style>
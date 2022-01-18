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
            <div class="navbar absolute bg-white w-screen" :class="{'open':showNavbar}">
                    <div>
                        <ul class="flex flex-col gap-y-4 pl-6 pt-12 pb-6 border-bottom">
                            <li>
                                <a href="" class="flex items-center gap-x-6">
                                    <img src="/dashboard/tests.svg" alt="">
                                    <p class="font">Tests</p>
                                </a>
                            </li>
                            <li>
                                <a href="" class="flex items-center gap-x-6">
                                    <img src="/dashboard/users.svg" alt="">
                                    <p class="font">Users</p>
                                </a>
                            </li>
                            <li>
                                <a href="" class="flex items-center gap-x-6">
                                    <img src="/dashboard/templates.svg" alt="">
                                    <p class="font">Templates</p>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <ul class="flex flex-col gap-y-4 p-6">
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
export default {
    components:{
        Logo
    },

    props: ["showNav"],

    data() {

        return {

            showNavbar: this.showNav
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
        // z-index: -1;
    }

    .open {

        transform: translateX(0px) !important;
    }

    .hide {

        display: none;
    }
</style>
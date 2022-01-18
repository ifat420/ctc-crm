<template>
    <div class="sidebar w-80 box-shadow-dashboard" v-if="!mobileView">
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
</template>

<script>
export default {
    data(){
        return {
            mobileView: false,
        }
    },
    methods: {
        handleView(){
            this.mobileView = window.innerWidth <= 640;
            // console.log(this.mobileView, window.innerWidth);
        }
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
</style>
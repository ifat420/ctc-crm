<template>
    <div class="sidebar sidebar-main box-shadow-dashboard" v-if="!mobileView">
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
                <li @click="logout">
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
                    name: "Upload Student File",
                    url: "/",
                    child: [
                        {
                            name: "Upload Subject File",
                            url: '/upload-student-file/upload-subject-information'
                        },
                        {
                            name: "Upload Student File",
                            url: '/upload-student-file/upload-student-information'
                        },
                        {
                            name: "Upload Marks Table",
                            url: '/upload-student-file/upload-student-marks-table'
                        }
                    ]
                },
                {
                    img: "/dashboard/reading.png",
                    name: "Students",
                    url: "/",
                    child: [
                        {
                            name: "Students List",
                            url: '/students/students-list'
                        },
                        {
                            name: "Create A Student",
                            url: '/students/create-a-student'
                        }
                    ]
                },
                {
                    img: "/dashboard/history.svg",
                    name: "Publish Result",
                    url: "/publish-result",
                    child: []
                },
                {
                    img: "/dashboard/history.svg",
                    name: "File Upload History",
                    url: "/file-upload/file-upload-history",
                    child: []
                },

                {
                    img: "/dashboard/search.svg",
                    name: "Search Result",
                    url: "/search-result/search-result",
                    child: []
                }

            ]
        }
    },
    methods: {
        handleView(){
            this.mobileView = window.innerWidth <= 1240;
            this.$emit("mobileView", this.mobileView);
            // console.log(this.mobileView, window.innerWidth);
        },

        logout() {
            this.$auth.logout();
            // this.$router.push('/login');
        }

        
    },

    mounted() {
        this.handleView();
        window.addEventListener('resize',this.handleView);
        
    }
}
</script>

<style lang="scss" scoped>
    // .sidebar {
    //     height: calc(100vh - 96px);
    // }

    .easy {
        transition: all .5s ease-in-out;
    }

    .sidebar-main {
        position: fixed;
        z-index: 1;
        width: 340px;
        height: 100%;
        background-color: #FFFFFF;
        top: 105px;
    }

    
</style>
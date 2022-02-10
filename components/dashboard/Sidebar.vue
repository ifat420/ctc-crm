<template>
    <div class="sidebar sidebar-main box-shadow-dashboard duration-500 transition-all -left-80 md:left-0" :class="{ 'ml-80' : sidebarStatus }">
        <div>
            <ul class="flex flex-col gap-y-8 pl-6 pt-12 pb-6 border-bottom">
                <li v-for="(menu,index) in menus" :key="index">
                    <Menu :menu="menu"/>
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

import { mapGetters } from 'vuex'

export default {

    components: {
        Arrow,
        Menu
    },

    data(){
        return {
            // mobileView: false,
            // showItems: false,
            menus: [

                {
                    img: "/dashboard/bookshelf.png",
                    name: "Subjects",
                    url: "/",
                    child: [
                        {
                            name: "Show All Subjects",
                            url: '/subjects/show-all-subjects'
                        },
                        {
                            name: "Create A Subject",
                            url: '/subjects/create-a-subject'
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
                            name: "Show All Students",
                            url: '/students/show-all-students'
                        },
                        {
                            name: "Create A Student",
                            url: '/students/create-a-student'
                        }
                    ]
                },

                {
                    img: "/dashboard/test.png",
                    name: "Marks",
                    url: "/",
                    child: [
                        {
                            name: "Upload Marks",
                            url: '/marks/upload-marks'
                        },
                        {
                            name: "Upload Marks Subjectwise",
                            url: '/marks/upload-marks-subjectwise'
                        }
                    ]
                },

                {
                    img: "/dashboard/marking.png",
                    name: "Exams",
                    url: "/",
                    child: [
                        {
                            name: "Show All Exams",
                            url: '/exams/show-all-exams'
                        },
                        {
                            name: "Create A Exam",
                            url: '/exams/create-a-exam'
                        }
                    ]
                },

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
        // handleView(){
        //     this.mobileView = window.innerWidth <= 1240;
        //     this.$emit("mobileView", this.mobileView);
        //     // console.log(this.mobileView, window.innerWidth);
        // },

        async logout() {
            await this.$auth.logout();
            // this.$router.push('/login');
        }

        
    },

    computed: {
        ...mapGetters(["sidebarStatus"]),
    },

    mounted() {
        // this.handleView();
        // window.addEventListener('resize',this.handleView);
        
    }
}
</script>

<style lang="scss" scoped>
    
    // .sidebar {
    //     left: -340px;
    // }
    

    .sidebar-main {
        position: fixed;
        z-index: 1;
        width: 320px;
        background-color: #FFFFFF;
        top: 105px;
        bottom: 0;
        overflow-y: auto;
    }

    .margin-left {
        margin-left: 320px;
    }

    
</style>
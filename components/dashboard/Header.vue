<template>
    <div class="">
        <div class=" flex justify-between items-center box-shadow-dashboard p-6 relative" >
            <div class="flex items-center gap-x-4">
                <div class="shrink-0">
                    <LogoMomin />
                </div>
                <h1 class="text-sm font-bold">MUMINUNNISA GOVT. MOHILA COLLEGE</h1>
            </div>
            <div>
                <button @click.prevent="humClick" class="inline-block md:hidden">
                    <Hamburger v-if="!sidebarStatus"/>
                    <img style="width: 20px; height: 20px" src="/dashboard/close.png" v-if="sidebarStatus"/>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import LogoMomin from "~/components/shared/LogoMomin"
import Hamburger from "~/components/shared/Hamburger"
import IconClose from "~/components/shared/IconClose"
import ButtonDashboard from "~/components/dashboard/ButtonDashboard"


import { mapGetters,mapActions} from 'vuex'

export default {

    components: {
        LogoMomin,
        ButtonDashboard,
        Hamburger,
        IconClose
    },

    data() {
        return {
            mobileView: true,
            showNav: false,
            
        }
    },

    computed: {
        ...mapGetters(["sidebarStatus"]),
    },

    methods: {
        ...mapActions(["openSidebar","closeSidebar"]),

        // handleView(){
        //     this.mobileView = window.innerWidth <= 1240;
        //     // console.log(this.mobileView, window.innerWidth);
        // },

        humClick() {
            if (this.sidebarStatus) this.closeSidebar();
            else this.openSidebar();
        }
    },

    mounted() {
        // this.handleView();
        // window.addEventListener('resize',this.handleView);
    }


}
</script>

<style lang="scss" scoped>
    .page-width {
        width: 1400px;
    }

    
</style>
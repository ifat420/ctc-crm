<template>
    <div class="">
        <div class=" flex justify-between items-center box-shadow-dashboard p-6 relative" v-if="!mobileView">
            <div class="flex items-center gap-x-4">
                <div class="shrink-0">
                    <LogoMomin />
                </div>
                <h1 class="text-sm font-bold">MUMINUNNISA GOVT. MOHILA COLLEGE</h1>
            </div>
            <div class="flex items-center gap-x-6">
                <div  v-for="(buttonContent,index) in buttonContents" :key="index">
                    <ButtonDashboard :buttonContent="buttonContent"/>
                </div>
            </div>
        </div>

        <div v-else >
            <MenuDrawer :mobileView="mobileView" :showNav="showNav"/>
        </div>    
    </div>
</template>

<script>
import LogoMomin from "~/components/shared/LogoMomin"
import ButtonDashboard from "~/components/dashboard/ButtonDashboard"
import MenuDrawer from "~/components/dashboard/MenuDrawer"
export default {

    components: {
        LogoMomin,
        MenuDrawer,
        ButtonDashboard
    },

    data() {
        return {
            mobileView: true,
            showNav: false,
            buttonContents: [
                {
                    text: "All Results",
                    img: '/dashboard/plus.svg'
                },
                {
                    text: "Last 30 Days",
                    img: '/dashboard/plus.svg'
                }
            ]
        }
    },

    methods: {
        handleView(){
            this.mobileView = window.innerWidth <= 1240;
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
    .page-width {
        width: 1400px;
    }

    
</style>
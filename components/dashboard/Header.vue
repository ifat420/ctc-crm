<template>
  <div class=" ">
      
        <div class="flex justify-between items-center box-shadow-dashboard p-6 relative" v-if="!mobileView">
            <div class="flex items-center gap-x-4">
                <div class="shrink-0">
                    <Logo />
                </div>
                <h1 class="text-sm font-bold">Client Name</h1>
            </div>
            <div class="flex items-center gap-x-6">
                <div  v-for="(buttonContent,index) in buttonContents" :key="index">
                    <ButtonDashboard :buttonContent="buttonContent"/>
                </div>
            </div>
        </div>

        <div v-else>
            <MenuDrawer :mobileView="mobileView" :showNav="showNav"/>
        </div>
        
  </div>
</template>

<script>
import Logo from "~/components/shared/Logo"
import ButtonDashboard from "~/components/dashboard/ButtonDashboard"
import MenuDrawer from "~/components/dashboard/MenuDrawer"
export default {

    components: {
        Logo,
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
    
</style>
<template>
  <div >
    <div class="header-main">
      <Header/>
    </div>
    <div class="">
      <Sidebar />
      <div class="md:ml-80 nuxt-main" >
        <Nuxt />
      </div>
    </div>
  </div>
</template>

<script>
import Header from '~/components/dashboard/Header'
import Sidebar from '~/components/dashboard/Sidebar'
export default {
  middleware: ['auth'],
  components: {
    Header,
    Sidebar
  },

  data() {
    return {
      mobileView: false
    }
  },

  methods: {
    // handleMargin(val) {
    //   this.mobileView = val;
    //   // console.log("mobileView",this.mobileView);
    // }
  },

  mounted() {
    // this.handleMargin();
  }

}
</script>

<style lang="scss" scoped>
    .nuxt-main {
      // margin-left: 340px;
      margin-top: 105px;
    }

    // .margin {
    //   margin-left: 0;
    // }

    .header-main {
        position: fixed;
        z-index: 11111;
        width: 100%;
        top: 0;
        background-color: #FFFFFF;
    }

    .margin-none {
      margin-left: 0;
    }
</style>

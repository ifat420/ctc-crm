<template>
  <div class="sticky top-0 z-10 h-16 bg-white shadow-hdr">
    <div class="h-full py-5 px-5 flex justify-between items-center">
      <SiteLogo class="w-12 h-12"/>
      <div>
        <button @click.prevent="humClick" class="inline-block md:hidden p-4">
          <Hamburger v-if="!sidebarStatus"/>
          <IconClose v-if="sidebarStatus" />
        </button>
        <button class="w-10 h-10 items-center justify-center shadow-gbtn rounded-full hidden md:flex">
          {{ userNameTowLetter }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import SiteLogo from '~/components/Icons/SiteLogo';
import Hamburger from '~/components/Icons/Hamburger';
import IconClose from '~/components/Icons/Close';
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    SiteLogo,
    Hamburger,
    IconClose
  },
  
  computed: {
    ...mapGetters(['sidebarStatus']),

    userNameTowLetter() {
      let twoLetter = "UA",
        name = this.$auth.user.full_name
      if (name) {  
        let p = name.split(" ");
        twoLetter = "";
        if (p[0]) twoLetter += p[0].charAt(0);
        if (p[1]) twoLetter += p[1].charAt(0); 
      } 
      return twoLetter;
    }

  },

  methods: {
    ...mapActions([
      'openSidebar',
      'closeSidebar'
    ]),

    humClick() {
      if (this.sidebarStatus) this.closeSidebar()
      else this.openSidebar()
    }
  }
}
</script>

<style>

</style>
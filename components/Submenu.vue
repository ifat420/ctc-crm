<template>
  <div class="my-4 px-5 py-2" :style="`--height:${height}`">
    <div
      @click.prevent="onCollapseMenu"
       class="flex justify-between items-center cursor-pointer transition-all"
    >
      <span class="text-black group flex items-center text-sm">
        <component :is="nav.icon" />
        <span class="inline-block ml-3 group-hover:underline">{{
          nav.name
        }}</span>
      </span>
      <IconDownArrow class="transition-all duration-150" :class="{ 'transform rotate-180': isActive }" />
    </div>
    <ul class="ml-8 h-0 overflow-hidden transition-all duration-300" :class="{ 'submenu-active': isActive }">
      <li v-for="(child, index) in nav.childs" :key="index">
        <nuxt-link class="block text-sm my-3 hover:underline ransition-all" :to="child.url">
          {{ child.name }}
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
import IconAgent from "~/components/Icons/Agent";
import IconClient from "~/components/Icons/Client";
import IconSettings from "~/components/Icons/Settings";
import IconDashboard from "~/components/Icons/Dashboard";
import IconLogout from "~/components/Icons/Logout";
import IconInvoice from "~/components/Icons/Invoice";
import IconPhone from "~/components/Icons/Phone";
import IconData from "~/components/Icons/Data";
import IconMinusIcon from "~/components/Icons/MinusIcon";
import IconHistory from "~/components/Icons/History";
import IconDownArrow from "~/components/Icons/DownArrow";


export default {
  props: {
    nav: {
      type: Object,
      default: {}
    }
  },

  data: () => ({
    isActive: false
  }),
  
  components: {
    IconAgent,
    IconClient,
    IconSettings,
    IconDashboard,
    IconLogout,
    IconInvoice,
    IconPhone,
    IconData,
    IconHistory,
    IconMinusIcon,
    IconDownArrow,
  },

  computed: {
    height() {
      let h = 0;
      if (this.nav.childs && this.nav.childs.length) {
        h = `${this.nav.childs.length * 32}px`
      } return h
    }
  },

  methods: {
    onCollapseMenu() {
      this.isActive = !this.isActive;
    }
  }
};
</script>

<style scoped>
  .submenu-active {
    height: var(--height);
  }
</style>
<template>
  <div
    class="
      fixed
      w-64
      bg-white
      -left-64
      md:left-0
      top-0
      s-height
      shadow-hdr
      duration-500
      transition-all
      z-10
      overflow-auto

    "
    :class="{ 'ml-64': sidebarStatus }"
  >
    <nav class="pb-4 h-full flex flex-col overflow-auto sidebar">
      <div class="pt-2 pb-5">
        <template v-for="(nav, index) in navigations">
          <template v-if="!nav.url">
            <Submenu :key="index" :nav="nav" />
          </template>
          <template v-else>
            <nuxt-link
              :key="index"
              to="/"
              class="
                text-black
                group
                flex
                items-center
                my-4
                py-2
                px-5
                text-sm
                rounded-md
              "
            >
              <component :is="nav.icon" />
              <span class="inline-block ml-3 group-hover:underline">{{
                nav.name
              }}</span>
            </nuxt-link>
          </template>
        </template>
      </div>
      <div class="px-5 mt-auto pb-6">
        <div class="bg-line h-0.5"></div>
        <button
          @click.prevent="logout"
          class="group inline-flex items-center justify-center mt-5"
        >
          <IconLogout />
          <span class="ml-3 inline-block text-sm group-hover:underline"
            >Logout</span
          >
        </button>
      </div>
    </nav>
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
import Submenu from "~/components/Submenu";
import { mapGetters } from "vuex";

export default {
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
    Submenu,
  },
  data: () => ({
    navigations: [
      {
        name: "Dashboard",
        url: "/",
        icon: "IconDashboard",
      },
      {
        name: "Subjects",
        icon: "IconInvoice",
        url: false,
        childs: [
          {
            name: "List",
            url: "/subjects",
          },
          {
            name: "Create",
            url: "/subjects/create",
          },
          {
            name: "Upload File",
            url: "/subjects/upload-subject-file",
          },
        ],
      },
      {
        name: "Students",
        icon: "IconClient",
        url: false,
        childs: [
          {
            name: "List",
            url: "/students",
          },
          {
            name: "Create",
            url: "/students/create",
          },
          {
            name: "Upload File",
            url: "/students/upload-file",
          },
        ],
      },
      {
        name: "Marks",
        icon: "IconHistory",
        url: false,
        childs: [
          {
            name: "List",
            url: "/marks/list",
          },
          {
            name: "List By Session",
            url: "/marks/list-by-session",
          },
          {
            name: "Create",
            url: "/marks/create",
          },
        ],
      },
      {
        name: "Exams",
        icon: "IconData",
        url: false,
        childs: [
          {
            name: "List",
            url: "/exams/list",
          },
          {
            name: "Create",
            url: "/exams/create",
          },
        ],
      },
      {
        name: "Result",
        icon: "IconMinusIcon",
        url: false,
        childs: [
          {
            name: "List",
            url: "/show-result/list",
          },
          {
            name: "Result Details",
            url: "/show-result/result-details",
          },
        ],
      },
      {
        name: "Settings",
        url: "/agent/settings",
        icon: "IconSettings",
      },
    ],
  }),

  computed: {
    ...mapGetters(["sidebarStatus"]),
  },

  methods: {
    async logout() {
      await this.$auth.logout();
    },

    onCollapseMenu(e) {
      console.log(e);
    },
  },
};
</script>

<style scoped>
.s-height {
  height: calc(100vh - 64px);
  top: 64px;
}

.sidebar::-webkit-scrollbar {
  /* Hide scrollbar for Chrome, Safari and Opera */

  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.sidebar {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

</style>
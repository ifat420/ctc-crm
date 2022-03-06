<template>
  <div>
    <div class="flex flex-col lg:flex-row lg:justify-between mt-12">
      <h2 class="text-xl font-medium">Students</h2>
      <div class="flex flex-col lg:flex-row">
        <div class="relative lg:my-0 my-6 mr-0 lg:mr-5">
          <select
            v-model="selectedSession"
            @change="onDropdownChange"
            class="
              form-select
              appearance-none
              block
              shadow-gbtn
              text-left
              py-4
              text-base
              font-normal
              text-gray-700
              bg-white bg-clip-padding bg-no-repeat
              w-full
              lg:w-60
              px-4
              rounded-xl
              m-0
              focus:outline-none
              hover:cursor-pointer
            "
            aria-label="Default select example"
          >
            <option
              v-for="(item, index) in getSessions"
              :key="index"
              :value="item.value"
            >
              {{ item.name }}
            </option>
          </select>
          <DownArrow class="absolute w-auto h-auto top-6 right-4" />
        </div>
        <div class="relative lg:my-0 my-6">
          <select
            v-model="selectedGroup"
            @change="onDropdownChange"
            class="
              form-select
              appearance-none
              block
              shadow-gbtn
              text-left
              py-4
              text-base
              font-normal
              text-gray-700
              bg-white bg-clip-padding bg-no-repeat
              w-full
              lg:w-60
              px-4
              rounded-xl
              m-0
              focus:outline-none
              hover:cursor-pointer
            "
            aria-label="Default select example"
          >
            <option
              v-for="(item, index) in getGroups"
              :key="index"
              :value="item.value"
            >
              {{ item.name }}
            </option>
          </select>
          <DownArrow class="absolute w-auto h-auto top-6 right-4" />
        </div>
      </div>
    </div>

    <div class="mt-10">
      <StudentTable :student="getAllStudentResponse" />
    </div>
    <paginate
      :page-count="totalPages"
      v-model="page"
      :click-handler="onPageChnage"
      :prev-text="prev"
      :next-text="next"
      :container-class="'pagination'"
    >
    </paginate>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
import StudentTable from "~/components/tables/StudentTable";
import Pagination from "~/mixins/pagination";
import DownArrow from '~/components/Icons/DownArrow';

export default {
  mixins: [Pagination],
  components: {
    StudentTable,
    DownArrow
  },

  data: () => ({
    selectedSession: 'all',
    selectedGroup: 'all'

  }),

  computed: {
    ...mapState(["getAllStudentResponse"]),
    ...mapGetters(["getSessions"]),
    ...mapGetters("other", ["getGroups"]),
    totalPages() {
      let totalPage = 1;
      if (
        this.getAllStudentResponse &&
        this.getAllStudentResponse.total_pages
      ) {
        totalPage = this.getAllStudentResponse.total_pages;
      }
      return totalPage;
    },
  },

  methods: {
    ...mapActions(["getAllStudent", "getSession"]),

    fetchData() {
      this.getAllStudent({
        page: this.page,
        limit: this.limit,
        session: this.selectedSession,
        group: this.selectedGroup,
      });
    },
    onDropdownChange() {
      this.fetchData()
    }
  },

  mounted() {
    this.getSession();
  },
};
</script>

<style lang="scss">
</style>
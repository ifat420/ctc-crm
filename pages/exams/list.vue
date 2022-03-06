<template>
  <div>

    <div class="flex flex-col lg:flex-row lg:justify-between mt-12">
      <h2 class="text-xl font-medium">Show All Exams</h2>
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
            v-model="selectedExam"
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
              v-for="(item, index) in getExams"
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
    <ExamTable :exams="getAllExamsResponse" />
    <paginate
      :page-count="totalPages"
      v-model="page"
      :click-handler="onPageChnage"
      :prev-text="prev"
      :next-text="next"
      :container-class="'pagination'">
    </paginate>
  </div>
</template>

<script>
import ShowUrl from "~/components/shared/ShowUrl";
import ExamTable from "~/components/tables/ExamTable";
import DownArrow from "~/components/Icons/DownArrow";
import Pagination from '~/mixins/pagination';

import { mapActions, mapState, mapGetters } from "vuex";

export default {
  mixins: [Pagination],
  components: {
    ShowUrl,
    ExamTable,
    DownArrow,
  },

  data() {
    return {
      selectedExam: "all",
      selectedSession: "all",
      mainContents: {
        folderName: "exams",
        compName: "show-all-exams",
        topicName: "Show All Exams",
      },
    };
  },

  computed: {
    ...mapState(["getAllExamsResponse", "createPublishExamResponse"]),
    ...mapGetters(["getSessions"]),
    ...mapGetters("other", ["getExams"]),
    totalPages() {
      let totalPage = 1;
      if (this.getAllExamsResponse && this.getAllExamsResponse.total_pages) {
        totalPage = this.getAllExamsResponse.total_pages
      } return totalPage;
    }
  },

  methods: {
    ...mapActions(["getAllExams", "getSession"]),
    fetchData() {
      this.getAllExams({page: this.page, limit: this.limit, session: this.selectedSession, exam_name: this.selectedExam })
    },
    onDropdownChange() {
      this.fetchData()
    }
  },

  async mounted() {
    this.getSession()
  },
};
</script>

<style lang="scss">
</style>
<template>
  <div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12" >
      <div class="shadow-gbtn p-5 rounded-lg" v-for="(item, index) in getHighlights" :key="index">
        <div>
          <component :is="item.icon" class=" w-10 h-10" />
        </div>
        <h2 class="font-medium text-3xl mt-4"> {{ item.total }} </h2>
        <h5 class="text-xl mt-2"> {{ item.item_type }} </h5>
      </div>
    </div>
   
    <div class="flex flex-col lg:flex-row lg:justify-between mt-12">
       <h2 class="text-xl font-medium">Published Result</h2>
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
            <option v-for="(item, index) in getSessions" :key="index" :value="item.value">{{ item.name }}</option>
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
           <option v-for="(item, index) in getExams" :key="index" :value="item.value">{{ item.name }}</option>
          </select>
          <DownArrow class="absolute w-auto h-auto top-6 right-4" />
        </div>
      </div>
    </div>
    <div class="mt-10"><PublishedResult :result="getPublishedResult" /></div>
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
import IconSubject from '~/components/Icons/Book';
import IconExam from '~/components/Icons/Exam';
import IconGroup from '~/components/Icons/Group';
import DownArrow from '~/components/Icons/DownArrow';
import IconStudent from '~/components/Icons/Student';
import PublishedResult from '~/components/tables/PublishedResult';
import Pagination from '~/mixins/pagination';
import { mapGetters, mapActions } from 'vuex';

export default {
  mixins: [Pagination],
  components: {
    IconSubject,
    IconExam,
    IconGroup,
    IconStudent,
    PublishedResult,
    DownArrow
  },

  data: () => ({
    selectedExam: "all",
    selectedSession: "all"
  }),

  computed: {
    ...mapGetters("other", ["getHighlights", "getPublishedResult", "getExams"]),
    ...mapGetters(["getSessions"]),
    totalPages() {
      let totalPage = 1;
      if (this.getPublishedResult && this.getPublishedResult.total_pages) {
        totalPage = this.getPublishedResult.total_pages
      } return totalPage;
    }
  },
  
  methods: {
    ...mapActions("other", ["fetchHighlights", "fetchPublishedResult"]),
    ...mapActions(["getSession"]),
    fetchData() {
      this.fetchPublishedResult({page: this.page, limit: this.limit, session: this.selectedSession, exam_name: this.selectedExam })
    },
    onDropdownChange() {
      this.fetchData()
    }
  },

  mounted() {
    this.fetchHighlights()
    this.getSession()
  }


}
</script>

<style>

</style>
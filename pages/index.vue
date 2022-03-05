<template>
  <div>
    <div class="grid grid-cols-4 gap-12" >
      <div class="shadow-gbtn p-5 rounded-lg" v-for="(item, index) in getHighlights" :key="index">
        <div>
          <component :is="item.icon" class=" w-10 h-10" />
        </div>
        <h2 class="font-medium text-3xl mt-4"> {{ item.total }} </h2>
        <h5 class="text-xl mt-2"> {{ item.item_type }} </h5>
      </div>
    </div>
    <h2 class="text-xl font-medium mt-10">Published Result</h2>
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
    PublishedResult
  },

  data: () => ({
    
  }),

  computed: {
    ...mapGetters("other", ["getHighlights", "getPublishedResult"]),
    totalPages() {
      let totalPage = 1;
      if (this.getPublishedResult && this.getPublishedResult.total_pages) {
        totalPage = this.getPublishedResult.total_pages
      } return totalPage;
    },
  },
  
  methods: {
    ...mapActions("other", ["fetchHighlights", "fetchPublishedResult"]),
    fetchData() {
      this.fetchPublishedResult({page: this.page, limit: this.limit })
    }
  },

  mounted() {
    this.fetchHighlights()
  }


}
</script>

<style>

</style>
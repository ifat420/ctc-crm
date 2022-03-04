<template>
  <div>
    <h2 class="text-3xl font-medium mb-3">Subjects</h2>
    <div class="mt-10">
      <SubjectTable :subjects="getAllSubjectResponse" />
    </div>
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
import SubjectTable from "~/components/tables/Subjects";
import Pagination from '~/mixins/pagination';

import { mapActions, mapState, mapGetters } from "vuex";

export default {
  mixins: [Pagination],
  components: {
    ShowUrl,
    SubjectTable
  },

  data() {
    return {
     
    };
  },

  computed: {
    ...mapState(["getAllSubjectResponse"]),

    totalPages() {
      const totalPages = Math.ceil(this.getAllSubjectResponse.total_rows / 20);
      return totalPages;
    },
  },

  methods: {
    ...mapActions(["getAllSubject"]),

    fetchData() {
      this.getAllSubject({page: this.page, limit: this.limit })
    }
  },

  // async mounted() {
  //   if (this.$route && this.$route.query && this.$route.query.page) {
  //     this.page = parseInt(this.$route.query.page);
  //     await this.getAllSubject({
  //       page: this.$route.query.page,
  //       limit: this.limit,
  //     });
  //   } else {
  //     await this.getAllSubject({ page: this.page, limit: this.limit });
  //   }

  //   this.computedLimit;
  //   this.computedPage;
  // },
};
</script>

<style lang="scss" scoped>
</style>
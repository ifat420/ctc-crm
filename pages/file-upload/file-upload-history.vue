<template>
  <div class=" flex flex-col">
    <div class="box-shadow-dashboard bg-color-whiteTwo py-6">
      <h2 class="px-7 font font-bold">File Upload History</h2>
    </div>
    <div class="-my-2  sm:-mx-6 lg:-mx-8  p-8">
      <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
        <div class="shadow overflow-hidden p-8 bg-color-whiteTwo sm:rounded-lg">
          <h4 class="pb-4 font">File Upload History</h4>
          <TableFileUploadHistory v-if="people" :theData="computedTableData"/>
          <paginate
            :page-count="3"
            :page-range="4"
            v-model="currentPage"
            :click-handler="goToPage"
            :prev-text="'Prev'"
            :next-text="'Next'"
            :container-class="'pagination'"
            :page-class="'page-item'">
          </paginate>
          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TableFileUploadHistory from '~/components/dashboard/TableFileUploadHistory'

export default {

  components: {
    TableFileUploadHistory
  },
  
  data(){
    return {

			currentPage: 1,
      people: [
            {
        date: '2022-01-16 13:30:50',
        session: '2016-17',
        exam: 'pre-test',
        class: 'XII',
        group: 'Science',
        file: 'result_XI_pre_test.xlsx'
      },

      {
        date: '2022-01-16 13:30:50',
        session: '2016-17',
        exam: 'pre-test',
        class: 'XII',
        group: 'Science',
        file: 'result_XI_pre_test.xlsx'
      },

      {
        date: '2022-01-16 13:30:50',
        session: '2016-17',
        exam: 'pre-test',
        class: 'XII',
        group: 'Science',
        file: 'result_XI_pre_test.xlsx'
      },

      {
        date: '2022-01-16 13:30:50',
        session: '2016-17',
        exam: 'pre-test',
        class: 'XII',
        group: 'Science',
        file: 'result_XI_pre_test.xlsx'
      },

      {
        date: '2022-01-16 13:30:50',
        session: '2016-17',
        exam: 'pre-test',
        class: 'XII',
        group: 'Science',
        file: 'result_XI_pre_test.xlsx'
      },

      {
        date: '2022-01-16 13:30:50',
        session: '2016-17',
        exam: 'pre-test',
        class: 'XII',
        group: 'Science',
        file: 'result_XI_pre_test.xlsx'
      },

      {
        date: '2022-01-16 13:30:50',
        session: '2016-17',
        exam: 'pre-test',
        class: 'XII',
        group: 'Science',
        file: 'result_XI_pre_test.xlsx'
      },

      {
        date: '2022-01-16 13:30:50',
        session: '2016-17',
        exam: 'pre-test',
        class: 'XII',
        group: 'Science',
        file: 'result_XI_pre_test.xlsx'
      },

      {
        date: '2022-01-16 13:30:50',
        session: '2016-17',
        exam: 'pre-test',
        class: 'XII',
        group: 'Science',
        file: 'result_XI_pre_test.xlsx'
      },
    ]
    }
  },

  computed: {
      computedTableData() {
        if(!this.people) return [];
        else {
          const firstIndex = (this.currentPage-1) * 4;
          const lastIndex = this.currentPage * 4;
          return this.people.slice(firstIndex,lastIndex);
        }
      },


  },

  methods: {
    goToPage() {
      console.log('Working');
      console.log('this.currentPage :>> ', this.currentPage);
      this.$router.push({path: '/file-upload/file-upload-history', query: { page: this.currentPage}})
    }
  },

  mounted() {
    console.log('this.$route :>> ', this.$route);
    if(this.$route && this.$route.query && this.$route.query.page) {
      this.currentPage = this.$route.query.page
    }
  }
  
}


</script>

<style lang="scss" scoped>
  .current {
    color: teal;
  }
</style>
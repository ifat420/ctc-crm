<template>
  <div class="mx-8 my-32 rounded-lg bg-white shadow-lg">
      <div class="my-8 bg-white mx-6" v-if="getAllExamsResponse.rows && getAllExamsResponse.rows.length">
        <div class="p-6 sm:shadow-xm">
            <div> 
                <vue-good-table
                :columns="columns"
                :rows="getAllExamsResponse.rows" 
                :search-options="{
                    enabled: true
                }"
                >
                </vue-good-table>

                <paginate
                    :page-count= "totalPages"
                    :click-handler="changePageNum"
                    v-model="page"
                    :prev-text="'<'"
                    :next-text="'>'"
                    :container-class="'pagination'"
                    :page-class="'page-item'">
                </paginate>
            </div> 
        </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
export default {

    data() {
        return {
            
            columns: [
                {
                    label: "Exam Name",
                    field: 'exam_name',
                },
                {
                    
                    label: "Exam Year",
                    field: 'exam_year',
                },
                {
                    label: "Status",
                    field: "status",
                },
                {
                    label: "Session",
                    field: "session",
                }
            ],
            page: 1,
            limit: 20,
        }
    },

    computed: {
        ...mapState(["getAllExamsResponse"]),

        computedLimit() {
            console.log(this.getAllExamsResponse.limit);
            return this.getAllExamsResponse.limit;
        },

        computedPage() {
            console.log(this.getAllExamsResponse.page);
            return this.getAllExamsResponse.page;
        },

        totalPages() {
            const totalPages = Math.ceil(this.getAllExamsResponse.total_rows / 20);
            return totalPages;
        }
    },

    methods: {
        ...mapActions(["getAllExams"]),

        async changePageNum(pageNum) {
            try {
                this.page = parseInt(pageNum);
                await this.getAllExams({ page: pageNum, limit: this.limit });
                this.$router.push({ path: '/exams/show-all-exams', query: { page: pageNum } })
            } catch (error) {
                console.log('error :>> ', error);
            }

        },
    },

    async mounted() {
        if(this.$route && this.$route.query && this.$route.query.page) {
            this.page = parseInt(this.$route.query.page);
            await this.getAllExams({ page: this.$route.query.page, limit: this.limit });
        }else {
            await this.getAllExams({ page: this.page, limit: this.limit });
        }
        
        this.computedLimit;
        this.computedPage;
    }
}
</script>

<style lang="scss">

</style>
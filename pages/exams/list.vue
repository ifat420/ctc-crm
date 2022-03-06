<template>
    <div>
  <h2 class="text-3xl font-medium">Show All Exams</h2>
  <div class="">
      <div class="my-8 bg-white" v-if="getAllExamsResponse.rows && getAllExamsResponse.rows.length">
        <div class=" sm:shadow-xm">
            <div> 
                <vue-good-table
                :columns="columns"
                :rows="getAllExamsResponse.rows" 
                :search-options="{
                    enabled: true
                }"
                styleClass="vgt-table condensed">
                >

                <template slot="table-row" slot-scope="props">

                    <span v-if="props.column.field == 'exam_name'" class="capitalize">
                        {{props.row.exam_name.split("-").join(" ")}}
                    </span>

                    <span v-else-if="props.column.field == 'status' && props.row.status === 'unpublished' ">
                        <button class="myButton" @click="publishExam(props.row)">
                            Publish
                        </button>
                    </span>
                    
                    <span v-else-if="props.column.field == 'view'">
                        <span v-if="props.row.status === 'published'">
                            <button class="myButton" @click="viewResult(props.row)">
                                View
                            </button>
                        </span>
                    </span>

                    <span v-else>
                        {{props.formattedRow[props.column.field]}}
                    </span>

                </template>
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
  </div>
</template>

<script>
import ShowUrl from '~/components/shared/ShowUrl'
import { mapActions, mapState, mapGetters } from "vuex";
export default {

    components: {
        ShowUrl
    },

    data() {
        return {
            mainContents: {
                folderName: "exams",
                compName: "show-all-exams",
                topicName: "Show All Exams"
            },
            
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
                    label: "Session",
                    field: "session",
                },
                {
                    label: "Status",
                    field: "status",
                },
                {
                    label: "View",
                    field: "view"
                }
            ],
            page: 1,
            limit: 20,
        }
    },

    computed: {
        ...mapState(["getAllExamsResponse", "createPublishExamResponse"]),

        computedLimit() {
            // console.log(this.getAllExamsResponse.limit);
            return this.getAllExamsResponse.limit;
        },

        computedPage() {
            // console.log(this.getAllExamsResponse.page);
            return this.getAllExamsResponse.page;
        },

        totalPages() {
            const totalPages = Math.ceil(this.getAllExamsResponse.total_rows / 20);
            return totalPages;
        },

    },

    methods: {
        ...mapActions(["getAllExams", "createPublishExam"]),

        async changePageNum(pageNum) {
            try {
                this.page = parseInt(pageNum);
                await this.getAllExams({ page: pageNum, limit: this.limit });
                this.$router.push({ path: '/exams/list', query: { page: pageNum } })
            } catch (error) {
                console.log('error :>> ', error);
            }

        },

        async publishExam(value) {
            console.log(value);
            await this.createPublishExam(value);

        },

        async viewResult(value) {
            this.$router.push({ path: "/show-result/list", query: { session: value.session, exam_name: value.exam_name } });
        }
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
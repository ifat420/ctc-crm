<template>
<div>
    <ShowUrl :content="mainContents"/>
    <div class="mx-8 my-8 rounded-lg bg-white shadow-lg">
      <div class="my-8 bg-white mx-6" v-if="tableData && tableData.length">
        <div class="p-6 sm:shadow-xm">
            <div> 
                <vue-good-table
                :columns="columns"
                :rows="tableData" 
                :search-options="{
                    enabled: true
                }"
                styleClass="vgt-table condensed">
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
                folderName: "subjects",
                compName: "show-all-subjects",
                topicName: "Show All Subjects"
            },
            
            columns: [
                {
                    label: "Subject Code",
                    field: 'code',
                    type: 'number'
                },
                {
                    
                    label: "Subject Name",
                    field: 'name',
                },
                {
                    label: "CQ Full Mark",
                    field: "cq_full_mark",
                },
                {
                    label: "MCQ Full Mark",
                    field: "mcq_full_mark",
                },
                {
                    label: "Practical Full Mark",
                    field: "practical_full_mark"
                },
                {
                    label: "Can Be Optional",
                    field: "can_be_optional"
                }
            ],
            page: 1,
            limit: 5,
        }
    },

    computed: {
        ...mapState(["getAllSubjectResponse"]),

        computedLimit() {
            // console.log(this.getAllSubjectResponse.limit);
            return this.getAllSubjectResponse.limit;
        },

        computedPage() {
            // console.log(this.getAllSubjectResponse.page);
            return this.getAllSubjectResponse.page;
        },

        totalPages() {
            const totalPages = Math.ceil(this.getAllSubjectResponse.total_rows / 20);
            return totalPages;
        },
        
        tableData() {
            let arr = [];
            let data = this.getAllSubjectResponse.rows
            if (data && data.length) {
                data.map(item => {
                    let obj = {}
                    obj.code = item.code
                    obj.name = this.capitalizeFirstLetter(item.name)
                    obj.cq_full_mark = item.cq_full_mark
                    obj.mcq_full_mark = item.mcq_full_mark
                    obj.practical_full_mark = item.practical_full_mark == 0 ? 'No Practical' : item.practical_full_mark
                    obj.can_be_optional = item.can_be_optional ? 'Yes' : 'No'

                    arr.push(obj)
                })
            } return arr
        }
    },

    methods: {
        ...mapActions(["getAllSubject"]),

        async changePageNum(pageNum) {
            try {
                this.page = parseInt(pageNum);
                await this.getAllSubject({ page: pageNum, limit: this.limit });
                this.$router.push({ path: '/subjects/show-all-subjects', query: { page: pageNum } })
            } catch (error) {
                console.log('error :>> ', error);
            }

        },
        capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
    },

    async mounted() {
        if(this.$route && this.$route.query && this.$route.query.page) {
            this.page = parseInt(this.$route.query.page);
            await this.getAllSubject({ page: this.$route.query.page, limit: this.limit });
        }else {
            await this.getAllSubject({ page: this.page, limit: this.limit });
        }
        
        this.computedLimit;
        this.computedPage;
    }
}
</script>

<style lang="scss" scoped>

</style>
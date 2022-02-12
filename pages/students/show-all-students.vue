<template>
<div>
    <ShowUrl :content="mainContents"/>
  <div class="mx-8 my-8 rounded-lg bg-white shadow-lg">
      <div class="my-8 bg-white mx-6" v-if="getAllStudentResponse.rows && getAllStudentResponse.rows.length">
        <div class="p-6 sm:shadow-xm">
            <div> 
                <vue-good-table
                :columns="columns"
                :rows="getAllStudentResponse.rows" 
                :search-options="{
                    enabled: true
                }"
                styleClass="vgt-table bordered"
                >

                <template slot="table-row" slot-scope="props">
                    <span v-if="props.column.field == 'name'">
                        <span style="text-transform: capitalize;" :title="fullName(props.row)">{{ fullName(props.row) | truncate(10) }}</span>
                    </span>

                    <span v-if="props.column.field == 'UpdatedAt'">
                        <span style="text-transform: capitalize;">{{ $moment(props.row.UpdatedAt).format('Do MMM YY, HH:mm') }}</span>
                    </span>

                    <span v-else>{{props.formattedRow[props.column.field]}}</span> 
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
                folderName: "students",
                compName: "show-all-students",
                topicName: "Show All Students"
            },
            columns: [
                {
                    label: "ID",
                    field: 'ID',
                    type: 'number',
                    tdClass: 'padding-small',
                    thClass: 'padding-small'
                },
                {
                    
                    label: "Roll",
                    field: 'roll_number',
                    type: 'number',
                    width: '50px'
                },
                {
                    label: "Group",
                    field: "group",
                },
                {
                    label: "Name",
                    field: "name",
                },
                {
                    label: "Registration No.",
                    field: "reg_number",
                    type: 'number',
                    // width: '120px'
                },
                {
                    label: "Session",
                    field: "session"
                },
                {
                    label: "Gender",
                    field: "gender"
                },
                {
                    label: "Class",
                    field: "class"
                },
                {
                    label: "Last Update",
                    field: "UpdatedAt"
                },
                {
                    label: "Father Name",
                    field: "father_name"
                },
                {
                    label: "Student Type",
                    field: "type_of_student"
                }
                
            ],
            page: 1,
            limit: 20,
        }
    },

    computed: {
        ...mapState(["getAllStudentResponse"]),

        computedLimit() {
            console.log(this.getAllStudentResponse.limit);
            return this.getAllStudentResponse.limit;
        },

        computedPage() {
            console.log(this.getAllStudentResponse.page);
            return this.getAllStudentResponse.page;
        },

        totalPages() {
            const totalPages = Math.ceil(this.getAllStudentResponse.total_rows / 20);
            return totalPages;
        }
    },

    methods: {
        ...mapActions(["getAllStudent"]),

        async changePageNum(pageNum) {
            try {
                this.page = parseInt(pageNum);
                await this.getAllStudent({ page: pageNum, limit: this.limit });
                this.$router.push({ path: '/students/show-all-students', query: { page: pageNum } })
            } catch (error) {
                console.log('error :>> ', error);
            }

        },

        fullName(data) {
            return `${data.first_name} ${data.last_name}`
        }
    },

    async mounted() {
        if(this.$route && this.$route.query && this.$route.query.page) {
            this.page = parseInt(this.$route.query.page);
            await this.getAllStudent({ page: this.$route.query.page, limit: this.limit });
        }else {
            await this.getAllStudent({ page: this.page, limit: this.limit });
        }
        
        this.computedLimit;
        this.computedPage;
    }
}
</script>

<style lang="scss">

</style>
<template>
<div>
    <ShowUrl :content="mainContents"/>
  <div class="mx-8 my-8 rounded-lg bg-white shadow-lg">
      <div class="my-8 bg-white mx-6" v-if="getAllStudentResponse.rows && getAllStudentResponse.rows.length">
        <div class="p-6 sm:shadow-xm">
            <div> 
                <vue-good-table
                :columns="columns"
                :rows="tableData" 
                :search-options="{
                    enabled: true
                }"
                styleClass="vgt-table bordered"
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
                folderName: "students",
                compName: "show-all-students",
                topicName: "Show All Students"
            },
            columns: [
                
                {
                    
                    label: "Roll",
                    field: 'roll',
                    type: 'number',
                    
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
            // console.log(this.getAllStudentResponse.limit);
            return this.getAllStudentResponse.limit;
        },

        computedPage() {
            // console.log(this.getAllStudentResponse.page);
            return this.getAllStudentResponse.page;
        },

        totalPages() {
            const totalPages = Math.ceil(this.getAllStudentResponse.total_rows / 20);
            return totalPages;
        },

        tableData() {
            let arr = [];
            let data = this.getAllStudentResponse.rows
            if (data && data.length) {
                data.map(item => {
                    let obj = {}
                    obj.roll = item.roll_number
                    obj.group = this.capitalizeFirstLetter(item.group)
                    obj.name = this.capitalizeFirstLetter(item.first_name) + " " + this.capitalizeFirstLetter(item.last_name)
                    obj.session = item.session
                    obj.gender = this.capitalizeFirstLetter(item.gender)
                    obj.class = item.class.toUpperCase()
                    obj.type_of_student = this.capitalizeFirstLetter(item.type_of_student) 
                    arr.push(obj)
                })
            } return arr
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
        },

        capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
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
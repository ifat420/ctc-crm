<template>
  <div class="mx-8 my-32 rounded-lg bg-white shadow-lg">
      <div class="my-8 bg-white mx-6" v-if="getAllStudentResponse.rows && getAllStudentResponse.rows.length">
        <div class="p-6 sm:shadow-xm">
            <div> 
                <vue-good-table
                :columns="columns"
                :rows="this.getAllStudentResponse.rows" 
                :search-options="{
                    enabled: true
                }"
                :pagination-options="{
                    enabled: true,
                    perPage: 5,
                    mode: 'pages'
                }"
                >
                <template slot="table-row" slot-scope="props">
                    <span v-if="props.column.field == 'name'">
                        <span style="text-transform: capitalize;">{{props.row.first_name}} {{props.row.last_name}}</span>
                    </span>
                    <!-- <span v-else>{{props.formattedRow[props.column.field]}}</span> -->
                    <span v-if="props.column.field == 'UpdatedAt'">
                        <span style="text-transform: capitalize;">{{ $moment(props.row.UpdatedAt).format('MMMM Do YYYY, h:mm:ss a') }}</span>
                    </span>

                    <span v-else>{{props.formattedRow[props.column.field]}}</span> 
                </template>

                </vue-good-table>
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
                    label: "ID",
                    field: 'ID',
                    type: 'number'
                },
                {
                    
                    label: "Roll",
                    field: 'roll_number',
                    type: 'number'
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
                    type: 'number'
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
        }
    },

    computed: {
        ...mapState(["getAllStudentResponse"]),
    },

    methods: {
        ...mapActions(["getAllStudent"]),
    },

    async mounted() {
        await this.getAllStudent();
    }
}
</script>

<style lang="scss" scoped>

</style>
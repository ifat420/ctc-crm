<template>
    <div>
        <div class="">
            <h2 class="text-3xl font-medium">Single Student Result</h2>
        </div>
        <div class="mt-6" v-if="getSingleStudentResult && getSingleStudentResult.length">
            <div class="">
                <div class="" >
                <div class="">
                    <div> 
                        <vue-good-table
                        :columns="columns"
                        :rows="getSingleStudentResult" 
                        :search-options="{
                            enabled: true
                        }"
                        styleClass="vgt-table condensed">
                        >

                        <template slot="table-row" slot-scope="props">
                            <span v-if="props.column.field == 'subject_name'">
                                <span class="capitalize">{{props.row.subject_name}}</span> 
                            </span>
                            <span v-else>
                            {{props.formattedRow[props.column.field]}}
                            </span>
                        </template>

                        </vue-good-table>
                    </div> 
                </div>
                </div>
            </div>
            
        </div>
    </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import { required, minLength, email, alpha } from 'vuelidate/lib/validators'

export default {
    data() {
        return {
            columns: [
            {
                label: "Subject Name",
                field: 'subject_name',  
            },
            {
                label: "CQ Marks",
                field: 'cq',
            },
            {
                label: "MCQ Marks",
                field: 'mcq',
            },
            {
                label: "CQ Marks",
                field: 'practical',
            },
            {
                label: "Grade",
                field: "grade",
            },
            {
                label: "Grade Point",
                field: "grade_point",
                type: 'number',
            },
            {
                label: "Total Marks",
                field: "total_mark",
                type: 'number'
            }   
        ],
        }
    },

    computed: {
        ...mapState(["getSingleStudentResult"]),
        ...mapGetters(["is", "isError"]),
    },

    methods: {
        ...mapActions(["singleStudentResult"])
    },

    async mounted() {
        console.log(this.$route.query);
        let query = {}
        if(this.$route.query && this.$route.query.roll_number && this.$route.query.exam_id) {
            query.roll_number = this.$route.query.roll_number;
            query.exam_id = parseInt(this.$route.query.exam_id)
        }
        console.log('query :>> ', query);
        await this.singleStudentResult(query);
    }
}
</script>

<style>

</style>
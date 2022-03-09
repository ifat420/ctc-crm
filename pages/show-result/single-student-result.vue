<template>
  <div>
    <div class="">
      <h2 class="text-3xl font-medium">Single Student Result</h2>
      <div class="mt-6">
        <div
          class="
            bg-color-white
            grid grid-cols-1
            sm:grid-cols-2
            gap-x-6
            p-6
            border
            capitalize
          "
        >
          <div>
            <div class="grid grid-cols-2 p-2 bg-gray-50 mb-2">
              <p class="text-md">Student Name</p>
              <p
                class="text-md font-semibold"
              >
                {{ $route.query.name }}
              </p>
            </div>
            <div class="grid grid-cols-2 p-2 bg-gray-50 mb-2">
              <p class="text-md">Student Roll</p>
              <p
                class="text-md font-semibold"
              >
                {{ $route.query.roll_number }}
              </p>
            </div>
          </div>
          <div>
            <div class="grid grid-cols-2 p-2 bg-gray-50 mb-2">
              <p class="text-md">Total Marks</p>
              <p
                class="text-md font-semibold"
              >
                {{ $route.query.total_mark }}
              </p>
            </div>
            <div class="grid grid-cols-2 p-2 bg-gray-50 mb-2">
              <p class="text-md">Grade Point</p>
              <p
                class="text-md font-semibold"
              >
                {{ $route.query.grade_point }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="mt-6"
      v-if="getSingleStudentResult && getSingleStudentResult.length"
    >
      <div class="">
        <div class="">
          <div class="">
            <div>
              <vue-good-table
                :columns="columns"
                :rows="getSingleStudentResult"
                :search-options="{
                  enabled: false,
                }"
                :sort-options="{
                  enabled: false,
                }"
                styleClass="vgt-table condensed"
              >
                >

                <template slot="table-row" slot-scope="props">
                  <span v-if="props.column.field == 'subject_name'">
                    <span class="capitalize">{{ props.row.subject_name }}</span>
                  </span>
                  <span v-else>
                    {{ props.formattedRow[props.column.field] }}
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
import { mapActions, mapState, mapGetters } from "vuex";
import { required, minLength, email, alpha } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      columns: [
        {
          label: "Subject Name",
          field: "subject_name",
        },
        {
          label: "CQ Marks",
          field: "cq",
        },
        {
          label: "MCQ Marks",
          field: "mcq",
        },
        {
          label: "CQ Marks",
          field: "practical",
        },
        {
          label: "Grade",
          field: "grade",
        },
        {
          label: "Grade Point",
          field: "grade_point",
          type: "number",
        },
        {
          label: "Total Marks",
          field: "total_mark",
          type: "number",
        },
      ],
    };
  },

  computed: {
    ...mapState(["getSingleStudentResult", "result"]),
    ...mapGetters(["is", "isError"]),
  },

  methods: {
    ...mapActions(["singleStudentResult", "postResult"]),
  },

  async mounted() {
    console.log(this.$route.query);
    let query = {};
    if (
      this.$route.query &&
      this.$route.query.roll_number &&
      this.$route.query.exam_id
    ) {
      query.roll_number = this.$route.query.roll_number;
      query.exam_id = parseInt(this.$route.query.exam_id);
    }
    console.log("query :>> ", query);
    await this.singleStudentResult(query);
    this.result;
    // await this.postResult(query);
  },
};
</script>

<style>
</style>
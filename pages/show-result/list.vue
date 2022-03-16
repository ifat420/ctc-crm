<template>
  <div>
    <h2 class="text-3xl font-medium">Result List</h2>
    <div class="mt-6">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-10 mb-10">
        <div>
          <label for="session" class="text-sm"> Session </label>
          <div class="flex flex-col">
            <div class="relative">
              <select
                v-model="exam.session"
                @blur="$v.exam.session.$touch()"
                class="
                  appearance-none
                  block
                  w-full
                  px-4
                  py-3
                  mt-4
                  rounded-md
                  shadow-gbtn
                  placeholder-gray-400
                  focus:outline-none focus:ring-primary focus:border-primary
                  text-sm
                  hover:cursor-pointer
                "
                aria-label="Default select example"
                :class="{
                  'border border-red-500':
                    $v.exam.session.$dirty && $v.exam.session.$invalid,
                }"
              >
                <option value="">Select Session</option>
                <option
                  v-for="(item, index) in sessionList.options"
                  :key="index"
                  :value="item.value"
                >
                  {{ item.name }}
                </option>
              </select>
              <DownArrow class="absolute w-auto h-auto top-9 right-4" />
            </div>
          </div>
          <p
            v-if="!$v.exam.session.required && $v.exam.session.$dirty"
            class="text-red-500 text-xs mt-2"
          >
            Session is required.
          </p>
        </div>

        <div>
          <label for="exam_name" class="text-sm"> Exam Name </label>
          <div class="flex flex-col">
            <div class="relative">
              <select
                v-model="exam.exam_name"
                @blur="$v.exam.exam_name.$touch()"
                class="
                  appearance-none
                  block
                  w-full
                  px-4
                  py-3
                  mt-4
                  rounded-md
                  shadow-gbtn
                  placeholder-gray-400
                  focus:outline-none focus:ring-primary focus:border-primary
                  text-sm
                  hover:cursor-pointer
                "
                aria-label="Default select example"
                :class="{
                  'border border-red-500':
                    $v.exam.exam_name.$dirty && $v.exam.exam_name.$invalid,
                }"
              >
                <option value="">Select Exam</option>
                <option
                  v-for="(item, index) in examList"
                  :key="index"
                  :value="item.value"
                >
                  {{ item.name }}
                </option>
              </select>
              <DownArrow class="absolute w-auto h-auto top-9 right-4" />
            </div>
          </div>
          <p
            v-if="!$v.exam.exam_name.required && $v.exam.exam_name.$dirty"
            class="text-red-500 text-xs mt-2"
          >
            Exam Name is required.
          </p>
        </div>
      </div>

      <div v-if="hasSuccess && aSubject && aSubject.message" class="pb-3 px-10">
        <h1 class="font success">{{ aSubject.message }}</h1>
      </div>

      <div
        v-if="isError('postCreateExam') && isError('postCreateExam').has_error"
        class="pt-3"
      >
        <h1 class="font text-red-600">{{ isError("postCreateExam").error }}</h1>
      </div>

      <hr class="my-8" />

      <button
        @click.prevent="uploadAExam"
        class="
          inline-flex
          justify-center
          items-center
          py-3
          px-16
          border border-transparent
          rounded-md
          shadow-sm
          font-medium
          text-white
          bg-primary
          focus:outline-none
          focus:ring-2
          focus:ring-offset-2
          focus:ring-indigo-500
        "
      >
        <IconSpinAnimation v-if="is('postCreateExam')" />
        Submit
      </button>
    </div>

    <div
      class="w-full mt-8 bg-color-whiteTwo"
      v-if="
        createResultOverviewResponse && createResultOverviewResponse.all_pass
      "
    >
      <h3 class="color-black text-xl font-medium antialiased mb-2">
        Students who passed all exams
      </h3>
      <h4 class="" v-if="createResultOverviewResponse && createResultOverviewResponse.all_pass && createResultOverviewResponse.all_pass.length">
        Total no Of Students who passed all exams:
        <span>{{ createResultOverviewResponse.all_pass.length }}</span>
      </h4>
      <div class="mt-6">
        <div
          class="grid grid-cols-8 gap-6 p-6 box-shadow-dashboard"
          v-if="
            createResultOverviewResponse &&
            createResultOverviewResponse.all_pass &&
            createResultOverviewResponse.all_pass.length
          "
        >
          <template>
            <div
              v-for="(data, index) in createResultOverviewResponse.all_pass"
              :key="index"
            >
              <p>{{ data.roll_number }}({{ data.grade_point.toFixed(2) }})</p>
            </div>
          </template>
        </div>
        <p v-else class="py-4">No Result found</p>
      </div>
    </div>

    <div
      class="w-full mt-8 bg-color-whiteTwo"
      v-if="
        createResultOverviewResponse && createResultOverviewResponse.all_fail
      "
    >
      <h3 class="color-black text-xl font-medium antialiased mb-2">
        Students who failed
      </h3>
      <h4 class="" v-if="createResultOverviewResponse && createResultOverviewResponse.all_fail && createResultOverviewResponse.all_fail.length">
        Total no Of Students who failed:
        <span>{{ createResultOverviewResponse.all_fail.length }}</span>
      </h4>
      <div class="mt-6">
        <div
          class="flex flex-wrap flex-1 gap-6 p-6 box-shadow-dashboard"
          v-if="
            createResultOverviewResponse &&
            createResultOverviewResponse.all_fail &&
            createResultOverviewResponse.all_fail.length
          "
        >
          <template>
            <div
              v-for="(data, index) in createResultOverviewResponse.all_fail"
              :key="index"
            >
              <p class="capitalize">
                {{ data.roll_number }}({{ data.fail_subjects }})
              </p>
            </div>
          </template>
        </div>
        <p v-else class="py-4">No Result found</p>
      </div>
    </div>
    <div
      class="w-full mt-8 bg-color-whiteTwo"
      v-if="
        createResultOverviewResponse && createResultOverviewResponse.all_fail
      "
    >
      <h3 class="text-xl font-semibold mb-2">One Subject Fail</h3>
      <h4 class="" v-if="oneSubjectFail && oneSubjectFail.length">
        No Of Students who failed one subject:
        <span>{{ oneSubjectFail.length }}</span>
      </h4>
      <div class="mt-6">
        <div
          class="flex flex-wrap flex-1 gap-6 p-6 box-shadow-dashboard"
          v-if="
            createResultOverviewResponse &&
            createResultOverviewResponse.all_fail &&
            createResultOverviewResponse.all_fail.length
          "
        >
          <template>
            <div v-for="(data, index) in oneSubjectFail" :key="index">
              <p class="capitalize">
                {{ data.roll_number }}({{ data.fail_subjects }})
              </p>
            </div>
          </template>
        </div>
        <p v-else class="py-4">No Result found</p>
      </div>
    </div>

    <div
      class="w-full mt-8 bg-color-whiteTwo"
      v-if="
        createResultOverviewResponse && createResultOverviewResponse.all_fail
      "
    >
      <h3 class="text-xl font-semibold mb-2">Two Subject Fail</h3>
      <h4 class="" v-if="twoSubjectsFail && twoSubjectsFail.length">
        No Of Students who failed two subjects:
        <span>{{ twoSubjectsFail.length }}</span>
      </h4>
      <div class="mt-6">
        <div
          class="flex flex-wrap flex-1 gap-6 p-6 box-shadow-dashboard"
          v-if="
            createResultOverviewResponse &&
            createResultOverviewResponse.all_fail &&
            createResultOverviewResponse.all_fail.length
          "
        >
          <template>
            <div v-for="(data, index) in twoSubjectsFail" :key="index">
              <p class="capitalize">
                {{ data.roll_number }}({{ data.fail_subjects }})
              </p>
            </div>
          </template>
        </div>
        <p v-else class="py-4">No Result found</p>
      </div>
    </div>

    <div
      class="w-full mt-8 bg-color-whiteTwo"
      v-if="
        createResultOverviewResponse && createResultOverviewResponse.all_fail
      "
    >
      <h3 class="color-black text-xl font-medium antialiased mb-2">
        Three Subject Fail
      </h3>
      <h4 class="" v-if="threeSubjectsFail && threeSubjectsFail.length">
        No Of Students who failed three subjects:
        <span>{{ threeSubjectsFail.length }}</span>
      </h4>
      <div class="mt-6">
        <div
          class="flex flex-wrap flex-1 gap-6 p-6 box-shadow-dashboard"
          v-if="
            createResultOverviewResponse &&
            createResultOverviewResponse.all_fail &&
            createResultOverviewResponse.all_fail.length
          "
        >
          <template>
            <div v-for="(data, index) in threeSubjectsFail" :key="index">
              <p class="capitalize">
                {{ data.roll_number }}({{ data.fail_subjects }})
              </p>
            </div>
          </template>
        </div>
        <p v-else class="py-4">No Result found</p>
      </div>
    </div>

    <div
      class="w-full mt-8 bg-color-whiteTwo"
      v-if="
        createResultOverviewResponse && createResultOverviewResponse.top_five
      "
    >
      <h3 class="color-black text-xl font-medium antialiased mb-4">
        Top Five Students
      </h3>
      <div
        class=""
        v-if="
          createResultOverviewResponse &&
          createResultOverviewResponse.top_five &&
          createResultOverviewResponse.top_five.length
        "
      >
        <div class="my-8 bg-white">
          <div class="sm:shadow-xm">
            <div>
              <vue-good-table
                :columns="columns"
                :rows="computedFive"
                :search-options="{
                  enabled: false,
                }"
                :sort-options="{
                  enabled: false,
                }"
                styleClass="vgt-table condensed"
              >
                >
              </vue-good-table>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="py-4">
        <p>No Result found</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
import { required, minLength, email, alpha } from "vuelidate/lib/validators";

import DownArrow from "~/components/Icons/DownArrow";
import IconSpinAnimation from "~/components/SpinAnimaiton";

export default {
  components: {
    DownArrow,
    IconSpinAnimation,
  },

  data() {
    return {
      columns: [
        {
          label: "Name",
          field: "name",
        },
        {
          label: "Roll",
          field: "roll_number",
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

      hasSuccess: false,
      widthStudent: true,
      shadowStudent: true,
      marBottom: true,

      examName: {
        name: "Exam Name",
        options: [
          { name: "test", value: "test" },
          { name: "pre-test", value: "pre-test" },
          { name: "half-yearly", value: "half-yearly" },
          { name: "year-final", value: "year-final" },
        ],
      },

      exam: {
        exam_name: "",
        session: "",
      },
    };
  },

  validations: {
    exam: {
      exam_name: {
        required,
      },
      session: {
        required,
      },
    },
  },

  computed: {
    ...mapState(["createResultOverviewResponse", "session"]),
    ...mapGetters(["is", "isError"]),
    ...mapGetters("other", ["getExams"]),

    sessionList() {
      let obj = {};
      obj.name = "Session";
      obj.options = [];

      if (this.session && this.session.length) {
        this.session.forEach((item) => {
          let ob = {};
          ob.name = item;
          ob.value = item;
          obj.options.push(ob);
        });
      }
      return obj;
    },

    examList() {
      let exm = JSON.parse(JSON.stringify(this.getExams));
      exm.shift();
      return exm;
    },

    computedFive() {
      let arr = [];
      let data = this.createResultOverviewResponse.top_five;
      if (data && data.length) {
        data.map((item) => {
          let obj = {};
          obj.roll_number = item.roll_number;
          obj.name =
            this.capitalizeFirstLetter(item.first_name) +
            " " +
            this.capitalizeFirstLetter(item.last_name);
          obj.total_mark = item.total_mark;
          obj.grade_point = item.grade_point;
          arr.push(obj);
        });
      }
      return arr;
    },

    twoSubjectsFail() {
      if (
        this.createResultOverviewResponse &&
        this.createResultOverviewResponse.all_fail &&
        this.createResultOverviewResponse.all_fail.length
      ) {
        let all_fail = this.createResultOverviewResponse.all_fail;
        let arr = [];
        all_fail.filter((item) => {
          if (item.fail_subjects.split(",").length - 1 == 1) {
            arr.push(item);
          }
        });
        return arr;
      }
    },

    threeSubjectsFail() {
      if (
        this.createResultOverviewResponse &&
        this.createResultOverviewResponse.all_fail &&
        this.createResultOverviewResponse.all_fail.length
      ) {
        let all_fail = this.createResultOverviewResponse.all_fail;
        let arr = [];
        all_fail.filter((item) => {
          if (item.fail_subjects.split(",").length - 1 == 2) {
            arr.push(item);
          }
        });
        return arr;
      }
    },

    oneSubjectFail() {
      if (
        this.createResultOverviewResponse &&
        this.createResultOverviewResponse.all_fail &&
        this.createResultOverviewResponse.all_fail.length
      ) {
        let all_fail = this.createResultOverviewResponse.all_fail;
        let arr = [];
        all_fail.filter((item) => {
          if (item.fail_subjects.split(",").length - 1 == 0) {
            arr.push(item);
          }
        });
        return arr;
      }
    },
  },

  methods: {
    ...mapActions([
      "createResultOverview",
      "getSession",
      "createResultOverviewClear",
    ]),

    examNameChanged(value) {
      console.log(`Exam Changed value ${value}`);
      this.exam.exam_name = value;
    },

    sessionChanged(value) {
      console.log(`Session Changed value ${value}`);
      this.exam.session = value;
    },

    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },

    async fetchData() {
      if (
        this.$route.query &&
        this.$route.query.exam_name &&
        this.$route.query.session
      ) {
        await this.createResultOverview({
          exam_name: this.$route.query.exam_name,
          session: this.$route.query.session,
        });
      } else {
        this.createResultOverviewClear();
      }
    },

    uploadAExam() {
      this.$router.push({
        path: "/show-result/list",
        query: this.exam,
      });
    },
  },

  async mounted() {
    await this.getSession();
    console.log(this.$route.query);
    if (
      this.$route.query &&
      this.$route.query.session &&
      this.$route.query.exam_name
    ) {
      await this.createResultOverview(this.$route.query);
    }

    this.fetchData();
  },

  watch: {
    $route: function (val) {
      this.fetchData();
    },
  },
};
</script>

<style>
</style>
<template>
  <div>
    <h2 class="text-3xl font-medium">Marks List</h2>
    <!-- {{ sortedList }} -->
    <div v-if="$route.query && $route.query.exam_name && $route.query.session && markData.length" class="flex items-center gap-x-3 mt-2">
      <h4 class="text-xl font-semibold capitalize">{{$route.query.exam_name}}</h4>
      <h4 class="text-xl font-semibold capitalize">{{$route.query.session}}</h4>
    </div>
    <div class="mt-6" v-if="!markData.length">
      <!-- ................... Select Option ................................. -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-10">
        <div>
          <label for="session" class="text-sm"> Session </label>
          <div class="flex flex-col">
            <div class="relative">
              <select
                v-model="marks.session"
                @blur="$v.marks.session.$touch()"
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
                    $v.marks.session.$dirty && $v.marks.session.$invalid,
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
            v-if="!$v.marks.session.required && $v.marks.session.$dirty"
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
                v-model="marks.exam_name"
                @blur="$v.marks.exam_name.$touch()"
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
                    $v.marks.exam_name.$dirty && $v.marks.exam_name.$invalid,
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
            v-if="!$v.marks.exam_name.required && $v.marks.exam_name.$dirty"
            class="text-red-500 text-xs mt-2"
          >
            Exam Name is required.
          </p>
        </div>
      </div>
      <hr class="my-8" />

      <button
        @click.prevent="uploadMarks"
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
        <IconSpinAnimation v-if="is('createMarks')" />
        Search
      </button>
    </div>

    <div
      class="mt-6"
      v-if="markData && markData.length"
    >
      <div class="flex flex-col">
        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div class="overflow-x-auto rounded-lg">
              <table class="min-w-full">
                <thead class="border-b bg-gray-800">
                  <tr>
                    <th
                      scope="col"
                      class="
                        text-sm
                        font font-medium
                        text-white
                        px-6
                        py-4
                        text-left
                      "
                      v-for="(column, index) in columns"
                      :key="index"
                    >
                      {{ column.name }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    class="
                      bg-white
                      border-b
                      transition
                      duration-300
                      ease-in-out
                      hover:bg-gray-100
                    "
                    v-for="(row, index) in sortedList"
                    :key="index"
                  >
                    <td
                      class="
                        text-sm text-gray-900
                        font font-medium
                        px-6
                        py-4
                        whitespace-nowrap
                      "
                    >
                      {{ row.roll_number }}
                    </td>
                    <td
                      class="
                        text-sm text-gray-900
                        font font-medium
                        px-6
                        py-4
                        whitespace-nowrap
                        capitalize
                      "
                    >
                      {{ row.subject_name }}
                    </td>
                    <td
                      class="
                        text-sm text-gray-900
                        font font-medium
                        px-6
                        py-4
                        whitespace-nowrap
                      "
                    >
                      <select
                        class="
                          form-select
                          appearance-none
                          width
                          px-3
                          py-1.5
                          text-base
                          font-normal
                          text-gray-700
                          bg-white bg-clip-padding bg-no-repeat
                          border border-solid border-gray-300
                          rounded
                          transition
                          ease-in-out
                          m-0
                          focus:text-gray-700
                          focus:bg-white
                          focus:border-blue-600
                          focus:outline-none
                        "
                        aria-label="Default select example"
                        v-model="row.attendent"
                      >
                        <option value="">Attendent</option>
                        <option
                          v-for="(option, index) in options"
                          :key="index"
                          :value="option.value"
                          :selected="index == 1"
                        >
                          {{ option.name }}
                        </option>
                      </select>
                    </td>
                    <td
                      class="
                        text-sm text-gray-900
                        font font-medium
                        px-6
                        py-4
                        whitespace-nowrap
                      "
                    >
                      <div class="wrapper">
                        <input
                          class="font"
                          type="number"
                          :min="0"
                          :max="row.cq_full_mark"
                          v-model.number="row.cq"
                        />
                      </div>
                    </td>
                    <td
                      class="
                        text-sm text-gray-900
                        font font-medium
                        px-6
                        py-4
                        whitespace-nowrap
                      "
                    >
                      <div v-if="row.mcq_full_mark" class="wrapper">
                        <input
                          class="font"
                          type="number"
                          :min="0"
                          :max="row.mcq_full_mark"
                          v-model.number="row.mcq"
                        />
                      </div>
                    </td>
                    <td
                      class="
                        text-sm text-gray-900
                        font font-medium
                        px-6
                        py-4
                        whitespace-nowrap
                      "
                    >
                      <div v-if="row.practical_full_mark" class="wrapper">
                        <input
                          class="font"
                          type="number"
                          :min="0"
                          :max="row.practical_full_mark"
                          v-model.number="row.practical"
                        />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="px-6 py-2" v-if="markData && markData.length">
      <hr class="my-8" />

      <button
        @click.prevent="submitStudentMarks"
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
        <IconSpinAnimation v-if="is('createMarks')" />
        Submit
      </button>

      <button
        @click.prevent="resetAll"
        class="
          inline-flex
          justify-center
          items-center
          py-3
          px-16
          border border-transparent
          rounded-md
          ml-4
          font-medium
          text-black
          shadow-gbtn
          focus:outline-none
          focus:ring-2
          focus:ring-offset-2
          focus:ring-indigo-500
        "
      >
        Reset
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
import { required, minLength, email, alpha } from "vuelidate/lib/validators";

import ShowUrl from "~/components/shared/ShowUrl";
import DownArrow from "~/components/Icons/DownArrow";
import IconSpinAnimation from "~/components/SpinAnimaiton";

export default {
  components: {
    DownArrow,
    IconSpinAnimation,
  },

  data() {
    return {
      widthStudent: true,
      shadowStudent: true,
      marBottom: true,
      mainContents: {
        folderName: "marks",
        compName: "upload-marks",
        topicName: "Upload Marks",
      },

      marks: {
        session: "",
        exam_name: "",
      },

      input: { cqNum: "", mcqNum: "", practicalNum: "" },

      options: [
        { name: "Present", value: "present" },
        { name: "Absent", value: "absent" },
      ],

      examName: {
        name: "Exam Name",
        options: [
          { name: "test", value: "test" },
          { name: "pre-test", value: "pre-test" },
          { name: "half-yearly", value: "half-yearly" },
          { name: "year-final", value: "year-final" },
        ],
      },

      columns: [
        {
          name: "Roll Number",
          value: "roll_number",
        },
        {
          name: "Subject Name",
          value: "subject_name",
        },
        {
          name: "Attendent",
          value: "attendent",
        },
        {
          name: "CQ",
          value: "cq",
        },
        {
          name: "MCQ",
          value: "mcq",
        },
        {
          name: "Practical",
          value: "practical",
        },
      ],

      markData: [],
    };
  },

  validations: {
    marks: {
      session: {
        required,
      },
      exam_name: {
        required,
      },
    },
  },

  computed: {
    ...mapState(["session", "marksResponse", "markTableUpdateResponse"]),
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

    sortedList() {
      let arr = []
      if(this.marksResponse && this.marksResponse.length) {

        this.marksResponse.map((item) => {
          arr.push(item)
        })
      }

      arr.sort((a,b) => {
        return a.roll_number - b.roll_number
      })

      return arr;
    }
  },

  methods: {
    ...mapActions(["getSession", "createMarks", "createMarkTableUpdate", "createMarksClear"]),

    examNameChanged(value) {
      console.log(`Exam Changed value ${value}`);
      this.marks.exam_name = value;
    },

    sessionChanged(value) {
      console.log(`Session Changed value ${value}`);
      this.marks.session = value;
    },

    async fetchData() {
      if (this.$route.query && this.$route.query.exam_name && this.$route.query.session) {
        await this.createMarks({
          exam_name: this.$route.query.exam_name,
          session: this.$route.query.session
        });
      } else {
        this.createMarksClear()
      }
    },

    async uploadMarks() {
      this.$router.push({
        path: "/marks/list",
        query: this.marks
      }) 
    },

    async submitStudentMarks() {
      console.log(this.markData);
      await this.createMarkTableUpdate(this.markData);
    },

    resetAll() {
      this.$router.push("/marks/list")
      this.marks.session = "";
      this.marks.exam_name = "";
      this.markData = [];
      this.$v.$reset();
    },
  },

  mounted() {
    this.getSession();
    this.fetchData();
    this.markData = JSON.parse(JSON.stringify(this.marksResponse));
  },
  watch: {
    marksResponse: function (v) {
      this.markData = JSON.parse(JSON.stringify(v));
    },

    "$route": function(val) {
      this.fetchData()
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper input {
  background-color: #ffffff;
  color: #000000;
  font-size: 14px;
  font-weight: bold;
  border: 1px solid gray;
  padding: 7px 10px;
  outline: none;
  border-radius: 4px;
}
</style>
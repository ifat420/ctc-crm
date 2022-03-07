<template>
  <div>
    <!-- ................... Select Option ................................. -->

    <h2 class="text-3xl font-medium">Upload Marks Subjectwise</h2>

    <div class="mt-6">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-10 mb-10">
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
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-10">
        <div>
          <label for="group" class="text-sm"> Group</label>
          <div class="flex flex-col">
            <div class="relative">
              <select
                v-model="marks.group"
                @blur="$v.marks.group.$touch()"
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
                    $v.marks.group.$dirty && $v.marks.group.$invalid,
                }"
              >
                <option value="">Select Group</option>
                <option
                  v-for="(item, index) in groupList"
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
            v-if="!$v.marks.group.required && $v.marks.group.$dirty"
            class="text-red-500 text-xs mt-2"
          >
            Group is required.
          </p>
        </div>

        <div>
          <label for="subject_name" class="text-sm"> Subject Name</label>
          <div class="flex flex-col">
            <div class="relative">
              <select
                v-model="marks.subject_name"
                @blur="$v.marks.subject_name.$touch()"
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
                    $v.marks.subject_name.$dirty &&
                    $v.marks.subject_name.$invalid,
                }"
              >
                <option value="">Select Subject Name</option>
                <option
                  v-for="(item, index) in subjectList.options"
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
            v-if="
              !$v.marks.subject_name.required && $v.marks.subject_name.$dirty
            "
            class="text-red-500 text-xs mt-2"
          >
            Subject Name is required.
          </p>
        </div>
      </div>

      <hr class="my-8" />

      <button
        @click.prevent="uploadSubjectMarks"
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
        <IconSpinAnimation v-if="is('createMarksOnSubject')" />
        Submit
      </button>
    </div>

    <div
      class="px-6 py-6 bg-color-whiteTwo m-6 box-shadow-dashboard sm:rounded-lg"
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
                    v-for="(row, index) in markData"
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
                        <option value="">Select Attendent</option>
                        <option
                          v-for="(option, index) in options"
                          :key="index"
                          :value="option.value"
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

    <div
      v-if="
        isError('createMarkTableUpdate') &&
        isError('createMarkTableUpdate').has_error
      "
      class="inline-block px-4 py-3 bg-red-500 ml-6 rounded-lg"
    >
      <h1 class="font text-white">
        {{ isError("createMarkTableUpdate").error }}
      </h1>
    </div>

    <div class="px-6 py-2" v-if="markData && markData.length">
      <div class="gap-x-4">
        <button
          class="btn block rounded-lg font relative"
          :disabled="is('createMarksOnSubject')"
          @click="submitSubjectMarks"
        >
          Submit
          <span :class="{ 'load loading': is('createMarksOnSubject') }"></span>
        </button>
        <div></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
import { required, minLength, email } from "vuelidate/lib/validators";
import DownArrow from "~/components/Icons/DownArrow";
import IconSpinAnimation from "~/components/SpinAnimaiton";

export default {
  components: {
    DownArrow,
    IconSpinAnimation,
  },

  data() {
    return {
      hasSuccess: false,
      widthStudent: true,
      shadowStudent: true,
      marBottom: true,
      mainContents: {
        folderName: "marks",
        compName: "upload-marks-subjectwise",
        topicName: "Upload Marks Subjectwise",
      },

      marks: {
        session: "",
        exam_name: "",
        group: "",
        subject_name: "",
      },

      examName: {
        name: "Exam Name",
        options: [
          { name: "Test", value: "test" },
          { name: "Pre Test", value: "pre-test" },
          { name: "Half Yearly", value: "half-yearly" },
          { name: "Year Final", value: "year-final" },
        ],
      },

      options: [
        { name: "Present", value: "present" },
        { name: "Absent", value: "absent" },
      ],

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
      group: {
        required,
      },
      subject_name: {
        required,
      },
    },
  },

  computed: {
    ...mapState([
      "session",
      "group",
      "marksResponse",
      "createSubjectResponse",
      "marksOnSubjectResponse",
      "markTableUpdateResponse",
    ]),
    ...mapGetters(["is", "isError"]),
    ...mapGetters("other", ["getExams", "getGroups"]),

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
    groupList() {
      let exm = JSON.parse(JSON.stringify(this.getGroups));
      exm.shift();
      return exm;
    },

    subjectList() {
      let obj = {};
      obj.name = "Subject";
      obj.options = [];

      if (this.createSubjectResponse && this.createSubjectResponse.length) {
        this.createSubjectResponse.forEach((item) => {
          let ob = {};
          ob.name = item;
          ob.value = item;
          obj.options.push(ob);
        });
      }
      return obj;
    },
  },

  methods: {
    ...mapActions([
      "getSession",
      "getGroup",
      "createSubjects",
      "createMarks",
      "createMarksOnSubject",
      "createMarkTableUpdate",
    ]),

    examNameChanged(value) {
      console.log(`Exam Changed value ${value}`);
      this.marks.exam_name = value;
    },

    sessionChanged(value) {
      console.log(`Session Changed value ${value}`);
      this.marks.session = value;
    },

    groupChanged(value) {
      console.log(`Group Changed value ${value}`);
      this.marks.group = value;
    },

    subjectChanged(value) {
      console.log(`subject Changed value ${value}`);
      this.marks.subject_name = value;
    },

    async submitSubjectMarks() {
      console.log(this.markData);
      console.log("mark response", this.markTableUpdateResponse);
      await this.createMarkTableUpdate(this.markData);
      if (
        this.markTableUpdateResponse &&
        this.markTableUpdateResponse.message
      ) {
        this.$successToast(this.markTableUpdateResponse.message);
        console.log(
          "this.markTableUpdateResponse.message :>> ",
          this.markTableUpdateResponse.message
        );
        this.hasSuccess = true;
      }
    },

    async uploadSubjectMarks() {
      this.markData = [];
      this.$v.$touch();
      if (this.$v.marks.$anyError == false) {
        await this.createMarksOnSubject({
          exam_name: this.marks.exam_name,
          session: this.marks.session,
          subject_name: this.marks.subject_name,
        });
        this.$successToast(this.markTableUpdateResponse.message);
        console.log("UPLOADED");
      }

    //   this.$v.marks.$reset();
    },
  },

  mounted() {
    this.getSession();
    this.getGroup();
    this.markData = JSON.parse(JSON.stringify(this.marksOnSubjectResponse));
  },

  watch: {
    marksOnSubjectResponse: function (v) {
      this.markData = JSON.parse(JSON.stringify(v));
      console.log(this.markData);
    },

    "marks.group": async function (val) {
      console.log("watching", val);
      if (val) {
        await this.createSubjects({ group: val });
      }
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
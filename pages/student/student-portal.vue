<template>
  <div class="flex h-screen justify-center items-center bg-white">
    <div
      class="
        flex flex-col
        self-start
        sm:self-center
        gap-y-6
        max-w-lg
        w-full
        bg-white
        rounded-xl
        sm:shadow-lg
        px-6
        py-12
        sm:text-left
      "
    >
      <div
        class="w-full flex flex-col gap-y-4 items-start sm:items-center px-3"
      >
        <div class="shrink-0">
          <LogoMomin />
        </div>
        <h1 class="color-black text-xl font-bold antialiased font">
          Fill Up The Form
        </h1>
      </div>

      <!-- <form class="w-full flex flex-col" @submit.prevent="showSingleStudentData"> -->

      <div
        class="flex flex-wrap justify-between items-center gap-y-4 pb-4 w-full"
      >
        <div class="w-full flex flex-col gap-y-4">
          <div>
            <label for="session" class="text-sm"> Session </label>
            <div class="flex flex-col">
              <div class="relative">
                <select
                  v-model="student.session"
                  @blur="$v.student.session.$touch()"
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
                      $v.student.session.$dirty && $v.student.session.$invalid,
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
              v-if="!$v.student.session.required && $v.student.session.$dirty"
              class="text-red-500 text-xs mt-2"
            >
              Session is required.
            </p>
          </div>

          <div>
            <label for="exam_name" class="text-sm"> Exam Name</label>
            <div class="flex flex-col">
              <div class="relative">
                <select
                  v-model="student.exam_name"
                  @blur="$v.student.exam_name.$touch()"
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
                      $v.student.exam_name.$dirty &&
                      $v.student.exam_name.$invalid,
                  }"
                >
                  <option value="">Select Exam Name</option>
                  <option
                    v-for="(item, index) in examName.options"
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
                !$v.student.exam_name.required && $v.student.exam_name.$dirty
              "
              class="text-red-500 text-xs mt-2"
            >
              Exam Name is required.
            </p>
          </div>

          <div>
            <label for="group" class="text-sm">Group</label>
            <div class="flex flex-col">
              <div class="relative">
                <select
                  v-model="student.group"
                  @blur="$v.student.group.$touch()"
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
                      $v.student.group.$dirty && $v.student.group.$invalid,
                  }"
                >
                  <option value="">Select Group</option>
                  <option
                    v-for="(item, index) in groupList.options"
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
              v-if="!$v.student.group.required && $v.student.group.$dirty"
              class="text-red-500 text-xs mt-2"
            >
              Group is required.
            </p>
          </div>

          <div class="">
            <label class="text-sm" for="grid-state"> Roll No. </label>
            <input
              class="
                sm:shadow-sm
                w-full
                py-3
                px-3
                rounded
                focus:outline-none
                text-sm
                box-shadow
                mt-4
              "
              type="text"
              placeholder="Roll Number"
              v-model.number="student.roll_number"
              :class="{
                    'border border-red-500':
                      $v.student.roll_number.$dirty && $v.student.roll_number.$invalid,
                  }"
            />
          </div>
          <span
            v-if="
              !$v.student.roll_number.required && $v.student.roll_number.$dirty
            "
            class="text-red-500 text-xs"
            >Roll Number is required</span
          >
        </div>
      </div>

      <button
        class="py-3
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
          focus:ring-indigo-500"
        :disabled="is('postStudentInformation')"
        @click.prevent="showSingleStudentData"
      >
        Submit
        <span :class="{ 'load loading': is('postStudentInformation') }"></span>
      </button>
      <!-- </form> -->
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
import { required, minLength, email } from "vuelidate/lib/validators";
import LogoMomin from "~/components/shared/LogoMomin";
import SelectInputSession from "~/components/shared/Input/SelectInputSession";
import SelectInputGroup from "~/components/shared/Input/SelectInputGroup";
import SelectInputExamName from "~/components/shared/Input/SelectInputExamName";
import SelectInputClass from "~/components/shared/Input/SelectInputClass";
import DownArrow from "~/components/Icons/DownArrow";

export default {
  layout: "others",

  components: {
    LogoMomin,
    SelectInputSession,
    SelectInputGroup,
    SelectInputExamName,
    SelectInputClass,
    DownArrow,
  },

  data() {
    return {
      widthStudent: true,
      shadowStudent: true,
      marBottom: true,
      student: {
        session: "",
        exam_name: "",
        roll_number: null,
        group: "",
      },

      examName: {
        name: "Exam Name",
        options: [
          { name: "test", value: "test" },
          { name: "pre-test", value: "pre-test" },
          { name: "half-yearly", value: "half-yearly" },
          { name: "year-final", value: "year-final" },
        ],
      },

      widthStyle: true,
    };
  },

  validations: {
    student: {
      session: {
        required,
      },
      exam_name: {
        required,
      },
      group: {
        required,
      },
      roll_number: {
        required,
      },
    },
  },

  computed: {
    ...mapState(["session", "exams", "group"]),
    ...mapGetters(["is", "isError"]),

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

    groupList() {
      let obj = {};
      obj.name = "Group";
      obj.options = [];

      if (this.group && this.group.length) {
        this.group.forEach((item) => {
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
      "getExams",
      "getGroup",
      "postStudentInformation",
    ]),

    sessionChanged(value) {
      console.log(`Class Changed value ${value}`);
      this.student.session = value;
      console.log(this.student.session);
    },

    examChanged(value) {
      console.log(`Class Changed value ${value}`);
      this.student.exam_name = value;
      console.log(this.student.exam_name);
    },

    groupChanged(value) {
      console.log(`Class Changed value ${value}`);
      this.student.group = value;
      console.log(this.student.group);
    },

    async showSingleStudentData() {
      this.$v.$touch();
      console.log('typeof(this.student.roll_number) :>> ', typeof(this.student.roll_number));
      if (
        this.$v.student.session.$anyError == false &&
        this.$v.student.group.$anyError == false &&
        this.$v.student.exam_name.$anyError == false &&
        this.$v.student.roll_number.$anyError == false
      ) {
        await this.postStudentInformation(this.student);
        this.$router.push({
          path: "/student/show-student-info",
          query: this.student,
        });
        console.log('this.singleStudentInfo :>> ', this.singleStudentInfo);
      }
    },
  },

  mounted() {
    this.getSession();
    this.getGroup();
    this.postStudentInformation();
  },
};
</script>

<style>
</style>
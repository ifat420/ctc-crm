<template>
  <div>
    <h2 class="text-3xl font-medium">Create A Student</h2>
    <div>
      <div class="mt-6">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-10">
          <div>
            <label for="first_name" class="text-sm">First Name </label>
            <input
              id="first_name"
              name="first_name"
              type="text"
              autocomplete="first_name"
              placeholder="First Name"
              @blur="$v.student.first_name.$touch()"
              v-model="student.first_name"
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
              "
              :class="{
                'border border-red-500':
                  $v.student.first_name.$dirty &&
                  $v.student.first_name.$invalid,
              }"
            />
            <p
              v-if="
                !$v.student.first_name.required && $v.student.first_name.$dirty
              "
              class="text-red-500 text-xs mt-2"
            >
              First Name is required.
            </p>
          </div>
          <div>
            <label for="last_name" class="text-sm">Last Name</label>
            <input
              id="last_name"
              name="last_name"
              type="text"
              autocomplete="last_name"
              placeholder="Last Name"
              @blur="$v.student.last_name.$touch()"
              v-model="student.last_name"
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
              "
              :class="{
                'border border-red-500':
                  $v.student.last_name.$dirty && $v.student.last_name.$invalid,
              }"
            />
            <p
              v-if="
                !$v.student.last_name.required && $v.student.last_name.$dirty
              "
              class="text-red-500 text-xs mt-2"
            >
              Last Name is required.
            </p>
          </div>
        </div>
        <hr class="my-8" />
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-10">
          <div>
            <label for="father_name" class="text-sm">Father Name </label>
            <input
              id="father_name"
              name="father_name"
              type="text"
              autocomplete="father_name"
              placeholder="Father Name"
              v-model="student.father_name"
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
              "
            />
          </div>
          <div>
            <label for="mother_name" class="text-sm">Mother Name </label>
            <input
              id="mother_name"
              name="mother_name"
              type="text"
              autocomplete="mother_name"
              placeholder="Mother Name"
              v-model="student.mother_name"
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
              "
            />
          </div>
        </div>
        <hr class="my-8" />

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-10">
          <div>
            <label for="subject_name" class="text-sm">Roll Number </label>
            <input
              id="roll_number"
              name="roll_number"
              type="text"
              autocomplete="roll_number"
              placeholder="Roll Number"
              @blur="$v.student.roll_number.$touch()"
              v-model="student.roll_number"
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
              "
              :class="{
                'border border-red-500':
                  $v.student.roll_number.$dirty &&
                  $v.student.roll_number.$invalid,
              }"
            />
            <p
              v-if="
                !$v.student.roll_number.required &&
                $v.student.roll_number.$dirty
              "
              class="text-red-500 text-xs mt-2"
            >
              Roll Number is required.
            </p>
          </div>
          <div class="">
            <label class="text-sm" for="reg_number">
              Registration Number
            </label>
            <input
              id="reg_number"
              name="reg_number"
              type="text"
              autocomplete="reg_number"
              placeholder="Registration Number"
              v-model.trim="student.reg_number"
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
              "
            />
          </div>
        </div>
        <hr class="my-8" />
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-10">
          <div>
            <label for="class" class="text-sm"> Class </label>
            <div class="flex flex-col">
              <div class="relative">
                <select
                  v-model="student.class"
                  @blur="$v.student.class.$touch()"
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
                      $v.student.class.$dirty && $v.student.class.$invalid,
                  }"
                >
                  <option value="">Select Class</option>
                  <option
                    v-for="(item, index) in classList"
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
              v-if="!$v.student.class.required && $v.student.class.$dirty"
              class="text-red-500 text-xs mt-2"
            >
              Class is required.
            </p>
          </div>
          <div>
            <label for="session" class="text-sm"> Session </label>
            <input
              id="session"
              name="session"
              type="text"
              autocomplete="session"
              placeholder="2020-2021"
              v-model.trim="student.session"
              @blur="$v.student.session.$touch()"
              :class="{
                'border border-red-500':
                  $v.student.session.$dirty && $v.student.session.$invalid,
              }"
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
              "
            />
            <p
              v-if="!$v.student.session.required && $v.student.session.$dirty"
              class="text-red-500 text-xs mt-2"
            >
              Session is required.
            </p>
          </div>
        </div>
        <hr class="my-8" />
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-10">
          <div>
            <label for="group" class="text-sm"> Group </label>
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
              v-if="!$v.student.group.required && $v.student.group.$dirty"
              class="text-red-500 text-xs mt-2"
            >
              Group is required.
            </p>
          </div>
          <div>
            <label for="gender" class="text-sm"> Gender </label>
            <div class="flex flex-col">
              <div class="relative">
                <select
                  v-model="student.gender"
                  @blur="$v.student.gender.$touch()"
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
                      $v.student.gender.$dirty && $v.student.gender.$invalid,
                  }"
                >
                  <option value="">Select Gender</option>
                  <option
                    v-for="(item, index) in gender.options"
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
              v-if="!$v.student.gender.required && $v.student.gender.$dirty"
              class="text-red-500 text-xs mt-2"
            >
              Gender is required.
            </p>
          </div>
        </div>
        <hr class="my-8" />
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-10">
          <div>
            <label for="type_of_student" class="text-sm"> Student Type </label>
            <div class="flex flex-col">
              <div class="relative">
                <select
                  v-model="student.type_of_student"
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
                >
                  <option value="">Select Student Type</option>
                  <option
                    v-for="(item, index) in studentType.options"
                    :key="index"
                    :value="item.value"
                  >
                    {{ item.name }}
                  </option>
                </select>
                <DownArrow class="absolute w-auto h-auto top-9 right-4" />
              </div>
            </div>
          </div>
        </div>
        <hr class="my-8" />

        <div class="flex flex-col gap-y-4 gap-x-10 py-6 inputText-border">
          <div>
            <h1 class="text-xl font-medium">Required Subjects</h1>
          </div>
          <div class="flex items-center gap-x-4 flex-wrap">
            <div
              v-for="(required, index) in requiredSubjectResponse"
              :key="index"
            >
              <div class="shadow-sm p-2">
                <p class="font capitalize">{{ required }}</p>
              </div>
            </div>
          </div>
        </div>
        <hr class="my-8" />
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-10 mt-6">
          <div>
            <label for="mendatory" class="text-sm">
              Mendatory Subject <span v-if="isRequired">1</span>
            </label>
            <div class="flex flex-col">
              <div class="relative">
                <select
                  v-model="twoSubjects.mendatory"
                  @blur="$v.twoSubjects.mendatory.$touch()"
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
                      $v.twoSubjects.mendatory.$dirty &&
                      $v.twoSubjects.mendatory.$invalid,
                  }"
                >
                  <option value="">Select Class</option>
                  <option
                    v-for="(item, index) in fourthSubjectList.options"
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
                !$v.twoSubjects.mendatory.required &&
                $v.twoSubjects.mendatory.$dirty
              "
              class="text-red-500 text-xs mt-2"
            >
              Mendatory Subject <span v-if="isRequired">1</span> is required.
            </p>
          </div>

          <div v-if="isRequired">
            <label for="mendatory2" class="text-sm">
              Mendatory Subject 2
            </label>
            <div class="flex flex-col">
              <div class="relative">
                <select
                  v-model="requiredSubject2"
                  @blur="$v.requiredSubject2.$touch()"
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
                      $v.requiredSubject2.$dirty &&
                      $v.requiredSubject2.$invalid,
                  }"
                >
                  <option value="">Select Class</option>
                  <option
                    v-for="(item, index) in fourthSubjectList.options"
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
              v-if="!$v.requiredSubject2.required && $v.requiredSubject2.$dirty"
              class="text-red-500 text-xs mt-2"
            >
              Mendatory Subject 2 is required.
            </p>
          </div>

          <div v-if="isRequired">
            <label for="mendatory3" class="text-sm">
              Mendatory Subject 3
            </label>
            <div class="flex flex-col">
              <div class="relative">
                <select
                  v-model="requiredSubject3"
                  @blur="$v.requiredSubject3.$touch()"
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
                      $v.requiredSubject3.$dirty &&
                      $v.requiredSubject3.$invalid,
                  }"
                >
                  <option value="">Select Class</option>
                  <option
                    v-for="(item, index) in fourthSubjectList.options"
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
              v-if="!$v.requiredSubject3.required && $v.requiredSubject3.$dirty"
              class="text-red-500 text-xs mt-2"
            >
              Mendatory Subject 3 is required.
            </p>
          </div>
        </div>
        <hr class="my-8" />

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-10 mt-6">
          <div>
            <label for="mendatory" class="text-sm"> Optional Subject </label>
            <div class="flex flex-col">
              <div class="relative">
                <select
                  v-model="twoSubjects.optional"
                  @blur="$v.twoSubjects.optional.$touch()"
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
                      $v.twoSubjects.optional.$dirty &&
                      $v.twoSubjects.optional.$invalid,
                  }"
                >
                  <option value="">Select Session</option>
                  <option
                    v-for="(item, index) in fourthSubjectList.options"
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
                !$v.twoSubjects.optional.required &&
                $v.twoSubjects.optional.$dirty
              "
              class="text-red-500 text-xs mt-2"
            >
              Optional Subject is required.
            </p>
          </div>
        </div>
      </div>

     

      <hr class="my-8" />

      <button
        @click.prevent="uploadAStudent"
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
        <IconSpinAnimation v-if="is('postCreateStudent')" />
        Create Student
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
import {
  required,
  minLength,
  email,
  alpha,
  requiredIf,
} from "vuelidate/lib/validators";
import DownArrow from "~/components/Icons/DownArrow";
import IconSpinAnimation from "~/components/SpinAnimaiton";

export default {
  components: {
    DownArrow,
    IconSpinAnimation,
  },

  data() {
    return {
      // rows: this.getAllStudentResponse.rows,
      mainContents: {
        folderName: "students",
        compName: "create-a-student",
        topicName: "Create A Student",
      },
      widthStudent: true,
      shadowStudent: true,
      marBottom: true,
      gender: {
        name: "Gender",
        options: [
          { name: "Male", value: "Male" },
          { name: "Female", value: "Female" },
        ],
      },
      studentType: {
        name: "Student Type",
        options: [
          { name: "Regular", value: "regular" },
          { name: "Irregular", value: "irregular" },
        ],
      },
      student: {
        session: "",
        group: "",
        class: "",
        gender: "",
        type_of_student: "",
        reg_number: "",
        roll_number: "",
        first_name: "",
        last_name: "",
        father_name: "",
        mohter_name: "",
      },

      subjectName: {
        nameOne: "Mandatory Subject",
        nameTwo: "Optional Subject",
      },

      twoSubjects: {
        mendatory: "",
        optional: "",
      },

      fourthSubjects: "",

      optionalSubjectList: [],

      requiredSubject2: "",
      requiredSubject3: "",
    };
  },

  computed: {
    ...mapState([
      "session",
      "group",
      "class",
      "aStudent",
      "getAllStudentResponse",
      "optionalSubjectResponse",
      "requiredSubjectResponse",
    ]),
    ...mapGetters(["is", "isError"]),
    ...mapGetters("other", ["getGroups"]),

    isRequired() {
      if (this.student.group == "humanities") return true;
      else return false;
    },

    fullName() {
      if (
        this.getAllStudentResponse.rows &&
        this.getAllStudentResponse.rows.length
      ) {
        this.getAllStudentResponse.rows.forEach((row) => {
          let fullName = row.first_name.concat(row.last_name);
          return fullName;
        });
      }
    },

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
      let glist = JSON.parse(JSON.stringify(this.getGroups));
      if (glist && glist.length > 0) {
        glist.shift();
      }
      return glist;
    },

    fourthSubjectList() {
      let obj = {};
      obj.name = "Fourth Subject";
      obj.options = [];

      if (this.optionalSubjectResponse && this.optionalSubjectResponse.length) {
        this.optionalSubjectResponse.forEach((item) => {
          let ob = {};
          ob.name = item;
          ob.value = item;
          obj.options.push(ob);
        });
      }
      return obj;
    },

    classList() {
      return [
        {
          name: "XI",
          value: "xi",
        },
        {
          name: "XII",
          value: "xii",
        },
      ];
    },
  },

  validations: {
    student: {
      session: {
        required,
      },
      class: {
        required,
      },
      group: {
        required,
      },
      gender: {
        required,
      },
      first_name: {
        required,
        alpha,
      },
      last_name: {
        required,
        alpha,
      },
      roll_number: {
        required,
      },
    },

    twoSubjects: {
      mendatory: {
        required,
      },
      optional: {
        required,
      },
    },

    requiredSubject2: {
      required: requiredIf(function () {
        return this.student.group == "humanities";
      }),
    },

    requiredSubject3: {
      required: requiredIf(function () {
        return this.student.group == "humanities";
      }),
    },
  },

  methods: {
    ...mapActions([
      "getSession",
      "getGroup",
      "getClass",
      "postCreateStudent",
      "getAllStudent",
      "getOptionalSubject",
      "getRequiredSubject",
    ]),

    sessionChanged(value) {
      this.student.session = value;
    },

    async groupChanged(value) {
      this.student.group = value;
    },

    classChanged(value) {
      this.student.class = value;
    },

    genderChanged(value) {
      this.student.gender = value;
    },
    studentTypeChanged(value) {
      this.student.type_of_student = value;
    },

    mandatoryChanged(value) {
      this.twoSubjects.mendatory = value;
      let obj = {};
      obj.name = value;
      obj.type = "mandatory";
      this.optionalSubjectList.push(obj);
    },

    optionalChanged(value) {
      this.twoSubjects.optional = value;
      let obj = {};
      obj.name = value;
      obj.type = "optional";
      this.optionalSubjectList.push(obj);
    },

    async uploadAStudent() {
      this.$v.$touch();
     
      if (
        this.$v.student.$anyError == false &&
        this.$v.twoSubjects.$anyError == false
      ) {
        this.optionalSubjectList = []
        if (this.student.group == "humanities") {
          this.optionalSubjectList.push({
            name: this.requiredSubject2,
            type: "mandatory",
          });
          this.optionalSubjectList.push({
            name: this.requiredSubject3,
            type: "mandatory",
          });
        }

          this.optionalSubjectList.push({
            name: this.twoSubjects.mendatory,
            type: "mandatory",
          });
          this.optionalSubjectList.push({
            name: this.twoSubjects.optional,
            type: "optional",
          });


        await this.postCreateStudent({
          student_info: this.student,
          optional_subjects: this.optionalSubjectList,
        });
       
        console.log(this.optionalSubjectList);
      }

      // this.student.session = "",
      // this.student.class = "",
      // this.student.group = "",
      // this.student.gender = "",
      // this.student.roll_number = "",
      // this.student.reg_number = "",
      // this.student.first_name = "",
      // this.student.last_name = "",
      // this.student.father_name = "",
      // this.student.mohter_name = "",
      // this.student.type_of_student = "",
      // this.twoSubjects.mendatory = ""
      // this.twoSubjects.optional = ""
    },
  },

  watch: {
    "student.group": async function (val) {
      if (val) {
        await this.getOptionalSubject({ group: val });
        await this.getRequiredSubject({ group: val });
      }
    }
  },

  mounted() {
    this.getSession();
    this.getClass();
  },
};
</script>

<style>
</style>
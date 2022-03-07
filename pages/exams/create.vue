<template>
  <div>
    <h2 class="text-3xl font-medium">Create A Exam</h2>
    <div>
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
        <hr class="my-8" />

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-10 mb-10">
          <div>
            <label for="exam_year" class="text-sm"> Exam Year </label>

            <input
            id="exam_year"
            name="exam_year"
            type="text"
            autocomplete="exam_year"
            placeholder="Exam Year"
            @blur="$v.exam.exam_year.$touch()"
            v-model="exam.exam_year"
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
                $v.exam.exam_year.$dirty && $v.exam.exam_year.$invalid,
            }"
          />

           
            <p
              v-if="!$v.exam.exam_year.required && $v.exam.exam_year.$dirty"
              class="text-red-500 text-xs mt-2"
            >
              Exam Year is required.
            </p>
          </div>
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
  </div>
</template>

<script>
import DownArrow from "~/components/Icons/DownArrow";
import IconSpinAnimation from "~/components/SpinAnimaiton";

import { mapActions, mapState, mapGetters } from "vuex";
import { required, minLength, email, alpha } from "vuelidate/lib/validators";
export default {
  components: {
    DownArrow,
    IconSpinAnimation,
  },

  data() {
    return {
      mainContents: {
        folderName: "exams",
        compName: "create-a-exam",
        topicName: "Create A Exam",
      },
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
        exam_year: "",
        session: "",
      },
    };
  },

  validations: {
    exam: {
      exam_name: {
        required,
      },
      exam_year: {
        required,
      },
      session: {
        required,
      },
    },
  },

  computed: {
    ...mapState(["aExam", "session"]),
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
      let exm = JSON.parse(JSON.stringify(this.getExams))
      exm.shift()
      return exm;
    }
  },

  methods: {
    ...mapActions(["postCreateExam", "getSession"]),

    examNameChanged(value) {
      console.log(`Exam Changed value ${value}`);
      this.exam.exam_name = value;
    },

    sessionChanged(value) {
      console.log(`Session Changed value ${value}`);
      this.exam.session = value;
    },

    async uploadAExam() {
      this.$v.$touch();
      console.log("EXAM", this.$v.exam);
      if (this.$v.exam.$anyError == false) {
        await this.postCreateExam(this.exam);
        this.hasSuccess = true;
        console.log("UPLOADED");
      }
      this.hasSuccess = false;
      (this.exam.exam_name = ""),
        (this.exam.exam_year = ""),
        (this.exam.session = "");
    },
  },

  mounted() {
    this.getSession();
  },
};
</script>

<style>
</style>
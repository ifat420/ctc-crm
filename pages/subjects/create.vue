<template>
  <div>
    <h2 class="text-3xl font-medium">Add New Subject</h2>

    <div class="mt-6">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-10">
        <div>
          <label for="subject_name" class="text-sm">Subject Name </label>
          <input
            id="subject_name"
            name="subject_name"
            type="text"
            autocomplete="subject_name"
            placeholder="Subject Name"
            @blur="$v.subject.name.$touch()"
            v-model="subject.name"
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
                $v.subject.name.$dirty && $v.subject.name.$invalid,
            }"
          />
          <p
            v-if="!$v.subject.name.required && $v.subject.name.$dirty"
            class="text-red-500 text-xs mt-2"
          >
            Subject Name is required.
          </p>
        </div>
        <div>
          <label for="subject_code" class="text-sm">Subject Code </label>
          <input
            id="subject_code"
            name="subject_code"
            type="text"
            autocomplete="subject_code"
            placeholder="Subject Code"
            @blur="$v.subject.code.$touch()"
            v-model="subject.code"
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
                $v.subject.code.$dirty && $v.subject.code.$invalid,
            }"
          />
          <p
            v-if="!$v.subject.code.required && $v.subject.code.$dirty"
            class="text-red-500 text-xs mt-2"
          >
            Subject Code is required.
          </p>
        </div>
      </div>
      <hr class="my-8" />

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-10">
        <div>
          <label for="cq_mark" class="text-sm">CQ Full Mark</label>
          <input
            id="cq_mark"
            name="cq_mark"
            type="text"
            autocomplete="cq_mark"
            placeholder="CQ Mark"
            @blur="$v.subject.cq_full_mark.$touch()"
            v-model="subject.cq_full_mark"
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
                $v.subject.cq_full_mark.$dirty &&
                $v.subject.cq_full_mark.$invalid,
            }"
          />
          <p
            v-if="
              !$v.subject.cq_full_mark.required &&
              $v.subject.cq_full_mark.$dirty
            "
            class="text-red-500 text-xs mt-2"
          >
            CQ Full Mark is required.
          </p>
        </div>
        <div>
          <label for="mcq_mark" class="text-sm">MCQ Full Mark </label>
          <input
            id="mcq_mark"
            name="mcq_mark"
            type="text"
            autocomplete="mcq_mark"
            placeholder="MCQ Full Mark"
            @blur="$v.subject.mcq_full_mark.$touch()"
            v-model="subject.mcq_full_mark"
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
                $v.subject.mcq_full_mark.$dirty &&
                $v.subject.mcq_full_mark.$invalid,
            }"
          />
          <p
            v-if="
              !$v.subject.mcq_full_mark.required &&
              $v.subject.mcq_full_mark.$dirty
            "
            class="text-red-500 text-xs mt-2"
          >
            MCQ Full Mark is required.
          </p>
        </div>
        <div>
          <label for="mcq_mark" class="text-sm">PRACTICAL Full Mark </label>
          <input
            id="mcq_mark"
            name="mcq_mark"
            type="text"
            autocomplete="mcq_mark"
            placeholder="Practical Full Mark"
            @blur="$v.subject.practical_full_mark.$touch()"
            v-model="subject.practical_full_mark"
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
                $v.subject.practical_full_mark.$dirty &&
                $v.subject.practical_full_mark.$invalid,
            }"
          />
          <p
            v-if="
              !$v.subject.practical_full_mark.required &&
              $v.subject.practical_full_mark.$dirty
            "
            class="text-red-500 text-xs mt-2"
          >
            Practical Full Mark is required.
          </p>
        </div>
      </div>

      <hr class="my-8" />

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-10">
        <div>
          <label for="subject_name" class="text-sm">Subject Name </label>
          <input
            id="subject_name"
            name="subject_name"
            type="text"
            autocomplete="subject_name"
            placeholder="Subject Name"
            @blur="$v.subject.name.$touch()"
            v-model="subject.name"
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
                $v.subject.name.$dirty && $v.subject.name.$invalid,
            }"
          />
          <p
            v-if="!$v.subject.name.required && $v.subject.name.$dirty"
            class="text-red-500 text-xs mt-2"
          >
            Subject Name is required.
          </p>
        </div>
        <div>
          <label for="subject_code" class="text-sm">Subject Code </label>
          <input
            id="subject_code"
            name="subject_code"
            type="text"
            autocomplete="subject_code"
            placeholder="Subject Code"
            @blur="$v.subject.code.$touch()"
            v-model="subject.code"
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
                $v.subject.code.$dirty && $v.subject.code.$invalid,
            }"
          />
          <p
            v-if="!$v.subject.code.required && $v.subject.code.$dirty"
            class="text-red-500 text-xs mt-2"
          >
            Subject Code is required.
          </p>
        </div>
      </div>

      <hr class="my-8" />

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-10">
        <div>
          <label for="subject_main" class="text-sm">Main Name </label>
          <input
            id="subject_main"
            name="subject_main"
            type="text"
            autocomplete="subject_main"
            placeholder="Subject Code"
            @blur="$v.subject.main_name.$touch()"
            v-model="subject.main_name"
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
                $v.subject.main_name.$dirty && $v.subject.main_name.$invalid,
            }"
          />
          <p
            v-if="!$v.subject.main_name.required && $v.subject.main_name.$dirty"
            class="text-red-500 text-xs mt-2"
          >
            Subject main is required.
          </p>
        </div>
        <div>
          <label for="subject_main" class="text-sm">Has Multipart </label>
          <div class="flex flex-col lg:flex-row">
            <div class="relative">
              <select
                v-model="subject.has_multipart"
                @blur="$v.subject.has_multipart.$touch()"
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
                <option :value="true">Yes</option>
                <option :value="false">No</option>
              </select>
              <DownArrow class="absolute w-auto h-auto top-9 right-4" />
            </div>
          </div>
          <p
            v-if="!$v.subject.has_multipart.required && $v.subject.has_multipart.$dirty"
            class="text-red-500 text-xs mt-2"
          >
            Subject main is required.
          </p>
        </div>
        <div>
          <label for="can_be_optional" class="text-sm"> Can Be Optional </label>
          <div class="flex flex-col lg:flex-row">
            <div class="relative">
              <select
                v-model="subject.can_be_optional"
                @blur="$v.subject.can_be_optional.$touch()"
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
               <option :value="true">Yes</option>
                <option :value="false">No</option>
                
              </select>
              <DownArrow class="absolute w-auto h-auto top-9 right-4" />
            </div>
          </div>
          <p
            v-if="!$v.subject.can_be_optional.required && $v.subject.can_be_optional.$dirty"
            class="text-red-500 text-xs mt-2"
          >
            Subject Type is required.
          </p>
        </div>
        <div>
          <label for="subject_type" class="text-sm"> Subject Type </label>
          <div class="flex flex-col lg:flex-row">
            <div class="relative">
              <select
                v-model="subject.subject_type"
                @blur="$v.subject.subject_type.$touch()"
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
                $v.subject.subject_type.$dirty &&
                $v.subject.subject_type.$invalid,
            }"
              >
                <option v-for="(item, index) in typeOptions" :key="index" :value="item.value">{{ item.name }}</option>
                
              </select>
              <DownArrow class="absolute w-auto h-auto top-9 right-4" />
            </div>
          </div>
          <p
            v-if="!$v.subject.subject_type.required && $v.subject.subject_type.$dirty"
            class="text-red-500 text-xs mt-2"
          >
            Subject Type is required.
          </p>
        </div>
      </div>

      <hr class="my-8" />

      <button
      @click.prevent="uploadASubject"
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
      Add Subject
    </button>
    </div>
  </div>
</template>

<script>
import SelectInputMultiPart from "~/components/shared/Input/SelectInputMultiPart";
import SelectInputSubjectType from "~/components/shared/Input/SelectInputSubjectType";
import SelectInputOptional from "~/components/shared/Input/SelectInputOptional";
import ShowUrl from "~/components/shared/ShowUrl";
import DownArrow from "~/components/Icons/DownArrow";

import { mapActions, mapState, mapGetters } from "vuex";
import { required, minLength, email, alpha } from "vuelidate/lib/validators";

export default {
  components: {
    SelectInputMultiPart,
    SelectInputSubjectType,
    SelectInputOptional,
    ShowUrl,
    DownArrow
  },

  data() {
    return {
      hasSuccess: false,
      widthStudent: true,
      shadowStudent: true,
      marBottom: true,
      multiPart: {
        name: "Multipart",
        options: [
          { name: "Yes", value: true },
          { name: "No", value: false },
        ],
      },

      optional: {
        name: "Optional",
        options: [
          { name: "Yes", value: true },
          { name: "No", value: false },
        ],
      },

      subjectType: {
        name: "Subject Type",
        options: [
          { name: "Mandatory for all", value: "mandatory-for-all" },
          { name: "Mandatory for science", value: "mandatory-for-science" },
          { name: "Mandatory for arts", value: "mandatory-for-arts" },
          { name: "Mandatory for commerce", value: "mandatory-for-commerce" },
          { name: "Optional for all", value: "optional-for-all" },
          { name: "Optional for science", value: "optional-for-science" },
        ],
      },

      typeOptions: [
        { name: "Select Subject Type", value: "" },
          { name: "Mandatory for all", value: "mandatory-for-all" },
          { name: "Mandatory for science", value: "mandatory-for-science" },
          { name: "Mandatory for arts", value: "mandatory-for-arts" },
          { name: "Mandatory for commerce", value: "mandatory-for-commerce" },
          { name: "Optional for all", value: "optional-for-all" },
          { name: "Optional for science", value: "optional-for-science" },
        ],

      subject: {
        code: "",
        name: "",
        mcq_full_mark: 0,
        cq_full_mark: 0,
        practical_full_mark: 0,
        has_multipart: false,
        main_name: "",
        subject_type: "",
        can_be_optional: false,
      },
    };
  },

  validations: {
    subject: {
      code: {
        required,
      },
      name: {
        required,
      },
      mcq_full_mark: {
        required,
      },
      cq_full_mark: {
        required,
      },
      practical_full_mark: {
        required,
      },
      has_multipart: {
        required,
      },
      main_name: {
        required,
      },
      subject_type: {
        required,
      },
      can_be_optional: {
        required,
      },
    },
  },

  computed: {
    ...mapState(["aSubject"]),
    ...mapGetters(["is", "isError"]),
  },

  methods: {
    ...mapActions(["postCreateSubject"]),

    multiPartChanged(value) {
      // console.log(`Multipart Changed value ${value}`);
      this.subject.has_multipart = value;
    },

    subjectChanged(value) {
      // console.log(`Subject Type Changed value ${value}`);
      this.subject.subject_type = value;
    },

    optionalChanged(value) {
      // console.log(`Optional Changed value ${value}`);
      this.subject.can_be_optional = value;
    },

    async uploadASubject() {
      this.$v.$touch();
      if (!this.$v.subject.$invalid) {
        await this.postCreateSubject(this.subject);
        this.hasSuccess = true;
      }
      this.hasSuccess = false;
    },
  },

  mounted() {},
};
</script>

<style>
</style>
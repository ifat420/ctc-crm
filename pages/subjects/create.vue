<template>
  <div>
    <h2 class="text-3xl font-medium">Add New Subject</h2>

    <div class="mt-8" @submit.prevent="uploadASubject">
      <div class="grid grid-cols-1 sm:grid-cols-2 sm:gap-10">
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
              'border border-red-500': $v.subject.name.$dirty && $v.subject.name.$invalid,
            }"
          />
          <p
            v-if="!$v.subject.name.required && $v.subject.name.$dirty"
            class="text-red-500 text-xs mt-2"
          >
            Subject Name is required.
          </p>
        </div>
      </div>
      <hr class="my-8" />

      <div>
        <div class="sm:grid sm:grid-cols-2 gap-x-10 py-4 inputText-border">
          <div class="pb-4 sm:pb-0">
            <div class="">
              <label
                class="
                  block
                  uppercase
                  tracking-wide
                  text-gray-700 text-xs
                  font-bold
                  mb-2
                "
                for="subject-code"
              >
                Subject Code
              </label>
              <input
                id="subject-code"
                @blur="$v.subject.code.$touch()"
                v-model.trim="subject.code"
                class="w-full py-3 px-3 inputText focus:outline-none font"
                type="text"
                placeholder="Subject Code"
              />
            </div>
            <span
              v-if="!$v.subject.code.required && $v.subject.code.$dirty"
              class="error pb-4"
              >*Subject code is required</span
            >
          </div>
          <div class="pb-4 sm:pb-0">
            <div class="">
              <label
                class="
                  block
                  uppercase
                  tracking-wide
                  text-gray-700 text-xs
                  font-bold
                  mb-2
                "
                for="subject-name"
              >
                Subject Name
              </label>
              <input
                id="subject-name"
                @blur="$v.subject.name.$touch()"
                v-model.trim="subject.name"
                class="w-full py-3 px-3 inputText focus:outline-none font"
                type="text"
                placeholder="Subject Name"
              />
            </div>
            <span
              v-if="!$v.subject.name.required && $v.subject.name.$dirty"
              class="error pb-4"
              >*Subject Name is required</span
            >
          </div>
        </div>
        <div class="sm:grid sm:grid-cols-2 gap-x-10 py-4 inputText-border">
          <div class="pb-4 sm:pb-0">
            <div>
              <label
                class="
                  block
                  uppercase
                  tracking-wide
                  text-gray-700 text-xs
                  font-bold
                  mb-2
                "
                for="cq"
              >
                Cq Full Marks
              </label>
              <input
                id="cq"
                @blur="$v.subject.cq_full_mark.$touch()"
                v-model.number="subject.cq_full_mark"
                class="w-full py-3 px-3 inputText focus:outline-none font"
                type="number"
                placeholder="Cq Full Marks"
              />
            </div>
            <span
              v-if="
                !$v.subject.cq_full_mark.required &&
                $v.subject.cq_full_mark.$dirty
              "
              class="error pb-4"
              >*CQ Marks is required</span
            >
          </div>

          <div class="pb-4 sm:pb-0">
            <div>
              <label
                class="
                  block
                  uppercase
                  tracking-wide
                  text-gray-700 text-xs
                  font-bold
                  mb-2
                "
                for="mcq"
              >
                Mcq Full Marks
              </label>
              <input
                id="mcq"
                @blur="$v.subject.mcq_full_mark.$touch()"
                v-model.number="subject.mcq_full_mark"
                class="w-full py-3 px-3 inputText focus:outline-none font"
                type="number"
                placeholder="Mcq Full Marks"
              />
            </div>
            <span
              v-if="
                !$v.subject.mcq_full_mark.required &&
                $v.subject.mcq_full_mark.$dirty
              "
              class="error pb-4"
              >*MCQ Marks is required</span
            >
          </div>
        </div>

        <div class="sm:grid sm:grid-cols-2 gap-x-10 py-4 inputText-border">
          <div class="pb-4 sm:pb-0">
            <div>
              <label
                class="
                  block
                  uppercase
                  tracking-wide
                  text-gray-700 text-xs
                  font-bold
                  mb-2
                "
                for="practical"
              >
                Practical Full Marks
              </label>
              <input
                id="practical"
                @blur="$v.subject.practical_full_mark.$touch()"
                v-model.number="subject.practical_full_mark"
                class="w-full py-3 px-3 inputText focus:outline-none font"
                type="number"
                placeholder="Practical Full Marks"
              />
            </div>
            <span
              v-if="
                !$v.subject.practical_full_mark.required &&
                $v.subject.practical_full_mark.$dirty
              "
              class="error pb-4"
              >*Practical Marks is required</span
            >
          </div>

          <div class="pb-4 sm:pb-0">
            <div>
              <label
                class="
                  block
                  uppercase
                  tracking-wide
                  text-gray-700 text-xs
                  font-bold
                  mb-2
                "
                for="main-name"
              >
                Main Name
              </label>
              <input
                id="main-name"
                @blur="$v.subject.main_name.$touch()"
                v-model.trim="subject.main_name"
                class="w-full py-3 px-3 inputText focus:outline-none font"
                type="text"
                placeholder="Main Name"
              />
            </div>
            <span
              v-if="
                !$v.subject.main_name.required && $v.subject.main_name.$dirty
              "
              class="error pb-4"
              >*Main Name is required</span
            >
          </div>
        </div>

        <div class="sm:grid sm:grid-cols-2 gap-x-10 py-4 inputText-border">
          <div class="pb-4 sm:pb-0">
            <SelectInputMultiPart
              :shadowStudent="shadowStudent"
              :marginBottom="marBottom"
              :widthStudent="widthStudent"
              :value="subject.has_multipart"
              :input="multiPart"
              @hello="multiPartChanged"
            />
            <span
              v-if="
                !$v.subject.has_multipart.required &&
                $v.subject.has_multipart.$dirty
              "
              class="error pb-4"
              >*Multipart is required</span
            >
          </div>
          <div class="pb-4 sm:pb-0">
            <SelectInputSubjectType
              :shadowStudent="shadowStudent"
              :marginBottom="marBottom"
              :widthStudent="widthStudent"
              :value="subject.subject_type"
              :input="subjectType"
              @hello="subjectChanged"
            />
            <span
              v-if="
                !$v.subject.subject_type.required &&
                $v.subject.subject_type.$dirty
              "
              class="error pb-4"
              >*Subject Type is required</span
            >
          </div>
        </div>
        <div class="sm:grid sm:grid-cols-2 gap-x-10 py-4 inputText-border">
          <div class="pb-4 sm:pb-0">
            <SelectInputOptional
              :shadowStudent="shadowStudent"
              :marginBottom="marBottom"
              :widthStudent="widthStudent"
              :value="subject.can_be_optional"
              :input="optional"
              @hello="optionalChanged"
            />
            <span
              v-if="
                !$v.subject.can_be_optional.required &&
                $v.subject.can_be_optional.$dirty
              "
              class="error pb-4"
              >*Optional is required</span
            >
          </div>
        </div>
      </div>

      <div v-if="hasSuccess && aSubject && aSubject.message" class="pb-3 px-10">
        <h1 class="font success">{{ aSubject.message }}</h1>
      </div>

      <div
        v-if="
          isError('postCreateSubject') && isError('postCreateSubject').has_error
        "
        class="pt-3"
      >
        <h1 class="font text-red-600">
          {{ isError("postCreateSubject").error }}
        </h1>
      </div>

      <div class="flex items-center justify-start gap-x-4 pb-8 px-10">
        <button
          class="btn block rounded-lg font relative"
          :disabled="is('postCreateSubject')"
        >
          Create Subject
          <span :class="{ 'load loading': is('postCreateSubject') }"></span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import SelectInputMultiPart from "~/components/shared/Input/SelectInputMultiPart";
import SelectInputSubjectType from "~/components/shared/Input/SelectInputSubjectType";
import SelectInputOptional from "~/components/shared/Input/SelectInputOptional";
import ShowUrl from "~/components/shared/ShowUrl";

import { mapActions, mapState, mapGetters } from "vuex";
import { required, minLength, email, alpha } from "vuelidate/lib/validators";

export default {
  components: {
    SelectInputMultiPart,
    SelectInputSubjectType,
    SelectInputOptional,
    ShowUrl,
  },

  data() {
    return {
      hasSuccess: false,
      widthStudent: true,
      shadowStudent: true,
      marBottom: true,
      mainContents: {
        folderName: "subjects",
        compName: "create-a-subject",
        topicName: "Create A Subject",
      },
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
      console.log(this.subject);
      if (this.$v.subject.$anyError == false) {
        await this.postCreateSubject(this.subject);
        this.hasSuccess = true;
        // console.log("UPLOADED");
      }
      this.hasSuccess = false;
    },
  },

  mounted() {},
};
</script>

<style>
</style>
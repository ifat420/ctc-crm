<template>
  <div class="">
    <h2 class="text-3xl font-medium">Upload Marks File</h2>
    <div class="mt-6">
      <!-- ................... Select Option ................................. -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-10 mb-10">
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
          <label for="exam_name" class="text-sm"> Exam Name </label>
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
            v-if="!$v.student.exam_name.required && $v.student.exam_name.$dirty"
            class="text-red-500 text-xs mt-2"
          >
            Exam Name is required.
          </p>
        </div>
      </div>
      <!-- ...................File Upload ............................... -->
      <div
        class="
          max-w-md
          bg-white
          rounded-lg
          overflow-hidden
          box-shadow
          md:max-w-lg
        "
      >
        <div class="md:flex">
          <div class="w-full">
            <div class="p-4 border-b-2">
              <span
                class="text-gray-700 text-xs font-bold uppercase tracking-wide"
                >Add files</span
              >
            </div>
            <div class="p-3">
              <div class="mb-2">
                <div
                  class="
                    relative
                    h-40
                    rounded-lg
                    border-dashed border-2 border-gray-200
                    bg-white
                    flex
                    justify-center
                    items-center
                    hover:cursor-pointer
                    my-6
                  "
                >
                  <div class="absolute">
                    <div class="flex flex-col items-center">
                      <i class="fa fa-cloud-upload fa-3x text-gray-200"></i>
                      <span class="block text-gray-400 font-normal"
                        >Attach you files here</span
                      >
                      <span class="block text-gray-400 font-normal">or</span>
                      <span class="block text-blue-400 font-normal"
                        >Browse files</span
                      >
                    </div>
                  </div>

                  <input
                    type="file"
                    class="h-full w-full opacity-0"
                    name=""
                    id="inputFile"
                    @change="handleFileUpload"
                  />
                </div>
                <div class="flex justify-between items-center text-gray-400">
                  <span>{{ fileName }}</span>
                  <span class="flex items-center">
                    <i class="fa fa-lock mr-1"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <span v-if="fileRequired" class="text-red-500 text-xs mt-2"
        >*File is required</span
      >

      <hr class="my-8" />

      <button
        @click.prevent="uploadMarksFile"
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
        <IconSpinAnimation v-if="is('marksFileUpload')" />
        Upload Files
      </button>
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
      widthStudent: true,
      shadowStudent: true,
      marBottom: true,
      mainContents: {
        folderName: "marks",
        compName: "upload-marks-file",
        topicName: "Upload Marks Information",
      },

      hasFile: false,
      fileRequired: false,
      widthStyle: false,

      student: {
        session: "",
        exam_name: "",
        uploadedMarksFile: "",
        file: "",
      },

      fileName: "",
      fileMain: null,
      formData: {},

      examName: {
        name: "Exam Name",
        options: [
          { name: "test", value: "test" },
          { name: "pre-test", value: "pre-test" },
          { name: "half-yearly", value: "half-yearly" },
          { name: "year-final", value: "year-final" },
        ],
      },
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
    },
  },

  computed: {
    ...mapState(["session", "marksFileUploadResponse"]),
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
  },

  methods: {
    ...mapActions(["getSession", "getGroup", "marksFileUpload"]),

    sessionChanged(value) {
      console.log(`Class Changed value ${value}`);
      this.student.session = value;
    },

    examNameChanged(value) {
      console.log(`Exam Changed value ${value}`);
      this.student.exam_name = value;
    },

    handleFileUpload(event) {
      this.hasFile = true;
      if (this.hasFile) this.fileRequired = false;
      else this.fileRequired = true;

      let file = event.target.files[0];
      console.log("file :>> ", file);
      this.student.file = file;
      if (file) {
        this.fileName = file.name;
      }

      this.formData = new FormData();
      this.formData.append("file", file);

      this.formData.append("session", this.student.session);
      // this.formData.append("group", this.student.group);
      this.formData.append("exam_name", this.student.exam_name);
      console.log("Total 4 on handle", this.formData);
    },

    async uploadMarksFile() {
      console.log("this.fileName :>> ", this.fileName);
      this.$v.$touch();
      if (this.hasFile) this.fileRequired = false;
      else this.fileRequired = true;
      if (this.fileRequired) return;

      if (!this.formData.get("file")) {
        this.fileRequired = true;
        return;
      }

      if (
        this.$v.student.session.$anyError == false &&
        this.$v.student.exam_name.$anyError == false
      ) {
        await this.marksFileUpload(this.formData);
        this.formData = new FormData();
      }
      
      this.fileName = null;
    },
  },

  mounted() {
    this.getSession();
  },
};
</script>
<style lang="scss" scoped>
.padding-top-left {
  padding-left: 75px;
  padding-top: 20px;
}

.width {
  width: 100%;
}

.width-main {
  width: 350px;
  max-width: 100%;
}

.widthStyle {
  display: block;
  width: 100%;
}

.widthSelect {
  width: 100%;
}
</style>
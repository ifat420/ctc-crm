<template>
  <div class="bg-color-body">
    <ShowUrl :content="mainContents" />
    <div class="px-6 py-6 bg-color-whiteTwo m-6">
      <!-- ................... Select Option ................................. -->

      <form
        class="w-full flex flex-col"
        @submit.prevent="showSingleStudentData"
      >
        <div class="flex flex-wrap justify-between gap-6 items-center">
          <div>
              <SelectInputSession
              :widthStyle="widthStyle"
              :value="student.session"
              :input="sessionList"
              @hello="sessionChanged"
              />
              <span v-if="!$v.student.session.required && $v.student.session.$dirty" class="error">*Session is required</span>
          </div>
          <div class="">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                  Exam Name
              </label>
              <div class="mb-3 relative width-main w-full" >
                  <select class="form-select appearance-none
                  capitalize
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
                  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example"
                  v-model="student.exam_name"
                  >
                      <option value="">select Exam</option>
                      <option v-for="(option,index) in examNames" :key="index" :value="option.value">{{option.name}}</option>
                  </select>
                  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                  </div>
              </div>
              <span v-if="!$v.student.exam_name.required && $v.student.exam_name.$dirty" class="error">*Exam Name is required</span>
          </div>
          
          <div>
              <SelectInputGroup
              :widthStyle="widthStyle"
              :value="student.group"
              :input="groupList"
              @hello="groupChanged"
              />
              <span v-if="!$v.student.group.required && $v.student.group.$dirty" class="error">*Group is required</span>
          </div>
        </div>
      </form>

      <!-- ...................File Upload ............................... -->

      <div>
        <div
        class="flex w-full h-96 mt-16 mb-10 items-center justify-center bg-color-gray"
      >
        <label
          class="
            w-full
            h-full
            justify-center
            flex flex-col
            items-center
            px-4
            py-6
            bg-white
            text-cyan-500
            rounded-lg
            shadow-lg
            tracking-wide
            uppercase
            border border-blue
            cursor-pointer
            hover:text-blue
          "
        >
          <svg
            class="w-8 h-8"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z"
            />
          </svg>
          <span class="mt-2 text-base leading-normal">Select a file</span>
          <input
            type="file"
            class="block pl-20 pt-5 cursor-pointer"
            id="inputFile"
            @change="handleFileUpload"
          />
        </label>

        
      </div>
      <span v-if="hasFile == false" class="error">*File is required</span>
      </div>

      <div>
        <div class="flex items-center justify-start gap-x-4 pb-20 pt-8">
          <button
            class="
              bg-color-black
              color-white
              flex
              items-center
              gap-x-6
              px-4
              py-2
              font
              border-radius-button
            "
            @click="uploadMarksFile">
            Upload Files
          </button>
          <span class="success capitalize pl-8" v-if="isError('marksFileUpload') && isError('marksFileUpload').has_error == false">{{ marksFileUploadResponse.message }}</span>
        </div>
        
      </div>
      
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
import { required, minLength, email } from 'vuelidate/lib/validators'
import ShowUrl from "~/components/shared/ShowUrl";
import SelectInputSession from "~/components/shared/Input/SelectInputSession";
import SelectInputGroup from "~/components/shared/Input/SelectInputGroup";
import SelectInputExamName from "~/components/shared/Input/SelectInputExamName";
export default {
  components: {
    ShowUrl,
    SelectInputSession,
    SelectInputGroup,
    SelectInputExamName,
  },

  data() {
    return {
      mainContents: {
        folderName: "upload-student-file",
        compName: "upload-marks-table",
        topicName: "Upload Marks Table",
      },

      fileUploadSuccess: false,
      widthStyle: false,
      hasFile: false, 
      student: {
        session: "",
        exam_name: "",
        group: "",
        uploadedMarksFile: "",
        file: ""
      },

      examNames:[
              {
                  value: "test",
                  name: "Test"
              },
              {
                  value: "half-yearly",
                  name: "Half Yearly"
              }
          ]
    };
  },

  validations: {

            student: {
                session: {
                    required
                },
                exam_name: {
                    required
                },
                group: {
                    required
                }
            }
        },

  computed: {
    ...mapState(["session", "group", "marksFileUploadResponse"]),
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
    ...mapActions(["getSession", "getGroup", "marksFileUpload"]),

    sessionChanged(value) {
      console.log(`Class Changed value ${value}`);
      this.student.session = value;
    },

    groupChanged(value) {
      console.log(`Class Changed value ${value}`);
      this.student.group = value;
    },

    handleFileUpload(event) {
      if (event.target.files.length <= 0) {
        this.hasFile = false
        return
      }

      this.hasFile = true
      let file = event.target.files[0];
      this.student.file = file;
      let formData = new FormData();
      formData.append("file", file);

      formData.append("session", this.student.session);
      formData.append("group", this.student.group);
      formData.append("exam_name", this.student.exam_name);
      this.student.uploadedMarksFile = formData;
    },

    async uploadMarksFile() {
      this.$v.$touch();
        if (this.$v.student.session.$anyError == false && this.$v.student.group.$anyError == false && this.$v.student.exam_name.$anyError == false) {
                await this.marksFileUpload(this.student.uploadedMarksFile);
                console.log(this.student.uploadedMarksFile);
            }
      
      var oldInput = document.getElementById("inputFile");
      var newInput = document.createElement("input");

      newInput.type = "file";
      newInput.id = oldInput.id;
      newInput.className = oldInput.className;
      newInput.style.cssText = oldInput.style.cssText;
      oldInput.parentNode.replaceChild(newInput, oldInput);

      
    },
  },

  mounted() {
    this.getSession();
    this.getGroup();
    
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
        width: 250px;
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
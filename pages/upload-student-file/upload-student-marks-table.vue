<template>
  <div class="">
    <ShowUrl :content="mainContents" />
    <div class="px-6 py-6 bg-color-whiteTwo m-6 box-shadow-dashboard sm:rounded-lg">
      <!-- ................... Select Option ................................. -->

      <form
        class="w-full flex flex-col"
        @submit.prevent="uploadMarksFile"
      >
        <div class="flex flex-wrap gap-6 justify-between pb-8">
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
      

      <!-- ...................File Upload ............................... -->


      <div class="max-w-md bg-white rounded-lg overflow-hidden box-shadow md:max-w-lg">
                <div class="md:flex">
                    <div class="w-full">
                        <div class="p-4 border-b-2"> <span class="text-gray-700 text-xs font-bold uppercase tracking-wide">Add files</span> </div>
                        <div class="p-3">

                            <div class="mb-2"> 
                                <div class="relative h-40 rounded-lg border-dashed border-2 border-gray-200 bg-white flex justify-center items-center hover:cursor-pointer my-6">
                                    <div class="absolute">
                                        <div class="flex flex-col items-center "> 
                                            <i class="fa fa-cloud-upload fa-3x text-gray-200"></i> 
                                            <span class="block text-gray-400 font-normal">Attach you files here</span> 
                                            <span class="block text-gray-400 font-normal">or</span> 
                                            <span class="block text-blue-400 font-normal">Browse files</span> 
                                        </div>
                                    </div> 

                                    <input type="file" class="h-full w-full opacity-0" name="" id="inputFile" @change="handleFileUpload">

                                </div>
                                <div class="flex justify-between items-center text-gray-400"> 
                                    <span>{{ fileName }}</span> 
                                    <span class="flex items-center ">
                                        <i class="fa fa-lock mr-1"></i> secure
                                    </span> 
                                </div>
                            </div>
                            

                        </div>
                    </div>
                </div>
      </div>

      <span v-if="fileRequired" class="error">*File is required</span>

      <div v-if="!fileRequired && marksFileUploadResponse && marksFileUploadResponse.message" class="pt-3">
          <h1 class="font success">{{marksFileUploadResponse.message}}</h1>
      </div>
      
      <div v-if="isError('marksFileUpload')  && isError('marksFileUpload').has_error" class="pt-3">
          <h1 class="font text-red-600"> {{ isError('marksFileUpload').error }} </h1>
      </div>

      <div class="flex items-center justify-start gap-x-4 py-8">
          <button
            class="btn block rounded-lg font relative"
            :disabled="is('marksFileUpload')"
            >
            Upload Files
            <span :class="{'load loading': is('marksFileUpload') }"></span>
          </button>
      <div>

      </div>
    </div>
    </form>
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

      hasFile: false,
      fileRequired: false,
      widthStyle: false,

      student: {
        session: "",
        exam_name: "",
        group: "",
        uploadedMarksFile: "",
        file: ""
      },

      fileName: "",
      fileMain: null,
      formData: {},

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
      console.log("hello");
      this.hasFile = true;
      if (this.hasFile) this.fileRequired = false
      else this.fileRequired = true


      let file = event.target.files[0];
      console.log("File",file);
      this.student.file = file;
      if (file) {
        this.fileName = file.name;
      }
      
      this.formData = new FormData();
      this.formData.append("file", file);

      this.formData.append("session", this.student.session);
      this.formData.append("group", this.student.group);
      this.formData.append("exam_name", this.student.exam_name);
      console.log("Total 4 on handle",this.formData);
     
    },

    async uploadMarksFile() {

      this.$v.$touch();
      if (this.hasFile) this.fileRequired = false
      else this.fileRequired = true
      if (this.fileRequired) return
      
      
      if (!this.formData.get('file')) {
          this.fileRequired = true
          return
      }

      
      if (this.$v.student.session.$anyError == false && this.$v.student.group.$anyError == false && this.$v.student.exam_name.$anyError == false ) {
              await this.marksFileUpload(this.formData);
              console.log("TOTAL 4 FILES UPLOADED",this.formData);
              this.formData = new FormData();
              
          }

      this.fileName = null
      
      // var oldInput = document.getElementById("inputFile");
      // var newInput = document.createElement("input");

      // newInput.type = "file";
      // newInput.id = oldInput.id;
      // newInput.className = oldInput.className;
      // newInput.style.cssText = oldInput.style.cssText;
      // oldInput.parentNode.replaceChild(newInput, oldInput);

      
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
<template>
    <div class="">
        <h2 class="text-3xl font-medium">Upload Student Information</h2>
        

            <!-- ...................File Upload ............................... -->
       
            <div class="max-w-md mt-6 bg-white rounded-lg overflow-hidden box-shadow md:max-w-lg">
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
                                    <span class="font success">{{ fileName }}</span>
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

            <!-- <div v-if="isError('studentsFileUpload')  && isError('studentsFileUpload').has_error" class="pt-3">
                <h1 class="font text-red-600"> {{ isError('studentsFileUpload').error }} </h1>
            </div> -->

            <hr class="my-8" />

            <button
            @click.prevent="uploadStudentFile"
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
            <IconSpinAnimation v-if="is('studentsFileUpload')" />
             Upload Files
            </button>
        
        
    </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import DownArrow from "~/components/Icons/DownArrow";
import IconSpinAnimation from "~/components/SpinAnimaiton";

export default {

    components: {
        DownArrow,
        IconSpinAnimation
    },

  data() {
      return {
            hasFile: false,
            fileRequired: false,
            mainContents: {
                folderName: "students",
                compName: "upload-student-information",
                topicName: "Upload Student Information"
            },
            uploadedStudentFile: "",
            fileName: "",
            fileMain: null,
            formData: {}
      }
  },

  computed: {
      ...mapState(["studentsFileUploadResponse"]),
      ...mapGetters(["is","isError"])
  },

  methods: {
      ...mapActions(["studentsFileUpload"]),

      handleFileUpload( event ){

        console.log("hello");
        this.hasFile = true;
        if (this.hasFile) this.fileRequired = false
        else this.fileRequired = true
        
        let file = event.target.files[0];
        if (file) {
            this.fileName = file.name;
        }

        this.formData = new FormData();
        this.formData.append('file', file);  
		},

      async uploadStudentFile() {

        if (this.hasFile) this.fileRequired = false
        else this.fileRequired = true
        if (this.fileRequired) return
        
        
        if (!this.formData.get('file')) {
            this.fileRequired = true
            return
        }

        await this.studentsFileUpload(this.formData);
        this.formData = new FormData();
                   
                    
        this.fileName = null
        
          
      },

  },

  mounted() {
    
      
  }
}
</script>
<style lang="scss" scoped>
    .padding-top-left {
        padding-left: 75px;
        padding-top: 20px;
    }
</style>
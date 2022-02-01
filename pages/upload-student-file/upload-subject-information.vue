<template>
    
    <div class=" bg-color-body">
        <ShowUrl :content="mainContents"/>
        <div class="px-6 py-6 bg-color-whiteTwo m-6">

            <!-- ...................File Upload ............................... -->

            <div class="flex w-full h-96 my-16 items-center justify-center bg-color-gray">
                <label class="w-full h-full justify-center flex flex-col items-center px-4 py-6 bg-white text-cyan-500 rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer  hover:text-blue">
                    <svg class="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                    </svg>
                    <span class="mt-2 text-base leading-normal">Select a file</span>
                    <input type='file' class="block pl-20 pt-5 cursor-pointer" id="inputFile" @change="handleFileUpload" />
                </label>
            </div>

            <div v-if="fileUploadSuccess" class="pb-6 flex justify-center">
                <h1 class="font ">File uploaded successfully!</h1>
            </div>

            <!-- <div v-if="isError('studentsFileUpload')  && isError('studentsFileUpload').has_error" class="pb-6 flex justify-center">
                <h1 class="font text-red-600"> {{ isError('studentsFileUpload').error }} </h1>
            </div> -->
            
            <div class="flex items-center justify-start gap-x-4 pb-20">
                <button class="bg-color-black color-white flex items-center gap-x-6 px-4 py-2 font border-radius-button" @click="uploadSubjectFile">Upload Files</button>
            </div>
            
        </div>   
    </div>
</template>


<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import ShowUrl from '~/components/shared/ShowUrl'
import FileUpload from '~/components/dashboard/FileUpload'
export default {

        components: {
            ShowUrl
        },

        data() {
            return {
                
                mainContents: {
                    folderName: "upload-Student-file",
                    compName: "upload-subject-information",
                    topicName: "Upload Subject Information"
                },

                uploadedSubjectFile: "",
                fileUploadSuccess: false
            }
        },

        computed: {
            ...mapState(["subjectFileUploadResponse"]),
            //   ...mapGetters(["isError"])
        },

        methods: {
            ...mapActions(["subjectFileUpload"]),

            handleFileUpload( event ){

                    
                    let file = event.target.files[0];
                    console.log("xxxxxxxxxxxx",file);
                    let formData = new FormData();
                    formData.append('file', file);
                    this.uploadedSubjectFile = formData;
                    for(var pair of formData.entries()) {
                        console.log(pair[0]+ ', '+ pair[1]); 
                    }
                    
                        
                },

                async uploadSubjectFile() {
                    this.subjectFileUpload(this.uploadedSubjectFile);
                    var oldInput = document.getElementById("inputFile"); 
                    var newInput = document.createElement("input"); 

                    newInput.type = "file"; 
                    newInput.id = oldInput.id; 
                    newInput.className = oldInput.className; 
                    newInput.style.cssText = oldInput.style.cssText; 
                    oldInput.parentNode.replaceChild(newInput, oldInput); 
                    console.log(this.uploadedStudentFile);
                    if (this.uploadedSubjectFile) {
                        this.fileUploadSuccess = true;
                    }
                
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
<template>
    
    <div class="">
        <ShowUrl :content="mainContents"/>
        <div class="px-6 py-6 bg-color-whiteTwo m-6 box-shadow-dashboard">

            <!-- ...................File Upload ............................... -->
            <form ref="formFile" @submit.prevent="uploadSubjectFile">
            <div class="max-w-md bg-white rounded-lg overflow-hidden box-shadow md:max-w-lg">
                <div class="md:flex">
                    <div class="w-full">
                        <div class="p-4 border-b-2"> 
                            <span class="text-gray-700 text-xs font-bold uppercase tracking-wide">Add files</span> 
                        </div>
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
                                    

                                    <input type="file" class="h-full w-full opacity-0" ref="fileUpload" id="inputFile" @change="handleFileUpload">

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

            <!-- document.getElementById('inputFile').click() -->

            <span v-if="fileRequired" class="error">*File is required</span>

            <span class="success" v-if=" !fileRequired && subjectFileUploadResponse && subjectFileUploadResponse.message">{{ subjectFileUploadResponse.message }}</span>

            <div v-if="isError('subjectFileUpload')  && isError('subjectFileUpload').has_error" class="pt-3">
                <h1 class="font text-red-600"> {{ isError('subjectFileUpload').error }} </h1>
            </div>

            
                <div class="flex items-center justify-start gap-x-4 py-8 relative" >
                    <button
                        class="btn block rounded-lg font relative"
                        :disabled="is('subjectFileUpload')"
                        >
                        Upload Files
                        <span :class="{'load loading': is('subjectFileUpload') }"></span>
                    </button>
                </div>     
            </form>    
            
           
        </div>   
    </div>
</template>


<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import ShowUrl from '~/components/shared/ShowUrl'

export default {

        components: {
            ShowUrl
        },

        data() {
            return {
                hasFile: false,
                fileRequired: false,
                mainContents: {
                    folderName: "upload-Student-file",
                    compName: "upload-subject-information",
                    topicName: "Upload Subject Information"
                },

                uploadedSubjectFile: "",
                fileName: "",
                fileMain: null,
                formData: {}
            }
        },

        computed: {
            ...mapState(["subjectFileUploadResponse"]),
            ...mapGetters(["is", "isError"]),
        },

        methods: {
            ...mapActions(["subjectFileUpload"]),

            inputButton() {
                const input = document.getElementById('inputFile');
                
                    console.log(input.value);
                
            },

            handleFileUpload(event){
                console.log('hello')
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

                async uploadSubjectFile() {
                    
                    
                    // if (this.hasFile) this.fileRequired = false
                    // else this.fileRequired = true
                    // if (this.fileRequired) return

                    // this.hasFile = true;
                    if (this.hasFile) this.fileRequired = false
                    else this.fileRequired = true
                    if (this.fileRequired) return
                    
                   
                    if (!this.formData.get('file')) {
                        this.fileRequired = true
                        return
                    }

                    await this.subjectFileUpload(this.formData);
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
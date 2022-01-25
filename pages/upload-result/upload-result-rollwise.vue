<template>
    <div class=" bg-color-body">
        <ShowUrl :content="mainContents"/>
        <div class="px-6 py-6 bg-color-whiteTwo m-6">
            <!-- <div class="flex flex-wrap justify-between items-center pb-4">
                <SelectInput />
                <SelectInput />
                <SelectInput />
                <SelectInput />
                <SelectInput />
                <SelectInput />
            </div> 
            <div class="flex items-center justify-start gap-x-4">
                <button class="bg-color-black color-white flex items-center gap-x-6  px-4 py-2 font border-radius-button">Search</button>
                <button class="bg-color-black color-white flex items-center gap-x-6  px-4 py-2 font border-radius-button">Reset</button>
            </div> -->
            <FileUpload />
            <div class="flex items-center justify-start gap-x-4 pb-20">
                <button class="bg-color-black color-white flex items-center gap-x-6 px-4 py-2 font border-radius-button">Upload Files</button>
                <button class="bg-color-black color-white flex items-center gap-x-6 px-4 py-2 font border-radius-button">Cancel</button>
            </div>
            
        </div>   
    </div>
</template>

<script>
import ShowUrl from '~/components/shared/ShowUrl'
import SelectInput from '~/components/shared/SelectInput'
import FileUpload from '~/components/dashboard/FileUpload'
export default {
  components: {

      ShowUrl,
      SelectInput,
      FileUpload
  },

  data() {
      return {
          mainContents: {
              folderName: "upload-result",
              compName: "upload-result-rollwise",
              topicName: "Upload Result Rollwise"
          },
      }
  }
}
</script>
<style lang="scss" scoped>
    
</style>
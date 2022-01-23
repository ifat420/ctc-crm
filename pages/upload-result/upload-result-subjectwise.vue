<template>
    <div class=" bg-color-body">
        <ShowUrl :content="mainContents"/>
        <div class="px-6 py-6 bg-color-whiteTwo m-6">
            <div class="flex flex-wrap justify-between items-center">
                <SelectInput />
                <SelectInput />
                <SelectInput />
                <SelectInput />
                <SelectInput />
                <SelectInput />
            </div> 
            <div class="flex items-center justify-start gap-x-4">
                <div v-for="(buttonContent,index) in buttonContents" :key="index" class="">
                    <ButtonDashboard :buttonContent="buttonContent" />
                </div>
            </div>

            <FileUpload />
            
            <div class="flex items-center justify-start gap-x-4 pb-20">
                <div v-for="(buttonContent,index) in buttonContentsTwo" :key="index" class="">
                    <ButtonDashboard :buttonContent="buttonContent" />
                </div>
            </div>
        </div>   
    </div>
</template>

<script>
import ShowUrl from '~/components/shared/ShowUrl'
import SelectInput from '~/components/shared/SelectInput'
import ButtonDashboard from '~/components/shared/ButtonDashboard'
import FileUpload from '~/components/dashboard/FileUpload'
export default {
  components: {

      ShowUrl,
      SelectInput,
      ButtonDashboard,
      FileUpload
  },

  data() {
      return {
          buttonContents: ["Reset","Search"],
          buttonContentsTwo: ["Upload Files","Cancel"],
          mainContents: {
              folderName: "upload-result",
              compName: "upload-result-subjectwise",
              topicName: "Upload Result Subjectwise"
          }
      }
  }
}
</script>
<style lang="scss" scoped>
    
</style>
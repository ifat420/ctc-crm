<template>
    <div class=" bg-color-body">
        <ShowUrl :content="mainContents"/>
        <div class="px-6 py-12 bg-color-whiteTwo m-6">
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
            <div class="w-96 h-80 my-4  bg-color-gray border-dotted border border-black flex flex-col justify-center items-center">
                <img class="w-12 h-12" src="/icons/Shape.svg" alt="">
                <h3 class="">Drop files to upload</h3>
            </div>
            
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
export default {
  components: {

      ShowUrl,
      SelectInput,
      ButtonDashboard
  },

  data() {
      return {
          buttonContents: ["Reset","Search"],
          mainContents: {
              folderName: "upload-result",
              compName: "upload-result-rollwise",
              topicName: "Upload Result Rollwise"
          },

          buttonContentsTwo: ["Upload Files","Cancel"],
      }
  }
}
</script>
<style lang="scss" scoped>
    
</style>
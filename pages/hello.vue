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
                <button class="bg-color-black color-white flex items-center gap-x-6  px-4 py-2 font border-radius-button">Search</button>
                <button class="bg-color-black color-white flex items-center gap-x-6  px-4 py-2 font border-radius-button">Reset</button>
            </div>

            <FileUpload @showData="showDataClicked"/>
            
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
// import ButtonDashboard from '~/components/shared/ButtonDashboard'
import FileUpload from '~/components/dashboard/FileUpload'
export default {
  components: {

      ShowUrl,
      SelectInput,
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
          },

          datas: [],
          upload: false
      }
  },

  methods: {
      showDataClicked(data) {
          this.datas = data;
          this.upload = true
          console.log(this.upload);
      },

      working(e){
          console.log(e);
          console.log("created");
      }
  }
}
</script>
<style lang="scss" scoped>
    .border-radius-button {
        box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.0727);
        border-radius: 5px;
    }
</style>
<template>
    <div class="flex w-full h-96 my-16 items-center justify-center bg-color-gray">
        <label class="w-full h-full justify-center flex flex-col items-center px-4 py-6 bg-white text-cyan-500 rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer  hover:text-blue">
            <svg class="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
            </svg>
            <span class="mt-2 text-base leading-normal">Select a file</span>
            <input type='file' class="block padding-top-left cursor-pointer" ref="inputFile" @change="handleFileUpload" />
        </label>
    </div>
</template>

<script>

export default {

    props: ["value"],
    data() {
        return {
            file: '',
            data: ""
        }
    },

    methods: {
        handleFileUpload( event ){
            this.file = event.target.files[0];
            let formData = new FormData();
            formData.append('file', this.file);
            this.data = formData;
            for(var pair of formData.entries()) {
                console.log(pair[0]+ ', '+ pair[1]); 
            }
			
            this.$emit('handleFile', formData);
                
		},

  },
  

}
</script>

<style lang="scss" scoped>
    .padding-top-left {
        padding-left: 75px;
        padding-top: 20px;
    }
</style>
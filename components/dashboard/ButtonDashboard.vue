<template>
  <button class="bg-color-white color-black flex items-center gap-x-6 w-full rounded-lg p-3 font border-radius-button" @click="onClicked">{{ buttonContent.text }} <img :src="buttonContent.img" alt=""></button>
</template>

<script>
export default {

  props: ["buttonContent" , "upload", "datas"],
  methods: {
    onClicked(){
      this.$emit('whatIf',"working");
    }
  }
}
</script>

<style lang="scss" scoped>
    

    .border-radius-button {
        box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.0727);
        border-radius: 75px;
    }
</style>
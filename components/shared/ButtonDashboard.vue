<template>
  <button class="bg-color-black color-white button font" >{{ buttonContent }}</button>
</template>

<script>
export default {

  props: ["buttonContent", "buttonSize"],

}
</script>

<style lang="scss" scoped>
    .button {
        padding: 8px 20px;
        border-radius: 5px;

    }
</style>
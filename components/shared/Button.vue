<template>
  <button class="bg-color-black color-white block w-full rounded-lg py-3 font" :class="{width: buttonSize}">{{ buttonContent }}</button>
</template>

<script>
export default {

  props: ["buttonContent", "buttonSize"],

}
</script>

<style lang="scss" scoped>
    .width {
      width: 180px;
    }
</style>
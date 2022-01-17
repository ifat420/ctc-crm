<template>
  <div>
      <input class="shadow-lg sm:shadow-sm w-full py-3 px-3 rounded focus:outline-none" :type="type" :placeholder="placeholder">
  </div>
</template>

<script>
export default {
    props: [ "type" , "placeholder" ]
    
}
</script>

<style lang="scss" scoped>

</style>
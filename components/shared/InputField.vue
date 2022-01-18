<template>
  <div>
      <input class="sm:shadow-sm w-full py-3 px-3 rounded focus:outline-none font box-shadow" :type="type" :placeholder="placeholder" v-model="property" @keyup.enter="changeContent">
  </div>
</template>

<script>
export default {
    props: [ "type" , "placeholder" , "content" ],
    data() {
      return {
        property: this.content
      }
    },
    methods: {
      changeContent() {
        // console.log(this.property);
        this.$emit("changedContent",this.property);
      }
    }
    
}
</script>

<style lang="scss" scoped>

</style>
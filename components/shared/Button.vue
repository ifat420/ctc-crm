<template>
  <button class="btn block w-full rounded-lg py-4 font relative" :disabled="is(loading)" :class="{'width': buttonSize}">
    
    {{ buttonContent }}
    <span :class="{'load loading': is(loading) }"></span>
  </button>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
export default {

  props: ["buttonContent", "buttonSize", "loading"],

  computed:{
       ...mapGetters(["is"])
    },

}
</script>

<style lang="scss" scoped>
    .width {
      width: 180px;
    }

    
</style>
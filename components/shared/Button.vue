<template>
  <button class="bg-color-black color-white block w-full rounded-lg py-4 font relative" :disabled="is(loading)" :class="{'width': buttonSize}">
    
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

    .load {
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    background: inherit;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: inherit
}

.load::after {
    content: '';
    position: absolute;
    border-radius: 50%;
    border: 3px solid #fff;
    width: 30px;
    height: 30px;
    border-left: 3px solid transparent;
    border-bottom: 3px solid transparent;
    animation: loading1 1s ease infinite;
    z-index: 10
}

.load::before {
    content: '';
    position: absolute;
    border-radius: 50%;
    border: 3px dashed #fff;
    width: 30px;
    height: 30px;
    border-left: 3px solid transparent;
    border-bottom: 3px solid transparent;
    animation: loading1 2s linear infinite;
    z-index: 5
}

@keyframes loading1 {
    0% {
        transform: rotate(0deg)
    }

    100% {
        transform: rotate(360deg)
    }
}
</style>
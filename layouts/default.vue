<template>
  <div class="default">
    <Header/>
    <div class="grid grid-cols-medium desktop:grid-cols-default">
      <Sidebar/>
      <Nuxt />
    </div>
  </div>
</template>

<script>
import Header from '~/components/dashboard/Header'
import Sidebar from '~/components/dashboard/Sidebar'
export default {
  middleware: ['auth'],
  components: {
    Header,
    Sidebar
  },

  
}
</script>

<style lang="scss" scoped>
    
</style>

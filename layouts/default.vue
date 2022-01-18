<template>
  <div>
    <Header/>
    <div class="flex">
      <Sidebar/>
      <Nuxt />
    </div>
  </div>
</template>

<script>
import Header from '~/components/dashboard/Header'
import Sidebar from '~/components/dashboard/Sidebar'
export default {
  components: {
    Header,
    Sidebar
  }
}
</script>

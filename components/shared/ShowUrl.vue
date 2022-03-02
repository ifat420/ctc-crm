<template>
    <div class="w-full p-8 box-shadow-dashboard bg-color-whiteTwo">
        <p class="font pb-4"><span class="color-gray">{{ content.folderName }} /</span> <span class="color-black">{{ content.compName }}</span></p>
        <h3 class="font color-black text-xl font-bold antialiased">{{ content.topicName }}</h3>
    </div>
</template>

<script>
export default {
    props: ["content"]
}
</script>

<style lang="scss" scoped>

</style>
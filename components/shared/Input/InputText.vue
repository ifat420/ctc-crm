<template>
    <div class="pb-4">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
            {{ label }}
        </label>
        <input class="w-full py-3 px-3 inputText focus:outline-none font" type="text" :placeholder="placeHolder" >
    </div>
</template>

<script>
export default {
    props: ["label", "placeHolder"],
    
}
</script>

<style>

</style>

<template>
    <div class="flex justify-start gap-y-6 flex-col relative">
        <div class="flex items-center">
            <nuxt-link :to="menu.url" class="flex items-center gap-x-6">
                <img :src="menu.img" alt="">
                <p class="font">{{ menu.name }}</p>
            </nuxt-link>
            <div class="arrow-one ml-auto mr-4 cursor-pointer p-3" :class="{rotate: this.showItem==true}" @click="showDropdown" v-if="menu.child.length > 0">
                <Arrow />
            </div>
        </div>
        <div class="hidden"  :class="{ show: showItem }" v-for="(child,index) in menu.child" :key="index">
            <div class="inline-block margin-left border-bottom">
                <nuxt-link :to="child.url" href="" class="">
                    <p class="font">{{ child.name }}</p>
                </nuxt-link>
            </div>
        </div>
    </div>
</template>

<script>
import Arrow from "~/components/shared/Arrow"
export default {
    components: {
        Arrow
    },

    props: ["showItems", "menu"],

    data() {
        return {
            showItem: false
        }
    },

    methods: {
        showDropdown(e) {
            this.showItem = !this.showItem;
        }
    }
}
</script>

<style lang="scss" scoped>
    .show {

        display: block;
    }

    .margin-left {
        margin-left: 39px;
    }

    .rotate {
            transform: rotate(180deg);
    }
</style>
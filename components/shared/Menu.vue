<template>
    <div class="flex justify-start gap-y-4 flex-col relative">
        <div class="flex items-center cursor-pointer " @click="showDropdown">
            <nuxt-link :to="menu.url" class="flex items-center gap-x-6">
                <img :src="menu.img" alt="">
                <p class="font menu-color">{{ menu.name }}</p>
            </nuxt-link>
            <div class="arrow-one ml-auto mr-4 cursor-pointer p-3" :class="{rotate: this.showItem==true}" v-if="menu.child.length > 0">
                <Arrow />
            </div>
        </div>
       
        <div class="drop hidden"  :class="{ show: showItem }" v-for="(child,index) in menu.child" :key="index">
            <nuxt-link :to="child.url" class="block">
                <div class="inline-block margin-left">
                    
                        <p class="font">{{ child.name }}</p>
                    
                </div>
            </nuxt-link>
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
        transform: display .5s ease-in-out;
    }

    .margin-left {
        margin-left: 39px;
    }

    .rotate {
            transform: rotate(180deg);
    }

    .drop {
        padding: 10px;
        transition: all .2s ease-in-out;

        &:hover {
            background-color: rgba(230, 247, 255, 1);
            color: rgba(24, 144, 255, 1);
            border-right: 5px solid rgba(24, 144, 255, 1);
        }
        
    }

    .menu-color {
        
        &:hover {
            color: rgba(24, 144, 255, 1);
        }
    }
</style>
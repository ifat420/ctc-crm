<template>
    <div class="zero flex justify-start gap-y-4 flex-col relative">
        <div class="first flex items-center cursor-pointer main" @click="showDropdown">
            <nuxt-link v-if="menu.child.length <= 0" :to="menu.url" class="flex items-center gap-x-6 w-full" :class="{ activate: menu.child.length <= 0 }" >
                <img class="menu-img" :src="menu.img" alt="">
                <p class="font menu-color">{{ menu.name }}</p>
            </nuxt-link>
            <div class="flex items-center gap-x-6 w-full" v-else>
                <img class="menu-img" :src="menu.img" alt="">
                <p ref="para" class="second font menu-color">{{ menu.name }}</p>
            </div>
            <div class="arrow-one ml-auto mr-4 cursor-pointer p-3" :class="{rotate: this.showItem==true}" v-if="menu.child.length > 0">
                <Arrow />
            </div>
        </div>
       
        <div class="drop hidden"  :class="{ show: showItem }" v-for="(child,index) in menu.child" :key="index">
            <nuxt-link :to="child.url" class="block activate" :class="{'active': activeMenu == index}" >
                <div class="inline-block margin-left">
                    
                        <p class="font">{{ child.name }}</p>
                    
                </div>
            </nuxt-link>
        </div>
        
        
    </div>
</template>

<script>
import Arrow from "~/components/shared/Arrow"
import { getCurrentInstance} from "vue";
export default {
    components: {
        Arrow
    },

    props: ["menu", "index"],

    data() {
        return {
            showItem: false,
            activeMenu: null,
        }
    },

    methods: {
        showDropdown(e) {
            this.showItem = !this.showItem;
        }
    },

    mounted() {
        // console.log('this.$route :>> ', this.$route);
        // if(this.menu && (this.menu.child || []).length) {
        //     let childIndex = this.menu.child.findIndex((item) => {
        //         return item.url == this.$route.fullPath
        //     })

            // console.log('childIndex :>> ', childIndex);
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
        // padding: 10px;
        transition: all .2s ease-in-out;

        &:hover .activate {
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

    .drop .nuxt-link-exact-active {
        
        background-color: rgba(230, 247, 255, 1);
        color: rgba(24, 144, 255, 1);
        border-right: 5px solid rgba(24, 144, 255, 1);
        
        
    }

    .main .activate.nuxt-link-exact-active {
        
        background-color: rgba(230, 247, 255, 1);
        color: rgba(24, 144, 255, 1);
        border-right: 5px solid rgba(24, 144, 255, 1);
        
        
    }

    .activate {
        padding: 10px;
        padding-left: 0px;
    }

    // .border-bottom-menu {
    //     border-bottom: 1px solid black;
    // }

    .gotyou {
        border-bottom: 1px solid black;
    }

    
</style>
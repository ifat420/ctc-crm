<template>
  <div :class="{widthStyle : widthStyle}">
      
    
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                {{ input.name }}
            </label>
            <div class="mb-3 relative width-main" :class="{widthSelect: widthStyle, widthStudent: widthStudent, marginBottom: marginBottom}">
                <select 
                class="form-select appearance-none
                width
                px-3
                py-1.5
                text-base
                font-normal
                text-gray-700
                bg-white bg-clip-padding bg-no-repeat
                border border-solid border-gray-300
                rounded
                transition
                ease-in-out
                m-0
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example"
                v-model="selected"
                @change="changedOption"
                :class="{ shadowStudent : shadowStudent }"
                >
            
                    <option value="">Select Student Type</option>
                    <option v-for="(option,index) in input.options" :key="index" :value="option.value">{{option.name}}</option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
                
            </div>
       
    </div>
</template>

<script>
export default {
    props: ["input", "value", "widthStyle", "widthStudent", "shadowStudent", "marginBottom"],

    data: () => ({
        selected: ""
    }),

    methods: {
        changedOption() {
            
            this.$emit('hello',  this.selected);
        }
    },

    watch: {
        value: function (val) {
            this.selected = val
        }
    }
}
</script>

<style lang="scss" scoped>
    .width {
        width: 100%;
    }

    .width-main {
        width: 350px;
        max-width: 100%;
    }

    .widthSelect {
        width: 100%;
    }

    .widthStyle {
        display: block;
        width: 100%;
    }

    .widthStudent {
        width: 100%;
    }

    .shadowStudent {
        
        box-shadow: 0px 3px 7px rgba(0, 0, 0, 0.05);
        border: none;
        padding: 10px 12px;
        border-radius: 7px;
    }

    .marginBottom {
        margin-bottom: 0px;
    }
</style>
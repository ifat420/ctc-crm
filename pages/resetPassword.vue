<template>
  <div class="flex h-screen justify-center items-center bg-white">
        <div class="flex flex-col self-start sm:self-center gap-y-6 max-w-lg w-full bg-white rounded-xl sm:shadow-lg px-6 py-12 sm:text-left">
            <div class="w-full flex flex-col gap-y-4 items-start sm:items-center px-3">
                <div class="shrink-0">
                    <Logo />
                </div>
                <h1 class="color-black text-xl font-bold antialiased font">Reset Password</h1>
            </div>
            <form class="w-full flex flex-col gap-y-6" action="" @submit.prevent="">
                <InputField type="text" placeholder="Email address" :content="text" v-on:changedContent="updatedText($event)"/>
                <Button :buttonContent="buttonContent"/>
            </form>
        </div>
    </div>
</template>

<script>
import Logo from '~/components/shared/Logo'
import InputField from '~/components/shared/InputField'
import InputCheckbox from '~/components/shared/InputCheckbox'
import Button from '~/components/shared/Button'

export default {

    layout: 'others',

    
    components: {
        Logo,
        InputField,
        Button,
        InputCheckbox
    },

    data() {

        return {
            text: "",
            buttonContent: "Send instructions"
        }
    },

    methods: {

        updatedText(content) {
            this.text = content;
            console.log(this.text);
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
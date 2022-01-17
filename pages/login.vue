<template>
    <div class="flex h-screen justify-center items-center bg-white">
        <div class="flex flex-col gap-y-6 max-w-lg w-full bg-white rounded-xl sm:shadow-lg px-6 py-12 sm:text-left">
            <div class="w-full flex flex-col gap-y-6 items-start sm:items-center px-3">
                <div class="shrink-0">
                    <Logo />
                </div>
                <h1 class="color-black text-xl font-bold antialiased">Sign in to your account</h1>
            </div>
            <form class="w-full flex flex-col gap-y-6" action="">
                <InputField type="text" placeholder="Email address"/>
                <InputField type="password" placeholder="Password"/>
                <div class="flex items-center justify-between">
                    <InputCheckbox />
                    <!-- <div>
                        <InputCheckbox type="checkbox"/>
                        <label for="">Remember me</label>
                    </div> -->
                    <a class="text-sm color-black underline hidden sm:block">Forget your password?</a>
                </div>
                <Button />
                <a class="text-sm text-center color-black underline sm:hidden">Forget your password?</a>
            </form>
        </div>
    </div>
</template>

<script>
import Logo from '~/components/Logo'
import InputField from '~/components/shared/InputField'
import InputCheckbox from '~/components/shared/InputCheckbox'
import Button from '~/components/shared/Button'

export default {
    components: {
        Logo,
        InputField,
        Button,
        InputCheckbox
    }
}
</script>

<style lang="scss" scoped>

</style>
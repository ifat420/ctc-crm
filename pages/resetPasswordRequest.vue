<template>
  <div class="h-screen">
      <div class="w-full h-full max-w-screen-md m-auto sm:shadow-lg">
            <div class="h-2/4 sm:h-2/5 flex flex-col justify-between p-10 bg-color-reset border-bottom">
                <div class="shrink-0">
                    <Logo />
                </div>
                <h1 class="color-black text-4xl font-bold antialiased font">Reset your password</h1>
            </div>
            <div class="h-2/5 flex flex-col justify-between p-10 border-bottom">
                <h1 class="text-sm font-bold">Dear First Name,</h1>
                <p class="text-sm">We have recieved your request to reset your password. To complete the process, please click on the following button:</p>
                <Button :buttonContent="buttonContent" :buttonSize="buttonSize"/>
            </div>
            <div class="h-1/12 flex items-center justify-between p-10">
                <h1 class="text-sm font-semibold">Client Name</h1>
                <div class="flex items-center gap-x-5">
                    <img src="/icons/twitter.svg" alt="" class="">
                    <img src="/icons/instagram.svg" alt="" class="">
                </div>
            </div>
        </div>
  </div>
</template>

<script>
import Logo from '~/components/shared/Logo'
import Button from '~/components/shared/Button'
export default {
    components: {
        Logo,
        Button
    },
    data() {
        return {
            buttonContent: 'Reset password',
            buttonSize: true
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
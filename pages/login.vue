<template>
    <div class="flex h-screen justify-center items-center bg-white" v-if="$v">
        <div class="flex flex-col self-start sm:self-center gap-y-6 max-w-lg w-full bg-white rounded-xl sm:shadow-lg px-6 py-12 sm:text-left">
            <div class="w-full flex flex-col gap-y-4 items-start sm:items-center px-3">
                <div class="shrink-0">
                    <LogoMomin class=" w-24 h-24" />
                </div>
                <h1 class="color-black text-xl font-bold antialiased font">Sign in to your account</h1>
            </div>
            <form class="w-full flex flex-col gap-y-6" action="" @submit.prevent="login">

                <input @blur="$v.user.email.$touch()" class="sm:shadow-sm w-full py-3 px-3 rounded focus:outline-none font box-shadow" type="email" placeholder="Enter Email" v-model="user.email">
                <span v-if="!$v.user.email.required && $v.user.email.$dirty" class="error">*Email is required</span>
                <span v-if="!$v.user.email.email && $v.user.email.$dirty" class="error">*Valid Email is required</span>

                <input @blur="$v.user.password.$touch()" class="sm:shadow-sm w-full py-3 px-3 rounded focus:outline-none font box-shadow" type="password" placeholder="Enter Password" v-model="user.password">
                <span v-if="!$v.user.password.required && $v.user.password.$dirty" class="error">*Password is required</span>
                <span v-if="!$v.user.password.minLength && $v.user.password.$dirty" class="error">*password shoul be at least 6 char long</span>

                <div class="flex items-center justify-between">
                    <InputCheckbox />
                    <nuxt-link to="/resetPassword" class="text-sm color-black underline hidden font sm:block">Forget your password?</nuxt-link>
                </div>
                <Button :loading="loading" :buttonContent="buttonContent"/>
                <span class="error text-center font-light" v-if="isError('loginAction')">{{ isError('loginAction').error }}</span>
                <nuxt-link to="/resetPassword" class="text-sm text-center color-black underline font sm:hidden">Forget your password?</nuxt-link>
            </form>   
        </div>
    </div>
</template>

<script>
import { required, minLength, email } from 'vuelidate/lib/validators'
import { mapActions, mapState, mapGetters } from 'vuex'
import LogoMomin from '~/components/shared/LogoMomin'
import InputField from '~/components/shared/InputField'
import InputCheckbox from '~/components/shared/InputCheckbox'
import Button from '~/components/shared/Button'

export default {

    layout: 'others',
    middleware: 'authenticated',

    
    components: {
        LogoMomin,
        InputField,
        Button,
        InputCheckbox
    },

    

    data() {

        return {

            buttonContent: "Sign in",
            user: {
                email: '',
                password: '',
            },

            error : null,
            loading: "loginAction"
        }
    },

    validations: {
        user: {
            email: {
                required, 
                email
            },
            password: {
                required, 
                minLength: minLength(6)
            }
        }
    },

    computed:{
       ...mapGetters(["is", "isError"])

    },

    methods: {

        ...mapActions(["loginAction"]),

        updatedText(content) {
            this.user.email = content;
        },

        updatedPassword(content) {
            this.user.password = content;
        },

        async login() {
            this.$v.$touch();
            if (!this.$v.user.password.minLength == false && this.$v.user.email.$anyError == false){
                await this.loginAction(this.user);
            }
        }
    },

    mounted() {
        
    }
}
</script>

<style lang="scss" scoped>
    
</style>
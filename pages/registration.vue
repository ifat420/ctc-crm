<template>
  <div class="flex h-screen justify-center items-center bg-white">
        <div class="flex flex-col self-start sm:self-center gap-y-6 max-w-lg w-full bg-white rounded-xl sm:shadow-lg px-6 py-12 sm:text-left">
            <div class="w-full flex flex-col gap-y-4 items-start sm:items-center px-3">
                <div class="shrink-0">
                    <LogoMomin />
                </div>
                <h1 class="color-black text-xl font-bold antialiased font">Registration Form</h1>
            </div>
            <form class="w-full flex flex-col gap-y-6" action="" @submit.prevent="registration">

                <input @blur="$v.user.first_name.$touch()" class="sm:shadow-sm w-full py-3 px-3 rounded focus:outline-none font box-shadow" type="text" placeholder="Enter First Name" v-model="user.first_name">
                <span v-if="(!$v.user.first_name.required || !$v.user.first_name.alpha) && $v.user.first_name.$dirty" class="error">*First Name is required</span>

                <input @blur="$v.user.last_name.$touch()" class="sm:shadow-sm w-full py-3 px-3 rounded focus:outline-none font box-shadow" type="text" placeholder="Enter Last Name" v-model="user.last_name">
                <span v-if="(!$v.user.last_name.required || !$v.user.last_name.alpha) && $v.user.last_name.$dirty" class="error">*Last Name is required</span>

                <input @blur="$v.user.email.$touch()" class="sm:shadow-sm w-full py-3 px-3 rounded focus:outline-none font box-shadow" type="email" placeholder="Enter Email" v-model="user.email">
                <span v-if="!$v.user.email.required && $v.user.email.$dirty" class="error">*Email is required</span>
                <span v-if="!$v.user.email.email && $v.user.email.$dirty" class="error">*Valid Email is required</span>

                <input @blur="$v.user.password.$touch()" class="sm:shadow-sm w-full py-3 px-3 rounded focus:outline-none font box-shadow" type="password" placeholder="Enter Password" v-model="user.password">
                <span v-if="!$v.user.password.required && $v.user.password.$dirty" class="error">*Password is required</span>
                <span v-if="!$v.user.password.minLength && $v.user.password.$dirty" class="error">*password shoul be at least 6 char long</span>

                <input class="sm:shadow-sm w-full py-3 px-3 rounded focus:outline-none font box-shadow" type="text" placeholder="Enter Role" v-model="user.role">
                
                <Button :loading="loading" :buttonContent="buttonContent"/>
                <span class="error" v-if="isError('registrationAction')">Something went wrong!</span>
                <!-- <nuxt-link to="/resetPassword" class="text-sm text-center color-black underline font sm:hidden">Forget your password?</nuxt-link> -->
            </form>
            
        </div>
    </div>
</template>

<script>
import { required, minLength, email, alpha } from 'vuelidate/lib/validators'
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
            loading: "registrationAction",
            buttonContent: "Sign Up",
            user: {
                first_name: '',
                last_name: '',
                email: '',
                password: '',
                role: ''
            },

            error : null,
            success: false
        }
    },

    validations: {
        user: {
            first_name: {
                required,
                alpha
            },

            last_name: {
                required,
                alpha
            },

            email: {
                required,
                email
            },

            password: {
                required,
                minLength: minLength(6)
            }

        },
        
    },

    computed: {
        ...mapState (["registrationResponse","registrationFailureStatus"]),
        ...mapGetters(["is", "isError"])
    },

    methods: {
        ...mapActions(["registrationAction"]),

        async registration() {
            this.$v.$touch();
            if (this.$v.user.first_name.$anyError == false && this.$v.user.last_name.$anyError == false && this.$v.user.email.$anyError == false && this.$v.user.password.$anyError == false ) {
                await this.registrationAction(this.user);
            }
            
        }


    }
}
</script>

<style>

</style>